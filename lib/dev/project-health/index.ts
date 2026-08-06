import { runToolChecks } from "./tools";
import { runBlogChecks } from "./blog";
import { runSeoChecks } from "./seo";
import { runSitemapChecks } from "./sitemap";
import { runRssChecks } from "./rss";
import { runSearchChecks } from "./search";
import { runBuildChecks } from "./build";
import { runPerformanceChecks } from "./performance";
import type { HealthReport, HealthSection, HealthSummary } from "./types";

export type { HealthReport, HealthSection, HealthSummary, CheckResult, CheckStatus } from "./types";

export async function runAllChecks(): Promise<HealthReport> {
  const sections: HealthSection[] = [
    runToolChecks(),
    runBlogChecks(),
    runSeoChecks(),
    runSitemapChecks(),
    await runRssChecks(),
    await runSearchChecks(),
    runBuildChecks(),
    runPerformanceChecks(),
  ];

  const summary: HealthSummary = sections.reduce(
    (acc, section) => {
      for (const result of section.checks) {
        acc.total += 1;
        if (result.status === "pass") acc.pass += 1;
        if (result.status === "warning") acc.warning += 1;
        if (result.status === "error") acc.error += 1;
      }
      return acc;
    },
    { pass: 0, warning: 0, error: 0, total: 0 }
  );

  return {
    generatedAt: new Date().toISOString(),
    environment: process.env.NODE_ENV ?? "unknown",
    sections,
    summary,
  };
}
