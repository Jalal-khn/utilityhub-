import Link from "next/link";
import { AlertTriangle, CheckCircle2, Info, Lightbulb } from "lucide-react";
import { getToolBySlug, getToolsByCategory } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOL_ROUTE } from "@/lib/constants/routes";
import { SITE_CONFIG } from "@/lib/constants/config";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ToolCard as ToolCardUI } from "@/components/tool/tool-card";
import { ToolGrid as ToolGridUI } from "@/components/tool/tool-grid";
import { cn } from "@/lib/utils/cn";

function categoryNameOf(slug: string): string {
  return CATEGORIES.find((category) => category.slug === slug)?.name ?? slug;
}

interface RelatedToolsProps {
  tools?: string[];
  category?: string;
  title?: string;
}

export function RelatedTools({ tools = [], category, title }: RelatedToolsProps) {
  const resolvedSlugs =
    tools.length > 0
      ? tools
      : category
        ? getToolsByCategory(category).map((tool) => tool.slug)
        : [];

  const resolved = resolvedSlugs
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool))
    .slice(0, 4);

  if (resolved.length === 0) return null;

  return (
    <section className="my-8 rounded-lg border bg-muted/40 p-5">
      <h2 className="text-lg font-semibold mb-3">
        {title ?? "Related tools"}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {resolved.map((tool) => {
          const categoryName = categoryNameOf(tool.category);
          return (
            <Link
              key={tool.slug}
              href={TOOL_ROUTE(tool.category, tool.slug)}
              className="rounded-lg border bg-background p-4 transition-colors hover:border-primary/50 hover:bg-accent"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{tool.name}</span>
                <Badge variant="secondary" className="shrink-0">
                  {categoryName}
                </Badge>
              </div>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                {tool.description}
              </p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

interface ToolCTAProps {
  slug: string;
  label?: string;
  title?: string;
}

export function ToolCTA({ slug, label, title }: ToolCTAProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  return (
    <div className="my-8 flex flex-col items-start gap-4 rounded-lg border bg-primary/5 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h2 className="text-lg font-semibold">
          {title ?? `Try the ${tool.name} tool`}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{tool.description}</p>
      </div>
      <Button asChild className="shrink-0">
        <Link href={TOOL_ROUTE(tool.category, tool.slug)}>
          {label ?? `Open ${tool.name}`}
        </Link>
      </Button>
    </div>
  );
}

interface ToolCardProps {
  slug: string;
}

export function ToolCardBlock({ slug }: ToolCardProps) {
  const tool = getToolBySlug(slug);
  if (!tool) return null;

  return (
    <div className="my-8">
      <ToolCardUI
        name={tool.name}
        description={tool.description}
        category={tool.category}
        categoryLabel={categoryNameOf(tool.category)}
        slug={tool.slug}
        tags={tool.searchTags}
        featured={Boolean(tool.featured)}
      />
    </div>
  );
}

interface ToolGridBlockProps {
  category: string;
  limit?: number;
  columns?: 1 | 2 | 3 | 4;
}

export function ToolGridBlock({
  category,
  limit = 6,
  columns = 3,
}: ToolGridBlockProps) {
  const tools = getToolsByCategory(category)
    .slice(0, limit)
    .map((tool) => ({
      name: tool.name,
      description: tool.description,
      category: tool.category,
      slug: tool.slug,
      tags: tool.searchTags,
      featured: Boolean(tool.featured),
    }));

  if (tools.length === 0) return null;

  return (
    <div className="my-8">
      <ToolGridUI tools={tools} columns={columns} />
    </div>
  );
}

interface CompareToolsProps {
  tools?: string[];
  title?: string;
}

export function CompareTools({ tools = [], title }: CompareToolsProps) {
  const resolved = tools
    .map((slug) => getToolBySlug(slug))
    .filter((tool): tool is NonNullable<typeof tool> => Boolean(tool));

  if (resolved.length < 2) return null;

  const rows = [
    { label: "Tool", render: (tool: (typeof resolved)[number]) => tool.name },
    {
      label: "Category",
      render: (tool: (typeof resolved)[number]) => categoryNameOf(tool.category),
    },
    {
      label: "What it does",
      render: (tool: (typeof resolved)[number]) => tool.description,
    },
    {
      label: "Best for",
      render: (tool: (typeof resolved)[number]) => tool.primaryKeyword,
    },
    {
      label: "Popular",
      render: (tool: (typeof resolved)[number]) => (tool.featured ? "Yes" : "No"),
    },
  ];

  return (
    <section className="my-8">
      {title && <h2 className="text-lg font-semibold mb-3">{title}</h2>}
      <div className="overflow-x-auto rounded-lg border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/40 text-left">
              <th className="p-3 font-semibold">Feature</th>
              {resolved.map((tool) => (
                <th key={tool.slug} className="min-w-40 p-3 font-semibold">
                  <Link
                    href={TOOL_ROUTE(tool.category, tool.slug)}
                    className="text-primary hover:underline"
                  >
                    {tool.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b last:border-0">
                <td className="p-3 align-top font-medium text-muted-foreground">
                  {row.label}
                </td>
                {resolved.map((tool) => (
                  <td key={tool.slug} className="p-3 align-top">
                    {row.render(tool)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

type InfoBoxType = "info" | "tip" | "warning" | "success";

interface InfoBoxProps {
  type?: InfoBoxType;
  title?: string;
  children: React.ReactNode;
}

const INFOBOX_STYLES: Record<
  InfoBoxType,
  { container: string; icon: React.ComponentType<{ className?: string }>; defaultTitle: string }
> = {
  info: {
    container: "border-blue-500/30 bg-blue-500/5 text-blue-800 dark:text-blue-100",
    icon: Info,
    defaultTitle: "Note",
  },
  tip: {
    container: "border-emerald-500/30 bg-emerald-500/5 text-emerald-800 dark:text-emerald-100",
    icon: Lightbulb,
    defaultTitle: "Tip",
  },
  warning: {
    container: "border-amber-500/30 bg-amber-500/5 text-amber-800 dark:text-amber-100",
    icon: AlertTriangle,
    defaultTitle: "Warning",
  },
  success: {
    container: "border-green-500/30 bg-green-500/5 text-green-800 dark:text-green-100",
    icon: CheckCircle2,
    defaultTitle: "Success",
  },
};

export function InfoBox({
  type = "info",
  title,
  children,
}: InfoBoxProps) {
  const style = INFOBOX_STYLES[type];
  const Icon = style.icon;

  return (
    <aside
      className={cn(
        "my-6 rounded-lg border px-5 py-4",
        style.container
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold mb-1">
        <Icon className="h-4 w-4" />
        {title ?? style.defaultTitle}
      </p>
      <div className="text-sm text-muted-foreground">{children}</div>
    </aside>
  );
}

interface YouTubeProps {
  id: string;
  title?: string;
}

export function YouTube({ id, title = "YouTube video" }: YouTubeProps) {
  return (
    <div className="my-8">
      <div className="relative aspect-video overflow-hidden rounded-lg border">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
    </div>
  );
}

export const mdxComponents = {
  RelatedTools,
  ToolCTA,
  ToolCard: ToolCardBlock,
  ToolGrid: ToolGridBlock,
  CompareTools,
  InfoBox,
  YouTube,
  a: (props: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const href = props.href ?? "";
    const isInternal =
      href.startsWith("/") || href.startsWith(SITE_BASE_URL);

    if (isInternal) {
      const path = href.replace(SITE_BASE_URL, "");
      return (
        <Link href={path} {...props}>
          {props.children}
        </Link>
      );
    }
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer nofollow sponsored"
      />
    );
  },
  img: (props: React.ImgHTMLAttributes<HTMLImageElement>) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img {...props} alt={props.alt ?? ""} className="rounded-lg border" />
  ),
  table: (props: React.TableHTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 overflow-x-auto rounded-lg border">
      <table
        {...props}
        className="w-full text-sm [&_thead_th]:bg-muted/40 [&_thead_th]:px-4 [&_thead_th]:py-2.5 [&_thead_th]:text-left [&_thead_th]:font-semibold [&_td]:px-4 [&_td]:py-2.5 [&_td]:align-top [&_tbody_tr]:border-b [&_tbody_tr:last-child]:border-b-0"
      />
    </div>
  ),
  pre: (props: React.HTMLAttributes<HTMLPreElement>) => (
    <pre
      {...props}
      className="my-6 overflow-x-auto rounded-lg border bg-muted p-4 text-sm leading-relaxed"
    />
  ),
  code: (props: React.HTMLAttributes<HTMLElement>) => (
    <code {...props} />
  ),
};

const SITE_BASE_URL = SITE_CONFIG.url;
