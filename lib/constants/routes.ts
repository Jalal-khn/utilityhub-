export const ROUTES = {
  HOME: "/",
  ABOUT: "/about",
  CONTACT: "/contact",
  ALL_TOOLS: "/tools",
  BLOG: "/blog",
  SEARCH: "/search",
} as const;

export const TOOL_ROUTE = (category: string, tool: string) =>
  `/${category}/${tool}`;

export const BLOG_POST_ROUTE = (slug: string) => `/blog/${slug}`;

export const BLOG_CATEGORY_ROUTE = (category: string) =>
  `/blog/category/${category}`;

export const BLOG_TAG_ROUTE = (tag: string) => `/blog/tag/${tag}`;
