import type { CSSProperties, ReactNode } from "react";

export function Card({
  children,
  style,
  href,
}: {
  children: ReactNode;
  style?: CSSProperties;
  href?: string;
}) {
  const inner = (
    <div
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-default)",
        borderRadius: "var(--radius-lg)",
        padding: 20,
        boxShadow: "var(--shadow-sm)",
        transition: "border-color 0.15s, transform 0.15s",
        ...style,
      }}
    >
      {children}
    </div>
  );

  if (href) {
    return (
      <a href={href} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
        {inner}
      </a>
    );
  }

  return inner;
}