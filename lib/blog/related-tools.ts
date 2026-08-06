import { TOOLS, getToolBySlug } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOL_ROUTE } from "@/lib/constants/routes";
import type { BlogPostSummary, RelatedTool } from "./types";

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/g)
    .filter((token) => token.length > 0);
}

function keywordMatchScore(haystack: string[], needle: string): number {
  let score = 0;
  for (const term of needle.split(/\s+/)) {
    if (term.length < 3) continue;
    if (haystack.includes(term)) score += 2;
    else if (haystack.some((token) => token.includes(term))) score += 1;
  }
  return score;
}

export function findRelatedToolsForPost(
  post: BlogPostSummary,
  limit = 3
): RelatedTool[] {
  const articleTerms = new Set(
    tokenize(
      [
        post.title,
        post.description,
        post.categoryName,
        ...post.tags,
        ...post.keywords,
      ].join(" ")
    )
  );

  const explicitMatches = post.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
    .slice(0, limit);

  if (explicitMatches.length > 0) {
    return explicitMatches.map(toRelatedTool);
  }

  const scored = TOOLS.map((tool) => {
    let score = 0;

    const toolTerms = new Set(
      tokenize(
        [
          tool.name,
          tool.description,
          tool.primaryKeyword,
          ...tool.secondaryKeywords,
          ...tool.searchTags,
        ].join(" ")
      )
    );

    for (const term of articleTerms) {
      if (toolTerms.has(term)) score += 3;
      else if (tool.name.toLowerCase().includes(term)) score += 2;
    }

    const keywordTerms = tokenize(
      [post.title, post.description, ...post.tags, ...post.keywords].join(" ")
    );
    score += keywordMatchScore(
      tokenize(tool.primaryKeyword),
      keywordTerms.join(" ")
    );

    if (score === 0 && tool.category === post.category) score += 1;

    return { tool, score };
  })
    .sort((a, b) => b.score - a.score)
    .filter((item) => item.score > 0)
    .slice(0, limit)
    .map((item) => item.tool);

  if (scored.length > 0) {
    return scored.map(toRelatedTool);
  }

  return TOOLS.slice(0, limit).map(toRelatedTool);
}

function toRelatedTool(tool: (typeof TOOLS)[number]): RelatedTool {
  const categoryName =
    CATEGORIES.find((category) => category.slug === tool.category)?.name ??
    tool.category;

  return {
    slug: tool.slug,
    name: tool.name,
    description: tool.description,
    category: tool.category,
    categoryName,
    href: TOOL_ROUTE(tool.category, tool.slug),
  };
}
