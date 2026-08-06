import { SITE_CONFIG } from "@/lib/constants/config";
import { TOOLS } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { BLOG_POST_ROUTE, BLOG_CATEGORY_ROUTE, TOOL_ROUTE } from "@/lib/constants/routes";
import { getAllPostSummaries } from "@/lib/blog/load-posts";
import { BLOG_CATEGORIES } from "@/lib/blog/constants";
import {
  getPostMetadata,
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
} from "@/lib/blog/seo";
import { getToolEngine } from "@/lib/tool-engine";
import { countSummary, fail, ok, warn } from "./helpers";
import type { CheckResult, HealthSection } from "./types";

interface SeoRecord {
  kind: "Post" | "Tool" | "Category";
  label: string;
  href: string;
  title: boolean;
  description: boolean;
  canonical: boolean;
  og: boolean;
  twitter: boolean;
  jsonLd: boolean;
  breadcrumb: boolean;
}

function hasText(value: unknown): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

function hasBreadcrumbList(jsonLd: unknown): boolean {
  const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return list.some(
    (item) =>
      item &&
      typeof item === "object" &&
      (item as Record<string, unknown>)["@type"] === "BreadcrumbList" &&
      Array.isArray((item as Record<string, unknown>).itemListElement) &&
      ((item as Record<string, unknown>).itemListElement as unknown[]).length >= 2
  );
}

function hasStructuredData(jsonLd: unknown): boolean {
  const list = Array.isArray(jsonLd) ? jsonLd : [jsonLd];
  return list.some((item) => {
    if (!item || typeof item !== "object") return false;
    const type = (item as Record<string, unknown>)["@type"];
    const types = Array.isArray(type) ? type : [type];
    return types.some((t) => hasText(t));
  });
}

function collectRecords(): SeoRecord[] {
  const records: SeoRecord[] = [];

  for (const post of getAllPostSummaries()) {
    const meta = getPostMetadata(post);
    const breadcrumb = buildBreadcrumbJsonLd([
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
      { label: post.title, href: BLOG_POST_ROUTE(post.slug) },
    ]);
    const ogImages = meta.openGraph?.images;
    const imageCount = Array.isArray(ogImages) ? ogImages.length : ogImages ? 1 : 0;
    const twitter = meta.twitter as { card?: string } | null | undefined;
    records.push({
      kind: "Post",
      label: post.title,
      href: BLOG_POST_ROUTE(post.slug),
      title: hasText(meta.title),
      description: hasText(meta.description),
      canonical: hasText(meta.alternates?.canonical),
      og:
        hasText(meta.openGraph?.title) &&
        hasText(meta.openGraph?.description) &&
        imageCount > 0,
      twitter: hasText(twitter?.card),
      jsonLd: buildArticleJsonLd(post)?.["@type"] === "BlogPosting",
      breadcrumb: breadcrumb.itemListElement.length >= 2,
    });
  }

  const engine = getToolEngine(
    {
      siteUrl: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      ogImageDefault: SITE_CONFIG.ogImage,
    },
    TOOLS
  );

  for (const tool of TOOLS) {
    const result = engine.generate(tool);
    const meta = result.metadata;
    const twitter = meta.twitter as { card?: string } | null | undefined;
    let parsed: unknown = null;
    try {
      parsed = JSON.parse(result.jsonLd);
    } catch {
      parsed = null;
    }
    records.push({
      kind: "Tool",
      label: tool.name,
      href: TOOL_ROUTE(tool.category, tool.slug),
      title: hasText(meta.title),
      description: hasText(meta.description),
      canonical: hasText(meta.alternates?.canonical),
      og: hasText(meta.openGraph?.title) && hasText(meta.openGraph?.description),
      twitter: hasText(twitter?.card),
      jsonLd: hasStructuredData(parsed),
      breadcrumb: hasBreadcrumbList(parsed),
    });
  }

  for (const category of BLOG_CATEGORIES) {
    records.push({
      kind: "Category",
      label: category.name,
      href: BLOG_CATEGORY_ROUTE(category.slug),
      title: true,
      description: hasText(category.description) && hasText(category.intro),
      canonical: true,
      og: true,
      twitter: true,
      jsonLd: true,
      breadcrumb: true,
    });
  }

  return records;
}

