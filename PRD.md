# product requirements document

**product:** for the open dev  
**domain:** fortheopen.dev  
**version:** 1.2  
**status:** draft for review (oss repo + better-auth + github sponsors)
**author:** solo founder  

---

## 1. executive summary

for the open dev is a discovery and adoption platform for open source software. it helps solo developers and indie builders answer practical questions — what does this replace, who is it for, how hard is setup, can i self-host it, can i use it commercially, what are the alternatives, is it worth my time — in one trusted place.

the product is **not** a directory. it is a **decision layer** with curated builder profiles, hand-written comparisons, structured community reviews, user lists, a hybrid launch platform, and embeddable trust badges.

**core principle:** everything on the website is lowercase — ui copy, headings, buttons, urls, badges, emails. no exceptions except proper nouns inside project names where unavoidable (e.g. `PostgreSQL` on a project page) and license identifiers (e.g. `MIT`, `Apache-2.0`).

---

## 2. problem statement

### 2.1 the pain

developers discovering open source today jump between:

- github trending & search
- twitter/x threads
- reddit (r/selfhosted, r/opensource, r/programming)
- youtube reviews & tutorials
- blog posts & newsletters
- awesome lists (scattered, uneven quality)
- random directories (stale, uncurated, seo spam)

this creates three failures:

1. **time waste** — hours researching what should take minutes
2. **distraction** — rabbit holes instead of building
3. **bad bets** — choosing unmaintained, poorly licensed, or misrepresented projects

### 2.2 the gap

existing sites answer "what exists?" not "should i use this?"

| competitor type | what they do | what they miss |
|-----------------|--------------|----------------|
| awesome lists | link collections | no evaluation framework, uneven updates |
| github | code hosting + stars | stars ≠ adoptability |
| stackshare | tech stacks | enterprise skew, not oss-first |
| alternativeto | commercial alternatives | shallow oss depth |
| product hunt | launches | not oss-specific, no builder profiles |
| libraries.io / deps.dev | dependency metadata | not human adoption guidance |

### 2.3 our wedge

every project gets the same **builder profile** schema answering adoption questions in a consistent format. editorial quality at launch, community signal over time, badges that projects proudly embed.

---

## 3. goals & non-goals

### 3.1 goals

| # | goal | metric |
|---|------|--------|
| g1 | reduce time-to-decision for oss adoption | avg. < 5 min on a project page to reach a verdict |
| g2 | become a trusted evaluation layer | 50+ projects display our badge within 6 months of launch |
| g3 | seed 100 high-quality launch profiles | 100 full builder profiles live at public launch |
| g4 | enable community growth without quality collapse | submission review SLA < 7 days; < 10% rejection appeals |
| g5 | build a sustainable mission-aligned business | core discovery free forever; supporter revenue covers hosting |

### 3.2 non-goals (v1)

- becoming a package registry or dependency tracker
- hosting code, issues, or ci/cd
- paid reviews, paid rankings, or pay-to-feature without clear "sponsored" labeling
- multi-language content at launch (architecture ready, content english-only)
- mobile native apps
- ai-generated project profiles without human editorial review

---

## 4. target users

### 4.1 primary persona: the indie builder

**name:** alex  
**role:** solo developer building a saas side project  
**behavior:** evaluates 2–3 tools per week, self-hosts when possible, cares about license clarity  
**needs:** fast answers, honest verdicts, alternatives comparison, setup difficulty honesty  
**frustrations:** readme marketing speak, stale awesome lists, not knowing if a project is maintained  

### 4.2 secondary personas (served, not optimized for at launch)

| persona | need |
|---------|------|
| oss maintainer | visibility, badge, launch platform, fair evaluation |
| technical writer / creator | reference profiles, embed badges, share lists |
| homelab enthusiast | self-host filter, replacement guides |

---

## 5. product pillars

### 5.1 builder profiles

the atomic unit of the platform. every listed project has a standardized profile.

**required fields:**

