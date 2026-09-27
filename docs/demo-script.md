# Demo script (about 10 minutes)

Open the portal and, for the crash scene, a terminal.
- **Dev mode** (http://localhost:5173): switch personas from the dropdown in the top right.
- **Compose** (http://localhost:9095): use **Switch user**, or keep one browser profile per persona.

Optionally keep Temporal's UI open (http://localhost:8233) to show the agent's history growing.

## 1. The request (Tara)

1. As **Tara**, fill in *Report a problem*:
   - title: `Kitchen sink leaking`
   - unit: `4B`
   - issue: "Water is dripping from under the kitchen sink."
2. The agent's greeting streams in, followed by an upload card.
   > One durable agent instance now owns MR-1001. It was just started, and everything that happens from here reaches
   > it as an event.
3. As **Priya**, the PropertyManager inbox shows *New request MR-1001*. This is a role notification: it was stored
   once, and whoever holds the role sees it.

## 2. Evidence (Tara)

4. As **Tara**, choose a photo in the upload card.
   > The upload service calls the agent's webhook. The agent reads the photo as a plumbing job and opens a chat with
   > a plumber.

## 3. Silence (optional, 2 minutes)

5. Do nothing for two minutes. Priya's inbox gets a **warning**, *No contractor reply on MR-1001*, and Carlos gets
   a nudge.
   > The agent scheduled a durable 48-hour reminder, compressed for the demo. It is a separate timer workflow, and it
   > would survive a restart just the same.

## 4. The quote (Carlos → Fernando)

6. As **Carlos**, open the MR-1001 chat and fill in the quote form:
   - amount: `850`
   - visit date: any date
7. Tara's chat says the quote needs approval. As **Fernando**, *Approvals* shows the task with the quote details.
   > $850 is over the $500 threshold, so the agent created a human task for Finance. It's parked now. It holds no
   > thread and uses no model while it waits, and the wait could last days.

## 5. The crash

8. Kill the integration:
   - compose: `docker compose kill integration`
   - dev: `pkill -9 -f maintenance.jar`

   The portal goes quiet.
9. Start it again:
   - compose: `docker compose up -d integration`
   - dev: `scripts/dev.sh`
10. As **Tara**, ask "Any update?". The agent answers that the request is waiting on a step.
    > The agent is exactly where it was: still parked on Finance, and it still answers questions.

## 6. Approval and resolution

11. As **Fernando**, click **Approve**. The agent confirms the visit with Carlos and with Tara, and Tara gets a
    *Visit booked* notification.
12. As **Carlos**, write "All fixed". The agent asks Tara to confirm with an *Is it fixed?* form.
13. As **Tara**, tick *The problem is fixed* and confirm. The agent closes both chats and the upload case. Priya gets
    *MR-1001 resolved*, and the agent's run completes.

## Afterwards

- As **Priya**, open MR-1001 to see its status, the evidence photos and the agent instance ID.
- In Temporal's UI, the agent's run shows every model call, tool call, wait and human task, in order.
- To start over:
  - dev: `scripts/reset-dev.sh`
  - compose: `docker compose down -v`
