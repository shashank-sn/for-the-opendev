# launch catalog — deep research edition

**product:** for the open dev  
**version:** 2.1  
**status:** draft for founder review  
**research date:** june 2026  
**changelog:** v2.1 — 2026 model refresh, better-auth in launch 100, zed → tools phase 2

---

## 1. research methodology

this catalog is not a star-count leaderboard. each entry was evaluated against a **builder adoption rubric**:

| criterion | weight | what we check |
|-----------|--------|---------------|
| adoption clarity | high | can a solo dev go from zero to running in one session? |
| maintenance | high | commits in last 90 days, responsive issues, not archived |
| license clarity | high | spdx-identified oss license, commercial implications documented |
| replaces something real | high | maps to a commercial tool or painful workflow |
| documentation | medium | readme install section, docs site, docker option |
| community | medium | issues answered, discord/discussions active |
| indie/oss fit | medium | builder-friendly, not enterprise-only |
| github stars | none | displayed, never used as primary ranking signal |

**sources used:**
- awesome-selfhosted, awesome-macoss, awesome-cli-apps
- hacker news launch threads (2024–2026)
- r/selfhosted, r/opensource, r/LocalLLaMA
- model context protocol official servers + mcpservers.org
- hugging face state of open source (spring 2026)
- indie oss products: cap, plane, bruno, karakeep, screenpipe, documenso
- founder-curated "would i actually recommend this?" filter

**catalog tiers:**

| tier | count | meaning |
|------|-------|---------|
| **launch 100** | 100 | full builder profiles at public launch |
| **phase 2** | 120 | profiles within 12 weeks post-launch |
| **watchlist** | 80+ | tracked, not yet profile-ready |
| **total researched** | **300+** | this document |

---

## 2. seven categories

four original categories plus three new ones, each with a sharp definition so nothing blurs together.

| category | slug | definition | examples |
|----------|------|------------|----------|
| **tools** | `/tools` | adoptable software products — install, self-host, or run as a service | posthog, cap, coolify, open webui |
| **frameworks** | `/frameworks` | libraries and frameworks you build applications with | next.js, fastapi, tauri |
| **models** | `/models` | model weights, architectures, fine-tunes | llama 3, flux.1, whisper |
| **resources** | `/resources` | specs, fonts, icons, guides, standards, starters | lucide, mdn, semver |
| **clis** | `/clis` | command-line tools installed in the terminal | ripgrep, fzf, atuin, lazygit |
| **datasets** | `/datasets` | open datasets for training, fine-tuning, eval, rag | fine-web, the stack, common voice |
| **mcps** | `/mcps` | model context protocol servers for ai agents | github mcp, filesystem, playwright |

### why three new categories

- **clis** — solo devs adopt 10+ cli tools before their first framework. ripgrep isn't a "tool" in the posthog sense; it's a different discovery intent.
- **datasets** — models are useless without data. ml builders search "open dataset for X" separately from "open model for X".
- **mcps** — the fastest-growing oss layer in 2026. agents need plugins; mcps are the plugin registry problem nobody owns yet.

### cross-cutting tags (not categories)

apply as metadata on any entry:

| tag | meaning |
|-----|---------|
| `indie-oss` | small team, product-quality polish (cap, plane, bruno) |
| `self-host` | runs on your infrastructure |
| `ai-native` | built for or around llms |
| `creator-tools` | content creation (recording, design, writing) |
| `replaces-saas` | direct saas alternative narrative |
| `y-combinator` | yc-backed oss (optional signal, not endorsement) |

---

## 3. launch 100 — distribution (v2)

| category | launch count | staff picks |
|----------|-------------|-------------|
| tools | 32 | 8 |
| frameworks | 16 (includes better-auth) | 3 |
| models | 14 (2026 refresh) | 2 |
| resources | 10 | 2 |
| clis | 10 | 1 |
| datasets | 8 | 0 |
| mcps | 10 | 1 |
| **total** | **100** | **17** |

---

## 4. launch 100 — full entries

### tools (32)

#### 1. cap
| field | value |
|-------|-------|
| slug | `cap` |
| github | https://github.com/CapSoftware/Cap |
| license | AGPL-3.0 (verify in repo) |
| subcategory | creator-tools |
| tags | indie-oss, self-host, replaces-saas, creator-tools |
| replaces | loom, screen studio, vidyard |
| audience | solo dev, small team |
| difficulty | 2 |
| self-hostable | yes |
| commercial use | with conditions (agpl) |
| maintenance | active (6k+ commits) |
| tier | staff pick |
| why | the open-source loom. instant + studio recording modes, self-hostable web stack, custom s3, team workspaces. exactly the kind of indie oss product this platform should surface. |

#### 2. posthog
| slug | `posthog` · analytics · replaces mixpanel/amplitude · staff pick · https://github.com/PostHog/posthog · MIT

#### 3. plausible
| slug | `plausible` · analytics · replaces google analytics · staff pick · https://github.com/plausible/analytics · AGPL-3.0

#### 4. umami
| slug | `umami` · analytics · replaces ga/fathom · featured · https://github.com/umami-software/umami · MIT

#### 5. supabase
| slug | `supabase` · backend · replaces firebase · staff pick · https://github.com/supabase/supabase · Apache-2.0

#### 6. pocketbase
| slug | `pocketbase` · backend · single-binary firebase alt · featured · https://github.com/pocketbase/pocketbase · MIT

#### 7. coolify
| slug | `coolify` · self-hosting · replaces heroku/railway · staff pick · https://github.com/coollabsio/coolify · Apache-2.0

#### 8. n8n
| slug | `n8n` · automation · replaces zapier · staff pick · https://github.com/n8n-io/n8n · Apache-2.0

#### 9. activepieces
| slug | `activepieces` · automation · replaces zapier (simpler) · featured · https://github.com/activepieces/activepieces · MIT

#### 10. windmill
| slug | `windmill` · automation · replaces retool + zapier · featured · https://github.com/windmill-labs/windmill · AGPL-3.0

#### 11. bruno
| slug | `bruno` · devtools · replaces postman · staff pick · https://github.com/usebruno/bruno · MIT · tags: indie-oss

