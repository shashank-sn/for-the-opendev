# repository & sponsorship setup

**product:** for the open dev  
**version:** 1.1  
**last updated:** june 2026  

---

## 1. overview

for the open dev is **open source**. the website, content pipeline, and platform code live in a public github repository. sponsorship happens on **github sponsors** — three fixed tiers plus custom amounts for companies.

**sponsors profile (live):** https://github.com/sponsors/shashank-sn

---

## 2. github accounts

| item | value | status |
|------|-------|--------|
| sponsors profile | https://github.com/sponsors/shashank-sn | ✓ approved & public |
| github user | `shashank-sn` | owner |
| org (target) | `fortheopendev` | create when ready |
| primary repo | https://github.com/shashank-sn/for-the-opendev | ✓ live |
| license | MIT | required at launch |
| default branch | `main` | |
| website | https://fortheopen.dev | |
| docs in repo | `/docs` | |
| content in repo | `/content` (mdx profiles) | |

### org vs personal (decision)

| approach | when | notes |
|----------|------|-------|
| **personal repo + personal sponsors** (current) | ✓ active | repo: `shashank-sn/for-the-opendev`. sponsors: `shashank-sn`. |
| **org repo + org sponsors** | later | transfer repo to `fortheopendev` org when ready. update FUNDING.yml. |

repo is live at https://github.com/shashank-sn/for-the-opendev

### readme sponsor block (top of README.md)

```markdown
# for the open dev

discover open source worth your time.

→ [fortheopen.dev](https://fortheopen.dev)

## sponsor

core discovery is free forever. support the mission:

| tier | price | link |
|------|-------|------|
| open supporter | $1/mo | [sponsor](https://github.com/sponsors/shashank-sn/sponsorships?sponsor=open-supporter) |
| builder backer | $5/mo | [sponsor](https://github.com/sponsors/shashank-sn/sponsorships?sponsor=builder-backer) |
| open source sustainer | $100/mo | [sponsor](https://github.com/sponsors/shashank-sn/sponsorships?sponsor=sustainer) |
| custom amount | you choose | [sponsor](https://github.com/sponsors/shashank-sn) |

companies: use **custom amount** or email hello@fortheopen.dev for invoicing.
```

---

## 3. github sponsors — three tiers + custom

### tier definitions

| tier id | display name | price | audience |
|---------|--------------|-------|----------|
| `open-supporter` | open supporter | **$1/month** | anyone who wants to chip in |
| `builder-backer` | builder backer | **$5/month** | regular users who rely on the platform |
| `sustainer` | open source sustainer | **$100/month** | companies and power supporters |
| `custom` | custom sponsor | **any amount** | enterprises, foundations, large teams |

all names lowercase in ui.

### perks (no paywalled discovery — ever)

| perk | $1 | $5 | $100 | custom |
|------|----|----|------|--------|
| profile badge on fortheopen.dev | ✓ | ✓ | ✓ | ✓ |
| name on /supporters wall | ✓ | ✓ | ✓ | ✓ |
| founding supporter badge (first 100) | ✓ | ✓ | ✓ | ✓ |
| name in github readme sponsors | — | ✓ | ✓ | ✓ |
| logo on /supporters enterprise section | — | — | ✓ | ✓ (if ≥ $100) |
| thank-you in monthly newsletter | — | — | ✓ | ✓ |
| dedicated line on enterprise page | — | — | — | ✓ (negotiated) |

**no tier gets:** weighted votes, paywalled profiles, priority review, badge tier influence, or paid rankings.

### github sponsors dashboard checklist

completed (from sponsors overview):

- [x] apply for github sponsors — profile approved
- [x] profile is public at https://github.com/sponsors/shashank-sn
- [x] fill out profile details
- [x] confirm identity
- [x] enable github two-factor authentication

still to do in github sponsors dashboard:

- [ ] create three sponsor tiers (Sponsor tiers → add):
  - `open-supporter` — $1.00 USD / month — "keeps discovery free"
  - `builder-backer` — $5.00 USD / month — "listed in repo readme"
  - `sustainer` — $100.00 USD / month — "enterprise recognition on site"
