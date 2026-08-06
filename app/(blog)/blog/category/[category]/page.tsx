import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Pagination } from "@/components/blog/pagination";
import { getBlogCategory, BLOG_CATEGORIES } from "@/lib/blog/constants";
import { getPaginatedPostsByCategory } from "@/lib/blog/load-posts";
import { buildCollectionJsonLd, getBlogCategoryMetadata } from "@/lib/blog/seo";
import { BLOG_CATEGORY_ROUTE, ROUTES } from "@/lib/constants/routes";
import { cn } from "@/lib/utils/cn";

interface CategoryPageProps {
  params: { category: string };
}

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  if (!getBlogCategory(params.category)) return {};
  return getBlogCategoryMetadata(params.category);
}

export const dynamic = "force-static";

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = getBlogCategory(params.category);
  if (!category) {
    notFound();
  }

  const { items, page, totalPages } = getPaginatedPostsByCategory(
    category.slug,
    1
  );

  return (
    <Container className="py-12 md:py-16">
      <JsonLd data={buildCollectionJsonLd(category)} />

      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Blog", href: ROUTES.BLOG },
          { label: category.name },
        ]}
      />

      <div className="mb-8">
        <Heading level="h1" className="mb-3">
          {category.name} Articles
        </Heading>
        <Text variant="muted" className="max-w-2xl text-lg">
          {category.intro}
        </Text>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {BLOG_CATEGORIES.map((item) => (
          <Link
            key={item.slug}
            href={BLOG_CATEGORY_ROUTE(item.slug)}
            className={cn(
              "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
              item.slug === category.slug
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:border-primary/50 hover:text-foreground"
            )}
          >
            {item.name}
          </Link>
        ))}
      </div>

      <BlogGrid posts={items} />

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        basePath={BLOG_CATEGORY_ROUTE(category.slug)}
        className="mt-12"
      />
    </Container>
  );
}
