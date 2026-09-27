import ballerina/ai;
import ballerina/lang.runtime;
import ballerina/log;
import ballerina/random;

// With no WSO2 AI token the agent talks to this scripted stand-in, served at /mockllm in this process over the
// provider's chat-completions protocol. It walks the maintenance case deterministically, so the demo runs the
// same way every time; the agent, its tools and its durability are exactly the same either way.

isolated function selectModel() returns ai:ModelProvider|error {
    ai:Wso2ModelProvider|ai:Error wso2 = ai:getDefaultModelProvider();
    if wso2 is ai:Wso2ModelProvider {
        log:printInfo("Maintenance agent uses the WSO2 default model provider");
        return wso2;
    }
    log:printInfo("No WSO2 AI token configured; the maintenance agent uses the scripted model");
    return new ai:Wso2ModelProvider(scriptedModelUrl, "scripted");
}

isolated function thinkPause() {
    if scriptedThinkSeconds > 0d {
        runtime:sleep(scriptedThinkSeconds * <decimal>(0.6 + random:createDecimal() * 0.8));
    }
}

type PlannedCall record {|
    string name;
    map<json> args;
|};

// What the conversation so far establishes.
type Facts record {|
    CaseInput? input = ();
    Contractor? contractor = ();
    string? contractorConversationId = ();
    boolean quoteAccepted = false;
|};

type Turn record {|
    CaseEvent? event = ();
    PlannedCall[] calls = [];
    map<string> results = {};
|};

isolated function scriptedTurn(json[] messages) returns map<json> {
    foreach json m in messages {
        if m is map<json> && m["role"] == "system" && m["content"] is string
                && (<string>m["content"]).startsWith("You are the same assistant") {
            return {content: "I'm on it — this request is waiting on a step right now, and I'll update you here as "
                + "soon as it moves."};
        }
    }
    [Facts, Turn] [facts, turn] = scan(messages);
    CaseInput? input = facts.input;
    if input is () {
        return {content: "[done]"};
    }
    PlannedCall[] plan = planTurn(input, facts, turn);
    int next = turn.calls.length();
    if next < plan.length() {
        PlannedCall call = plan[next];
        if call.name == "endConversation" {
            return {function_call: {name: "endConversation", arguments: {farewell: "Request resolved."}.toJsonString()}};
        }
        return {function_call: {name: call.name, arguments: call.args.toJsonString()}};
    }
    return {content: "[done]"};
}

