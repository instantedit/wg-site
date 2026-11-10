import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85, 88],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920, 2560, 3200],
    minimumCacheTTL: 60 * 60 * 24 * 365,
  },
  async headers() {
    return [
      {
        source: "/:dir(img|logos|video)/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
