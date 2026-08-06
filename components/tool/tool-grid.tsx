import * as React from "react";
import { ToolCard } from "./tool-card";
import { cn } from "@/lib/utils/cn";

interface ToolGridProps {
  tools: ReadonlyArray<{
    name: string;
    description: string;
    category: string;
    slug: string;
    icon?: React.ReactNode;
    tags?: string[];
    featured?: boolean;
  }>;
  className?: string;
  columns?: 1 | 2 | 3 | 4;
}

export function ToolGrid({ tools, className, columns = 3 }: ToolGridProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {tools.map((tool, index) => (
        <ToolCard key={index} {...tool} />
      ))}
    </div>
  );
}
