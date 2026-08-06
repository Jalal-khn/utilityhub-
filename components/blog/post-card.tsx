import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PostImage } from "./post-image";
import { BLOG_CATEGORY_ROUTE, BLOG_POST_ROUTE } from "@/lib/constants/routes";
import { formatDateShort } from "@/lib/blog/format";
import type { BlogPostSummary } from "@/lib/blog/types";
import { cn } from "@/lib/utils/cn";

interface PostCardProps {
  post: BlogPostSummary;
  className?: string;
}

export function PostCard({ post, className }: PostCardProps) {
  return (
    <Card
      className={cn(
        "group relative h-full overflow-hidden transition-all hover:shadow-lg hover:border-primary/50"
      )}
    >
      <Link
        href={BLOG_POST_ROUTE(post.slug)}
        className="absolute inset-0 z-10"
        aria-label={post.title}
      />
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <PostImage
          src={post.featuredImage}
          alt={post.title}
          imgClassName="transition-transform duration-300 group-hover:scale-105"
        />
        {post.featured && (
          <Badge className="absolute left-3 top-3" variant="default">
            Featured
          </Badge>
        )}
      </div>
      <CardContent className="p-5">
        <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
          <Link
            href={BLOG_CATEGORY_ROUTE(post.category)}
            className="relative z-20 font-medium text-primary hover:underline"
          >
            {post.categoryName}
          </Link>
          <span className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatDateShort(post.publishedDate)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.readingTime} min read
          </span>
        </div>
        <h2 className="mb-2 text-lg font-semibold leading-snug group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h2>
        <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>
        <div className="flex items-center text-sm font-medium text-primary group-hover:translate-x-1 transition-transform">
          Read article <ArrowRight className="ml-1 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );
}
