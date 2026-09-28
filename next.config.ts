import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Emit a fully static site to ./out for S3 + CloudFront.
  // Every route in this app is prerenderable (no API routes, middleware,
  // server actions or runtime data fetching), so nothing is lost.
  output: "export",

  // Static export has no Next image optimizer at runtime. Source images in
  // public/ are pre-compressed at build-authoring time instead.
  images: { unoptimized: true },

  // Emit /about/index.html rather than /about.html so CloudFront can resolve
  // directory URLs. Paired with the viewer-request function in
  // infra/cloudfront-rewrite.js, which appends index.html.
  trailingSlash: true,
};

export default nextConfig;
