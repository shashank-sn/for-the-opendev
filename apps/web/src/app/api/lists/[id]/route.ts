import { getDb, listItems, lists } from "@ftod/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const [list] = await getDb()
    .select()
    .from(lists)
    .where(and(eq(lists.id, id), eq(lists.userId, session.user.id)))
    .limit(1);

  if (!list) return NextResponse.json({ message: "not found" }, { status: 404 });

  const items = await getDb().select().from(listItems).where(eq(listItems.listId, id));
  return NextResponse.json({ list, items });
}

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const body = (await request.json()) as { title?: string; isPublic?: boolean; description?: string };

  await getDb()
    .update(lists)
    .set({
      ...(body.title ? { title: body.title } : {}),
      ...(typeof body.isPublic === "boolean" ? { isPublic: body.isPublic } : {}),
      ...(body.description !== undefined ? { description: body.description } : {}),
      updatedAt: new Date(),
    })
    .where(and(eq(lists.id, id), eq(lists.userId, session.user.id)));

  return NextResponse.json({ ok: true });
}