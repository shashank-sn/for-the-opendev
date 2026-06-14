# information architecture

**product:** for the open dev  
**version:** 1.1  

---

## 1. top-level taxonomy

seven primary categories. every project belongs to exactly one.

| category | slug | definition | examples |
|----------|------|------------|----------|
| tools | `/tools` | adoptable software products — install, self-host, or run | cap, posthog, coolify, bruno |
| frameworks | `/frameworks` | libraries and frameworks you build applications with | next.js, fastapi, tauri |
| models | `/models` | model weights, architectures, fine-tunes | llama 3, flux.1, whisper |
| resources | `/resources` | specs, fonts, icons, guides, standards, starters | lucide, mdn, semver |
| clis | `/clis` | command-line tools for the terminal | ripgrep, fzf, atuin, lazygit |
| datasets | `/datasets` | open datasets for training, fine-tuning, eval, rag | fine-web, common voice, coco |
| mcps | `/mcps` | model context protocol servers for ai agents | github mcp, filesystem, playwright |

### cross-cutting tags

not categories — filter metadata on any entry:

| tag | slug | use |
|-----|------|-----|
| indie oss | `indie-oss` | cap, plane, bruno, documenso |
| creator tools | `creator-tools` | cap, penpot, excalidraw, ghost |
| ai native | `ai-native` | open webui, ollama, langfuse |
| replaces saas | `replaces-saas` | high-intent "alternative to X" pages |
| self host | `self-host` | runs on your infrastructure |

### 1.1 subcategory taxonomy

#### tools

| subcategory | slug |
|-------------|------|
| analytics | `analytics` |
| authentication & identity | `auth` |
| backend & database | `backend` |
| cms & publishing | `cms` |
| communication & chat | `communication` |
| design & creative | `design` |
| devtools & ci/cd | `devtools` |
| finance & budgeting | `finance` |
| home automation | `home-automation` |
| media & streaming | `media` |
| monitoring & observability | `monitoring` |
| productivity & project management | `productivity` |
| search | `search` |
| security & privacy | `security` |
| self-hosting & infrastructure | `self-hosting` |
| storage & files | `storage` |
| surveys & forms | `surveys` |
| workflow automation | `automation` |

#### frameworks

| subcategory | slug |
|-------------|------|
| web frontend | `web-frontend` |
| web backend | `web-backend` |
| full-stack | `full-stack` |
| mobile | `mobile` |
| desktop | `desktop` |
| css & styling | `css` |
| orm & database | `orm` |
| api & rpc | `api` |
| ai & ml framework | `ai-ml` |
| runtime & toolchain | `runtime` |
| testing | `testing` |
| ui components | `ui-components` |

#### models

| subcategory | slug |
|-------------|------|
| large language model | `llm` |
| code model | `code` |
| embedding model | `embedding` |
| image generation | `image-gen` |
| speech & audio | `speech` |
| vision & multimodal | `vision` |
| object detection | `detection` |
| music & audio generation | `music` |
| fine-tuned variant | `fine-tuned` |

#### resources

| subcategory | slug |
|-------------|------|
| icon set | `icons` |
| font | `fonts` |
| ui kit & design system | `ui-kit` |
| specification & standard | `spec` |
| documentation | `docs` |
| starter template | `starter` |
| license & legal | `legal` |
| best practices guide | `guide` |

#### clis

| subcategory | slug |
|-------------|------|
| search & find | `search` |
| file navigation | `file-nav` |
| git | `git` |
| shell & prompt | `shell` |
| runtime manager | `runtime-manager` |
| http client | `http-client` |
| container & k8s | `containers` |
| task runner | `task-runner` |
| editor (terminal) | `terminal-editor` |
| benchmarking | `benchmarking` |
| scripting & ui | `scripting` |

#### datasets

| subcategory | slug |
|-------------|------|
| text corpus | `text-corpus` |
| code corpus | `code-corpus` |
| speech & audio | `speech` |
| vision & image | `vision` |
| instruction tuning | `instruction` |
| retrieval & qa | `retrieval` |
| evaluation benchmark | `eval` |
| multimodal | `multimodal` |

#### mcps

| subcategory | slug |
|-------------|------|
| core (filesystem, fetch) | `core` |
| devtools (github, gitlab) | `devtools` |
| database | `database` |
| browser automation | `browser` |
| search | `search` |
| productivity | `productivity` |
| infrastructure | `infrastructure` |
| payments & billing | `payments` |
| monitoring | `monitoring` |

---

## 2. url structure

all paths lowercase. no trailing slashes (redirect if present).

### 2.1 public routes

