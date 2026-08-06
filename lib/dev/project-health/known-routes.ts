import { SITE_CONFIG } from "@/lib/constants/config";
import { ROUTES, TOOL_ROUTE, BLOG_POST_ROUTE, BLOG_CATEGORY_ROUTE, BLOG_TAG_ROUTE } from "@/lib/constants/routes";
import { TOOLS } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { BLOG_CATEGORIES, BLOG_TAGS, BLOG_PAGE_SIZE } from "@/lib/blog/constants";
import {
  getAllPostSummaries,
  getPaginatedPostsByCategory,
  getPaginatedPosts,
} from "@/lib/blog/load-posts";

const STATIC_PATHS: string[] = [
  "/",
  ROUTES.ALL_TOOLS,
  ROUTES.BLOG,
  ROUTES.SEARCH,
  "/about",
  "/contact",
  "/privacy",
  "/terms",
  "/disclaimer",
  "/cookie-policy",
];

export function normalizePath(value: string): string {
  let path = value.trim().split("#")[0] ?? "";
  if (path.startsWith("https://") || path.startsWith("http://")) {
    try {
      path = new URL(path).pathname;
    } catch {
      return "";
    }
  }
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path;
}

export function buildKnownRoutes(): Set<string> {
  const routes = new Set<string>(STATIC_PATHS);

  for (const category of CATEGORIES) {
    routes.add(`/${category.slug}`);
  }

  for (const tool of TOOLS) {
    routes.add(TOOL_ROUTE(tool.category, tool.slug));
  }

  for (const post of getAllPostSummaries()) {
    routes.add(BLOG_POST_ROUTE(post.slug));
  }

  for (const category of BLOG_CATEGORIES) {
    routes.add(BLOG_CATEGORY_ROUTE(category.slug));
    const { totalPages } = getPaginatedPostsByCategory(category.slug);
    for (let page = 2; page <= totalPages; page += 1) {
      routes.add(`${BLOG_CATEGORY_ROUTE(category.slug)}/page/${page}`);
    }
  }

  const { totalPages } = getPaginatedPosts();
  for (let page = 2; page <= totalPages; page += 1) {
    routes.add(`/blog/page/${page}`);
  }

  for (const tag of BLOG_TAGS) {
    routes.add(BLOG_TAG_ROUTE(tag));
  }

  return routes;
}

export function buildKnownAbsoluteUrls(): string[] {
  const base = SITE_CONFIG.url;
  return Array.from(buildKnownRoutes()).map((route) => {
    if (route === "/") return `${base}/`;
    return `${base}${route}`;
  });
}

export function buildExpectedSitemapPaths(): string[] {
  const paths: string[] = [];

  paths.push("/", ROUTES.ALL_TOOLS, ROUTES.BLOG, "/about", "/contact", "/privacy", "/terms", "/disclaimer", "/cookie-policy");

  for (const category of CATEGORIES) paths.push(`/${category.slug}`);

  for (const tool of TOOLS) paths.push(TOOL_ROUTE(tool.category, tool.slug));

  for (const post of getAllPostSummaries()) paths.push(BLOG_POST_ROUTE(post.slug));

  for (const category of BLOG_CATEGORIES) paths.push(BLOG_CATEGORY_ROUTE(category.slug));

  return paths;
}

export const BLOG_PAGE_SIZE_FOR_HEALTH = BLOG_PAGE_SIZE;
