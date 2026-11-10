"use client";

import * as React from "react";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Code2,
  FileText,
  Image as ImageIcon,
  Landmark,
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
import { JsonLd } from "@/components/seo/json-ld";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  finance: Landmark,
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
  {
    question: "Are the tools really free?",
    answer:
      "Yes. Every tool in this directory is free to use. There is no paid tier, no per-use limit, no trial period, and no requirement to create an account.",
  },
  {
    question: "Do I need to sign up or install anything?",
    answer:
      "No. Nothing in the directory requires a sign-up or an installation. Open a tool, use it in the tab, and close the page when you are done.",
  },
  {
    question: "Are my files uploaded to a server?",
    answer:
      "No. File-based tools such as the PDF, image, and hash utilities process your data inside your browser, so your documents and photos stay on your device.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const CATEGORY_REFERENCE = [
  {
    slug: "pdf",
    covers: "Merge, split, compress, rotate, unlock, and convert PDF documents",
    tasks: "Combine invoices, shrink a scan, export a PDF to JPG",
  },
  {
    slug: "image",
    covers: "Compress, resize, crop, flip, and convert image formats",
    tasks: "PNG to JPG, HEIC to JPG, reduce photo size",
  },
  {
    slug: "text",
    covers: "Count, measure, transform, and clean up text",
    tasks: "Word and character counts, case changes, duplicate lines",
  },
  {
    slug: "developer",
    covers: "Format, encode, decode, and generate developer data",
    tasks: "Pretty-print JSON, decode Base64, inspect a JWT",
  },
  {
    slug: "math",
    covers: "Everyday calculations, from age to percentages",
    tasks: "BMI, discounts, date differences, percentage change",
  },
  {
    slug: "converter",
    covers: "Convert units of length, weight, area, speed, and temperature",
    tasks: "Kilometres to miles, kilograms to pounds, Celsius to Fahrenheit",
  },
  {
    slug: "color",
    covers: "Pick colours, build palettes, generate gradients, and check contrast",
    tasks: "HEX to RGB, WCAG contrast checks, gradient previews",
  },
  {
    slug: "finance",
    covers: "Plan loans, interest, savings, salary, and repayments",
    tasks: "Mortgage payments, EMI, SIP growth, take-home pay",
  },
  {
    slug: "generator",
    covers: "Generate passwords, QR codes, and random data on demand",
    tasks: "Strong passwords, WiFi QR codes, random numbers",
  },
  {
    slug: "security",
    covers: "Check password strength and create cryptographic hashes",
    tasks: "SHA-256, SHA-512, MD5, SHA-1, password audits",
  },
  {
    slug: "seo",
    covers: "Produce metadata, robots.txt, sitemaps, and social card tags",
    tasks: "Meta tags, Open Graph, Twitter cards, sitemap.xml",
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
      name: "Browse 90+ Free Online Tools and Calculators | UtilityHub",
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
      <JsonLd data={[structuredData, faqJsonLd]} />
      <Container className="py-8">
        <Breadcrumbs items={[{ label: "Tools" }]} className="mb-6" />
      </Container>

      <HeroSection
        title="All Free Online Tools"
        description="Browse every utility on UtilityHub in one place. Search instantly, filter by category, and jump straight into the tools you need."
        primaryAction={{ label: "Explore Categories", href: "/" }}
        secondaryAction={{ label: "View Popular Tools", href: "#popular-tools" }}
      />

      <section className="pb-2 pt-4">
        <Container>
          <div className="mx-auto max-w-3xl space-y-4">
            <Heading level="h2" className="text-2xl">
              What this directory includes
            </Heading>
            <Text variant="muted" className="leading-relaxed">
              UtilityHub gathers {tools.length} free browser tools into one index, sorted into{" "}
              {categoryCounts.length} categories. Every entry opens a working tool on this domain
              rather than linking out to another site, and each one performs its work on your device
              instead of a remote server.
            </Text>
            <Text variant="muted" className="leading-relaxed">
              Most visits begin with one of four jobs. You need to change a file&apos;s format, which
              is the PDF and image group. You need to clean, count, or transform text, which is the
              text and developer group. You need a number, which is where the calculators and
              converters sit. Or you need to produce something you can hand to someone else, such as a
              QR code, a password, or a set of meta tags, covered by the generators, security, and SEO
              tools. Find your job first, then use the category filters below to narrow the list.
            </Text>
          </div>
        </Container>
      </section>

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

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level="h2" className="mb-4">
              How to choose the right tool
            </Heading>
            <Text variant="muted" className="mb-6 leading-relaxed">
              Three questions settle almost every visit, and they are worth asking in order. Answering
              them first saves you from scrolling through categories that do not apply.
            </Text>
            <ol className="space-y-5">
              <li>
                <p className="mb-1 font-semibold">1. What is the input?</p>
                <Text variant="muted" className="leading-relaxed">
                  A document, a photo, a block of text, a number, or nothing at all. Documents point to
                  the PDF tools, photos to the image tools, and text to the text and developer group. If
                  you are starting from an empty box, you want a generator or one of the SEO utilities.
                </Text>
              </li>
              <li>
                <p className="mb-1 font-semibold">2. What should come out?</p>
                <Text variant="muted" className="leading-relaxed">
                  If the answer has to be a file you can send, use a format converter or compressor. If
                  it has to be a single number, use a calculator. If it has to be a string you can paste
                  somewhere else, use a text, developer, or SEO tool. Sorting by output type is often
                  faster than reading descriptions.
                </Text>
              </li>
              <li>
                <p className="mb-1 font-semibold">3. How exact does it need to be?</p>
                <Text variant="muted" className="leading-relaxed">
                  Calculators and converters return a precise value, so confirm the unit or formula
                  before relying on it. Text, image, and generator tools produce a working result you
                  can adjust afterwards. Knowing which group you are in tells you how much verification
                  the output needs.
                </Text>
              </li>
            </ol>
            <Text variant="muted" className="mt-6 leading-relaxed">
              If the tool you need does not appear, type part of its name into the search box. The index
              matches tool names, primary keywords, tags, and category names, so a fragment such as
              &quot;compress&quot; or &quot;hex&quot; is usually enough.
            </Text>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level="h2" className="mb-4">
              Why these tools run in your browser
            </Heading>
            <Text variant="muted" className="mb-4 leading-relaxed">
              A conventional online converter uploads your file, processes it on a server, and hands
              back a download link. That round trip costs time and leaves a copy of your document
              somewhere you cannot see. The tools in this directory work differently: the page loads
              once, and the processing happens inside the tab using browser APIs such as Canvas, the File
              API, and Web Crypto.
            </Text>
            <Text variant="muted" className="mb-4 leading-relaxed">
              The practical difference is what you can safely put in. Tax documents, client photos, and
              password lists are reasonable inputs when nothing is transmitted. Results also tend to
              appear without a queue, because the work happens at the speed of your own device rather
              than behind other users on a shared server.
            </Text>
            <Text variant="muted" className="leading-relaxed">
              There are honest limits. Very large files are bounded by the memory a browser tab allows,
              and the newer formats need a current browser version. The directory is built for everyday
              file sizes and everyday jobs, not for multi-gigabyte archives.
            </Text>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-4xl">
            <Heading level="h2" className="mb-3">
              Category quick reference
            </Heading>
            <Text variant="muted" className="mb-6 leading-relaxed">
              The table shows what each category is for. Tool counts are read from the live registry, so
              they reflect the current directory rather than a number typed once and forgotten.
            </Text>
            <div className="overflow-hidden rounded-2xl border bg-background/80">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Category</TableHead>
                    <TableHead className="text-center">Tools</TableHead>
                    <TableHead>What it covers</TableHead>
                    <TableHead className="hidden md:table-cell">Typical tasks</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {CATEGORY_REFERENCE.map((row) => {
                    const category = categoryCounts.find((item) => item.slug === row.slug);
                    return (
                      <TableRow key={row.slug}>
                        <TableCell className="font-medium">
                          {category?.name ?? row.slug}
                        </TableCell>
                        <TableCell className="text-center tabular-nums">
                          {category?.count ?? 0}
                        </TableCell>
                        <TableCell className="text-muted-foreground">{row.covers}</TableCell>
                        <TableCell className="hidden text-muted-foreground md:table-cell">
                          {row.tasks}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Heading level="h2" className="mb-4">
              How this directory stays accurate
            </Heading>
            <Text variant="muted" className="mb-4 leading-relaxed">
              Every entry on this page comes from the same tool registry that powers the individual tool
              pages, so the listing cannot drift out of sync with what actually exists. When a tool is
              added, renamed, or removed, the index, the category counts, and the structured data all
              update together on the next build.
            </Text>
            <Text variant="muted" className="leading-relaxed">
              Descriptions state what a tool does, not what it might do one day. If an entry promises
              something the tool does not deliver, the contact page is the fastest route to a fix, and
              the correction is applied to the tool itself rather than patched over in the listing.
            </Text>
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
