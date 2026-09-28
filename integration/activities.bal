import ballerina/crypto;
import ballerina/lang.runtime;
import ballerina/workflow;
import commons/attachment;
import commons/chat;
import commons/notification;

// Every side effect of the agent is one of these durable activities.

@workflow:Activity
function sendMessage(string caseRef, string to, string text) returns string|error {
    return postMessage(check conversationOf(caseRef, to), text);
}

// Streams a message into a conversation as the agent.
function postMessage(string conversationId, string text) returns string|error {
    // The same text to the same conversation keeps its ID, so a retried activity restarts the stream instead of
    // posting the message twice.
    string messageId = "agent-" + crypto:hashSha256((conversationId + text).toBytes()).toBase16().substring(0, 24);
    chat:Message opened = check chats->startStreaming(conversationId, messageId, AGENT_ID);
    if opened.status == chat:COMPLETE {
        return messageId;
    }
    string[] words = re ` `.split(text);
    foreach int i in 0 ..< words.length() {
        check chats->appendChunk(conversationId, messageId, (i == 0 ? "" : " ") + words[i], AGENT_ID);
        runtime:sleep(streamChunkSeconds);
    }
    _ = check chats->completeMessage(conversationId, messageId, text, AGENT_ID);
    return messageId;
}

@workflow:Activity
function requestEvidence(string caseRef, string instructions) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    attachment:Case evidence = check attachments->createCase({
        idempotencyKey: caseRef + "/evidence",
        correlationId: caseRef,
        title: string `Photos for ${caseRef}: ${request.title}`,
        description: instructions,
        subjects: [request.tenantId],
        watchers: [AGENT_ID],
        autoSubmit: true,
        slots: [{name: "photo", label: "Photo of the problem", mimeTypes: ["image/*"], maxFiles: 3}]
    });
    _ = check chats->sendMessage(request.conversationId, {
        id: caseRef + ".evidence",
        kind: chat:ATTACHMENT_REF,
        senderId: AGENT_ID,
        content: {name: "Upload photos", caseId: evidence.id, slot: "photo"}
    });
    return evidence.id;
}

@workflow:Activity
function openContractorChat(string caseRef, string contractorId, string summary) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    Contractor contractor = check contractorById(contractorId);
    chat:Conversation conversation = check chats->createConversation({
        correlationId: caseRef + "/contractor",
        title: string `${caseRef} · ${request.unit} · ${request.title}`,
        participants: [
            {participantId: contractor.userId, displayName: contractor.name},
            {participantType: chat:AGENT, participantId: AGENT_ID, displayName: "Maintenance assistant"}
        ]
    });
    check setContractorConversation(caseRef, conversation.id);
    _ = check postMessage(conversation.id, summary);
    return string `Opened a chat with ${contractor.name}`;
}