```
/                                    home
/about                               mission & editorial policy
/supporters                          open supporter wall
/submit                              submission guidelines

/tools                               browse tools
/tools/{slug}                        tool profile
/frameworks                          browse frameworks
/frameworks/{slug}                   framework profile
/models                              browse models
/models/{slug}                       model profile
/resources                           browse resources
/resources/{slug}                    resource profile
/clis                                browse clis
/clis/{slug}                         cli profile
/datasets                            browse datasets
/datasets/{slug}                     dataset profile
/mcps                                browse mcps
/mcps/{slug}                         mcp profile

/tags/{tag}                          cross-cutting tag browse (e.g. indie-oss)
/replace/{saas}                      "replace loom" style landing pages

/compare/{slug}                      comparison page
/collections                         all collections
/collections/{slug}                  editorial collection
/guides/{slug}                       adoption guide

/launches                            launch platform
/launches/{slug}                     individual launch

/search                              search results
/search?q={query}&category={cat}     parameterized search

/login                               authentication
/login/callback                      oauth callback
```

### 2.2 user routes

```
/dashboard                           user home (lists, submissions, reviews)
/dashboard/lists                     all lists
/dashboard/lists/{id}                edit list
/dashboard/submissions               track submissions
/dashboard/submissions/{id}          submission detail
/dashboard/reviews                   my reviews
/dashboard/settings                  account settings
/dashboard/supporter                 manage open supporter subscription

/u/{username}                        public profile
/u/{username}/{list-slug}            public list
```

### 2.3 admin routes

```
/admin                               admin dashboard
/admin/submissions                   review queue
/admin/submissions/{id}              review detail
/admin/editorial                     profile & comparison editor
/admin/editorial/profiles/{slug}     edit profile
/admin/editorial/compare/{slug}      edit comparison
/admin/launches                      launch schedule
/admin/moderation                    flagged reviews
/admin/badges                        badge management
```

### 2.4 api routes

```
/api/auth/*                          authentication endpoints
/api/projects                        list / search projects (public)
/api/projects/{slug}                 single project (public)
/api/lists                           user list crud
/api/lists/{id}/items                list items
/api/reviews                         create / edit reviews
/api/submissions                     submit project
/api/votes                           launch votes
/api/badge/{slug}/{tier}.svg         badge svg generator
/api/github/verify                   verify repo + license
/api/webhooks/stripe                 supporter payments
```

### 2.5 canonical url pattern

project profiles: `https://fortheopen.dev/{category}/{slug}`

examples:
- `https://fortheopen.dev/tools/posthog`
- `https://fortheopen.dev/frameworks/nextjs`
- `https://fortheopen.dev/models/llama-3`
- `https://fortheopen.dev/resources/lucide`

---

## 3. navigation structure

### 3.1 primary nav

```
[logo] for the open dev | tools | frameworks | models | clis | datasets | mcps | resources | launches | search | [theme] | [login/avatar]

mobile nav groups secondary categories under "more" if width constrained.
```

### 3.2 footer nav

```
discover          contribute        community         legal
├ tools           ├ submit          ├ supporters      ├ privacy
├ frameworks      ├ badge docs      ├ about           ├ terms
├ models          ├ editorial       ├ github          ├ editorial policy
├ resources       │   policy        ├ newsletter      └ license (platform)
├ launches        └ launch guide
├ collections
└ search
```

### 3.3 breadcrumbs

every page below home shows breadcrumbs:

```
tools / analytics / posthog
compare / self-hosted analytics
collections / replace-notion
u / alex / my-homelab-stack
```

---

## 4. data model

### 4.1 entity relationship diagram

```
users ──┬── lists ──── list_items ──── projects
        ├── reviews ────────────────── projects
        ├── submissions ────────────── projects
        ├── votes ──────────────────── launches
        └── supporter_subscriptions

projects ──┬── project_metadata (github cache)
           ├── project_profiles (editorial content)
           ├── badge_tier
           └── earned_badges[]

launches ──── projects
comparisons ── projects[] (2-4 per comparison)
collections ── projects[] (ordered)
```

### 4.2 database schema (d1 / sqlite)

#### users

