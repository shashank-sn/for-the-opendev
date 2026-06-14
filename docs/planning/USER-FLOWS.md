# user flows

**product:** for the open dev  
**version:** 1.0  

---

## 1. flow index

| # | flow | actor | priority |
|---|------|-------|----------|
| f1 | discover & evaluate a project | visitor | p0 |
| f2 | sign up / log in | visitor | p0 |
| f3 | create & manage lists | user | p0 |
| f4 | submit a project | user | p0 |
| f5 | write a structured review | user | p0 |
| f6 | vote on a launch | user | p0 |
| f7 | request a launch | maintainer | p1 |
| f8 | become an open supporter | user | p1 |
| f9 | review a submission (admin) | admin | p0 |
| f10 | embed a badge | maintainer | p0 |

---

## 2. f1: discover & evaluate a project

**actor:** visitor (unauthenticated)  
**goal:** decide whether to adopt an open source project  
**entry points:** google search, home page, browse, search, comparison, collection  

### 2.1 happy path

```
landing (google: "open source alternative to mixpanel")
  → search results or direct profile link
  → /tools/posthog
  → scan sidebar quick facts (license, self-host, setup, maintenance)
  → read verdict ("worth your time if...")
  → check alternatives (plausible, umami)
  → click comparison link → /compare/self-hosted-analytics
  → decide: plausible fits better
  → /tools/plausible
  → click "view on github"
  → leave platform to adopt
```

### 2.2 decision path (use case browse)

```
home
  → "i want to replace notion"
  → /collections/replace-notion
  → scan 5 recommended tools with one-line tradeoffs
  → click outline (best for teams)
  → full builder profile
  → verdict confirms fit
  → github
```

### 2.3 screen states

| state | what user sees |
|-------|---------------|
| profile loading | skeleton: sidebar facts + verdict block |
| profile not found | "this project isn't listed yet. know a good one? submit it →" |
| comparison linked | alternatives section shows "see full comparison →" |
| no community reviews | "no reviews yet — be the first after you try it" |

### 2.4 success criteria

- user reaches a go/no-go decision in < 5 minutes
- all 8 builder questions answered without leaving the page

---

## 3. f2: sign up / log in

**actor:** visitor  
**goal:** create account to use lists, reviews, submissions, votes  
**entry points:** nav "login", ctas on profile pages ("add to list", "write a review")  

### 3.1 auth methods (better-auth)

| method | flow |
|--------|------|
| email (magic link) | modal → enter email → better-auth sends link → click → session created |
| google oauth | modal → "continue with google" → better-auth oauth → callback → logged in |
| github oauth | modal → "continue with github" → better-auth oauth → callback → logged in + sponsor tier synced if applicable |

### 3.2 happy path (github — recommended for dev audience)

```
click "login" in nav
  → /login
  → three options: email · google · github
  → click "continue with github"
  → github oauth consent
  → /login/callback
  → account created (or matched to existing)
  → redirect to original page (or /dashboard)
```

### 3.3 username setup (first login only)

```
first login
  → modal: "choose a username"
  → input: lowercase, 3-20 chars, a-z 0-9 hyphen
  → validation: unique, not reserved
  → confirm
  → continue to intended destination
```

### 3.4 edge cases

| case | handling |
|------|----------|
| email already linked to github account | "this email is linked to a github account. log in with github." |
| github account already exists | log in to existing account |
| magic link expired | "link expired. request a new one." |
| oauth denied | return to /login, no error shame |

---

## 4. f3: create & manage lists

**actor:** authenticated user  
**goal:** save and organize projects for later reference or sharing  

### 4.1 create list (v1 — private)

```
/dashboard
  → "lists" tab
  → click "new list"
  → modal: title (lowercase enforced on slug, not title display)
  → list created, empty state shown
```

### 4.2 add project to list

```
/tools/posthog (or any profile)
  → click "add to list ▾" in sidebar
  → dropdown: existing lists + "create new list"
  → select "my analytics stack"
  → toast: "added to my analytics stack"
  → optional: add a note inline
```

### 4.3 make list public (v1.1)

```
/dashboard/lists/my-analytics-stack
  → toggle "make public"
  → slug auto-generated: /u/alex/my-analytics-stack
  → copy share link button appears
```

### 4.4 collaborative list (v1.2)

```
/dashboard/lists/my-analytics-stack
  → "invite collaborator"
  → enter email or username
  → select role: viewer · editor
  → invite sent
  → collaborator sees list in their dashboard
```

### 4.5 starter templates (v1.3)