isolated function planTurn(CaseInput input, Facts facts, Turn turn) returns PlannedCall[] {
    string tenantConversation = input.conversationId;
    string caseRef = input.caseRef;
    string first = firstName(input.tenantName);
    CaseEvent? event = turn.event;
    if event is () {
        return [
            say(tenantConversation, string `Hi ${first}, I'm the maintenance assistant. I've logged ${caseRef} for `
                + string `unit ${input.unit}. Could you upload a photo of the problem using the card below?`),
            {name: "requestEvidence", args: {caseRef, instructions: "A clear photo of the problem helps us send "
                + "the right tradesperson."}},
            {name: "notifyRole", args: {caseRef, role: "PropertyManager", title: string `New request ${caseRef}`,
                body: string `${input.tenantName} (unit ${input.unit}): ${input.issue}`, severity: "INFO"}}
        ];
    }
    Contractor? contractor = facts.contractor;
    string? contractorConversation = facts.contractorConversationId;
    string trade = tradeFor(input.issue);
    match event.kind {
        "EVIDENCE" => {
            PlannedCall[] plan = [
                say(tenantConversation, string `Thanks for the photo. This looks like a ${trade} job, so I'm `
                    + "finding a tradesperson now."),
                {name: "findContractor", args: {trade}}
            ];
            Contractor? found = contractorFrom(turn.results["findContractor"]) ?: contractor;
            if found is () {
                return plan;
            }
            plan.push({name: "openContractorChat", args: {caseRef, contractorId: found.userId,
                summary: string `Hi ${firstName(found.name)}, new ${trade} job ${caseRef} at unit ${input.unit}: `
                    + string `${input.issue} The tenant has sent a photo. Could you quote for it?`}});
            string? opened = stripQuotes(turn.results["openContractorChat"]) ?: contractorConversation;
            if opened is () {
                return plan;
            }
            return [...plan,
                {name: "requestQuote", args: {conversationId: opened}},
                {name: "scheduleFollowUp", args: {caseRef, hours: 48, reason: "No quote from the contractor yet"}}
            ];
        }
        "REMINDER" => {
            if facts.quoteAccepted || contractorConversation is () || quoteReceived(turn, facts) {
                return [];
            }
            return [
                {name: "notifyRole", args: {caseRef, role: "PropertyManager",
                    title: string `No contractor reply on ${caseRef}`,
                    body: string `${contractor?.name ?: "The contractor"} has not quoted after 48 hours.`,
                    severity: "WARNING"}},
                say(contractorConversation, "Friendly reminder: could you send your quote for this job?")
            ];
        }
        "FORM_RESPONSE" => {
            json values = event?.data;
            if event.'from == "tenant" {
                json fixed = values is map<json> ? values["fixed"] : ();
                if fixed == true {
                    return [
                        {name: "closeRequest", args: {caseRef, summary: string `Great to hear, ${first}! I've `
                            + string `closed ${caseRef}. Thanks for your patience.`}},
                        {name: "notifyRole", args: {caseRef, role: "PropertyManager",
                            title: string `${caseRef} resolved`, body: string `Unit ${input.unit}: fixed and `
                            + "confirmed by the tenant.", severity: "SUCCESS"}},
                        {name: "endConversation", args: {}}
                    ];
                }
                string comment = values is map<json> && values["comment"] is string ? <string>values["comment"] : "";
                if contractorConversation is () {
                    return [];
                }
                return [
                    say(contractorConversation, string `The tenant says it is not fixed yet. ${comment}`),
                    say(tenantConversation, "Sorry about that. I've asked the contractor to come back.")
                ];
            }
            if contractorConversation is () {
                return [];
            }
            decimal amount = amountOf(values);
            string visitDate = values is map<json> && values["visitDate"] is string ? <string>values["visitDate"] : "soon";
            string name = contractor?.name ?: "The contractor";
            PlannedCall[] accepted = [
                say(contractorConversation, string `Approved. Please go ahead on ${visitDate}.`),
                say(tenantConversation, string `Good news: ${name} will visit on ${visitDate} to fix it.`),
                {name: "notifyUser", args: {caseRef, userId: input.tenantId, title: string `Visit booked for ${caseRef}`,
                    body: string `${name} visits on ${visitDate}.`, severity: "SUCCESS"}}
            ];
            if amount <= quoteApprovalThreshold {
                return accepted;
            }
            PlannedCall[] plan = [
                say(tenantConversation, string `${name} quoted $${amount}. That needs a quick approval from `
                    + "Finance; I'll let you know."),
                {name: "approveQuote", args: {caseRef, amount, contractor: name, visitDate,
                    notes: values is map<json> && values["notes"] is string ? <string>values["notes"] : ""}}
            ];
            string? decision = turn.results["approveQuote"];
            if decision is () {
                return plan;
            }
            if decision.includes("\"approved\":true") || decision.includes("\"approved\": true") {
                return [...plan, ...accepted];
            }
            return [...plan,
                say(contractorConversation, "Finance declined this quote. Could you send a revised one?"),
                say(tenantConversation, "Finance asked for a revised quote; I'm on it."),
                {name: "requestQuote", args: {conversationId: contractorConversation}}
            ];
        }
        _ => {
            string? origin = event?.conversationId;
            if event.'from == "contractor" && contractorConversation is string {
                if facts.quoteAccepted {
                    return [
                        say(tenantConversation, string `${contractor?.name ?: "The contractor"} says the job is `
                            + "done. Can you confirm it's fixed?"),
                        {name: "requestFixConfirmation", args: {conversationId: tenantConversation}}
                    ];
                }
                return [say(contractorConversation, "Thanks! Please send your quote using the form above.")];
            }
            if origin is () {
                return [];
            }
            return [say(origin, statusLine(input, facts))];
        }
    }
}

isolated function say(string conversationId, string text) returns PlannedCall =>
    {name: "sendMessage", args: {conversationId, text}};

isolated function statusLine(CaseInput input, Facts facts) returns string {
    if facts.quoteAccepted {
        return string `The visit for ${input.caseRef} is booked; I'll check in with you once it's done.`;
    }
    if facts.contractorConversationId is string {
        return string `I've contacted ${facts.contractor?.name ?: "a contractor"} and I'm waiting for their quote.`;
    }
    return "Thanks! Once you upload a photo I'll find the right tradesperson.";
}

