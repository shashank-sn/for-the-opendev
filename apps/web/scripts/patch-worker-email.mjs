import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const workerPath = path.join(root, ".open-next/worker.js");

if (!fs.existsSync(workerPath)) {
  console.error("missing .open-next/worker.js — run opennextjs-cloudflare build first");
  process.exit(1);
}

let source = fs.readFileSync(workerPath, "utf8");
let changed = false;

if (!source.includes("handleInboundEmail")) {
  source = source.replace(
    'import { handler as middlewareHandler } from "./middleware/handler.mjs";',
    'import { handler as middlewareHandler } from "./middleware/handler.mjs";\n//@ts-expect-error: patched for email routing\nimport { handleInboundEmail } from "./cloudflare/email-inbound.mjs";',
  );

  source = source.replace(
    /export default \{\s*\n\s*async fetch\(request, env, ctx\) \{/,
    `export default {
    async email(message, env, ctx) {
        ctx.waitUntil(handleInboundEmail(message, env));
    },
    async fetch(request, env, ctx) {`,
  );

  const targetDir = path.join(root, ".open-next/cloudflare");
  fs.mkdirSync(targetDir, { recursive: true });
  fs.copyFileSync(
    path.join(root, "cloudflare/email-inbound.mjs"),
    path.join(targetDir, "email-inbound.mjs"),
  );
  changed = true;
}

if (!source.includes("sync-sponsors cron")) {
  source = source.replace(
    /export default \{\s*\n(\s*async email\(message, env, ctx\) \{[\s\S]*?\n\s*\},)?\s*\n\s*async fetch\(request, env, ctx\) \{/,
    (match) =>
      match.replace(
        "async fetch(request, env, ctx) {",
        `async scheduled(event, env, ctx) {
        const base = env.NEXT_PUBLIC_SITE_URL ?? "https://fortheopen-dev.emailshashanksn.workers.dev";
        const headers = {};
        if (env.CRON_SECRET) headers.authorization = \`Bearer \${env.CRON_SECRET}\`;
        ctx.waitUntil(fetch(\`\${base}/api/cron/sync-sponsors\`, { headers }));
    },
    async fetch(request, env, ctx) {`,
      ),
  );
  changed = true;
}

if (changed) {
  fs.writeFileSync(workerPath, source);
  console.log("patched .open-next/worker.js (email + cron)");
} else {
  console.log("worker already patched");
}