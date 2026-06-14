# brand guidelines

**product:** for the open dev  
**domain:** fortheopen.dev  
**version:** 1.0  

---

## 1. brand identity

### 1.1 name

**for the open dev**

- always lowercase in ui and marketing
- never abbreviated to ftod in user-facing copy (acceptable in internal code/slugs only)
- never "For The Open Dev" or "For the Open Dev"

### 1.2 tagline

**primary:** discover open source worth your time

**alternates (contextual):**

| context | tagline |
|---------|---------|
| submit page | put your project in front of builders who care |
| launch page | launch to builders, not browsers |
| supporter page | sponsor the open source repo on github |
| about page | less searching. more creating. |

### 1.3 brand promise

we answer the questions directories don't — so you spend less time searching and more time creating.

### 1.4 brand personality

| trait | expression |
|-------|------------|
| honest | we say when something isn't worth your time |
| precise | structured data, not hype |
| builder-first | written by someone who ships, for people who ship |
| lowercase | confident enough not to shout |
| trustworthy | never sold reviews, always labeled sponsorships |

### 1.5 brand voice

| do | don't |
|----|-------|
| "worth your time if you need self-hosted analytics" | "revolutionary analytics platform" |
| "skip this if you want managed hosting" | "not for everyone" (vague) |
| "setup takes ~30 min with docker" | "easy to set up!" |
| "replaces mixpanel for event tracking" | "competes with enterprise solutions" |
| " AGPL — review network copyleft before saas use" | "open source license included" |

**tone:** direct, warm, peer-to-peer. like a senior dev giving you advice over coffee. never corporate, never breathless.

---

## 2. logo concepts

three concepts recommended. all work at 16px favicon through hero scale. all lowercase.

### concept a: the portal (recommended)

**idea:** a rounded square with an open gap on the right side — a door/portal into open source. the gap suggests discovery (looking through) and openness (not closed).

```
    ┌──────
    │
    │      ← open gap = portal
    │
    └──────
```

- mark: 24×24px rounded rect (radius 6px), 2px stroke, open on right edge
- wordmark: "for the open dev" in geist sans, weight 500, tracking -0.01em
- mark + wordmark horizontal lockup for nav
- mark alone for favicon, embed badges

**why recommended:** minimal, ownable, works at any size, doesn't rely on overused dev clichés (brackets, forks, terminal prompts). the portal metaphor maps directly to the product promise.

### concept b: the bracket

**idea:** an opening curly brace `{` stylized as a portal/entry point. dev-native without being a literal code snippet.

```
    {
     \
      dev
```

- mark: stylized `{` character, 2px stroke weight, slightly rounded terminals
- more explicitly "developer" but less unique
- risk: bracket logos are common in dev tools

### concept c: the dot grid

**idea:** 3×3 grid of dots where the center dot is accent-colored — one standout in a field of options (curated discovery).

```
    · · ·
    · ● ·    ← accent dot = the right choice
    · · ·
```

- mark: 9 dots, 3px each, 6px gap, center dot `--accent`
- most abstract, least dev-specific
- works well as favicon, less strong as a wordmark companion

### logo usage rules

| rule | detail |
|------|--------|
| clear space | 1× mark height on all sides |
| minimum size | mark 16px, lockup 120px wide |
| colors | `--text-primary` on `--bg-base`, or white on dark |
| never | gradients on logo, shadows, rotation, stretch |
| never | all-caps wordmark |
| favicon | concept a mark, 32×32 svg |

---

## 3. color in brand context

brand accent is indigo (`#6366f1` dark / `#4f46e5` light). not orange (product hunt), not green (github), not purple-pink gradient (ai slop).

| role | color | rationale |
|------|-------|-----------|
| primary accent | indigo | trust, precision, dev-tool standard |
| staff pick | amber | warmth, editorial highlight |
| verified | blue | reliability |
| featured | violet | distinction |
| success / active | green | maintenance, positive signal |
| error / stale | red | maintenance warning |

no brand gradients. flat color only.

---

## 4. typography in brand context

- **geist sans** for all brand materials
- **geist mono** for code, stats, badges
- lowercase everywhere
- weight 500 for logo wordmark, 600 only for landing hero

---

## 5. badge system

### 5.1 tier badges (status)

projects earn tiers through editorial review + earned criteria + community signal.

| tier | requirements | color |
|------|-------------|-------|
| **listed** | approved through submission review, valid oss license | zinc |
| **verified** | listed + license verified + maintainer responsive + 90-day commits + readme quality | blue |
| **featured** | verified + 50+ community reviews avg ≥ 4.0 + docker or one-command setup + editorial approval | violet |
| **staff pick** | featured + editorial "worth your time" endorsement + full profile | amber |

tier progression:

```
submitted → listed → verified → featured → staff pick
                ↑          ↑          ↑
           earned     community   editorial
           criteria   signal      award
```

### 5.2 earned criteria badges (attribute)

independent of tier — a project can have any combination:

