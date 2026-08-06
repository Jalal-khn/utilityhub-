import fs from "fs";
import path from "path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import {
  BLOG_CATEGORY_NAMES,
  BLOG_DEFAULT_AUTHOR,
  BLOG_PAGE_SIZE,
  BLOG_WORDS_PER_MINUTE,
  getBlogCategory,
} from "./constants";
import type {
  BlogPageResult,
  BlogPost,
  BlogPostDetail,
  BlogPostSummary,
  TocItem,
} from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts");

interface PostFrontmatter {
  title?: string;
  description?: string;
  slug?: string;
  category?: string;
  tags?: string[];
  author?: string;
  publishedDate?: string;
  updatedDate?: string;
  featuredImage?: string;
  featured?: boolean;
  draft?: boolean;
  keywords?: string[];
  faq?: Array<{ question: string; answer: string }>;
}

function normalizeStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  if (typeof value === "string") {
    return value
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function isValidDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

function countWords(content: string): number {
  return content
    .replace(/<[^>]+>/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 0).length;
}

export function getReadingTime(content: string): number {
  const words = countWords(content);
  return Math.max(1, Math.ceil(words / BLOG_WORDS_PER_MINUTE));
}

const slugger = new GithubSlugger();

export function extractTocFromMarkdown(markdown: string): TocItem[] {
  slugger.reset();
  const toc: TocItem[] = [];
  const lines = markdown.split(/\r?\n/);

  for (const line of lines) {
    const match = /^(#{1,3})\s+(.+)$/.exec(line.trim());
    if (!match) continue;

    const level = match[1].length;
    const rawText = match[2].trim();

    const text = rawText
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*_~]/g, "")
      .replace(/[#*`]/g, "")
      .trim();

    if (!text) continue;

    toc.push({
      id: slugger.slug(text),
      text,
      level,
    });
  }

  return toc;
}

function parsePostFile(filePath: string): BlogPost | null {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  const slug = frontmatter.slug ?? path.basename(filePath, path.extname(filePath));
  const category = frontmatter.category?.toLowerCase().trim() ?? "";

  if (!frontmatter.title || !frontmatter.description) {
    console.warn(`[blog] Skipping ${filePath}: missing title or description`);
    return null;
  }

  if (!getBlogCategory(category)) {
    console.warn(`[blog] Skipping ${filePath}: unknown category "${category}"`);
    return null;
  }

  if (!frontmatter.publishedDate || !isValidDate(frontmatter.publishedDate)) {
    console.warn(`[blog] Skipping ${filePath}: invalid or missing publishedDate`);
    return null;
  }

  const tags = normalizeStringArray(frontmatter.tags);
  const keywords = normalizeStringArray(frontmatter.keywords);
  const categoryName = BLOG_CATEGORY_NAMES[category] ?? category;

  return {
    slug,
    title: frontmatter.title,
    description: frontmatter.description,
    category,
    categoryName,
    tags,
    author: frontmatter.author?.trim() || BLOG_DEFAULT_AUTHOR,
    publishedDate: frontmatter.publishedDate,
    updatedDate: frontmatter.updatedDate,
    featuredImage: frontmatter.featuredImage,
    featured: Boolean(frontmatter.featured),
    draft: Boolean(frontmatter.draft),
    readingTime: getReadingTime(content),
    keywords: keywords.length > 0 ? keywords : tags,
    relatedTools: [],
    content,
    toc: extractTocFromMarkdown(content),
    faq: frontmatter.faq,
  };
}

function readAllPosts(): BlogPost[] {
  if (!fs.existsSync(POSTS_DIR)) {
    return [];
  }

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"));

  const posts: BlogPost[] = [];
  for (const file of files) {
    const post = parsePostFile(path.join(POSTS_DIR, file));
    if (post) posts.push(post);
  }

  return posts.sort(
    (a, b) =>
      new Date(b.publishedDate).getTime() - new Date(a.publishedDate).getTime()
  );
}

const allPostsCache: { posts: BlogPost[]; loaded: boolean } = {
  posts: [],
  loaded: false,
};

export function getAllPosts(): BlogPost[] {
  if (!allPostsCache.loaded) {
    allPostsCache.posts = readAllPosts();
    allPostsCache.loaded = true;
  }
  return allPostsCache.posts;
}

export function getPublishedPosts(): BlogPost[] {
  return getAllPosts().filter((post) => !post.draft);
}

function toSummary(post: BlogPost): BlogPostSummary {
  return {
    slug: post.slug,
    title: post.title,
    description: post.description,
    category: post.category,
    categoryName: post.categoryName,
    tags: post.tags,
    author: post.author,
    publishedDate: post.publishedDate,
    updatedDate: post.updatedDate,
    featuredImage: post.featuredImage,
    featured: post.featured,
    draft: post.draft,
    readingTime: post.readingTime,
    keywords: post.keywords,
    relatedTools: post.relatedTools,
  };
}

export function getAllPostSummaries(): BlogPostSummary[] {
  return getPublishedPosts().map(toSummary);
}

export function getPostBySlug(slug: string): BlogPost | null {
  const post = getPublishedPosts().find((item) => item.slug === slug);
  return post ?? null;
}

export function getPostDetail(slug: string): BlogPostDetail | null {
  const published = getPublishedPosts();
  const index = published.findIndex((item) => item.slug === slug);
  if (index === -1) return null;

  const post = published[index];
  return {
    ...post,
    previous: index > 0 ? toSummary(published[index - 1]) : null,
    next: index < published.length - 1 ? toSummary(published[index + 1]) : null,
  };
}

export function getPostsByCategory(category: string): BlogPostSummary[] {
  return getPublishedPosts()
    .filter((post) => post.category === category)
    .map(toSummary);
}

export function getPaginatedPosts(page = 1): BlogPageResult {
  const all = getPublishedPosts();
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * BLOG_PAGE_SIZE;

  return {
    items: all.slice(start, start + BLOG_PAGE_SIZE).map(toSummary),
    total,
    page: safePage,
    totalPages,
    pageSize: BLOG_PAGE_SIZE,
  };
}

export function getPaginatedPostsByCategory(
  category: string,
  page = 1
): BlogPageResult {
  const all = getPostsByCategory(category);
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / BLOG_PAGE_SIZE));
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * BLOG_PAGE_SIZE;

  return {
    items: all.slice(start, start + BLOG_PAGE_SIZE),
    total,
    page: safePage,
    totalPages,
    pageSize: BLOG_PAGE_SIZE,
  };
}

