import type { FtodDb } from "./client-libsql";
import { getLibsqlDb } from "./client-libsql";

export type { FtodDb };

export function getDb(): FtodDb {
  return getLibsqlDb();
}