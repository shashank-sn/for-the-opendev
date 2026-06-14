import { getDb, lists } from "@ftod/db";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createId, slugify } from "@/lib/ids";
import { getServerSession } from "@/lib/session";

export async function GET() {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const rows = await getDb()
    .select()
    .from(lists)
    .where(eq(lists.userId, session.user.id));

  return NextResponse.json({ lists: rows });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "unauthorized" }, { status: 401 });

  const { title, description } = (await request.json()) as { title?: string; description?: string };
  if (!title?.trim()) return NextResponse.json({ message: "title required" }, { status: 400 });

  const now = new Date();
  const baseSlug = slugify(title) || "list";
  const slug = `${baseSlug}-${crypto.randomUUID().slice(0, 6)}`;

  const list = {
    id: createId("list"),
    userId: session.user.id,
    title: title.trim(),
    slug,
    description: description?.trim() ?? null,
    isPublic: false,
    createdAt: now,
    updatedAt: now,
  };

  await getDb().insert(lists).values(list);
  return NextResponse.json({ list });
}