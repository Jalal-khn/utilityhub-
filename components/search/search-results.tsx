"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Calendar, FileText } from "lucide-react";
import { TOOLS } from "@/lib/constants/tools";
import { ToolGrid } from "@/components/tool/tool-grid";
import { SearchBar } from "@/components/search/search-bar";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { CATEGORIES } from "@/lib/constants/categories";
import { formatDateShort } from "@/lib/blog/format";

interface BlogSearchResult {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  publishedDate: string;
  href: string;
}

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [posts, setPosts] = React.useState<BlogSearchResult[]>([]);

  const results = React.useMemo(() => {
    if (!query.trim()) return [];

    const searchVal = query.toLowerCase().trim();
    return TOOLS.filter((tool) => {
      const categoryName =
        CATEGORIES.find((category) => category.slug === tool.category)?.name ??
        tool.category;

      return (
        tool.name.toLowerCase().includes(searchVal) ||
        tool.description.toLowerCase().includes(searchVal) ||
        tool.primaryKeyword.toLowerCase().includes(searchVal) ||
        tool.secondaryKeywords.some((kw) => kw.toLowerCase().includes(searchVal)) ||
        tool.searchTags.some((tag) => tag.toLowerCase().includes(searchVal)) ||
        categoryName.toLowerCase().includes(searchVal)
      );
    });
  }, [query]);

  React.useEffect(() => {
    if (!query.trim()) {
      setPosts([]);
      return;
    }

    let cancelled = false;
    fetch(`/api/search?q=${encodeURIComponent(query.trim())}`)
      .then((response) => response.json())
      .then((data) => {
        if (!cancelled) setPosts(data.posts ?? []);
      })
      .catch(() => {
        if (!cancelled) setPosts([]);
      });

    return () => {
      cancelled = true;
    };
  }, [query]);

  return (
    <div className="space-y-8">
      <div className="max-w-xl">
        <SearchBar placeholder="Search tools and articles..." className="w-full" />
      </div>

      <div>
        {query ? (
          <>
            <Heading level="h2" className="mb-6">
              Search Results for &ldquo;{query}&rdquo; ({results.length + posts.length})
            </Heading>

            {posts.length > 0 && (
              <section className="mb-10">
                <Heading level="h3" className="mb-4 text-xl">
                  Articles
                </Heading>
                <div className="grid gap-4 sm:grid-cols-2">
                  {posts.map((post) => (
                    <Link
                      key={post.slug}
                      href={post.href}
                      className="group rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent"
                    >
                      <div className="mb-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium text-primary">
                          {post.categoryName}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDateShort(post.publishedDate)}
                        </span>
                      </div>
                      <p className="font-semibold group-hover:text-primary transition-colors">
                        {post.title}
                      </p>
                      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                        {post.description}
                      </p>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {results.length > 0 && (
              <section>
                <Heading level="h3" className="mb-4 text-xl">
                  Tools
                </Heading>
                <ToolGrid
                  tools={results.map((tool) => ({
                    name: tool.name,
                    description: tool.description,
                    category: tool.category,
                    slug: tool.slug,
                    tags: tool.searchTags,
                    featured: false,
                  }))}
                  columns={3}
                />
              </section>
            )}

            {results.length === 0 && posts.length === 0 && (
              <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-border">
                <FileText className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
                <Text variant="muted" className="text-lg">
                  No tools or articles found matching your search.
                </Text>
                <Text variant="muted" className="mt-2 text-sm">
                  Try checking your spelling or using different keywords.
                </Text>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-16 bg-muted/30 rounded-xl border border-dashed border-border">
            <Text variant="muted" className="text-lg">
              Enter a search query above to find tools and articles.
            </Text>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchResultsPage() {
  return (
    <Container className="py-12">
      <div className="mb-10">
        <Heading level="h1" className="mb-2">
          Search
        </Heading>
        <Text variant="muted" className="text-lg">
          Find tools, utilities, and blog articles quickly.
        </Text>
      </div>

      <React.Suspense fallback={<div>Loading search results...</div>}>
        <SearchResults />
      </React.Suspense>
    </Container>
  );
}