#### 12. hoppscotch
| slug | `hoppscotch` · devtools · replaces postman (browser) · featured · https://github.com/hoppscotch/hoppscotch · MIT

#### 13. open webui
| slug | `open-webui` · ai-native · replaces chatgpt ui for local models · staff pick · https://github.com/open-webui/open-webui · BSD-3-Clause

#### 14. librechat
| slug | `librechat` · ai-native · multi-provider chat ui · featured · https://github.com/danny-avila/LibreChat · MIT

#### 15. ollama
| slug | `ollama` · ai-native · local model runtime · listed under tools (inference layer) · staff pick · https://github.com/ollama/ollama · MIT

#### 16. vllm
| slug | `vllm` · ai-native · high-throughput llm serving · featured · https://github.com/vllm-project/vllm · Apache-2.0

#### 17. liteLLM
| slug | `litellm` · ai-native · replaces direct api calls, unified llm proxy · featured · https://github.com/BerriAI/litellm · MIT

#### 18. langfuse
| slug | `langfuse` · monitoring · llm observability/tracing · featured · https://github.com/langfuse/langfuse · MIT

#### 19. signoz
| slug | `signoz` · monitoring · replaces datadog · featured · https://github.com/SigNoz/signoz · MIT

#### 20. uptime kuma
| slug | `uptime-kuma` · monitoring · replaces pingdom · featured · https://github.com/louislam/uptime-kuma · MIT

#### 21. grafana
| slug | `grafana` · monitoring · dashboards · featured · https://github.com/grafana/grafana · AGPL-3.0

#### 22. authentik
| slug | `authentik` · auth · replaces auth0 · featured · https://github.com/goauthentik/authentik · MIT

#### 23. infisical
| slug | `infisical` · security · replaces doppler/vault for secrets · featured · https://github.com/Infisical/infisical · MIT

#### 24. plane
| slug | `plane` · productivity · replaces linear/jira · featured · https://github.com/makeplane/plane · AGPL-3.0 · indie-oss

#### 25. outline
| slug | `outline` · productivity · replaces notion (wiki) · featured · https://github.com/outline/outline · BSL→Apache

#### 26. documenso
| slug | `documenso` · productivity · replaces docusign · featured · https://github.com/documenso/documenso · AGPL-3.0 · indie-oss

#### 27. immich
| slug | `immich` · media · replaces google photos · staff pick · https://github.com/immich-app/immich · AGPL-3.0

#### 28. vaultwarden
| slug | `vaultwarden` · security · replaces 1password server · featured · https://github.com/dani-garcia/vaultwarden · AGPL-3.0

#### 29. meilisearch
| slug | `meilisearch` · search · replaces algolia · featured · https://github.com/meilisearch/meilisearch · MIT

#### 30. listmonk
| slug | `listmonk` · communication · replaces mailchimp (self-host) · verified · https://github.com/knadh/listmonk · AGPL-3.0

#### 31. chatwoot
| slug | `chatwoot` · communication · replaces intercom · featured · https://github.com/chatwoot/chatwoot · MIT

#### 32. penpot
| slug | `penpot` · design · replaces figma (self-host) · featured · https://github.com/penpot/penpot · MPL-2.0

---

### frameworks (16)

#### 33. next.js — `nextjs` · full-stack · staff pick · https://github.com/vercel/next.js · MIT
#### 34. astro — `astro` · web-frontend · staff pick · https://github.com/withastro/astro · MIT
#### 35. sveltekit — `sveltekit` · full-stack · featured · https://github.com/sveltejs/kit · MIT
#### 36. fastapi — `fastapi` · web-backend · staff pick · https://github.com/fastapi/fastapi · MIT
#### 37. django — `django` · full-stack · featured · https://github.com/django/django · BSD-3-Clause
#### 38. tauri — `tauri` · desktop · staff pick · https://github.com/tauri-apps/tauri · MIT/Apache-2.0
#### 39. tailwindcss — `tailwindcss` · css · staff pick · https://github.com/tailwindlabs/tailwindcss · MIT
#### 40. shadcn/ui — `shadcn-ui` · ui-components · staff pick · https://github.com/shadcn-ui/ui · MIT
#### 41. prisma — `prisma` · orm · featured · https://github.com/prisma/prisma · Apache-2.0
#### 42. drizzle — `drizzle` · orm · featured · https://github.com/drizzle-team/drizzle-orm · Apache-2.0
#### 43. trpc — `trpc` · api · featured · https://github.com/trpc/trpc · MIT
#### 44. htmx — `htmx` · web-frontend · featured · https://github.com/bigskysoftware/htmx · BSD-2-Clause
#### 45. langchain — `langchain` · ai-ml · featured · https://github.com/langchain-ai/langchain · MIT
#### 46. playwright — `playwright` · testing · featured · https://github.com/microsoft/playwright · Apache-2.0
#### 47. vite — `vite` · runtime · featured · https://github.com/vitejs/vite · MIT
#### 48. better-auth — `better-auth` · auth · staff pick · https://github.com/better-auth/better-auth · MIT · tags: we-use-this

| field | value |
|-------|-------|
| slug | `better-auth` |
| github | https://github.com/better-auth/better-auth |
| website | https://better-auth.com |
| license | MIT |
| subcategory | auth |
| tags | we-use-this, ai-native |
| replaces | auth0, clerk, nextauth (for new projects), supabase auth |
| audience | solo dev, small team |
| difficulty | 2 |
| self-hostable | yes |
| commercial use | yes |
| maintenance | active (~29k stars, 7k commits) |
| tier | staff pick |
| why | the auth framework we run on fortheopen.dev. typescript-native, plugin ecosystem (magic link, passkeys, orgs), works with next.js + drizzle. login modals built on better-auth client. dogfooded — listed with honest verdict. |

---

### models (14) — 2026 refresh

replaced stale entries (llama 3, phi-3, codellama, sdxl, mistral 7b) with current-generation open weights.

#### 49. llama 4 — `llama-4` · llm · staff pick · https://github.com/meta-llama/llama-models · Llama 4 Community License
| why | meta's current-generation multimodal llm family (scout + maverick). native multimodal, 10m+ token context on scout. the new default "which open llm?" baseline. |

