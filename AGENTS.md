# Agent instructions — for the open dev

This repo uses [CodeGraph](https://www.npmjs.com/package/@colbymchenry/codegraph) for code intelligence. Treat it as the default way to explore and reason about the codebase.

## CodeGraph — required for code exploration

If `.codegraph/` exists (it should after `pnpm install`), use the CodeGraph MCP tools for **all** structural exploration: search, context, callers/callees, impact, file structure.

| Question | Tool |
|---|---|
| Where is X defined? | `codegraph_search` |
| What calls Y? | `codegraph_callers` |
| What does Y call? | `codegraph_callees` |
| How does X reach Y? | `codegraph_trace` |
| What breaks if I change Z? | `codegraph_impact` |
| Context for a task | `codegraph_context` |
| Several related symbols | `codegraph_explore` |
| Files under a path | `codegraph_files` |
| Index health | `codegraph_status` |

**Rules:**

- Answer exploration questions directly with CodeGraph — do not spawn grep/read sub-agents or long read loops for symbol lookup.
- Use grep/read only for literal text (strings, comments, copy) or when you already have a specific file open.
- After editing code, run `pnpm codegraph:sync` (or wait for git hooks / MCP watcher) before re-querying symbols you just changed.

**Fresh clone:** `pnpm codegraph:init` builds the local index (`.codegraph/codegraph.db` is gitignored).

**No `.codegraph/` yet:** run `pnpm codegraph:init` before exploring — do not ask for permission on agent sessions.

See also `.cursor/rules/codegraph.mdc` and `.claude/CLAUDE.md` for tool-selection detail.

## Project context

- **Product:** curated open-source discovery for indie builders — profiles, comparisons, collections, community layer.
- **Monorepo:** `apps/web` (Next.js on Cloudflare Workers + D1), `packages/*` (ui, auth, db).
- **Content:** `/content` — generated into the app via `pnpm content:generate`.
- **Deploy:** Cloudflare Workers; staging at `fortheopen-dev.emailshashanksn.workers.dev`.
- **Auth email:** Cloudflare Email Service binding (`apps/web/src/lib/email.ts`), not SMTP.

## Before shipping code changes

```bash
pnpm typecheck
pnpm build
pnpm --filter @ftod/web build:cloudflare   # FTOD_DB_DRIVER=d1 in CI
pnpm codegraph:sync
```

Deployments must come from `shashank-sn/for-the-opendev` only.