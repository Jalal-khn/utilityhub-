import type { ToolEngineConfig } from "./types";

export interface ToolIndex {
  [slug: string]: {
    name: string;
    category: string;
    slug: string;
    primaryKeyword: string;
    secondaryKeywords: string[];
    searchTags: string[];
  };
}

export function findRelatedTools(
  config: ToolEngineConfig,
  toolIndex: ToolIndex,
  limit: number = 4
): string[] {
  const { category, slug, primaryKeyword, secondaryKeywords, searchTags } = config;

  // Calculate relevance score for each tool
  const scoredTools = Object.entries(toolIndex)
    .filter(([toolSlug]) => toolSlug !== slug) // Exclude current tool
    .map(([toolSlug, tool]) => {
      let score = 0;

      // Same category gets high score
      if (tool.category === category) {
        score += 10;
      }

      // Matching primary keyword
      if (tool.primaryKeyword === primaryKeyword) {
        score += 5;
      }

      // Matching secondary keywords
      const matchingSecondary = tool.secondaryKeywords.filter((kw) =>
        secondaryKeywords.includes(kw)
      ).length;
      score += matchingSecondary * 3;

      // Matching search tags
      const matchingTags = tool.searchTags.filter((tag) =>
        searchTags.includes(tag)
      ).length;
      score += matchingTags * 2;

      // Partial keyword match
      const allKeywords = [
        primaryKeyword,
        ...secondaryKeywords,
        ...searchTags,
      ];
      const toolKeywords = [
        tool.primaryKeyword,
        ...tool.secondaryKeywords,
        ...tool.searchTags,
      ];

      allKeywords.forEach((kw) => {
        toolKeywords.forEach((toolKw) => {
          if (kw.toLowerCase().includes(toolKw.toLowerCase()) ||
              toolKw.toLowerCase().includes(kw.toLowerCase())) {
            score += 1;
          }
        });
      });

      return { slug: toolSlug, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.slug);

  return scoredTools;
}

export function buildToolIndex(configs: ToolEngineConfig[]): ToolIndex {
  const index: ToolIndex = {};

  configs.forEach((config) => {
    index[config.slug] = {
      name: config.name,
      category: config.category,
      slug: config.slug,
      primaryKeyword: config.primaryKeyword,
      secondaryKeywords: config.secondaryKeywords,
      searchTags: config.searchTags,
    };
  });

  return index;
}
