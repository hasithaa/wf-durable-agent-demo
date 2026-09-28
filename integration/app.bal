import ballerina/crypto;
import ballerina/http;
import ballerina/log;
import ballerina/workflow.management;
import commons/chat;
import commons/service_commons;
import commons/service_commons.auth as sauth;
import commons/service_commons.webhook;

listener http:Listener appListener = new (appPort, timeout = 0);

final sauth:Authenticator authenticator = check new (auth);
final sauth:TicketStore tickets = new;

// The UI's API: maintenance requests and the approval tasks of the caller's roles.
@http:ServiceConfig {
    cors: {
        allowOrigins: corsAllowOrigins,
        allowHeaders: ["Authorization", "Content-Type", sauth:HEADER_USER_ID, sauth:HEADER_USER_ROLES,
            sauth:HEADER_USER_SCOPES],
        allowMethods: ["GET", "POST", "OPTIONS"]
    }
}
service http:InterceptableService /app on appListener {

    public function createInterceptors() returns [sauth:AuthInterceptor, service_commons:ErrorInterceptor] =>
        [new (authenticator, tickets), new];

    // Opens a request: the tenant's chat with the agent, then the durable agent that owns the request.
    resource function post requests(http:RequestContext ctx, @http:Payload NewRequest body)
            returns http:Created|http:BadRequest|error {
        sauth:CallerIdentity caller = check sauth:callerOf(ctx);
        if body.issue.trim() == "" || body.unit.trim() == "" {
            return service_commons:badRequest("issue and unit are required");
        }
        string caseRef = check nextCaseRef();
        string tenantName = body?.tenantName ?: caller.userId;
        chat:Conversation conversation = check chats->createConversation({
            correlationId: caseRef,
            title: string `${caseRef} · ${body.title}`,
            participants: [
                {participantId: caller.userId, displayName: tenantName},
                {participantType: chat:AGENT, participantId: AGENT_ID, displayName: "Maintenance assistant"}
            ],
            metadata: {caseRef, unit: body.unit}
        });
        CaseInput input = {caseRef, tenantId: caller.userId, tenantName, unit: body.unit, issue: body.issue,
            conversationId: conversation.id};
        string agentId = check maintenanceAgent.run(string `New maintenance request ${caseRef}`, input);
        MaintenanceRequest request = {caseRef, agentId, tenantId: caller.userId, title: body.title, unit: body.unit,
            status: "OPEN", conversationId: conversation.id, contractorConversationId: (),
            createdAt: service_commons:toIso(service_commons:nowMillis())};
        check saveRequest(request);
        log:printInfo(string `Opened ${caseRef} for ${caller.userId}: agent ${agentId}`);
        return <http:Created>{body: request};
    }

    // Staff see every request; everyone else sees their own.
    resource function get requests(http:RequestContext ctx) returns MaintenanceRequest[]|error {
        sauth:CallerIdentity caller = check sauth:callerOf(ctx);
        return requestsFor(isStaff(caller) ? () : caller.userId);
    }

    resource function get requests/[string caseRef](http:RequestContext ctx)
            returns MaintenanceRequest|http:NotFound|error {
        sauth:CallerIdentity caller = check sauth:callerOf(ctx);
        MaintenanceRequest? request = check requestByRef(caseRef);
        if request is () || (!isStaff(caller) && request.tenantId != caller.userId) {
            return service_commons:notFound(string `Request ${caseRef} not found`);
        }
        return request;
    }

    // Pending approvals the caller's roles may decide: booking reviews, with the quote they would book.
    resource function get tasks(http:RequestContext ctx) returns json[]|error {
        sauth:CallerIdentity caller = check sauth:callerOf(ctx);
        management:ReviewActivitySummary[] pending = check management:listAllReviewActivities("PENDING",
            taskQueue = management:getWorkflowTaskQueue());
        json[] visible = [];
        foreach management:ReviewActivitySummary review in pending {
            if !caller.roles.some(role => review.userRoles.indexOf(role) != ()
                    || review.administratorRoles.indexOf(role) != ()) {
                continue;
            }
            management:ReviewActivityInfo info = check management:getReviewActivityInfo(review.taskId);
            // taskInput is declared map<json> but arrives as map<anydata>; a direct read panics the process.
            json raw = info.taskInput.toJson();
            map<json> args = raw is map<json> ? raw : {};
            json input = args;
            json caseRef = args["caseRef"];
            if caseRef is string {
                Quote|error quote = latestQuote(caseRef);
                if quote is Quote {
                    input = quote.toJson();
                }
            }
            visible.push({
                taskId: review.taskId,
                taskName: review.activityName,
                title: review.title,
                description: review.description,
                startTime: review.startTime,
                input
            });
        }
        return visible;
    }

    resource function post tasks/[string taskId]/complete(http:RequestContext ctx,
            @http:Payload QuoteDecision decision) returns json|http:Forbidden|error {
        sauth:CallerIdentity caller = check sauth:callerOf(ctx);
        if caller.roles.length() == 0 {
            return service_commons:forbidden("Only staff decide tasks");
        }
        [string, string...] roles = [caller.roles[0], ...caller.roles.slice(1)];
        // A reject always carries feedback: the agent hears the reason as the booking's error.
        string comment = (decision?.comment ?: "").trim();
        management:ReviewDecision review = decision.approved ? {action: "proceed", feedback: comment == "" ? () : comment}
            : {action: "reject", feedback: comment == "" ? "Rejected by Finance" : comment};
        check management:completeReviewActivity(taskId, review, roles, caller.userId);
        return {taskId, completed: true};
    }
}

