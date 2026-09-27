import commons/attachment;
import commons/chat;
import commons/notification;

// The agent's participant ID in chat and its watcher ID on attachment cases.
const AGENT_ID = "agent:maintenance";

// The workflow acts as a service account: the API key admits it, the headers name it in dev mode.
final map<string> & readonly serviceHeaders = {
    "x-api-key": serviceApiKey,
    "x-user-id": "maintenance-workflow",
    "x-user-scopes": "*"
};

final notification:Client notifications = check new (notificationUrl, headers = serviceHeaders);
final chat:Client chats = check new (chatUrl, headers = serviceHeaders);
final attachment:Client attachments = check new (attachmentUrl, headers = serviceHeaders);
