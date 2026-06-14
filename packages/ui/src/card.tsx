import Link from "next/link";
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
  const baseStyle: CSSProperties = {
    background: "var(--bg-surface)",
    border: "1px solid var(--border-default)",
    borderRadius: "var(--radius-xl, 20px)",
    padding: 20,
    transition: "border-color 0.15s, background 0.15s",
    ...style,
  };

  if (href) {
    const isExternal = href.startsWith("http");
    const content = <div style={baseStyle}>{children}</div>;
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return <div style={baseStyle}>{children}</div>;
}
