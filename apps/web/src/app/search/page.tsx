import { PagefindSearch } from "@/components/pagefind-search";
import { PageShell } from "@/components/page-shell";

export default function SearchPage() {
  return (
    <PageShell title="search" subtitle="pagefind-powered site search">
      <div style={{ maxWidth: 720 }}>
        <PagefindSearch />
      </div>
    </PageShell>
  );
}