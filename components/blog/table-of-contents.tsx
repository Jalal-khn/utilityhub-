"use client";

import { List } from "lucide-react";
import { cn } from "@/lib/utils/cn";
import type { TocItem } from "@/lib/blog/types";
import { useActiveHeading } from "./use-active-heading";

interface TableOfContentsProps {
  items: TocItem[];
  className?: string;
}

export function TableOfContents({ items, className }: TableOfContentsProps) {
  const activeId = useActiveHeading(items.map((item) => item.id));

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className={className}>
      <div className="flex items-center gap-2 text-sm font-semibold mb-3">
        <List className="h-4 w-4" />
        Table of contents
      </div>
      <ul className="space-y-1.5 border-l">
        {items.map((item) => (
          <li key={item.id} className={cn(item.level > 2 && "ml-4")}>
            <a
              href={`#${item.id}`}
              className={cn(
                "-ml-px block border-l py-1 pl-4 text-sm transition-colors",
                activeId === item.id
                  ? "border-primary font-medium text-primary"
                  : "border-border text-muted-foreground hover:text-foreground"
              )}
            >
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
