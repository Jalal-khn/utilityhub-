import type { Metadata } from "next";

export interface ToolEngineConfig {
  // Basic Information
  name: string;
  slug: string;
  description: string;
  category: string;
  
  // SEO Keywords
  primaryKeyword: string;
  secondaryKeywords: string[];
  
  // FAQ
  faq: Array<{
    question: string;
    answer: string;
  }>;
  
  // Schema Definition
  schema: ToolSchema;
  
  // Metadata
  metadata: ToolMetadata;
  
  // Related Tools
  relatedTools: string[];
  
  // Search Tags
  searchTags: string[];

  // Content sections
  features?: string[];
  benefits?: string[];

  // Directory / listing metadata
  featured?: boolean;
  addedAt?: string;
}

export interface ToolSchema {
  inputs: ToolInput[];
  outputs: ToolOutput[];
  validation?: ValidationRule[];
}

export interface ToolInput {
  id: string;
  name: string;
  type: "text" | "number" | "select" | "checkbox" | "radio" | "textarea" | "file";
  label: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: any;
  options?: Array<{ label: string; value: string }>;
  min?: number;
  max?: number;
  step?: number;
  accept?: string;
  multiple?: boolean;
}

export interface ToolOutput {
  id: string;
  name: string;
  type: "text" | "number" | "json" | "html" | "code" | "file";
  label: string;
}

export interface ValidationRule {
  field: string;
  rule: "required" | "min" | "max" | "pattern" | "custom";
  value?: any;
  message: string;
}

export interface ToolMetadata {
  title?: string;
  metaDescription?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export interface ToolEngineResult {
  metadata: Metadata;
  jsonLd: string;
  breadcrumb: BreadcrumbItem[];
  relatedTools: string[];
  sitemapEntry: SitemapEntry;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
}

export interface SitemapEntry {
  url: string;
  lastModified?: string;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface ToolEngineContext {
  siteUrl: string;
  siteName: string;
  ogImageDefault: string;
}
