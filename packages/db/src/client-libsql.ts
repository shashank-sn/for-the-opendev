import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import fs from "node:fs";
import path from "node:path";
import * as schema from "./schema";

export type FtodDb = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as { ftodDb?: FtodDb; ftodClient?: ReturnType<typeof createClient> };

function resolveDbPath() {
  if (process.env.DATABASE_URL?.startsWith("file:")) {
    return process.env.DATABASE_URL;
  }
  if (process.env.DATABASE_URL) {
    const resolved = path.isAbsolute(process.env.DATABASE_URL)
      ? process.env.DATABASE_URL
      : path.resolve(process.cwd(), process.env.DATABASE_URL);
    return `file:${resolved}`;
  }
  const candidates = [
    path.resolve(process.cwd(), ".data/fortheopen.db"),
    path.resolve(process.cwd(), "../../.data/fortheopen.db"),
  ];
  return `file:${candidates[0]}`;
}

export function getLibsqlDb(): FtodDb {
  if (!globalForDb.ftodDb) {
    const url = resolveDbPath();
    if (url.startsWith("file:")) {
      const filePath = url.replace("file:", "");
      fs.mkdirSync(path.dirname(filePath), { recursive: true });
    }
    globalForDb.ftodClient = createClient({ url });
    globalForDb.ftodDb = drizzle(globalForDb.ftodClient, { schema });
  }
  return globalForDb.ftodDb;
}