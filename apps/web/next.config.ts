import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  transpilePackages: ["@ftod/ui"],
  outputFileTracingRoot: root,
  experimental: {
    externalDir: true,
  },
};

export default nextConfig;