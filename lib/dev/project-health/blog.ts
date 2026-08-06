import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts } from "@/lib/blog/load-posts";
import { BLOG_CATEGORY_SLUGS } from "@/lib/blog/constants";
import { BLOG_POST_ROUTE } from "@/lib/constants/routes";
import { countSummary, fail, ok, warn } from "./helpers";
import type { CheckResult, HealthSection } from "./types";

const POSTS_DIR = path.join(process.cwd(), "content", "blog", "posts");

interface RawPost {
  file: string;
  slug: string;
  data: Record<string, unknown>;
}

function readRawPosts(): RawPost[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => /\.(mdx|md)$/.test(file))
    .map((file) => {
      const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        file,
        slug: path.basename(file, path.extname(file)),
        data: data as Record<string, unknown>,
      };
    });
}

function hasValue(value: unknown): boolean {
  if (value === undefined || value === null) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
}

function linksFor(slugs: string[]): Array<{ label: string; href: string }> {
  return slugs.map((slug) => ({ label: slug, href: BLOG_POST_ROUTE(slug) }));
}

export function runBlogChecks(): HealthSection {
  const checks: CheckResult[] = [];
  const rawPosts = readRawPosts();
  const posts = getAllPosts();
  const published = posts.filter((post) => !post.draft);

  checks.push(
    ok("blog.total", "Total posts", `${posts.length} post(s) in the content directory (${published.length} published, ${posts.length - published.length} draft)`)
  );

  const missingAuthor = rawPosts.filter((post) => !hasValue(post.data.author));
  if (missingAuthor.length === 0) {
    checks.push(ok("blog.author", "Missing author", "Every post declares an author."));
  } else {
    checks.push(
      warn(
        "blog.author",
        "Missing author",
        `${missingAuthor.length} post(s) without an author (default author is applied at render time). ${countSummary(missingAuthor.map((post) => post.slug))}`,
        linksFor(missingAuthor.map((post) => post.slug))
      )
    );
  }

  const missingCategory = rawPosts.filter((post) => {
    const category = String(post.data.category ?? "").toLowerCase().trim();
    return category === "" || !BLOG_CATEGORY_SLUGS.includes(category);
  });
  if (missingCategory.length === 0) {
    checks.push(ok("blog.category", "Missing category", "Every post uses a valid blog category."));
  } else {
    checks.push(
      fail(
        "blog.category",
        "Missing category",
        `${missingCategory.length} post(s) with a missing or unknown category. ${countSummary(missingCategory.map((post) => `${post.slug} (${String(post.data.category) || "none"})`))}`,
        linksFor(missingCategory.map((post) => post.slug))
      )
    );
  }

  const missingFeaturedImage: string[] = [];
  for (const post of posts) {
    if (!post.featuredImage || !post.featuredImage.trim()) {
      missingFeaturedImage.push(post.slug);
      continue;
    }
    const filePath = path.join(process.cwd(), "public", post.featuredImage.replace(/^\/+/, ""));
    if (!fs.existsSync(filePath)) {
      missingFeaturedImage.push(`${post.slug} (file not found: ${post.featuredImage})`);
    }
  }
  if (missingFeaturedImage.length === 0) {
    checks.push(ok("blog.featured-image", "Missing featured image", "Every post has a featured image that exists on disk."));
  } else {
    checks.push(
      warn(
        "blog.featured-image",
        "Missing featured image",
        `${missingFeaturedImage.length} post(s) without a valid featured image. ${countSummary(missingFeaturedImage)}`,
        linksFor(missingFeaturedImage)
      )
    );
  }

  const missingReadingTime = posts.filter((post) => post.readingTime < 1 || post.content.trim().length === 0);
  if (missingReadingTime.length === 0) {
    checks.push(ok("blog.reading-time", "Missing reading time", "Every post has a computed reading time."));
  } else {
    checks.push(
      warn(
        "blog.reading-time",
        "Missing reading time",
        `${missingReadingTime.length} post(s) with empty content or no reading time. ${countSummary(missingReadingTime.map((post) => post.slug))}`,
        linksFor(missingReadingTime.map((post) => post.slug))
      )
    );
  }

  const missingToc = posts.filter((post) => post.toc.length === 0);
  if (missingToc.length === 0) {
    checks.push(ok("blog.toc", "Missing TOC", "Every post has at least one heading so the table of contents renders."));
  } else {
    checks.push(
      warn(
        "blog.toc",
        "Missing TOC",
        `${missingToc.length} post(s) without headings (no table of contents). ${countSummary(missingToc.map((post) => post.slug))}`,
        linksFor(missingToc.map((post) => post.slug))
      )
    );
  }

  const missingFaq = published.filter((post) => !post.faq || post.faq.length === 0);
  if (missingFaq.length === 0) {
    checks.push(ok("blog.faq", "Missing FAQ", "Every published post includes FAQ data (rich results)."));
  } else {
    checks.push(
      warn(
        "blog.faq",
        "Missing FAQ",
        `${missingFaq.length} published post(s) without FAQ data. ${countSummary(missingFaq.map((post) => post.slug))}`,
        linksFor(missingFaq.map((post) => post.slug))
      )
    );
  }

  const drafts = posts.filter((post) => post.draft);
  checks.push(
    drafts.length === 0
      ? ok("blog.drafts", "Draft count", "No drafts. All posts are published.")
      : warn("blog.drafts", "Draft count", `${drafts.length} draft(s) hidden from production. ${countSummary(drafts.map((post) => post.slug))}`, linksFor(drafts.map((post) => post.slug)))
  );

  return {
    id: "blog",
    title: "Blog",
    description: "Validates blog content files and the data derived from them.",
    checks,
  };
}
