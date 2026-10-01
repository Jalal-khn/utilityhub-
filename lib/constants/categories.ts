import { getCategoryToolCounts, TOOLS } from "./tools";

const CATEGORY_METADATA: Record<string, { name: string; description: string; icon: string }> = {
  pdf: {
    name: "PDF Tools",
    description: "Free online PDF tools to merge, split, compress, rotate, and convert PDFs to JPG or images — entirely in your browser with no uploads.",
    icon: "FileText",
  },
  image: {
    name: "Image Tools",
    description: "Free image tools to compress, resize, crop, flip, and convert images between PNG, JPG, WEBP, and HEIC formats right in your browser.",
    icon: "Image",
  },
  text: {
    name: "Text Tools",
    description: "Free text tools to count words and characters, convert case, remove duplicate lines, reverse text, and generate placeholder copy instantly.",
    icon: "Type",
  },
  developer: {
    name: "Developer Tools",
    description: "Free developer utilities for JSON formatting, Base64 encoding and decoding, URL encoding, UUID generation, and JWT decoding in the browser.",
    icon: "Code",
  },
  math: {
    name: "Calculators",
    description: "Free online calculators for age, BMI, percentages, loans, discounts, GST, and date differences — instant results, no sign-up required.",
    icon: "Calculator",
  },
  converter: {
    name: "Converters",
    description: "Free unit converters for length, temperature, weight, area, speed, and more — convert measurements instantly in your browser.",
    icon: "RefreshCw",
  },
  color: {
    name: "Color Tools",
    description: "Free color tools to convert HEX to RGB, generate palettes and gradients, pick colors, and check WCAG contrast for accessible design.",
    icon: "Palette",
  },
  finance: {
    name: "Finance Tools",
    description: "Free finance calculators for mortgages, loans, EMI, compound interest, SIP, retirement, salary, tips, and everyday money decisions.",
    icon: "Landmark",
  },
  generator: {
    name: "Generators",
    description: "Free generators for strong passwords, QR codes, random numbers, and on-demand data — everything runs locally in your browser.",
    icon: "Sparkles",
  },
  security: {
    name: "Security Tools",
    description: "Free security tools to check password strength and generate SHA-256, SHA-512, MD5, and SHA-1 hashes entirely on your device.",
    icon: "Shield",
  },
  seo: {
    name: "SEO Tools",
    description: "Free SEO tools to generate meta tags, robots.txt, sitemap.xml, Open Graph, and Twitter card markup ready to paste into your site.",
    icon: "Search",
  },
};

const CATEGORY_TOOL_COUNTS = getCategoryToolCounts();
const KNOWN_CATEGORY_SLUGS = Object.keys(CATEGORY_METADATA);
const TOOL_CATEGORY_SLUGS = Array.from(new Set(TOOLS.map((tool) => tool.category)));
const CATEGORY_SLUGS = [
  ...KNOWN_CATEGORY_SLUGS,
  ...TOOL_CATEGORY_SLUGS.filter((slug) => !KNOWN_CATEGORY_SLUGS.includes(slug)),
];

