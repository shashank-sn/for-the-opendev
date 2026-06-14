import { getDb, supporters } from "@ftod/db";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const rows = await getDb()
    .select({
      githubLogin: supporters.githubLogin,
      tier: supporters.tier,
      syncedAt: supporters.syncedAt,
    })
    .from(supporters)
    .orderBy(desc(supporters.syncedAt))
    .limit(100);

  return NextResponse.json({ supporters: rows });
}