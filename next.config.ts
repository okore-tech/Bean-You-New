import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Emit a fully static site to ./out, uploaded to GoDaddy's public_html.
  // Every route in this app is prerenderable (no API routes, middleware,
  // server actions or runtime data fetching), so nothing is lost.
  output: "export",

  // Static export has no Next image optimizer at runtime. Source images in
  // public/ are pre-compressed at build-authoring time instead.
  images: { unoptimized: true },

  // Emit /about/index.html rather than /about.html, so Apache's DirectoryIndex
  // resolves every route natively. See public/.htaccess.
  trailingSlash: true,
};

export default nextConfig;
