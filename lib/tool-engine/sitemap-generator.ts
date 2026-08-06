import type { ToolEngineConfig, SitemapEntry, ToolEngineContext } from "./types";

export function generateSitemapEntry(
  config: ToolEngineConfig,
  context: ToolEngineContext
): SitemapEntry {
  const { slug, category } = config;
  const { siteUrl } = context;

  return {
    url: `${siteUrl}/${category}/${slug}`,
    lastModified: config.addedAt ?? new Date().toISOString(),
    changeFrequency: "weekly",
    priority: 0.8,
  };
}

export function generateSitemapXml(
  entries: SitemapEntry[]
): string {
  const urlElements = entries.map((entry) => `
    <url>
      <loc>${entry.url}</loc>
      ${entry.lastModified ? `<lastmod>${entry.lastModified}</lastmod>` : ""}
      <changefreq>${entry.changeFrequency || "weekly"}</changefreq>
      <priority>${entry.priority || 0.5}</priority>
    </url>
  `).join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlElements}
</urlset>`;
}
