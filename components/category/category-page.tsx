"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { ToolGrid } from "@/components/tool/tool-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FAQ } from "@/components/common/faq";
import { SearchBar } from "@/components/search/search-bar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CATEGORIES } from "@/lib/constants/categories";
import type { ToolEngineConfig } from "@/lib/tool-engine";

interface CategoryPageProps {
  name: string;
  description: string;
  intro?: string[];
  slug: string;
  tools: ToolEngineConfig[];
  faq: Array<{ question: string; answer: string }>;
}

type SortOption = "alphabetical" | "reverse";

export function CategoryPage({ name, description, intro = [], slug, tools, faq }: CategoryPageProps) {
  const [query, setQuery] = React.useState("");
  const [sortBy, setSortBy] = React.useState<SortOption>("alphabetical");
  const relatedCategories = CATEGORIES.filter((category) => category.slug !== slug).slice(0, 4);

  const filteredTools = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools
      .filter((tool) => {
        if (!normalizedQuery) {
          return true;
        }

        return [tool.name, tool.description, tool.primaryKeyword, tool.slug, ...tool.secondaryKeywords, ...tool.searchTags]
          .join(" ")
          .toLowerCase()
          .includes(normalizedQuery);
      })
      .sort((a, b) => {
        if (sortBy === "reverse") {
          return b.name.localeCompare(a.name);
        }

        return a.name.localeCompare(b.name);
      });
  }, [query, sortBy, tools]);

  return (
    <div className="flex flex-col">
      <Container className="py-8">
        <Breadcrumbs
          items={[
            { label: name, href: `/${slug}` },
          ]}
          className="mb-6"
        />
        <div className="mb-8">
          <Heading level="h1" className="mb-4">
            {name}
          </Heading>
          <Text variant="lead">
            {description}
          </Text>
        </div>
      </Container>

      <Separator />

      <Container className="py-8">
        <div className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <Text variant="muted" className="mb-3">
                Search within {name}
              </Text>
              <SearchBar
                placeholder={`Search ${name.toLowerCase()}...`}
                onValueChange={setQuery}
                value={query}
                className="max-w-none"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border bg-background/80 p-4">
                <p className="text-sm text-muted-foreground">Total tools</p>
                <p className="text-2xl font-semibold">{tools.length}</p>
              </div>
              <div className="rounded-2xl border bg-background/80 p-4">
                <p className="text-sm text-muted-foreground">Showing</p>
                <p className="text-2xl font-semibold">{filteredTools.length}</p>
              </div>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <label className="text-sm font-medium text-muted-foreground" htmlFor="sort-category-tools">
              Sort by
            </label>
            <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
              <SelectTrigger id="sort-category-tools" className="w-[180px]">
                <SelectValue placeholder="Alphabetical" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="alphabetical">Alphabetical A-Z</SelectItem>
                <SelectItem value="reverse">Alphabetical Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Container>

      <Container className="py-8">
        <div className="mb-6 max-w-3xl">
          <Heading level="h2" className="mb-3">
            {name} overview
          </Heading>
          {intro.map((paragraph) => (
            <Text variant="muted" key={paragraph} className="mb-3">
              {paragraph}
            </Text>
          ))}
          <Text variant="muted">
            Browse the current collection of tools below and filter by keyword to find the exact utility you need.
          </Text>
        </div>

        {filteredTools.length > 0 ? (
          <ToolGrid tools={filteredTools.map((tool) => ({
            name: tool.name,
            description: tool.description,
            category: tool.category,
            slug: tool.slug,
            tags: tool.searchTags,
            featured: Boolean(tool.featured),
          }))} columns={3} />
        ) : (
          <div className="text-center py-16">
            <Text variant="muted" className="text-lg">
              No tools available matching your current search.
            </Text>
            <Text variant="muted" className="mt-2">
              Try a different keyword or clear your search to view the full set.
            </Text>
          </div>
        )}
      </Container>

      <FAQ items={faq} />

      {relatedCategories.length > 0 && (
        <>
          <Separator />
          <Container className="py-12">
            <Heading level="h2" className="mb-6">
              Related Categories
            </Heading>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedCategories.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className="rounded-lg border border-border/60 bg-card p-4 transition-colors hover:border-primary/50 hover:bg-muted/40"
                >
                  <Text className="font-semibold">{category.name}</Text>
                  <Text variant="muted" className="mt-2 text-sm">
                    {category.description}
                  </Text>
                </Link>
              ))}
            </div>
          </Container>
        </>
      )}
    </div>
  );
}
