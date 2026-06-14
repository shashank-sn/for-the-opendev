import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "content/catalog.json"), "utf8"));

const richProfiles = {
  cap: `## verdict

cap is the open-source loom indie builders actually want. instant recording for quick async updates, studio mode when you need polish, and a self-hostable stack when you care where your videos live.

## who it's for

solo devs and small teams shipping product demos, changelog videos, and customer walkthroughs without paying per-seat saas pricing.

## skip if

you need enterprise sso, advanced analytics, or a fully managed cloud with zero ops appetite.

## install path

clone the repo, follow the self-host docs, connect s3-compatible storage. first recording in one session if you're comfortable with docker.

## commercial use

agpl — understand copyleft obligations before embedding in a commercial product.`,
  posthog: `## verdict

posthog is the default answer when someone asks "what should i self-host for product analytics?" one oss stack for events, flags, session replay, and experiments.

## who it's for

teams replacing mixpanel or amplitude who want data on their own infrastructure.

## skip if

you only need a single lightweight pageview counter — plausible or umami may be simpler.

## install path

docker compose or coolify deploy. wire the snippet, verify events in the live feed.

## commercial use

mit core — check ee boundaries if you need enterprise-only modules.`,
  plausible: `## verdict

plausible is privacy-first analytics without the google surveillance stack. lightweight, readable dashboards, and a self-hosted path when you want full data ownership.

## who it's for

indie sites and saas products that need honest traffic numbers without cookie banners eating your conversion rate.

## skip if

you need session replay, feature flags, or deep product analytics — posthog is the heavier sibling.

## install path

managed cloud for speed, or docker for self-host. add the script tag, confirm the live visitor counter ticks.

## commercial use

agpl — self-hosted copyleft applies; cloud hosted tier is separate.`,
  supabase: `## verdict

supabase is the oss firebase alternative that actually ships: postgres, auth, storage, realtime, and edge functions in one developer-friendly surface.

## who it's for

solo builders who want a managed backend without writing boilerplate auth and row-level security from scratch.

## skip if

you need multi-region active-active on day one or want to avoid postgres operational complexity at scale.

## install path

start on the hosted free tier, graduate to self-host or dedicated when revenue justifies ops time.

## commercial use

apache-2.0 core — review ee modules if you depend on enterprise-only features.`,
  coolify: `## verdict

coolify is how indie devs replace heroku without becoming a kubernetes admin. push-to-deploy, docker-native, and honest about self-hosting your entire paas.

## who it's for

builders running multiple side projects who want one dashboard for apps, databases, and ssl — on your own vps.

## skip if

you are already deep on fly.io or railway and happy with per-app pricing.

## install path

provision a vps, run the coolify installer, connect github, deploy your first next.js app same day.

## commercial use

apache-2.0 — commercial hosting businesses built on coolify are common; verify trademark usage.`,
  n8n: `## verdict

n8n is the open-source zapier with enough depth for real workflows — not just toy automations. visual editor, self-hostable, and a fair node ecosystem.

## who it's for

operators wiring webhooks, crm sync, and ai agent glue without paying per-task saas fees.

## skip if

you only need two ifttt-style recipes — activepieces may be lighter. you hate maintaining workflow runners.

## install path

docker compose on a small vps or coolify one-click. import a template workflow, test with a webhook.

## commercial use

apache-2.0 sustainable use license — read the license FAQ before embedding in a commercial automation product.`,
  bruno: `## verdict

bruno is the postman alternative that stores collections as plain files in your repo. git-friendly api testing without cloud lock-in.

## who it's for

devs who want reproducible api collections next to application code — especially indie teams without a postman enterprise bill.

## skip if

your team lives entirely in postman cloud and needs built-in mock servers at enterprise scale.

## install path

download the desktop app, import an openapi spec, commit the bru collection to git.

## commercial use

mit — use freely.`,
  "open-webui": `## verdict

open webui is the chatgpt-style interface self-hosters actually run against ollama and openai-compatible backends. polished ux without sending prompts to a black box.

## who it's for

builders running local models who want a shareable ui for the team — not just a terminal curl loop.

## skip if

you only need a thin api client or already standardized on librechat's plugin model.

## install path

docker with ollama on the same host. pull a model, open the ui, verify streaming works.

## commercial use

bsd-3-clause — standard permissive terms.`,
  ollama: `## verdict

ollama is the fastest path from zero to running llms locally. one binary, sensible defaults, and a model library that just works on a laptop.

## who it's for

indie devs prototyping ai features before committing to gpu bills or vendor apis.

## skip if

you need production-grade multi-tenant serving at scale — vllm or managed inference is the next step.

## install path

install ollama, \`ollama pull llama3\`, hit the local api from your app. difficulty 1 for a reason.

## commercial use

mit — models carry their own licenses; check each model card.`,
  immich: `## verdict

immich is the google photos replacement homelabers trust. face search, mobile backup, and a real self-host story — not a half-finished gallery script.

## who it's for

families and builders who want photo backup on their own nas without apple or google rent.

## skip if

you cannot maintain postgres, redis, and ml workers — this is a real app, not a single binary.

## install path

docker compose on a machine with storage headroom. pair mobile apps, run your first backup overnight.

## commercial use

agpl — understand copyleft before offering immich as a hosted consumer product.`,
  nextjs: `## verdict

next.js is the default full-stack react framework for indie saas in 2026. app router, server components, and deployment paths everywhere — including cloudflare and self-host.

## who it's for

typescript builders shipping marketing sites, dashboards, and api routes in one repo.

## skip if

you need a content-only site with zero js — astro may be simpler. you want to avoid framework churn entirely.

## install path

\`pnpm create next-app\`, pick app router + typescript, deploy to your platform of choice.

## commercial use

mit — vercel is optional, not required.`,
  astro: `## verdict

astro is the content-site framework that ships almost no javascript by default. mdx, islands, and honest performance for docs and marketing.

## who it's for

builders who want blog-speed landing pages without wrestling react hydration on every route.

## skip if

your product is a heavy client-side app — next.js or a spa framework fits better.

## install path

\`pnpm create astro\`, add content collections, deploy static or server as needed.

## commercial use

mit — use freely.`,
  fastapi: `## verdict

fastapi is the python api framework indie ml and saas teams reach for first. typed routes, automatic openapi, and async when you need it.

## who it's for

python builders exposing model endpoints, webhooks, and crud apis without django ceremony.

## skip if

your team is typescript-only end-to-end — hono or express may reduce context switching.

## install path

\`pip install fastapi uvicorn\`, define routes, generate openapi, containerize when ready.

## commercial use

mit — use freely.`,
  tauri: `## verdict

tauri is the electron alternative that respects your users' ram. rust shell, web ui, and installers that do not ship a full chromium zip.

## who it's for

indie devs shipping desktop utilities, local-first tools, and dev apps where bundle size matters.

## skip if

you need deep native macos integrations only electron plugins solve today — evaluate gap before committing.

## install path

\`pnpm create tauri-app\`, wire your existing react or svelte ui, build signed binaries per platform.

## commercial use

mit — check individual dependency licenses in the rust chain.`,
  tailwindcss: `## verdict

tailwindcss is the utility-first css system that keeps indie teams shipping ui fast without inventing another design system from scratch.

## who it's for

react and next.js builders who want consistent spacing, responsive layouts, and dark mode without css module sprawl.

## skip if

you prefer semantic css only — vanilla extract or pure css may match your taste better.

## install path

add tailwind to your framework's postcss pipeline, define tokens in \`tailwind.config\`, ship components.

## commercial use

mit — use freely.`,
  "shadcn-ui": `## verdict

shadcn/ui is not an npm package you fight — it is copy-paste components you own. radix primitives, tailwind styling, and full source control.

## who it's for

indie saas teams who want accessible dialogs, forms, and tables without a component library version lock.

## skip if

you already standardized on mantine or chakra and migration cost is not worth it.

## install path

\`pnpm dlx shadcn@latest init\`, add components as needed, customize tokens in your repo.

## commercial use

mit — components live in your codebase.`,
  "better-auth": `## verdict

better-auth is the auth layer we run on fortheopen.dev. typescript-native, plugin ecosystem, and honest integration with next.js + drizzle without a hosted auth tax.

## who it's for

indie builders who want email, magic link, google, and github auth in one oss package they control.

## skip if

you need a fully managed identity platform with enterprise sla on day one.

## install path

\`pnpm add better-auth\`, configure drizzle adapter, wire oauth env vars, ship login modals.

## commercial use

mit — use freely in commercial products.`,
  "llama-4": `## verdict

llama 4 is meta's open-weight line for builders who want frontier-class models without closed api rent. check the community license before shipping customer-facing products.

## who it's for

teams running inference on their own gpus or through ollama/vllm who need a well-documented open model family.

## skip if

you need guaranteed sla inference — closed apis still win on ops simplicity for many indies.

## install path

pull weights from the official repo, serve via ollama or vllm, benchmark latency on your hardware.

## commercial use

llama community license — read restrictions for products over 700m monthly active users.`,
  "deepseek-v3": `## verdict

deepseek v3 is the open-weight reasoning model that changed the cost curve for indie ai products. strong coding and math performance when you self-host or route through compatible apis.

## who it's for

builders prototyping agent workflows and codegen features who want mit-licensed weights.

## skip if

you cannot provision serious gpu memory for full self-host — use a hosted openai-compatible endpoint instead.

## install path

follow the official inference guide, pair with litellm or open-webui for a unified developer ux.

## commercial use

mit — verify upstream license file stays current before production.`,
  lucide: `## verdict

lucide is the icon set we reach for on fortheopen.dev. consistent stroke icons, tree-shakeable react components, and no font-awesome licensing surprises.

## who it's for

any frontend builder who wants clean ui icons without maintaining custom svgs per button.

## skip if

you need a single icon font for legacy email templates — lucide is component-first.

## install path

\`pnpm add lucide-react\`, import icons by name, set size and stroke via props.

## commercial use

isc — permissive, commercial-friendly.`,
  mdn: `## verdict

mdn is the web documentation canon — now fully open on github. when you need the authoritative answer on a web api, start here instead of seo-slop blog posts.

## who it's for

every builder touching html, css, javascript, or web apis. full stop.

## skip if

never — bookmark it. you will still read framework docs for ergonomics, but mdn grounds the platform.

## install path

no install — use developer.mozilla.org. contribute fixes via the github content repo if you spot gaps.

## commercial use

cc-by-sa content — attribute when republishing excerpts.`,
  ripgrep: `## verdict

ripgrep is the grep replacement that respects your time. fast recursive search with sane defaults — the tool behind half the editor integrations you already use.

## who it's for

every developer searching codebases, logs, and config on macos, linux, or windows.

## skip if

you enjoy waiting for legacy grep — you will not.

## install path

\`brew install ripgrep\` or your package manager. alias \`rg\` in muscle memory.

## commercial use

mit — use freely.`,
  "mcp-filesystem": `## verdict

the filesystem mcp server is the boring-in-a-good-way bridge between ai agents and your repo. read, list, and search files with explicit scopes — not arbitrary shell access.

## who it's for

builders wiring cursor, claude, or custom agents who need filesystem tools with clear boundaries.

## skip if

your agent runtime already ships hardened file tools you trust more than another mcp hop.

## install path

add the server entry from modelcontextprotocol/servers to your mcp config, scope allowed directories tightly.

## commercial use

mit — verify server package license in the monorepo.`,
  "mcp-github": `## verdict

github's mcp server is the official path for agents that need issues, prs, and repo context without scraping. pair with filesystem mcp for serious coding agent setups.

## who it's for

indie devs automating triage, release notes, and repo research in ai-native workflows.

## skip if

you only need read-only public data — the rest api may be simpler without mcp overhead.

## install path

run github/github-mcp-server with a fine-scoped pat or github app credentials in your agent host.

## commercial use

mit — follow github's terms for api access and token storage.`,
  umami: `## verdict

umami is the lightweight analytics layer we wire on fortheopen.dev when self-hosting matters. pageviews, referrers, and events without the google tag manager tax.

## who it's for

indie sites that need honest traffic numbers with minimal js payload and optional self-host.

## skip if

you need session replay, feature flags, or product analytics depth — posthog is the heavier path.

## install path

docker compose or coolify. add the tracking script, verify realtime in the dashboard.

## commercial use

mit — use freely.`,
  pocketbase: `## verdict

pocketbase is firebase-in-a-single-binary for solo builders. auth, sqlite, realtime, and admin ui without a platform bill.

## who it's for

hackathon-to-mvp teams who want a backend tonight, not a platform committee next quarter.

## skip if

you need postgres scale, row-level security depth, or multi-region from day one — supabase may fit better.

## install path

download the binary or docker image, create collections in the admin ui, ship your first api call.

## commercial use

mit — embedding pocketbase as a hosted product has separate considerations; read the license faq.`,
  listmonk: `## verdict

listmonk is the self-hosted mailchimp replacement indie newsletters actually run. postgres-backed lists, campaigns, and a public subscribe api we proxy from fortheopen.dev.

## who it's for

builders who want newsletter ownership without convertkit pricing or mailchimp surveillance.

## skip if

you need advanced marketing automation, crm sync, or zero ops — hosted email saas may win on time.

## install path

docker compose with postgres, create a public list, copy the list uuid into \`LISTMONK_LIST_UUID\`, wire smtp.

## commercial use

agpl — understand copyleft before offering listmonk as a multi-tenant hosted service.`,
  penpot: `## verdict

penpot is the open-source figma alternative that keeps design files on infrastructure you control. real-time collaboration without proprietary lock-in.

## who it's for

indie teams and creators who want ui design tooling without per-seat saas rent.

## skip if

your team is fully committed to figma plugins and enterprise design ops — migration cost is real.

## install path

self-host via docker or use penpot cloud. import svg assets, invite collaborators, export dev-ready specs.

## commercial use

mpl-2.0 — standard weak copyleft for the platform.`,
  vaultwarden: `## verdict

vaultwarden is the lean bitwarden-compatible server homelabers run for family password vaults. same clients, fraction of the official server footprint.

## who it's for

builders who want password manager self-host without running full bitwarden enterprise infrastructure.

## skip if

you need official bitwarden enterprise support contracts — this is a community implementation.

## install path

docker on a trusted vps or nas. configure clients with your domain, enable 2fa, test mobile sync.

## commercial use

agpl — do not offer as a commercial password service without license review.`,
  langchain: `## verdict

langchain is the default oss toolkit when you're wiring llm chains, tools, and agents — ecosystem breadth over minimal api surface.

## who it's for

teams prototyping rag, tool-calling agents, and multi-step workflows who want batteries-included integrations.

## skip if

you want the thinnest possible abstraction over raw openai-compatible apis — litellm plus custom code may be cleaner.

## install path

\`pip install langchain\`, pick your model provider, compose a chain, log traces with langfuse.

## commercial use

mit — check dependency licenses in your specific integration graph.`,
  litellm: `## verdict

litellm is the universal adapter for llm apis — one interface, many providers, sane routing and cost tracking for indie ai products.

## who it's for

builders who want to swap models without rewriting client code or leaking api keys across services.

## skip if

you call a single local ollama endpoint only — direct sdk may be enough.

## install path

run the proxy container or python package, configure provider keys, point open-webui or your app at the gateway.

## commercial use

mit — review enterprise features if you resell inference routing.`,
  langfuse: `## verdict

langfuse is the open-source langsmith alternative for tracing llm calls. see prompts, latencies, and costs without sending observability to a closed vendor.

## who it's for

teams shipping ai features who need debuggable traces and eval hooks on infrastructure they control.

## skip if

you are pre-product with a single script — logging to stdout is fine until pain appears.

## install path

docker compose, add the sdk to your app, verify traces in the ui after first completion.

## commercial use

mit core — check ee boundaries for enterprise-only modules.`,
  fzf: `## verdict

fzf is fuzzy finding for your terminal — files, history, git branches, anything piped through it. once installed, ctrl-r feels broken without it.

## who it's for

every developer who navigates repos and shell history daily.

## skip if

never — it's a ten-minute install that pays back forever.

## install path

package manager install, bind to shell hooks, start with \`fzf\` in repo root.

## commercial use

mit — use freely.`,
  atuin: `## verdict

atuin is shell history that syncs, searches, and survives machine hops. structured metadata beats scrolling plain bash history.

## who it's for

devs on multiple machines who lose context in unstructured ctrl-r sessions.

## skip if

you refuse any shell hook that touches history — privacy-sensitive air-gapped environments may prefer local-only tools.

## install path

install atuin, run initial sync setup, replace default history search keybinding.

## commercial use

mit — self-host sync server if you want full data control.`,
  starship: `## verdict

starship is the fast, configurable prompt that makes every terminal feel intentional. git branch, node version, and cwd without slow shell themes.

## who it's for

anyone who lives in the terminal and wants informative prompts with near-zero lag.

## skip if

you have a heavily customized powerlevel10k setup you're happy with — switching is taste, not necessity.

## install path

install binary, add one line to shell rc, tweak \`starship.toml\` once.

## commercial use

isc — permissive.`,
  zoxide: `## verdict

zoxide is smarter cd — jump to directories you've actually visited. \`z dev\` beats typing full paths after day two.

## who it's for

developers with deep monorepos and many project folders across the filesystem.

## skip if

you use IDE-only navigation and rarely cd — low value.

## install path

install zoxide, hook into shell, train muscle memory for \`z <fragment>\`.

## commercial use

mit — use freely.`,
  lazygit: `## verdict

lazygit is the git tui that makes staging, rebasing, and fixups feel fast instead of frightening. terminal-native ui for real git workflows.

## who it's for

devs who know git but want visual staging and branch management without leaving the terminal.

## skip if

you are a magit maximalist on emacs — you already have your tui.

## install path

brew install lazygit, run inside any repo, map to a shell alias.

## commercial use

mit — use freely.`,
  "opensource-guide": `## verdict

opensource guide is github's canonical onboarding for new contributors — licenses, community, and maintenance expectations in one readable site.

## who it's for

first-time oss contributors and maintainers writing contributor docs that do not reinvent basics.

## skip if

you need legal advice — this is education, not counsel.

## install path

read opensource.guide, link it from your repo contributing section, send new contributors there first.

## commercial use

cc-by — attribute when republishing.`,
  "choose-a-license": `## verdict

choose a license is the fastest way to pick a sane default license for your repo. mit, apache, gpl — explained for humans, not lawyers only.

## who it's for

indie devs open-sourcing a side project this weekend who need a defensible license choice in ten minutes.

## skip if

you have complex dual-licensing or enterprise redistribution needs — get real legal review.

## install path

visit choosealicense.com, pick mit unless you have a copyleft reason, commit LICENSE.

## commercial use

mit site code — license recommendations are guidance.`,
  "standard-readme": `## verdict

standard readme is the spec for readme structure that helps strangers understand your repo in one scroll. badges, install, usage, license — predictable.

## who it's for

maintainers who want their github landing page to answer "what is this?" without a wiki.

## skip if

your repo is a library with generated docs site that replaces the readme entirely.

## install path

copy the spec outline, fill sections honestly, link from fortheopen.dev profile to a readme that matches.

## commercial use

cc0 spec text — use freely.`,
  documenso: `## verdict

documenso is the open-source docusign alternative for indie contracts — esign flows without per-envelope saas pricing.

## who it's for

small agencies and saas founders sending founder agreements, sow, and onboarding docs.

## skip if

you need enterprise id verification and global legal compliance packages on day one.

## install path

self-host or use hosted offering, upload pdf template, send first signature request.

## commercial use

agpl — review obligations before embedding in a commercial document platform.`,
  activepieces: `## verdict

activepieces is the friendlier self-hosted zapier alternative — visual automations with a growing piece library and reasonable ops overhead.

## who it's for

indie operators wiring saas webhooks who want automation without n8n-scale complexity.

## skip if

you need the deepest enterprise integration catalog — n8n may have more connectors today.

## install path

docker deploy, connect first trigger, ship a two-step workflow, monitor runs.

## commercial use

mit core — verify ee pieces if you depend on commercial-only connectors.`,
  windmill: `## verdict

windmill is the developer-centric automation and internal tool platform — scripts, flows, and apps with git sync and serious permissioning.

## who it's for

teams replacing retool plus zapier with one self-hosted control plane.

## skip if

you want the simplest if-this-then-that ui for non-technical users only — activepieces may be lighter.

## install path

helm or docker deploy, write a small python or typescript script, schedule it, invite the team.

## commercial use

agpl — understand copyleft for hosted automation products.`,
  hoppscotch: `## verdict

hoppscotch is the browser-native api client for quick requests without installing electron bloat. collections, environments, and shareable workspaces.

## who it's for

frontend devs and indie builders testing apis from the browser or self-hosted instance.

## skip if

you want git-native collections in-repo — bruno fits that workflow better.

## install path

use hoppscotch.io for solo work or self-host for team persistence. import openapi, save environments.

## commercial use

mit — use freely.`,
  sveltekit: `## verdict

sveltekit is the full-stack svelte framework for apps that should feel fast by default. less client js, file-based routing, adapters for every host.

## who it's for

builders who love svelte ergonomics and want one framework from landing page to api routes.

## skip if

your team is standardized on react — context switching cost may outweigh svelte benefits.

## install path

\`pnpm create svelte\`, pick skeleton project, deploy with node or static adapter.

## commercial use

mit — use freely.`,
  prisma: `## verdict

prisma is the schema-first orm typescript teams reach for first. migrations, type-safe client, and studio for quick data peeks.

## who it's for

indie saas teams who want productive postgres/mysql access without writing raw sql daily.

## skip if

you need edge-runtime sqlite with minimal bundle — drizzle may fit cloudflare workers better.

## install path

\`pnpm add prisma\`, define schema, migrate, generate client, ship crud.

## commercial use

apache-2.0 — use freely.`,
  drizzle: `## verdict

drizzle is the sql-forward orm we run on fortheopen.dev with better-auth. thin abstraction, great typescript inference, sqlite and postgres without codegen ceremony.

## who it's for

builders who want to read the sql their app emits and keep bundles small on edge runtimes.

## skip if

you want a gui-first schema designer for non-technical teammates — prisma studio wins there.

## install path

\`pnpm add drizzle-orm\`, define tables, run migrations, wire \`getDb()\` singleton.

## commercial use

apache-2.0 — use freely.`,
  librechat: `## verdict

librechat is the multi-provider chat ui with plugins and agents — heavier than open-webui, stronger when you need extensibility and role-based access.

## who it's for

teams self-hosting chat for mixed openai, anthropic, and local models with admin controls.

## skip if

you want the fastest ollama-only ui — open-webui is simpler to stand up.

## install path

docker compose with env for providers, create users, enable plugins incrementally.

## commercial use

mit — verify plugin licenses individually.`,
  vllm: `## verdict

vllm is production llm serving when ollama is not enough — throughput, batching, and openai-compatible endpoints on real gpus.

## who it's for

teams moving from local prototyping to serving open models for multiple users or services.

## skip if

you are on a laptop experimenting — ollama first, vllm when gpu infra exists.

## install path

gpu host, install vllm, load model weights, point litellm or your app at the openai-compatible port.

## commercial use

apache-2.0 — model weights carry separate licenses.`,
  signoz: `## verdict

signoz is the oss datadog-shaped observability stack — traces, metrics, and logs in one ui when you self-host.

## who it's for

indie saas teams replacing expensive apm bills with infrastructure they control.

## skip if

you only need uptime pings — uptime kuma is lighter. you have zero ops capacity — managed apm may be cheaper in time.

## install path

docker compose or kubernetes helm, instrument app with opentelemetry, verify first trace.

## commercial use

mit core — check ee modules for enterprise-only features.`,
  grafana: `## verdict

grafana is the dashboard layer for metrics you already collect — prometheus, loki, tempo, or cloud datasources in one polished ui.

## who it's for

teams with metrics pipelines who need visualization and alerting without datadog pricing.

## skip if

you need full apm out of the box — pair with signoz or similar, grafana is often the visualization cap.

## install path

docker grafana, add datasource, import community dashboard, set alert channel.

## commercial use

agpl — grafana labs offers commercial licensing for embedded use cases.`,
  "uptime-kuma": `## verdict

uptime kuma is the pingdom replacement homelabers deploy in one docker container. http(s), tcp, and notification channels with a friendly ui.

## who it's for

anyone running side projects who wants downtime alerts without a saas monitor bill.

## skip if

you need enterprise synthetic monitoring globally distributed — managed status services still win at scale.

## install path

docker run, add monitors for your domains, wire discord or email notifications.

## commercial use

mit — use freely.`,
  infisical: `## verdict

infisical is the open-source secrets manager indie teams use instead of doppler or 1password secrets automation. env sync, rotation hooks, and rbac.

## who it's for

small teams centralizing api keys across github actions, vercel, and local dev without spreadsheet chaos.

## skip if

you are solo with a single \`.env\` file — complexity may not earn its keep yet.

## install path

self-host or cloud, create project, inject secrets into ci and dev machines, rotate one key to prove flow.

## commercial use

mit — enterprise features may be separately licensed.`,
  outline: `## verdict

outline is the notion-shaped team wiki that self-hosts well. real-time docs, permissions, and search for teams who outgrew markdown in a repo.

## who it's for

indie teams needing an internal knowledge base without notion's per-seat pricing or data residency concerns.

## skip if

you are solo and happy with obsidian or repo docs — outline is team infrastructure.

## install path

docker with postgres and redis, configure sso optional, migrate first handbook pages.

## commercial use

apache-2.0 — b2b hosted wiki businesses exist; verify trademark/branding.`,
  "qwen-3": `## verdict

qwen 3 is alibaba's open-weight family with strong multilingual and coding performance — a credible local model line when api costs bite.

## who it's for

builders running open models via ollama or vllm who want apache-licensed weights with active community finetunes.

## skip if

you need the simplest us-hosted api — closed providers still win on friction.

## install path

pull weights for your hardware budget, benchmark on your eval set, route through litellm.

## commercial use

apache-2.0 — verify model card for specific checkpoint terms.`,
  "phi-4": `## verdict

phi-4 is microsoft's small open model line optimized for reasoning-per-dollar on modest hardware. good for edge and laptop inference experiments.

## who it's for

indie devs prototyping agents on consumer gpus who need better quality than tiny legacy models.

## skip if

you need frontier multimodal — larger open models or closed apis are the next step.

## install path

download from official release, serve with ollama or onnx runtime, test coding prompts.

## commercial use

mit — check per-model license files.`,
  "whisper-v3": `## verdict

whisper large v3 is the open speech-to-text baseline — robust enough for transcription pipelines without closed stt apis.

## who it's for

builders adding captions, meeting notes, or voice interfaces who can batch gpu inference.

## skip if

you need real-time phone-call latency on cpu only — hosted stt may be simpler.

## install path

install faster-whisper or official inference, test on representative audio, wire to your pipeline.

## commercial use

mit — use freely.`,
  "nomic-embed-v2": `## verdict

nomic-embed v2 is a strong open embedding model for rag stacks — competitive retrieval quality without closed embedding apis.

## who it's for

teams building local-first search over docs and repos with pgvector or sqlite extensions.

## skip if

you are already standardized on one cloud embedding model with volume discounts.

## install path

pull model via sentence-transformers or ollama embeddings, index a sample corpus, measure recall.

## commercial use

apache-2.0 — verify upstream model card.`,
  "bge-m3": `## verdict

bge-m3 is the multilingual embedding workhorse from the flagembedding ecosystem — dense retrieval across languages without vendor lock-in.

## who it's for

rag pipelines serving international users or mixed-language knowledge bases.

## skip if

english-only tiny corpora may be fine with smaller embed models — benchmark before upsizing.

## install path

load via huggingface stack, chunk documents, store vectors, evaluate mrr on held-out queries.

## commercial use

mit — verify checkpoint-specific terms.`,
  "mcp-playwright": `## verdict

playwright mcp gives agents real browser automation — navigate, click, and extract without hand-rolled puppeteer scripts per workflow.

## who it's for

builders shipping ai QA, scraping, and testing agents who already trust playwright semantics.

## skip if

you only need static http fetches — simpler tools suffice.

## install path

add microsoft/playwright-mcp to mcp config, scope allowed origins, test on a staging url.

## commercial use

apache-2.0 — follow playwright licensing for bundled browsers.`,
  "mcp-postgres": `## verdict

postgres mcp exposes read-only sql to agents with explicit connection strings — safer than handing bash plus psql to a model.

## who it's for

internal tools where agents query analytics replicas or staging databases with guardrails.

## skip if

production write access should never touch an agent — keep humans in the loop for mutations.

## install path

configure read-only db user, add server from modelcontextprotocol/servers, test simple selects.

## commercial use

mit — database credentials remain your responsibility.`,
  "flux-1": `## verdict

flux.1 dev is the open image generation checkpoint indie builders experiment with before paying midjourney rent. strong aesthetics when you have gpu time.

## who it's for

creators prototyping marketing assets and ui mock imagery on self-hosted inference.

## skip if

you need commercial-safe generated faces at scale without legal review — stock assets may be safer.

## install path

comfyui or diffusers pipeline, download dev weights, generate test prompts, establish content policy.

## commercial use

apache-2.0 weights — read black forest labs license for production redistribution.`,
};

