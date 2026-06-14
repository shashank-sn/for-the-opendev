# agent instructions — for the open dev

codegraph is how you read this repo. structural questions go through it first.

## codegraph (required)

after `pnpm install`, `.codegraph/` should exist locally. use the codegraph mcp tools for anything about symbols, call paths, or file structure.

| question | tool |
|---|---|
| where is X defined? | `codegraph_search` |
| what calls Y? | `codegraph_callers` |
| what does Y call? | `codegraph_callees` |
| how does X reach Y? | `codegraph_trace` |
| what breaks if I change Z? | `codegraph_impact` |
| context for a task | `codegraph_context` |
| several related symbols | `codegraph_explore` |
| files under a path | `codegraph_files` |
| index health | `codegraph_status` |

rules:

- answer exploration with codegraph directly. don't spin up grep/read sub-agents to find a function name.
- grep/read is for literal text: strings, comments, copy, log lines. or when you already have the file open.
- edited code? run `pnpm codegraph:sync` (or wait for git hooks / the mcp watcher) before you query symbols you just touched.

fresh clone: `pnpm codegraph:init` builds the local index. `.codegraph/codegraph.db` stays gitignored.

no `.codegraph/` yet: run `pnpm codegraph:init` before exploring. agent sessions shouldn't pause to ask.

tool pickers live in `.cursor/rules/codegraph.mdc` and `.claude/CLAUDE.md`.

## project context

- product: curated open-source discovery for indie builders. profiles, comparisons, collections, community layer.
- monorepo: `apps/web` (next.js on cloudflare workers + d1), `packages/*` (ui, auth, db).
- content: `/content`, generated via `pnpm content:generate`.
- deploy: cloudflare workers. staging at `fortheopen-dev.emailshashanksn.workers.dev`.
- email: all mail via cloudflare (send + route). stored in sql `emails` table. see `apps/web/src/lib/email.ts` and `apps/web/cloudflare/email-inbound.mjs`.
- analytics: self-hosted plausible script + `/analytics` dashboard (password-only). stats api proxied in `apps/web/src/lib/plausible.ts`.

## before you ship

```bash
pnpm typecheck
pnpm build
pnpm --filter @ftod/web build:cloudflare   # FTOD_DB_DRIVER=d1 in CI
pnpm codegraph:sync
```

deployments ship from `shashank-sn/for-the-opendev` only.

## voice (prose)

editorial copy, docs, and user-facing text in this repo should match shashank's voice profile. run hyv scan/rewrite before shipping prose. profile: `shashank` (hold your voice).