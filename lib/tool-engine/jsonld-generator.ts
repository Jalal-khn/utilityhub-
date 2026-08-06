import type { ToolEngineConfig, ToolEngineContext } from "./types";
import { getToolFeatures } from "./features";

export function generateJsonLd(
  config: ToolEngineConfig,
  context: ToolEngineContext
): string {
  const { name, slug, description, category, faq } = config;
  const { siteUrl, siteName } = context;

  const toolUrl = `${siteUrl}/${category}/${slug}`;

  const baseSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    description,
    url: toolUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: getToolFeatures(config),
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: siteUrl,
    },
  };

  // Add FAQ schema if available
  if (faq && faq.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    };

    return JSON.stringify([baseSchema, faqSchema], null, 2);
  }

  return JSON.stringify(baseSchema, null, 2);
}
