#!/usr/bin/env node
import { chmodSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { execSync } from "node:child_process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

let gitDir;
try {
  gitDir = execSync("git rev-parse --git-dir", { cwd: root, encoding: "utf8" }).trim();
} catch {
  process.exit(0);
}

const hooksDir = join(root, gitDir === ".git" ? ".git/hooks" : join(gitDir, "hooks"));
const syncScript = join(root, "scripts/codegraph-sync.sh");
const marker = "# codegraph-sync-hook";

const hookBody = `#!/bin/sh
${marker}
cd "${root}" && "${syncScript}"
`;

const hooks = ["post-commit", "post-merge", "post-checkout"];

mkdirSync(hooksDir, { recursive: true });

for (const name of hooks) {
  const path = join(hooksDir, name);
  if (existsSync(path)) {
    const existing = readFileSync(path, "utf8");
    if (existing.includes(marker)) continue;
    if (existing.trim().length > 0) continue;
  }
  writeFileSync(path, hookBody, { mode: 0o755 });
  chmodSync(path, 0o755);
}