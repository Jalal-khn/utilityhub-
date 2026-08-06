import type { ToolEngineConfig, BreadcrumbItem } from "./types";

export function generateBreadcrumb(
  config: ToolEngineConfig,
  options?: { categoryLabel?: string }
): BreadcrumbItem[] {
  const { name, category, slug } = config;
  const categoryLabel =
    options?.categoryLabel ?? category.charAt(0).toUpperCase() + category.slice(1);

  return [
    {
      label: "Home",
      href: "/",
    },
    {
      label: categoryLabel,
      href: `/${category}`,
    },
    {
      label: name,
      href: `/${category}/${slug}`,
    },
  ];
}

export function generateBreadcrumbJsonLd(
  config: ToolEngineConfig,
  context: { siteUrl: string },
  options?: { categoryLabel?: string }
): string {
  const breadcrumb = generateBreadcrumb(config, options);
  const { siteUrl } = context;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: `${siteUrl}${item.href}`,
    })),
  };

  return JSON.stringify(schema, null, 2);
}