#### 50. deepseek v3 — `deepseek-v3` · llm · staff pick · https://github.com/deepseek-ai/DeepSeek-V3 · MIT
| why | top-tier open weights for general reasoning. mit licensed. still the benchmark others chase. |

#### 51. deepseek r1 — `deepseek-r1` · llm · featured · https://github.com/deepseek-ai/DeepSeek-R1 · MIT
| why | open reasoning model. chain-of-thought visible. essential for "open alternative to o1" searches. |

#### 52. qwen 3 — `qwen-3` · llm · featured · https://github.com/QwenLM/Qwen3 · Apache-2.0
| why | alibaba's latest open family. strong multilingual + tool use. dense and moe variants. replaces qwen 2.5 in catalog. |

#### 53. mistral small 3 — `mistral-small-3` · llm · featured · https://github.com/mistralai/mistral-src · Apache-2.0
| why | efficient apache-licensed model from mistral. runs on consumer gpus. best "mistral" entry for indie builders in 2026. |

#### 54. gemma 3 — `gemma-3` · llm · featured · https://github.com/google/gemma-llm · Gemma Terms
| why | google's current open model line. multimodal on larger variants. strong for size class. |

#### 55. phi-4 — `phi-4` · llm · featured · https://github.com/microsoft/Phi-4 · MIT
| why | microsoft's latest small language model. proves small models handle serious tasks. phone/laptop friendly. |

#### 56. flux.1 dev — `flux-1` · image-gen · featured · https://github.com/black-forest-labs/flux · Apache-2.0
| why | still the best open image generation default. keep until flux 2 oss weights ship. |

#### 57. whisper large v3 — `whisper-v3` · speech · featured · https://github.com/openai/whisper · MIT
| why | definitive open speech-to-text. v3 turbo for speed. every local transcription stack uses this. |

#### 58. qwen2.5-coder — `qwen2-5-coder` · code · featured · https://github.com/QwenLM/Qwen2.5-Coder · Apache-2.0
| why | current best open code model family for fine-tuning and local inference. replaces codellama. |

#### 59. nomic-embed v2 — `nomic-embed-v2` · embedding · verified · https://github.com/nomic-ai/nomic · Apache-2.0
| why | long-context open embeddings. default for rag without closed apis. |

#### 60. bge-m3 — `bge-m3` · embedding · verified · https://github.com/FlagOpen/FlagEmbedding · MIT
| why | multilingual hybrid retrieval (dense + sparse). sota-class open embedder. |

#### 61. olmo 2 — `olmo-2` · llm · verified · https://github.com/allenai/OLMo · Apache-2.0
| why | fully open training pipeline — weights, data, code, eval. transparency champion. upgraded from olmo 1. |

#### 62. smollm3 — `smollm3` · llm · verified · https://github.com/huggingface/smollm · Apache-2.0
| why | hugging face's efficient 3b model. best entry point for "run a model on anything" demos. |

*phase 2 holds: llama 3, sdxl, codellama, yolov8, mixtral, llava, segment-anything. cross-link all models to ollama, vllm, llama.cpp tools.*

---

### resources (10)

#### 63. lucide — `lucide` · icons · staff pick · https://github.com/lucide-icons/lucide · ISC
#### 64. mdn — `mdn` · docs · staff pick · https://github.com/mdn/content · CC-BY-SA
#### 65. devdocs — `devdocs` · docs · featured · https://github.com/freeCodeCamp/DevDocs · MIT
#### 66. choose a license — `choose-a-license` · legal · featured · https://github.com/github/choosealicense.com · MIT
#### 67. opensource guide — `opensource-guide` · guide · featured · https://github.com/github/opensource.guide · CC-BY-4.0
#### 68. opentelemetry — `opentelemetry` · spec · featured · https://github.com/open-telemetry/opentelemetry-specification · Apache-2.0
#### 69. openapi — `openapi` · spec · featured · https://github.com/OAI/OpenAPI-Specification · Apache-2.0
#### 70. create t3 app — `create-t3-app` · starter · featured · https://github.com/t3-oss/create-t3-app · MIT
#### 71. docusaurus — `docusaurus` · starter · featured · https://github.com/facebook/docusaurus · MIT
#### 72. standard readme — `standard-readme` · guide · verified · https://github.com/RichardLitt/standard-readme · CC0

---

### clis (10)

#### 73. ripgrep — `ripgrep` · search · staff pick · https://github.com/BurntSushi/ripgrep · MIT · replaces grep
#### 74. fzf — `fzf` · fuzzy-finder · featured · https://github.com/junegunn/fzf · MIT
#### 75. fd — `fd` · file-find · featured · https://github.com/sharkdp/fd · MIT · replaces find
#### 76. bat — `bat` · file-viewer · featured · https://github.com/sharkdp/bat · MIT · replaces cat
#### 77. eza — `eza` · file-list · featured · https://github.com/eza-community/eza · MIT · replaces ls
#### 78. zoxide — `zoxide` · navigation · featured · https://github.com/ajeetdsouza/zoxide · MIT · replaces cd bookmarks
#### 79. atuin — `atuin` · shell-history · featured · https://github.com/atelierchen/atuin · MIT · replaces ctrl+r
#### 80. lazygit — `lazygit` · git-ui · featured · https://github.com/jesseduffield/lazygit · MIT
#### 81. starship — `starship` · prompt · featured · https://github.com/starship/starship · ISC
#### 82. mise — `mise` · runtime-manager · verified · https://github.com/jdx/mise · MIT · replaces nvm/pyenv

---

### datasets (8)

#### 83. fine-web — `fine-web` · text corpus · featured · https://huggingface.co/datasets/HuggingFaceFW/fineweb · ODC-BY
#### 84. the stack — `the-stack` · code · featured · https://huggingface.co/datasets/bigcode/the-stack · OpenRAIL-M
#### 85. red pajama — `red-pajama` · text corpus · verified · https://github.com/togethercomputer/RedPajama-Data · Apache-2.0
#### 86. common voice — `common-voice` · speech · featured · https://github.com/common-voice/common-voice · MPL-2.0
#### 87. coco — `coco` · vision · verified · https://github.com/cocodataset/cocoapi · CC-BY-4.0
#### 88. human eval — `human-eval` · code eval · verified · https://github.com/openai/human-eval · MIT
#### 89. ms marco — `ms-marco` · retrieval · verified · https://huggingface.co/datasets/microsoft/ms_marco · MIT
#### 90. open images — `open-images` · vision · verified · https://github.com/cvdfoundation/open-images-dataset · CC-BY-4.0

