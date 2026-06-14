import { getDb, user } from "@ftod/db";
import { and, eq, ne } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/session";

const RESERVED = new Set(["admin", "api", "dashboard", "login", "search", "submit", "supporters"]);

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "log in required" }, { status: 401 });

  const { username } = (await request.json()) as { username?: string };
  if (!username || !/^[a-z0-9-]{3,20}$/.test(username)) {
    return NextResponse.json({ message: "username must be 3-20 chars: a-z, 0-9, hyphen" }, { status: 400 });
  }
  if (RESERVED.has(username)) {
    return NextResponse.json({ message: "username is reserved" }, { status: 400 });
  }

  const db = getDb();
  const [existing] = await db
    .select({ id: user.id })
    .from(user)
    .where(and(eq(user.username, username), ne(user.id, session.user.id)))
    .limit(1);

  if (existing) return NextResponse.json({ message: "username already taken" }, { status: 409 });

  await db
    .update(user)
    .set({ username, displayUsername: username, updatedAt: new Date() })
    .where(eq(user.id, session.user.id));

  return NextResponse.json({ ok: true, username });
}