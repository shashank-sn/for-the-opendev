import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dbPath = process.env.DATABASE_URL?.startsWith("file:")
  ? process.env.DATABASE_URL.replace("file:", "")
  : process.env.DATABASE_URL ?? path.join(root, ".data/fortheopen.db");
const sqlPath = path.join(root, "packages/db/drizzle/0000_init.sql");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const client = createClient({ url: `file:${dbPath}` });
const existing = await client.execute("SELECT name FROM sqlite_master WHERE type='table' AND name='user'");
if (existing.rows.length > 0) {
  console.log(`database already initialized at ${dbPath}`);
  process.exit(0);
}

const sql = fs.readFileSync(sqlPath, "utf8");
for (const statement of sql.split(";").map((s) => s.trim()).filter(Boolean)) {
  await client.execute(statement);
}

console.log(`initialized database at ${dbPath}`);