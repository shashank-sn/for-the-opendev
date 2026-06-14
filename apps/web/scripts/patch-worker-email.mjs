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

if (source.includes("handleInboundEmail")) {
  console.log("worker already patched for inbound email");
  process.exit(0);
}

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

fs.writeFileSync(workerPath, source);
console.log("patched .open-next/worker.js with inbound email handler");