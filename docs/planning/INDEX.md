# for the open dev — documentation index

> a trusted layer for discovering and building with open source.

this folder contains the full product specification for **for the open dev** (`fortheopen.dev`). read in this order:

| # | document | what it covers |
|---|----------|----------------|
| 1 | [PRD.md](./PRD.md) | product vision, goals, features, requirements, success metrics |
| 2 | [BRAND.md](./BRAND.md) | naming, logo concepts, voice, badge system, embed specs |
| 3 | [DESIGN-SYSTEM.md](./DESIGN-SYSTEM.md) | colors, typography, components, light/dark mode, lowercase rules |
| 4 | [INFORMATION-ARCHITECTURE.md](./INFORMATION-ARCHITECTURE.md) | categories, urls, navigation, data model, search |
| 5 | [LAUNCH-CATALOG.md](./LAUNCH-CATALOG.md) | deep research: launch 100 + phase 2 (120) + watchlist (80+) |
| 6 | [USER-FLOWS.md](./USER-FLOWS.md) | signup, lists, submissions, reviews, launches, badges |
| 7 | [MONETIZATION.md](./MONETIZATION.md) | open supporter tier, sponsorships, ethics policy |
| 8 | [ROADMAP.md](./ROADMAP.md) | phased build plan for solo founder |
| 9 | [OPEN-SOURCE-STACK.md](./OPEN-SOURCE-STACK.md) | oss-only dependency policy + better-auth |
| 10 | [REPOSITORY.md](./REPOSITORY.md) | public git repo + github sponsors setup |
| 11 | [BUILD-TODOS.md](./BUILD-TODOS.md) | **execution checklist — do when building** |

---

## locked decisions (summary)

| decision | choice |
|----------|--------|
| name | for the open dev |
| domain | fortheopen.dev |
| casing | **everything lowercase** across the entire product |
| audience | solo developers & indie builders |
| core promise | answer practical adoption questions, not list repos |
| categories | 7 — tools, frameworks, models, resources, clis, datasets, mcps |
| launch catalog | 100 curated profiles + 120 phase 2 + 80+ watchlist (300+ researched) |
| profile depth | full builder profile on every launch project |
| submissions | github repo only, verified license, editorial review |
| comparisons | hand-written editorial pages (not auto-generated) |
| launch platform | hybrid — community votes + staff pick |
| badges | tiered: listed → verified → featured → staff pick (+ earned criteria) |
| auth | better-auth — email + google + github |
| repo | public MIT — https://github.com/shashank-sn/for-the-opendev |
| oss policy | all product dependencies open source only |
| monetization | github sponsors: $1 · $5 · $100/mo + custom · never paid reviews |
| visual | dev-tool aesthetic — linear/vercel polish, dark-first, light/dark toggle |
| tech | html/css foundation → next.js where needed → git + cloudflare |
| language | english launch, i18n-ready architecture |
| builder | solo founder, no fixed launch date |

---

## github sponsors (three tiers + custom)

| tier | price |
|------|-------|
| open supporter | $1/mo |
| builder backer | $5/mo |
| open source sustainer | $100/mo |
| custom sponsor | any amount (enterprise) |

all via github sponsors: https://github.com/sponsors/shashank-sn (profile live). no paywalled discovery. see REPOSITORY.md §3d for go-live checklist.

---

## how to use these docs

- **reviewing the vision?** start with PRD.md sections 1–3.
- **designing screens?** read DESIGN-SYSTEM.md + INFORMATION-ARCHITECTURE.md together.
- **writing launch content?** use LAUNCH-CATALOG.md as the content backlog.
- **ready to build?** start with [BUILD-TODOS.md](./BUILD-TODOS.md) — check items off as you ship.
- **building features?** USER-FLOWS.md + ROADMAP.md define what ships in each phase.
- **making money decisions?** MONETIZATION.md has the ethics guardrails.

all documents are living specs. update version headers when making changes.

---

*last updated: june 2026*