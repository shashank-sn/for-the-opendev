# design system

**product:** for the open dev  
**version:** 1.0  
**aesthetic:** dev-tool precision — linear, vercel, raycast energy  
**casing rule:** everything lowercase (see §2)  

---

## 1. design principles

| # | principle | what it means |
|---|-----------|---------------|
| 1 | lowercase everything | ui, urls, headings, buttons — no title case anywhere |
| 2 | dark-first | default theme is dark; light is equally polished |
| 3 | decision over decoration | every element helps someone choose faster |
| 4 | density with breathing room | information-rich but not cramped — generous section gaps |
| 5 | trust through consistency | same profile layout for every project, every category |
| 6 | motion with purpose | subtle transitions only — no gratuitous animation |
| 7 | accessible by default | wcag 2.1 aa minimum, aim for aaa on text contrast |

---

## 2. lowercase system

### 2.1 global rule

```css
/* applied to root — exceptions use .preserve-case */
html {
  text-transform: lowercase;
}
```

### 2.2 exception classes

```css
.preserve-case {
  text-transform: none;
}

/* use on: license badges, external project names, code blocks */
.license-badge,
.project-name,
code, pre {
  text-transform: none;
}
```

### 2.3 content guidelines

| element | format | example |
|---------|--------|---------|
| page title | lowercase | `posthog · tool · for the open dev` |
| h1 | lowercase | `builder profile` |
| button | lowercase | `add to list` |
| nav item | lowercase | `tools` |
| breadcrumb | lowercase | `tools / analytics / posthog` |
| toast | lowercase | `added to your list` |
| error | lowercase | `repo must have a valid oss license` |
| badge tier | lowercase | `staff pick` |
| supporter label | lowercase | `open supporter` |

---

## 3. color system

### 3.1 design tokens

colors are defined as css custom properties on `:root` (light) and `[data-theme="dark"]` (dark). components never use raw hex — always tokens.

### 3.2 dark theme (default)

```css
[data-theme="dark"] {
  /* backgrounds */
  --bg-base:        #09090b;   /* zinc-950 — page background */
  --bg-surface:     #18181b;   /* zinc-900 — cards, panels */
  --bg-elevated:    #27272a;   /* zinc-800 — dropdowns, modals */
  --bg-subtle:      #3f3f46;   /* zinc-700 — hover states */
  --bg-input:       #18181b;   /* input fields */

  /* text */
  --text-primary:   #fafafa;   /* zinc-50 */
  --text-secondary: #a1a1aa;   /* zinc-400 */
  --text-tertiary:  #71717a;   /* zinc-500 */
  --text-disabled:  #52525b;   /* zinc-600 */

  /* borders */
  --border-default: #27272a;   /* zinc-800 */
  --border-strong:  #3f3f46;   /* zinc-700 */
  --border-focus:   #6366f1;   /* indigo-500 */

  /* accent — primary action */
  --accent:         #6366f1;   /* indigo-500 */
  --accent-hover:   #818cf8;   /* indigo-400 */
  --accent-subtle:  #1e1b4b;   /* indigo-950 — tinted backgrounds */
  --accent-text:    #a5b4fc;   /* indigo-300 — links on dark */

  /* semantic */
  --success:        #22c55e;   /* green-500 */
  --success-subtle: #052e16;   /* green-950 */
  --warning:        #eab308;   /* yellow-500 */
  --warning-subtle: #422006;   /* yellow-950 */
  --error:          #ef4444;   /* red-500 */
  --error-subtle:   #450a0a;   /* red-950 */
  --info:           #3b82f6;   /* blue-500 */
  --info-subtle:    #172554;   /* blue-950 */

  /* badge tiers */
  --badge-listed:     #71717a;  /* zinc-500 */
  --badge-verified:   #3b82f6;  /* blue-500 */
  --badge-featured:   #8b5cf6;  /* violet-500 */
  --badge-staff-pick: #f59e0b;  /* amber-500 */
  --badge-sponsored:  #71717a;  /* zinc-500 + dashed border */

  /* difficulty scale */
  --diff-1: #22c55e;
  --diff-2: #84cc16;
  --diff-3: #eab308;
  --diff-4: #f97316;
  --diff-5: #ef4444;

  /* shadows */
  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.4);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.5);
  --shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.6);
}
```

