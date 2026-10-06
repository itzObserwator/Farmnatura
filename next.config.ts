import type { NextConfig } from "next";

const config: NextConfig = {
  // Keep development tooling scoped to this project, even if a parent has a lockfile.
  turbopack: { root: process.cwd() },
  images: {
    // Retina iMac displays need 5K plus a little headroom for parallax scaling.
    deviceSizes: [640, 750, 828, 1080, 1200, 1600, 1920, 2048, 2560, 2880, 3200, 3840, 5120, 5760],
    qualities: [75, 90, 95],
  },
};

export default config;