isolated function scan(json[] messages) returns [Facts, Turn] {
    Facts facts = {};
    Turn turn = {};
    string[] pendingNames = [];
    foreach json m in messages {
        if m !is map<json> {
            continue;
        }
        string role = m["role"] is string ? <string>m["role"] : "";
        string content = m["content"] is string ? <string>m["content"] : "";
        if role == "user" {
            int? inputAt = content.indexOf("Input:\n");
            if inputAt is int {
                CaseInput|error parsed = content.substring(inputAt + 7).fromJsonStringWithType();
                if parsed is CaseInput {
                    facts.input = parsed;
                }
                turn = {};
                continue;
            }
            CaseEvent|error event = content.fromJsonStringWithType();
            if event is error {
                // A side question answered while the agent was parked, merged into the history: it is not an
                // event, so the turn it interrupted carries on.
                continue;
            }
            turn = {event};
            if event is CaseEvent && event.'from == "contractor" && event.kind == "FORM_RESPONSE"
                    && amountOf(event?.data) <= quoteApprovalThreshold {
                facts.quoteAccepted = true;
            }
            continue;
        }
        if role == "assistant" {
            foreach map<json> call in callsOf(m) {
                string name = call["name"] is string ? <string>call["name"] : "";
                json rawArgs = call["arguments"];
                map<json> args = {};
                if rawArgs is string {
                    json|error parsed = rawArgs.fromJsonString();
                    if parsed is map<json> {
                        args = parsed;
                    }
                } else if rawArgs is map<json> {
                    args = rawArgs;
                }
                turn.calls.push({name, args});
                pendingNames.push(name);
            }
            continue;
        }
        if role == "function" || role == "tool" {
            string name = m["name"] is string ? <string>m["name"] : (pendingNames.length() > 0 ? pendingNames[0] : "");
            if pendingNames.length() > 0 {
                _ = pendingNames.shift();
            }
            turn.results[name] = content;
            if name == "findContractor" {
                facts.contractor = contractorFrom(content);
            } else if name == "openContractorChat" {
                facts.contractorConversationId = stripQuotes(content);
            } else if name == "approveQuote" && (content.includes("\"approved\":true")
                    || content.includes("\"approved\": true")) {
                facts.quoteAccepted = true;
            }
        }
    }
    return [facts, turn];
}

isolated function callsOf(map<json> message) returns map<json>[] {
    json calls = message["tool_calls"] ?: message["toolCalls"];
    json single = message["function_call"];
    json[] list = [];
    if calls is json[] {
        list = calls;
    } else if single is map<json> {
        list = [single];
    }
    map<json>[] result = [];
    foreach json call in list {
        if call is map<json> {
            result.push(call["function"] is map<json> ? <map<json>>call["function"] : call);
        }
    }
    return result;
}

isolated function quoteReceived(Turn turn, Facts facts) returns boolean => facts.quoteAccepted;

isolated function contractorFrom(string? content) returns Contractor? {
    if content is () {
        return ();
    }
    Contractor|error parsed = content.fromJsonStringWithType();
    return parsed is Contractor ? parsed : ();
}

isolated function stripQuotes(string? content) returns string? {
    if content is () || content.startsWith("Error") {
        return ();
    }
    string trimmed = content.trim();
    return trimmed.startsWith("\"") && trimmed.endsWith("\"") && trimmed.length() > 1
        ? trimmed.substring(1, trimmed.length() - 1) : trimmed;
}

isolated function amountOf(json values) returns decimal {
    json amount = values is map<json> ? values["amount"] : ();
    if amount is int|float|decimal {
        return <decimal>amount;
    }
    if amount is string {
        decimal|error parsed = decimal:fromString(amount);
        return parsed is decimal ? parsed : 0;
    }
    return 0;
}

isolated function tradeFor(string issue) returns string {
    string text = issue.toLowerAscii();
    foreach string word in ["light", "power", "socket", "outlet", "switch", "electric", "fuse"] {
        if text.includes(word) {
            return "electrical";
        }
    }
    return "plumbing";
}

isolated function firstName(string name) returns string => re ` `.split(name.trim())[0];
