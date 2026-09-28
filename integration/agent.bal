import ballerina/ai;
import ballerina/workflow;

@ai:AgentTool
isolated function findContractor(string trade) returns Contractor|error {
    foreach Contractor contractor in contractors {
        if contractor.trade == trade.toLowerAscii() {
            return contractor;
        }
    }
    return error(string `No contractor for ${trade}; known trades are plumbing and electrical`);
}

final ai:ModelProvider maintenanceModel = check selectModel();

// One durable agent instance owns one maintenance request, for as long as it takes.
final workflow:DurableAgent maintenanceAgent = check new ({
    systemPrompt: {
        role: "Maintenance coordinator for a residential property management company.",
        instructions: string `You own one maintenance request from report to resolution. The input names the case
(caseRef) and the tenant. Every tool takes the caseRef; you talk to people with sendMessage to "tenant" or
"contractor".

Everything that happens reaches you as a chat event: a JSON object with "from" (tenant, contractor or
system), "kind" (MESSAGE, EVIDENCE, REMINDER, QUOTE or FIX_CONFIRMATION), "text" and "data".

Act only by calling tools. Never describe or promise what you are about to do: do it, by calling every tool the
step below lists, in the same turn. People see what you send with sendMessage and the forms; keep messages short
and friendly. Send each person at most one message per turn. When the step's tools are done, stop: reply with a
one-line summary and no tool call, which ends the turn. When a question comes in while you cannot use tools,
answer it directly in a sentence or two.

Do only the step for the event you just received, then end the turn and wait for the next event.

The process:
1. When the request arrives: greet the tenant, call requestEvidence for a photo of the problem, and notify the
   PropertyManager role (INFO) about the new request.
2. When EVIDENCE arrives: tell the tenant what you think the problem is, pick the trade (plumbing or
   electrical) and findContractor, openContractorChat with a short job summary, then requestQuote.
3. A REMINDER means the contractor was already chased and PropertyManager warned: tell the tenant the
   contractor is taking longer than expected.
4. When a QUOTE arrives: if the amount is up to ${quoteApprovalThreshold}, call bookVisit. If it is over, tell
   the tenant it needs Finance's approval and call bookApprovedVisit. The booking tools confirm the visit with
   both people; never tell anyone a visit is booked yourself. If a booking is rejected, tell both why and
   requestQuote again.
5. When the contractor reports the job done: tell the tenant and requestFixConfirmation.
6. When FIX_CONFIRMATION says it is fixed: closeRequest with a short thank-you, notify PropertyManager (SUCCESS),
   then call endConversation. If it is not fixed, tell the contractor what the tenant said.`
    },
    model: maintenanceModel,
    inputType: CaseInput,
    activities: [
        {activity: sendMessage, description: "Sends a chat message to the tenant or the contractor of a case: "
            + "to is \"tenant\" or \"contractor\"."},
        {activity: requestEvidence, description: "Asks the tenant to upload photos of the problem: opens an upload "
            + "case and posts an upload card in the tenant's chat. EVIDENCE arrives when they submit."},
        {activity: openContractorChat, description: "Opens a chat between you and a contractor (contractorId from "
            + "findContractor) about the case and posts the job summary to them."},
        {activity: requestQuote, description: "Sends the case's contractor the quote form (amount, visitDate, "
            + "notes). The answer arrives as a QUOTE event; if none comes in 48 hours, a REMINDER does."},
        {activity: requestFixConfirmation, description: "Sends the tenant the 'Is it fixed?' form. The answer "
            + "arrives as a FIX_CONFIRMATION event."},
        {activity: notifyRole, description: "Notifies everyone holding a role (PropertyManager or Finance) through "
            + "their inbox. Optional: title, and severity INFO, WARNING, ERROR or SUCCESS."},
        {activity: notifyUser, description: "Notifies one user through their personal inbox. Optional: title, and "
            + "severity INFO, WARNING, ERROR or SUCCESS."},
        {activity: bookVisit, description: "Books the visit the contractor quoted and confirms it with the "
            + "contractor and the tenant. Refuses quotes over the approval threshold."},
        {
            activity: bookApprovedVisit,
            description: "Books a visit whose quote is over the approval threshold. Finance approves it first; if "
                + "Finance rejects it, the booking fails with their reason.",
            approvalPolicy: {
                userRoles: "Finance",
                administratorRoles: "PropertyManager",
                title: "Approve a contractor quote",
                description: "The quote is over the approval threshold."
            }
        },
        {activity: closeRequest, description: "Resolves the request: posts the summary to the tenant, closes both "
            + "chats and the upload case."}
    ],
    tools: [findContractor],
    events: {
        chat: {request: CaseEvent, response: string, cardinality: workflow:MULTI_EVENT}
    },
    maxIter: 16
});

// A durable reminder: sleeps through the delay, then tells the agent.
@workflow:Workflow
function followUpTimer(workflow:Context ctx, FollowUp followUp) returns error? {
    check ctx.sleep({seconds: <decimal>followUp.delaySeconds});
    string delivered = check ctx->callActivity(deliverReminder, {"followUp": followUp});
    _ = delivered;
}

// Escalation is policy, so the timer does it: with no quote yet it warns PropertyManager and nudges the
// contractor, then tells the agent.
@workflow:Activity
function deliverReminder(FollowUp followUp) returns string|error {
    MaintenanceRequest request = check requireRequest(followUp.caseRef);
    if request.status != "OPEN" || latestQuote(followUp.caseRef) is Quote {
        return "nothing to chase";
    }
    _ = check notifyRole(followUp.caseRef, "PropertyManager",
        string `No quote for ${followUp.caseRef} (unit ${request.unit}) after 48 hours; the contractor was reminded.`,
        string `No contractor reply on ${followUp.caseRef}`, "WARNING");
    _ = check sendMessage(followUp.caseRef, "contractor", "Friendly reminder: could you send your quote for this job?");
    CaseEvent reminder = {'from: "system", senderId: "timer", kind: "REMINDER", text: followUp.reason};
    return maintenanceAgent.sendData(request.agentId, "chat", reminder);
}
