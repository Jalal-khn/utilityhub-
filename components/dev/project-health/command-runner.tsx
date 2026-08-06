"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Play, TerminalSquare } from "lucide-react";

interface CommandResult {
  command: string;
  status: "pass" | "error";
  code: number | null;
  durationMs: number;
  output: string;
}

type CommandName = "typecheck" | "lint";

const COMMAND_LABELS: Record<CommandName, string> = {
  typecheck: "Run type-check",
  lint: "Run ESLint",
};

const COMMAND_DESCRIPTIONS: Record<CommandName, string> = {
  typecheck: "Executes tsc --noEmit against the whole project. Safe while the dev server runs.",
  lint: "Executes next lint using the project ESLint config. Safe while the dev server runs.",
};

export function CommandRunner() {
  const [running, setRunning] = React.useState<CommandName | null>(null);
  const [results, setResults] = React.useState<Partial<Record<CommandName, CommandResult>>>({});
  const [error, setError] = React.useState<string | null>(null);

  async function run(command: CommandName) {
    setError(null);
    setRunning(command);
    try {
      const response = await fetch("/api/dev/project-health/build", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ command }),
      });
      if (!response.ok) {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(payload?.error ?? `Request failed (${response.status})`);
      }
      const result = (await response.json()) as CommandResult;
      setResults((previous) => ({ ...previous, [command]: result }));
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setRunning(null);
    }
  }

  return (
    <div className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        {(["typecheck", "lint"] as CommandName[]).map((command) => {
          const result = results[command];
          const isRunning = running === command;
          return (
            <div key={command} className="flex flex-col gap-2 rounded-lg border bg-muted/30 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-medium">{COMMAND_LABELS[command]}</span>
                {result ? (
                  <span
                    className={
                      result.status === "pass"
                        ? "text-sm font-semibold text-emerald-500"
                        : "text-sm font-semibold text-red-500"
                    }
                  >
                    {result.status === "pass" ? "PASS" : "ERROR"}
                  </span>
                ) : isRunning ? (
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                ) : null}
              </div>
              <p className="text-xs text-muted-foreground">{COMMAND_DESCRIPTIONS[command]}</p>
              <Button
                size="sm"
                disabled={isRunning}
                onClick={() => run(command)}
                className="mt-auto"
              >
                {isRunning ? "Running..." : (
                  <>
                    <Play className="mr-1 h-3 w-3" />
                    Run
                  </>
                )}
              </Button>
              {result && (
                <span className="text-xs text-muted-foreground">
                  {result.status === "pass" ? "Completed" : "Failed"} in {(result.durationMs / 1000).toFixed(1)}s
                  {result.code !== null ? ` (exit ${result.code})` : ""}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-start gap-2 rounded-lg border border-amber-500/40 bg-amber-500/5 p-3 text-sm">
        <TerminalSquare className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden />
        <p className="text-xs leading-relaxed text-muted-foreground">
          <span className="font-semibold text-foreground">Production build is not run from here.</span>{" "}
          <code>next build</code> overwrites the shared <code>.next</code> directory that the dev server
          uses, which stops localhost. To verify the production build, stop the dev server and run{" "}
          <code className="rounded bg-muted px-1 py-0.5">npm run build</code>, then start it again.
        </p>
      </div>

      {error && <p className="text-sm font-medium text-red-500">{error}</p>}

      {(["typecheck", "lint"] as CommandName[]).some((command) => results[command]) && (
        <div className="rounded-lg border bg-card">
          {(["typecheck", "lint"] as CommandName[]).map((command) => {
            const result = results[command];
            if (!result) return null;
            return (
              <details key={command} className="group border-b last:border-0">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-2.5 text-sm font-medium">
                  <span>{COMMAND_LABELS[command]} output</span>
                  <span
                    className={
                      result.status === "pass" ? "text-emerald-500" : "text-red-500"
                    }
                  >
                    {result.status === "pass" ? "✔" : "✖"}
                  </span>
                </summary>
                <pre className="max-h-64 overflow-auto whitespace-pre-wrap bg-muted/40 px-4 py-3 text-xs leading-relaxed">
                  {result.output || "(no output)"}
                </pre>
              </details>
            );
          })}
        </div>
      )}
    </div>
  );
}
