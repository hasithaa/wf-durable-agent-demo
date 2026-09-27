# The integration as a fat jar; build.sh compiles it in the builder image and stages it into ./artifacts.
# JDK 25: on 21 a strand that blocks while holding a monitor pins its carrier thread.
FROM eclipse-temurin:25-jre

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY artifacts/maintenance.jar /app/app.jar
COPY Config.toml.tmpl /app/Config.toml.tmpl
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh && mkdir -p /data

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
