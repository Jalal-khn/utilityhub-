import type { Link, Root, Text } from "mdast";
import { TOOLS } from "@/lib/constants/tools";
import { TOOL_ROUTE } from "@/lib/constants/routes";

interface ToolPattern {
  value: string;
  slug: string;
  category: string;
  regexSource: string;
}

const SKIP_TYPES = new Set([
  "code",
  "inlineCode",
  "heading",
  "link",
  "linkReference",
  "image",
  "imageReference",
  "mdxJsxFlowElement",
  "mdxJsxTextElement",
]);

const TOOL_PATTERNS: ToolPattern[] = TOOLS.flatMap((tool) => {
  const phrases = new Set([
    tool.name,
    tool.slug,
    tool.slug.replace(/-/g, " "),
  ]);
  return Array.from(phrases).map((phrase) => ({
    value: phrase.toLowerCase(),
    slug: tool.slug,
    category: tool.category,
    regexSource: phrase
      .toLowerCase()
      .split(/\s+/)
      .map((word) => word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
      .join("\\s+"),
  }));
}).sort((a, b) => b.value.length - a.value.length);

function linkifyText(
  value: string,
  linkedTools: Set<string>
): Array<Text | Link> | null {
  const patterns = TOOL_PATTERNS.filter((pattern) => !linkedTools.has(pattern.slug));
  if (patterns.length === 0) return null;

  const regex = new RegExp(
    `(?<!\\p{L}\\p{N})(${patterns.map((pattern) => pattern.regexSource).join("|")})(?!\\p{L}\\p{N})`,
    "giu"
  );

  const output: Array<Text | Link> = [];
  let lastIndex = 0;
  let matched = false;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(value)) !== null) {
    const matchedText = match[0];
    const pattern = patterns.find(
      (item) => item.value === matchedText.toLowerCase()
    );

    if (pattern && !linkedTools.has(pattern.slug)) {
      if (match.index > lastIndex) {
        output.push({ type: "text", value: value.slice(lastIndex, match.index) });
      }
      output.push({
        type: "link",
        url: TOOL_ROUTE(pattern.category, pattern.slug),
        children: [{ type: "text", value: matchedText }],
      });
      linkedTools.add(pattern.slug);
      matched = true;
      lastIndex = match.index + matchedText.length;
    }
  }

  if (!matched) return null;

  if (lastIndex < value.length) {
    output.push({ type: "text", value: value.slice(lastIndex) });
  }

  return output;
}

function visitChildren(
  parent: {
    type?: string;
    children: Array<{ type: string; children?: unknown; value?: unknown }>;
  },
  linkedTools: Set<string>
): void {
  if (SKIP_TYPES.has(parent.type ?? "")) return;

  const children = parent.children;
  for (let index = 0; index < children.length; index++) {
    const child = children[index];

    if (SKIP_TYPES.has(child.type)) continue;

    if (child.type === "text") {
      const replaced = linkifyText(String(child.value), linkedTools);
      if (replaced) {
        children.splice(index, 1, ...replaced);
        index += replaced.length - 1;
      }
    } else if (Array.isArray(child.children)) {
      visitChildren(
        child as unknown as {
          type?: string;
          children: Array<{ type: string; children?: unknown; value?: unknown }>;
        },
        linkedTools
      );
    }
  }
}

export function remarkToolLinks() {
  return (tree: Root): void => {
    const linkedTools = new Set<string>();
    visitChildren(
      tree as unknown as {
        type?: string;
        children: Array<{ type: string; children?: unknown; value?: unknown }>;
      },
      linkedTools
    );
  };
}
