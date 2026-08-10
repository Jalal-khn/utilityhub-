"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileText,
  Image as ImageIcon,
  Palette,
  RefreshCw,
  Search as Magnify,
  Shield,
  Sparkles,
  SlidersHorizontal,
  Type,
  Wand2,
} from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants/config";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { HeroSection } from "@/components/common/hero-section";
import { SearchBar } from "@/components/search/search-bar";
import { ToolGrid } from "@/components/tool/tool-grid";
import { FAQ } from "@/components/common/faq";
import { Heading, Text } from "@/components/ui/typography";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOLS } from "@/lib/constants/tools";
import type { ToolEngineConfig } from "@/lib/tool-engine";
import { cn } from "@/lib/utils/cn";

type ToolDirectoryItem = ToolEngineConfig & {
  categoryName: string;
  icon: React.ReactNode;
};

type SortOption = "alphabetical" | "reverse" | "newest" | "oldest";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  text: Type,
  developer: Code2,
  math: Calculator,
  converter: RefreshCw,
  image: ImageIcon,
  color: Palette,
  generator: Sparkles,
  security: Shield,
  pdf: FileText,
  seo: Magnify,
};

const faqItems = [
  {
    question: "How does the search work?",
    answer:
      "The directory searches across tool names, descriptions, category names, primary keywords, and related tags so you can find the right utility quickly.",
  },
  {
    question: "Can I filter tools by category?",
    answer:
      "Yes. You can narrow the directory to a specific category such as image tools, PDF tools, math tools, converters, or SEO tools.",
  },
  {
    question: "Will new tools appear automatically?",
    answer:
      "Yes. Because the page reads directly from the shared tool configuration registry, new tools become available as soon as they are added.",
  },
];

