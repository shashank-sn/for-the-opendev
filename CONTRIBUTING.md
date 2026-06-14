# contributing

thanks for helping build for the open dev.

## ways to contribute

- **profiles** — improve editorial copy in `/content/projects`
- **comparisons** — add or refine `/content/comparisons`
- **code** — site features, ui components
- **issues** — report bugs or suggest projects via github issues

## development

```bash
pnpm install
pnpm codegraph:init    # builds local CodeGraph index (one-time per clone)
pnpm content:generate
pnpm dev
```

### codegraph (default for agents & local dev)

we index the repo with [codegraph](https://www.npmjs.com/package/@colbymchenry/codegraph). the sqlite db in `.codegraph/` is gitignored. each machine builds its own.

- agents: use codegraph mcp tools for exploration (see `AGENTS.md`). cursor/claude configs live in `.cursor/` and `.mcp.json`.
- after code changes: `pnpm codegraph:sync`. git hooks install on `pnpm install` (`post-commit`, `post-merge`, `post-checkout`).
- check index: `pnpm codegraph:status`

run `pnpm typecheck`, `pnpm build`, and `pnpm codegraph:sync` before opening a pr.

### voice (prose)

user-facing copy and docs should sound like shashank wrote them. run `hyv scan` / `hyv rewrite` with profile `shashank` before you open a pr that touches prose.

### deploy to github pages

the site is a **static export** deployed from `main` via `.github/workflows/pages.yml`.

1. push to `main` — ci builds `apps/web/out` and deploy-pages publishes it
2. in repo **settings → pages**, source should be **github actions**
3. custom domain `fortheopen.dev` is set via `apps/web/public/CNAME` — point dns at github pages (see github docs)

local preview after build:

```bash
pnpm build
npx serve apps/web/out
```

**sponsor tier links:** edit `apps/web/src/lib/sponsors.ts` — after creating $1/$5/$100 tiers in [GitHub Sponsors](https://github.com/sponsors/shashank-sn), paste each tier's `tier_id` from the dashboard share link into `githubTierId` for direct checkout urls.

**supporter wall:** edit `apps/web/data/supporters.json` when sponsors change (or automate in ci from github sponsors api later).

### analytics (plausible)

optional. set `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` and `NEXT_PUBLIC_PLAUSIBLE_SCRIPT_URL` at build time. the script tag in `layout.tsx` works on static pages — use your plausible instance dashboard directly for stats.

## code of conduct

see [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).