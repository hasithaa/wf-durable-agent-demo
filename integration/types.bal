// What the agent is started with: the request as the tenant reported it.
type CaseInput record {|
    string caseRef;
    string tenantId;
    string tenantName;
    string unit;
    string issue;
    string conversationId;
|};

// Everything that reaches the agent arrives as one of these on its `chat` event: people's messages, the
// contractor's quote and the tenant's fix confirmation (form answers), submitted photos, and follow-up reminders.
type CaseEvent record {|
    "tenant"|"contractor"|"system" 'from;
    string senderId;
    "MESSAGE"|"QUOTE"|"FIX_CONFIRMATION"|"EVIDENCE"|"REMINDER" kind;
    string text;
    string conversationId?;
    json data?;
|};

type Contractor record {|
    string userId;
    string name;
    string trade;
|};

// A contractor's quote, as submitted in the quote form.
type Quote record {|
    string caseRef;
    decimal amount;
    string contractor;
    string visitDate;
    string? notes;
|};

// Finance's decision on an over-threshold booking.
type QuoteDecision record {|
    boolean approved;
    string comment?;
|};

type FollowUp record {|
    string caseRef;
    int delaySeconds;
    string reason;
|};

// A maintenance request as the app tracks it; the agent instance is its durable owner.
type MaintenanceRequest record {|
    string caseRef;
    string agentId;
    string tenantId;
    string title;
    string unit;
    string status;
    string conversationId;
    string? contractorConversationId;
    string createdAt;
|};

type NewRequest record {|
    string title;
    string issue;
    string unit;
    string tenantName?;
|};
