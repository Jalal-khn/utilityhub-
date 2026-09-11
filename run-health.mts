import { runAllChecks } from "@/lib/dev/project-health";
import { TOOLS } from "@/lib/constants/tools";
import fs from "fs";

async function main() {
  const report = await runAllChecks();
  console.log("SUMMARY:", JSON.stringify(report.summary));

  const toolSection = report.sections.find((s) => s.id === "tools");
  if (toolSection) {
    console.log("\n--- TOOLS CHECKS ---");
    for (const c of toolSection.checks) {
      console.log(`[${c.status.toUpperCase()}] ${c.label}: ${c.detail}`);
    }
  }

  const urls = TOOLS.map((t) => `https://yourutilityhub.com/${t.category}/${t.slug}`);
  fs.writeFileSync("_tool_urls.txt", urls.join("\n"));
  console.log("\nWrote", urls.length, "tool URLs to _tool_urls.txt");
}
main().catch((e) => {
  console.error("FAILED:", e.message);
  process.exit(1);
});