| field | type | description |
|-------|------|-------------|
| `name` | string | project display name |
| `slug` | string | url-safe identifier (lowercase) |
| `tagline` | string | one line, max 120 chars |
| `category` | enum | tool · framework · model · resource · cli · dataset · mcp |
| `subcategory` | string[] | e.g. analytics, auth, llm, icons, fuzzy-finder |
| `tags` | string[] | indie-oss · creator-tools · ai-native · replaces-saas · self-host |
| `github_url` | url | required — sole submission source |
| `license` | enum | verified oss license |
| `replaces` | string[] | what commercial or oss tools it replaces |
| `audience` | enum[] | solo dev · small team · enterprise · hobbyist |
| `setup_difficulty` | 1–5 | 1 = npm install, 5 = k8s cluster |
| `self_hostable` | enum | yes · partial · no |
| `commercial_use` | enum | yes · with-conditions · no |
| `commercial_notes` | string | e.g. "sspl requires commercial license for saas" |
| `alternatives` | ref[] | links to other profiles with one-line tradeoff |
| `verdict` | rich text | editorial "worth your time?" summary |
| `verdict_skip_if` | string | who should skip this |
| `maintenance_status` | enum | active · slow · stale · archived |
| `last_commit` | date | pulled from github api |
| `stars` | number | github stars (displayed, not ranked by) |
| `badge_tier` | enum | listed · verified · featured · staff_pick |
| `staff_pick` | boolean | editorial highlight |
| `sponsored` | boolean | clearly labeled if true |

**optional fields:**

- docker support (yes/no)
- docker one-liner
- install time estimate
- tutorial links (curated external)
- maintainer responsiveness rating
- languages (from github)
- funding model (sponsored, open collective, commercial oss, grant)
- screenshots / demo gif

### 5.2 comparisons

hand-written editorial comparison pages. not auto-generated from tags.

**format:**

- 2–4 projects compared on the same builder profile axes
- neutral tone, explicit tradeoffs
- "choose X if…" / "choose Y if…" decision blocks
- last reviewed date
- author attribution (editorial)

**launch target:** 20 comparison pages covering high-intent search queries (includes cap/loom, bruno/postman, mcp starter pack).

### 5.3 collections & guides

curated editorial collections:

- "replace notion with open source"
- "indie saas infrastructure stack"
- "self-hosted analytics compared"
- "best open llms for local inference"

distinct from user lists (section 5.5).

### 5.4 launch platform

hybrid launch system:

1. **community votes** — logged-in users upvote launches during a 7-day window
2. **staff pick** — editorial selection highlighted on launch day
3. **launch page** — `/launches` shows current and past launches
4. **project launch submission** — maintainers request a launch slot after profile approval

**launch rules:**

- project must be `verified` tier minimum
- one launch per project per 6 months
- launches scheduled on tuesdays & thursdays (2 slots/day initially)
- sponsored launches clearly labeled, never mixed with staff pick

### 5.5 user accounts & lists

**auth providers:** email (magic link), google, github

**list types (phased):**

| phase | feature |
|-------|---------|
| v1 | personal bookmark lists (private by default) |
| v1.1 | public shareable lists with slug |
| v1.2 | collaborative lists (invite by email) |
| v1.3 | starter templates ("my homelab stack", "indie saas infra") |

**list item:** reference to a project profile + optional user note.

### 5.6 project submissions

any logged-in user can submit a project. requirements:

1. **github repo url** — required, no exceptions
2. **valid oss license** — detected via github api + license file verification
3. **license allowlist** — must match approved oss licenses (see §7.3)
4. **minimum viability** — repo has readme, > 30 stars OR > 3 months of commits, not a fork spam
5. **editorial review** — human review before publish
6. **submitter attestation** — checkbox: "i am the maintainer or a significant contributor" (honor system + github check)

**submission states:**

```
draft → submitted → in_review → approved → published
                  ↘ needs_changes ↗
                  ↘ rejected (with reason)
```

### 5.7 community reviews

structured reviews from logged-in users:

| dimension | scale |
|-----------|-------|
| setup ease | 1–5 |
| documentation quality | 1–5 |
| maintenance confidence | 1–5 |
| would recommend | yes · maybe · no |

