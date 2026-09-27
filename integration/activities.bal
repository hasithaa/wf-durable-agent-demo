import ballerina/crypto;
import ballerina/lang.runtime;
import ballerina/workflow;
import commons/attachment;
import commons/chat;
import commons/notification;

// Every side effect of the agent is one of these durable activities.

@workflow:Activity
function sendMessage(string conversationId, string text) returns string|error {
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
    _ = check sendMessage(conversation.id, summary);
    return conversation.id;
}

@workflow:Activity
function requestQuote(string conversationId) returns string|error {
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
function requestFixConfirmation(string conversationId) returns string|error {
    chat:Message form = check chats->sendMessage(conversationId, {
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
function notifyRole(string caseRef, string role, string title, string body, string severity) returns string|error {
    notification:Notification sent = check notifications->send({
        recipientType: notification:ROLE,
        recipientId: role,
        severity: check severity.ensureType(),
        title,
        body,
        category: "maintenance",
        correlationId: caseRef,
        actionUrl: "#/requests/" + caseRef,
        sender: AGENT_ID,
        idempotencyKey: notificationKey(caseRef, role, title, body)
    });
    return sent.id;
}

@workflow:Activity
function notifyUser(string caseRef, string userId, string title, string body, string severity) returns string|error {
    notification:Notification sent = check notifications->send({
        recipientType: notification:USER,
        recipientId: userId,
        severity: check severity.ensureType(),
        title,
        body,
        category: "maintenance",
        correlationId: caseRef,
        actionUrl: "#/requests/" + caseRef,
        sender: AGENT_ID,
        idempotencyKey: notificationKey(caseRef, userId, title, body)
    });
    return sent.id;
}

// The same notification about the same case is sent once, however often the activity runs.
isolated function notificationKey(string caseRef, string recipient, string title, string body) returns string =>
    caseRef + "/" + crypto:hashSha256((recipient + "\n" + title + "\n" + body).toBytes()).toBase16().substring(0, 32);

@workflow:Activity
function scheduleFollowUp(string caseRef, int hours, string reason) returns string|error {
    int delaySeconds = int:max(1, <int>(<decimal>hours * demoSecondsPerHour));
    string timerId = check workflow:run(followUpTimer, {caseRef, delaySeconds, reason});
    return string `Reminder due in ${hours} h (timer ${timerId})`;
}

@workflow:Activity
function closeRequest(string caseRef, string summary) returns string|error {
    MaintenanceRequest request = check requireRequest(caseRef);
    check updateStatus(caseRef, "RESOLVED");
    _ = check sendMessage(request.conversationId, summary);
    check closeQuietly(request.conversationId);
    string? contractorConversation = request.contractorConversationId;
    if contractorConversation is string {
        _ = check sendMessage(contractorConversation, string `${caseRef} is closed. Thank you!`);
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
