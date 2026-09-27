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
(caseRef), the tenant and their chat conversation.

Everything that happens reaches you as a chat event: a JSON object with "from" (tenant, contractor or
system), "kind" (MESSAGE, FORM_RESPONSE, EVIDENCE or REMINDER), "text", "conversationId" and "data".

People only see what you send with sendMessage (or the forms). Keep messages short and friendly.
End every turn with exactly [done] after you have messaged the people who need to hear from you.

The process:
1. When the request arrives: greet the tenant, call requestEvidence for a photo of the problem, and notify the
   PropertyManager role (INFO) about the new request.
2. When EVIDENCE arrives: tell the tenant what you think the problem is, pick the trade (plumbing or
   electrical) and findContractor, openContractorChat with a short job summary, requestQuote in that
   conversation, and scheduleFollowUp for 48 hours in case the contractor goes quiet.
3. When a REMINDER arrives and no quote has come back: notify PropertyManager (WARNING) and nudge the contractor.
   If the quote already arrived, ignore it.
4. When the contractor's quote arrives (FORM_RESPONSE with amount and visitDate): if the amount is over
   ${quoteApprovalThreshold}, tell the tenant it is awaiting approval and call approveQuote with the caseRef,
   amount, contractor, visitDate and notes. If approved (or under the threshold), confirm the visit with the
   contractor and the tenant, and notifyUser the tenant (SUCCESS). If declined, tell both and requestQuote again.
5. When the contractor reports the job done: tell the tenant and requestFixConfirmation in the tenant's
   conversation.
6. When the tenant confirms it is fixed: closeRequest with a short thank-you, notify PropertyManager (SUCCESS),
   then call endConversation. If it is not fixed, tell the contractor what the tenant said.`
    },
    model: maintenanceModel,
    inputType: CaseInput,
    activities: [
        {activity: sendMessage, description: "Sends a chat message, streamed, to the tenant's or the contractor's "
            + "conversation. Returns the message ID."},
        {activity: requestEvidence, description: "Asks the tenant to upload photos of the problem: opens an upload "
            + "case and posts an upload card in the tenant's chat. EVIDENCE arrives when they submit."},
        {activity: openContractorChat, description: "Opens a chat between you and a contractor about this case and "
            + "posts the job summary. Returns the contractor conversation ID."},
        {activity: requestQuote, description: "Posts the quote form (amount, visitDate, notes) in a contractor "
            + "conversation. The answer arrives as a FORM_RESPONSE."},
        {activity: requestFixConfirmation, description: "Posts the 'Is it fixed?' form in the tenant's "
            + "conversation. The answer arrives as a FORM_RESPONSE with 'fixed'."},
        {activity: notifyRole, description: "Notifies everyone holding a role (PropertyManager or Finance) through "
            + "their inbox. severity is INFO, WARNING, ERROR or SUCCESS."},
        {activity: notifyUser, description: "Notifies one user through their personal inbox. severity is INFO, "
            + "WARNING, ERROR or SUCCESS."},
        {activity: scheduleFollowUp, description: "Sets a durable reminder: after the given hours a REMINDER event "
            + "with the reason reaches you."},
        {activity: closeRequest, description: "Resolves the request: posts the summary to the tenant, closes both "
            + "chats and the upload case."}
    ],
    tools: [findContractor],
    events: {
        chat: {request: CaseEvent, response: string, cardinality: workflow:MULTI_EVENT}
    },
    humanTasks: {
        approveQuote: {
            userRoles: "Finance",
            administratorRoles: "PropertyManager",
            resultType: QuoteDecision,
            title: "Approve a contractor quote",
            description: "A contractor quote is above the approval threshold."
        }
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

@workflow:Activity
function deliverReminder(FollowUp followUp) returns string|error {
    MaintenanceRequest request = check requireRequest(followUp.caseRef);
    if request.status == "RESOLVED" {
        return "request already resolved";
    }
    CaseEvent reminder = {'from: "system", senderId: "timer", kind: "REMINDER", text: followUp.reason};
    return maintenanceAgent.sendData(request.agentId, "chat", reminder);
}
