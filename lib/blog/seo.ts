import type { Metadata } from "next";
import { SITE_CONFIG } from "@/lib/constants/config";
import {
  BLOG_CATEGORY_ROUTE,
  BLOG_POST_ROUTE,
  ROUTES,
} from "@/lib/constants/routes";
import type { BlogCategory, BlogPostSummary } from "./types";
import { getBlogCategory } from "./constants";

function buildUrl(path: string): string {
  return `${SITE_CONFIG.url}${path}`;
}

function resolvePostOgImage(post: BlogPostSummary): string {
  if (
    post.featuredImage &&
    /\.(png|jpe?g|webp|avif|gif)$/i.test(post.featuredImage)
  ) {
    return buildUrl(post.featuredImage);
  }
  return buildUrl(`${BLOG_POST_ROUTE(post.slug)}/opengraph-image`);
}

export function getBlogIndexMetadata(): Metadata {
  return {
    title: "Blog",
    description:
      "Articles, tutorials, and guides on PDFs, images, text, developer tools, calculators, converters, colors, generators, security, and SEO from the UtilityHub team.",
    alternates: {
      canonical: buildUrl(ROUTES.BLOG),
    },
    openGraph: {
      title: "UtilityHub Blog",
      description:
        "Articles, tutorials, and guides on PDFs, images, text, developer tools, calculators, converters, colors, generators, security, and SEO.",
      url: buildUrl(ROUTES.BLOG),
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [{ url: buildUrl(SITE_CONFIG.ogImage) }],
    },
  };
}

export function getBlogCategoryMetadata(categorySlug: string): Metadata {
  const category = getBlogCategory(categorySlug);
  const title = `${category?.name ?? "Category"} Articles`;
  const description =
    category?.intro ??
    `Browse ${title.toLowerCase()} on the ${SITE_CONFIG.name} blog.`;

  return {
    title,
    description,
    alternates: {
      canonical: buildUrl(BLOG_CATEGORY_ROUTE(categorySlug)),
    },
    openGraph: {
      title,
      description,
      url: buildUrl(BLOG_CATEGORY_ROUTE(categorySlug)),
      siteName: SITE_CONFIG.name,
      type: "website",
      images: [{ url: buildUrl(SITE_CONFIG.ogImage) }],
    },
  };
}

export function getPostMetadata(post: BlogPostSummary): Metadata {
  const url = buildUrl(BLOG_POST_ROUTE(post.slug));
  const title = `${post.title} | ${SITE_CONFIG.name} Blog`;

  return {
    title,
    description: post.description,
    keywords: post.keywords,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      siteName: SITE_CONFIG.name,
      type: "article",
      publishedTime: post.publishedDate,
      modifiedTime: post.updatedDate,
      authors: [post.author],
      images: [
        {
          url: resolvePostOgImage(post),
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [resolvePostOgImage(post)],
    },
  };
}

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: buildUrl(item.href),
    })),
  };
}

export function buildArticleJsonLd(post: BlogPostSummary) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    author: {
      "@type": "Person",
      name: post.author,
    },
    datePublished: post.publishedDate,
    ...(post.updatedDate ? { dateModified: post.updatedDate } : {}),
    image: resolvePostOgImage(post),
    url: buildUrl(BLOG_POST_ROUTE(post.slug)),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": buildUrl(BLOG_POST_ROUTE(post.slug)),
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
    },
    ...(post.category
      ? {
          articleSection: post.categoryName ?? post.category,
        }
      : {}),
    ...(post.keywords.length > 0 ? { keywords: post.keywords.join(", ") } : {}),
  };
}

export function buildFaqJsonLd(
  faq: Array<{ question: string; answer: string }>
) {
  return {
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
}

export function buildCollectionJsonLd(category: BlogCategory) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.name,
    description: category.description,
    url: buildUrl(BLOG_CATEGORY_ROUTE(category.slug)),
  };
}
