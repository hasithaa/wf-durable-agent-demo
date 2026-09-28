// Tenant Maintenance portal: plain JS, no build step. Inbox, bell, conversations and upload cards are the
// bal-commons Web Components; this file adds sign-in, maintenance requests and Finance approvals.
import {bearer, configureAuth, devUser} from "./vendor/notification-ui.bundle.js";

const cfg = window.APP_CONFIG;
const PERSONAS = {
  tara: {name: "Tara Lee", roles: ["Tenant"], label: "Tara · tenant"},
  carlos: {name: "Carlos Diaz", roles: ["Contractor"], label: "Carlos · contractor"},
  priya: {name: "Priya Shah", roles: ["PropertyManager"], label: "Priya · property manager"},
  fernando: {name: "Fernando Ruiz", roles: ["Finance"], label: "Fernando · finance"}
};

const state = {user: null, requests: [], current: null};

const $ = (id) => document.getElementById(id);
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v === true ? "" : v);
  }
  for (const child of children.flat()) {
    if (child !== null && child !== undefined) node.append(child.nodeType ? child : document.createTextNode(child));
  }
  return node;
};
const isStaff = () => state.user.roles.some((r) => r === "PropertyManager" || r === "Finance");
const has = (role) => state.user.roles.includes(role);
const time = (iso) => new Date(iso).toLocaleString([], {month: "short", day: "numeric", hour: "2-digit", minute: "2-digit"});

function toast(text) {
  const node = el("div", {class: "toast"}, text);
  document.body.append(node);
  setTimeout(() => node.remove(), 3500);
}

// ---------------------------------------------------------------- auth

async function signIn() {
  if (cfg.auth === "dev") {
    const id = localStorage.getItem("persona") || "tara";
    state.user = {id, ...PERSONAS[id]};
    configureAuth(devUser(id, state.user.roles));
    return true;
  }
  const url = new URL(location.href);
  if (url.pathname === "/callback" && url.searchParams.get("code")) {
    await exchangeCode(url.searchParams.get("code"));
    history.replaceState({}, "", "/");
  }
  const token = sessionStorage.getItem("token");
  if (!token) {
    await startLogin();
    return false;
  }
  const claims = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
  if (claims.exp && claims.exp * 1000 < Date.now()) {
    sessionStorage.removeItem("token");
    await startLogin();
    return false;
  }
  const groups = Array.isArray(claims.groups) ? claims.groups : String(claims.groups || "").split(",").filter(Boolean);
  state.user = {id: claims.username || claims.sub, name: claims.given_name || claims.username, roles: groups};
  configureAuth(bearer(() => sessionStorage.getItem("token"), () => { sessionStorage.removeItem("token"); location.href = "/"; }));
  return true;
}

async function startLogin() {
  const verifier = base64url(crypto.getRandomValues(new Uint8Array(32)));
  const challenge = base64url(new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(verifier))));
  sessionStorage.setItem("verifier", verifier);
  const params = new URLSearchParams({
    response_type: "code", client_id: cfg.thunder.clientId, redirect_uri: location.origin + "/callback",
    scope: "openid profile email groups", code_challenge: challenge, code_challenge_method: "S256"
  });
  location.href = `${cfg.thunder.url}/oauth2/authorize?${params}`;
}

async function exchangeCode(code) {
  const body = new URLSearchParams({
    grant_type: "authorization_code", code, client_id: cfg.thunder.clientId,
    redirect_uri: location.origin + "/callback", code_verifier: sessionStorage.getItem("verifier") || ""
  });
  const response = await fetch(cfg.thunder.tokenPath, {method: "POST", body});
  const tokens = await response.json();
  if (tokens.access_token) sessionStorage.setItem("token", tokens.access_token);
}

function base64url(bytes) {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function authHeaders() {
  if (cfg.auth === "dev") return {"x-user-id": state.user.id, "x-user-roles": state.user.roles.join(",")};
  return {Authorization: `Bearer ${sessionStorage.getItem("token")}`};
}

function renderWho() {
  const who = $("who");
  who.replaceChildren();
  if (cfg.auth === "dev") {
    const select = el("select", {onchange: (e) => { localStorage.setItem("persona", e.target.value); location.reload(); }},
      Object.entries(PERSONAS).map(([id, p]) => el("option", {value: id, selected: id === state.user.id}, p.label)));
    who.append("Acting as", select);
  } else {
    who.append(`${state.user.name} · ${state.user.roles.join(", ") || "no roles"}`,
      el("button", {class: "link", onclick: () => { sessionStorage.clear(); location.href = "/"; }}, "Switch user"));
  }
}

// The app's own API (requests, approvals); the components call their services themselves.
async function api(path, {method = "GET", body} = {}) {
  const headers = {...authHeaders()};
  if (body !== undefined) headers["content-type"] = "application/json";
  const response = await fetch(cfg.api.app + path, {method, headers, body: body === undefined ? undefined : JSON.stringify(body)});
  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try { message = JSON.parse(text).message || text; } catch (_) {}
    throw new Error(`${response.status}: ${message}`);
  }
  return response.status === 204 ? null : response.json();
}

// ---------------------------------------------------------------- requests

