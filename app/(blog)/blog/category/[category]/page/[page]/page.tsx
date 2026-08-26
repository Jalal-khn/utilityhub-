import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Pagination } from "@/components/blog/pagination";
import { getBlogCategory, BLOG_CATEGORIES } from "@/lib/blog/constants";
import { getPaginatedPostsByCategory } from "@/lib/blog/load-posts";
import { getBlogCategoryMetadata } from "@/lib/blog/seo";
import { BLOG_CATEGORY_ROUTE, ROUTES } from "@/lib/constants/routes";

interface CategoryPageProps {
  params: { category: string; page: string };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  if (!getBlogCategory(params.category)) return {};
  return {
    ...getBlogCategoryMetadata(params.category),
    robots: { index: false, follow: true },
  };
}

export const dynamic = "force-static";

export function generateStaticParams() {
  return BLOG_CATEGORIES.flatMap((category) => {
    const { totalPages } = getPaginatedPostsByCategory(category.slug, 1);
    return Array.from({ length: totalPages - 1 }, (_, index) => ({
      category: category.slug,
      page: String(index + 2),
    }));
  });
}

export default function CategoryPaginatedPage({ params }: CategoryPageProps) {
  const category = getBlogCategory(params.category);
  if (!category) {
    notFound();
  }

  const pageNumber = Number.parseInt(params.page, 10);
  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const result = getPaginatedPostsByCategory(category.slug, pageNumber);
  if (pageNumber > result.totalPages) {
    permanentRedirect(
      `${BLOG_CATEGORY_ROUTE(category.slug)}/page/${result.totalPages}`
    );
  }

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Blog", href: ROUTES.BLOG },
          { label: category.name, href: BLOG_CATEGORY_ROUTE(category.slug) },
          { label: `Page ${result.page}` },
        ]}
      />

      <div className="mb-8">
        <Heading level="h1" className="mb-3">
          {category.name} Articles
        </Heading>
        <Text variant="muted" className="max-w-2xl text-lg">
          Page {result.page} of {result.totalPages}
        </Text>
      </div>

      <BlogGrid posts={result.items} />

      <Pagination
        currentPage={result.page}
        totalPages={result.totalPages}
        basePath={BLOG_CATEGORY_ROUTE(category.slug)}
        className="mt-12"
      />
    </Container>
  );
}
