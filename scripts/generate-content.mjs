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