// Where the chat and attachment services deliver the agent's webhooks.
service /hooks on appListener {

    resource function post chat(http:Request req) returns http:Accepted|http:Unauthorized|error {
        webhook:WebhookEvent|error event = webhook:verify(req, webhookSecret);
        if event is error {
            return http:UNAUTHORIZED;
        }
        if !check firstDelivery(event.eventId) {
            return http:ACCEPTED;
        }
        string correlationId = event?.correlationId ?: "";
        MaintenanceRequest? request = check openRequest(correlationId);
        json data = event.data;
        if request is () || data !is map<json> {
            return http:ACCEPTED;
        }
        chat:Message message = check data["message"].cloneWithType();
        boolean fromContractor = correlationId.endsWith("/contractor");
        boolean answer = event.event == chat:EVENT_FORM_SUBMITTED;
        CaseEvent caseEvent = {
            'from: fromContractor ? "contractor" : "tenant",
            senderId: message.senderId,
            kind: answer ? (fromContractor ? "QUOTE" : "FIX_CONFIRMATION") : "MESSAGE",
            text: answer ? describeAnswer(fromContractor, message.content)
                : message.content is string ? <string>message.content : "",
            conversationId: message.conversationId,
            data: message.content
        };
        check deliver(request, caseEvent, message.conversationId, message.seq);
        return http:ACCEPTED;
    }

    resource function post attachments(http:Request req) returns http:Accepted|http:Unauthorized|error {
        webhook:WebhookEvent|error event = webhook:verify(req, webhookSecret);
        if event is error {
            return http:UNAUTHORIZED;
        }
        if !check firstDelivery(event.eventId) {
            return http:ACCEPTED;
        }
        MaintenanceRequest? request = check openRequest(event?.correlationId ?: "");
        json data = event.data;
        if request is () || data !is map<json> || event.event != "case.submitted" {
            return http:ACCEPTED;
        }
        json submitted = data["case"];
        json[] files = submitted is map<json> && submitted["files"] is json[] ? <json[]>submitted["files"] : [];
        CaseEvent caseEvent = {
            'from: "tenant",
            senderId: request.tenantId,
            kind: "EVIDENCE",
            text: string `Uploaded ${files.length()} photo(s)`,
            conversationId: request.conversationId,
            data: {
                caseId: submitted is map<json> ? submitted["id"] : (),
                files: from json file in files
                    select file is map<json> ? {id: file["id"], fileName: file["fileName"]} : ()
            }
        };
        chat:Conversation conversation = check chats->getConversation(request.conversationId);
        check deliver(request, caseEvent, request.conversationId, conversation.lastSeq);
        return http:ACCEPTED;
    }
}

// The scripted model, when no WSO2 AI token is configured.
service /mockllm on appListener {
    resource function post chat/completions(map<json> request) returns http:Ok {
        thinkPause();
        json[] messages = request["messages"] is json[] ? <json[]>request["messages"] : [];
        map<json> message = scriptedTurn(messages);
        message["role"] = "assistant";
        return {body: {
            id: "scripted",
            'object: "chat.completion",
            created: 0,
            model: "scripted-maintenance-model",
            choices: [{index: 0, message, finish_reason: "stop"}],
            usage: {prompt_tokens: 0, completion_tokens: 0, total_tokens: 0}
        }};
    }
}

