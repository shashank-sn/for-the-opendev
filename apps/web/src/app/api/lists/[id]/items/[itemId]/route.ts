import { getDb, listItems, lists } from "@ftod/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; itemId: string }> },
) {
  const { id, itemId } = await params;
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const [list] = await getDb()
    .select({ id: lists.id })
    .from(lists)
    .where(and(eq(lists.id, id), eq(lists.userId, session.user.id)))
    .limit(1);

  if (!list) return NextResponse.json({ message: "list not found" }, { status: 404 });

  await getDb().delete(listItems).where(and(eq(listItems.id, itemId), eq(listItems.listId, id)));
  return NextResponse.json({ ok: true });
}