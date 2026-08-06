export interface BlogCategory {
  slug: string;
  name: string;
  description: string;
  intro: string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  description: string;
  category: string;
  categoryName: string;
  tags: string[];
  author: string;
  publishedDate: string;
  updatedDate?: string;
  featuredImage?: string;
  featured: boolean;
  draft: boolean;
  readingTime: number;
  keywords: string[];
  relatedTools: string[];
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  toc: TocItem[];
  faq?: Array<{ question: string; answer: string }>;
}

export interface BlogPostDetail extends BlogPost {
  previous: BlogPostSummary | null;
  next: BlogPostSummary | null;
}

export interface BlogPageResult {
  items: BlogPostSummary[];
  total: number;
  page: number;
  totalPages: number;
  pageSize: number;
}

export interface RelatedTool {
  slug: string;
  name: string;
  description: string;
  category: string;
  categoryName: string;
  href: string;
}
