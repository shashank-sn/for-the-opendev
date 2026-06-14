# roadmap

**product:** for the open dev  
**builder:** solo founder  
**version:** 1.1
**timeline:** no fixed launch date — phased by dependency and capacity  

---

## 1. phase overview

```
phase 0: foundation          (weeks 1–3)
phase 1: content + static    (weeks 4–8)
phase 2: dynamic platform     (weeks 9–14)
phase 3: community + launch   (weeks 15–20)
phase 4: growth + revenue     (weeks 21+)
```

each phase is independently valuable. ship at the end of each phase.

---

## 2. phase 0: foundation (weeks 1–3)

**goal:** repo, design system, brand assets, infrastructure  

### deliverables

| # | task | output |
|---|------|--------|
| 0.1 | register fortheopen.dev domain | dns pointing to cloudflare |
| 0.2 | public repo live | https://github.com/shashank-sn/for-the-opendev ✓ |
| 0.2b | github sponsors profile live | https://github.com/sponsors/shashank-sn ✓ — create tiers + payouts |
| 0.2d | add `.github/FUNDING.yml` on first public push | sponsor button on repo |
| 0.2c | scaffold better-auth in `packages/auth` | email + google + github |
| 0.3 | implement design tokens (both themes) | `styles/tokens.css` |
| 0.4 | build static html shell (home, about) | deployable landing page |
| 0.5 | finalize logo concept a (portal mark) | svg favicon + wordmark |
| 0.6 | set up cloudflare pages project | ci/cd from main branch |
| 0.7 | create mdx content pipeline | `content/` directory structure |
| 0.8 | set up d1 database + schema | tables from INFORMATION-ARCHITECTURE.md |
| 0.9 | register social handles | github, twitter, mastodon |
| 0.10 | write about page + editorial policy | published |

### exit criteria

- [ ] fortheopen.dev loads with home page in dark mode
- [ ] light/dark toggle works and persists
- [ ] logo visible in nav
- [ ] about page explains the mission
- [ ] content pipeline builds mdx → static html
- [x] github sponsors profile approved (shashank-sn)
- [ ] sponsor tiers $1/$5/$100 created in dashboard
- [ ] `.github/FUNDING.yml` committed — sponsor button visible on repo
- [ ] `/supporters` links tested against live tier urls

### estimated effort: 40–60 hours

---

## 3. phase 1: content + static site (weeks 4–8)

**goal:** 100 project profiles across 7 categories, 20 comparisons, 8 collections — all browsable  

### deliverables

| # | task | output |
|---|------|--------|
| 1.1 | write 32 tool profiles (cap, bruno, open webui…) | `content/tools/*.mdx` |
| 1.2 | write 16 framework profiles | `content/frameworks/*.mdx` |
| 1.3 | write 14 model profiles | `content/models/*.mdx` |
| 1.4 | write 10 resource profiles | `content/resources/*.mdx` |
| 1.5 | write 10 cli profiles | `content/clis/*.mdx` |
| 1.6 | write 8 dataset profiles | `content/datasets/*.mdx` |
| 1.7 | write 10 mcp profiles | `content/mcps/*.mdx` |
| 1.8 | write 20 comparison pages | `content/compare/*.mdx` |
| 1.9 | write 8 editorial collections | `content/collections/*.mdx` |
| 1.10 | build browse pages (7 categories) | `/tools` … `/mcps` |
| 1.11 | build tag + replace-saas pages | `/tags/indie-oss`, `/replace/loom` |
| 1.12 | build project profile template (category-aware fields) | `/{category}/{slug}` |
| 1.13 | build comparison page template | `/compare/{slug}` |
| 1.14 | build collection page template | `/collections/{slug}` |
| 1.15 | implement pagefind search | `/search` |
| 1.16 | implement filter bar on browse pages | category, tags, subcategory, self-host, license |
| 1.17 | github metadata sync worker | daily cron |
| 1.18 | badge svg generator endpoint | `/api/badge/{slug}/{tier}.svg` |
| 1.19 | seo: structured data + meta tags | json-ld on all pages |
| 1.20 | og image generation | per-project og images |

### content writing cadence

