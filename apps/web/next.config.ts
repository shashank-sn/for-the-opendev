import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "../..");

const useD1 = process.env.FTOD_DB_DRIVER === "d1";

const nextConfig: NextConfig = {
  output: "standalone",
  transpilePackages: ["@ftod/ui", "@ftod/auth", "@ftod/db"],
  outputFileTracingRoot: root,
  experimental: {
    externalDir: true,
  },
  webpack: (config) => {
    if (useD1) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@ftod/db/schema": path.join(root, "packages/db/src/schema.ts"),
        "@ftod/db/email-store": path.join(root, "packages/db/src/email-store.ts"),
        "@ftod/db$": path.join(root, "packages/db/src/d1.ts"),
      };
    }
    return config;
  },
  serverExternalPackages: useD1 ? ["@libsql/client", "libsql"] : undefined,
};

// only wire remote bindings during local `next dev` — not ci/production builds
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

export default nextConfig;