```
/dashboard/lists
  → "start from template"
  → gallery: "indie saas infra", "my homelab stack", "replace notion"
  → click template → list created pre-populated
  → user customizes (add/remove/reorder)
```

### 4.6 list states

| state | display |
|-------|---------|
| empty | "no projects yet — browse tools →" |
| private | lock icon, only visible to owner |
| public | globe icon, shareable url |
| collaborative | people icon + collaborator count |

---

## 5. f4: submit a project

**actor:** authenticated user (ideally maintainer or contributor)  
**goal:** get a new open source project listed on the platform  
**entry points:** /submit, nav "submit", profile "not listed" cta  

### 5.1 submission form

```
/submit
  → guidelines summary (github only, oss license, review process)
  → form:
      github repo url *        (required)
      □ i am the maintainer or significant contributor
      why should this be listed? (optional, max 500 chars)
  → click "submit for review"
```

### 5.2 automated verification (immediate)

```
submit clicked
  → api/github/verify called
  → checks:
      ✓ valid github url
      ✓ repo exists and is public
      ✓ license detected and on allowlist
      ✓ has readme
      ✓ not archived
      ✓ activity threshold met (30+ stars OR commits in last 90 days)
      ✓ not already listed
  → if fail: show specific errors inline
  → if pass: submission created, status = submitted
```

### 5.3 submission states (user view)

```
/dashboard/submissions
  → list of submissions with status badges

  submitted     "we received your submission"
  in_review     "our team is reviewing"
  needs_changes "we need some changes" + reviewer notes
  approved      "approved — profile being written"
  published     "live at /tools/{slug}" + link
  rejected      "not accepted" + reason
```

### 5.4 rejection reasons (transparent)

| reason | message |
|--------|---------|
| invalid license | "repo doesn't have an approved open source license" |
| inactive | "no commits in 6+ months and fewer than 30 stars" |
| duplicate | "this project is already listed at /tools/{slug}" |
| not software | "we only list software projects, not awesome lists or docs-only repos" |
| fork spam | "this appears to be an unmodified fork" |
| quality | "readme and documentation don't meet our builder-friendly threshold" |

### 5.5 timeline

- automated verification: instant
- editorial review: within 7 days
- profile writing (if approved): within 14 days of approval
- submitter notified at each state change via email

---

## 6. f5: write a structured review

**actor:** authenticated user (account age > 24 hours)  
**goal:** share adoption experience with structured ratings  
**entry points:** profile page "write a review"  

### 6.1 review form

```
/tools/posthog
  → scroll to "community reviews"
  → click "write a review"
  → form:
      setup ease          ●●●○○  (1-5 slider)
      documentation       ●●●●○  (1-5 slider)
      maintenance confidence ●●●○○  (1-5 slider)
      would you recommend?  ○ yes  ○ maybe  ○ no
      your experience (optional, 50-2000 chars)
  → click "submit review"
  → review appears in community section
  → aggregate scores recalculated
```

### 6.2 one review per project

- user can edit their existing review
- editing resets "updated_at" but not "created_at"
- no deleting reviews in v1 (edit to clarify)

### 6.3 moderation

```
review submitted
  → if body contains flagged keywords → moderation queue
  → if user account < 24 hours → "come back tomorrow"
  → if user already reviewed → show edit form instead
  → admin can hide review (not delete) with reason
```

### 6.4 community score display

```
community reviews (24)
  setup ease          ●●●○○  3.2
  documentation       ●●●●○  4.1
  maintenance         ●●●○○  3.5
  would recommend     78% yes
```

---

## 7. f6: vote on a launch

**actor:** authenticated user  
**goal:** support a project's launch during the 7-day voting window  

### 7.1 launch page

```
/launches
  → active launches section (currently voting)
  → each card:
      project name + tagline
      vote count
      countdown ("3 days left")
      [upvote] button
  → staff pick highlighted at top (separate from vote ranking)
```

### 7.2 vote flow

```
/launches
  → see "plausible — privacy-first analytics" launch card
  → click upvote (▲)
  → vote recorded (one per user per launch)
  → count increments
  → button changes to "voted ✓" (can unvote)
```

### 7.3 launch lifecycle

```
maintainer requests launch (f7)
  → admin schedules for next tuesday/thursday
  → status: scheduled
  → launch day: status → active, voting opens
  → 7 days later: status → ended
  → results archived on /launches/{slug}
  → top voted gets "community launch" badge for 30 days
```

### 7.4 rules

- one vote per user per launch
- votes are public (username visible on launch page)
- staff pick is editorial, independent of vote count
- sponsored launches labeled, cannot be staff pick

---

## 8. f7: request a launch

