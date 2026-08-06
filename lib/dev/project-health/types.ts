export type CheckStatus = "pass" | "warning" | "error";

export interface CheckLink {
  label: string;
  href: string;
}

export interface CheckResult {
  id: string;
  label: string;
  status: CheckStatus;
  detail?: string;
  links?: CheckLink[];
}

export interface HealthSection {
  id: string;
  title: string;
  description?: string;
  checks: CheckResult[];
}

export interface HealthSummary {
  pass: number;
  warning: number;
  error: number;
  total: number;
}

export interface HealthReport {
  generatedAt: string;
  environment: string;
  sections: HealthSection[];
  summary: HealthSummary;
}