| badge | criteria | label |
|-------|----------|-------|
| maintained | commit in last 90 days | maintained |
| documented | readme has install section + configuration docs | documented |
| docker | official dockerfile or docker image published | docker ready |
| self-host | `self_hostable: yes` on profile | self-hostable |
| builder-friendly | mit/apache/bsd license + setup ≤ 3 difficulty | builder-friendly |

displayed as small pills below the tier badge on profiles.

### 5.3 community signal

when a project accumulates:

- ≥ 10 structured reviews
- average `would_recommend` ≥ 80% yes
- average `maintenance_confidence` ≥ 3.5/5

→ flagged for editorial review for tier upgrade. community never auto-promotes tiers.

### 5.4 embeddable badge specs

projects embed these in their github readme. three styles:

#### style 1: tier badge (primary)

```markdown
[![for the open dev: verified](https://fortheopen.dev/badge/posthog/verified.svg)](https://fortheopen.dev/tools/posthog)
```

svg structure:

```
┌────────────────────────────────────────┐
│ [mark] for the open dev  │  verified  │
└────────────────────────────────────────┘
  ← zinc-800 bg →            ← tier color →
```

dimensions: auto-width × 28px, border-radius 4px.

| tier | right-panel bg | right-panel text |
|------|---------------|-----------------|
| listed | `#3f3f46` | `#a1a1aa` |
| verified | `#1e3a5f` | `#60a5fa` |
| featured | `#2e1065` | `#a78bfa` |
| staff pick | `#451a03` | `#fbbf24` |

#### style 2: compact badge

```markdown
[![verified on for the open dev](https://fortheopen.dev/badge/posthog/compact.svg)](https://fortheopen.dev/tools/posthog)
```

dimensions: auto-width × 20px. text: "verified on for the open dev".

#### style 3: staff pick badge

```markdown
[![staff pick — for the open dev](https://fortheopen.dev/badge/posthog/staff-pick.svg)](https://fortheopen.dev/tools/posthog)
```

dimensions: auto-width × 28px. amber accent, sparkle icon.

### 5.5 user badges

| badge | who | display |
|-------|-----|---------|
| open supporter | $1/mo subscriber | heart icon + "open supporter" on profile |
| verified builder | linked github with public repos | checkmark on reviews |
| early supporter | first 100 supporters | "founding supporter" — never expires |

---

## 6. social & external presence

### 6.1 handles (recommended)

| platform | handle |
|----------|--------|
| github org | `fortheopendev` |
| twitter/x | `@fortheopendev` |
| mastodon | `@fortheopendev@fosstodon.org` |
| newsletter | "the open dev weekly" |

### 6.2 og image template

- 1200×630px
- background: `--bg-base`
- left: logo mark
- center: project name (`.preserve-case`) + tier badge
- bottom: "for the open dev" wordmark
- no screenshots, no busy layouts

### 6.3 email templates

all lowercase subject lines:

| email | subject |
|-------|---------|
| welcome | `welcome to for the open dev` |
| submission received | `we're reviewing your submission` |
| submission approved | `your project is now listed` |
| submission needs changes | `changes needed for your submission` |
| launch scheduled | `your launch is scheduled for tuesday` |
| supporter thank you | `thank you for being an open supporter` |

---

## 7. photography & illustration

- no stock photography
- no ai-generated imagery
- project screenshots provided by maintainers or taken from public demos
- empty states: simple line illustrations, single color, geometric
- launch graphics: typography-only, project name + date

---

## 8. brand applications

### 8.1 github org readme

```markdown
# for the open dev

discover open source worth your time.

→ [fortheopen.dev](https://fortheopen.dev)
```

### 8.2 project submission confirmation

> thanks for submitting **{project}**. we'll review the repo, verify the license, and get back to you within 7 days. we only list projects with valid open source licenses on github.

### 8.3 negative verdict framing

never: "this project is bad" or "avoid this"

always: "skip this if {condition}" — frame as audience mismatch, not quality judgment.

> skip posthog if you want a 5-minute setup with zero ops. it's powerful but ops-heavy self-hosted.

---

## 9. competitive differentiation (brand level)

| they say | we say |
|----------|--------|
| "discover 10,000+ tools" | "100 tools worth your time" |
| "trending today" | "maintained, verified, builder-friendly" |
| "submit your startup" | "submit your open source repo" |
| "★★★★★" | "setup: ●●○○○ · docs: ●●●●○ · maintained: ●●●○○" |
| "FEATURED" | "staff pick" |

---

## 10. brand checklist (pre-launch)

- [ ] logo concept a (portal) finalized as svg
- [ ] favicon 32×32 + 180×180 apple touch icon
- [ ] og image template built
- [ ] badge svg generator endpoint live
- [ ] email templates designed (lowercase)
- [ ] social handles registered
- [ ] github org created
- [ ] "about" page copy written
- [ ] editorial policy published
- [ ] supporter page designed

---

*see DESIGN-SYSTEM.md for component specs. see PRD.md §5.8 for badge logic. see MONETIZATION.md for open supporter tier.*