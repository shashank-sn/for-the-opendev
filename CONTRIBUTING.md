# contributing

thanks for helping build for the open dev.

## ways to contribute

- **profiles** — improve editorial copy in `/content/projects`
- **comparisons** — add or refine `/content/comparisons`
- **code** — site features, api routes, ui components
- **issues** — report bugs or suggest projects via github issues

## development

```bash
pnpm install
pnpm codegraph:init    # builds local CodeGraph index (one-time per clone)
pnpm db:init
pnpm content:generate
pnpm dev
```

### codegraph (default for agents & local dev)

we index the repo with [codegraph](https://www.npmjs.com/package/@colbymchenry/codegraph). the sqlite db in `.codegraph/` is gitignored. each machine builds its own.

- agents: use codegraph mcp tools for exploration (see `AGENTS.md`). cursor/claude configs live in `.cursor/` and `.mcp.json`.
- after code changes: `pnpm codegraph:sync`. git hooks install on `pnpm install` (`post-commit`, `post-merge`, `post-checkout`).
- check index: `pnpm codegraph:status`

run `pnpm typecheck`, `pnpm build`, `pnpm codegraph:sync`, and `pnpm --filter @ftod/web build:cloudflare` (with `FTOD_DB_DRIVER=d1`) before opening a pr.

### voice (prose)

user-facing copy and docs should sound like shashank wrote them. run `hyv scan` / `hyv rewrite` with profile `shashank` before you open a pr that touches prose.

copy `.env.example` to `apps/web/.env.local` and fill oauth secrets for auth.

### deploy to cloudflare

1. create a d1 database and paste its id into `apps/web/wrangler.jsonc`
2. set github repo variables: `CLOUDFLARE_DEPLOY_ENABLED=true`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`
3. set github secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `BETTER_AUTH_SECRET`
4. push to `main` or run the **deploy** workflow manually — deploy is skipped until `CLOUDFLARE_DEPLOY_ENABLED=true`; then it runs `pnpm --filter @ftod/web build:cloudflare` and `wrangler deploy`

**staging worker (live):** https://fortheopen-dev.emailshashanksn.workers.dev — d1 id is committed in `apps/web/wrangler.jsonc`. point `fortheopen.dev` dns at this worker when ready.

**sponsor tier links:** edit `apps/web/src/lib/sponsors.ts` — after creating $1/$5/$100 tiers in [GitHub Sponsors](https://github.com/sponsors/shashank-sn), paste each tier's `tier_id` from the dashboard share link into `githubTierId` for direct checkout urls.

### email (cloudflare)

transactional email (magic links, future notifications) uses **cloudflare email service** via the worker `EMAIL` binding — not smtp.

1. add `fortheopen.dev` to cloudflare dns
2. enable sending: `wrangler email sending enable fortheopen.dev`
3. optional routing for `hello@` / `security@`: `wrangler email routing enable fortheopen.dev`
4. set `EMAIL_FROM`, `EMAIL_FROM_NAME`, `EMAIL_REPLY_TO` in `apps/web/wrangler.jsonc` vars (or worker secrets)
5. redeploy — better-auth magic links send through `apps/web/src/lib/email.ts`

local dev without a worker: set `CLOUDFLARE_ACCOUNT_ID` + `CLOUDFLARE_API_TOKEN` in `apps/web/.env.local` for REST api fallback, or watch console for logged magic-link urls.

local workers preview:

```bash
pnpm --filter @ftod/web build:cloudflare
pnpm --filter @ftod/web preview:cloudflare
```

## code of conduct

see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## license

by contributing, you agree your contributions are licensed under the project MIT license.