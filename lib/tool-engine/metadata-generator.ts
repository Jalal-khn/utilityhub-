import type { Metadata } from "next";
import type { ToolEngineConfig, ToolEngineContext } from "./types";

const MAX_TITLE_LENGTH = 60;
const MIN_TITLE_LENGTH = 50;

function singular(label: string): string {
  return label.endsWith("s") ? label.slice(0, -1) : label;
}

/**
 * Build a title that lands inside the 50-60 character window once the
 * root layout appends " | UtilityHub". The tool name alone is often too
 * short, so a category-aware descriptor is added when it fits.
 */
export function buildToolTitle(
  name: string,
  siteName: string,
  categoryLabel?: string
): string {
  const suffix = ` | ${siteName}`;
  const noun = categoryLabel ? singular(categoryLabel) : "Tool";

  const candidates = [
    `${name} - Free ${noun} - No Sign-Up, No Upload`,
    `${name} - Free Online ${noun} - No Sign-Up`,
    `${name} - Free Online ${noun}`,
    `${name} - Free Online Tool, No Upload`,
    `${name} - Free Online Tool`,
    `${name} - Free Online`,
    name,
  ];

  const total = (title: string) => (title + suffix).length;
  const inRange = candidates.find(
    (title) => total(title) >= MIN_TITLE_LENGTH && total(title) <= MAX_TITLE_LENGTH
  );
  if (inRange) return inRange;

  return candidates.find((title) => total(title) <= MAX_TITLE_LENGTH) ?? name;
}

export function generateMetadata(
  config: ToolEngineConfig,
  context: ToolEngineContext,
  options?: { categoryLabel?: string }
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

  const title = metadata.title || buildToolTitle(name, siteName, options?.categoryLabel);
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
