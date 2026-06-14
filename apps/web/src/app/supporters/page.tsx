export const dynamic = "force-dynamic";

import { Button } from "@ftod/ui";
import { PageShell } from "@/components/page-shell";
import { SPONSOR_TIERS } from "@/lib/catalog";
import { FOUNDING_SUPPORTER_LIMIT } from "@/lib/sponsors";
import { getSupporters, isEnterpriseSupporter, tierLabel, type SupporterRow } from "@/lib/supporters-data";

function SupporterChip({ row }: { row: SupporterRow }) {
  return (
    <a
      href={`https://github.com/${row.githubLogin}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 12px",
        borderRadius: "var(--radius-md)",
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
        fontSize: 14,
      }}
    >
      <img
        src={`https://github.com/${row.githubLogin}.png?size=64`}
        alt=""
        width={24}
        height={24}
        style={{ borderRadius: "50%" }}
      />
      <span className="preserve-case">{row.githubLogin}</span>
      <span style={{ color: "var(--text-tertiary)", fontSize: 12 }}>{tierLabel(row.tier)}</span>
    </a>
  );
}

function EnterpriseCard({ row }: { row: SupporterRow }) {
  return (
    <a
      href={`https://github.com/${row.githubLogin}`}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: 20,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
      }}
    >
      <img
        src={`https://github.com/${row.githubLogin}.png?size=128`}
        alt=""
        width={56}
        height={56}
        style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}
      />
      <div>
        <p className="preserve-case" style={{ margin: 0, fontWeight: 600, fontSize: 18 }}>
          {row.githubLogin}
        </p>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
          {tierLabel(row.tier)}
          {row.amountCents ? ` · $${row.amountCents / 100}/mo` : ""}
        </p>
      </div>
    </a>
  );
}

export default async function SupportersPage() {
  const all = await getSupporters();
  const enterprise = all.filter(isEnterpriseSupporter);
  const wall = all;

  const wallByTier = ["sustainer", "builder-backer", "open-supporter", "custom"].map((tier) => ({
    tier,
    rows: wall.filter((r) => r.tier === tier),
  }));

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
        <h2 style={{ fontSize: 22 }}>supporter wall</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 560, marginBottom: 20 }}>
          synced from github sponsors after you log in with github. thank you for keeping discovery independent.
        </p>
        {wall.length === 0 ? (
          <p style={{ color: "var(--text-tertiary)", fontSize: 14 }}>no sponsors synced yet — be the first.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {wallByTier
              .filter((g) => g.rows.length > 0)
              .map((g) => (
                <div key={g.tier}>
                  <h3 style={{ margin: "0 0 10px", fontSize: 14, color: "var(--text-tertiary)", fontWeight: 500 }}>
                    {tierLabel(g.tier)}
                  </h3>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {g.rows.map((row) => (
                      <SupporterChip key={row.githubLogin} row={row} />
                    ))}
                  </div>
                </div>
              ))}
          </div>
        )}
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 22 }}>founding supporters</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 560 }}>
          the first {FOUNDING_SUPPORTER_LIMIT} sponsors get a permanent founding supporter badge — regardless of tier.
          synced via github sponsors webhook after you log in with github.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 22 }}>enterprise sponsors</h2>
        <p style={{ color: "var(--text-secondary)", maxWidth: 560, marginBottom: 20 }}>
          companies: use custom amount on github sponsors or email hello@fortheopen.dev for invoicing. enterprise sponsors
          appear here — clearly separated from editorial content and never affect catalog rankings.
        </p>
        {enterprise.length === 0 ? (
          <p style={{ color: "var(--text-tertiary)", fontSize: 14 }}>no enterprise sponsors yet.</p>
        ) : (
          <div className="grid-cards">
            {enterprise.map((row) => (
              <EnterpriseCard key={row.githubLogin} row={row} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}