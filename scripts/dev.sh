#!/usr/bin/env bash
# Runs the demo without Docker: Temporal's dev server, the integration on H2 with the scripted model, and the
# portal on http://localhost:5173 (personas instead of sign-in). Needs `bal`, `temporal`, Java 21+ and python3.
set -euo pipefail
# A graceful stop lets the worker end its Temporal polls; a killed worker can leave a poll that swallows the next
# task until it times out (minutes).
stop_integration() {
  pkill -f "target/bin/maintenance.jar" 2>/dev/null || return 0
  for _ in $(seq 1 30); do pgrep -f "target/bin/maintenance.jar" >/dev/null || return 0; sleep 1; done
  pkill -9 -f "target/bin/maintenance.jar" 2>/dev/null || true
}
cd "$(dirname "$0")/.."
RUN=.run
mkdir -p "$RUN"

if ! temporal operator cluster health >/dev/null 2>&1; then
  echo "Starting Temporal dev server (UI http://localhost:8233)"
  nohup temporal server start-dev --headless --port 7233 --ui-port 8233 --db-filename "$RUN/temporal.db" \
    > "$RUN/temporal.log" 2>&1 &
  until temporal operator cluster health >/dev/null 2>&1; do sleep 1; done
fi

(cd integration && [ -f Config.toml ] || cp Config.dev.toml Config.toml)
(cd integration && bal build >/dev/null)
stop_integration
echo "Starting the integration (log: $RUN/integration.log)"
(cd integration && nohup java -jar target/bin/maintenance.jar > "../$RUN/integration.log" 2>&1 &)
until curl -s -o /dev/null localhost:9090/app/requests -H "x-user-id: probe"; do sleep 1; done

pkill -f "http.server 5173" 2>/dev/null || true
(cd webapp/public && nohup python3 -m http.server 5173 > "../../$RUN/webapp.log" 2>&1 &)
echo "Ready: http://localhost:5173  (switch personas top right)"
echo "Crash scene: scripts/dev.sh restarts the integration; or pkill -9 -f maintenance.jar and run it again"
