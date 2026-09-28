#!/usr/bin/env bash
# Copies the bal-commons UI bundles into the portal until they are on npm (then the portal loads them from a CDN).
set -euo pipefail
cd "$(dirname "$0")/.."
COMMONS_DIR=${COMMONS_DIR:-../commons}
mkdir -p webapp/public/vendor
for pkg in notification chat attachment; do
    (cd "$COMMONS_DIR/$pkg/ui" && npm run build --silent >/dev/null)
    cp "$COMMONS_DIR/$pkg/ui/dist/$pkg-ui.bundle.js" webapp/public/vendor/
done
ls -1 webapp/public/vendor
