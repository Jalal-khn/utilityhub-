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
  finance: "Make smarter money decisions with guides to mortgage payments, loan EMIs, compound interest, take-home pay, retirement savings, and debt payoff strategies.",
  security: "Security-focused guides on password strength checking and hash generation, all processed locally on your device.",
  seo: "Search engine optimization guides covering meta tags, Open Graph, structured data, sitemaps, and ranking best practices.",
};

const BLOG_CATEGORY_ABOUT: Record<string, string> = {
  pdf: "PDF files are everywhere - reports, invoices, forms, and ebooks - and this collection covers every common task you face with them. Learn how to merge multiple PDFs into one file, split out single pages, compress large documents without losing readable quality, and convert between PDF, JPG, and editable Word format. Every tool here runs entirely in your browser, so your documents never get uploaded to a server and sensitive files stay private. Whether you are tidying up scanned paperwork or preparing files to share, start with the guide that matches the task, then open the matching tool to finish it in seconds.",
  image: "Images make up most of the weight of a modern website, and the guides in this category help you take control of every one of them. Convert between JPG, PNG, WEBP, and HEIC, compress bulky photos before sharing, resize and crop for any layout, and rotate pictures that are sideways. You will also find practical guidance on converting to WebP for faster pages and reversing WebP files back to standard formats when a client or store expects a classic file. Everything is processed locally in your browser, keeping your design work and personal photos off any server.",
  text: "Clear writing starts with understanding your text, and this category shows you how to measure it like a professional. Count words, characters, sentences, and paragraphs before you publish, check whether a caption fits a platform's character limit, and convert case mistakes in one click. The guides pair each tool with the habit that makes it useful - trim fluff, hit the right length for the medium, and keep your message readable at a glance. Because every tool works in your browser, your drafts, posts, and documents stay private while you refine them.",
  developer: "Developers repeat the same small tasks every day, and this category collects the guides that make them quick. Format and validate JSON before it ships, encode and decode Base64 for APIs and tokens, generate UUIDs for keys and records, and understand URL percent-encoding when debugging links. Each guide explains why the encoding matters and how the matching tool handles it, then lets you run the conversion directly in the page. No installs, no account, and nothing leaves your browser while you check your data. The examples are written to be copy-pasted into real projects, so the guidance doubles as a small working reference.",
  math: "Everyday math should not need a spreadsheet. This category covers the calculators people actually use - age, BMI, percentage change, discounts, loan payments, GST, and date differences - each explained with the formula, an example, and tips for interpreting the result. If you are budgeting, comparing offers, or just checking a number, the guides show you what the calculation means before you rely on it. Start with the calculator you need, read the short explanation, and get the answer without signing up or uploading anything. The explanations are kept plain on purpose, because the goal is understanding the number, not just generating it.",
  converter: "Converting units is a common source of small mistakes, and these guides make the conversions clear and verifiable. Cover length, temperature, weight, area, speed, and other everyday measurements with the formulas spelled out, real worked examples, and honest guidance on when precision matters - like shipping, recipes, or construction. Every converter runs in your browser and gives exact results for common units plus the ones you rarely remember. If you want to double-check a conversion by hand, each guide walks through the math so you understand the answer rather than just trusting it.",
  color: "Color decisions are faster and safer with the right tools, and this category explains how to use them. Convert between HEX and RGB, generate palettes and gradients, and check whether text and background pairs meet WCAG accessibility contrast levels. The accessibility guides are written for designers and developers who need to pass audits and build inclusive interfaces - including what AA and AAA really require and how to fix failing color pairs. Everything runs in the browser, so brand colors and client palettes stay private while you tune them.",
  generator: "A small generator tool saves a surprising amount of time. This category covers secure password generation, QR codes for URLs and Wi-Fi networks, random numbers, and other on-demand utilities, each guide explaining how the generated output works and where it is safe to use. The guides help you choose settings that match the job - a stronger password, a QR code that survives being printed, or a random value with the right range. All generation runs locally in your browser, so secrets stay on your device and never touch a server. Because the output is created on your own machine, you keep full control over how it is used afterwards.",
  finance: "Personal finance decisions get easier when the math is clear, and this category explains the calculations behind the choices. Understand mortgage and loan payments, what an EMI really costs, how simple and compound interest grow money differently, how much to tip, and what your take-home pay actually reflects. The guides also cover paying off credit card debt and planning for retirement with realistic numbers you can adapt to your own situation. Each tool runs in your browser with no sign-up, so the figures you explore are computed privately.",
  security: "Security starts with tools you can trust, and this category explains what they do under the hood. Learn how password strength is really assessed, why longer passphrases beat clever substitutions, and how hash functions like SHA-256 turn data into fingerprints that cannot be reversed. Every guide pairs the explanation with a tool that runs entirely in your browser, so passwords and files never leave your device. The focus is practical: decide how strong is strong enough, verify a hash, and build habits that keep your accounts and data safer. That local processing matters - it means a security tool is never also shipping your secrets to a server.",
  seo: "Search engine optimization is mostly small, correct decisions everywhere, and this category collects the ones that matter. Write meta titles and descriptions that earn clicks, use Open Graph and Twitter cards to control link previews, and add structured data, robots.txt, and sitemaps the right way. The guides are written to be applied immediately - each one shows the markup or content directly, with examples you can adapt to your own site. Since UtilityHub is itself a live site, every technique here is one we actually use and can explain from practice.",
};

export const BLOG_CATEGORIES: BlogCategory[] = CATEGORIES.map((category) => ({
  slug: category.slug,
  name: category.name,
  description: category.description,
  intro:
    BLOG_CATEGORY_INTROS[category.slug] ??
    `${category.description} - practical guides from the ${SITE_CONFIG.name} blog.`,
  about:
    BLOG_CATEGORY_ABOUT[category.slug] ??
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

export const BLOG_DEFAULT_AUTHOR = "Jalal Khan";

export const BLOG_WORDS_PER_MINUTE = 220;