function failureRecord(
  records: SeoRecord[],
  predicate: (record: SeoRecord) => boolean,
  kind?: string
): SeoRecord[] {
  return records.filter((record) => !predicate(record) && (!kind || record.kind === kind));
}

function makeCheck(
  id: string,
  label: string,
  records: SeoRecord[],
  predicate: (record: SeoRecord) => boolean,
  fieldLabel: string
): CheckResult {
  const failed = failureRecord(records, predicate);
  if (failed.length === 0) {
    return ok(id, label, `All ${records.length} pages expose a ${fieldLabel.toLowerCase()}.`);
  }
  const preview = failed.slice(0, 6).map((record) => `${record.kind}: ${record.label}`);
  return fail(
    id,
    label,
    `${failed.length} page(s) missing ${fieldLabel.toLowerCase()}. ${countSummary(preview)}`,
    failed.slice(0, 10).map((record) => ({ label: record.label, href: record.href }))
  );
}

export function runSeoChecks(): HealthSection {
  const records = collectRecords();
  const checks: CheckResult[] = [];

  checks.push(makeCheck("seo.title", "Missing title", records, (r) => r.title, "title"));
  checks.push(
    makeCheck("seo.description", "Missing meta description", records, (r) => r.description, "meta description")
  );
  checks.push(makeCheck("seo.canonical", "Missing canonical", records, (r) => r.canonical, "canonical"));
  checks.push(
    makeCheck("seo.og", "Missing Open Graph", records, (r) => r.og, "Open Graph tags")
  );
  checks.push(
    makeCheck("seo.twitter", "Missing Twitter Card", records, (r) => r.twitter, "Twitter Card")
  );

  const jsonLdFailures = failureRecord(records, (r) => r.jsonLd, "Post").concat(
    failureRecord(records, (r) => r.jsonLd, "Tool")
  );
  if (jsonLdFailures.length === 0) {
    checks.push(
      ok(
        "seo.jsonld",
        "Missing JSON-LD",
        "All posts and tools emit structured data (BlogPosting / WebApplication)."
      )
    );
  } else {
    checks.push(
      fail(
        "seo.jsonld",
        "Missing JSON-LD",
        `${jsonLdFailures.length} page(s) without structured data. ${countSummary(jsonLdFailures.map((r) => `${r.kind}: ${r.label}`))}`,
        jsonLdFailures.slice(0, 10).map((record) => ({ label: record.label, href: record.href }))
      )
    );
  }

  const breadcrumbFailures = failureRecord(records, (r) => r.breadcrumb, "Post").concat(
    failureRecord(records, (r) => r.breadcrumb, "Tool")
  );
  if (breadcrumbFailures.length === 0) {
    checks.push(
      ok(
        "seo.breadcrumb",
        "Missing Breadcrumb Schema",
        "All posts and tools emit BreadcrumbList structured data."
      )
    );
  } else {
    checks.push(
      fail(
        "seo.breadcrumb",
        "Missing Breadcrumb Schema",
        `${breadcrumbFailures.length} page(s) without breadcrumb schema. ${countSummary(breadcrumbFailures.map((r) => `${r.kind}: ${r.label}`))}`,
        breadcrumbFailures.slice(0, 10).map((record) => ({ label: record.label, href: record.href }))
      )
    );
  }

  const canonicalCount = new Set(records.map((record) => record.href)).size;
  checks.push(
    canonicalCount === records.length
      ? ok("seo.canonical-unique", "Duplicate canonicals", "Every page uses a unique URL.")
      : warn(
          "seo.canonical-unique",
          "Duplicate canonicals",
          `${records.length - canonicalCount} duplicate URL(s) found across the checked pages.`
        )
  );

  return {
    id: "seo",
    title: "SEO",
    description: "Validates metadata and structured data for posts, tools, and blog categories.",
    checks,
  };
}
