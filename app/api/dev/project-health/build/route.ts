import { NextResponse } from "next/server";
import {
  runTypecheck,
  runLint,
  type CommandResult,
} from "@/lib/dev/project-health/build";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALLOWED_COMMANDS = ["typecheck", "lint"] as const;
type CommandName = (typeof ALLOWED_COMMANDS)[number];

export async function POST(request: Request) {
  if (process.env.NODE_ENV !== "development") {
    return NextResponse.json({ error: "Not available in production." }, { status: 404 });
  }

  let body: { command?: unknown };
  try {
    body = (await request.json()) as { command?: unknown };
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const command = body.command;
  if (command === "build") {
    return NextResponse.json(
      {
        error:
          "A production build cannot run from the dev dashboard: it overwrites the shared .next directory and stops the dev server. Stop the dev server and run `npm run build` instead.",
      },
      { status: 409 }
    );
  }

  if (!ALLOWED_COMMANDS.includes(command as CommandName)) {
    return NextResponse.json(
      { error: `Unknown command. Allowed: ${ALLOWED_COMMANDS.join(", ")}.` },
      { status: 400 }
    );
  }

  const result: CommandResult =
    command === "typecheck" ? await runTypecheck() : await runLint();

  return NextResponse.json(result);
}
