import { gzipSync } from "zlib";
import type { CheckLink, CheckResult, CheckStatus } from "./types";

export function check(
  id: string,
  label: string,
  status: CheckStatus,
  detail?: string,
  links?: CheckLink[]
): CheckResult {
  return { id, label, status, detail, links };
}

export function ok(id: string, label: string, detail?: string, links?: CheckLink[]): CheckResult {
  return check(id, label, "pass", detail, links);
}

export function warn(id: string, label: string, detail?: string, links?: CheckLink[]): CheckResult {
  return check(id, label, "warning", detail, links);
}

export function fail(id: string, label: string, detail?: string, links?: CheckLink[]): CheckResult {
  return check(id, label, "error", detail, links);
}

export function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const index = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), units.length - 1);
  const value = bytes / 1024 ** index;
  return `${value.toFixed(value >= 100 || index === 0 ? 0 : 1)} ${units[index]}`;
}

export function gzipSize(buffer: Buffer): number {
  return gzipSync(buffer, { level: 9 }).length;
}

export function truncate(value: string, maxLength: number): string {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
}

export function countSummary(issues: string[]): string {
  if (issues.length === 0) return "No issues found.";
  const preview = issues.slice(0, 5).join(", ");
  if (issues.length <= 5) return preview;
  return `${preview}, +${issues.length - 5} more`;
}
