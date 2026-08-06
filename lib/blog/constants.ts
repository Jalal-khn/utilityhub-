import { CATEGORIES } from "@/lib/constants/categories";
import { SITE_CONFIG } from "@/lib/constants/config";
import type { BlogCategory } from "./types";

const BLOG_CATEGORY_INTROS: Record<string, string> = {
  pdf: "Learn how to merge, compress, split, convert, and fix PDF files in your browser - no software installs, no file uploads, and no lost quality.",
  image: "Practical guides to converting, compressing, resizing, cropping, and editing images directly in your browser while keeping quality and privacy intact.",
  text: "Improve your writing with word and character counters, case converters, and text tools - plus editing habits that make your content clearer and easier to read.",
  developer: "Handy developer guides on formatting JSON, encoding and decoding Base64, generating UUIDs, and inspecting tokens safely and efficiently.",
  math: "Everyday math made simple with guides to calculators for age, BMI, percentages, loans, discounts, GST, and date differences.",
  converter: "Convert any measurement instantly with guides to length, temperature, weight, area, speed, and general unit converters.",
  color: "Design and accessibility guides covering color conversion, palettes, gradients, and WCAG contrast checking.",
  generator: "Generate secure passwords, scannable QR codes, random numbers, and more with guides to our on-demand content tools.",
  security: "Security-focused guides on password strength checking and hash generation, all processed locally on your device.",
  seo: "Search engine optimization guides covering meta tags, Open Graph, structured data, sitemaps, and ranking best practices.",
};

export const BLOG_CATEGORIES: BlogCategory[] = CATEGORIES.map((category) => ({
  slug: category.slug,
  name: category.name,
  description: category.description,
  intro:
    BLOG_CATEGORY_INTROS[category.slug] ??
    `${category.description} - practical guides from the ${SITE_CONFIG.name} blog.`,
}));

export const BLOG_CATEGORY_SLUGS = BLOG_CATEGORIES.map(
  (category) => category.slug
);

export const BLOG_CATEGORY_NAMES: Record<string, string> = BLOG_CATEGORIES.reduce(
  (acc, category) => {
    acc[category.slug] = category.name;
    return acc;
  },
  {} as Record<string, string>
);

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((category) => category.slug === slug);
}

export const BLOG_TAGS = [
  "ai",
  "productivity",
  "writing",
  "tutorials",
  "guides",
  "tips",
  "best-practices",
  "case-studies",
] as const;

export const BLOG_PAGE_SIZE = 9;

export const BLOG_DEFAULT_AUTHOR = "UtilityHub Team";

export const BLOG_WORDS_PER_MINUTE = 220;