**actor:** maintainer (authenticated, project published at verified tier+)  
**goal:** schedule a launch event for their project  

```
/dashboard
  → "my projects" (projects they submitted that are published)
  → select project
  → click "request launch"
  → form:
      launch tagline (max 120 chars)
      preferred date (tuesday or thursday, ≥ 2 weeks out)
  → submit
  → admin reviews and schedules
  → email: "your launch is scheduled for {date}"
```

**requirements:**
- project at verified tier minimum
- no launch in last 6 months
- profile must be complete (all builder fields)

---

## 9. f8: become a sponsor (github sponsors)

**actor:** visitor or authenticated user  
**goal:** support the open source repo at $1, $5, $100, or custom amount  

```
/supporters (or cta on home / dashboard / github readme)
  → four options displayed:
      open supporter — $1/mo
      builder backer — $5/mo
      open source sustainer — $100/mo
      custom amount — any (enterprise)
  → click tier → redirect to github sponsors page
  → complete sponsorship on github
  → if logged in with linked github → tier synced to profile badge
  → name appears on /supporters wall
```

### 9.1 sponsor management

```
/dashboard/supporter
  → current tier (from github sponsors api)
  → link to manage on github
  → "founding supporter" badge if in first 100
  → prompt to link github if not connected
```

### 9.2 enterprise custom sponsorship

```
/supporters → "enterprise" section
  → "sponsor any amount on github" (primary)
  → or email hello@fortheopen.dev for invoicing
  → logo on enterprise section if ≥ $100/mo
```

### 9.3 what sponsors do NOT get

- no weighted votes
- no paywalled content
- no priority review
- no influence on listings or badges

---

## 10. f9: review a submission (admin)

**actor:** admin (founder)  
**goal:** evaluate submission and approve/reject/request changes  

```
/admin/submissions
  → queue sorted by submitted_at
  → click submission
  → review panel:
      left: auto-verification results
      right: github repo preview (readme, license, activity)
      bottom: editorial notes field
  → actions:
      [approve]  → status: approved, triggers profile writing
      [needs changes] → message to submitter, status: needs_changes
      [reject] → reason required, status: rejected
```

### 10.1 approval triggers

1. submission status → approved
2. project status → in_review
3. editorial writes full builder profile (mdx)
4. profile published → project status → published
5. badge tier set to "listed" (minimum)
6. submitter notified

### 10.2 profile writing workflow

```
approved submission
  → admin creates mdx file in content/{category}/{slug}.mdx
  → fills all builder profile fields
  → runs github metadata sync
  → previews locally
  → publishes (deploy)
  → badge tier assigned
  → submitter notified with live link
```

---

## 11. f10: embed a badge

**actor:** maintainer  
**goal:** display trust badge on their github readme  

```
/tools/posthog (their published profile)
  → sidebar: "embed badge"
  → click → modal with three styles:
      tier badge (primary)
      compact badge
      staff pick badge (if applicable)
  → each shows preview + markdown snippet
  → click "copy markdown"
  → paste into github readme
  → badge links back to their profile on fortheopen.dev
```

### 11.1 badge url format

```
https://fortheopen.dev/badge/{slug}/{tier}.svg
```

svg generated dynamically from badge tier. cached at edge.

---

## 12. error & edge case flows

### 12.1 rate limiting

| action | limit | message |
|--------|-------|---------|
| submit project | 3 per day | "you can submit up to 3 projects per day" |
| write review | 10 per day | "slow down — try again tomorrow" |
| vote | 20 per day | "vote limit reached for today" |
| magic link | 5 per hour | "check your inbox or wait before requesting another" |

### 12.2 session expiry

- session duration: 30 days
- refresh on activity
- expired session: redirect to /login with return url preserved

### 12.3 github api failure

- metadata stale > 7 days: show "last updated {date}" warning on profile
- license check fails during cron: flag for manual review, don't unpublish

---

## 13. notification matrix

| event | email | in-app |
|-------|-------|--------|
| welcome | ✓ | — |
| submission received | ✓ | ✓ |
| submission approved | ✓ | ✓ |
| submission rejected | ✓ | ✓ |
| submission needs changes | ✓ | ✓ |
| project published | ✓ | ✓ |
| launch scheduled | ✓ | ✓ |
| launch started | — | ✓ |
| launch ended | ✓ | ✓ |
| review flagged | — | ✓ (admin) |
| badge tier upgraded | ✓ | ✓ |
| sponsor thank you (github) | ✓ | ✓ |
| sponsor tier changed | ✓ | ✓ |

all email subjects lowercase.

---

*see PRD.md for requirements. see ROADMAP.md for which flows ship in which phase.*