// Asking for a quote starts the 48-hour follow-up; a required step, so it is not left to the model.
@workflow:Activity
function requestQuote(string caseRef) returns string|error {
    string conversationId = check conversationOf(caseRef, "contractor");
    if check awaitingAnswer(conversationId) {
        return "The contractor already has an unanswered quote form; wait for the QUOTE event";
    }
    string reminder = check scheduleFollowUp(caseRef, 48, "No quote from the contractor yet");
    _ = reminder;
    chat:Message form = check chats->sendMessage(conversationId, {
        kind: chat:FORM,
        senderId: AGENT_ID,
        content: {
            title: "Quote for the job",
            submitLabel: "Send quote",
            schema: {
                'type: "object",
                required: ["amount", "visitDate"],
                properties: {
                    amount: {'type: "number", title: "Quote (USD)"},
                    visitDate: {'type: "string", title: "Earliest visit", format: "date"},
                    notes: {'type: "string", title: "Notes"}
                }
            }
        }
    });
    return form.id;
}

@workflow:Activity
function requestFixConfirmation(string caseRef) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    if request.status != "BOOKED" {
        return error(string `No visit is booked for ${caseRef} yet: book the quote with bookVisit (or `
            + "bookApprovedVisit when it is over the threshold) before asking the tenant");
    }
    chat:Message form = check chats->sendMessage(request.conversationId, {
        kind: chat:FORM,
        senderId: AGENT_ID,
        content: {
            title: "Is it fixed?",
            submitLabel: "Confirm",
            schema: {
                'type: "object",
                required: ["fixed"],
                properties: {
                    fixed: {'type: "boolean", title: "The problem is fixed"},
                    comment: {'type: "string", title: "Anything else?"}
                }
            }
        }
    });
    return form.id;
}

@workflow:Activity
function notifyRole(string caseRef, string role, string body, string? title = (), string? severity = ())
        returns string|error {
    notification:Notification sent = check notifications->send({
        recipientType: notification:ROLE,
        recipientId: role,
        severity: severityOf(severity),
        title: titleOf(title, body),
        body,
        category: "maintenance",
        correlationId: caseRef,
        actionUrl: "#/requests/" + caseRef,
        sender: AGENT_ID,
        idempotencyKey: notificationKey(caseRef, role, titleOf(title, body), body)
    });
    return sent.id;
}

@workflow:Activity
function notifyUser(string caseRef, string userId, string body, string? title = (), string? severity = ())
        returns string|error {
    notification:Notification sent = check notifications->send({
        recipientType: notification:USER,
        recipientId: userId,
        severity: severityOf(severity),
        title: titleOf(title, body),
        body,
        category: "maintenance",
        correlationId: caseRef,
        actionUrl: "#/requests/" + caseRef,
        sender: AGENT_ID,
        idempotencyKey: notificationKey(caseRef, userId, titleOf(title, body), body)
    });
    return sent.id;
}

// Models often skip or misspell the optional parts; a notification still goes out. The parameters are nilable
// because an argument the model leaves out arrives as nil rather than as the declared default.
isolated function severityOf(string? severity) returns notification:Severity {
    notification:Severity|error parsed = (severity ?: "INFO").toUpperAscii().ensureType();
    return parsed is notification:Severity ? parsed : notification:INFO;
}

isolated function titleOf(string? title, string body) returns string =>
    (title ?: "").trim() != "" ? <string>title : (body.length() > 60 ? body.substring(0, 57) + "..." : body);

// The same notification about the same case is sent once, however often the activity runs.
isolated function notificationKey(string caseRef, string recipient, string title, string body) returns string =>
    caseRef + "/" + crypto:hashSha256((recipient + "\n" + title + "\n" + body).toBytes()).toBase16().substring(0, 32);

function scheduleFollowUp(string caseRef, int hours, string reason) returns string|error {
    int delaySeconds = int:max(1, <int>(<decimal>hours * demoSecondsPerHour));
    string timerId = check workflow:run(followUpTimer, {caseRef, delaySeconds, reason});
    return string `Reminder due in ${hours} h (timer ${timerId})`;
}

// Books the visit the contractor quoted, and tells both parties. The quote is read from the contractor's form
// answer, never taken from the model. Quotes over the threshold must go through bookApprovedVisit.
@workflow:Activity
function bookVisit(string caseRef) returns string|error {
    Quote quote = check latestQuote(caseRef);
    if quote.amount > quoteApprovalThreshold {
        return error(string `The quote of $${quote.amount} is over $${quoteApprovalThreshold}: `
            + "call bookApprovedVisit, which asks Finance to approve it");
    }
    return confirmVisit(caseRef, quote);
}

// The same booking behind Finance's approval: its approval policy opens the review before this runs.
@workflow:Activity
function bookApprovedVisit(string caseRef) returns string|error {
    return confirmVisit(caseRef, check latestQuote(caseRef));
}

function confirmVisit(string caseRef, Quote quote) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    string contractorConversation = check conversationOf(caseRef, "contractor");
    _ = check postMessage(contractorConversation, string `Booked: please go ahead on ${quote.visitDate}.`);
    _ = check postMessage(request.conversationId,
        string `Your visit is booked: ${quote.contractor} will come on ${quote.visitDate}.`);
    _ = check notifyUser(caseRef, request.tenantId, string `${quote.contractor} visits on ${quote.visitDate}.`,
        string `Visit booked for ${caseRef}`, "SUCCESS");
    check updateStatus(caseRef, "BOOKED");
    return string `Booked ${quote.contractor} for ${quote.visitDate} at $${quote.amount}`;
}

// The contractor's latest answer to the quote form.
function latestQuote(string caseRef) returns Quote|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    string conversationId = check conversationOf(caseRef, "contractor");
    json values = check latestAnswer(conversationId, "amount");
    if values !is map<json> {
        return error(string `No quote for ${caseRef} yet: call requestQuote and wait for the QUOTE event`);
    }
    json amount = values["amount"];
    chat:Conversation conversation = check chats->getConversation(conversationId);
    string contractorName = contractorNameOf(request, conversation);
    return {
        caseRef,
        amount: amount is int|float|decimal ? <decimal>amount : check decimal:fromString(amount.toString()),
        contractor: contractorName,
        visitDate: values["visitDate"].toString(),
        notes: values["notes"] is string ? values["notes"].toString() : ()
    };
}

// Whether the newest form the agent sent in a conversation is still unanswered.
function awaitingAnswer(string conversationId) returns boolean|error {
    chat:MessagePage page = check chats->history(conversationId, 'limit = 100);
    foreach int i in int:range(page.items.length() - 1, -1, -1) {
        chat:Message message = page.items[i];
        if message.kind == chat:FORM && message.senderId == AGENT_ID {
            return message?.answeredAt is ();
        }
    }
    return false;
}

// The content of the newest form answer in a conversation that has the given field.
function latestAnswer(string conversationId, string key) returns json|error {
    chat:MessagePage page = check chats->history(conversationId, 'limit = 100);
    foreach int i in int:range(page.items.length() - 1, -1, -1) {
        chat:Message message = page.items[i];
        json content = message.content;
        if message.kind == chat:FORM_RESPONSE && content is map<json> && content.hasKey(key) {
            return content;
        }
    }
    return ();
}

isolated function contractorNameOf(MaintenanceRequest request, chat:Conversation conversation) returns string {
    foreach chat:Participant p in conversation.participants {
        if p.participantType == chat:USER {
            return p?.displayName ?: p.participantId;
        }
    }
    return "The contractor";
}

@workflow:Activity
function closeRequest(string caseRef, string summary) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    json confirmation = check latestAnswer(request.conversationId, "fixed");
    if confirmation !is map<json> || confirmation["fixed"] != true {
        return error(string `${request.tenantId} has not confirmed the fix: call requestFixConfirmation and wait `
            + "for FIX_CONFIRMATION");
    }
    check updateStatus(caseRef, "RESOLVED");
    _ = check postMessage(request.conversationId, summary);
    check closeQuietly(request.conversationId);
    string? contractorConversation = request.contractorConversationId;
    if contractorConversation is string {
        _ = check postMessage(contractorConversation, string `${caseRef} is closed. Thank you!`);
        check closeQuietly(contractorConversation);
    }
    attachment:CasePage cases = check attachments->adminListCases(correlationId = caseRef);
    foreach attachment:Case evidence in cases.items {
        if evidence.status != attachment:CLOSED {
            _ = check attachments->close(evidence.id, "Request resolved");
        }
    }
    return "closed";
}

// Idempotent across activity retries: a conversation already closed is fine.
function closeQuietly(string conversationId) returns error? {
    chat:Conversation current = check chats->getConversation(conversationId);
    if current.status == chat:OPEN {
        _ = check chats->close(conversationId, "Request resolved", AGENT_ID);
    }
}

// The request's conversation with the tenant or the contractor.
function conversationOf(string caseRef, string to) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    if to == "tenant" {
        return request.conversationId;
    }
    if to == "contractor" {
        return request.contractorConversationId
            ?: error(string `${caseRef} has no contractor yet: call openContractorChat first`);
    }
    return error(string `'to' must be "tenant" or "contractor", not "${to}"`);
}

function requireRequest(string caseRef) returns MaintenanceRequest|error {
    return (check requestByRef(caseRef)) ?: error(string `Unknown request ${caseRef}`);
}

isolated function contractorById(string userId) returns Contractor|error {
    foreach Contractor contractor in contractors {
        if contractor.userId == userId {
            return contractor;
        }
    }
    return error(string `Unknown contractor ${userId}`);
}