function projectMdx(project) {
  const rich = richProfiles[project.slug];
  const body = rich ?? `## verdict

${project.name} is on the launch 100 catalog. editorial deep-dive coming soon — metadata verified against github.

## who it's for

builders evaluating ${project.replaces !== "—" ? `alternatives to ${project.replaces}` : `oss options in ${project.category}`}.

## skip if

maintenance, license, or setup complexity doesn't match your timeline — check github activity before committing.

## install path

see the official readme on github. difficulty ${project.difficulty}/5 for a solo dev.

## commercial use

<span class="preserve-case">${project.license}</span> — verify current license in repo before production use.`;

  return `---
slug: ${project.slug}
name: ${project.name}
category: ${project.category}
tier: ${project.tier}
license: ${project.license}
github: ${project.github}
${project.website ? `website: ${project.website}\n` : ""}replaces: ${project.replaces}
difficulty: ${project.difficulty}
tags: [${project.tags.map((t) => `"${t}"`).join(", ")}]
lastVerified: 2026-06-14
---

${body}
`;
}

for (const project of catalog.projects) {
  const file = path.join(root, "content/projects", `${project.slug}.mdx`);
  fs.writeFileSync(file, projectMdx(project));
}

for (const comparison of catalog.comparisons) {
  const file = path.join(root, "content/comparisons", `${comparison.slug}.mdx`);
  const list = comparison.projects.map((s) => `- [${s}](/${catalog.projects.find((p) => p.slug === s)?.category ?? "tools"}/${s})`).join("\n");
  fs.writeFileSync(
    file,
    `---
slug: ${comparison.slug}
title: ${comparison.title}
projects: [${comparison.projects.map((p) => `"${p}"`).join(", ")}]
---

# ${comparison.title}

hand-written comparison — launch edition.

## projects in this comparison

${list}

## summary

editorial verdict copy expands in phase 1.1 — structure and cross-links ship now.
`
  );
}

for (const collection of catalog.collections) {
  const file = path.join(root, "content/collections", `${collection.slug}.mdx`);
  const list = collection.projects
    .map((s) => {
      const p = catalog.projects.find((x) => x.slug === s);
      return p ? `- [${p.name}](/${p.category}/${p.slug})` : `- ${s}`;
    })
    .join("\n");
  fs.writeFileSync(
    file,
    `---
slug: ${collection.slug}
title: ${collection.title}
projects: [${collection.projects.map((p) => `"${p}"`).join(", ")}]
---

# ${collection.title}

${list}
`
  );
}

console.log(`generated ${catalog.projects.length} profiles, ${catalog.comparisons.length} comparisons, ${catalog.collections.length} collections`);