*datasets link to hugging face or github; profile schema adds: size, format, license, use cases, download method.*

---

### mcps (10)

#### 91. filesystem — `mcp-filesystem` · core · staff pick · https://github.com/modelcontextprotocol/servers · MIT
#### 92. github — `mcp-github` · devtools · staff pick · https://github.com/github/github-mcp-server · MIT
#### 93. playwright — `mcp-playwright` · browser · featured · https://github.com/microsoft/playwright-mcp · Apache-2.0
#### 94. postgres — `mcp-postgres` · database · featured · https://github.com/modelcontextprotocol/servers · MIT
#### 95. sqlite — `mcp-sqlite` · database · verified · https://github.com/modelcontextprotocol/servers · MIT
#### 96. brave search — `mcp-brave-search` · search · verified · https://github.com/modelcontextprotocol/servers · MIT
#### 97. fetch — `mcp-fetch` · http · verified · https://github.com/modelcontextprotocol/servers · MIT
#### 98. memory — `mcp-memory` · knowledge · verified · https://github.com/modelcontextprotocol/servers · MIT
#### 99. supabase — `mcp-supabase` · backend · featured · https://github.com/supabase-community/supabase-mcp · Apache-2.0
#### 100. firecrawl — `mcp-firecrawl` · scraping · featured · https://github.com/mendableai/firecrawl-mcp · MIT

*mcp profiles add: transport (stdio/sse), auth requirements, tool list summary, compatible hosts (claude, cursor, etc.).*

---

## 5. phase 2 catalog (120 entries)

compact research backlog — full profiles after launch. format: `name · category · subcategory · github · license · priority`

### tools — phase 2 (45)

| name | subcategory | github | license | notes |
|------|-------------|--------|---------|-------|
| screenpipe | ai-native | github.com/mediar-ai/screenpipe | MIT | 24/7 screen+audio capture for ai |
| karakeep | productivity | github.com/karakeep-app/karakeep | AGPL-3.0 | bookmark everything (was hoarder) |
| affine | productivity | github.com/toeverything/AFFiNE | MIT | notion + miro alternative |
| appflowy | productivity | github.com/AppFlowy-IO/AppFlowy | AGPL-3.0 | notion alternative, flutter |
| anytype | productivity | github.com/anyproto/anytype-heart | AGPL-3.0 | local-first notion |
| docmost | productivity | github.com/docmost/docmost | AGPL-3.0 | confluence alternative |
| excalidraw | design | github.com/excalidraw/excalidraw | MIT | virtual whiteboard |
| tldraw | design | github.com/tldraw/tldraw | SDK license | whiteboard sdk |
| baserow | backend | github.com/baserow/baserow | MIT | airtable alternative |
| nocodb | backend | github.com/nocodb/nocodb | AGPL-3.0 | airtable alternative |
| directus | cms | github.com/directus/directus | BUSL→GPL | headless cms |
| strapi | cms | github.com/strapi/strapi | MIT | headless cms |
| payload | cms | github.com/payloadcms/payload | MIT | next.js cms |
| ghost | cms | github.com/TryGhost/Ghost | MIT | publishing |
| cal.com | productivity | github.com/calcom/cal.com | AGPL-3.0 | calendly alternative |
| formbricks | surveys | github.com/formbricks/formbricks | AGPL-3.0 | experience surveys |
| matomo | analytics | github.com/matomo-org/matomo | GPL-3.0 | ga alternative (mature) |
| growthbook | devtools | github.com/growthbook/growthbook | MIT | feature flags |
| unleash | devtools | github.com/Unleash/unleash | Apache-2.0 | feature flags |
| glitchtip | monitoring | github.com/glitchtip/glitchtip | MIT | sentry alternative |
| highlight.io | monitoring | github.com/highlight/highlight | Apache-2.0 | session replay |
| beszel | monitoring | github.com/henrygd/beszel | MIT | lightweight server monitoring |
| netdata | monitoring | github.com/netdata/netdata | GPL-3.0 | real-time monitoring |
| authelia | auth | github.com/authelia/authelia | Apache-2.0 | sso portal |
| zitadel | auth | github.com/zitadel/zitadel | AGPL-3.0 | identity platform |
| logto | auth | github.com/logto-io/logto | MPL-2.0 | auth0 alternative |
| supertokens | auth | github.com/supertokens/supertokens-core | Apache-2.0 | auth toolkit |
| keycloak | auth | github.com/keycloak/keycloak | Apache-2.0 | enterprise iam |
| forgejo | devtools | github.com/forgejo/forgejo | MIT | git hosting |
| gitea | devtools | github.com/go-gitea/gitea | MIT | git hosting |
| jellyfin | media | github.com/jellyfin/jellyfin | GPL-2.0 | media server |
| navidrome | media | github.com/navidrome/navidrome | GPL-3.0 | music server |
| audiobookshelf | media | github.com/advplyr/audiobookshelf | GPL-3.0 | audiobooks |
| peertube | media | github.com/Chocobozzz/PeerTube | AGPL-3.0 | youtube alternative |
| photoprism | media | github.com/photoprism/photoprism | AGPL-3.0 | photo management |
| ente | media | github.com/ente-io/ente | AGPL-3.0 | encrypted photos |
| paperless-ngx | productivity | github.com/paperless-ngx/paperless-ngx | GPL-3.0 | document management |
| stirling-pdf | productivity | github.com/Stirling-Tools/Stirling-PDF | Apache-2.0 | pdf toolkit |
| actual budget | finance | github.com/actualbudget/actual | MIT | ynab alternative |
| invoice ninja | finance | github.com/invoiceninja/invoiceninja | AGPL-3.0 | invoicing |
| homeassistant | home-automation | github.com/home-assistant/core | Apache-2.0 | home automation |
| node-red | automation | github.com/node-red/node-red | Apache-2.0 | flow-based iot |
| minio | storage | github.com/minio/minio | AGPL-3.0 | s3-compatible storage |
| garage | storage | github.com/deuxfleurs/garage | AGPL-3.0 | distributed storage |
| traefik | self-hosting | github.com/traefik/traefik | MIT | reverse proxy |

