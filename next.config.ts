import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

// Static export: hosting is plain nginx + FTP (no Node runtime).
const config: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true }, // assets are pre-optimized to webp by scripts/optimize-assets.mjs
};

export default withNextIntl(config);
