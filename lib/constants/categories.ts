import { getCategoryToolCounts, TOOLS } from "./tools";

const CATEGORY_METADATA: Record<string, { name: string; description: string; icon: string }> = {
  pdf: {
    name: "PDF Tools",
    description: "PDF creation, conversion, and optimization tools",
    icon: "FileText",
  },
  image: {
    name: "Image Tools",
    description: "Image conversion, compression, and editing tools",
    icon: "Image",
  },
  text: {
    name: "Text Tools",
    description: "Text analysis, transformation, and generation tools",
    icon: "Type",
  },
  developer: {
    name: "Developer Tools",
    description: "Developer utilities for encoding, formatting, and generation",
    icon: "Code",
  },
  math: {
    name: "Calculators",
    description: "Everyday calculators for finance, health, and math",
    icon: "Calculator",
  },
  converter: {
    name: "Converters",
    description: "Convert values between units and formats",
    icon: "RefreshCw",
  },
  color: {
    name: "Color Tools",
    description: "Color conversion and palette utilities",
    icon: "Palette",
  },
  generator: {
    name: "Generators",
    description: "Random data, QR, and content generation tools",
    icon: "Sparkles",
  },
  security: {
    name: "Security Tools",
    description: "Security, hashing, and password utilities",
    icon: "Shield",
  },
  seo: {
    name: "SEO Tools",
    description: "Search engine optimization and metadata generators",
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
  };
});

export type Category = (typeof CATEGORIES)[number];
