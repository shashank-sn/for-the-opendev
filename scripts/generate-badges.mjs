import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "content/catalog.json"), "utf8"));
const outDir = path.join(root, "apps/web/public/badges");

fs.mkdirSync(outDir, { recursive: true });

for (const project of catalog.projects) {
  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="28" role="img" aria-label="listed on for the open dev">
  <rect width="240" height="28" rx="6" fill="#18181b"/>
  <rect x="0.5" y="0.5" width="239" height="27" rx="5.5" fill="none" stroke="#27272a"/>
  <circle cx="14" cy="14" r="5" fill="#6366f1"/>
  <text x="26" y="18" fill="#fafafa" font-family="system-ui,sans-serif" font-size="12" text-transform="none">${project.name} · for the open dev</text>
</svg>`;
  fs.writeFileSync(path.join(outDir, `${project.slug}.svg`), svg);
}

console.log(`generated ${catalog.projects.length} badge svgs → apps/web/public/badges/`);