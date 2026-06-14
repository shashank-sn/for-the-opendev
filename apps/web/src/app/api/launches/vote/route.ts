import { getDb, launchVotes } from "@ftod/db";
import { and, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProject } from "@/lib/catalog";
import { createId } from "@/lib/ids";
import { getServerSession } from "@/lib/session";

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "log in to vote" }, { status: 401 });

  const { projectSlug } = (await request.json()) as { projectSlug?: string };
  if (!projectSlug || !getProject(projectSlug)) {
    return NextResponse.json({ message: "invalid project" }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db
    .select({ id: launchVotes.id })
    .from(launchVotes)
    .where(and(eq(launchVotes.userId, session.user.id), eq(launchVotes.projectSlug, projectSlug)))
    .limit(1);

  if (existing) {
    return NextResponse.json({ message: "already voted", voted: true });
  }

  await db.insert(launchVotes).values({
    id: createId("vote"),
    userId: session.user.id,
    projectSlug,
    createdAt: new Date(),
  });

  const [{ count }] = await db
    .select({ count: sql<number>`count(*)` })
    .from(launchVotes)
    .where(eq(launchVotes.projectSlug, projectSlug));

  return NextResponse.json({ message: "vote recorded", votes: Number(count) });
}

export async function GET(request: Request) {
  const url = new URL(request.url);
  const projectSlug = url.searchParams.get("projectSlug");
  if (!projectSlug) return NextResponse.json({ message: "projectSlug required" }, { status: 400 });

  const [{ count }] = await getDb()
    .select({ count: sql<number>`count(*)` })
    .from(launchVotes)
    .where(eq(launchVotes.projectSlug, projectSlug));

  return NextResponse.json({ votes: Number(count) });
}