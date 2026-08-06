import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/constants/config";
import { TOOLS } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { BLOG_CATEGORIES, BLOG_PAGE_SIZE } from "@/lib/blog/constants";
import {
  getAllPostSummaries,
  getPaginatedPostsByCategory,
} from "@/lib/blog/load-posts";
import { BLOG_POST_ROUTE, BLOG_CATEGORY_ROUTE } from "@/lib/constants/routes";

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${SITE_CONFIG.url}/`,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${SITE_CONFIG.url}/tools`,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_CONFIG.url}/blog`,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    {
      url: `${SITE_CONFIG.url}/about`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_CONFIG.url}/contact`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_CONFIG.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.url}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.url}/disclaimer`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_CONFIG.url}/cookie-policy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => ({
    url: `${SITE_CONFIG.url}/${category.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const toolPages: MetadataRoute.Sitemap = TOOLS.map((tool) => ({
    url: `${SITE_CONFIG.url}/${tool.category}/${tool.slug}`,
    lastModified: tool.addedAt,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const blogPosts: MetadataRoute.Sitemap = getAllPostSummaries().map((post) => ({
    url: `${SITE_CONFIG.url}${BLOG_POST_ROUTE(post.slug)}`,
    lastModified: post.updatedDate ?? post.publishedDate,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogCategories: MetadataRoute.Sitemap = BLOG_CATEGORIES.map(
    (category) => ({
      url: `${SITE_CONFIG.url}${BLOG_CATEGORY_ROUTE(category.slug)}`,
      changeFrequency: "weekly",
      priority: 0.6,
    })
  );

  const blogPagination: MetadataRoute.Sitemap = BLOG_CATEGORIES.flatMap(
    (category) => {
      const { totalPages } = getPaginatedPostsByCategory(category.slug);
      return Array.from({ length: totalPages }, (_, index) => index + 1)
        .filter((page) => page > 1)
        .map((page) => ({
          url: `${SITE_CONFIG.url}${BLOG_CATEGORY_ROUTE(category.slug)}/page/${page}`,
          changeFrequency: "weekly" as const,
          priority: 0.4,
        }));
    }
  );

  const blogTotalPages = Math.ceil(getAllPostSummaries().length / BLOG_PAGE_SIZE);
  const blogIndexPagination: MetadataRoute.Sitemap = Array.from(
    { length: Math.max(0, blogTotalPages - 1) },
    (_, index) => ({
      url: `${SITE_CONFIG.url}/blog/page/${index + 2}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })
  );

  return [
    ...staticPages,
    ...categoryPages,
    ...toolPages,
    ...blogPosts,
    ...blogCategories,
    ...blogPagination,
    ...blogIndexPagination,
  ];
}
