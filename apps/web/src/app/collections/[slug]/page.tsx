import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PageShell } from "@/components/page-shell";
import { COLLECTIONS } from "@/lib/catalog";
import { getCollectionContent } from "@/lib/content";

export function generateStaticParams() {
  return COLLECTIONS.map((c) => ({ slug: c.slug }));
}

export default async function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = COLLECTIONS.find((c) => c.slug === slug);
  if (!meta) notFound();
  const content = getCollectionContent(slug);

  return (
    <PageShell title={meta.title}>
      <div className="prose" style={{ maxWidth: 760 }}>
        <ReactMarkdown>{content?.body ?? ""}</ReactMarkdown>
      </div>
    </PageShell>
  );
}