- [ ] enable **custom amount** (one-time + monthly) for enterprise sponsors
- [ ] write sponsor profile bio (lowercase, mission-aligned)
- [ ] set sponsorship goals (optional — github dashboard → your goals)
- [ ] configure payouts (Payouts → connect bank/paypal)
- [ ] set up **webhooks** (Webhooks → sponsor events for site sync)
- [ ] preview sponsor button appearance (Overview → Preview)

---

## 3b. go-live gate — repo must ship with this

**do not make the repo public until these files exist.** the sponsor button only appears on repos when `FUNDING.yml` is on the default branch.

### required files at repo root

```
fortheopendev/
├── LICENSE                          # MIT — required
├── README.md                        # includes sponsor table + link
├── .github/
│   ├── FUNDING.yml                  # enables sponsor button on repo ★
│   ├── workflows/deploy.yml         # ci/cd
│   ├── dependabot.yml               # oss dependency updates
│   └── ISSUE_TEMPLATE/
│       ├── bug_report.yml
│       └── profile_submission.yml
├── SECURITY.md
├── CODE_OF_CONDUCT.md
├── CONTRIBUTING.md
└── ...
```

### `.github/FUNDING.yml` (copy exactly)

this is what github's dashboard prompts you to create. it enables the **sponsor** button on the repo page and all packages.

```yaml
# https://github.com/sponsors/shashank-sn
github: shashank-sn
custom:
  - https://fortheopen.dev/supporters
```

when `fortheopendev` org gets its own sponsors profile later, update to:

```yaml
github: [shashank-sn, fortheopendev]
custom:
  - https://fortheopen.dev/supporters
```

### readme badges (oss — shields.io)

add below the title in `README.md`:

```markdown
[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![sponsor](https://img.shields.io/badge/sponsor-$1%2Fmo-ea4aaa?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/shashank-sn)
[![website](https://img.shields.io/badge/website-fortheopen.dev-indigo)](https://fortheopen.dev)
```

### sponsor button verification (before announcing launch)

1. push `FUNDING.yml` to `main`
2. open the repo on github — confirm purple **sponsor** button appears top-right
3. click sponsor → confirm three tiers + custom amount show
4. open https://github.com/shashank-sn — confirm sponsor button on profile
5. test from fortheopen.dev `/supporters` — all links resolve to live tiers

### website integration at go-live

| page / component | what to wire |
|------------------|--------------|
| `/supporters` | four cards linking to github sponsors tiers |
| home page cta | "sponsor the repo →" → `https://github.com/sponsors/shashank-sn` |
| footer | sponsor link |
| nav (optional) | subtle heart icon → `/supporters` |
| about page | "we are open source" + link to repo + sponsor |
| login modal footer | "support us" link (non-intrusive) |

### `/supporters` tier links (for site)

```
open supporter:     https://github.com/sponsors/shashank-sn/sponsorships?sponsor=open-supporter
builder backer:     https://github.com/sponsors/shashank-sn/sponsorships?sponsor=builder-backer
open source sustainer: https://github.com/sponsors/shashank-sn/sponsorships?sponsor=sustainer
custom / enterprise:   https://github.com/sponsors/shashank-sn
```

> note: tier slug urls (`?sponsor=open-supporter`) only work after tiers are created in the github sponsors dashboard with matching slugs. create tiers first, then verify urls.

---

## 3c. github sponsors webhooks (site sync)

set up in github sponsors dashboard → **webhooks** (or repo webhooks for `sponsorship` events).

### events to subscribe

| event | action |
|-------|--------|
| `sponsorship.created` | set `users.is_supporter = true`, assign tier |
| `sponsorship.tier_changed` | update `users.supporter_tier` |
| `sponsorship.cancelled` | set `is_supporter = false`, keep founding badge if applicable |

### webhook endpoint

```
POST https://fortheopen.dev/api/webhooks/github-sponsors
```

verify signature with `GITHUB_SPONSORS_WEBHOOK_SECRET`.

### matching sponsors to users

1. sponsor completes checkout on github (may not be logged in on site)
2. if they later log in via **better-auth github oauth**, match `github_login` → sponsor record
3. apply tier badge to profile
4. add to `/supporters` wall (cron refresh every 15 min as fallback)

