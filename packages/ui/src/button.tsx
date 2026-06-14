import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  style?: CSSProperties;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "children"> & {
    href: string;
  };

const styles: Record<Variant, CSSProperties> = {
  primary: {
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "1px solid var(--primary)",
  },
  secondary: {
    background: "var(--card)",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
  },
  ghost: {
    background: "transparent",
    color: "var(--muted-foreground)",
    border: "1px solid transparent",
  },
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", style } = props;

  const sharedStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "9px 16px",
    borderRadius: "var(--radius-lg)",
    fontWeight: 500,
    fontSize: 14,
    textDecoration: "none",
    cursor: "pointer",
    minHeight: 40,
    letterSpacing: "-0.01em",
    transitionProperty: "background, border-color, box-shadow, scale, color, transform",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    ...styles[variant],
    ...style,
  };

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
        style={sharedStyle}
      >
        {children}
      </a>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      {...buttonProps}
      style={{
        ...sharedStyle,
        cursor: buttonProps.disabled ? "not-allowed" : "pointer",
        opacity: buttonProps.disabled ? 0.64 : 1,
      }}
    >
      {children}
    </button>
  );
}
