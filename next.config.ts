import createNextIntlPlugin from "next-intl/plugin";
import type { NextConfig } from "next";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const config: NextConfig = {
  output: "standalone",
  images: { formats: ["image/avif", "image/webp"] },
};

export default withNextIntl(config);