### manual fallback (pre-webhook)

until webhook ships, weekly cron:

```
GET GitHub API: list sponsors for shashank-sn
  → sync to supporters table
  → refresh /supporters page
```

---

## 3d. go-live checklist (complete before public launch)

> **tracked in [BUILD-TODOS.md](./BUILD-TODOS.md) §1** — check items off there when building.

### github sponsors (dashboard)

- [x] profile approved and public
- [x] identity confirmed
- [x] 2fa enabled
- [ ] three tiers created ($1, $5, $100)
- [ ] custom amount enabled
- [ ] payouts configured
- [ ] profile bio written
- [ ] webhooks configured (or cron fallback documented)

### repository (code)

- [ ] repo is **public**
- [ ] `LICENSE` (MIT) committed
- [ ] `.github/FUNDING.yml` on default branch
- [ ] sponsor button visible on repo page (verify manually)
- [ ] `README.md` sponsor table + badges
- [ ] `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`
- [ ] ci/cd deploys to fortheopen.dev on push to main
- [ ] dependabot enabled

### website

- [ ] `/supporters` page live with four tier cards
- [ ] all sponsor links tested (tier slugs match dashboard)
- [ ] github oauth via better-auth works
- [ ] sponsor sync (webhook or cron) tested with a test sponsorship
- [ ] founding supporter logic ready (first 100)

### announce (after all above pass)

- [ ] share sponsors profile (github dashboard → share)
- [ ] embed sponsor button on fortheopen.dev (github dashboard → embed it)
- [ ] post launch thread with repo link + sponsor link
- [ ] add repo link to fortheopen.dev footer and about page

---

### syncing sponsor status

```
github sponsors webhook (or weekly cron via github api)
  → user linked github account
  → match sponsor login
  → set supporter_tier: open-supporter | builder-backer | sustainer | custom
  → set is_supporter: true
  → refresh /supporters page
```

better-auth github oauth makes matching straightforward.

---

## 4. enterprise / custom sponsorship

for companies that cannot use github sponsors:

1. **custom amount on github** — preferred, any amount, public or private visibility
2. **email** hello@fortheopen.dev — invoice, wire, or open collective (future)
3. **open collective** (phase 2) — oss-friendly fiscal host if needed

enterprise page copy:

> building with open source at scale? sponsor fortheopen.dev at any amount via github sponsors. we label enterprise sponsors on /supporters — we never sell reviews, rankings, or badges.

---

## 5. open source license (our repo)

**recommended: MIT**

```
Copyright (c) 2026 for the open dev contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction...
```

why mit:
- matches better-auth, next.js, drizzle ecosystem
- companies comfortable sponsoring mit projects
- content (mdx profiles) can be CC-BY-4.0 in `/content/LICENSE` if desired

### content license

editorial profiles in `/content`: **CC-BY-4.0** (attribution, remixable, commercial ok with attribution). code: MIT.

---

## 6. contribution model

| area | how to contribute |
|------|-------------------|
| code | prs welcome — auth, ui, api, search |
| profiles | submission flow on site, or pr to `/content` |
| comparisons | issues proposing comparison pages |
| docs | prs to `/docs` |
| sponsors | github sponsors — no pr needed |

### good first issues (seed at repo creation)

- add pagefind to search
- better-auth login modal styling
- dark mode toggle
- first 10 mdx profile templates
- github sponsors webhook handler

---

## 7. ci/cd (github actions → cloudflare)

```yaml
# .github/workflows/deploy.yml (outline)
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: pnpm/action-setup@v4
      - run: pnpm install && pnpm build
      - uses: cloudflare/pages-action@v1
```

all ci tools: github actions (free tier), oss actions only.

---

## 8. security

- `SECURITY.md` in repo root
- security reports: security@fortheopen.dev
- dependency scanning: github dependabot (enabled)
- no secrets in client bundle
- better-auth session cookies: httpOnly, secure, sameSite

---

*see OPEN-SOURCE-STACK.md for dependency policy. see MONETIZATION.md for revenue ethics.*