const CATEGORY_INTROS: Record<string, string[]> = {
  pdf: [
    "PDF tools let you merge, split, compress, convert, and rotate PDF files directly in your browser. There is no software to install and no file ever leaves your computer.",
    "Whether you need to combine several documents into one, shrink a large file before sending it, or turn a scan into a proper PDF, every operation is processed locally for fast, private results.",
  ],
  image: [
    "Image tools handle conversion, compression, resizing, cropping, flipping, and format changes like PNG to JPG, HEIC to JPG, and more.",
    "Everything runs in your browser, so you can compress a photo, change its dimensions, or swap its format without uploading it to any server or losing quality to third-party processing.",
  ],
  text: [
    "Text tools analyze, transform, and generate text. Count words and characters, check reading time, convert case, remove duplicate lines, reverse text, and generate placeholder copy.",
    "These utilities are ideal for writers, editors, students, and developers who need quick, accurate text processing without leaving the page or sharing their content.",
  ],
  developer: [
    "Developer tools cover encoding, formatting, and generation essentials such as JSON formatting, Base64 encoding and decoding, URL encoding, UUID generation, and JWT decoding.",
    "Paste your payload, inspect the output, and copy the result - all client-side, making these utilities safe for working with tokens, keys, and other sensitive data.",
  ],
  math: [
    "Calculators make everyday math simple with tools for age, BMI, percentages, loans, discounts, GST, and date differences.",
    "Each calculator gives instant, accurate results and is free to use, making it easy to budget, plan, and check everyday figures on any device.",
  ],
  converter: [
    "Converters translate values between units and formats, covering length, temperature, weight, area, speed, and general unit conversion.",
    "Whether you are cooking, traveling, or working on a project, convert any measurement instantly in your browser with no sign-up and no data upload.",
  ],
  color: [
    "Color tools convert between color models, generate palettes and gradients, pick colors from the screen, and check contrast for accessible designs.",
    "They are built for designers and developers who need fast, accurate color workflows - from HEX and RGB conversion to WCAG contrast checking - entirely in the browser.",
  ],
  finance: [
    "Finance calculators help you plan big money decisions: mortgage payments, loan EMIs with prepayment savings, compound interest growth, salary conversions, and restaurant tips.",
    "Every calculator runs instantly in your browser with no sign-up. Adjust the numbers and see results update in real time so you can compare scenarios before you commit.",
  ],
  generator: [
    "Generators create random data, QR codes, passwords, and other on-demand content. Generate a secure password, a scannable QR code, or a random number in one click.",
    "Every generator runs locally, so the data you generate is never transmitted, stored, or logged anywhere.",
  ],
  security: [
    "Security tools include password strength checking and hash generation with SHA-256, SHA-512, MD5, and SHA-1.",
    "Use them to evaluate password strength or compute hashes of text and files entirely on your device - nothing is sent to a server.",
  ],
  seo: [
    "SEO tools generate metadata and technical files for search optimization, including meta tags, robots.txt, sitemap.xml, Open Graph, and Twitter card markup.",
    "Build complete, standards-ready snippets that you can paste directly into your pages and improve how your site appears in search results and social sharing.",
  ],
};

