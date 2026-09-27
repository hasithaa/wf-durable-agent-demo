#!/usr/bin/env bash
# Forgets every request: stops the integration, terminates running workflows, deletes the H2 data.
set -euo pipefail
# A graceful stop lets the worker end its Temporal polls; a killed worker can leave a poll that swallows the next
# task until it times out (minutes).
stop_integration() {
  pkill -f "target/bin/maintenance.jar" 2>/dev/null || return 0
  for _ in $(seq 1 30); do pgrep -f "target/bin/maintenance.jar" >/dev/null || return 0; sleep 1; done
  pkill -9 -f "target/bin/maintenance.jar" 2>/dev/null || true
}
cd "$(dirname "$0")/.."
stop_integration
temporal workflow terminate --query "ExecutionStatus='Running'" --reason "demo reset" --yes >/dev/null 2>&1 || true
rm -rf integration/target/data
echo "Reset. Start again with scripts/dev.sh"
