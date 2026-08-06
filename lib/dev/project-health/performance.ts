import fs from "fs";
import path from "path";
import { formatBytes, gzipSize, ok, warn, countSummary } from "./helpers";
import type { CheckResult, HealthSection } from "./types";

const ROOT = process.cwd();
const LARGE_JS_THRESHOLD = 120 * 1024;
const LARGE_IMAGE_THRESHOLD = 200 * 1024;

interface BundleFile {
  relative: string;
  rawBytes: number;
  gzipBytes: number;
}

function collectFiles(dir: string, extensions: string[]): string[] {
  if (!fs.existsSync(dir)) return [];
  const results: string[] = [];
  const queue = [dir];
  while (queue.length > 0) {
    const current = queue.pop();
    if (!current) continue;
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const full = path.join(current, entry.name);
      if (entry.isDirectory()) {
        queue.push(full);
      } else if (extensions.includes(path.extname(entry.name).toLowerCase())) {
        results.push(full);
      }
    }
  }
  return results;
}

function measureBundles(): { files: BundleFile[]; production: boolean } {
  const chunksDir = path.join(ROOT, ".next", "static");
  const files = collectFiles(chunksDir, [".js", ".css"]);
  const production = fs.existsSync(path.join(ROOT, ".next", "BUILD_ID"));

  const bundles: BundleFile[] = files.map((file) => {
    const buffer = fs.readFileSync(file);
    return {
      relative: file.replace(path.join(ROOT, ".next"), "_next"),
      rawBytes: buffer.length,
      gzipBytes: gzipSize(buffer),
    };
  });

  return { files: bundles.sort((a, b) => b.gzipBytes - a.gzipBytes), production };
}

function largeImages(): string[] {
  const publicDir = path.join(ROOT, "public");
  const files = collectFiles(publicDir, [".png", ".jpg", ".jpeg", ".webp", ".gif", ".avif"]);
  return files
    .map((file) => ({
      relative: `/${file.replace(publicDir + path.sep, "").replace(/\\/g, "/")}`,
      bytes: fs.statSync(file).size,
    }))
    .filter((image) => image.bytes > LARGE_IMAGE_THRESHOLD)
    .map((image) => `${image.relative} (${formatBytes(image.bytes)})`);
}

function imagesWithoutLazyLoading(): string[] {
  const dirs = [
    path.join(ROOT, "app"),
    path.join(ROOT, "components"),
  ];
  const files = dirs.flatMap((dir) => collectFiles(dir, [".tsx"]));
  const offenders: string[] = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    const imgPattern = /<img\b[^>]*>/g;
    let match: RegExpExecArray | null;
    while ((match = imgPattern.exec(content)) !== null) {
      const tag = match[0];
      if (!/loading\s*=\s*["']lazy["']/i.test(tag)) {
        const relative = file.replace(ROOT + path.sep, "").replace(/\\/g, "/");
        if (!offenders.includes(relative)) offenders.push(relative);
      }
    }
  }

  return offenders;
}

export function runPerformanceChecks(): HealthSection {
  const checks: CheckResult[] = [];

  const { files, production } = measureBundles();
  if (files.length === 0) {
    checks.push(
      warn(
        "perf.js",
        "Large JavaScript bundles",
        "No static bundle output found. Run a production build to measure bundle sizes."
      )
    );
  } else {
    const large = files.filter((file) => file.gzipBytes > LARGE_JS_THRESHOLD);
    const top = files.slice(0, 5).map(
      (file) => `${file.relative} (${formatBytes(file.gzipBytes)} gzip)`
    );

    if (large.length === 0) {
      checks.push(
        ok(
          "perf.js",
          "Large JavaScript bundles",
          `${production ? "Production" : "Dev"} build: no JavaScript or CSS bundle exceeds ${formatBytes(LARGE_JS_THRESHOLD)} gzip. Top bundle: ${top[0] ?? "n/a"}`
        )
      );
    } else {
      checks.push(
        warn(
          "perf.js",
          "Large JavaScript bundles",
          `${large.length} bundle(s) exceed ${formatBytes(LARGE_JS_THRESHOLD)} gzip. ${countSummary(top)}`,
          large.slice(0, 5).map((file) => ({
            label: `${file.relative} (${formatBytes(file.gzipBytes)} gzip)`,
            href: file.relative,
          }))
        )
      );
    }
  }

  const oversized = largeImages();
  if (oversized.length === 0) {
    checks.push(
      ok(
        "perf.images",
        "Large images",
        `No image in /public exceeds ${formatBytes(LARGE_IMAGE_THRESHOLD)}.`
      )
    );
  } else {
    checks.push(
      warn(
        "perf.images",
        "Large images",
        `${oversized.length} image(s) exceed ${formatBytes(LARGE_IMAGE_THRESHOLD)}. ${countSummary(oversized)}`,
        oversized.slice(0, 10).map((image) => ({
          label: image,
          href: image.split(" ")[0],
        }))
      )
    );
  }

  const noLazy = imagesWithoutLazyLoading();
  if (noLazy.length === 0) {
    checks.push(
      ok(
        "perf.lazy-loading",
        "Missing lazy loading",
        "No raw <img> tags without loading=\"lazy\" found (next/image is lazy by default)."
      )
    );
  } else {
    checks.push(
      warn(
        "perf.lazy-loading",
        "Missing lazy loading",
        `${noLazy.length} component(s) use raw <img> without loading="lazy". ${countSummary(noLazy)}`
      )
    );
  }

  return {
    id: "performance",
    title: "Performance",
    description: "Heuristic checks for bundle size, image weight, and lazy loading.",
    checks,
  };
}
