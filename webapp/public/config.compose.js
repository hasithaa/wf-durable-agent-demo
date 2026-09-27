// docker compose: everything same-origin through the webapp's nginx, signed in with Thunder.
window.APP_CONFIG = {
  auth: "thunder",
  thunder: {url: "https://localhost:8090", clientId: "tenant-portal", tokenPath: "/oidc/token"},
  api: {
    app: "/api/app",
    chat: "/api/chat",
    notifications: "/api/notifications",
    attachments: "/api/attachments"
  }
};
