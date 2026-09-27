# Tenant Maintenance: a durable AI agent demo

A tenant reports a leak. An AI maintenance agent owns the request from that moment until the tenant confirms the fix:
- it collects photos,
- it finds a plumber and gets a quote,
- it asks Finance to approve a quote over the threshold,
- it chases the plumber when they go quiet, and books the visit.

This can take days. Kill the process in the middle, and the agent carries on where it was.

It's built on [Ballerina workflow](https://central.ballerina.io/ballerina/workflow) 0.10 durable agents, running on
Temporal. The chat, notification and upload features come from three reusable **commons** services on Ballerina
Central. The agent uses them like any other client: typed clients going out, signed webhooks coming in.

| Package | Source |
|---|---|
| [`commons/notification`](https://central.ballerina.io/commons/notification) | [module-commons-notification](https://github.com/bal-commons/module-commons-notification) |
| [`commons/chat`](https://central.ballerina.io/commons/chat) | [module-commons-chat](https://github.com/bal-commons/module-commons-chat) |
| [`commons/attachment`](https://central.ballerina.io/commons/attachment) | [module-commons-attachment](https://github.com/bal-commons/module-commons-attachment) |
| [`commons/service_commons`](https://central.ballerina.io/commons/service_commons) | [module-commons-service-commons](https://github.com/bal-commons/module-commons-service-commons) |

## The cast

| Persona | Role | Password (Thunder) | Does |
|---|---|---|---|
| Tara Lee | Tenant | `tara12345` | Reports the problem, chats with the agent, uploads photos, confirms the fix |
| Carlos Diaz | Contractor | `carlos12345` | Quotes and fixes plumbing jobs |
| Erin Volt | Contractor | `erin12345` | Electrical jobs |
| Priya Shah | PropertyManager | `priya12345` | Sees every request, the evidence and the escalations |
| Fernando Ruiz | Finance | `fernando12345` | Approves quotes over $500 |

## What it shows

| Scene | Durable agent capability |
|---|---|
| Tara reports a leak; the agent greets her and asks for a photo | An agent instance per request; everything reaches it as a `chat` event |
| She uploads a photo; the agent picks a plumber, opens a chat with him and sends a quote form | Waits for an external event (attachment webhook), tool calls, several conversations at once |
| Nobody answers for "48 hours" (2 minutes) | A durable timer workflow wakes the agent; it escalates to PropertyManager |
| Carlos quotes $850 | Over the threshold: a human task for Finance; the agent parks |
| Tara asks "any update?" while it waits | The parked agent answers a side question without losing its place |
| **Kill the integration and start it again** | Nothing is lost; the agent is still waiting for Finance |
| Fernando approves | The agent books the visit with both parties |
| Carlos reports done, Tara confirms in a form | The agent closes both chats and the upload case, and ends |

Every message the agent sends is a durable activity, streamed word by word into the chat. A retried activity reuses
the same message ID, so people never see a message twice.

## Run it

### With Docker (Thunder sign-in)

```sh
./build.sh              # compiles the integration in a Ballerina toolchain container; creates .env and Thunder's TLS pair
docker compose up -d    # Temporal, Thunder, the integration, the portal
open http://localhost:9095
```

- Sign in as any persona. Use **Switch user** to change.
- To watch the agent's history: `docker compose --profile ui up -d temporal-ui`, then open http://localhost:8233.
- **Crash scene:** `docker compose kill integration && docker compose up -d integration`.
- **A real LLM:** put a WSO2 AI token in `.env` (git-ignored) (`WSO2_AI_SERVICE_URL`, `WSO2_AI_TOKEN`), then run
  `docker compose up -d integration`. With no token the agent uses a scripted model that plays the same case the
  same way every time.

### Without Docker

You need `bal` 2201.13.4, the `temporal` CLI, Java 21+ and python3.

```sh
./scripts/dev.sh           # Temporal dev server, the integration, the portal
open http://localhost:5173 # switch personas top right; no sign-in
```

`./scripts/reset-dev.sh` forgets every request.

### Headless

`./scripts/walkthrough.sh` plays the whole case over the APIs, persona by persona:
- `WAIT_REMINDER=1` also waits for the escalation.
- `RESTART_CMD="…"` adds the crash scene.

## How it fits together

```
 portal (static JS) ──REST+SSE──► integration (one process)
                                   ├─ commons/notification.server   :9100  role + personal inboxes
                                   ├─ commons/chat.server           :9101  conversations, forms, streaming
                                   ├─ commons/attachment.server     :9102  upload cases
                                   ├─ maintenanceAgent (DurableAgent)       one instance per request
                                   │    activities → commons clients (API key)
                                   ├─ /hooks  ◄─ signed webhooks (chat, attachment) → agent "chat" events
                                   ├─ /app    requests, Finance tasks
                                   └─ /mockllm scripted model (no token)
                                  Temporal ◄── agent, follow-up timers, human tasks
                                  Thunder  ──► JWTs for people (groups = roles)
```

| File | What it holds |
|---|---|
| `integration/agent.bal` | The agent: instructions, activities, the `chat` event, the `approveQuote` human task, the follow-up timer |
| `integration/activities.bal` | Everything the agent does to the world |
| `integration/app.bal` | Webhook receivers (verify → deduplicate → `sendData`), side-turn replies, the app API |
| `integration/scripted_model.bal` | The deterministic stand-in model |
| `webapp/public/app.js` | The portal |
| `thunder/tenant-resources.yaml` | Users, groups and the portal client |

## Things to know

- **Webhooks are delivered at least once.** The app records each event ID and ignores repeats, so the agent never
  sees an event twice.
- **Where replies are posted.** A turn's final answer is posted back only when it is a real reply, which happens
  when the agent answers while parked. Normal turns end with `[done]`, because the agent has already messaged
  people through activities. Replies still waiting when the process stops are recovered on the next start.
- **Transactions.** The commons services put every `transaction` block in `service_commons.db:atomic`. Ballerina
  starts one transaction coordinator per package that uses them, and a second one fails on its port. Code added to
  this integration must use `atomic` too.
- **A killed process can hold up the next task.** A SIGKILLed worker can leave a Temporal poll that takes the next
  task and holds it until it times out, which can be minutes. That's why the crash scene kills the process while
  the agent waits on Finance, and why `dev.sh` and `reset-dev.sh` stop the integration gracefully.
- **Storage is H2 files** (a Docker volume under compose). The commons SQL is written to work on PostgreSQL and
  MySQL, but that hasn't been tried yet.

See `docs/demo-script.md` for the presenter's script.
