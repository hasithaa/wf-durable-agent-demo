#!/usr/bin/env bash
# Builds the integration inside the Ballerina toolchain image; only Docker is needed on the host.
# Every dependency, the commons packages included, comes from Ballerina Central.
#   ./build.sh                     asks which model the agent uses
#   MODEL_PROVIDER=ollama ./build.sh   (scripted | ollama | wso2) skips the question
set -euo pipefail
cd "$(dirname "$0")"
case "${1:-}" in -h|--help) sed -n 2,5p "$0"; exit 0 ;; esac

[ -f .env ] || cp .env.example .env

# Writes KEY=VALUE into .env, replacing the key if it is already there.
set_env() {
    local key=$1 value=$2
    if grep -q "^${key}=" .env; then
        sed -i.bak "s|^${key}=.*|${key}=${value}|" .env && rm -f .env.bak
    else
        echo "${key}=${value}" >> .env
    fi
}

current=$(grep '^MODEL_PROVIDER=' .env | cut -d= -f2 || true)
choice=${MODEL_PROVIDER:-}
if [ -z "$choice" ] && [ -t 0 ]; then
    echo "Which model should the maintenance agent use?"
    echo "  1) scripted  offline and deterministic; plays the same story every time (best for live demos)"
    echo "  2) ollama    a local model in Docker (qwen2.5:7b, ~4.7 GB download); slow without a GPU"
    echo "  3) wso2      the WSO2 model provider; needs a service URL and an access token"
    read -r -p "Choice [${current:-scripted}]: " answer
    case "$answer" in
        1) choice=scripted ;; 2) choice=ollama ;; 3) choice=wso2 ;; "") choice=${current:-scripted} ;; *) choice=$answer ;;
    esac
fi
choice=${choice:-${current:-scripted}}
case "$choice" in
    scripted)
        set_env COMPOSE_PROFILES "" ;;
    ollama)
        set_env COMPOSE_PROFILES ollama
        model=${OLLAMA_MODEL:-$(grep '^OLLAMA_MODEL=' .env | cut -d= -f2)}
        set_env OLLAMA_MODEL "${model:-qwen2.5:7b}" ;;
    wso2)
        set_env COMPOSE_PROFILES ""
        if [ -t 0 ]; then
            read -r -p "WSO2 AI service URL: " url
            read -r -s -p "WSO2 AI access token: " token; echo
            set_env WSO2_AI_SERVICE_URL "$url"
            set_env WSO2_AI_TOKEN "$token"
        fi
        grep -q '^WSO2_AI_TOKEN=.\+' .env || { echo "wso2 needs WSO2_AI_SERVICE_URL and WSO2_AI_TOKEN in .env" >&2; exit 1; } ;;
    *)
        echo "Unknown model provider: $choice (scripted, ollama or wso2)" >&2; exit 1 ;;
esac
set_env MODEL_PROVIDER "$choice"
echo "Model provider: $choice"

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
echo "Built integration/artifacts/maintenance.jar"

# The model is pulled now, so `docker compose up` never waits on a download.
if [ "$choice" = ollama ]; then
    model=$(grep '^OLLAMA_MODEL=' .env | cut -d= -f2)
    docker compose --profile ollama up -d ollama
    until [ "$(docker inspect -f '{{.State.Health.Status}}' "$(docker compose ps -q ollama)")" = healthy ]; do sleep 2; done
    docker compose exec -T ollama ollama pull "$model"
    echo "Pulled $model into the ollama-models volume"
fi
echo "Next: docker compose up -d"
