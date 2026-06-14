import fs from "node:fs";
import path from "node:path";
import { createClient } from "@libsql/client";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const dbPath = process.env.DATABASE_URL?.startsWith("file:")
  ? process.env.DATABASE_URL.replace("file:", "")
  : process.env.DATABASE_URL ?? path.join(root, ".data/fortheopen.db");
const migrationsDir = path.join(root, "packages/db/drizzle");

fs.mkdirSync(path.dirname(dbPath), { recursive: true });

const client = createClient({ url: `file:${dbPath}` });

await client.execute(`
  CREATE TABLE IF NOT EXISTS _migrations (
    id TEXT PRIMARY KEY NOT NULL,
    applied_at INTEGER NOT NULL
  )
`);

const migrationFiles = fs
  .readdirSync(migrationsDir)
  .filter((file) => file.endsWith(".sql"))
  .sort();

const applied = await client.execute("SELECT id FROM _migrations");
const appliedIds = new Set(applied.rows.map((row) => String(row.id)));

if (migrationFiles.length > 0 && !appliedIds.has(migrationFiles[0])) {
  const existing = await client.execute(
    "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
  );
  if (existing.rows.length > 0) {
    await client.execute({
      sql: "INSERT INTO _migrations (id, applied_at) VALUES (?, ?)",
      args: [migrationFiles[0], Date.now()],
    });
    appliedIds.add(migrationFiles[0]);
    console.log(`marked ${migrationFiles[0]} as applied (existing database)`);
  }
}

for (const file of migrationFiles) {
  if (appliedIds.has(file)) continue;

  const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
  for (const statement of sql.split(";").map((s) => s.trim()).filter(Boolean)) {
    await client.execute(statement);
  }
  await client.execute({
    sql: "INSERT INTO _migrations (id, applied_at) VALUES (?, ?)",
    args: [file, Date.now()],
  });
  console.log(`applied migration ${file}`);
}

console.log(`database ready at ${dbPath}`);