| week | profiles | comparisons | collections |
|------|----------|-------------|-------------|
| 4 | 32 (tools — cap first) | 4 | — |
| 5 | 16 (frameworks) + 10 (clis) | 4 | 2 |
| 6 | 14 (models) + 8 (datasets) | 4 | 2 |
| 7 | 10 (resources) + 10 (mcps) | 4 | 2 |
| 8 | review + polish all | 4 | 2 |

~5 profiles per day. cap, bruno, ripgrep profiles written first (high-intent seo).

### exit criteria

- [ ] 100 project profiles live across 7 categories
- [ ] 20 comparison pages live (includes loom-alternatives, mcp-starter-pack)
- [ ] 8 collection pages live (includes creator-stack)
- [ ] phase 2 backlog (120 entries) queued in admin
- [ ] browse, search, and filter work
- [ ] badge embeds functional
- [ ] lighthouse scores > 90 performance, > 95 a11y

### estimated effort: 120–160 hours (80h content + 40-80h engineering)

---

## 4. phase 2: dynamic platform (weeks 9–14)

**goal:** auth, lists, submissions, reviews — the interactive layer  

### deliverables

| # | task | output |
|---|------|--------|
| 2.1 | migrate app layer to next.js | app router on cloudflare pages |
| 2.2 | implement auth with better-auth | login/signup modals, sessions, oauth |
| 2.2b | github sponsors webhook | sync tier to user profile |
| 2.3 | user dashboard | `/dashboard` |
| 2.4 | personal lists (create, add, remove) | list crud |
| 2.5 | project submission flow | `/submit` + verification |
| 2.6 | admin submission review queue | `/admin/submissions` |
| 2.7 | structured review form + display | review crud on profiles |
| 2.8 | review moderation queue | `/admin/moderation` |
| 2.9 | admin profile editor | `/admin/editorial` |
| 2.10 | email notifications (resend) | transactional emails |
| 2.11 | rate limiting on api routes | cloudflare workers |
| 2.12 | public user profiles | `/u/{username}` |

### exit criteria

- [ ] users can sign up, create lists, add projects
- [ ] users can submit projects (github + license verification)
- [ ] admin can review submissions and publish profiles
- [ ] users can write structured reviews
- [ ] email notifications work for all submission states

### estimated effort: 80–120 hours

---

## 5. phase 3: community + launch platform (weeks 15–20)

**goal:** launch platform, public lists, badge tiers, community features  

### deliverables

| # | task | output |
|---|------|--------|
| 3.1 | launch page + voting | `/launches` |
| 3.2 | launch scheduling (admin) | `/admin/launches` |
| 3.3 | launch request flow (maintainers) | dashboard |
| 3.4 | staff pick selection workflow | admin |
| 3.5 | public shareable lists | `/u/{username}/{list-slug}` |
| 3.6 | badge tier management | `/admin/badges` |
| 3.7 | earned criteria automation | cron checks |
| 3.8 | community signal → tier upgrade alerts | admin notifications |
| 3.9 | supporters page (static, pre-stripe) | `/supporters` |
| 3.10 | newsletter setup (buttondown or similar) | "the open dev weekly" |
| 3.11 | collaborative lists | invite + roles |
| 3.12 | list starter templates | pre-populated lists |

### exit criteria

- [ ] launch platform live with voting + staff picks
- [ ] maintainers can request launches
- [ ] public lists shareable
- [ ] badge tiers assignable and displayed
- [ ] newsletter sending weekly

### estimated effort: 80–100 hours

---

## 6. phase 4: growth + revenue (weeks 21+)

**goal:** open supporter tier, sponsorships, scale content  

### deliverables

| # | task | output |
|---|------|--------|
| 4.1 | github sponsors fully wired | $1 · $5 · $100 + custom |
| 4.2 | sponsor badge + wall | profile + /supporters + readme |
| 4.3 | founding supporter logic | first 100 permanent badge |
| 4.3b | enterprise sponsor section | logos for $100+ and custom |
| 4.4 | sponsored placement infrastructure | labeled components |
| 4.5 | sponsor inquiry + management | admin workflow |
| 4.6 | migrate search to typesense (if needed) | server-side search |
| 4.7 | i18n string extraction | architecture ready |
| 4.8 | api access tier (if demand) | api keys + rate limits |
| 4.9 | ongoing content: 10 new profiles/week | phase 2 backlog + submissions |
| 4.10 | quarterly comparison review | update accuracy |

