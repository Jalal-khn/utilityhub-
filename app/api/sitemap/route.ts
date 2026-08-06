import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/lib/constants/config";
import { TOOLS } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { generateSitemapXml } from "@/lib/tool-engine";

export async function GET() {
  const toolEntries = TOOLS.map((tool) => ({
    url: `${SITE_CONFIG.url}/${tool.category}/${tool.slug}`,
    lastModified: tool.addedAt ?? new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const categoryEntries = CATEGORIES.map((category) => ({
    url: `${SITE_CONFIG.url}/${category.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  const xml = generateSitemapXml([...toolEntries, ...categoryEntries]);

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
