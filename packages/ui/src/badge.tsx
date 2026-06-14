import type { ReactNode } from "react";

const tierColors: Record<string, string> = {
  "staff pick": "var(--badge-staff-pick)",
  featured: "#8b5cf6",
  verified: "#3b82f6",
  listed: "var(--text-tertiary)",
};

export function Badge({ tier, children }: { tier?: string; children: ReactNode }) {
  const color = tier ? tierColors[tier] ?? tierColors.listed : "var(--text-tertiary)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "2px 8px",
        borderRadius: "var(--radius-sm)",
        fontSize: 12,
        fontWeight: 500,
        background: "var(--bg-subtle)",
        color,
        border: `1px solid ${color}33`,
      }}
    >
      {children}
    </span>
  );
}