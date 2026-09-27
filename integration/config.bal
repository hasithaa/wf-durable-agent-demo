import commons/service_commons.auth as sauth;
import commons/service_commons.db as sdb;

# Port of the app API, the webhook receivers and the scripted model.
configurable int appPort = 9090;
# Notification service, as this process reaches it.
configurable string notificationUrl = "http://localhost:9100/notifications/v1";
# Chat service, as this process reaches it.
configurable string chatUrl = "http://localhost:9101/chat/v1";
# Attachment service, as this process reaches it.
configurable string attachmentUrl = "http://localhost:9102/attachments/v1";
# API key the workflow presents to the commons services.
configurable string serviceApiKey = "demo-service-key";
# Secret of the agent's chat and attachment webhooks.
configurable string webhookSecret = "demo-webhook-secret";
# Auth of the app API; mirrors the commons services.
configurable sauth:AuthConfig auth = {};
# The app's own tables.
configurable sdb:DbConfig db = {};
# Quotes above this need Finance approval.
configurable decimal quoteApprovalThreshold = 500;
# Compresses the agent's follow-up delays: seconds per hour, so 48 h is 2 minutes at 2.5.
configurable decimal demoSecondsPerHour = 2.5;
# Scripted model endpoint, used when no WSO2 AI token is configured.
configurable string scriptedModelUrl = "http://localhost:9090/mockllm";
# Believable "thinking" pause of each scripted model call.
configurable decimal scriptedThinkSeconds = 0.8;
# Pause between streamed chunks of an agent message.
configurable decimal streamChunkSeconds = 0.05;
# Origins allowed to call the app API from a browser.
configurable string[] corsAllowOrigins = ["*"];
# Tradespeople the agent can call on.
configurable Contractor[] & readonly contractors = [
    {userId: "carlos", name: "Carlos Diaz", trade: "plumbing"},
    {userId: "erin", name: "Erin Volt", trade: "electrical"}
];
