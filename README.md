# for the open dev

[![license: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![sponsor](https://img.shields.io/badge/sponsor-$1%2Fmo-ea4aaa?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/shashank-sn)
[![website](https://img.shields.io/badge/website-fortheopen.dev-indigo)](https://fortheopen.dev)

discover open source worth your time.

→ [fortheopen.dev](https://fortheopen.dev)

a trusted layer for discovering and building with open source — curated profiles, honest verdicts, comparisons, and badges. not another directory.

---

## quick start

```bash
pnpm install
pnpm db:init
pnpm content:generate
pnpm dev
```

open http://localhost:3000

copy `.env.example` to `apps/web/.env.local` and fill oauth secrets for auth.

### deploy to cloudflare (when ready)

1. create a d1 database and paste its id into `apps/web/wrangler.jsonc`
2. set github repo variables: `CLOUDFLARE_DEPLOY_ENABLED=true`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`
3. set github secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `BETTER_AUTH_SECRET`
4. push to `main` — the deploy workflow runs `pnpm --filter @ftod/web build:cloudflare` then `wrangler deploy`

local preview on workers runtime:

```bash
pnpm --filter @ftod/web build:cloudflare
pnpm --filter @ftod/web preview:cloudflare
```

---

## monorepo

```
for-the-opendev/
├── apps/web/           # next.js site
├── packages/
│   ├── auth/           # better-auth config
│   ├── db/             # drizzle schema + d1 migrations
│   └── ui/             # shared components + design tokens
├── content/            # mdx profiles, comparisons, collections
└── scripts/            # content generation
```

---

## sponsor

core discovery is free forever. support the mission on github:

| tier | price | link |
|------|-------|------|
| open supporter | $1/mo | [sponsor](https://github.com/sponsors/shashank-sn/sponsorships?sponsor=open-supporter) |
| builder backer | $5/mo | [sponsor](https://github.com/sponsors/shashank-sn/sponsorships?sponsor=builder-backer) |
| open source sustainer | $100/mo | [sponsor](https://github.com/sponsors/shashank-sn/sponsorships?sponsor=sustainer) |
| custom amount | you choose | [sponsor](https://github.com/sponsors/shashank-sn) |

---

## stack

built entirely on open source:

- [better-auth](https://better-auth.com) — authentication
- next.js — app framework
- cloudflare — hosting (pages + d1)
- pagefind — search
- listmonk — newsletter (self-hosted, env-gated)
- lucide + geist — icons & typography

---

## contributing

contributions welcome. see [CONTRIBUTING.md](CONTRIBUTING.md).

---

## license

MIT — see [LICENSE](LICENSE). editorial content in `/content` is CC-BY-4.0.