import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Heading } from "@/components/ui/typography";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { FAQ } from "@/components/common/faq";
import { ShareButtons } from "@/components/blog/share-buttons";
import { TableOfContents } from "@/components/blog/table-of-contents";
import { MobileTableOfContents } from "@/components/blog/mobile-toc";
import { PostImage } from "@/components/blog/post-image";
import { BlogGrid } from "@/components/blog/blog-grid";
import { RelatedTools } from "@/lib/blog/mdx-components";
import { formatDate } from "@/lib/blog/format";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildFaqJsonLd,
} from "@/lib/blog/seo";
import {
  BLOG_CATEGORY_ROUTE,
  BLOG_POST_ROUTE,
  ROUTES,
} from "@/lib/constants/routes";
import type { BlogPostDetail, BlogPostSummary, RelatedTool } from "@/lib/blog/types";
import { cn } from "@/lib/utils/cn";

interface ArticleLayoutProps {
  post: BlogPostDetail;
  content: ReactNode;
  relatedTools: RelatedTool[];
  relatedPosts: BlogPostSummary[];
  postUrl: string;
}

export function ArticleLayout({
  post,
  content,
  relatedTools,
  relatedPosts,
  postUrl,
}: ArticleLayoutProps) {
  const categoryHref = BLOG_CATEGORY_ROUTE(post.category);

  return (
    <Container size="xl" className="py-12 md:py-16">
      <JsonLd
        data={[
          buildArticleJsonLd(post),
          buildBreadcrumbJsonLd([
            { label: "Home", href: "/" },
            { label: "Blog", href: ROUTES.BLOG },
            { label: post.categoryName, href: categoryHref },
            { label: post.title, href: BLOG_POST_ROUTE(post.slug) },
          ]),
          ...(post.faq && post.faq.length > 0
            ? [buildFaqJsonLd(post.faq)]
            : []),
        ]}
      />

      <Breadcrumbs
        className="mb-8"
        items={[
          { label: "Blog", href: ROUTES.BLOG },
          { label: post.categoryName, href: categoryHref },
          { label: post.title },
        ]}
      />

      <article className="mx-auto max-w-3xl">
        <header className="mb-10">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Link
              href={categoryHref}
              className="font-medium text-primary hover:underline"
            >
              {post.categoryName}
            </Link>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(post.publishedDate)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {post.readingTime} min read
            </span>
          </div>

          <Heading level="h1" className="mb-4 text-3xl md:text-4xl">
            {post.title}
          </Heading>
          <p className="mb-6 text-lg text-muted-foreground">
            {post.description}
          </p>

          <div className="flex items-center gap-3 border-y py-4">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
              {post.author.charAt(0).toUpperCase()}
            </div>
            <div className="text-sm">
              <p className="font-medium">{post.author}</p>
              <p className="text-muted-foreground">
                {post.updatedDate && post.updatedDate !== post.publishedDate
                  ? `Updated ${formatDate(post.updatedDate)}`
                  : `${post.categoryName} · UtilityHub Blog`}
              </p>
            </div>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[1fr_220px] lg:gap-10">
          <div>
            <MobileTableOfContents
              items={post.toc}
              className="mb-6 lg:hidden"
            />

            {post.featuredImage && (
              <div className="mb-8 aspect-[16/9] w-full overflow-hidden rounded-lg border">
                <PostImage src={post.featuredImage} alt={post.title} />
              </div>
            )}

            <div className="prose prose-neutral max-w-none dark:prose-invert prose-h2:scroll-mt-24 prose-h3:scroll-mt-24">
              {content}
            </div>

            {post.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}

            <div className="mt-8">
              <ShareButtons title={post.title} url={postUrl} />
            </div>

            <RelatedTools
              tools={post.relatedTools}
              title="Tools mentioned in this article"
            />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents items={post.toc} />
            </div>
          </aside>
        </div>
      </article>

      {relatedTools.length > 0 && (
        <section className="mx-auto mt-16 max-w-3xl">
          <Heading level="h2" className="mb-6 text-2xl">
            Related tools
          </Heading>
          <div className="grid gap-4 sm:grid-cols-3">
            {relatedTools.map((tool) => (
              <Link
                key={tool.slug}
                href={tool.href}
                className="rounded-lg border bg-card p-4 transition-colors hover:border-primary/50 hover:bg-accent"
              >
                <p className="font-semibold">{tool.name}</p>
                <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {post.faq && post.faq.length > 0 && (
        <FAQ items={post.faq} className="mx-auto max-w-3xl" />
      )}

      <section className="mx-auto mt-16 max-w-3xl">
        <div className="mb-6 flex items-center justify-between">
          <Heading level="h2" className="text-2xl">
            Related articles
          </Heading>
          <Link
            href={ROUTES.BLOG}
            className="text-sm font-medium text-primary hover:underline"
          >
            View all
          </Link>
        </div>
        <BlogGrid posts={relatedPosts} columns={3} />
      </section>

      <nav className="mx-auto mt-16 grid max-w-3xl gap-4 border-t pt-8 sm:grid-cols-2">
        {post.previous ? (
          <Link
            href={BLOG_POST_ROUTE(post.previous.slug)}
            className="group rounded-lg border p-4 transition-colors hover:border-primary/50 hover:bg-accent"
          >
            <span className="flex items-center gap-1 text-sm text-muted-foreground">
              <ArrowLeft className="h-3.5 w-3.5" /> Previous
            </span>
            <span className="mt-1 block font-medium line-clamp-2 group-hover:text-primary">
              {post.previous.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
        {post.next ? (
          <Link
            href={BLOG_POST_ROUTE(post.next.slug)}
            className={cn(
              "group rounded-lg border p-4 text-right transition-colors hover:border-primary/50 hover:bg-accent",
              !post.previous && "sm:col-start-2"
            )}
          >
            <span className="flex items-center justify-end gap-1 text-sm text-muted-foreground">
              Next <ArrowRight className="h-3.5 w-3.5" />
            </span>
            <span className="mt-1 block font-medium line-clamp-2 group-hover:text-primary">
              {post.next.title}
            </span>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </Container>
  );
}