// Ollama, behind the provider protocol the agent speaks.
service /ollama on appListener {
    resource function post chat/completions(map<json> request) returns http:Ok|http:BadGateway {
        map<json>|error message = ollamaTurn(request);
        if message is error {
            log:printError("Ollama call failed", message);
            return <http:BadGateway>{body: {message: message.message()}};
        }
        http:Ok ok = {body: {
            id: "ollama",
            'object: "chat.completion",
            created: 0,
            model: ollamaModel,
            choices: [{index: 0, message, finish_reason: "stop"}],
            usage: {prompt_tokens: 0, completion_tokens: 0, total_tokens: 0}
        }};
        return ok;
    }
}

// Hands an event to the request's agent. The turn's final answer is posted only if the agent has not already
// written in that conversation since the event: a side turn while parked, or a model that replied in plain text.
function deliver(MaintenanceRequest request, CaseEvent event, string conversationId, int afterSeq) returns error? {
    string token = check maintenanceAgent.sendData(request.agentId, "chat", event);
    check recordTurn(token, request.caseRef, conversationId, afterSeq);
    error? typing = chats->typing(conversationId, AGENT_ID);
    if typing is error {
        log:printDebug("Typing indicator failed", 'error = typing);
    }
    _ = start postReply(request.agentId, token, conversationId, afterSeq);
}

function postReply(string agentId, string token, string conversationId, int afterSeq) {
    string|error reply = maintenanceAgent.waitForDataResult(agentId, token);
    if reply is error {
        log:printWarn(string `No reply for turn ${token}`, 'error = reply);
        return;
    }
    string text = re `\[done\]`.replaceAll(reply, "").trim();
    boolean alreadyAnswered = agentWroteSince(conversationId, afterSeq);
    if text != "" && !alreadyAnswered {
        string messageId = "turn-" + crypto:hashSha256(token.toBytes()).toBase16().substring(0, 24);
        chat:Message|error posted = chats->sendText(conversationId, text, AGENT_ID, messageId);
        if posted is error {
            log:printError(string `Could not post the reply of turn ${token}`, posted);
            return;
        }
    }
    error? marked = markTurnAnswered(token);
    if marked is error {
        log:printError("Could not mark a turn answered", marked);
    }
}

function agentWroteSince(string conversationId, int afterSeq) returns boolean {
    chat:MessagePage|error page = chats->history(conversationId, afterSeq = afterSeq, 'limit = 100);
    return page is chat:MessagePage && page.items.some(m => m.senderId == AGENT_ID);
}

// Re-attaches reply waiters for turns that were in flight when the process stopped.
function resumePendingTurns() returns error? {
    foreach TurnRow turn in check unansweredTurns() {
        MaintenanceRequest? request = check requestByRef(turn.case_ref);
        if request is MaintenanceRequest {
            _ = start postReply(request.agentId, turn.token, turn.conversation_id, turn.after_seq ?: 0);
        }
    }
}

// A form answer in words, so the agent need not decode it.
isolated function describeAnswer(boolean quote, json values) returns string {
    if values !is map<json> {
        return "Answered the form";
    }
    if quote {
        return string `Quote: $${values["amount"].toString()}, earliest visit ${values["visitDate"].toString()}`
            + (values["notes"] is string ? string `, notes: ${values["notes"].toString()}` : "");
    }
    return values["fixed"] == true ? "The tenant confirms the problem is fixed"
        : string `The tenant says it is NOT fixed${values["comment"] is string ? ": " + values["comment"].toString() : ""}`;
}

// Chat correlation IDs are the case reference, or `<caseRef>/contractor` for the contractor's conversation.
function openRequest(string correlationId) returns MaintenanceRequest?|error {
    string caseRef = re `/`.split(correlationId)[0];
    MaintenanceRequest? request = check requestByRef(caseRef);
    return request is MaintenanceRequest && request.status != "RESOLVED" ? request : ();
}

isolated function isStaff(sauth:CallerIdentity caller) returns boolean =>
    caller.roles.indexOf("PropertyManager") != () || caller.roles.indexOf("Finance") != ();
