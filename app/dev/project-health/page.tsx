import { notFound } from "next/navigation";
import Link from "next/link";
import { CheckCircle2, AlertTriangle, XCircle, ShieldAlert } from "lucide-react";
import { runAllChecks, type CheckResult, type HealthReport } from "@/lib/dev/project-health";
import { CommandRunner } from "@/components/dev/project-health/command-runner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const STATUS_ICONS: Record<CheckResult["status"], { icon: typeof CheckCircle2; className: string; label: string }> = {
  pass: { icon: CheckCircle2, className: "text-emerald-500", label: "PASS" },
  warning: { icon: AlertTriangle, className: "text-amber-500", label: "WARNING" },
  error: { icon: XCircle, className: "text-red-500", label: "ERROR" },
};

const BADGE_VARIANTS: Record<CheckResult["status"], "default" | "secondary" | "destructive"> = {
  pass: "default",
  warning: "secondary",
  error: "destructive",
};

function CheckRow({ result }: { result: CheckResult }) {
  const status = STATUS_ICONS[result.status];
  const Icon = status.icon;

  return (
    <div className="flex items-start gap-3 border-b py-3 last:border-0">
      <Icon className={`mt-0.5 h-5 w-5 shrink-0 ${status.className}`} aria-hidden />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold">{result.label}</span>
          <Badge variant={BADGE_VARIANTS[result.status]}>{status.label}</Badge>
        </div>
        {result.detail && (
          <p className="mt-1 text-sm text-muted-foreground">{result.detail}</p>
        )}
        {result.links && result.links.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
            {result.links.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link.href}
                className="text-xs text-primary underline-offset-4 hover:underline"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  label,
  count,
  className,
}: {
  label: string;
  count: number;
  className: string;
}) {
  return (
    <div className={`rounded-lg border px-4 py-3 ${className}`}>
      <div className="text-2xl font-bold">{count}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export default async function ProjectHealthPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  const report: HealthReport = await runAllChecks();
  const { summary } = report;

  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <div className="mb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-bold tracking-tight">Project Health</h1>
          <Badge variant="outline" className="border-amber-500/40 bg-amber-500/10 text-amber-500">
            <ShieldAlert className="mr-1 h-3 w-3" />
            Development only
          </Badge>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Automatic validation of the tool registry, blog engine, SEO metadata, sitemap, RSS, search
          index, build pipeline, and performance. Generated at{" "}
          <time dateTime={report.generatedAt}>
            {new Date(report.generatedAt).toLocaleString()}
          </time>{" "}
          in {report.environment} mode.
        </p>
      </div>

      <div className="mb-6 grid grid-cols-3 gap-3">
        <StatCard label="PASS" count={summary.pass} className="bg-emerald-500/5" />
        <StatCard label="WARNING" count={summary.warning} className="bg-amber-500/5" />
        <StatCard label="ERROR" count={summary.error} className="bg-red-500/5" />
      </div>

      <div className="space-y-6">
        {report.sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle>{section.title}</CardTitle>
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-emerald-600">
                    {section.checks.filter((result) => result.status === "pass").length} pass
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-semibold text-amber-600">
                    {section.checks.filter((result) => result.status === "warning").length} warning
                  </span>
                  <span className="text-muted-foreground">·</span>
                  <span className="font-semibold text-red-600">
                    {section.checks.filter((result) => result.status === "error").length} error
                  </span>
                </div>
              </div>
              {section.description && (
                <CardDescription>{section.description}</CardDescription>
              )}
            </CardHeader>
            <CardContent className="pt-0">
              {section.checks.map((result) => (
                <CheckRow key={result.id} result={result} />
              ))}

              {section.id === "build" && (
                <div className="mt-4 border-t pt-4">
                  <CommandRunner />
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="mt-6 text-xs text-muted-foreground">
        This route is guarded to development mode only. It is excluded from the sitemap and returns
        404 in production builds. Static checks run on every page load; TypeScript and ESLint run on
        demand from the Build section. The production build is verified by running{" "}
        <code className="rounded bg-muted px-1 py-0.5">npm run build</code> from a stopped dev server.
      </p>
    </main>
  );
}
