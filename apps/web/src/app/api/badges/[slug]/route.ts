import { NextResponse } from "next/server";
import { getProject } from "@/lib/catalog";

export async function GET(_request: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new NextResponse("not found", { status: 404 });

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="240" height="28" role="img" aria-label="listed on for the open dev">
  <rect width="240" height="28" rx="6" fill="#18181b"/>
  <rect x="0.5" y="0.5" width="239" height="27" rx="5.5" fill="none" stroke="#27272a"/>
  <circle cx="14" cy="14" r="5" fill="#6366f1"/>
  <text x="26" y="18" fill="#fafafa" font-family="system-ui,sans-serif" font-size="12" text-transform="none">${project.name} · for the open dev</text>
</svg>`;

  return new NextResponse(svg, {
    headers: {
      "content-type": "image/svg+xml",
      "cache-control": "public, max-age=3600",
    },
  });
}