### 3.3 light theme

```css
[data-theme="light"] {
  --bg-base:        #fafafa;   /* zinc-50 */
  --bg-surface:     #ffffff;
  --bg-elevated:    #ffffff;
  --bg-subtle:      #f4f4f5;   /* zinc-100 */
  --bg-input:       #ffffff;

  --text-primary:   #09090b;   /* zinc-950 */
  --text-secondary: #52525b;   /* zinc-600 */
  --text-tertiary:  #a1a1aa;   /* zinc-400 */
  --text-disabled:  #d4d4d8;   /* zinc-300 */

  --border-default: #e4e4e7;   /* zinc-200 */
  --border-strong:  #d4d4d8;   /* zinc-300 */
  --border-focus:   #6366f1;

  --accent:         #4f46e5;   /* indigo-600 */
  --accent-hover:   #6366f1;   /* indigo-500 */
  --accent-subtle:  #eef2ff;   /* indigo-50 */
  --accent-text:    #4f46e5;

  --success:        #16a34a;
  --success-subtle: #f0fdf4;
  --warning:        #ca8a04;
  --warning-subtle: #fefce8;
  --error:          #dc2626;
  --error-subtle:   #fef2f2;
  --info:           #2563eb;
  --info-subtle:    #eff6ff;

  --badge-listed:     #a1a1aa;
  --badge-verified:   #2563eb;
  --badge-featured:   #7c3aed;
  --badge-staff-pick: #d97706;
  --badge-sponsored:  #a1a1aa;

  --shadow-sm:  0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md:  0 4px 12px rgba(0, 0, 0, 0.08);
  --shadow-lg:  0 8px 24px rgba(0, 0, 0, 0.12);
}
```

### 3.4 theme toggle

- placement: top-right of nav bar, always visible
- control: icon toggle (sun / moon) — no text label needed
- persistence: `localStorage` key `ftod-theme` + respects `prefers-color-scheme` on first visit
- transition: 150ms ease on background and text colors (no flash on load — inline script sets theme before paint)
- no system/auto three-way toggle in v1 — just light and dark

```html
<!-- prevent flash -->
<script>
  (function() {
    var t = localStorage.getItem('ftod-theme');
    if (!t) t = matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', t);
  })();
</script>
```

---

## 4. typography

### 4.1 font stack

| role | font | fallback | source |
|------|------|----------|--------|
| sans (ui + body) | geist sans | system-ui, -apple-system, sans-serif | self-hosted woff2 |
| mono (code + data) | geist mono | ui-monospace, monospace | self-hosted woff2 |

geist is chosen for: dev-tool credibility, excellent legibility at small sizes, free oss license, alignment with vercel/linear aesthetic.

### 4.2 type scale

| token | size | line-height | weight | use |
|-------|------|-------------|--------|-----|
| `--text-xs` | 12px / 0.75rem | 1.5 | 400 | captions, meta, timestamps |
| `--text-sm` | 14px / 0.875rem | 1.5 | 400 | secondary text, labels |
| `--text-base` | 16px / 1rem | 1.6 | 400 | body text |
| `--text-lg` | 18px / 1.125rem | 1.5 | 400 | intro paragraphs |
| `--text-xl` | 20px / 1.25rem | 1.4 | 500 | card titles |
| `--text-2xl` | 24px / 1.5rem | 1.3 | 500 | section headings |
| `--text-3xl` | 30px / 1.875rem | 1.2 | 600 | page headings |
| `--text-4xl` | 36px / 2.25rem | 1.1 | 600 | hero headings |
| `--text-5xl` | 48px / 3rem | 1.05 | 600 | landing hero only |

