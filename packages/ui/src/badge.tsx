import type { ReactNode } from "react";

const tierColors: Record<string, string> = {
  "staff pick": "#d97706",
  featured: "#8b5cf6",
  verified: "#3b82f6",
  listed: "var(--muted-foreground)",
};

export function Badge({ tier, children }: { tier?: string; children: ReactNode }) {
  const color = tier ? tierColors[tier] ?? tierColors.listed : "var(--muted-foreground)";
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "3px 8px",
        borderRadius: "var(--radius-md)",
        fontSize: 11,
        fontWeight: 500,
        letterSpacing: "-0.01em",
        background: "var(--muted)",
        color,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}