### tools — phase 2 continued (ai & devtools)

| name | subcategory | github | license | notes |
|------|-------------|--------|---------|-------|
| zed | devtools | github.com/zed-industries/zed | GPL-3.0 | fast ai-native editor (moved from frameworks) |
| continue | devtools | github.com/continuedev/continue | Apache-2.0 | ai coding assistant |
| void | devtools | github.com/voideditor/void | Apache-2.0 | cursor alternative |
| localai | ai-native | github.com/mudler/LocalAI | MIT | local openai-compatible api |
| comfyui | ai-native | github.com/comfyanonymous/ComfyUI | GPL-3.0 | node-based image gen |
| khoj | ai-native | github.com/khoj-ai/khoj | AGPL-3.0 | personal ai second brain |
| onyx | ai-native | github.com/onyx-dot-app/onyx | MIT | enterprise search (danswer) |
| tooljet | devtools | github.com/ToolJet/ToolJet | AGPL-3.0 | low-code builder |
| budibase | devtools | github.com/Budibase/budibase | GPL-3.0 | low-code apps |
| metabase | analytics | github.com/metabase/metabase | AGPL-3.0 | bi dashboards |
| apache superset | analytics | github.com/apache/superset | Apache-2.0 | bi platform |
| redash | analytics | github.com/getredash/redash | BSD-2-Clause | query dashboards |
| zipline | storage | github.com/diced/zipline | MIT | file sharing |
| shlink | devtools | github.com/shlinkio/shlink | MIT | url shortener |
| dub | devtools | github.com/dubinc/dub | AGPL-3.0 | link analytics |
| plunk | communication | github.com/plunk-fan/plunk | AGPL-3.0 | self-host email |
| mautic | communication | github.com/mautic/mautic | GPL-3.0 | marketing automation |
| discourse | communication | github.com/discourse/discourse | GPL-2.0 | forum |
| zulip | communication | github.com/zulip/zulip | Apache-2.0 | team chat |
| matrix synapse | communication | github.com/matrix-org/synapse | Apache-2.0 | decentralized chat |
| jitsi | communication | github.com/jitsi/jitsi-meet | Apache-2.0 | video conferencing |

### frameworks — phase 2 (24)

| name | subcategory | github | license |
|------|-------------|--------|---------|
| remix | full-stack | github.com/remix-run/remix | MIT |
| rails | full-stack | github.com/rails/rails | MIT |
| laravel | full-stack | github.com/laravel/laravel | MIT |
| nestjs | web-backend | github.com/nestjs/nest | MIT |
| hono | web-backend | github.com/honojs/hono | MIT |
| elysia | web-backend | github.com/elysiajs/elysia | MIT |
| solidjs | web-frontend | github.com/solidjs/solid | MIT |
| vue | web-frontend | github.com/vuejs/core | MIT |
| nuxt | full-stack | github.com/nuxt/nuxt | MIT |
| flutter | mobile | github.com/flutter/flutter | BSD-3-Clause |
| electron | desktop | github.com/electron/electron | MIT |
| llamaindex | ai-ml | github.com/run-llama/llama_index | MIT |
| tanstack query | api | github.com/TanStack/query | MIT |
| zod | api | github.com/colinhacks/zod | MIT |
| vitest | testing | github.com/vitest-dev/vitest | MIT |
| storybook | ui-components | github.com/storybookjs/storybook | MIT |
| turborepo | runtime | github.com/vercel/turborepo | MIT |
| bun | runtime | github.com/oven-sh/bun | MIT |
| deno | runtime | github.com/denydeno/deno | MIT |
| rocket | web-backend | github.com/rwf2/Rocket | MIT |
| gin | web-backend | github.com/gin-gonic/gin | MIT |
| fiber | web-backend | github.com/gofiber/fiber | MIT |
| radix ui | ui-components | github.com/radix-ui/primitives | MIT |
| effect ts | api | github.com/Effect-TS/effect | MIT |

### models — phase 2 (16)

| name | subcategory | github/hf | license |
|------|-------------|-----------|---------|
| llama 3 | llm | github.com/meta-llama/llama3 | Meta license |
| mixtral | llm | github.com/mistralai/mistral-src | Apache-2.0 |
| gemma 2 | llm | github.com/google/gemma | Gemma terms |
| mistral 7b | llm | github.com/mistralai/mistral-src | Apache-2.0 |
| phi-3 | llm | github.com/microsoft/Phi-3-mini | MIT |
| codellama | code | github.com/meta-llama/codellama | Meta license |
| sdxl | image-gen | github.com/Stability-AI/generative-models | RAIL-M |
| yolov8 | detection | github.com/ultralytics/ultralytics | AGPL-3.0 |
| command r+ | llm | huggingface.co/CohereForAI/c4ai-command-r-plus | CC-BY-NC |
| starcoder2 | code | github.com/bigcode-project/starcoder2 | OpenRAIL-M |
| deepseek coder | code | github.com/deepseek-ai/DeepSeek-Coder | MIT |
| llava | vision | github.com/haotian-liu/LLaVA | Apache-2.0 |
| segment anything | vision | github.com/facebookresearch/segment-anything | Apache-2.0 |
| clip | vision | github.com/openai/CLIP | MIT |
| bark | speech | github.com/suno-ai/bark | MIT |
| piper | speech | github.com/rhasspy/piper | MIT |
| musicgen | music | github.com/facebookresearch/audiocraft | MIT/CC-BY-NC |
| falcon | llm | github.com/tiiuae/falcon | Apache-2.0 |
| mamba | llm | github.com/state-spaces/mamba | Apache-2.0 |
| stable diffusion 3 | image-gen | github.com/Stability-AI/sd3-ref | Stability license |
| idefics | vision | huggingface.co/HuggingFaceM4/idefics | Apache-2.0 |
| rerankers (bge) | embedding | github.com/FlagOpen/FlagEmbedding | MIT |

