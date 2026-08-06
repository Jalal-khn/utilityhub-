import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SearchBar } from "@/components/search/search-bar";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Pagination } from "@/components/blog/pagination";
import { CategoryGrid } from "@/components/category/category-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ } from "@/components/common/faq";
import { BLOG_CATEGORIES } from "@/lib/blog/constants";
import {
  getFeaturedPosts,
  getPaginatedPosts,
  getPostsByCategory,
} from "@/lib/blog/load-posts";
import {
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
  getBlogIndexMetadata,
} from "@/lib/blog/seo";
import { BLOG_CATEGORY_ROUTE, ROUTES } from "@/lib/constants/routes";
import {
  FileText,
  Image as ImageIcon,
  Type,
  Code2,
  Calculator,
  RefreshCw,
  Palette,
  Sparkles,
  Shield,
  Search,
  Box,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export const metadata: Metadata = getBlogIndexMetadata();

export const dynamic = "force-static";

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  pdf: FileText,
  image: ImageIcon,
  text: Type,
  developer: Code2,
  math: Calculator,
  converter: RefreshCw,
  color: Palette,
  generator: Sparkles,
  security: Shield,
  seo: Search,
};

const blogFaq = [
  {
    question: "What is the UtilityHub blog about?",
    answer:
      "It is a collection of practical, browser-only guides that match the tools on this site - covering PDFs, images, text, developer utilities, calculators, converters, colors, generators, security, and SEO.",
  },
  {
    question: "Do the guides need any software to follow?",
    answer:
      "No. Every guide uses one of our free online tools, so you can follow along entirely in your browser without installing anything or uploading your files.",
  },
  {
    question: "Are the tips in the articles free to use?",
    answer:
      "Yes. All the tools referenced in our articles are completely free, with no accounts and no hidden fees.",
  },
  {
    question: "How often are new articles published?",
    answer:
      "We publish new guides and tutorials regularly. Check the Blog page or the homepage's featured and latest sections for the most recent additions.",
  },
];

export default function BlogPage() {
  const { items, page, totalPages, total } = getPaginatedPosts(1);
  const featuredPosts = getFeaturedPosts(3);
  const categories = BLOG_CATEGORIES.map((category) => {
    const Icon = CATEGORY_ICONS[category.slug] ?? Box;
    return {
      ...category,
      icon: <Icon className="h-6 w-6" />,
      count: getPostsByCategory(category.slug).length,
      countLabel: "articles",
      href: BLOG_CATEGORY_ROUTE(category.slug),
    };
  });

  return (
    <div>
      <JsonLd
        data={[
          buildBreadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Blog", href: ROUTES.BLOG },
          ]),
          buildFaqJsonLd(blogFaq),
        ]}
      />

      <section className="bg-muted/50 py-12 md:py-16">
        <Container>
          <Breadcrumbs
            className="mb-6"
            items={[{ label: "Home", href: "/" }, { label: "Blog" }]}
          />
          <div className="max-w-3xl">
            <Heading level="h1" className="mb-3">
              Blog
            </Heading>
            <Text variant="muted" className="mb-6 text-lg">
              Articles, tutorials, and guides on PDFs, images, text, developer
              tools, calculators, converters, colors, generators, security, and
              SEO - every one usable directly in your browser with no software
              and no uploads.
            </Text>
            <SearchBar placeholder="Search articles..." variant="compact" />
            <Text variant="muted" className="mt-4 text-sm">
              {total} published article{total === 1 ? "" : "s"}
            </Text>
          </div>
        </Container>
      </section>

      {featuredPosts.length > 0 && (
        <section className="py-12">
          <Container>
            <Heading level="h2" className="mb-6 text-2xl">
              Featured Articles
            </Heading>
            <BlogGrid posts={featuredPosts} columns={3} />
          </Container>
        </section>
      )}

      <section className="bg-muted/50 py-12">
        <Container>
          <Heading level="h2" className="mb-6 text-2xl">
            Browse by Category
          </Heading>
          <CategoryGrid categories={categories} columns={4} />
        </Container>
      </section>

      <section className="py-12">
        <Container>
          <Heading level="h2" className="mb-6 text-2xl">
            Latest Articles
          </Heading>
          <BlogGrid posts={items} />
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            basePath={ROUTES.BLOG}
            className="mt-12"
          />
        </Container>
      </section>

      <FAQ items={blogFaq} title="Blog FAQs" />
    </div>
  );
}
