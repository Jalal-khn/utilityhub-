import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BlogGrid } from "@/components/blog/blog-grid";
import { getPublishedPosts } from "@/lib/blog/load-posts";
import { ROUTES } from "@/lib/constants/routes";

interface TagPageProps {
  params: { tag: string };
}

export const dynamic = "force-static";

export function generateStaticParams() {
  const tags = new Set<string>();
  getPublishedPosts().forEach((post) =>
    post.tags.forEach((tag) => tags.add(tag))
  );
  return Array.from(tags).map((tag) => ({ tag }));
}

export async function generateMetadata({
  params,
}: TagPageProps): Promise<Metadata> {
  const tag = decodeURIComponent(params.tag);
  const posts = getPublishedPosts().filter((post) =>
    post.tags.includes(tag)
  );
  if (posts.length === 0) return {};

  return {
    title: `Articles tagged "${tag}"`,
    description: `Browse articles tagged "${tag}" on the UtilityHub blog.`,
    robots: { index: false, follow: true },
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  const posts = getPublishedPosts().filter((post) =>
    post.tags.some(
      (item) => item.toLowerCase() === tag.toLowerCase()
    )
  );

  if (posts.length === 0) {
    notFound();
  }

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs
        className="mb-6"
        items={[
          { label: "Blog", href: ROUTES.BLOG },
          { label: `Tag: ${tag}` },
        ]}
      />

      <div className="mb-8">
        <Heading level="h1" className="mb-3">
          Articles tagged &ldquo;{tag}&rdquo;
        </Heading>
        <Text variant="muted" className="text-lg">
          {posts.length} article{posts.length === 1 ? "" : "s"}
        </Text>
      </div>

      <BlogGrid posts={posts} />
    </Container>
  );
}