```sql
CREATE TABLE users (
  id            TEXT PRIMARY KEY,
  email         TEXT UNIQUE,
  username      TEXT UNIQUE,
  display_name  TEXT,
  avatar_url    TEXT,
  github_id     TEXT UNIQUE,
  google_id     TEXT UNIQUE,
  bio           TEXT,
  is_supporter  BOOLEAN DEFAULT FALSE,
  supporter_since DATE,
  is_admin      BOOLEAN DEFAULT FALSE,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### projects

```sql
CREATE TABLE projects (
  id              TEXT PRIMARY KEY,
  slug            TEXT UNIQUE NOT NULL,
  name            TEXT NOT NULL,
  tagline         TEXT,
  category        TEXT NOT NULL CHECK (category IN ('tool','framework','model','resource','cli','dataset','mcp')),
  subcategories   TEXT, -- json array
  tags            TEXT, -- json array: indie-oss, creator-tools, ai-native, etc.
  github_url      TEXT NOT NULL UNIQUE,
  github_owner    TEXT,
  github_repo     TEXT,
  license         TEXT,
  license_verified BOOLEAN DEFAULT FALSE,
  stars           INTEGER DEFAULT 0,
  last_commit     DATE,
  languages       TEXT, -- json array
  maintenance_status TEXT CHECK (maintenance_status IN ('active','slow','stale','archived')),
  badge_tier      TEXT DEFAULT 'listed' CHECK (badge_tier IN ('listed','verified','featured','staff_pick')),
  earned_badges   TEXT, -- json array
  staff_pick      BOOLEAN DEFAULT FALSE,
  sponsored       BOOLEAN DEFAULT FALSE,
  status          TEXT DEFAULT 'draft' CHECK (status IN ('draft','submitted','in_review','published','rejected')),
  submitted_by    TEXT REFERENCES users(id),
  reviewed_by     TEXT REFERENCES users(id),
  published_at    DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### project_profiles

```sql
CREATE TABLE project_profiles (
  project_id        TEXT PRIMARY KEY REFERENCES projects(id),
  replaces          TEXT, -- json array of strings
  audience          TEXT, -- json array
  setup_difficulty  INTEGER CHECK (setup_difficulty BETWEEN 1 AND 5),
  self_hostable     TEXT CHECK (self_hostable IN ('yes','partial','no')),
  commercial_use    TEXT CHECK (commercial_use IN ('yes','with-conditions','no')),
  commercial_notes  TEXT,
  alternatives      TEXT, -- json array of project slugs
  verdict           TEXT, -- markdown
  verdict_skip_if   TEXT,
  docker_support    BOOLEAN,
  docker_oneliner   TEXT,
  install_time      TEXT,
  tutorial_links    TEXT, -- json array of {title, url}
  funding_model     TEXT,
  screenshots       TEXT, -- json array of urls
  -- category-specific (nullable, json)
  cli_install       TEXT, -- {brew,cargo,npm,apt} commands
  dataset_size      TEXT,
  dataset_format    TEXT,
  dataset_download  TEXT,
  mcp_transport     TEXT, -- stdio, sse
  mcp_tools         TEXT, -- json array of tool names
  mcp_hosts         TEXT, -- compatible clients
  updated_at        DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### reviews

```sql
CREATE TABLE reviews (
  id                    TEXT PRIMARY KEY,
  project_id            TEXT REFERENCES projects(id),
  user_id               TEXT REFERENCES users(id),
  setup_ease            INTEGER CHECK (setup_ease BETWEEN 1 AND 5),
  documentation_quality INTEGER CHECK (documentation_quality BETWEEN 1 AND 5),
  maintenance_confidence INTEGER CHECK (maintenance_confidence BETWEEN 1 AND 5),
  would_recommend       TEXT CHECK (would_recommend IN ('yes','maybe','no')),
  body                  TEXT,
  is_flagged            BOOLEAN DEFAULT FALSE,
  created_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at            DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(project_id, user_id)
);
```

#### lists

```sql
CREATE TABLE lists (
  id          TEXT PRIMARY KEY,
  user_id     TEXT REFERENCES users(id),
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL,
  description TEXT,
  is_public   BOOLEAN DEFAULT FALSE,
  is_template BOOLEAN DEFAULT FALSE,
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(user_id, slug)
);

CREATE TABLE list_items (
  id          TEXT PRIMARY KEY,
  list_id     TEXT REFERENCES lists(id) ON DELETE CASCADE,
  project_id  TEXT REFERENCES projects(id),
  note        TEXT,
  position    INTEGER,
  added_at    DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(list_id, project_id)
);

CREATE TABLE list_collaborators (
  list_id     TEXT REFERENCES lists(id) ON DELETE CASCADE,
  user_id     TEXT REFERENCES users(id),
  role        TEXT CHECK (role IN ('viewer','editor')),
  invited_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (list_id, user_id)
);
```

#### submissions

```sql
CREATE TABLE submissions (
  id              TEXT PRIMARY KEY,
  project_id      TEXT REFERENCES projects(id),
  submitted_by    TEXT REFERENCES users(id),
  github_url      TEXT NOT NULL,
  is_maintainer   BOOLEAN,
  notes           TEXT,
  status          TEXT DEFAULT 'submitted',
  reviewer_notes  TEXT,
  reviewed_at     DATETIME,
  created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### launches

```sql
CREATE TABLE launches (
  id            TEXT PRIMARY KEY,
  project_id    TEXT REFERENCES projects(id),
  slug          TEXT UNIQUE,
  tagline       TEXT,
  scheduled_at  DATETIME NOT NULL,
  ends_at       DATETIME NOT NULL,
  is_staff_pick BOOLEAN DEFAULT FALSE,
  is_sponsored  BOOLEAN DEFAULT FALSE,
  vote_count    INTEGER DEFAULT 0,
  status        TEXT CHECK (status IN ('scheduled','active','ended')),
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE votes (
  id          TEXT PRIMARY KEY,
  launch_id   TEXT REFERENCES launches(id),
  user_id     TEXT REFERENCES users(id),
  created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(launch_id, user_id)
);
```

#### comparisons

```sql
CREATE TABLE comparisons (
  id            TEXT PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  project_slugs TEXT NOT NULL, -- json array, 2-4 slugs
  body          TEXT NOT NULL, -- markdown
  author_id     TEXT REFERENCES users(id),
  last_reviewed DATE,
  published_at  DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### collections

```sql
CREATE TABLE collections (
  id            TEXT PRIMARY KEY,
  slug          TEXT UNIQUE NOT NULL,
  title         TEXT NOT NULL,
  description   TEXT,
  project_slugs TEXT NOT NULL, -- json ordered array
  body          TEXT, -- markdown guide
  author_id     TEXT REFERENCES users(id),
  published_at  DATETIME,
  created_at    DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5. search architecture

### 5.1 v1: pagefind (static)

- index built at deploy time from published profiles, comparisons, collections
- client-side search, no server cost
- supports category filter via metadata tags
- instant results as user types

### 5.2 v2: typesense (when catalog > 500)

- server-side search with faceted filtering
- indexes: projects, comparisons, collections, lists (public)
- facets: category, subcategory, license, self_hostable, setup_difficulty, badge_tier, maintenance_status

### 5.3 search ranking signals

| signal | weight |
|--------|--------|
| text relevance | high |
| badge tier (staff pick > featured > verified > listed) | medium |
| community review score | medium |
| maintenance status (active preferred) | low |
| github stars | none (displayed, not ranked by) |

---

## 6. content storage

### 6.1 editorial content (git-backed)

profiles, comparisons, and collections are authored as mdx files in the repo:

```
content/
├── tools/
│   ├── posthog.mdx
│   ├── plausible.mdx
│   └── ...
├── frameworks/
│   ├── nextjs.mdx
│   └── ...
├── models/
│   ├── llama-3.mdx
│   └── ...
├── resources/
│   ├── lucide.mdx
│   └── ...
├── compare/
│   ├── self-hosted-analytics.mdx
│   └── ...
└── collections/
    ├── replace-notion.mdx
    └── ...
```

mdx frontmatter maps to database fields. build step syncs to d1.

### 6.2 dynamic content (database)

users, lists, reviews, submissions, votes, launches — all in d1.

---

## 7. github integration

### 7.1 metadata sync

daily cron worker fetches for each published project:

```
GET /repos/{owner}/{repo}
→ stars, last_push, license, languages, archived status

GET /repos/{owner}/{repo}/commits?per_page=1
→ last commit date
```

### 7.2 submission verification

on submit:

1. parse github url → owner/repo
2. fetch repo metadata
3. check license against allowlist
4. check: not archived, has readme, minimum activity
5. return pass/fail with reasons

### 7.3 rate limiting

- authenticated github token (5000 req/hr)
- cache responses 24hr
- batch cron processes all projects over 1 hour window

---

## 8. filtering & sorting

### 8.1 browse page filters

| filter | type | options |
|--------|------|---------|
| subcategory | multi-select | from taxonomy |
| self-hostable | toggle | yes · partial · no |
| license | multi-select | mit, apache-2.0, gpl-3.0, etc. |
| setup difficulty | range | 1–5 |
| maintenance | multi-select | active · slow · stale |
| badge tier | multi-select | listed · verified · featured · staff pick |
| commercial use | toggle | yes · with-conditions |

### 8.2 sort options

| sort | logic |
|------|-------|
| relevance | search score or editorial order |
| recently added | `published_at` desc |
| recently updated | `updated_at` desc |
| community score | avg review score desc |
| name | alphabetical |

---

## 9. seo & structured data

### 9.1 meta templates

```
project:  "{name} — {tagline} · {category} · for the open dev"
compare:  "{title} — comparison · for the open dev"
collection: "{title} — collection · for the open dev"
list:     "{title} by {username} · for the open dev"
```

all lowercase except `.preserve-case` project names.

### 9.2 json-ld per page type

- **project:** `SoftwareApplication` + `AggregateRating` (if reviews exist)
- **comparison:** `FAQPage`
- **collection:** `ItemList`
- **all pages:** `BreadcrumbList`, `WebSite` with `SearchAction`

---

*see USER-FLOWS.md for interaction flows. see LAUNCH-CATALOG.md for the initial 100 projects.*