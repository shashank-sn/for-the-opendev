import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PageShell } from "@/components/page-shell";
import { COMPARISONS } from "@/lib/catalog";
import { getComparisonContent } from "@/lib/content";

export function generateStaticParams() {
  return COMPARISONS.map((c) => ({ slug: c.slug }));
}

export default async function ComparisonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = COMPARISONS.find((c) => c.slug === slug);
  if (!meta) notFound();
  const content = getComparisonContent(slug);

  return (
    <PageShell title={meta.title}>
      <div className="prose" style={{ maxWidth: 760 }}>
        <ReactMarkdown>{content?.body ?? ""}</ReactMarkdown>
      </div>
    </PageShell>
  );
}