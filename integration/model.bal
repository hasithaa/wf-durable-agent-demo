import ballerina/ai;
import ballerina/http;
import ballerina/log;

isolated function selectModel() returns ai:ModelProvider|error {
    if modelProvider == "ollama" {
        log:printInfo(string `Maintenance agent uses Ollama model ${ollamaModel} at ${ollamaUrl}`);
        return new ai:Wso2ModelProvider(ollamaBridgeUrl, "ollama");
    }
    if modelProvider != "scripted" {
        ai:Wso2ModelProvider|ai:Error wso2 = ai:getDefaultModelProvider();
        if wso2 is ai:Wso2ModelProvider {
            log:printInfo("Maintenance agent uses the WSO2 default model provider");
            return wso2;
        }
        if modelProvider == "wso2" {
            return error("modelProvider is wso2 but no WSO2 AI token is configured", wso2);
        }
    }
    log:printInfo("Maintenance agent uses the scripted model");
    return new ai:Wso2ModelProvider(scriptedModelUrl, "scripted");
}

final http:Client ollama = check new (ollamaUrl, timeout = 600);

// Translates the WSO2 provider's chat-completions protocol (OpenAI function calling) to Ollama's /api/chat.
// Unlike ballerinax/ai.ollama 1.2.5, it replays the agent's earlier tool calls as `tool_calls`, without which a
// model sees results of calls it never made and repeats them.
isolated function ollamaTurn(map<json> request) returns map<json>|error {
    json[] messages = request["messages"] is json[] ? <json[]>request["messages"] : [];
    json[] translated = [];
    foreach json m in messages {
        if m !is map<json> {
            continue;
        }
        json call = m["function_call"];
        if m["role"] == "assistant" && call is map<json> {
            json arguments = call["arguments"];
            translated.push({
                role: "assistant",
                content: m["content"] is string ? m["content"] : "",
                tool_calls: [{'function: {name: call["name"], arguments: arguments is string
                    ? check arguments.fromJsonString() : arguments}}]
            });
        } else if m["role"] == "function" {
            translated.push({role: "tool", content: m["content"], name: m["name"]});
        } else {
            translated.push({role: m["role"], content: m["content"] is string ? m["content"] : ""});
        }
    }
    json[] functions = request["functions"] is json[] ? <json[]>request["functions"] : [];
    map<json> response = check ollama->post("/api/chat", {
        model: ollamaModel,
        messages: translated,
        tools: from json f in functions select {'type: "function", 'function: singleTypes(f)},
        'stream: false,
        options: {temperature: 0, num_ctx: ollamaContextSize}
    });
    json reply = response["message"];
    if reply !is map<json> {
        return error("Ollama returned no message");
    }
    json toolCalls = reply["tool_calls"];
    if toolCalls is json[] && toolCalls.length() > 0 && toolCalls[0] is map<json> {
        json fn = (<map<json>>toolCalls[0])["function"];
        if fn is map<json> {
            json arguments = fn["arguments"];
            return {role: "assistant", content: (), function_call: {name: fn["name"],
                arguments: arguments is string ? arguments : arguments.toJsonString()}};
        }
    }
    return {role: "assistant", content: reply["content"]};
}

// Ollama rejects JSON Schema type lists such as ["string", "null"] (nilable parameters); keeps the non-null type.
isolated function singleTypes(json schema) returns json {
    if schema is json[] {
        return from json item in schema select singleTypes(item);
    }
    if schema !is map<json> {
        return schema;
    }
    map<json> result = {};
    foreach [string, json] [key, value] in schema.entries() {
        if key == "type" && value is json[] {
            json[] types = from json t in value where t != "null" select t;
            result[key] = types.length() > 0 ? types[0] : "string";
        } else {
            result[key] = singleTypes(value);
        }
    }
    return result;
}
