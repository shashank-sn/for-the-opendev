"use client";

import { createFtodAuthClient } from "@ftod/auth/client";

export const authClient = createFtodAuthClient(
  process.env.NEXT_PUBLIC_SITE_URL ?? (typeof window !== "undefined" ? window.location.origin : "http://localhost:3000"),
);