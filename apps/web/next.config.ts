import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  transpilePackages: ["@ftod/ui", "@ftod/auth", "@ftod/db"],
  outputFileTracingRoot: root,
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;