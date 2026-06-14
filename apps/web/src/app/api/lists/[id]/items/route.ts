import { getDb, listItems, lists } from "@ftod/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProject } from "@/lib/catalog";
import { createId } from "@/lib/ids";
import { getServerSession } from "@/lib/session";

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const { projectSlug, note } = (await request.json()) as { projectSlug?: string; note?: string };
  if (!projectSlug || !getProject(projectSlug)) {
    return NextResponse.json({ message: "invalid project" }, { status: 400 });
  }

  const [list] = await getDb()
    .select({ id: lists.id })
    .from(lists)
    .where(and(eq(lists.id, id), eq(lists.userId, session.user.id)))
    .limit(1);

  if (!list) return NextResponse.json({ message: "list not found" }, { status: 404 });

  const item = {
    id: createId("item"),
    listId: id,
    projectSlug,
    note: note?.trim() ?? null,
    createdAt: new Date(),
  };

  await getDb().insert(listItems).values(item);
  return NextResponse.json({ message: "added to your list", item });
}