export function AllToolsDirectoryPage() {
  const [query, setQuery] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const [sortBy, setSortBy] = React.useState<SortOption>("alphabetical");

  const structuredData = React.useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "All Free Online Tools | UtilityHub",
      description:
        "Browse all free online tools available on UtilityHub including image tools, PDF tools, calculators, converters, developer tools, SEO tools, generators, and more.",
      url: `${SITE_CONFIG.url}/tools`,
      hasPart: TOOLS.slice(0, 12).map((tool) => ({
        "@type": "WebApplication",
        name: tool.name,
        url: `${SITE_CONFIG.url}/${tool.category}/${tool.slug}`,
      })),
    }),
    []
  );

  const tools = React.useMemo<ToolDirectoryItem[]>(() => {
    return TOOLS.map((tool) => {
      const category = CATEGORIES.find((item) => item.slug === tool.category);
      const Icon = CATEGORY_ICONS[tool.category] || Wand2;

      return {
        ...tool,
        categoryName: category?.name ?? tool.category,
        icon: <Icon className="h-5 w-5" />,
      };
    });
  }, []);

  const categoryCounts = React.useMemo(() => {
    return CATEGORIES.map((category) => ({
      ...category,
      count: TOOLS.filter((tool) => tool.category === category.slug).length,
    }));
  }, []);

  const filteredTools = React.useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return tools
      .filter((tool) => {
        const matchesCategory =
          selectedCategory === "all" || tool.category === selectedCategory;

        const matchesQuery =
          normalizedQuery.length === 0 ||
          [
            tool.name,
            tool.description,
            tool.primaryKeyword,
            tool.categoryName,
            tool.slug,
            ...tool.secondaryKeywords,
            ...tool.searchTags,
          ]
            .join(" ")
            .toLowerCase()
            .includes(normalizedQuery);

        return matchesCategory && matchesQuery;
      })
      .sort((a, b) => {
        switch (sortBy) {
          case "reverse":
            return b.name.localeCompare(a.name);
          case "newest":
            return (b.addedAt ? Date.parse(b.addedAt) : 0) - (a.addedAt ? Date.parse(a.addedAt) : 0);
          case "oldest":
            return (a.addedAt ? Date.parse(a.addedAt) : 0) - (b.addedAt ? Date.parse(b.addedAt) : 0);
          case "alphabetical":
          default:
            return a.name.localeCompare(b.name);
        }
      });
  }, [query, selectedCategory, sortBy, tools]);

  const popularTools = React.useMemo(() => {
    return filteredTools.filter((tool) => tool.featured).slice(0, 4);
  }, [filteredTools]);

  const recentlyAddedTools = React.useMemo(() => {
    return filteredTools.filter((tool) => tool.addedAt).slice(0, 4);
  }, [filteredTools]);

  return (
    <div className="flex flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <Container className="py-8">
        <Breadcrumbs items={[{ label: "Tools" }]} className="mb-6" />
      </Container>

      <HeroSection
        title="All Free Online Tools"
        description="Browse every utility on UtilityHub in one place. Search instantly, filter by category, and jump straight into the tools you need."
        primaryAction={{ label: "Explore Categories", href: "/" }}
        secondaryAction={{ label: "View Popular Tools", href: "#popular-tools" }}
      />

      <section className="py-8 md:py-12">
        <Container>
          <div className="rounded-3xl border border-border/70 bg-card/80 p-4 shadow-sm sm:p-6 lg:p-8">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-primary">
                  <SlidersHorizontal className="h-4 w-4" />
                  Instant search and filters
                </div>
                <SearchBar
                  placeholder="Search by tool name, keyword, or category"
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
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-semibold">{categoryCounts.length}</p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Button
                type="button"
                variant={selectedCategory === "all" ? "default" : "outline"}
                onClick={() => setSelectedCategory("all")}
              >
                All
              </Button>
              {categoryCounts.map((category) => (
                <Button
                  key={category.slug}
                  type="button"
                  variant={selectedCategory === category.slug ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.slug)}
                  className="gap-2"
                >
                  <span>{category.name}</span>
                  <Badge variant="secondary" className="rounded-full px-2 py-0.5 text-[10px]">
                    {category.count}
                  </Badge>
                </Button>
              ))}
            </div>

            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Showing {filteredTools.length} of {tools.length} tools
                </p>
                <p className="text-sm text-muted-foreground">
                  Refined by your search and category selection.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-muted-foreground" htmlFor="sort-tools">
                  Sort by
                </label>
                <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
                  <SelectTrigger id="sort-tools" className="w-[180px]">
                    <SelectValue placeholder="Alphabetical" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="alphabetical">Alphabetical A-Z</SelectItem>
                    <SelectItem value="reverse">Alphabetical Z-A</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-6">
        <Container>
          {filteredTools.length > 0 ? (
            <ToolGrid
              tools={filteredTools.map((tool) => ({
                name: tool.name,
                description: tool.description,
                category: tool.category,
                categoryLabel: tool.categoryName,
                slug: tool.slug,
                icon: tool.icon,
                tags: tool.searchTags.slice(0, 3),
                featured: Boolean(tool.featured),
              }))}
              columns={3}
            />
          ) : (
            <div className="rounded-3xl border border-dashed border-border/80 bg-muted/30 px-8 py-16 text-center">
              <Heading level="h3" className="mb-3">
                No tools match your search yet
              </Heading>
              <Text variant="muted" className="mx-auto max-w-xl">
                Try a broader keyword or switch to another category to discover more utilities.
              </Text>
            </div>
          )}
        </Container>
      </section>

      {popularTools.length > 0 && (
        <section id="popular-tools" className="py-12">
          <Container>
            <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div>
                <Heading level="h2" className="mb-2">
                  Popular tools
                </Heading>
                <Text variant="muted">
                  A fast way to discover the most useful utilities on the site.
                </Text>
              </div>
              <Button asChild variant="outline">
                <Link href="/">Back to homepage</Link>
              </Button>
            </div>
            <ToolGrid
              tools={popularTools.map((tool) => ({
                name: tool.name,
                description: tool.description,
                category: tool.category,
                categoryLabel: tool.categoryName,
                slug: tool.slug,
                icon: tool.icon,
                tags: tool.searchTags.slice(0, 3),
                featured: true,
              }))}
              columns={3}
            />
          </Container>
        </section>
      )}

      {recentlyAddedTools.length > 0 && (
        <section className="py-12">
          <Container>
            <div className="mb-8">
              <Heading level="h2" className="mb-2">
                Recently added tools
              </Heading>
              <Text variant="muted">
                New additions surfaced from the shared tool registry.
              </Text>
            </div>
            <ToolGrid
              tools={recentlyAddedTools.map((tool) => ({
                name: tool.name,
                description: tool.description,
                category: tool.category,
                categoryLabel: tool.categoryName,
                slug: tool.slug,
                icon: tool.icon,
                tags: tool.searchTags.slice(0, 3),
                featured: false,
              }))}
              columns={3}
            />
          </Container>
        </section>
      )}

      <section className="py-12">
        <Container>
          <div className="rounded-3xl border bg-background/80 p-6 sm:p-8">
            <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <Heading level="h2" className="mb-2">
                  Browse by category
                </Heading>
                <Text variant="muted">
                  Jump straight to a focused category page for more tools in the same area.
                </Text>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {categoryCounts.map((category) => (
                <Link
                  key={category.slug}
                  href={`/${category.slug}`}
                  className={cn(
                    "flex items-center justify-between rounded-2xl border p-4 transition-colors hover:border-primary/40 hover:bg-primary/5",
                    selectedCategory === category.slug && "border-primary/40 bg-primary/5"
                  )}
                >
                  <div>
                    <p className="font-semibold">{category.name}</p>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <FAQ items={faqItems} title="Frequently asked questions" />

      <section className="py-12 md:py-16">
        <Container>
          <div className="rounded-3xl bg-primary/10 p-8 text-center">
            <Heading level="h2" className="mb-3">
              Need a specific utility?
            </Heading>
            <Text variant="muted" className="mx-auto mb-6 max-w-2xl">
              Use the instant search and category filters above to move from idea to result in seconds.
            </Text>
            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link href="/">Go to homepage</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/about">Learn more about UtilityHub</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
