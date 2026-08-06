import * as React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils/cn";

interface CategoryCardProps {
  name: string;
  description: string;
  slug: string;
  icon?: React.ReactNode;
  count?: number;
  countLabel?: string;
  href?: string;
  className?: string;
}

export function CategoryCard({
  name,
  description,
  slug,
  icon,
  count,
  countLabel = "tools",
  href = `/${slug}`,
  className,
}: CategoryCardProps) {
  return (
    <Link href={href} className="block h-full">
      <Card
        className={cn(
          "group h-full cursor-pointer overflow-hidden border-border/60 bg-card/90 transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-lg",
          className
        )}
      >
        <CardHeader className="p-6">
          <div className="mb-3 flex items-start gap-3">
            {icon && (
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                {icon}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg font-semibold leading-tight text-foreground transition-colors sm:text-xl">
                <span className="block max-w-full text-left leading-snug transition-colors duration-200 group-hover:text-primary">
                  {name}
                </span>
              </CardTitle>
              {count !== undefined && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {count} {countLabel}
                </p>
              )}
            </div>
          </div>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 pb-6 pt-0">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition-all group-hover:translate-x-1 group-hover:bg-primary group-hover:text-primary-foreground">
            Explore category <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
