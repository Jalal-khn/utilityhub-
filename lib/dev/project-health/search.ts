import { GET } from "@/app/api/search/route";
import { TOOLS } from "@/lib/constants/tools";
import { getAllPostSummaries } from "@/lib/blog/load-posts";
import { fail, ok } from "./helpers";
import type { CheckResult, HealthSection } from "./types";

interface SearchResponse {
  results: Array<{ slug: string; name: string }>;
  posts: Array<{ slug: string; title: string }>;
}

async function runQuery(query: string): Promise<SearchResponse> {
  const response = await GET(new Request(`http://localhost/search?q=${encodeURIComponent(query)}`));
  return (await response.json()) as SearchResponse;
}

export async function runSearchChecks(): Promise<HealthSection> {
  const checks: CheckResult[] = [];
  const tools = TOOLS;
  const posts = getAllPostSummaries();

  let indexedTools = 0;
  const missingTools: string[] = [];
  for (const tool of tools) {
    const response = await runQuery(tool.name);
    if (response.results.some((result) => result.slug === tool.slug)) {
      indexedTools += 1;
    } else {
      missingTools.push(tool.slug);
    }
  }

  checks.push(
    indexedTools === tools.length
      ? ok("search.tools", "Indexed tools", `All ${tools.length} tools are discoverable via search.`)
      : fail(
          "search.tools",
          "Indexed tools",
          `${indexedTools}/${tools.length} tools discoverable via search. Missing: ${missingTools.join(", ") || "none"}`
        )
  );

  let indexedPosts = 0;
  const missingPosts: string[] = [];
  for (const post of posts) {
    const response = await runQuery(post.title);
    if (response.posts.some((item) => item.slug === post.slug)) {
      indexedPosts += 1;
    } else {
      missingPosts.push(post.slug);
    }
  }

  checks.push(
    indexedPosts === posts.length
      ? ok("search.posts", "Indexed articles", `All ${posts.length} published posts are discoverable via search.`)
      : fail(
          "search.posts",
          "Indexed articles",
          `${indexedPosts}/${posts.length} posts discoverable via search. Missing: ${missingPosts.join(", ") || "none"}`
        )
  );

  return {
    id: "search",
    title: "Search",
    description: "Validates that the /api/search index returns every tool and published post.",
    checks,
  };
}
