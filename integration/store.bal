import ballerina/sql;
import ballerinax/java.jdbc;
import commons/service_commons;
import commons/service_commons.db as sdb;

final sdb:Migration[] & readonly migrations = [
    {
        version: 1,
        description: "maintenance requests, processed webhook events and pending agent turns",
        statements: [
            string `CREATE TABLE {prefix}request (
                case_ref VARCHAR(32) NOT NULL PRIMARY KEY,
                agent_id VARCHAR(255) NOT NULL,
                tenant_id VARCHAR(255) NOT NULL,
                title VARCHAR(500) NOT NULL,
                unit VARCHAR(64) NOT NULL,
                status VARCHAR(32) NOT NULL,
                conversation_id VARCHAR(26) NOT NULL,
                contractor_conversation_id VARCHAR(26),
                created_at BIGINT NOT NULL)`,
            "CREATE INDEX {prefix}request_tenant ON {prefix}request (tenant_id)",
            string `CREATE TABLE {prefix}event (
                event_id VARCHAR(64) NOT NULL PRIMARY KEY,
                received_at BIGINT NOT NULL)`,
            string `CREATE TABLE {prefix}turn (
                token VARCHAR(255) NOT NULL PRIMARY KEY,
                case_ref VARCHAR(32) NOT NULL,
                conversation_id VARCHAR(26) NOT NULL,
                answered INT NOT NULL)`
        ]
    }
];

type RequestRow record {|
    string case_ref;
    string agent_id;
    string tenant_id;
    string title;
    string unit;
    string status;
    string conversation_id;
    string? contractor_conversation_id;
    int created_at;
|};

type TurnRow record {|
    string token;
    string case_ref;
    string conversation_id;
|};

final jdbc:Client appDb = check sdb:connect(db);

function initStore() returns error? {
    if db.initSchema {
        check sdb:migrate(appDb, db.dbType, "mr_", migrations);
    }
}

isolated function nextCaseRef() returns string|error {
    int count = check appDb->queryRow(`SELECT COUNT(*) FROM mr_request`);
    return string `MR-${1001 + count}`;
}

isolated function saveRequest(MaintenanceRequest request) returns error? {
    _ = check appDb->execute(`INSERT INTO mr_request (case_ref, agent_id, tenant_id, title, unit, status,
        conversation_id, created_at) VALUES (${request.caseRef}, ${request.agentId}, ${request.tenantId},
        ${request.title}, ${request.unit}, ${request.status}, ${request.conversationId},
        ${service_commons:nowMillis()})`);
}

isolated function requestByRef(string caseRef) returns MaintenanceRequest?|error {
    MaintenanceRequest[] found = check requests(`SELECT * FROM mr_request WHERE case_ref = ${caseRef}`);
    return found.length() == 0 ? () : found[0];
}

isolated function requestsFor(string? tenantId) returns MaintenanceRequest[]|error {
    return tenantId is string
        ? requests(`SELECT * FROM mr_request WHERE tenant_id = ${tenantId} ORDER BY created_at DESC`)
        : requests(`SELECT * FROM mr_request ORDER BY created_at DESC`);
}

isolated function requests(sql:ParameterizedQuery query) returns MaintenanceRequest[]|error {
    stream<RequestRow, sql:Error?> rows = appDb->query(query);
    return from RequestRow row in rows
        select {
            caseRef: row.case_ref,
            agentId: row.agent_id,
            tenantId: row.tenant_id,
            title: row.title,
            unit: row.unit,
            status: row.status,
            conversationId: row.conversation_id,
            contractorConversationId: row.contractor_conversation_id,
            createdAt: service_commons:toIso(row.created_at)
        };
}

isolated function updateStatus(string caseRef, string status) returns error? {
    _ = check appDb->execute(`UPDATE mr_request SET status = ${status} WHERE case_ref = ${caseRef}`);
}

isolated function setContractorConversation(string caseRef, string conversationId) returns error? {
    _ = check appDb->execute(`UPDATE mr_request SET contractor_conversation_id = ${conversationId}
        WHERE case_ref = ${caseRef}`);
}

// Webhooks arrive at least once; the first delivery of an event wins.
isolated function firstDelivery(string eventId) returns boolean|error {
    sql:ExecutionResult|sql:Error result = appDb->execute(`INSERT INTO mr_event (event_id, received_at)
        VALUES (${eventId}, ${service_commons:nowMillis()})`);
    if result is sql:Error {
        if sdb:isDuplicateKey(result) {
            return false;
        }
        return result;
    }
    return true;
}

isolated function recordTurn(string token, string caseRef, string conversationId) returns error? {
    _ = check appDb->execute(`INSERT INTO mr_turn (token, case_ref, conversation_id, answered)
        VALUES (${token}, ${caseRef}, ${conversationId}, 0)`);
}

isolated function markTurnAnswered(string token) returns error? {
    _ = check appDb->execute(`UPDATE mr_turn SET answered = 1 WHERE token = ${token}`);
}

isolated function unansweredTurns() returns TurnRow[]|error {
    stream<TurnRow, sql:Error?> rows = appDb->query(`SELECT token, case_ref, conversation_id FROM mr_turn
        WHERE answered = 0`);
    return from TurnRow row in rows select row;
}
