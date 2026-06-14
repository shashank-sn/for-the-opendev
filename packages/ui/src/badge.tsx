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
        padding: "3px 8px",
        borderRadius: 8,
        fontSize: 11,
        fontWeight: 500,
        background: "var(--active-bg)",
        color,
        border: `1px solid ${color}22`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
