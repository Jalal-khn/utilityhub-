import type { BlogPostSummary } from "@/lib/blog/types";
import { PostCard } from "./post-card";
import { cn } from "@/lib/utils/cn";

interface BlogGridProps {
  posts: BlogPostSummary[];
  columns?: 1 | 2 | 3;
  className?: string;
}

const gridCols = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
};

export function BlogGrid({ posts, columns = 3, className }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 py-16 text-center text-muted-foreground">
        No articles found yet. Check back soon.
      </div>
    );
  }

  return (
    <div className={cn("grid gap-6", gridCols[columns], className)}>
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}
