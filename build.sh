#!/usr/bin/env bash
# Builds the integration inside the Ballerina toolchain image; only Docker is needed on the host.
# Every dependency, the commons packages included, comes from Ballerina Central.
set -euo pipefail
cd "$(dirname "$0")"
case "${1:-}" in -h|--help) echo "usage: ./build.sh"; exit 0 ;; esac

[ -f .env ] || cp .env.example .env

# Thunder's demo TLS pair, generated once per clone; its SANs cover the browser (localhost) and the JWKS fetch (thunder).
if [ ! -f thunder/tls/server.key ]; then
    mkdir -p thunder/tls
    openssl req -x509 -newkey rsa:2048 -nodes -days 3650 -subj "/CN=thunder" \
        -addext "subjectAltName=DNS:thunder,DNS:localhost,IP:127.0.0.1" \
        -keyout thunder/tls/server.key -out thunder/tls/server.cert 2>/dev/null
    chmod 644 thunder/tls/server.key thunder/tls/server.cert
    echo "Generated thunder/tls (demo-only, self-signed)"
fi

docker build -q -t tenant-app/builder:local -f docker/builder.Dockerfile docker >/dev/null
docker run --rm -v "$PWD:/work" -v tenant-app-bal-cache:/root/.ballerina -e JAVA_OPTS=-Xmx2g \
    tenant-app/builder:local bash -euo pipefail -c '
    cd integration
    rm -rf target
    bal build
    mkdir -p artifacts
    cp target/bin/maintenance.jar artifacts/maintenance.jar'
echo "Built integration/artifacts/maintenance.jar. Next: docker compose up -d"
