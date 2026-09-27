// Tenant Maintenance portal: plain JS, no build step. Talks to the app API and the three commons services.
const cfg = window.APP_CONFIG;
const PERSONAS = {
  tara: {name: "Tara Lee", roles: ["Tenant"], label: "Tara · tenant"},
  carlos: {name: "Carlos Diaz", roles: ["Contractor"], label: "Carlos · contractor"},
  priya: {name: "Priya Shah", roles: ["PropertyManager"], label: "Priya · property manager"},
  fernando: {name: "Fernando Ruiz", roles: ["Finance"], label: "Fernando · finance"}
};
const AGENT = "agent:maintenance";

const state = {
  user: null,               // {id, name, roles}
  requests: [],
  conversations: [],
  current: null,            // {kind: "chat", id} | {kind: "request", caseRef}
  messages: new Map(),      // id -> message, for the open conversation
  inboxBox: "all",
  streams: []
};

const $ = (id) => document.getElementById(id);
const el = (tag, attrs = {}, ...children) => {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") node.className = v;
    else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
    else if (v !== undefined && v !== null && v !== false) node.setAttribute(k, v === true ? "" : v);
  }
  append(node, children);
  return node;
};
// Appends children, skipping null and undefined (the DOM would render them as text).
const append = (node, children) => {
  for (const child of children.flat()) {
    if (child !== null && child !== undefined) node.append(child.nodeType ? child : document.createTextNode(child));
  }
};
const replace = (node, ...children) => { node.replaceChildren(); append(node, children); };
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

// ---------------------------------------------------------------- API

async function api(base, path, {method = "GET", body, raw, contentType} = {}) {
  const headers = {...authHeaders()};
  let payload = body;
  if (raw) {
    payload = raw;
    headers["content-type"] = contentType || "application/octet-stream";
  } else if (body !== undefined) {
    payload = JSON.stringify(body);
    headers["content-type"] = "application/json";
  }
  const response = await fetch(cfg.api[base] + path, {method, headers, body: payload});
  if (response.status === 401 && cfg.auth !== "dev") {
    sessionStorage.removeItem("token");
    location.href = "/";
  }
  if (!response.ok) {
    const text = await response.text();
    let message = text;
    try { message = JSON.parse(text).message || text; } catch (_) {}
    throw new Error(`${response.status}: ${message}`);
  }
  return response.status === 204 ? null : response.json();
}

// A signed link's URL starts with the service's base path; route it through the configured base.
const linkUrl = (url) => cfg.api.attachments + url.replace(/^\/attachments\/v1/, "");

// ---------------------------------------------------------------- lists

async function loadRequests() {
  state.requests = await api("app", "/requests");
  $("requests-title").textContent = isStaff() ? "All requests" : has("Contractor") ? "Requests" : "My requests";
  const list = $("requests");
  replace(list, ...state.requests.map((r) => el("li", {
    class: state.current?.caseRef === r.caseRef ? "active" : "",
    onclick: () => openRequest(r.caseRef)
  }, el("div", {}, `${r.caseRef} · ${r.title} `, el("span", {class: `pill ${r.status}`}, r.status)),
     el("div", {class: "meta"}, `Unit ${r.unit} · ${r.tenantId} · ${time(r.createdAt)}`))));
  if (!state.requests.length) list.append(el("li", {class: "meta"}, "Nothing yet."));
}

async function loadConversations() {
  const page = await api("chat", "/conversations?limit=50");
  state.conversations = page.items;
  const list = $("conversations");
  replace(list, ...page.items.map((c) => el("li", {
    class: state.current?.id === c.id ? "active" : "", onclick: () => openChat(c.id)
  }, c.unread ? el("span", {class: "unread"}, c.unread) : null,
     el("div", {}, c.title || c.correlationId, " ", el("span", {class: `pill ${c.status}`}, c.status)),
     el("div", {class: "meta"}, `with ${c.participants.filter((p) => p.participantId !== state.user.id)
       .map((p) => p.displayName || p.participantId).join(", ")} · ${time(c.updatedAt)}`))));
  if (!page.items.length) list.append(el("li", {class: "meta"}, "No conversations."));
}

// ---------------------------------------------------------------- chat

async function openChat(id) {
  state.current = {kind: "chat", id};
  state.messages.clear();
  $("empty").hidden = true;
  $("detail").hidden = true;
  $("chat").hidden = false;
  const conversation = await api("chat", `/conversations/${id}`);
  const others = conversation.participants.filter((p) => p.participantId !== state.user.id);
  replace($("chat-head"), conversation.title || conversation.correlationId,
    el("div", {class: "meta"}, `${conversation.status} · with ${others.map((p) => p.displayName || p.participantId).join(", ")}`));
  $("composer").hidden = conversation.status !== "OPEN";
  const history = await api("chat", `/conversations/${id}/messages?limit=100`);
  history.items.forEach((m) => state.messages.set(m.id, m));
  renderMessages();
  markRead();
  loadConversations();
}

