import { NextResponse } from "next/server";
import { TOOLS } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { searchPosts } from "@/lib/blog/load-posts";
import { BLOG_POST_ROUTE } from "@/lib/constants/routes";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

  const toolResults = query
    ? TOOLS.filter((tool) => {
        const categoryName =
          CATEGORIES.find((category) => category.slug === tool.category)?.name ??
          tool.category;

        return [
          tool.name,
          tool.description,
          tool.primaryKeyword,
          tool.slug,
          categoryName,
          ...tool.secondaryKeywords,
          ...tool.searchTags,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);
      }).slice(0, 12)
    : TOOLS.slice(0, 12);

  const blogResults = searchPosts(query);

  return NextResponse.json({
    query,
    results: toolResults.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      href: `/${tool.category}/${tool.slug}`,
    })),
    posts: blogResults.map((post) => ({
      slug: post.slug,
      title: post.title,
      description: post.description,
      category: post.category,
      categoryName: post.categoryName,
      publishedDate: post.publishedDate,
      href: BLOG_POST_ROUTE(post.slug),
    })),
  });
}
