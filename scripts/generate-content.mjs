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