### resources — phase 2 (15)

| name | subcategory | github | license |
|------|-------------|--------|---------|
| heroicons | icons | github.com/tailwindlabs/heroicons | MIT |
| tabler icons | icons | github.com/tabler/tabler-icons | MIT |
| phosphor icons | icons | github.com/phosphor-icons/core | MIT |
| geist font | fonts | github.com/vercel/geist-font | OFL-1.1 |
| jetbrains mono | fonts | github.com/JetBrains/JetBrainsMono | OFL-1.1 |
| inter | fonts | github.com/rsms/inter | OFL-1.1 |
| keep a changelog | guide | github.com/olivierlacan/keep-a-changelog | CC-BY-4.0 |
| conventional commits | spec | github.com/conventional-commits/conventionalcommits.org | CC-BY-4.0 |
| semver | spec | github.com/semver/semver | CC-BY-3.0 |
| spdx license list | legal | github.com/spdx/license-list-XML | CC0 |
| openssf best practices | guide | github.com/coreinfrastructure/best-practices-badge | Apache-2.0 |
| shields.io | devtools | github.com/badges/shields | CC0 |
| openapi generator | devtools | github.com/OpenAPITools/openapi-generator | Apache-2.0 |
| twelve-factor app | guide | github.com/twelve-factor/twelve-factor | MIT |
| cncf landscape | guide | github.com/cncf/landscape | Apache-2.0 |

### clis — phase 2 (12)

| name | subcategory | github | license |
|------|-------------|--------|---------|
| just | task-runner | github.com/casey/just | CC0 |
| hyperfine | benchmarking | github.com/sharkdp/hyperfine | MIT |
| delta | git-diff | github.com/dandavison/delta | MIT |
| lazydocker | docker-ui | github.com/jesseduffield/lazydocker | MIT |
| k9s | kubernetes | github.com/derailed/k9s | Apache-2.0 |
| httpie | http-client | github.com/httpie/cli | BSD-3-Clause |
| tmux | terminal | github.com/tmux/tmux | ISC |
| neovim | editor | github.com/neovim/neovim | Apache-2.0 |
| helix | editor | github.com/helix-editor/helix | MPL-2.0 |
| gum | scripting | github.com/charmbracelet/gum | MIT |
| glow | markdown | github.com/charmbracelet/glow | MIT |
| docker compose | containers | github.com/docker/compose | Apache-2.0 |

### datasets — phase 2 (10)

| name | subcategory | source | license |
|------|-------------|--------|---------|
| dolma | text | github.com/allenai/dolma | ODC-BY |
| refinedweb | text | huggingface.co/datasets/tiiuae/falcon-refinedweb | ODC-BY |
| wikitext | text | huggingface.co/datasets/wikitext | CC-BY-SA |
| squad | qa | huggingface.co/datasets/squad | CC-BY-SA |
| glue | nlp eval | huggingface.co/datasets/glue | varies |
| librispeech | speech | openslr.org/12 | CC-BY-4.0 |
| laion-aesthetics | image | huggingface.co/datasets/laion/laion2B-en-aesthetic | CC-BY-4.0 |
| imdb | sentiment | huggingface.co/datasets/imdb | Apache-2.0 |
| alpaca | instruction | github.com/tatsu-lab/stanford_alpaca | CC-BY-NC |
| dolly | instruction | github.com/databrickslabs/dolly | CC-BY-SA |

### mcps — phase 2 (8)

| name | subcategory | github | license |
|------|-------------|--------|---------|
| cloudflare | infrastructure | github.com/cloudflare/mcp-server-cloudflare | Apache-2.0 |
| stripe | payments | github.com/stripe/agent-toolkit | MIT |
| sentry | monitoring | github.com/getsentry/sentry-mcp | Apache-2.0 |
| notion | productivity | github.com/makenotion/notion-mcp-server | MIT |
| google maps | location | github.com/modelcontextprotocol/servers | MIT |
| puppeteer | browser | github.com/modelcontextprotocol/servers | MIT |
| gitlab | devtools | github.com/modelcontextprotocol/servers | MIT |
| elasticsearch | search | github.com/elastic/mcp-server-elasticsearch | Apache-2.0 |

---

## 6. watchlist (80+)

tracked projects not yet ready for profiles — too early, license unclear, or maintenance concerns.

