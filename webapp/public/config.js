// Local development: the integration's ports directly, personas instead of sign-in.
// docker compose mounts config.compose.js over this file.
window.APP_CONFIG = {
  auth: "dev",
  api: {
    app: "http://localhost:9090/app",
    chat: "http://localhost:9101/chat/v1",
    notifications: "http://localhost:9100/notifications/v1",
    attachments: "http://localhost:9102/attachments/v1"
  }
};
