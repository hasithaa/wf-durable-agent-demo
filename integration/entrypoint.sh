#!/usr/bin/env bash
# Renders Config.toml from the environment, then runs the integration.
set -euo pipefail

: "${TEMPORAL_URL:=temporal:7233}"
: "${THUNDER_ISSUER:=https://localhost:8090}"
: "${THUNDER_JWKS_URL:=https://thunder:8090/oauth2/jwks}"
: "${SERVICE_API_KEY:?SERVICE_API_KEY is required}"
: "${WEBHOOK_SECRET:?WEBHOOK_SECRET is required}"
: "${LINK_SECRET:=${WEBHOOK_SECRET}}"
: "${DEMO_SECONDS_PER_HOUR:=2.5}"

sed -e "s|@TEMPORAL_URL@|${TEMPORAL_URL}|g" \
    -e "s|@THUNDER_ISSUER@|${THUNDER_ISSUER}|g" \
    -e "s|@THUNDER_JWKS_URL@|${THUNDER_JWKS_URL}|g" \
    -e "s|@SERVICE_API_KEY@|${SERVICE_API_KEY}|g" \
    -e "s|@WEBHOOK_SECRET@|${WEBHOOK_SECRET}|g" \
    -e "s|@LINK_SECRET@|${LINK_SECRET}|g" \
    -e "s|@DEMO_SECONDS_PER_HOUR@|${DEMO_SECONDS_PER_HOUR}|g" \
    /app/Config.toml.tmpl > /app/Config.toml

# Without a token, ai:getDefaultModelProvider() fails cleanly and the agent uses its scripted model.
if [ -n "${WSO2_AI_TOKEN:-}" ]; then
    cat >> /app/Config.toml <<TOML

[ballerina.ai.wso2ProviderConfig]
serviceUrl = "${WSO2_AI_SERVICE_URL:?WSO2_AI_SERVICE_URL is required when WSO2_AI_TOKEN is set}"
accessToken = "${WSO2_AI_TOKEN}"
TOML
    echo "[entrypoint] WSO2 default model provider configured"
fi

echo "[entrypoint] temporal=${TEMPORAL_URL} issuer=${THUNDER_ISSUER}"
export BAL_CONFIG_FILES=/app/Config.toml
exec java -jar /app/app.jar