### exit criteria

- [ ] open supporter tier live and accepting payments
- [ ] 100+ supporters
- [ ] first sponsored placement running (clearly labeled)
- [ ] 300+ published profiles
- [ ] 10,000+ monthly users

### estimated effort: ongoing

---

## 7. public launch definition

"public launch" = end of phase 3. at this point the platform has:

- 100+ curated profiles with full builder schema
- 15+ hand-written comparisons
- 5+ editorial collections
- auth, lists, submissions, reviews
- launch platform with voting
- badge system with embeds
- light/dark mode
- search and filtering
- newsletter

phases 0–2 can be soft-launched earlier (content-only site) to start building seo and audience.

### 7.1 soft launch (end of phase 1)

- content-only site with 100 profiles
- no auth, no submissions, no community
- purpose: seo indexing, initial traffic, validate content quality
- share on twitter, hackernews, reddit, dev newsletters

### 7.2 public launch (end of phase 3)

- full platform with community features
- launch event: feature 5 staff picks on launch day
- newsletter announcement
- post on hackernews, reddit, product hunt (if appropriate), dev twitter
- reach out to 20 maintainers of listed projects with badge embeds

---

## 8. solo founder capacity planning

### 8.1 weekly time budget (assuming full-time)

| activity | hours/week |
|----------|-----------|
| content writing (profiles, comparisons) | 15–20 |
| engineering | 15–20 |
| submission review + moderation | 3–5 |
| community engagement (twitter, newsletter) | 3–5 |
| admin + ops | 2–3 |
| **total** | **38–53** |

### 8.2 bottlenecks

| bottleneck | mitigation |
|------------|------------|
| writing 100 profiles | batch by category; use github api for metadata; template-driven |
| editorial review queue | strict submission criteria reduces volume; community reviews reduce profile update burden |
| comparison writing | prioritize high-intent seo queries; review quarterly not continuously |
| solo engineering | html/css first, next.js only when needed; cloudflare managed services |

### 8.3 when to get help

| trigger | hire |
|---------|------|
| > 20 submissions/week | part-time editorial reviewer |
| > 50,000 monthly users | part-time devops / performance |
| > $3,000/mo revenue | part-time content writer |
| > 500 submissions backlog | full-time editorial |

---

## 9. risk-adjusted timeline

| scenario | soft launch | public launch |
|----------|-------------|---------------|
| full-time focus | week 8 | week 20 |
| part-time (20h/week) | week 16 | week 40 |
| weekends only (10h/week) | week 30 | never solo — need help |

---

## 10. milestone checklist

### phase 0 ✓
- [ ] domain live
- [ ] repo created
- [ ] design tokens implemented
- [ ] logo finalized
- [ ] home page deployed

### phase 1 ✓
- [ ] 100 profiles published
- [ ] 15 comparisons published
- [ ] 5 collections published
- [ ] search working
- [ ] badges embeddable

### phase 2 ✓
- [ ] auth working
- [ ] lists working
- [ ] submissions working
- [ ] reviews working
- [ ] admin queue working

### phase 3 ✓
- [ ] launch platform live
- [ ] public lists shareable
- [ ] badge tiers managed
- [ ] newsletter sending

### phase 4 ✓
- [ ] github sponsors fully wired ($1 · $5 · $100 + custom)
- [ ] sponsored placement infrastructure ready
- [ ] 300+ profiles
- [ ] 10,000+ monthly users

---

## 11. execution backlog

all build-time todos live in **[BUILD-TODOS.md](./BUILD-TODOS.md)**.

sponsors + repo gate (§1) blocks public launch. profile is already live at https://github.com/sponsors/shashank-sn — tiers and `FUNDING.yml` ship when we build.

---

*see LAUNCH-CATALOG.md for the 100 projects to build in phase 1. see PRD.md for full requirements.*