function renderMessages() {
  const box = $("messages");
  const sorted = [...state.messages.values()].sort((a, b) => a.seq - b.seq);
  // Form answers are shown inside the form they answer.
  const answers = new Map(sorted.filter((m) => m.kind === "FORM_RESPONSE").map((m) => [m.replyTo, m]));
  replace(box, ...sorted.filter((m) => m.kind !== "FORM_RESPONSE" || !state.messages.has(m.replyTo))
    .map((m) => renderMessage(m, answers.get(m.id))));
  box.scrollTop = box.scrollHeight;
}

function renderMessage(m, answer) {
  const mine = m.senderId === state.user.id;
  const from = m.senderId === AGENT ? "Maintenance assistant" : mine ? "You" : m.senderId;
  const node = el("div", {class: `msg ${mine ? "mine" : ""} ${m.status === "STREAMING" ? "streaming" : ""}`, id: `m-${m.id}`},
    el("div", {class: "from"}, `${from} · ${time(m.createdAt)}`));
  switch (m.kind) {
    case "TEXT":
    case "SYSTEM":
      node.append(el("div", {class: "text"}, typeof m.content === "string" ? m.content : JSON.stringify(m.content)));
      break;
    case "FORM":
      node.append(renderForm(m, answer));
      break;
    case "ATTACHMENT_REF":
      node.append(renderUploadCard(m.content));
      break;
    case "FORM_RESPONSE":
      node.append(el("div", {class: "text"}, describeAnswers(m.content)));
      break;
    default:
      node.append(el("div", {class: "text"}, JSON.stringify(m.content)));
  }
  return node;
}

// Renders the flat JSON Schema subset the agent sends: string, number, date and boolean fields.
function renderForm(m, answer) {
  const {title, schema = {}, submitLabel = "Submit"} = m.content;
  const card = el("form", {class: "card"}, el("strong", {}, title || "Form"));
  const required = new Set(schema.required || []);
  const mine = m.senderId === state.user.id;
  for (const [name, field] of Object.entries(schema.properties || {})) {
    const value = answer?.content?.[name];
    if (field.type === "boolean") {
      card.append(el("label", {class: "check"}, el("input", {type: "checkbox", name, checked: value === true,
        disabled: !!answer || mine}), field.title || name));
    } else {
      card.append(el("label", {}, field.title || name, el("input", {
        name, required: required.has(name), disabled: !!answer || mine, value: value ?? "",
        type: field.type === "number" ? "number" : field.format === "date" ? "date" : "text", step: "any"
      })));
    }
  }
  if (answer) {
    card.append(el("div", {class: "done"}, `✓ Answered by ${answer.senderId === state.user.id ? "you" : answer.senderId}`));
  } else if (!mine && !m.answeredAt) {
    card.append(el("button", {type: "submit"}, submitLabel));
    card.addEventListener("submit", async (event) => {
      event.preventDefault();
      const values = {};
      for (const [name, field] of Object.entries(schema.properties || {})) {
        const input = card.elements[name];
        if (field.type === "boolean") values[name] = input.checked;
        else if (input.value !== "") values[name] = field.type === "number" ? Number(input.value) : input.value;
      }
      try {
        await api("chat", `/conversations/${m.conversationId}/messages`,
          {method: "POST", body: {kind: "FORM_RESPONSE", replyTo: m.id, content: values}});
      } catch (e) { toast(e.message); }
    });
  }
  return card;
}

function describeAnswers(values) {
  return Object.entries(values || {}).map(([k, v]) => `${k}: ${v}`).join(" · ");
}

