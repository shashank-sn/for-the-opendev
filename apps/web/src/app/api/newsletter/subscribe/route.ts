import { subscribeToNewsletter } from "@/lib/listmonk";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: { email?: string; name?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const result = await subscribeToNewsletter(body.email ?? "", body.name);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }

  return NextResponse.json({ ok: true });
}