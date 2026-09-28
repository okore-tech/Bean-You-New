import type { MetadataRoute } from "next";

const SITE = "https://beanyou.com";

// Static export: this is evaluated at build time and written to /sitemap.xml.
export const dynamic = "force-static";

const routes = [
  { path: "/", priority: 1.0 },
  { path: "/about", priority: 0.8 },
  { path: "/explore", priority: 0.9 },
  { path: "/connect", priority: 0.9 },
  { path: "/roadmap", priority: 0.7 },
  { path: "/social", priority: 0.6 },
  { path: "/face-of-bean-you", priority: 0.7 },
  { path: "/legal/terms", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.map(({ path, priority }) => ({
    // trailingSlash: true in next.config.ts -> "/about/" is canonical
    url: `${SITE}${path === "/" ? "/" : path + "/"}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
