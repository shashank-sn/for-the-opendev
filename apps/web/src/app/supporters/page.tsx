import { Button } from "@ftod/ui";
import { PageShell } from "@/components/page-shell";
import { SPONSOR_TIERS } from "@/lib/catalog";
import { FOUNDING_SUPPORTER_LIMIT } from "@/lib/sponsors";

export default function SupportersPage() {
  return (
    <PageShell title="supporters" subtitle="discovery should be free. sponsorship keeps it independent.">
      <p style={{ maxWidth: 640, color: "var(--text-secondary)", marginBottom: 32 }}>
        for the open dev is open source — the code, the profiles, the comparisons. if we saved you an hour of research,
        sponsor the repo on github. $1/month keeps the lights on. $100/month keeps it independent.
      </p>

      <div className="grid-cards" style={{ marginBottom: 48 }}>
        {SPONSOR_TIERS.map((tier) => (
          <div
            key={tier.slug}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              padding: 24,
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 20 }}>{tier.name}</h3>
            <p style={{ margin: "0 0 16px", color: "var(--text-secondary)" }}>
              {tier.price ? `$${tier.price}/month` : "any amount · one-time or monthly"}
            </p>
            <ul style={{ margin: "0 0 20px", paddingLeft: 18, color: "var(--text-secondary)", fontSize: 14 }}>
              <li>open supporter badge on profile</li>
              <li>name on /supporters wall</li>
              {tier.slug !== "open-supporter" && <li>name in github readme sponsor section</li>}
              {tier.slug === "sustainer" && <li>logo on enterprise section</li>}
            </ul>
            <a href={tier.url}>
              <Button style={{ width: "100%" }}>{tier.slug === "custom" ? "custom amount" : "sponsor on github"}</Button>
            </a>
          </div>
        ))}
      </div>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22 }}>founding supporters</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 560 }}>
          the first {FOUNDING_SUPPORTER_LIMIT} sponsors get a permanent founding supporter badge — regardless of tier.
          synced via github sponsors webhook after you log in with github.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 22 }}>enterprise sponsors</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 560 }}>
          companies: use custom amount on github sponsors or email hello@fortheopen.dev for invoicing. enterprise sponsors
          appear here — clearly separated from editorial content.
        </p>
      </section>
    </PageShell>
  );
}