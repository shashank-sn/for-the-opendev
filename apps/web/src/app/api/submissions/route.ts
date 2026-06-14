import { getDb, submissions } from "@ftod/db";
import { NextResponse } from "next/server";
import { createId } from "@/lib/ids";
import { getServerSession } from "@/lib/session";

const GITHUB_REPO_RE = /^https:\/\/github\.com\/[\w.-]+\/[\w.-]+\/?$/;

async function verifyGithubLicense(githubUrl: string) {
  const parts = githubUrl.replace(/\/$/, "").split("/");
  const repo = parts.pop();
  const owner = parts.pop();
  if (!owner || !repo) return { ok: false, reason: "invalid github url" };

  const res = await fetch(`https://api.github.com/repos/${owner}/${repo}`, {
    headers: { accept: "application/vnd.github+json", "user-agent": "fortheopen-dev" },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return { ok: false, reason: "repo not found or private" };
  const data = (await res.json()) as { license?: { spdx_id?: string }; archived?: boolean };
  if (data.archived) return { ok: false, reason: "repo is archived" };
  if (!data.license?.spdx_id || data.license.spdx_id === "NOASSERTION") {
    return { ok: false, reason: "repo must have a valid oss license" };
  }
  return { ok: true, license: data.license.spdx_id };
}

export async function POST(request: Request) {
  const session = await getServerSession();
  if (!session?.user) return NextResponse.json({ message: "log in to submit" }, { status: 401 });

  const body = (await request.json()) as {
    githubUrl?: string;
    category?: string;
    notes?: string;
  };

  if (!body.githubUrl || !GITHUB_REPO_RE.test(body.githubUrl)) {
    return NextResponse.json({ message: "valid github repo url required" }, { status: 400 });
  }

  const licenseCheck = await verifyGithubLicense(body.githubUrl);
  if (!licenseCheck.ok) {
    return NextResponse.json({ message: licenseCheck.reason }, { status: 400 });
  }

  const row = {
    id: createId("sub"),
    userId: session.user.id,
    githubUrl: body.githubUrl,
    category: body.category ?? "tools",
    license: licenseCheck.license,
    status: "pending" as const,
    notes: body.notes?.slice(0, 500) ?? null,
    createdAt: new Date(),
    reviewedAt: null,
  };

  await getDb().insert(submissions).values(row);

  return NextResponse.json({
    message: "submitted for editorial review",
    submission: row,
  });
}