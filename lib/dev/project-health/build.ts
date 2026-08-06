import fs from "fs";
import path from "path";
import { execFile } from "child_process";
import { ok, warn } from "./helpers";
import type { CheckResult, HealthSection } from "./types";

export interface CommandResult {
  command: string;
  status: "pass" | "error";
  code: number | null;
  durationMs: number;
  output: string;
}

const ROOT = process.cwd();

function binPath(module: string, bin: string): string {
  return path.join(ROOT, "node_modules", module, bin);
}

function runCommand(module: string, bin: string, args: string[], timeoutMs: number): Promise<CommandResult> {
  const fullBin = binPath(module, bin);
  return new Promise((resolve) => {
    const startedAt = Date.now();
    execFile(
      process.execPath,
      [fullBin, ...args],
      { cwd: ROOT, timeout: timeoutMs, maxBuffer: 8 * 1024 * 1024 },
      (error, stdout, stderr) => {
        const output = `${stdout}\n${stderr}`.trim();
        const code = typeof error === "object" && error !== null ? (error as { code?: number | string }).code ?? 1 : 0;
        resolve({
          command: `${bin} ${args.join(" ")}`,
          status: code === 0 ? "pass" : "error",
          code: typeof code === "number" ? code : null,
          durationMs: Date.now() - startedAt,
          output: output.slice(0, 4000),
        });
      }
    );
  });
}

/** Runs `tsc --noEmit`. Safe to run while the dev server is active. */
export function runTypecheck(): Promise<CommandResult> {
  return runCommand("typescript", "bin/tsc", ["--noEmit"], 180_000);
}

/** Runs `next lint`. Safe to run while the dev server is active. */
export function runLint(): Promise<CommandResult> {
  return runCommand("next", "dist/bin/next", ["lint"], 240_000);
}

export interface LastBuildInfo {
  exists: boolean;
  builtAt: string;
  mode: "development" | "production" | "unknown";
}

export function getLastBuildInfo(): LastBuildInfo {
  const buildIdPath = path.join(ROOT, ".next", "BUILD_ID");
  const devDir = path.join(ROOT, ".next", "dev");
  const exists = fs.existsSync(buildIdPath);
  const dev = fs.existsSync(devDir);

  return {
    exists,
    builtAt: exists ? new Date(fs.statSync(buildIdPath).mtime).toISOString() : "",
    mode: exists ? "production" : dev ? "development" : "unknown",
  };
}

export const MANUAL_BUILD_COMMAND = "npm run build";

export function runBuildChecks(): HealthSection {
  const checks: CheckResult[] = [];
  const info = getLastBuildInfo();

  checks.push(
    info.exists
      ? ok("build.last-build", "Last build", `Production build detected from ${info.builtAt}.`)
      : warn(
          "build.last-build",
          "Last build",
          info.mode === "development"
            ? "The current .next output is from next dev, so no production build has been verified yet."
            : "No build output found in .next."
      )
  );

  checks.push(
    warn(
      "build.run-checks",
      "Run checks",
      "TypeScript and ESLint run from this dashboard (safe while dev runs). A production build cannot run here: `next build` overwrites the shared .next directory and will stop the dev server - run `npm run build` from a stopped server instead.",
      [{ label: "Open project root", href: "/" }]
    )
  );

  return {
    id: "build",
    title: "Build",
    description: "TypeScript and ESLint status are checked on demand below. Production build status is read from the last real build (see .next/BUILD_ID).",
    checks,
  };
}
