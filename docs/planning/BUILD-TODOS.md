# build todos

**product:** for the open dev  
**status:** planning complete — execute when building  
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

- [ ] create sponsor tier: `open-supporter` — $1/month
- [ ] create sponsor tier: `builder-backer` — $5/month
- [ ] create sponsor tier: `sustainer` — $100/month
- [ ] enable custom amount (one-time + monthly) for enterprise
- [ ] write sponsor profile bio (lowercase, mission copy)
- [ ] configure payouts (dashboard → payouts → bank/paypal)
- [x] create public repo (MIT license) — https://github.com/shashank-sn/for-the-opendev
- [x] commit `.github/FUNDING.yml`:
  ```yaml
  github: shashank-sn
  custom:
    - https://fortheopen.dev/supporters
  ```
- [ ] verify purple **sponsor** button appears on repo page
- [x] add sponsor table + shields badges to `README.md`
- [x] add `SECURITY.md`, `CONTRIBUTING.md`, `CODE_OF_CONDUCT.md`
- [ ] test tier urls from site match dashboard slugs:
  - `?sponsor=open-supporter`
  - `?sponsor=builder-backer`
  - `?sponsor=sustainer`
- [ ] build `/supporters` page (four tier cards + enterprise custom)
- [ ] wire sponsor links in footer, about, home cta
- [ ] set up sponsors webhook → `POST /api/webhooks/github-sponsors` (or cron fallback)
- [ ] sync sponsor tier to user profile after better-auth github login
- [ ] founding supporter badge logic (first 100)
- [ ] share + embed sponsor profile after site is live

**gate:** do not announce publicly until every unchecked item above is done.

---

## 2. infrastructure (phase 0)

- [ ] register / point `fortheopen.dev` dns → cloudflare
- [ ] create `fortheopendev` github org (or launch under `shashank-sn` first)
- [ ] cloudflare pages project + workers
- [ ] d1 database + schema migrated
- [ ] github actions deploy pipeline (`main` → cloudflare)
- [ ] dependabot enabled
- [ ] self-hosted umami or plausible for analytics (oss only)

---

## 3. auth (phase 0–2)

- [ ] install better-auth in `packages/auth`
- [ ] configure email + magic link
- [ ] configure google oauth (google cloud console app)
- [ ] configure github oauth (github developer settings app)
- [ ] build login/signup modals (design system, lowercase)
- [ ] username setup on first login
- [ ] session persistence + protected routes

---

## 4. design + static shell (phase 0–1)

- [ ] design tokens (light + dark) in css
- [ ] logo concept a (portal mark) as svg + favicon
- [ ] home page
- [ ] about page + editorial policy
- [ ] browse pages (7 categories)
- [ ] project profile template (category-aware fields)
- [ ] light/dark toggle with `ftod-theme` persistence
- [ ] pagefind search

---

## 5. content (phase 1)

- [ ] write 100 launch profiles (see LAUNCH-CATALOG.md v2.1)
- [ ] cap profile first (high-intent seo)
- [ ] better-auth profile (dogfooding)
- [ ] 20 hand-written comparisons
- [ ] 8 editorial collections
- [ ] badge svg generator endpoint

---

## 6. platform features (phase 2–3)

- [ ] user lists (create, add, remove)
- [ ] project submission flow + github license verification
- [ ] admin submission review queue
- [ ] structured community reviews
- [ ] launch platform (votes + staff pick)
- [ ] public shareable lists
- [ ] embeddable project badges
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