### 4.3 typography rules

- headings: lowercase, geist sans, `--text-primary`
- body: `--text-base`, `--text-secondary` for supporting copy
- max line width: 68ch for prose (verdict, comparisons)
- project names in headings: `.preserve-case` class
- tabular numbers on stats: `font-variant-numeric: tabular-nums`
- letter-spacing: `-0.02em` on headings ≥ `--text-3xl` only

---

## 5. spacing & layout

### 5.1 spacing scale (4px base)

| token | value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

### 5.2 layout grid

| breakpoint | width | columns | gutter | margin |
|------------|-------|---------|--------|--------|
| mobile | < 640px | 4 | 16px | 16px |
| tablet | 640–1024px | 8 | 24px | 24px |
| desktop | 1024–1280px | 12 | 24px | 32px |
| wide | > 1280px | 12 | 32px | auto (max 1200px) |

**max content width:** 1200px centered. profile pages use a 2-column layout on desktop (main content 8 cols + sidebar 4 cols).

### 5.3 border radius

| token | value | use |
|-------|-------|-----|
| `--radius-sm` | 4px | badges, tags |
| `--radius-md` | 8px | buttons, inputs, cards |
| `--radius-lg` | 12px | modals, panels |
| `--radius-full` | 9999px | avatars, pills |

---

## 6. components

### 6.1 navigation bar

```
┌─────────────────────────────────────────────────────────────┐
│ [logo] for the open dev    tools  frameworks  models  ...  │
│                                    launches  search  [☀/☾] [login] │
└─────────────────────────────────────────────────────────────┘
```

- height: 56px
- background: `--bg-base` with bottom border `--border-default`
- sticky on scroll with subtle backdrop blur
- mobile: hamburger → slide-over drawer
- logo: wordmark (see BRAND.md), links to `/`

### 6.2 project card

used in browse grids, search results, lists, launch page.

```
┌──────────────────────────────────────┐
│ [icon]  posthog          [staff pick]│
│         product analytics, self-host │
│                                      │
│  ★ 18.2k   setup: ●●○○○   mit      │
│  replaces: mixpanel, amplitude       │
└──────────────────────────────────────┘
```

- background: `--bg-surface`
- border: 1px `--border-default`
- hover: border → `--border-strong`, shadow `--shadow-sm`
- padding: `--space-5`
- border-radius: `--radius-md`
- entire card is clickable

### 6.3 builder profile layout

```
┌─ main (8 col) ──────────────────┬─ sidebar (4 col) ──┐
│ [icon] posthog                    │ quick facts        │
│ product analytics platform        │ ├ license: MIT     │
│ [staff pick] [verified]           │ ├ self-host: yes   │
│                                   │ ├ commercial: yes  │
│ ── verdict ──                     │ ├ setup: ●●○○○    │
│ worth your time if you want...    │ ├ maintenance: ●●● │
│                                   │ └ last commit: 2d  │
│ ── replaces ──                    │                    │
│ mixpanel · amplitude · heap       │ [add to list ▾]   │
│                                   │ [view on github]   │
│ ── who is this for ──             │ [copy badge]       │
│ solo dev · small team             │                    │
│                                   │ ── alternatives ── │
│ ── alternatives ──                │ plausible          │
│ [comparison cards]                │ umami              │
│                                   │                    │
│ ── community reviews ──           │                    │
│ [structured review summary]       │                    │
│ [write a review]                  │                    │
└───────────────────────────────────┴────────────────────┘
```

### 6.4 buttons

| variant | background | text | border | use |
|---------|------------|------|--------|-----|
| primary | `--accent` | white | none | main cta |
| secondary | transparent | `--text-primary` | `--border-strong` | secondary actions |
| ghost | transparent | `--text-secondary` | none | tertiary, nav |
| danger | `--error` | white | none | delete, reject |

