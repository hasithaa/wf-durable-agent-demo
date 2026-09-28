# Third-party notices

This demo is licensed under the Apache License 2.0 (see `LICENSE`). It uses the following third-party software.

## Included in this repository

| Component | Where | License | Copyright |
|---|---|---|---|
| [@bal-commons UI components](https://github.com/bal-commons) 0.1.0 | `webapp/public/vendor/` | Apache-2.0 | Copyright 2026 Hasitha Aravinda |
| [Lit](https://github.com/lit/lit) 3.3.3 (lit, lit-html, lit-element, @lit/reactive-element) | bundled in `webapp/public/vendor/*.bundle.js` | BSD-3-Clause | Copyright (c) 2017 Google LLC |

## Included in the integration built by `build.sh`

| Component | License |
|---|---|
| [Ballerina](https://ballerina.io) standard library and [ballerina/workflow](https://central.ballerina.io/ballerina/workflow) | Apache-2.0 |
| [commons/*](https://central.ballerina.io/commons) (notification, chat, attachment, service_commons) | Apache-2.0 |
| [H2 Database Engine](https://h2database.com) 2.3.232, via ballerinax/h2.driver | MPL-2.0 or EPL-1.0 |
| [PostgreSQL JDBC Driver](https://jdbc.postgresql.org) 42.7.13, via ballerinax/postgresql.driver | BSD-2-Clause |

## Downloaded at run time, not redistributed

`docker compose` pulls these images, and `build.sh` can pull a model. Each comes under its own license.

| Component | Used for | License |
|---|---|---|
| [Temporal](https://temporal.io) (`temporalio/auto-setup`, `temporalio/ui`) | Durable execution | MIT |
| [Thunder](https://github.com/thunder-id/thunderid) (`ghcr.io/thunder-id/thunderid`) | Sign-in (OIDC) | Apache-2.0 |
| [PostgreSQL](https://www.postgresql.org) (`postgres`) | Temporal's database | PostgreSQL License |
| [nginx](https://nginx.org) (`nginx`) | Serves the portal | BSD-2-Clause |
| [Eclipse Temurin](https://adoptium.net) (`eclipse-temurin`) | Java runtime of the integration | GPL-2.0 with Classpath Exception |
| [Ollama](https://ollama.com) (`ollama/ollama`), only with `MODEL_PROVIDER=ollama` | Runs the local model | MIT |
| [Qwen2.5-7B-Instruct](https://huggingface.co/Qwen/Qwen2.5-7B-Instruct) (`qwen2.5:7b`), only with `MODEL_PROVIDER=ollama` | The agent's local model | Apache-2.0 |

If you set `OLLAMA_MODEL` to another model, check its license. Some Qwen2.5 sizes, such as 3B and 72B, are not
under Apache-2.0.

## Lit license

```text
BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
```
