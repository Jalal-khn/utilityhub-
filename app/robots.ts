import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: [
      `${SITE_CONFIG.url}/sitemap.xml`,
      `${SITE_CONFIG.url}/blog/feed.xml`,
    ],
  };
}