export function getLatestPosts(limit = 6): BlogPostSummary[] {
  return getPublishedPosts().slice(0, limit).map(toSummary);
}

export function getFeaturedPosts(limit = 3): BlogPostSummary[] {
  return getPublishedPosts()
    .filter((post) => post.featured)
    .slice(0, limit)
    .map(toSummary);
}

function scoreRelatedPost(
  current: BlogPostSummary,
  candidate: BlogPost,
  currentCategory: string
): number {
  let score = 0;

  if (candidate.category === currentCategory) score += 10;

  const currentTags = new Set(current.tags.map((tag) => tag.toLowerCase()));
  candidate.tags.forEach((tag) => {
    if (currentTags.has(tag.toLowerCase())) score += 3;
  });

  return score;
}

export function getRelatedPosts(
  post: BlogPostSummary,
  limit = 3
): BlogPostSummary[] {
  return getPublishedPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => ({
      candidate,
      score: scoreRelatedPost(post, candidate, post.category),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => toSummary(item.candidate));
}

export function searchPosts(query: string): BlogPostSummary[] {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return getPublishedPosts()
    .filter((post) => {
      const haystack = [
        post.title,
        post.description,
        post.categoryName,
        post.author,
        ...post.tags,
        ...post.keywords,
        post.content,
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(normalized);
    })
    .map(toSummary)
    .slice(0, 12);
}
