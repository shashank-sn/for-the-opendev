import { PageShell } from "@/components/page-shell";

export default function SearchPage() {
  return (
    <PageShell title="search" subtitle="pagefind-powered site search">
      <div style={{ maxWidth: 640 }}>
        <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
          run <code className="preserve-case">pnpm pagefind</code> after build to generate the search index. ui wires to
          pagefind in production.
        </p>
        <div
          id="search"
          style={{
            padding: 16,
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-default)",
            background: "var(--bg-surface)",
          }}
        >
          <input
            type="search"
            placeholder="search profiles, comparisons, collections..."
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-input)",
              color: "var(--text-primary)",
            }}
          />
        </div>
        <script src="/pagefind/pagefind-ui.js" async />
        <link href="/pagefind/pagefind-ui.css" rel="stylesheet" />
      </div>
    </PageShell>
  );
}