- height: 36px (default), 32px (small), 44px (large)
- padding: 0 `--space-4`
- font: `--text-sm`, weight 500
- border-radius: `--radius-md`
- all labels lowercase

### 6.5 form inputs

- height: 40px
- background: `--bg-input`
- border: 1px `--border-default`
- focus: border `--border-focus`, ring 2px `--accent-subtle`
- label: `--text-sm`, `--text-secondary`, above input
- error state: border `--error`, helper text in `--error`
- placeholder: `--text-tertiary`

### 6.6 badges (tier indicators)

| tier | color | icon | label |
|------|-------|------|-------|
| listed | `--badge-listed` | circle | listed |
| verified | `--badge-verified` | checkmark | verified |
| featured | `--badge-featured` | star | featured |
| staff pick | `--badge-staff-pick` | sparkle | staff pick |
| sponsored | `--badge-sponsored` | none | sponsored (dashed border) |
| open supporter | `--accent` | heart | open supporter |

badge component:

- display: inline-flex, gap `--space-1`
- padding: 2px `--space-2`
- font: `--text-xs`, weight 500
- border-radius: `--radius-sm`
- background: tier color at 15% opacity
- text: tier color at full opacity

### 6.7 difficulty indicator

5-dot scale using `--diff-1` through `--diff-5`:

```
setup difficulty    ●●○○○  moderate
```

- filled dots: difficulty level color
- empty dots: `--bg-subtle`
- label: text descriptor (trivial · easy · moderate · hard · expert)
- all lowercase labels

### 6.8 maintenance indicator

3-bar signal using semantic colors:

| status | visual | color |
|--------|--------|-------|
| active | ●●● | `--success` |
| slow | ●●○ | `--warning` |
| stale | ●○○ | `--error` |
| archived | ○○○ | `--text-disabled` |

### 6.9 comparison table

| feature | posthog | plausible | umami |
|---------|---------|-----------|-------|
| self-host | yes | yes | yes |
| setup difficulty | ●●○○○ | ●○○○○ | ●○○○○ |
| commercial use | yes | yes | yes |
| event volume free | 1m/mo | unlimited | unlimited |
| verdict | best all-rounder | simplest privacy play | lightest weight |

- zebra striping: alternate `--bg-surface` / `--bg-base`
- sticky first column on mobile scroll
- winner per row: subtle `--accent-subtle` background (not declared "winner" — let data speak)

### 6.10 embeddable project badge

```svg
<!-- listed tier example -->
<svg xmlns="http://www.w3.org/2000/svg" width="200" height="28" role="img">
  <rect width="200" height="28" rx="4" fill="#18181b"/>
  <text x="10" y="19" fill="#a1a1aa" font-family="system-ui" font-size="12">for the open dev</text>
  <text x="130" y="19" fill="#71717a" font-family="system-ui" font-size="12">verified</text>
</svg>
```

full badge specs in BRAND.md §5.

### 6.11 theme toggle button

- 32×32px icon button
- ghost variant
- sun icon in dark mode (click → light), moon icon in light mode (click → dark)
- `aria-label`: "switch to light mode" / "switch to dark mode"

### 6.12 toast notifications

- position: bottom-right, stacked
- background: `--bg-elevated`
- border: `--border-strong`
- shadow: `--shadow-md`
- auto-dismiss: 4 seconds
- lowercase message text

### 6.13 empty states

```
        [illustration]
   no projects in this list yet
   browse tools →
```

- illustration: simple line art, single color `--text-tertiary`
- heading: `--text-lg`
- body: `--text-secondary`
- cta: primary button

---

## 7. iconography

- library: lucide icons (oss, consistent, dev-friendly)
- size: 16px (inline), 20px (buttons), 24px (nav)
- stroke width: 1.5px
- color: inherit from text color
- no filled icons except tier badge icons

---

## 8. motion

