"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    PagefindUI?: new (opts: { element: string; showImages?: boolean }) => void;
  }
}

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function PagefindSearch() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = `${basePath}/pagefind/pagefind-ui.css`;
    document.head.appendChild(css);

    const script = document.createElement("script");
    script.src = `${basePath}/pagefind/pagefind-ui.js`;
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