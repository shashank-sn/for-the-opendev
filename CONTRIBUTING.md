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
pnpm db:init
pnpm content:generate
pnpm dev
```

run `pnpm typecheck`, `pnpm build`, and `pnpm --filter @ftod/web build:cloudflare` (with `FTOD_DB_DRIVER=d1`) before opening a pr.

copy `.env.example` to `apps/web/.env.local` and fill oauth secrets for auth.

### deploy to cloudflare

1. create a d1 database and paste its id into `apps/web/wrangler.jsonc`
2. set github repo variables: `CLOUDFLARE_DEPLOY_ENABLED=true`, `BETTER_AUTH_URL`, `NEXT_PUBLIC_SITE_URL`
3. set github secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`, `BETTER_AUTH_SECRET`
4. push to `main` or run the **deploy** workflow manually — deploy is skipped until `CLOUDFLARE_DEPLOY_ENABLED=true`; then it runs `pnpm --filter @ftod/web build:cloudflare` and `wrangler deploy`

local workers preview:

```bash
pnpm --filter @ftod/web build:cloudflare
pnpm --filter @ftod/web preview:cloudflare
```

## code of conduct

see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

## license

by contributing, you agree your contributions are licensed under the project MIT license.