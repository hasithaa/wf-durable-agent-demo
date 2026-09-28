# Tenant Maintenance: a durable AI agent demo

A tenant reports a leak. An AI maintenance agent owns the request from that moment until the tenant confirms the fix:
- it collects photos,
- it finds a plumber and gets a quote,
- it books a visit, but only after Finance approves a quote over the threshold,
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
| Carlos quotes $850 | Over the threshold: the agent calls `bookApprovedVisit`, whose approval policy parks the call on Finance's review |
| Tara asks "any update?" while it waits | The parked agent answers a side question without losing its place |
| **Kill the integration and start it again** | Nothing is lost; the agent is still waiting for Finance |
| Fernando approves | The parked call runs: the visit is booked with both parties |
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
- **The model.** `build.sh` asks which one to use and writes it to `.env` as `MODEL_PROVIDER` (see
  [Models](#models)).

### Without Docker

You need `bal` 2201.13.4, the `temporal` CLI, Java 21+ and python3.

```sh
./scripts/dev.sh           # Temporal dev server, the integration, the portal
open http://localhost:5173 # switch personas top right; no sign-in
```

`./scripts/reset-dev.sh` forgets every request.

### Try the UI components

In dev mode, http://localhost:5173/playground.html puts every commons component on one page, against the running
services: send yourself notifications, start a chat with a simulated agent that streams, sends forms and asks for
uploads, and fill in an upload case. The log at the bottom shows the events the components fire.

http://localhost:5173/hub.html is the same services as one page: `<commons-hub>` with notifications, chats, files
and a custom pane. A notification about a request opens that request's chat.

### Headless

`./scripts/walkthrough.sh` plays the whole case over the APIs, persona by persona:
- `WAIT_REMINDER=1` also waits for the escalation.
- `RESTART_CMD="…"` adds the crash scene.

## Models

| `MODEL_PROVIDER` | What drives the agent |
|---|---|
| `scripted` | A deterministic stand-in (`/mockllm`) that plays the same case the same way every time. The default in `.env.example` |
| `ollama` | A local model in Docker: `docker compose --profile ollama up -d`. `build.sh` pulls `OLLAMA_MODEL` (default `qwen2.5:7b`, about 4.7 GB) |
| `wso2` | WSO2's AI service: `WSO2_AI_SERVICE_URL` and `WSO2_AI_TOKEN` in `.env` (git-ignored) |
| `auto` | `wso2` when a token is set, otherwise `scripted` |

Ollama is reached through a small adapter (`/ollama` in `app.bal`), because the model provider speaks an older
tool-call protocol. A 7B model follows the case but doesn't always pick the right tool at the quote step; the
guardrails below keep that from doing harm, but the run can take extra turns. Pick another model with
`OLLAMA_MODEL`, and check its license first: not every Qwen2.5 size is Apache-2.0.

## Guardrails

The model decides what to do next, but the rules that matter are enforced in code, not in the prompt:
- **Booking.** `bookVisit` reads the quote from the chat and refuses one over the threshold. `bookApprovedVisit`
  has an `approvalPolicy`, so every call waits for Finance to approve or reject it (with feedback) before it runs.
- **Order of steps.** `requestFixConfirmation` needs a booked visit, and `closeRequest` needs the tenant's own
  confirmation that the problem is fixed.
- **Repeats.** `requestQuote` does nothing while a quote form is still open, and schedules the follow-up timer itself.
- **Escalation.** When the timer fires, the reminder activity warns the PropertyManager role and nudges the
  contractor, whatever the model then decides.

## How it fits together

```
 portal (static JS) ──REST+SSE──► integration (one process)
                                   ├─ commons/notification.server   :9100  role + personal inboxes
                                   ├─ commons/chat.server           :9101  conversations, forms, streaming
                                   ├─ commons/attachment.server     :9102  upload cases
                                   ├─ maintenanceAgent (DurableAgent)       one instance per request
                                   │    activities → commons clients (API key)
                                   ├─ /hooks  ◄─ signed webhooks (chat, attachment) → agent "chat" events
                                   ├─ /app    requests, Finance reviews
                                   ├─ /mockllm scripted model
                                   └─ /ollama  adapter to a local Ollama
                                  Temporal ◄── agent, follow-up timers, reviews
                                  Thunder  ──► JWTs for people (groups = roles)
```

| File | What it holds |
|---|---|
| `integration/agent.bal` | The agent: instructions, activities (with the Finance approval policy), the `chat` event, the follow-up timer |
| `integration/activities.bal` | Everything the agent does to the world |
| `integration/app.bal` | Webhook receivers (verify → deduplicate → `sendData`), side-turn replies, the app API |
| `integration/model.bal` | Model selection and the Ollama adapter |
| `integration/scripted_model.bal` | The deterministic stand-in model |
| `webapp/public/app.js` | The portal: sign-in, requests, Finance reviews; the rest is commons components |
| `webapp/public/vendor/` | The commons UI bundles, copied in by `scripts/vendor-ui.sh` |
| `webapp/public/playground.html` | Every component on one page (dev mode) |
| `webapp/public/hub.html` | The same services as one `<commons-hub>` (dev mode) |
| `thunder/tenant-resources.yaml` | Users, groups and the portal client |

## Things to know

- **The portal is plain JS with no build step.** The bell, inbox, conversations, chat and upload cards are the
  [bal-commons](https://github.com/bal-commons) Web Components, built on [Lit](https://lit.dev). Their bundles
  are checked in under `webapp/public/vendor/`; `scripts/vendor-ui.sh` rebuilds them from local checkouts.
- **Webhooks are delivered at least once.** The app records each event ID and ignores repeats, so the agent never
  sees an event twice.
- **Where replies are posted.** A turn's final answer is posted back only when it is a real reply, which happens
  when the agent answers while parked. Normal turns end with `[done]`, because the agent has already messaged
  people through activities. Replies still waiting when the process stops are recovered on the next start.
- **Transactions.** The commons services put every `transaction` block in `service_commons.db:atomic`. Ballerina
  starts one transaction coordinator per package that uses them, and a second one fails on its port. Code added to
  this integration must use `atomic` too.
- **A durable agent turn has an iteration limit.** When the model goes over it, the whole agent run fails, not only
  the turn. The instructions tell the model to stop once it has messaged people.
- **A killed process can hold up the next task.** A SIGKILLed worker can leave a Temporal poll that takes the next
  task and holds it until it times out, which can be minutes. That's why the crash scene kills the process while
  the agent waits on Finance, and why `dev.sh` and `reset-dev.sh` stop the integration gracefully.
- **Storage is H2 files** (a Docker volume under compose). The commons SQL is written to work on PostgreSQL and
  MySQL, but that hasn't been tried yet.

See `docs/demo-script.md` for the presenter's script.

## License

Apache-2.0. The portal ships Lit (BSD-3-Clause) inside the vendored bundles, and the integration jar contains H2
and the PostgreSQL JDBC driver. The Docker images and the Ollama model come with their own licenses. `NOTICE` and
`THIRD_PARTY_NOTICES.md` list them all.