// An upload request from the agent: the attachment case's slots, files and an upload control for its subjects.
function renderUploadCard(ref) {
  const card = el("div", {class: "card"}, el("strong", {}, ref.name || "Upload"), el("div", {class: "meta"}, "Loading…"));
  api("attachments", `/cases/${ref.caseId}`).then(async (c) => {
    const thumbs = el("div", {class: "thumbs"});
    for (const file of c.files || []) {
      try {
        const link = await api("attachments", `/cases/${c.id}/files/${file.id}/link`, {method: "POST"});
        thumbs.append(file.mimeType.startsWith("image/") ? el("img", {src: linkUrl(link.url), alt: file.fileName, title: file.fileName})
          : el("a", {href: linkUrl(link.url), target: "_blank"}, file.fileName));
      } catch (_) {}
    }
    const slot = c.slots.find((s) => s.name === ref.slot) || c.slots[0];
    replace(card, el("strong", {}, `${ref.name || "Upload"} · ${c.status}`),
      c.statusReason ? el("div", {class: "meta"}, c.statusReason) : null,
      el("div", {class: "meta"}, `${slot.label}: ${slot.fileCount}/${slot.maxFiles} (${slot.mimeTypes.join(", ") || "any type"})`),
      thumbs);
    if (c.status === "OPEN" && c.subjects.includes(state.user.id) && slot.fileCount < slot.maxFiles) {
      const input = el("input", {type: "file", accept: slot.mimeTypes.join(",")});
      input.addEventListener("change", async () => {
        const file = input.files[0];
        if (!file) return;
        try {
          await api("attachments", `/cases/${c.id}/slots/${slot.name}/files?fileName=${encodeURIComponent(file.name)}`,
            {method: "POST", raw: file, contentType: file.type});
          toast("Uploaded");
          card.replaceWith(renderUploadCard(ref));
        } catch (e) { toast(e.message); }
      });
      card.append(input);
    }
  }).catch((e) => replace(card, el("strong", {}, ref.name || "Upload"), el("div", {class: "meta"}, e.message)));
  return card;
}

async function markRead() {
  const last = Math.max(0, ...[...state.messages.values()].map((m) => m.seq));
  if (state.current?.kind === "chat" && last > 0) {
    try { await api("chat", `/conversations/${state.current.id}/read`, {method: "PUT", body: {seq: last}}); } catch (_) {}
  }
}

$("composer").addEventListener("submit", async (event) => {
  event.preventDefault();
  const input = event.target.elements.text;
  const text = input.value.trim();
  if (!text || state.current?.kind !== "chat") return;
  input.value = "";
  try {
    await api("chat", `/conversations/${state.current.id}/messages`, {method: "POST", body: {content: text}});
  } catch (e) { toast(e.message); }
});

// ---------------------------------------------------------------- request detail (staff)

async function openRequest(caseRef) {
  const request = state.requests.find((r) => r.caseRef === caseRef);
  if (!request) return;
  const mine = [request.conversationId, request.contractorConversationId].find((id) => state.conversations.some((c) => c.id === id));
  if (mine) return openChat(mine);
  state.current = {kind: "request", caseRef};
  $("empty").hidden = true;
  $("chat").hidden = true;
  const detail = $("detail");
  detail.hidden = false;
  replace(detail, el("h2", {}, `${request.caseRef} · ${request.title}`),
    el("dl", {}, el("dt", {}, "Status"), el("dd", {}, request.status), el("dt", {}, "Unit"), el("dd", {}, request.unit),
      el("dt", {}, "Tenant"), el("dd", {}, request.tenantId), el("dt", {}, "Opened"), el("dd", {}, time(request.createdAt)),
      el("dt", {}, "Agent instance"), el("dd", {}, request.agentId)));
  try {
    const cases = await api("attachments", `/admin/cases?correlationId=${encodeURIComponent(caseRef)}`);
    for (const c of cases.items) {
      detail.append(el("h2", {}, "Evidence"), renderUploadCard({name: c.title, caseId: c.id, slot: c.slots[0]?.name}));
    }
  } catch (_) {}
  loadRequests();
}

// ---------------------------------------------------------------- inbox

async function loadInbox() {
  const [page, counts] = await Promise.all([
    api("notifications", `/notifications?limit=30&box=${state.inboxBox}`),
    api("notifications", "/notifications/unread-count")
  ]);
  $("badge").hidden = counts.total === 0;
  $("badge").textContent = counts.total;
  replace($("inbox"), ...page.items.map((n) => el("li", {
    class: `${n.severity} ${n.read ? "read" : ""}`,
    onclick: async () => {
      await api("notifications", `/notifications/${n.id}/read`, {method: n.read ? "DELETE" : "PUT"});
      loadInbox();
      if (n.correlationId && state.requests.some((r) => r.caseRef === n.correlationId)) openRequest(n.correlationId);
    }
  }, el("div", {}, el("strong", {}, n.title)), n.body ? el("div", {}, n.body) : null,
     el("div", {class: "box"}, `${n.recipientType === "ROLE" ? `role ${n.recipientId}` : "personal"} · ${time(n.createdAt)}`))));
  if (!page.items.length) $("inbox").append(el("li", {class: "meta"}, "No notifications."));
}

