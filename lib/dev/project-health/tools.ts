import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TOOLS } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOL_ROUTE, BLOG_POST_ROUTE } from "@/lib/constants/routes";
import { getAllPosts } from "@/lib/blog/load-posts";
import { countSummary, fail, ok, warn } from "./helpers";
import { buildKnownRoutes, normalizePath } from "./known-routes";
import type { CheckResult, HealthSection } from "./types";

const REQUIRED_TOOL_FIELDS: Array<{ key: keyof (typeof TOOLS)[number]; label: string }> = [
  { key: "name", label: "name" },
  { key: "slug", label: "slug" },
  { key: "description", label: "description" },
  { key: "category", label: "category" },
  { key: "primaryKeyword", label: "primary keyword" },
  { key: "secondaryKeywords", label: "secondary keywords" },
  { key: "searchTags", label: "search tags" },
  { key: "faq", label: "FAQ" },
  { key: "schema", label: "schema" },
];

function extractInternalLinks(markdown: string): string[] {
  const links: string[] = [];
  const markdownLinkPattern = /\[[^\]]*\]\(([^)]+)\)/g;
  let match: RegExpExecArray | null;

  while ((match = markdownLinkPattern.exec(markdown)) !== null) {
    const target = match[1].trim();
    if (/^(https?:\/\/|mailto:|tel:|#)/i.test(target)) continue;
    links.push(target);
  }

  const rawHrefPattern = /href=["'](\/[^"']+)["']/g;
  while ((match = rawHrefPattern.exec(markdown)) !== null) {
    links.push(match[1]);
  }

  return links.map(normalizePath).filter(Boolean);
}

export function runToolChecks(): HealthSection {
  const checks: CheckResult[] = [];

  checks.push(
    ok(
      "tools.total",
      "Total tools",
      `${TOOLS.length} tools registered in the registry`
    )
  );

  const knownCategories = new Set(CATEGORIES.map((category) => category.slug));

  const unknownCategory = TOOLS.filter((tool) => !knownCategories.has(tool.category));
  const routeGroups = new Map<string, string[]>();
  for (const tool of TOOLS) {
    const key = `${tool.category}/${tool.slug}`;
    const list = routeGroups.get(key) ?? [];
    list.push(tool.name);
    routeGroups.set(key, list);
  }
  const collisions = Array.from(routeGroups.entries()).filter(
    ([, names]) => names.length > 1
  );

  const missingPages = [
    ...unknownCategory.map((tool) => `${tool.name} (unknown category "${tool.category}")`),
    ...collisions.map(([route, names]) => `route collision at /${route}: ${names.join(" & ")}`),
  ];

  if (missingPages.length === 0) {
    checks.push(ok("tools.pages", "Missing pages", "All tools map to valid category/slug routes."));
  } else {
    checks.push(
      fail("tools.pages", "Missing pages", `${missingPages.length} tool(s) cannot render a real page. ${countSummary(missingPages)}`)
    );
  }

  const slugCounts = new Map<string, string[]>();
  for (const tool of TOOLS) {
    const list = slugCounts.get(tool.slug) ?? [];
    list.push(tool.name);
    slugCounts.set(tool.slug, list);
  }
  const duplicateSlugs = Array.from(slugCounts.entries()).filter(
    ([, names]) => names.length > 1
  );

  if (duplicateSlugs.length === 0) {
    checks.push(ok("tools.duplicate-slugs", "Duplicate slugs", "All tool slugs are unique."));
  } else {
    checks.push(
      fail(
        "tools.duplicate-slugs",
        "Duplicate slugs",
        `${duplicateSlugs.length} slug(s) used more than once. ${countSummary(duplicateSlugs.map(([slug, names]) => `${slug} (${names.join(" & ")})`))}`
      )
    );
  }

  const knownRoutes = buildKnownRoutes();
  const danglingRelated: string[] = [];
  const brokenContentLinks: string[] = [];

  for (const tool of TOOLS) {
    for (const slug of tool.relatedTools ?? []) {
      if (!TOOLS.some((candidate) => candidate.slug === slug)) {
        danglingRelated.push(`${tool.slug} -> ${slug}`);
      }
    }
  }

  const postsDir = path.join(process.cwd(), "content", "blog", "posts");
  if (fs.existsSync(postsDir)) {
    for (const file of fs.readdirSync(postsDir)) {
      if (!/\.(mdx|md)$/.test(file)) continue;
      const raw = fs.readFileSync(path.join(postsDir, file), "utf8");
      const { content } = matter(raw);
      const slug = path.basename(file, path.extname(file));
      for (const target of extractInternalLinks(content)) {
        if (!knownRoutes.has(target)) {
          brokenContentLinks.push(`${BLOG_POST_ROUTE(slug)} -> ${target}`);
        }
      }
    }
  }

  const brokenLinks = [...danglingRelated.map((link) => `related-tools: ${link}`), ...brokenContentLinks];

  if (brokenLinks.length === 0) {
    checks.push(
      ok(
        "tools.broken-links",
        "Broken links",
        "No dangling related-tool references and no broken internal links found in content."
      )
    );
  } else {
    checks.push(
      fail(
        "tools.broken-links",
        "Broken links",
        `${brokenLinks.length} broken internal link(s). ${countSummary(brokenLinks)}`
      )
    );
  }

  const missingMetadata: string[] = [];
  for (const tool of TOOLS) {
    for (const field of REQUIRED_TOOL_FIELDS) {
      const value = tool[field.key];
      const empty =
        value === undefined ||
        value === null ||
        (typeof value === "string" && value.trim() === "") ||
        (Array.isArray(value) && value.length === 0);
      if (empty) {
        missingMetadata.push(`${tool.slug} (${field.label})`);
      }
    }
  }

  if (missingMetadata.length === 0) {
    checks.push(ok("tools.metadata", "Missing metadata", "All required metadata fields are present."));
  } else {
    checks.push(
      fail("tools.metadata", "Missing metadata", `${missingMetadata.length} missing field(s). ${countSummary(missingMetadata)}`)
    );
  }

  const missingDescriptions = TOOLS.filter((tool) => !tool.description || tool.description.trim() === "");

  if (missingDescriptions.length === 0) {
    checks.push(
      ok(
        "tools.descriptions",
        "Missing descriptions",
        "Every tool has a non-empty description."
      )
    );
  } else {
    checks.push(
      fail(
        "tools.descriptions",
        "Missing descriptions",
        `${missingDescriptions.length} tool(s) without a description. ${countSummary(missingDescriptions.map((tool) => tool.slug))}`,
        missingDescriptions.map((tool) => ({
          label: tool.slug,
          href: TOOL_ROUTE(tool.category, tool.slug),
        }))
      )
    );
  }

  return {
    id: "tools",
    title: "Tools",
    description: "Validates the tool registry and the pages that expose it.",
    checks,
  };
}
