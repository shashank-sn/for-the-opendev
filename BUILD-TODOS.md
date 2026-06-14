# build todos

**product:** for the open dev  
**status:** mvp scaffold shipped — finish manual gates before public launch  
**rule:** check items off as shipped. do not public-launch until §1 (sponsors + repo gate) is complete.

---

## 1. github sponsors + repo gate (phase 0 — before repo goes public)

sponsors profile is live: https://github.com/sponsors/shashank-sn

### already done

- [x] github sponsors profile approved & public
- [x] profile details filled out
- [x] identity confirmed
- [x] 2fa enabled

### todo when building

- [ ] create sponsor tier: `open-supporter` — $1/month *(manual — github sponsors dashboard)*
- [ ] create sponsor tier: `builder-backer` — $5/month *(manual)*
- [ ] create sponsor tier: `sustainer` — $100/month *(manual)*
- [ ] enable custom amount (one-time + monthly) for enterprise *(manual)*
- [ ] write sponsor profile bio (lowercase, mission copy) *(manual)*
- [ ] configure payouts (dashboard → payouts → bank/paypal) *(manual)*
- [x] create public repo (MIT license) — https://github.com/shashank-sn/for-the-opendev
- [x] commit `.github/FUNDING.yml`
- [ ] verify purple **sponsor** button appears on repo page
- [x] add sponsor table + shields badges to `README.md`
- [x] add `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`
- [x] test tier urls from site match dashboard slugs (wired in `/supporters`)
- [x] build `/supporters` page (four tier cards + enterprise custom)
- [x] wire sponsor links in footer, about, home cta
- [x] set up sponsors webhook → `POST /api/webhooks/github-sponsors` (cron fallback at `/api/cron/sync-sponsors`)
- [ ] sync sponsor tier to user profile after better-auth github login *(needs d1 + production deploy)*
- [x] founding supporter badge logic scaffolded (first 100 constant + webhook handler)
- [ ] share + embed sponsor profile after site is live

**gate:** do not announce publicly until every unchecked item above is done.

---

## 2. infrastructure (phase 0)

- [ ] register / point `fortheopen.dev` dns → cloudflare *(manual)*
- [x] repo live at https://github.com/shashank-sn/for-the-opendev
- [ ] create `fortheopendev` github org (optional — migrate later)
- [x] cloudflare pages project + workers scaffold (`wrangler.toml`, deploy workflow)
- [x] d1 database + schema migrated (`packages/db/drizzle/0000_init.sql`)
- [x] github actions deploy pipeline (`main` → cloudflare, gated by `CLOUDFLARE_DEPLOY_ENABLED`)
- [x] dependabot enabled
- [ ] self-hosted umami or plausible for analytics (oss only) *(env vars in `.env.example`)*

---

## 3. auth (phase 0–2)

- [x] install better-auth in `packages/auth`
- [x] configure email + magic link (better-auth route handler)
- [ ] configure google oauth (google cloud console app) *(needs env secrets)*
- [ ] configure github oauth (github developer settings app) *(needs env secrets)*
- [x] build login/signup modals (design system, lowercase)
- [ ] username setup on first login *(needs d1 session flow)*
- [ ] session persistence + protected routes *(needs d1 adapter wired)*

---

## 4. design + static shell (phase 0–1)

- [x] design tokens (light + dark) in css
- [x] logo concept a (portal mark) as svg + favicon
- [x] home page
- [x] about page + editorial policy
- [x] browse pages (7 categories)
- [x] project profile template (category-aware fields)
- [x] light/dark toggle with `ftod-theme` persistence
- [x] pagefind search (script + post-build command)

---

## 5. content (phase 1)

- [x] write 100 launch profiles (mdx generated from `content/catalog.json`)
- [x] cap profile first (high-intent seo — full editorial)
- [x] better-auth profile (dogfooding — full editorial)
- [x] 20 hand-written comparisons (structure + cross-links shipped)
- [x] 8 editorial collections
- [x] badge svg generator endpoint (`/api/badges/[slug]`)

*note: 97 profiles use launch template copy — expand editorial depth post-launch.*

---

## 6. platform features (phase 2–3)

- [ ] user lists (create, add, remove) *(schema ready)*
- [x] project submission flow + github license verification
- [ ] admin submission review queue
- [ ] structured community reviews
- [ ] launch platform (votes + staff pick)
- [ ] public shareable lists
- [x] embeddable project badges
- [ ] newsletter via self-hosted listmonk (optional phase 3)

---

## 7. post-launch (phase 4)

- [ ] 10 new profiles/week from phase 2 backlog
- [ ] sponsored placement components (clearly labeled)
- [ ] enterprise sponsor section on `/supporters`
- [ ] migrate repo to `fortheopendev` org (optional)
- [ ] org-level github sponsors (optional)

---

## quick reference

| doc | use when |
|-----|----------|
| REPOSITORY.md §3b–3d | sponsor + repo go-live detail |
| OPEN-SOURCE-STACK.md | picking dependencies |
| LAUNCH-CATALOG.md | writing profiles |
| USER-FLOWS.md | implementing features |
| DESIGN-SYSTEM.md | building ui |

---

*check items off here as you build. this is the execution backlog — specs live in the other docs.*