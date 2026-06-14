import { getDb, reviews, user } from "@ftod/db";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createId } from "@/lib/ids";
import { getServerSession } from "@/lib/session";

const MIN_ACCOUNT_AGE_MS = 24 * 60 * 60 * 1000;

export async function GET(request: Request) {
  const url = new URL(request.url);
  const projectSlug = url.searchParams.get("projectSlug");
  if (!projectSlug) return NextResponse.json({ message: "projectSlug required" }, { status: 400 });

  const rows = await getDb()
    .select({
      id: reviews.id,
      setupEase: reviews.setupEase,
      documentation: reviews.documentation,
      maintenance: reviews.maintenance,
      wouldRecommend: reviews.wouldRecommend,
      body: reviews.body,
      createdAt: reviews.createdAt,
      updatedAt: reviews.updatedAt,
      username: user.username,
      displayUsername: user.displayUsername,
    })
    .from(reviews)
    .innerJoin(user, eq(reviews.userId, user.id))
    .where(and(eq(reviews.projectSlug, projectSlug), eq(reviews.hidden, false)));

  const count = rows.length;
  const avg = (key: "setupEase" | "documentation" | "maintenance") =>
    count ? rows.reduce((sum, r) => sum + r[key], 0) / count : 0;
  const yesCount = rows.filter((r) => r.wouldRecommend === "yes").length;

  return NextResponse.json({
    reviews: rows,
    aggregate: {
      count,
      setupEase: avg("setupEase"),
      documentation: avg("documentation"),
      maintenance: avg("maintenance"),
      recommendYesPct: count ? Math.round((yesCount / count) * 100) : 0,
    },
  });
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "log in to review" }, { status: 401 });

  const createdAt = session.user.createdAt ? new Date(session.user.createdAt) : new Date();
  if (Date.now() - createdAt.getTime() < MIN_ACCOUNT_AGE_MS) {
    return NextResponse.json({ message: "come back tomorrow — account must be 24 hours old" }, { status: 403 });
  }

  const body = (await request.json()) as {
    projectSlug?: string;
    setupEase?: number;
    documentation?: number;
    maintenance?: number;
    wouldRecommend?: "yes" | "maybe" | "no";
    experience?: string;
  };

  if (!body.projectSlug) return NextResponse.json({ message: "projectSlug required" }, { status: 400 });

  for (const field of ["setupEase", "documentation", "maintenance"] as const) {
    const v = body[field];
    if (!v || v < 1 || v > 5) {
      return NextResponse.json({ message: `${field} must be 1-5` }, { status: 400 });
    }
  }

  if (!body.wouldRecommend || !["yes", "maybe", "no"].includes(body.wouldRecommend)) {
    return NextResponse.json({ message: "wouldRecommend must be yes, maybe, or no" }, { status: 400 });
  }

  if (body.experience && (body.experience.length < 50 || body.experience.length > 2000)) {
    return NextResponse.json({ message: "experience must be 50-2000 chars when provided" }, { status: 400 });
  }

  const db = getDb();
  const now = new Date();

  const [existing] = await db
    .select({ id: reviews.id })
    .from(reviews)
    .where(and(eq(reviews.userId, session.user.id), eq(reviews.projectSlug, body.projectSlug)))
    .limit(1);

  if (existing) {
    await db
      .update(reviews)
      .set({
        setupEase: body.setupEase!,
        documentation: body.documentation!,
        maintenance: body.maintenance!,
        wouldRecommend: body.wouldRecommend,
        body: body.experience?.trim() ?? null,
        updatedAt: now,
      })
      .where(eq(reviews.id, existing.id));

    return NextResponse.json({ message: "review updated", id: existing.id });
  }

  const id = createId("rev");
  await db.insert(reviews).values({
    id,
    userId: session.user.id,
    projectSlug: body.projectSlug,
    setupEase: body.setupEase!,
    documentation: body.documentation!,
    maintenance: body.maintenance!,
    wouldRecommend: body.wouldRecommend,
    body: body.experience?.trim() ?? null,
    hidden: false,
    createdAt: now,
    updatedAt: null,
  });

  return NextResponse.json({ message: "review submitted", id });
}