import Link from "next/link";
import type { SupporterRow } from "@/lib/supporters-data";

type Props = {
  sponsor?: Pick<SupporterRow, "githubLogin">;
};

export function SponsoredPlacement({ sponsor }: Props) {
  if (sponsor) {
    return (
      <aside
        aria-label="sponsored placement"
        style={{
          marginBottom: 24,
          padding: "16px 20px",
          borderRadius: "var(--radius-lg)",
          border: "1px dashed var(--border-default)",
          background: "var(--bg-surface)",
        }}
      >
        <p style={{ margin: "0 0 10px", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-tertiary)", textTransform: "lowercase" }}>
          sponsored · clearly labeled · never affects rankings
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <img
            src={`https://github.com/${sponsor.githubLogin}.png?size=48`}
            alt=""
            width={40}
            height={40}
            style={{ borderRadius: "var(--radius-md)", border: "1px solid var(--border-default)" }}
          />
          <div>
            <a
              href={`https://github.com/${sponsor.githubLogin}`}
              className="preserve-case"
              style={{ fontWeight: 600, fontSize: 15 }}
            >
              {sponsor.githubLogin}
            </a>
            <p style={{ margin: "4px 0 0", fontSize: 13, color: "var(--text-secondary)" }}>
              enterprise supporter on for the open dev
            </p>
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside
      aria-label="sponsored placement"
      style={{
        marginBottom: 24,
        padding: "16px 20px",
        borderRadius: "var(--radius-lg)",
        border: "1px dashed var(--border-default)",
        background: "var(--bg-surface)",
      }}
    >
      <p style={{ margin: "0 0 8px", fontSize: 11, letterSpacing: "0.08em", color: "var(--text-tertiary)", textTransform: "lowercase" }}>
        sponsored · clearly labeled · never affects rankings
      </p>
      <p style={{ margin: "0 0 12px", fontSize: 14, color: "var(--text-secondary)", maxWidth: 520 }}>
        enterprise sponsors appear here — separate from editorial staff picks and catalog rankings.
      </p>
      <Link href="/supporters" style={{ fontSize: 14 }}>
        become an enterprise sponsor →
      </Link>
    </aside>
  );
}