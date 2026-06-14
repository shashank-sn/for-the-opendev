# open source stack policy

**product:** for the open dev  
**version:** 1.0  

---

## 1. principle

for the open dev is an open source product that only builds on open source. every dependency, tool, font, and service we **control** must be oss-licensed and self-hostable where possible.

we eat our own cooking: if we list it for others, we should be willing to run it ourselves.

---

## 2. our public repository

| item | value |
|------|-------|
| org | `fortheopendev` |
| repo | `for-the-opendev` (monorepo — site + docs + content) |
| license | **MIT** |
| visibility | public |
| sponsorship | github sponsors on the repo (see MONETIZATION.md) |
| url | https://github.com/shashank-sn/for-the-opendev |

### repo contents

```
for-the-opendev/
├── LICENSE                 # MIT
├── README.md               # project overview + sponsor ctas
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── .github/
│   ├── FUNDING.yml         # github sponsors tiers
│   ├── workflows/          # ci/cd
│   └── ISSUE_TEMPLATE/
├── apps/
│   └── web/                # next.js site
├── packages/
│   ├── auth/               # better-auth config
│   ├── db/                 # schema + migrations
│   └── ui/                 # shared components
├── content/                # mdx profiles (version-controlled editorial)
├── docs/                   # internal specs (synced from planning docs)
└── scripts/
```

### FUNDING.yml (required before repo goes public)

```yaml
# enables sponsor button on repo — https://github.com/sponsors/shashank-sn
github: shashank-sn
custom:
  - https://fortheopen.dev/supporters
```

sponsors profile is live. tiers ($1/$5/$100) must be created in dashboard before tier-specific urls work.

---

## 3. approved stack (what we run)

| layer | choice | license | oss? |
|-------|--------|---------|------|
| **auth** | [better-auth](https://better-auth.com) | MIT | ✓ |
| **framework** | next.js (app router) | MIT | ✓ |
| **database** | sqlite via d1 / libsql | open format | ✓ |
| **orm** | drizzle orm | Apache-2.0 | ✓ |
| **hosting** | cloudflare pages + workers | proprietary platform | hosting only* |
| **search** | pagefind | MIT | ✓ |
| **analytics** | self-hosted umami or plausible | MIT / AGPL | ✓ |
| **fonts** | geist sans + mono | OFL-1.1 | ✓ |
| **icons** | lucide | ISC | ✓ |
| **css** | hand-written tokens (no tailwind dep required v1) | — | ✓ |
| **email (auth)** | better-auth + smtp to self-hosted mail (stalwart/postal) or oss transactional | varies | ✓ |
| **newsletter** | listmonk (self-hosted) | AGPL-3.0 | ✓ |
| **payments** | github sponsors | — | sponsorship rail** |
| **ci/cd** | github actions | — | ✓ |
| **content** | mdx + git | — | ✓ |
| **badge svgs** | hand-generated, no third-party service | — | ✓ |

\*cloudflare is a hosting platform, not a product dependency. no proprietary sdk required beyond open standards (workers, fetch, sql).

\*\*github sponsors is the primary supporter rail — no stripe required for the three tiers.

### explicitly banned (for product dependencies)

| banned | reason | alternative |
|--------|--------|-------------|
| auth0, clerk, supabase auth (hosted) | proprietary saas auth | better-auth (self-hosted) |
| nextauth with proprietary adapters only | prefer unified oss path | better-auth |
| google analytics | closed source tracking | umami / plausible (self-hosted) |
| intercom, crisp | closed chat | (none v1 — github issues for support) |
| vercel analytics (hosted) | closed | umami |
| stripe for supporter tiers | user chose github sponsors | github sponsors |
| sentry (saas) | closed default | glitchtip (self-hosted) if error tracking needed |
| resend, postmark | proprietary email api | smtp + stalwart or listmonk |
| font awesome pro | proprietary | lucide |
| any "awesome list only" repo as a dependency | not software | — |

---

## 4. better-auth integration

we use better-auth for **all** authentication ui and flows.

| feature | better-auth plugin / config |
|---------|----------------------------|
| email + password | `emailAndPassword: { enabled: true }` |
| magic link | magic link plugin |
| google oauth | `socialProviders.google` |
| github oauth | `socialProviders.github` |
| sessions | built-in |
| user profile fields | `username`, `bio`, `supporterTier` (custom field) |
| login modal | better-auth client + custom styled modal (design system tokens) |
| signup modal | same component, mode toggle |

### config sketch

```typescript
import { betterAuth } from "better-auth"

export const auth = betterAuth({
  database: drizzleAdapter(db),
  emailAndPassword: { enabled: true },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
    },
  },
  plugins: [
    magicLink(),
    username(),
  ],
})
```

### ui requirements

- login/signup modals use design system tokens (lowercase labels)
- buttons: "continue with github", "continue with google", "continue with email"
- no proprietary auth widget skins
- reference: https://better-auth.com/docs

### catalog listing

better-auth is in the **launch 100** under frameworks. we use it and we list it — with honest verdict copy.

---

## 5. dependency review process

before adding any npm/cargo/go dependency:

1. check license — must be osi-approved
2. check if self-hostable alternative exists for saas wrappers
3. add to `docs/dependencies.md` in the repo with license + purpose
4. run `license-checker` or `pnpm licenses list` in ci

ci fails if a non-osi license appears in production dependencies.

---

## 6. catalog integrity rule

we only list projects with verified oss licenses on github. we apply the same standard to ourselves:

- the for-the-opendev repo is public at https://github.com/shashank-sn/for-the-opendev
- license file in root
- no proprietary blobs in the repo
- sponsor tiers via github sponsors, documented in readme

---

## 7. dogfooding map

tools we list that we also run (target state):

| we list | we use it for |
|---------|---------------|
| better-auth | authentication |
| umami or plausible | analytics |
| listmonk | newsletter |
| coolify or cloudflare pages | deployment |
| lucide | icons |
| geist | typography |
| pagefind | search |
| cap | (optional) product demos |

---

*see MONETIZATION.md for sponsorship tiers. see PRD.md §10 for technical architecture.*