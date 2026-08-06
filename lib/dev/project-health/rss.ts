import { GET } from "@/app/blog/feed.xml/route";
import { SITE_CONFIG } from "@/lib/constants/config";
import { getAllPostSummaries } from "@/lib/blog/load-posts";
import { BLOG_POST_ROUTE } from "@/lib/constants/routes";
import { countSummary, fail, ok } from "./helpers";
import type { CheckResult, HealthSection } from "./types";

export async function runRssChecks(): Promise<HealthSection> {
  const checks: CheckResult[] = [];

  let itemCount = 0;
  let feedLinks: string[] = [];
  let xml = "";

  try {
    const response = await GET();
    xml = await response.text();
    itemCount = (xml.match(/<item>/g) ?? []).length;
    feedLinks = Array.from(xml.matchAll(/<link>(.*?)<\/link>/g)).map(
      (match) => match[1]
    );
  } catch (error) {
    checks.push(
      fail(
        "rss.feed",
        "RSS generation",
        `The feed route threw an error: ${error instanceof Error ? error.message : String(error)}`
      )
    );
    return {
      id: "rss",
      title: "RSS",
      description: "Validates the generated blog feed.xml.",
      checks,
    };
  }

  const posts = getAllPostSummaries();

  checks.push(
    ok("rss.total", "Total entries", `${itemCount} item(s) in the feed for ${posts.length} published post(s)`)
  );

  const feedLinksSet = new Set(feedLinks);
  const missingEntries = posts.filter(
    (post) => !feedLinksSet.has(`${SITE_CONFIG.url}${BLOG_POST_ROUTE(post.slug)}`)
  );

  if (missingEntries.length === 0) {
    checks.push(
      ok("rss.missing", "Missing entries", "Every published post appears in the feed.")
    );
  } else {
    checks.push(
      fail(
        "rss.missing",
        "Missing entries",
        `${missingEntries.length} published post(s) missing from the feed. ${countSummary(missingEntries.map((post) => post.slug))}`
      )
    );
  }

  const validXml =
    xml.trimStart().startsWith("<?xml") &&
    xml.includes("<rss") &&
    itemCount === posts.length;

  checks.push(
    validXml
      ? ok("rss.valid", "Feed validity", "The feed is valid XML with matching item count.")
      : fail("rss.valid", "Feed validity", "The feed output is invalid or its item count does not match published posts.")
  );

  return {
    id: "rss",
    title: "RSS",
    description: "Validates the generated blog feed.xml.",
    checks,
  };
}
