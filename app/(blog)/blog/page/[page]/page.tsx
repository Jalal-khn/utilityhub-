import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Pagination } from "@/components/blog/pagination";
import { getPaginatedPosts } from "@/lib/blog/load-posts";
import { getBlogIndexMetadata } from "@/lib/blog/seo";
import { ROUTES } from "@/lib/constants/routes";

interface BlogPageProps {
  params: { page: string };
}

export const metadata: Metadata = {
  ...getBlogIndexMetadata(),
  robots: { index: false, follow: true },
};

export const dynamic = "force-static";

export function generateStaticParams() {
  const total = getPaginatedPosts(1).totalPages;
  return Array.from({ length: total - 1 }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default function BlogPaginatedPage({ params }: BlogPageProps) {
  const pageNumber = Number.parseInt(params.page, 10);
  if (Number.isNaN(pageNumber) || pageNumber < 1) {
    notFound();
  }

  const result = getPaginatedPosts(pageNumber);

  if (pageNumber > result.totalPages) {
    notFound();
  }

  return (
    <Container className="py-12 md:py-16">
      <div className="mb-10">
        <Heading level="h1" className="mb-3">
          Blog
        </Heading>
        <Text variant="muted" className="max-w-2xl text-lg">
          Page {result.page} of {result.totalPages}
        </Text>
      </div>

      <BlogGrid posts={result.items} />

      <Pagination
        currentPage={result.page}
        totalPages={result.totalPages}
        basePath={ROUTES.BLOG}
        className="mt-12"
      />
    </Container>
  );
}