| name | category | github | watch reason |
|------|----------|--------|--------------|
| onyx | tool | github.com/onyx-dot-app/onyx | rapid pivots, verify stability |
| mem0 | tool | github.com/mem0ai/mem0 | apache changed to custom license — verify |
| cursor (not oss) | — | — | exclude: not open source |
| sandstorm | tool | github.com/sandstorm-io/sandstorm | maintenance slow |
| appsmith | tool | github.com/appsmithorg/appsmith | license changed to EE model |
| airbyte | tool | github.com/airbytehq/airbyte | ee vs oss boundary |
| prefect | tool | github.com/PrefectHQ/prefect | cloud-first pivot |
| temporal | tool | github.com/temporalio/temporal | mostly oss but complex |
| casdoor | tool | github.com/casdoor/casdoor | documentation gaps |
| bookstack | tool | github.com/BookStackApp/BookStack | phase 2 candidate |
| vikunja | tool | github.com/go-vikunja/vikunja | phase 2 candidate |
| focalboard | tool | github.com/mattermost/focalboard | mattermost maintenance |
| aptabase | tool | github.com/aptabase/aptabase | analytics for tauri apps |
| openpanel | tool | github.com/Openpanel-dev/openpanel | posthog competitor, young |
| crowdin (oss parts) | tool | github.com/crowdin/crowdin-cli | partial oss only |
| perses | tool | github.com/perses/perses | grafana alternative, early |
| keep | tool | github.com/keephq/keep | alert management, new |
| wazuh | tool | github.com/wazuh/wazuh | security, heavy setup |
| crowdsec | tool | github.com/crowdsecurity/crowdsec | security agent |
| pi-hole | tool | github.com/pi-hole/pi-hole | homelab staple |
| adguard home | tool | github.com/AdguardTeam/AdGuardHome | dns filtering |
| tailscale | — | — | exclude: not fully oss |
| headscale | tool | github.com/juanfont/headscale | tailscale control server |
| syncthing | tool | github.com/syncthing/syncthing | file sync |
| restic | tool | github.com/restic/restic | backup |
| casaos | tool | github.com/IceWhaleTech/CasaOS | home server os |
| yunohost | tool | github.com/YunoHost/yunohost | server distribution |
| mailcow | tool | github.com/mailcow/mailcow-dockerized | email server |
| stalwart | tool | github.com/stalwartlabs/stalwart | mail server |
| roundcube | tool | github.com/roundcube/roundcubemail | webmail |
| trilium | tool | github.com/TriliumNext/Trilium | notes |
| logseq | tool | github.com/logseq/logseq | notes (license concerns on assets) |
| siyuan | tool | github.com/siyuan-note/siyuan | notes, partially proprietary |
| obsidian (not oss) | — | — | exclude |
| standard notes (partial) | tool | github.com/standardnotes/server | partial oss |
| freshrss | tool | github.com/FreshRSS/FreshRSS | rss reader |
| miniflux | tool | github.com/miniflux/v2 | minimal rss |
| linkwarden | tool | github.com/linkwarden/linkwarden | bookmark manager |
| wallabag | tool | github.com/wallabag/wallabag | read-it-later |
| omnivore (archived?) | — | — | verify status |
| archivebox | tool | github.com/ArchiveBox/ArchiveBox | web archiving |
| changedetection | tool | github.com/dgtlmoon/changedetection.io | website monitoring |
| serpbear | tool | github.com/towfiqi/serpbear | seo rank tracking |
| plausible competitors | — | — | covered |
| umami competitors | — | — | covered |
| apt | — | — | package manager not a product |
| nix | framework | github.com/NixOS/nix | complex, phase 3 |
| bazel | framework | github.com/bazelbuild/bazel | enterprise skew |
| pulumi | framework | github.com/pulumi/pulumi | iac, phase 3 |
| terraform (busl) | — | — | exclude post-busl |
| opentofu | framework | github.com/opentofu/opentofu | iac fork |
| ansible | tool | github.com/ansible/ansible | automation, phase 3 |
| mlflow | tool | github.com/mlflow/mlflow | ml ops |
| kubeflow | tool | github.com/kubeflow/kubeflow | k8s ml, heavy |
| dagster | tool | github.com/dagster-io/dagster | data orchestration |
| airflow | tool | github.com/apache/airflow | workflows |
| dbt core | tool | github.com/dbt-labs/dbt-core | analytics engineering |
| great expectations | tool | github.com/great-expectations/great_expectations | data quality |
| duckdb | tool | github.com/duckdb/duckdb | embedded analytics db |
| clickhouse | tool | github.com/ClickHouse/ClickHouse | olap database |
| questdb | tool | github.com/questdb/questdb | timeseries db |
| victoriametrics | tool | github.com/VictoriaMetrics/VictoriaMetrics | metrics db |
| redis | tool | github.com/redis/redis | in-memory db |
| valkey | tool | github.com/valkey-io/valkey | redis fork |
| dragonfly | tool | github.com/dragonflydb/dragonfly | redis replacement |
| surrealdb | tool | github.com/surrealdb/surrealdb | multi-model db |
| appwrite | tool | github.com/appwrite/appwrite | firebase alt |
| convex (not oss) | — | — | exclude |
| convex open source parts | — | — | verify |
| convex.dev | — | — | exclude |
| turso (libsql) | tool | github.com/tursodatabase/libsql | sqlite edge |
| neon (partial) | — | — | exclude server, oss client libs only |
| electric sql | framework | github.com/electric-sql/electric | local-first sync |
| powersync | — | — | partial oss |
| liveblocks (not oss) | — | — | exclude |
| partykit | framework | github.com/partykit/partykit | edge realtime |
| socket.io | framework | github.com/socketio/socket.io | realtime |
| supabase realtime | — | — | part of supabase |
| livekit | tool | github.com/livekit/livekit | webrtc infra |
| mediasoup | framework | github.com/versatica/mediasoup | webrtc |
| coturn | tool | github.com/coturn/coturn | turn server |
| caddy | tool | github.com/caddyserver/caddy | web server |
| nginx | tool | github.com/nginx/nginx | web server |
| angie | tool | github.com/webserver-angie/angie | nginx fork |
| frankenphp | tool | github.com/dunglas/frankenphp | php app server |
| roadrunner | tool | github.com/roadrunner-server/roadrunner | php/go server |
| swoole | framework | github.com/swoole/swoole-src | php async |

---

## 7. updated comparisons (20 hand-written)

| # | slug | title | projects |
|---|------|-------|----------|
| 1 | `self-hosted-analytics` | self-hosted analytics compared | posthog · plausible · umami · matomo |
| 2 | `loom-alternatives` | open source loom alternatives | **cap** · screenpipe |
| 3 | `firebase-alternatives` | open source firebase alternatives | supabase · pocketbase · appwrite |
| 4 | `open-llms-compared` | which open llm should you run locally? | llama 4 · deepseek v3 · qwen 3 · phi-4 |
| 5 | `llm-inference-stack` | how to serve open models | ollama · vllm · llama.cpp · localai |
| 6 | `api-clients` | open source api clients | **bruno** · hoppscotch · insomnia (ref) |
| 7 | `automation-platforms` | self-hosted automation | n8n · activepieces · windmill · node-red |
| 8 | `electron-alternatives` | desktop apps without electron | tauri · flutter |
| 9 | `nextjs-alternatives` | full-stack frameworks for indie builders | next.js · sveltekit · astro · remix |
| 10 | `orm-typescript` | typescript orms compared | prisma · drizzle |
| 11 | `chat-uis` | self-hosted chat interfaces for llms | open webui · librechat · ollama |
| 12 | `monitoring-stack` | self-hosted monitoring | signoz · grafana · uptime kuma · beszel |
| 13 | `secrets-management` | open source secrets management | infisical · vault · doppler (ref) |
| 14 | `notion-alternatives` | replace notion with open source | outline · affine · appflowy · anytype |
| 15 | `postman-alternatives` | api testing without postman | bruno · hoppscotch |
| 16 | `cli-must-haves` | essential cli tools for daily dev | ripgrep · fzf · zoxide · atuin · lazygit |
| 17 | `image-generation` | open source image models | flux.1 · sdxl · stable diffusion 3 |
| 18 | `embedding-models` | embedding models for rag | nomic-embed · bge-m3 · clip |
| 19 | `mcp-starter-pack` | mcp servers to start with | filesystem · github · playwright · postgres |
| 20 | `feature-flags` | open source feature flags | growthbook · unleash · posthog flags |