plus optional written review (min 50 chars, max 2000).

**rules:**

- one review per user per project (editable)
- reviews require account age > 24 hours
- flagged reviews go to moderation queue
- aggregate scores displayed on profile
- no paid or incentivized reviews

### 5.8 badges

four interconnected badge systems:

1. **tiered status** — listed → verified → featured → staff pick
2. **earned criteria** — maintained (90-day commits), documented (setup guide exists), builder-friendly (docker + clear license)
3. **editorial award** — team grants after review
4. **community signal** — high structured review scores trigger editorial review for tier upgrade

**embeddable badge:** svg + markdown snippet projects copy into their readme.

### 5.9 search & discovery

- full-text search across profiles, comparisons, collections
- filter by: category, subcategory, self-hostable, license, setup difficulty, badge tier, maintenance status
- sort by: relevance, recently added, recently updated, community score
- browse by use case: "i want to replace X"

---

## 6. lowercase rule (global)

this is a hard product requirement, not a style preference.

### 6.1 applies to

- all ui text (headings, labels, buttons, nav, toasts, errors)
- marketing copy on landing pages
- url paths (`/tools/posthog`, not `/Tools/PostHog`)
- email templates (subject lines lowercase)
- badge text
- meta titles (with exception: proper project names inside descriptions)
- supporter tier name display: "open supporter"

### 6.2 exceptions

| case | example | reason |
|------|---------|--------|
| oss license identifiers | MIT, Apache-2.0, GPL-3.0 | legal standard |
| project names as proper nouns | PostHog, Grafana | external brand names on their profile |
| github urls | github.com/... | external |
| user-generated review text | freeform | user voice preserved |
| code blocks | `npm install` | technical accuracy |

### 6.3 implementation

- css: `text-transform: lowercase` on body with targeted overrides for exceptions
- cms / admin: enforce lowercase on slug generation
- lint rule in content pipeline: flag uppercase in editorial content

---

## 7. content & editorial policy

### 7.1 editorial voice

- direct, honest, builder-to-builder
- say when something is overhyped
- say who should skip a tool
- no vendor speak, no "revolutionary" / "game-changing"
- lowercase, always

### 7.2 profile creation (launch 100)

- all 100 launch profiles are hand-written to full schema
- github api used for metadata (stars, last commit, license, languages)
- verdict and alternatives are editorial opinion, clearly attributed
- maintenance status checked manually for launch catalog

### 7.3 license verification

**approved licenses for listing:**

| license | commercial use default |
|---------|----------------------|
| MIT | yes |
| Apache-2.0 | yes |
| BSD-2-Clause | yes |
| BSD-3-Clause | yes |
| ISC | yes |
| PostgreSQL License | yes |
| LGPL-2.1 | yes (with conditions) |
| LGPL-3.0 | yes (with conditions) |
| MPL-2.0 | yes (with conditions) |
| GPL-2.0 | yes (with conditions — copyleft) |
| GPL-3.0 | yes (with conditions — copyleft) |
| AGPL-3.0 | yes (with conditions — network copyleft) |
| BSL 1.1 | case-by-case (note conversion date) |
| SSPL-1.0 | flagged — commercial restrictions noted prominently |
| Elastic License 2.0 | flagged — commercial restrictions noted |

**rejected:**

- no license file
- proprietary / custom licenses without oss approval
- repos that are clearly not software (awesome-list-only repos submitted as "tools")
- license-incompatible forks

**verification flow:**

1. github api returns `license.spdx_id`
2. fallback: parse `LICENSE` file in repo root
3. human reviewer confirms during editorial review
4. re-checked quarterly via automated job

### 7.4 comparison authorship

- all comparisons written by editorial (founder initially)
- reviewed quarterly for accuracy
- "last reviewed" date displayed prominently
- community can suggest corrections via feedback form

---

## 8. functional requirements

### 8.1 public (unauthenticated)