async function loadRequests() {
  state.requests = await api("/requests");
  $("requests-title").textContent = isStaff() ? "All requests" : has("Contractor") ? "Requests" : "My requests";
  const list = $("requests");
  list.replaceChildren(...state.requests.map((r) => el("li", {
    class: state.current?.caseRef === r.caseRef ? "active" : "",
    onclick: () => openRequest(r.caseRef)
  }, el("div", {}, `${r.caseRef} · ${r.title} `, el("span", {class: `pill ${r.status}`}, r.status)),
     el("div", {class: "meta"}, `Unit ${r.unit} · ${r.tenantId} · ${time(r.createdAt)}`))));
  if (!state.requests.length) list.append(el("li", {class: "meta"}, "Nothing yet."));
}

function openChat(conversationId) {
  state.current = {kind: "chat", id: conversationId};
  $("empty").hidden = true;
  $("detail").hidden = true;
  const chat = $("chat");
  chat.hidden = false;
  chat.setAttribute("conversation-id", conversationId);
  $("conversations").selected = conversationId;
}

// A request the caller takes part in opens its chat; staff see the request with its evidence.
async function openRequest(caseRef) {
  const request = state.requests.find((r) => r.caseRef === caseRef);
  if (!request) return;
  const mine = state.user.id === request.tenantId ? request.conversationId : null;
  if (mine) return openChat(mine);
  state.current = {kind: "request", caseRef};
  $("empty").hidden = true;
  $("chat").hidden = true;
  const detail = $("detail");
  detail.hidden = false;
  detail.replaceChildren(el("h2", {}, `${request.caseRef} · ${request.title}`),
    el("dl", {}, el("dt", {}, "Status"), el("dd", {}, request.status), el("dt", {}, "Unit"), el("dd", {}, request.unit),
      el("dt", {}, "Tenant"), el("dd", {}, request.tenantId), el("dt", {}, "Opened"), el("dd", {}, time(request.createdAt)),
      el("dt", {}, "Agent instance"), el("dd", {}, request.agentId)));
  try {
    const cases = await fetch(`${cfg.api.attachments}/admin/cases?correlationId=${encodeURIComponent(caseRef)}`,
      {headers: authHeaders()}).then((r) => r.ok ? r.json() : {items: []});
    for (const c of cases.items) {
      detail.append(el("h2", {}, "Evidence"), el("commons-upload-case", {"base-url": cfg.api.attachments, "case-id": c.id}));
    }
  } catch (_) {}
  loadRequests();
}

// ---------------------------------------------------------------- approvals

async function loadTasks() {
  if (!isStaff()) return;
  $("tasks-panel").hidden = false;
  const tasks = await api("/tasks");
  $("tasks").replaceChildren(...tasks.map((t) => {
    const input = t.input || {};
    const comment = el("input", {placeholder: "Comment (optional)"});
    const decide = (approved) => async () => {
      try {
        await api(`/tasks/${t.taskId}/complete`, {method: "POST", body: {approved, comment: comment.value}});
        toast(approved ? "Approved" : "Declined");
        loadTasks();
      } catch (e) { toast(e.message); }
    };
    return el("li", {class: "task"}, el("strong", {}, t.title),
      el("div", {}, `${input.caseRef} · ${input.contractor} quoted $${input.amount}`),
      el("div", {class: "meta"}, `Visit ${input.visitDate}${input.notes ? " · " + input.notes : ""}`),
      comment, el("div", {class: "actions"}, el("button", {class: "primary", onclick: decide(true)}, "Approve"),
        el("button", {onclick: decide(false)}, "Decline")));
  }));
  if (!tasks.length) $("tasks").append(el("li", {class: "meta"}, "Nothing to approve."));
}

// ---------------------------------------------------------------- start

function wireComponents() {
  const me = state.user.id;
  $("bell").setAttribute("base-url", cfg.api.notifications);
  $("inbox").setAttribute("base-url", cfg.api.notifications);
  const list = $("conversations");
  list.me = me;
  list.setAttribute("base-url", cfg.api.chat);
  const chat = $("chat");
  chat.me = me;
  chat.setAttribute("attachments-url", cfg.api.attachments);
  chat.setAttribute("base-url", cfg.api.chat);

  list.addEventListener("commons-conversation-select", (e) => openChat(e.detail.conversation.id));
  $("bell").addEventListener("commons-bell-click", () => $("inbox").scrollIntoView({behavior: "smooth"}));
  $("inbox").addEventListener("commons-notification-click", (e) => {
    const caseRef = e.detail.notification.correlationId;
    if (caseRef && state.requests.some((r) => r.caseRef === caseRef)) openRequest(caseRef);
  });
}

$("request-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const body = Object.fromEntries(new FormData(form));
  body.tenantName = state.user.name;
  try {
    const request = await api("/requests", {method: "POST", body});
    form.reset();
    toast(`Opened ${request.caseRef}`);
    await loadRequests();
    openChat(request.conversationId);
  } catch (e) { toast(e.message); }
});

(async () => {
  if (!(await signIn())) return;
  renderWho();
  $("new-request").hidden = isStaff() || has("Contractor");
  wireComponents();
  await Promise.allSettled([loadRequests(), loadTasks()]);
  // Requests and approvals come from the app API, which has no stream of its own.
  setInterval(() => { loadRequests(); loadTasks(); }, 5000);
})();