const CATEGORY_ABOUTS: Record<string, string[]> = {
  pdf: [
    "PDF files are a daily fixture for students, freelancers, and offices, and this category gathers the browser tools that handle the most common PDF jobs. Merge several documents into one, split a file into separate pages, compress files that are too large to email, and rotate pages that show up sideways - all without installing desktop software.",
    "Conversion is covered too: turn PDFs into JPG or PNG images, and extract text into an editable Word document. Every operation runs locally on your device, so confidential contracts, invoices, and scans never get uploaded to a server. If a scanned PDF cannot be processed, you will see a clear message explaining why, and the related guides walk through each workflow step by step.",
  ],
  image: [
    "Images power websites, stores, and social feeds, and this category brings together the browser tools for managing them. Compress bulky photos before uploading, resize and crop images to any dimension, rotate, flip, and edit them, and convert between formats such as PNG, JPG, WEBP, and HEIC in seconds.",
    "All processing happens in your browser, which means no uploads, no queues, and no limits on how many times you convert. The tools are useful for designers, developers, and everyday users alike - shrink a portfolio image, prepare product photos for a listing, or swap a format for a client while comparing quality and size side by side.",
  ],
  text: [
    "Text work is faster with the right measurement and transformation tools, and this category collects them in one place. Count words, characters without spaces, sentences, and paragraphs, estimate reading time, convert case, reverse or remove duplicate lines, and generate placeholder copy for designs and documents.",
    "Writers, editors, students, and developers use these utilities to hit length limits, clean up drafts, and prepare text for publication. Everything runs locally, so notes, drafts, and unpublished work never leave your device while you refine it.",
  ],
  developer: [
    "Developers spend a surprising amount of time on small mechanical tasks, and this category puts the essentials on one page. Format and validate JSON, encode and decode Base64, percent-encode and decode URLs, generate UUIDs, and decode JWTs - all without opening a separate application.",
    "Every tool executes entirely in the browser, making it safe for inspecting tokens, keys, and test data you would rather not send anywhere. Paste a payload, read the result, and drop it straight back into your workflow. The companion guides explain the encodings and point out the common mistakes that trip people up.",
  ],
  math: [
    "Everyday calculations become instant with this category of free calculators. Work out age, BMI, percentage change, discounts, loan payments, GST, and date differences without reaching for a spreadsheet, and without signing up for anything.",
    "Each calculator shows the formula and the result clearly, so you can trust the number and understand where it comes from. They are built for quick, single answers - whether you are budgeting, comparing plans, or just checking a figure - and all computation happens in your browser.",
  ],
  converter: [
    "Unit conversion is one of those small tasks where one wrong factor costs real time, and this category keeps conversions reliable. Convert length, temperature, weight, area, and speed, plus a general converter for values you need to translate between everyday units.",
    "Every converter works instantly in the browser and gives exact results with the unit you expect. Whether you are cooking, traveling, measuring for a project, or double-checking a specification, you can convert any value without installing anything or uploading data.",
  ],
  color: [
    "Color work is faster when the tools live in the browser. Convert between HEX and RGB, generate palettes and gradients, pick colors visually, and - critically - check WCAG contrast for accessible design before you ship a color pair.",
    "These utilities are built for designers and developers who need accurate color workflows without context switching. Contrast checking validates text against WCAG AA and AAA, so accessibility problems are caught early, and everything runs locally for privacy.",
  ],
  finance: [
    "Money decisions are easier when the math is clear, and this category collects the calculators that crunch the numbers. Estimate mortgage payments, break down loan EMIs including prepayment savings, model compound interest and SIP growth, convert salary, and figure out tipping.",
    "Each calculator updates instantly as you change inputs, so comparing scenarios takes seconds. There is no sign-up and no data collection - the numbers you explore stay on your device. Use them to plan a purchase, a loan, or a savings goal before you commit.",
  ],
  generator: [
    "Generators create the random data that developers and everyday users need on demand. Produce secure passwords, QR codes for URLs and Wi-Fi networks, random numbers, and other generated content with a single click.",
    "Generation runs entirely in your browser, so passwords, codes, and other output are never transmitted or logged anywhere. Choose the settings that fit the job - strength for a password, size for a QR code, or a range for random values - and copy the result straight into whatever needs it.",
  ],
  security: [
    "Security tools in this category help you verify and harden the basics. Check password strength to see what makes a password hard to crack, and compute hashes with SHA-256, SHA-512, MD5, and SHA-1 for checksums and integrity checks.",
    "All hashing and analysis runs on your device, which matters for security tools: passwords and file contents never leave your computer. The strength checks give practical feedback you can act on immediately, and the hash generators produce standard fingerprints you can verify anywhere.",
  ],
  seo: [
    "SEO tools generate the technical building blocks of search visibility. Create meta tags, robots.txt, sitemap.xml, Open Graph, and Twitter card markup that are ready to paste straight into your site.",
    "Instead of hand-writing structured data, choose the fields, copy the snippet, and drop it in. The companion guides explain how each file affects crawling and social sharing, so you understand what you are adding and why - all generated in your browser with no account and no upload.",
  ],
};

export const CATEGORIES = CATEGORY_SLUGS.map((slug) => {
  const metadata = CATEGORY_METADATA[slug] ?? {
    name: slug.replace(/-/g, " ").replace(/\b\w/g, (char) => char.toUpperCase()),
    description: "Tools in this category",
    icon: "Box",
  };

  return {
    id: slug,
    name: metadata.name,
    slug,
    description: metadata.description,
    icon: metadata.icon,
    count: CATEGORY_TOOL_COUNTS[slug] ?? 0,
    toolCount: CATEGORY_TOOL_COUNTS[slug] ?? 0,
    intro: CATEGORY_INTROS[slug] ?? [],
    about: CATEGORY_ABOUTS[slug] ?? [],
  };
});

export type Category = (typeof CATEGORIES)[number];
