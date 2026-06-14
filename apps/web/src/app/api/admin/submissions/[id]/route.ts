import { getDb, submissions } from "@ftod/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { isAdminEmail } from "@/lib/admin";
import { getServerSession } from "@/lib/session";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession();
  if (!session?.user || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ message: "forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const { status } = (await request.json()) as { status?: "approved" | "rejected" };
  if (!status || !["approved", "rejected"].includes(status)) {
    return NextResponse.json({ message: "status must be approved or rejected" }, { status: 400 });
  }

  await getDb()
    .update(submissions)
    .set({ status, reviewedAt: new Date() })
    .where(eq(submissions.id, id));

  return NextResponse.json({ ok: true, status });
}