export interface JsonLd {
  "@context": string;
  "@type": string;
  [key: string]: any;
}

export interface SitemapEntry {
  url: string;
  lastModified?: string | Date;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export interface RobotsRule {
  userAgent: string;
  allow?: string[];
  disallow?: string[];
}
