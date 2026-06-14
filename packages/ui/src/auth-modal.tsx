"use client";

import { Github, Mail, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./button";

type Mode = "login" | "signup";

export function AuthModal({
  open,
  onClose,
  onEmail,
  onGithub,
  onGoogle,
}: {
  open: boolean;
  onClose: () => void;
  onEmail?: (email: string, mode: Mode) => void;
  onGithub?: () => void;
  onGoogle?: () => void;
}) {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.6)",
        padding: 24,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "100%",
          maxWidth: 420,
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-lg)",
          padding: 24,
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 20 }}>{mode === "login" ? "log in" : "sign up"}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="close"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            <X size={18} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <Button variant="secondary" onClick={onGithub} style={{ width: "100%" }}>
            <Github size={16} /> continue with github
          </Button>
          <Button variant="secondary" onClick={onGoogle} style={{ width: "100%" }}>
            continue with google
          </Button>
        </div>

        <div
          style={{
            margin: "20px 0",
            textAlign: "center",
            color: "var(--text-tertiary)",
            fontSize: 13,
          }}
        >
          or continue with email
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onEmail?.(email, mode);
          }}
          style={{ display: "flex", flexDirection: "column", gap: 12 }}
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-input)",
              color: "var(--text-primary)",
            }}
          />
          <Button type="submit" style={{ width: "100%" }}>
            <Mail size={16} /> {mode === "login" ? "send magic link" : "create account"}
          </Button>
        </form>

        <p style={{ marginTop: 16, fontSize: 13, color: "var(--text-secondary)", textAlign: "center" }}>
          {mode === "login" ? (
            <>
              no account?{" "}
              <button
                type="button"
                onClick={() => setMode("signup")}
                style={{ background: "none", border: "none", color: "var(--accent-text)", cursor: "pointer" }}
              >
                sign up
              </button>
            </>
          ) : (
            <>
              have an account?{" "}
              <button
                type="button"
                onClick={() => setMode("login")}
                style={{ background: "none", border: "none", color: "var(--accent-text)", cursor: "pointer" }}
              >
                log in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}