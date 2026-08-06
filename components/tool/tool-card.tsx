import * as React from "react";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils/cn";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  categoryLabel?: string;
  slug: string;
  icon?: React.ReactNode;
  tags?: string[];
  featured?: boolean;
  className?: string;
}

export function ToolCard({
  name,
  description,
  category,
  categoryLabel,
  slug,
  icon,
  tags = [],
  featured = false,
  className,
}: ToolCardProps) {
  const href = `/${category}/${slug}`;

  return (
    <Link href={href}>
      <Card
        className={cn(
          "group transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer h-full",
          featured && "border-primary/50 shadow-md",
          className
        )}
      >
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  {icon}
                </div>
              )}
              <div>
                <CardTitle className="text-lg group-hover:text-primary transition-colors">
                  {name}
                </CardTitle>
                <CardDescription className="text-xs">{categoryLabel ?? category}</CardDescription>
              </div>
            </div>
            {featured && (
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {description}
          </p>
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <div className="flex items-center text-sm text-primary font-medium group-hover:translate-x-1 transition-transform">
            Try this tool <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
