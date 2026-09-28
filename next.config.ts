import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Hosted on Vercel: keep the Next image optimizer (responsive WebP/AVIF) and
  // Vercel's own routing. Source images in public/ are pre-compressed anyway,
  // so the optimizer is working from sane inputs rather than 24MB originals.
};

export default nextConfig;
