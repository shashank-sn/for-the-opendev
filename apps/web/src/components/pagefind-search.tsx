"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    PagefindUI?: new (opts: { element: string; showImages?: boolean }) => void;
  }
}

export function PagefindSearch() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = "/pagefind/pagefind-ui.css";
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = "/pagefind/pagefind-ui.js";
    script.async = true;
    script.onload = () => {
      if (window.PagefindUI) {
        new window.PagefindUI({ element: "#pagefind-search", showImages: false });
      }
    };
    document.body.appendChild(script);
  }, []);

  return <div id="pagefind-search" />;
}