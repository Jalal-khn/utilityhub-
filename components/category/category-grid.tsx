import * as React from "react";
import { CategoryCard } from "./category-card";
import { cn } from "@/lib/utils/cn";

interface CategoryGridProps {
  categories: ReadonlyArray<{
    name: string;
    description: string;
    slug: string;
    icon?: React.ReactNode;
    count?: number;
    countLabel?: string;
    href?: string;
  }>;
  className?: string;
  columns?: 2 | 3 | 4;
}

export function CategoryGrid({ categories, className, columns = 4 }: CategoryGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {categories.map((category, index) => (
        <CategoryCard key={index} {...category} />
      ))}
    </div>
  );
}
