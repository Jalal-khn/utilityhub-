import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleLayout } from "@/components/blog/article-layout";
import {
  getPostDetail,
  getRelatedPosts,
  getAllPostSummaries,
} from "@/lib/blog/load-posts";
import { renderMdx } from "@/lib/blog/mdx";
import { findRelatedToolsForPost } from "@/lib/blog/related-tools";
import { getPostMetadata } from "@/lib/blog/seo";
import { BLOG_POST_ROUTE } from "@/lib/constants/routes";
import { SITE_CONFIG } from "@/lib/constants/config";

interface PostPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return getAllPostSummaries().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const post = getPostDetail(params.slug);
  if (!post) return {};
  return getPostMetadata(post);
}

export const dynamic = "force-static";

export default async function PostPage({ params }: PostPageProps) {
  const post = getPostDetail(params.slug);
  if (!post) {
    notFound();
  }

  const { content } = await renderMdx(post.content);
  const relatedPosts = getRelatedPosts(post);
  const relatedTools = findRelatedToolsForPost(post);
  const postUrl = `${SITE_CONFIG.url}${BLOG_POST_ROUTE(post.slug)}`;

  return (
    <ArticleLayout
      post={post}
      content={content}
      relatedTools={relatedTools}
      relatedPosts={relatedPosts}
      postUrl={postUrl}
    />
  );
}
