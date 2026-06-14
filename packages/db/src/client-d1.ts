import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

type FtodDb = ReturnType<typeof drizzle<typeof schema>>;

type D1Database = {
  prepare: (query: string) => unknown;
  batch: (statements: unknown[]) => Promise<unknown[]>;
  exec: (query: string) => Promise<unknown>;
};

const globalForDb = globalThis as unknown as { ftodD1Db?: FtodDb };

function resolveD1(): D1Database | undefined {
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare") as {
      getCloudflareContext: () => { env: { DB?: D1Database } };
    };
    return getCloudflareContext().env.DB;
  } catch {
    return undefined;
  }
}

export function getD1Db(): FtodDb {
  if (!globalForDb.ftodD1Db) {
    const d1 = resolveD1();
    if (!d1) {
      throw new Error("cloudflare D1 binding DB is not available");
    }
    globalForDb.ftodD1Db = drizzle(d1, { schema });
  }
  return globalForDb.ftodD1Db;
}