$("inbox-tabs").addEventListener("click", (event) => {
  const box = event.target.dataset.box;
  if (!box) return;
  state.inboxBox = box;
  [...$("inbox-tabs").querySelectorAll("[data-box]")].forEach((b) => b.classList.toggle("active", b.dataset.box === box));
  loadInbox();
});
$("read-all").addEventListener("click", async () => {
  await api("notifications", "/notifications/read-all", {method: "POST", body: {box: state.inboxBox}});
  loadInbox();
});
$("bell").addEventListener("click", () => $("inbox").scrollIntoView({behavior: "smooth"}));

// ---------------------------------------------------------------- approvals

async function loadTasks() {
  if (!isStaff()) return;
  $("tasks-panel").hidden = false;
  const tasks = await api("app", "/tasks");
  replace($("tasks"), ...tasks.map((t) => {
    const input = t.input || {};
    const comment = el("input", {placeholder: "Comment (optional)"});
    const decide = (approved) => async () => {
      try {
        await api("app", `/tasks/${t.taskId}/complete`, {method: "POST", body: {approved, comment: comment.value}});
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

// ---------------------------------------------------------------- live updates

// EventSource cannot send headers: every (re)connect fetches a single-use ticket first.
function live(base, handlers) {
  let source;
  const connect = async () => {
    try {
      const {ticket} = await api(base, "/stream-ticket", {method: "POST"});
      source = new EventSource(`${cfg.api[base]}/stream?ticket=${ticket}`);
      for (const [event, handler] of Object.entries(handlers)) {
        source.addEventListener(event, (e) => handler(JSON.parse(e.data)));
      }
      source.onerror = () => { source.close(); setTimeout(reconnect, 2000); };
    } catch (_) { setTimeout(reconnect, 3000); }
  };
  const reconnect = () => { refreshAll(); connect(); };
  connect();
}

function upsert(message) {
  if (state.current?.kind !== "chat" || message.conversationId !== state.current.id) {
    loadConversations();
    return;
  }
  state.messages.set(message.id, message);
  renderMessages();
  if (message.senderId !== state.user.id) markRead();
}

let typingTimer;
function startLive() {
  live("chat", {
    "message.created": upsert,
    "message.completed": (m) => { upsert(m); loadConversations(); },
    "message.updated": upsert,
    "message.delta": ({conversationId, messageId, text}) => {
      const message = state.messages.get(messageId);
      if (state.current?.id !== conversationId || !message) return;
      message.content = (typeof message.content === "string" ? message.content : "") + text;
      const node = document.querySelector(`#m-${CSS.escape(messageId)} .text`);
      if (node) node.textContent = message.content;
      $("messages").scrollTop = $("messages").scrollHeight;
      $("typing").hidden = true;
    },
    "typing": ({conversationId}) => {
      if (state.current?.id !== conversationId) return;
      $("typing").hidden = false;
      clearTimeout(typingTimer);
      typingTimer = setTimeout(() => { $("typing").hidden = true; }, 6000);
    },
    "conversation.created": () => { loadConversations(); loadRequests(); },
    "conversation.closed": (c) => {
      loadConversations();
      loadRequests();
      if (state.current?.id === c.id) openChat(c.id);
    }
  });
  live("notifications", {
    "notification.created": (n) => { toast(`🔔 ${n.title}`); loadInbox(); loadTasks(); loadRequests(); },
    "notification.read": loadInbox, "notification.unread": loadInbox, "notification.read-all": loadInbox
  });
  live("attachments", {
    "attachment.uploaded": () => state.current && (state.current.kind === "chat" ? renderMessages() : openRequest(state.current.caseRef)),
    "case.submitted": () => loadRequests()
  });
  // Approval tasks have no stream of their own; poll while staff are signed in.
  if (isStaff()) setInterval(loadTasks, 5000);
}

async function refreshAll() {
  await Promise.allSettled([loadRequests(), loadConversations(), loadInbox(), loadTasks()]);
  if (state.current?.kind === "chat") openChat(state.current.id);
}

// ---------------------------------------------------------------- start

$("request-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const body = Object.fromEntries(new FormData(form));
  body.tenantName = state.user.name;
  try {
    const request = await api("app", "/requests", {method: "POST", body});
    form.reset();
    toast(`Opened ${request.caseRef}`);
    await loadRequests();
    await loadConversations();
    openChat(request.conversationId);
  } catch (e) { toast(e.message); }
});

(async () => {
  if (!(await signIn())) return;
  renderWho();
  $("new-request").hidden = isStaff() || has("Contractor");
  await refreshAll();
  startLive();
})();