| id | requirement | priority |
|----|-------------|----------|
| fr-01 | browse projects by category | p0 |
| fr-02 | search projects, comparisons, collections | p0 |
| fr-03 | view full builder profile | p0 |
| fr-04 | view comparison pages | p0 |
| fr-05 | view launch page (current + archive) | p0 |
| fr-06 | toggle light / dark mode (persisted) | p0 |
| fr-07 | view public user lists (when published) | p1 |
| fr-08 | view supporters page | p1 |
| fr-09 | copy embeddable badge snippet | p0 |
| fr-10 | view editorial collections / guides | p0 |

### 8.2 authenticated users

| id | requirement | priority |
|----|-------------|----------|
| fr-20 | sign up / log in (email, google, github) | p0 |
| fr-21 | create / edit / delete personal lists | p0 |
| fr-22 | add / remove projects from lists | p0 |
| fr-23 | submit structured review on a project | p0 |
| fr-24 | upvote launch candidates | p0 |
| fr-25 | submit a project for review | p0 |
| fr-26 | track submission status | p0 |
| fr-27 | edit own reviews | p0 |
| fr-28 | become open supporter ($1/mo) | p1 |
| fr-29 | public profile with optional bio + lists | p1 |
| fr-30 | request launch for approved project | p1 |

### 8.3 admin / editorial

| id | requirement | priority |
|----|-------------|----------|
| fr-40 | review submission queue | p0 |
| fr-41 | create / edit builder profiles | p0 |
| fr-42 | create / edit comparisons | p0 |
| fr-43 | assign badge tiers | p0 |
| fr-44 | select staff picks for launch day | p0 |
| fr-45 | moderate flagged reviews | p0 |
| fr-46 | mark sponsored content | p1 |
| fr-47 | manage launch schedule | p0 |
| fr-48 | bulk github metadata refresh | p1 |

---

## 9. non-functional requirements

| id | requirement | target |
|----|-------------|--------|
| nfr-01 | lighthouse performance score | > 90 |
| nfr-02 | lighthouse accessibility score | > 95 |
| nfr-03 | time to first byte (cloudflare) | < 200ms |
| nfr-04 | uptime | 99.9% |
| nfr-05 | mobile responsive | all breakpoints |
| nfr-06 | seo | structured data on profiles, comparisons |
| nfr-07 | i18n architecture | string extraction ready, english only v1 |
| nfr-08 | gdpr | data export + deletion for user accounts |
| nfr-09 | rate limiting | on submissions, reviews, votes |
| nfr-10 | security | owasp top 10, no secrets in client |

---

## 10. technical architecture (recommended)

### 10.1 stack

| layer | choice | rationale |
|-------|--------|-----------|
| static shell | html + css | fast, simple landing + marketing |
| app | next.js (app router) | profiles, auth, dynamic routes, api routes |
| hosting | cloudflare pages + workers | edge, fast, affordable |
| database | cloudflare d1 (sqlite) or turso | edge sqlite, simple for solo founder |
| auth | **better-auth** (MIT) | email + magic link + google + github — we dogfood this |
| search | pagefind (static) → typesense (later) | start simple, scale when needed |
| payments | **github sponsors** | $1 · $5 · $100/mo + custom amount |
| repo | public mit monorepo | https://github.com/shashank-sn/for-the-opendev |
| sponsors | github sponsors (live) | https://github.com/sponsors/shashank-sn |
| go-live gate | FUNDING.yml + tiers + /supporters | see REPOSITORY.md §3d |
| github integration | github rest api | metadata, license, stars, commits |
| cms (editorial) | markdown files in git → mdx | version-controlled content |
| analytics | umami or plausible (self-hosted only) | oss-only policy — see OPEN-SOURCE-STACK.md |

### 10.2 content pipeline

```
markdown/mdx files (git)
    ↓ build step
static pages (profiles, comparisons, collections)
    ↓
cloudflare pages deploy
    +
dynamic routes (auth, lists, submissions, reviews)
    ↓
d1 database (users, lists, reviews, votes, submissions)
```

### 10.3 github verification service

worker cron job (daily):

- refresh stars, last commit, license for all published projects
- flag maintenance status changes (no commits in 180 days → review queue)
- alert editorial on license changes