| interaction | duration | easing |
|-------------|----------|--------|
| theme switch | 150ms | ease |
| button hover | 100ms | ease |
| card hover (border/shadow) | 150ms | ease |
| modal enter | 200ms | ease-out |
| modal exit | 150ms | ease-in |
| page transition | 0ms | none (v1 — no page animations) |
| drawer slide | 250ms | cubic-bezier(0.16, 1, 0.3, 1) |

**reduced motion:** respect `prefers-reduced-motion: reduce` — disable all transitions.

---

## 9. responsive behavior

### 9.1 mobile (< 640px)

- single column everywhere
- profile sidebar stacks below main content
- comparison tables scroll horizontally
- nav collapses to drawer
- filter bar becomes bottom sheet

### 9.2 tablet (640–1024px)

- 2-column card grid
- profile sidebar below main content
- full nav visible if space allows, otherwise drawer

### 9.3 desktop (> 1024px)

- 3-column card grid
- profile 8+4 column split
- sticky sidebar on profile pages
- full nav with all items

---

## 10. accessibility checklist

- [ ] all interactive elements keyboard-focusable
- [ ] focus ring: 2px `--border-focus` offset 2px
- [ ] color contrast ≥ 4.5:1 for body text (both themes)
- [ ] color contrast ≥ 3:1 for large text and ui components
- [ ] difficulty dots + maintenance bars have text labels (not color-only)
- [ ] images have alt text
- [ ] form inputs have associated labels
- [ ] aria labels on icon-only buttons
- [ ] skip-to-content link
- [ ] semantic html: `<nav>`, `<main>`, `<article>`, `<aside>`

---

## 11. page templates

### 11.1 landing page `/`

```
[nav]
[hero]
  for the open dev
  discover open source worth your time
  [browse tools]  [submit a project]
[featured staff picks — 6 cards]
[latest launches — horizontal scroll]
[categories — 7 tiles: tools, frameworks, models, clis, datasets, mcps, resources]
[indie oss highlight — cap, bruno, plane cards]
[how it works — 3 steps]
[open supporter cta]
[footer]
```

### 11.2 browse page `/tools`

```
[nav]
[page header: tools]
[filter bar: subcategory · self-host · license · difficulty · maintenance]
[sort: relevance · recently added · community score]
[card grid — 3 col desktop]
[pagination]
[footer]
```

### 11.3 launch page `/launches`

```
[nav]
[active launches — vote cards with countdown]
[staff pick highlight — large card]
[upcoming launches — scheduled]
[past launches — archive grid]
[footer]
```

---

## 12. css architecture

### 12.1 file structure

```
styles/
├── tokens.css          /* custom properties, both themes */
├── reset.css           /* minimal reset */
├── typography.css      /* type scale, lowercase rule */
├── layout.css          /* grid, containers, breakpoints */
├── components/
│   ├── nav.css
│   ├── card.css
│   ├── button.css
│   ├── badge.css
│   ├── form.css
│   ├── table.css
│   ├── toast.css
│   └── profile.css
└── utilities.css       /* sr-only, preserve-case, etc. */
```

### 12.2 naming convention

- bem-lite: `.card`, `.card__title`, `.card--featured`
- no css framework in v1 — hand-written css with tokens
- migrate to css modules or tailwind when next.js app layer ships (tokens map 1:1)

---

## 13. design don'ts

| don't | why |
|-------|-----|
| title case anything | breaks brand identity |
| gradient backgrounds | feels generic ai-slop |
| rounded pill buttons everywhere | not dev-tool enough |
| star ratings as primary metric | github stars already exist; we show structured scores |
| popups / interstitials | trust killer |
| auto-playing video | distraction |
| infinite scroll without pagination option | bad for seo and orientation |
| colorful category pages | consistency > color coding |
| emoji in ui copy | undermines precision aesthetic |

---

*see BRAND.md for logo concepts and badge svg specs. see INFORMATION-ARCHITECTURE.md for page inventory and url structure.*