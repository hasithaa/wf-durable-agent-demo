import ballerina/lang.runtime;
import ballerina/random;

// With no WSO2 AI token the agent talks to this scripted stand-in, served at /mockllm in this process over the
// provider's chat-completions protocol. It walks the maintenance case deterministically, so the demo runs the
// same way every time; the agent, its tools and its durability are exactly the same either way.

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
    boolean contractorEngaged = false;
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
    string caseRef = input.caseRef;
    string first = firstName(input.tenantName);
    CaseEvent? event = turn.event;
    if event is () {
        return [
            say(caseRef, "tenant", string `Hi ${first}, I'm the maintenance assistant. I've logged ${caseRef} for `
                + string `unit ${input.unit}. Could you upload a photo of the problem using the card below?`),
            {name: "requestEvidence", args: {caseRef, instructions: "A clear photo of the problem helps us send "
                + "the right tradesperson."}},
            {name: "notifyRole", args: {caseRef, role: "PropertyManager", title: string `New request ${caseRef}`,
                body: string `${input.tenantName} (unit ${input.unit}): ${input.issue}`, severity: "INFO"}}
        ];
    }
    Contractor? contractor = facts.contractor;
    boolean engaged = facts.contractorEngaged;
    string trade = tradeFor(input.issue);
    match event.kind {
        "EVIDENCE" => {
            PlannedCall[] plan = [
                say(caseRef, "tenant", string `Thanks for the photo. This looks like a ${trade} job, so I'm `
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
            if turn.results["openContractorChat"] is () && !engaged {
                return plan;
            }
            return [...plan, {name: "requestQuote", args: {caseRef}}];
        }
        "REMINDER" => {
            return [say(caseRef, "tenant", string `${contractor?.name ?: "The contractor"} hasn't sent a quote yet. `
                + "I've chased them and let the property manager know.")];
        }
        "QUOTE"|"FIX_CONFIRMATION" => {
            json values = event?.data;
            if event.kind == "FIX_CONFIRMATION" {
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
                return [
                    say(caseRef, "contractor", string `The tenant says it is not fixed yet. ${comment}`),
                    say(caseRef, "tenant", "Sorry about that. I've asked the contractor to come back.")
                ];
            }
            decimal amount = amountOf(values);
            string name = contractor?.name ?: "The contractor";
            if amount <= quoteApprovalThreshold {
                return [{name: "bookVisit", args: {caseRef}}];
            }
            PlannedCall[] plan = [
                say(caseRef, "tenant", string `${name} quoted $${amount}. That needs a quick approval from `
                    + "Finance; I'll let you know."),
                {name: "bookApprovedVisit", args: {caseRef}}
            ];
            string? booking = turn.results["bookApprovedVisit"];
            if booking is () || !booking.startsWith("Error") {
                return plan;
            }
            return [...plan,
                say(caseRef, "contractor", "Finance declined this quote. Could you send a revised one?"),
                say(caseRef, "tenant", "Finance asked for a revised quote; I'm on it."),
                {name: "requestQuote", args: {caseRef}}
            ];
        }
        _ => {
            if event.'from == "contractor" {
                if facts.quoteAccepted {
                    return [
                        say(caseRef, "tenant", string `${contractor?.name ?: "The contractor"} says the job is `
                            + "done. Can you confirm it's fixed?"),
                        {name: "requestFixConfirmation", args: {caseRef}}
                    ];
                }
                return [say(caseRef, "contractor", "Thanks! Please send your quote using the form above.")];
            }
            return [say(caseRef, "tenant", statusLine(input, facts))];
        }
    }
}

isolated function say(string caseRef, string to, string text) returns PlannedCall =>
    {name: "sendMessage", args: {caseRef, to, text}};

isolated function statusLine(CaseInput input, Facts facts) returns string {
    if facts.quoteAccepted {
        return string `The visit for ${input.caseRef} is booked; I'll check in with you once it's done.`;
    }
    if facts.contractorEngaged {
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
            } else if name == "openContractorChat" && !content.startsWith("Error") {
                facts.contractorEngaged = true;
            } else if (name == "bookVisit" || name == "bookApprovedVisit") && content.startsWith("Booked") {
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