---

## 11. page inventory

### 11.1 marketing

| page | path | purpose |
|------|------|---------|
| home | `/` | value prop, featured projects, latest launches |
| about | `/about` | mission, editorial policy, lowercase philosophy |
| supporters | `/supporters` | open supporter wall |
| submit | `/submit` | submission guidelines + cta |

### 11.2 discovery

| page | path | purpose |
|------|------|---------|
| browse tools | `/tools` | filtered project grid |
| browse frameworks | `/frameworks` | filtered project grid |
| browse models | `/models` | filtered project grid |
| browse resources | `/resources` | filtered project grid |
| browse clis | `/clis` | filtered project grid |
| browse datasets | `/datasets` | filtered project grid |
| browse mcps | `/mcps` | filtered project grid |
| indie oss browse | `/tags/indie-oss` | creator/indie products (cap, plane, bruno…) |
| replace saas | `/replace/{saas}` | e.g. `/replace/loom` → cap |
| project profile | `/{category}/{slug}` | full builder profile |
| comparison | `/compare/{slug}` | editorial comparison |
| collection | `/collections/{slug}` | curated guide |
| search | `/search` | full-text search results |
| launches | `/launches` | launch platform |

### 11.3 user

| page | path | purpose |
|------|------|---------|
| login | `/login` | auth |
| dashboard | `/dashboard` | lists, submissions, reviews |
| public profile | `/u/{username}` | public lists + bio |
| list detail | `/u/{username}/{list-slug}` | shareable list |

### 11.4 admin

| page | path | purpose |
|------|------|---------|
| admin queue | `/admin/submissions` | review submissions |
| admin editorial | `/admin/editorial` | profiles, comparisons, badges |
| admin launches | `/admin/launches` | schedule, staff picks |
| admin moderation | `/admin/moderation` | flagged reviews |

---

## 12. seo strategy

### 12.1 target queries

- "open source alternative to {commercial tool}"
- "self-hosted {category}"
- "{tool a} vs {tool b} open source"
- "best open source {category} 2026"
- "is {project} worth using"
- "{project} commercial license"

### 12.2 structured data

- `SoftwareApplication` schema on profiles
- `Review` aggregate on profiles with community scores
- `FAQPage` on comparison pages
- `BreadcrumbList` on all pages

---

## 13. success metrics

### 13.1 launch (first 30 days)

| metric | target |
|--------|--------|
| published profiles | 100 |
| comparison pages | 20 |
| registered users | 500 |
| project submissions | 50 |
| open supporters | 100 ($100/mo) |
| badge embeds detected | 20 |

### 13.2 growth (6 months)

| metric | target |
|--------|--------|
| published profiles | 300 |
| monthly active users | 10,000 |
| open supporters | 500 |
| badge embeds | 100 |
| organic search traffic | 50% of visits |

---

## 14. risks & mitigations

| risk | impact | mitigation |
|------|--------|------------|
| solo founder bottleneck | slow content + reviews | phase features; batch editorial; community reviews reduce load |
| quality dilution from submissions | trust erosion | strict license verification; editorial gate; tiered badges |
| maintainer backlash on negative verdicts | reputation | fair criteria published; invite maintainer response; focus on "who should skip" not "this is bad" |
| github api rate limits | stale metadata | cache aggressively; authenticated api token; batch cron |
| sponsored content trust erosion | user churn | never mix sponsored with editorial; clear labeling; never paid reviews |
| lowercase perceived as unprofessional | brand risk | consistent execution; premium design compensates; dev audience appreciates it |

---

## 15. open questions for founder review

1. confirm github sponsors tiers: **open supporter** ($1) · **builder backer** ($5) · **open source sustainer** ($100) · custom
2. confirm tuesday/thursday launch schedule or prefer daily?
3. minimum github stars for submission: 30 proposed — too high/low?
4. approve the 100-project launch catalog in LAUNCH-CATALOG.md
5. approve logo concepts in BRAND.md

---

*end of prd — see companion docs for design, brand, catalog, flows, monetization, and roadmap.*