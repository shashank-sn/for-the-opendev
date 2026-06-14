import { getDb, submissions } from "@ftod/db";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { getServerSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const status = url.searchParams.get("status") ?? "pending";

  const rows = await getDb()
    .select()
    .from(submissions)
    .where(eq(submissions.status, status))
    .orderBy(desc(submissions.createdAt));

  return NextResponse.json({ submissions: rows });
}