---

## 8. updated collections (8)

| slug | title | anchor projects |
|------|-------|-----------------|
| `indie-saas-infra` | infrastructure for indie saas | supabase · posthog · coolify · cal.com · listmonk |
| `creator-stack` | tools for content-creating builders | **cap** · penpot · excalidraw · ghost |
| `homelab-essentials` | essential self-hosted tools | immich · vaultwarden · homeassistant · jellyfin · uptime kuma |
| `local-ai-stack` | run ai without api costs | ollama · open webui · llama 3 · whisper · nomic-embed |
| `ai-agent-stack` | build ai agents with oss | langchain · mcps · litellm · langfuse |
| `terminal-productivity` | upgrade your terminal | ripgrep · fzf · atuin · starship · zoxide |
| `first-oss-contribution` | start contributing to oss | opensource-guide · mdn · choose-a-license · standard-readme |
| `replace-notion` | open source notion alternatives | outline · affine · appflowy · anytype · docmost |

---

## 9. staff picks at launch (17)

| project | category | why highlighted |
|---------|----------|-----------------|
| cap | tools | indie oss darling, loom narrative, creator-tools anchor |
| posthog | tools | analytics default |
| supabase | tools | backend default |
| coolify | tools | self-hosting narrative |
| n8n | tools | automation default |
| bruno | tools | postman alternative, indie oss |
| open webui | tools | local ai ui default |
| immich | tools | self-host photos |
| posthog | — | (listed once) |
| next.js | frameworks | react default |
| astro | frameworks | content sites |
| fastapi | frameworks | python apis |
| tauri | frameworks | desktop |
| shadcn/ui | frameworks | ui default |
| better-auth | frameworks | auth we dogfood |
| llama 4 | models | llm baseline |
| deepseek v3 | models | best open weights |
| lucide | resources | our own icon set |
| mdn | resources | web docs default |
| ripgrep | clis | cli gateway drug |
| mcp-github | mcps | dev workflow integration |

---

## 10. plan improvements (v2)

based on deep research, these changes improve the overall plan:

### 10.1 catalog architecture

| improvement | detail |
|-------------|--------|
| **three-tier catalog** | launch 100 → phase 2 (120) → watchlist (80+). prevents scope creep while showing growth path. |
| **seven categories** | add clis, datasets, mcps. update nav, browse, schema, sitemap. |
| **cross-cutting tags** | `indie-oss`, `creator-tools`, `ai-native`, `replaces-saas` — filter beyond category. |
| **category-specific profiles** | datasets add size/format/download; mcps add transport/tools/compatibility; clis add install method/package manager. |

### 10.2 content velocity

| phase | pace |
|-------|------|
| pre-launch | 100 full profiles (5/day over 20 days) |
| weeks 1–12 post-launch | 10 new profiles/week from phase 2 backlog |
| ongoing | community submissions + 2 editorial profiles/week |
| comparisons | 1 new comparison every 2 weeks (20 total by month 6) |

### 10.3 submission criteria (per category)

| category | min stars | min activity | extra requirements |
|----------|-----------|--------------|-------------------|
| tools | 30 | 90-day commits | readme + install docs |
| frameworks | 100 | 90-day commits | docs site or thorough readme |
| models | 50 | model weights accessible | license + eval benchmarks cited |
| resources | 10 | maintained | clear use case |
| clis | 20 | 90-day commits | package manager publish (brew/cargo/npm) |
| datasets | 10 | accessible download | license + documentation |
| mcps | 10 | 60-day commits | mcp spec compliance, tool manifest |

### 10.4 new browse experiences

- **"replace {saas}"** landing pages (loom → cap, notion → outline, postman → bruno)
- **"indie oss"** filtered browse — surfaces cap, plane, bruno, documenso
- **"ai agent starter kit"** collection linking mcps + models + tools
- **stack templates** — pre-built public lists users can fork

### 10.5 seo expansion

target queries added from research:

- "open source loom alternative" (cap)
- "open source cursor alternative" (void, continue, zed)
- "best mcp servers for developers"
- "essential cli tools 2026"
- "open source datasets for fine-tuning"
- "bruno vs postman open source"

### 10.6 quality automation

- weekly github cron refreshes metadata for all tiers
- license change alerts (e.g. mem0, appsmith-style license shifts → auto-flag)
- maintenance downgrade workflow: active → slow → stale → editorial review
- "last verified" date on every profile

### 10.7 roadmap adjustment

| change | from | to |
|--------|------|-----|
| soft launch content | 100 profiles | 100 profiles across 7 categories |
| phase 1 duration | 4 weeks content | 5 weeks (new categories add schema work) |
| comparison count at launch | 15 | 20 |
| collection count at launch | 5 | 8 |
| phase 2 catalog | undefined | 120 queued profiles |

---

## 11. pre-publish verification checklist

- [ ] github api: repo exists, not archived
- [ ] license spdx verified (extra scrutiny on dual-license / fair-code / busl)
- [ ] category assignment validated
- [ ] tags applied (indie-oss, creator-tools, etc.)
- [ ] alternatives cross-link to catalog entries
- [ ] for datasets: download url works
- [ ] for mcps: server implements mcp spec, tools documented
- [ ] for clis: install command verified on macos + linux
- [ ] verdict includes "skip if"
- [ ] comparison pages cross-linked
- [ ] og image generated

---

*version 2.0 — replaces v1.0 catalog. review launch 100, phase 2 priorities, and watchlist exclusions before content writing.*