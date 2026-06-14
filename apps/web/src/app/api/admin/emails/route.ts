import { getDb } from "@ftod/db";
import { listEmails } from "@ftod/db/email-store";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { getServerSession } from "@/lib/session";

export async function GET(request: Request) {
  const session = await getServerSession();
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  const url = new URL(request.url);
  const limit = Math.min(Number(url.searchParams.get("limit") ?? "50"), 200);
  const rows = await listEmails(getDb(), limit);

  return NextResponse.json({ emails: rows });
}