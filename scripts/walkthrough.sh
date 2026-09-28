#!/usr/bin/env bash
# Drives the whole maintenance case over the APIs, persona by persona, in dev mode (trusted x-user-* headers).
#   APP=http://localhost:9090 ./walkthrough.sh
#   RESTART_CMD="docker compose restart integration" ./walkthrough.sh   # adds the crash-and-resume scene
#   WAIT_REMINDER=1 ./walkthrough.sh                                     # waits for the 48 h escalation
set -euo pipefail

APP=${APP:-http://localhost:9090}
CHAT=${CHAT:-http://localhost:9101/chat/v1}
NOTIFY=${NOTIFY:-http://localhost:9100/notifications/v1}
FILES=${FILES:-http://localhost:9102/attachments/v1}
TIMEOUT=${TIMEOUT:-90}

tara=(-H "x-user-id: tara" -H "x-user-roles: Tenant")
carlos=(-H "x-user-id: carlos" -H "x-user-roles: Contractor")
fernando=(-H "x-user-id: fernando" -H "x-user-roles: Finance")
priya=(-H "x-user-id: priya" -H "x-user-roles: PropertyManager")
json=(-H "content-type: application/json")

step() { printf '\n\033[1m== %s\033[0m\n' "$*"; }
field() { python3 -c "import sys,json; d=json.load(sys.stdin); print(eval(sys.argv[1]))" "$1"; }

# Retries a command until it prints something non-empty.
wait_for() {
  local what=$1; shift
  local deadline=$((SECONDS + TIMEOUT)) out=""
  until out=$("$@" 2>/dev/null) && [ -n "$out" ]; do
    [ $SECONDS -ge $deadline ] && { echo "timed out waiting for: $what" >&2; exit 1; }
    sleep 2
  done
  printf '%s' "$out"
}

messages() {  # conversationId persona... -> "seq sender kind content" lines
  local id=$1; shift
  curl -sf "$CHAT/conversations/$id/messages?limit=100" "$@" | python3 -c '
import sys,json
for m in json.load(sys.stdin)["items"]:
    c=m["content"]; c=c if isinstance(c,str) else json.dumps(c)
    print(m["seq"], m["senderId"], m["kind"], c[:150])'
}

agent_after() {  # conversationId seq persona... -> the first agent message after seq
  local id=$1 seq=$2; shift 2
  messages "$id" "$@" | awk -v s="$seq" '$1 > s && $2 == "agent:maintenance"' | head -1
}

last_seq() {  # conversationId persona...
  local id=$1; shift
  messages "$id" "$@" | tail -1 | cut -d' ' -f1
}

inbox() {  # persona... -> "severity title"
  curl -sf "$NOTIFY/notifications" "$@" | python3 -c '
import sys,json
for n in json.load(sys.stdin)["items"]: print(" ", n["severity"], n["title"])'
}

step "1. Tara reports a leak"
request=$(curl -sf -X POST "$APP/app/requests" "${json[@]}" "${tara[@]}" \
  -d '{"title":"Kitchen sink leaking","issue":"Water is dripping from under the kitchen sink and pooling on the floor.","unit":"4B","tenantName":"Tara Lee"}')
caseRef=$(echo "$request" | field 'd["caseRef"]')
tenantChat=$(echo "$request" | field 'd["conversationId"]')
echo "Opened $caseRef, agent $(echo "$request" | field 'd["agentId"]')"
wait_for "the upload card" bash -c "$(declare -f messages); CHAT=$CHAT messages $tenantChat -H 'x-user-id: tara' | grep ATTACHMENT_REF" >/dev/null
messages "$tenantChat" "${tara[@]}"

step "2. Tara uploads a photo"
evidence=$(curl -sf "$FILES/cases?correlationId=$caseRef" "${tara[@]}" | field 'd["items"][0]["id"]')
photo=$(mktemp); printf '\x89PNG\r\n\x1a\nleak-photo' > "$photo"
curl -sf -X POST "$FILES/cases/$evidence/slots/photo/files" "${tara[@]}" -F "file=@$photo;type=image/png;filename=leak.png" >/dev/null
contractorChat=$(wait_for "the contractor chat" bash -c "curl -sf '$CHAT/conversations?correlationId=$caseRef/contractor' -H 'x-user-id: carlos' | python3 -c 'import sys,json; i=json.load(sys.stdin)[\"items\"]; print(i[0][\"id\"] if i else \"\")'")
wait_for "the quote form" bash -c "$(declare -f messages); CHAT=$CHAT messages $contractorChat -H 'x-user-id: carlos' | grep FORM" >/dev/null
echo "Carlos's chat:"; messages "$contractorChat" "${carlos[@]}"

if [ "${WAIT_REMINDER:-0}" = 1 ]; then
  step "3. Nobody answers for 48 h (compressed): the timer escalates"
  wait_for "the escalation" bash -c "curl -sf '$NOTIFY/notifications' -H 'x-user-id: priya' -H 'x-user-roles: PropertyManager' | grep -q WARNING && echo yes" >/dev/null
  inbox "${priya[@]}"
fi

step "4. Carlos quotes \$850 (over the threshold)"
form=$(curl -sf "$CHAT/conversations/$contractorChat/messages" "${carlos[@]}" \
  | python3 -c 'import sys,json; print([m["id"] for m in json.load(sys.stdin)["items"] if m["kind"]=="FORM"][-1])')
curl -sf -X POST "$CHAT/conversations/$contractorChat/messages" "${json[@]}" "${carlos[@]}" \
  -d "{\"kind\":\"FORM_RESPONSE\",\"replyTo\":\"$form\",\"content\":{\"amount\":850,\"visitDate\":\"2026-09-29\",\"notes\":\"Replace the trap and supply hose\"}}" >/dev/null
task=$(wait_for "the Finance task" bash -c "curl -sf '$APP/app/tasks' -H 'x-user-id: fernando' -H 'x-user-roles: Finance' | python3 -c 'import sys,json; t=json.load(sys.stdin); print(t[0][\"taskId\"] if t else \"\")'")
echo "Finance task $task:"; curl -sf "$APP/app/tasks" "${fernando[@]}" | field 'json.dumps(d[0]["input"])'

if [ -n "${RESTART_CMD:-}" ]; then
  step "5. The integration crashes mid-case and comes back"
  eval "$RESTART_CMD"
  wait_for "the app to come back" curl -sf "$APP/app/requests" "${tara[@]}" >/dev/null
  echo "Back up."
fi

step "6. Tara asks for an update while the agent waits on Finance"
asked=$(curl -sf -X POST "$CHAT/conversations/$tenantChat/messages" "${json[@]}" "${tara[@]}" -d '{"content":"Any update? The floor is getting wet."}' | field 'd["seq"]')
wait_for "the side reply" bash -c "$(declare -f messages agent_after); CHAT=$CHAT agent_after $tenantChat $asked -H 'x-user-id: tara'"; echo

step "7. Fernando approves"
before=$(last_seq "$tenantChat" "${tara[@]}")
curl -sf -X POST "$APP/app/tasks/$task/complete" "${json[@]}" "${fernando[@]}" -d '{"approved":true,"comment":"OK within budget"}' >/dev/null
wait_for "the booking" bash -c "$(declare -f messages agent_after); CHAT=$CHAT agent_after $tenantChat $before -H 'x-user-id: tara'"; echo

step "8. Carlos reports the job done; Tara confirms"
curl -sf -X POST "$CHAT/conversations/$contractorChat/messages" "${json[@]}" "${carlos[@]}" -d '{"content":"All fixed, new trap fitted."}' >/dev/null
confirm=$(wait_for "the fix confirmation form" bash -c "curl -sf '$CHAT/conversations/$tenantChat/messages?limit=100' -H 'x-user-id: tara' | python3 -c 'import sys,json; f=[m[\"id\"] for m in json.load(sys.stdin)[\"items\"] if m[\"kind\"]==\"FORM\"]; print(f[-1] if f else \"\")'")
curl -sf -X POST "$CHAT/conversations/$tenantChat/messages" "${json[@]}" "${tara[@]}" \
  -d "{\"kind\":\"FORM_RESPONSE\",\"replyTo\":\"$confirm\",\"content\":{\"fixed\":true}}" >/dev/null
wait_for "the request to resolve" bash -c "curl -sf '$APP/app/requests/$caseRef' -H 'x-user-id: tara' | grep -q RESOLVED && echo yes" >/dev/null
wait_for "the resolution notice" bash -c "curl -sf '$NOTIFY/notifications' -H 'x-user-id: priya' -H 'x-user-roles: PropertyManager' | grep -q '$caseRef resolved' && echo yes" >/dev/null

step "Resolved"
echo "Tara's chat:"; messages "$tenantChat" "${tara[@]}"
echo; echo "Carlos's chat:"; messages "$contractorChat" "${carlos[@]}"
echo; echo "PropertyManager inbox:"; inbox "${priya[@]}"
echo "Tara's inbox:"; inbox "${tara[@]}"
