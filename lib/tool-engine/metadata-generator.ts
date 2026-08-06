import type { Metadata } from "next";
import type { ToolEngineConfig, ToolEngineContext } from "./types";

export function generateMetadata(
  config: ToolEngineConfig,
  context: ToolEngineContext
): Metadata {
  const {
    name,
    slug,
    description,
    category,
    primaryKeyword,
    secondaryKeywords,
    metadata,
  } = config;

  const { siteUrl, siteName } = context;

  const toolUrl = `${siteUrl}/${category}/${slug}`;

  const title = metadata.title || `${name} - ${siteName}`;
  const metaDescription = metadata.metaDescription || description;

  const keywords = [primaryKeyword, ...secondaryKeywords].join(", ");

  return {
    title,
    description: metaDescription,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: metadata.canonical || toolUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: toolUrl,
      title: metadata.ogTitle || title,
      description: metadata.ogDescription || metaDescription,
      siteName,
    },
    twitter: {
      card: "summary_large_image",
      title: metadata.twitterTitle || title,
      description: metadata.twitterDescription || metaDescription,
      creator: `@${siteName.toLowerCase().replace(/\s+/g, "")}`,
    },
    robots: {
      index: !metadata.noindex,
      follow: !metadata.nofollow,
      googleBot: {
        index: !metadata.noindex,
        follow: !metadata.nofollow,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      // Add verification codes when available
    },
  };
}
