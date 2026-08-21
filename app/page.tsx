import { HeroSection } from "@/components/common/hero-section";
import { SearchBar } from "@/components/search/search-bar";
import { CategoryGrid } from "@/components/category/category-grid";
import { ToolGrid } from "@/components/tool/tool-grid";
import { FAQ } from "@/components/common/faq";
import { BlogGrid } from "@/components/blog/blog-grid";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/constants/categories";
import { SITE_CONFIG } from "@/lib/constants/config";
import { TOOLS } from "@/lib/constants/tools";
import { getFeaturedPosts, getLatestPosts } from "@/lib/blog/load-posts";
import { ROUTES } from "@/lib/constants/routes";
import {
  Zap,
  Shield,
  Smartphone,
  Globe,
  Clock,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Type,
  Code2,
  Calculator,
  RefreshCw,
  Palette,
  Sparkles,
  Landmark,
  Search,
  Box,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/json-ld";

export const metadata: Metadata = {
  alternates: {
    canonical: `${SITE_CONFIG.url}/`,
  },
};

const faqItems = [
  {
    question: "Are all tools really free to use?",
    answer: `Yes, all tools on ${SITE_CONFIG.name} are completely free with no hidden fees or premium tiers.`,
  },
  {
    question: "Is my data safe when using these tools?",
    answer: "Absolutely. All processing happens locally in your browser. Your data never leaves your device.",
  },
  {
    question: "Do I need to create an account?",
    answer: "No account required. You can use all tools immediately without registration.",
  },
  {
    question: "Can I use these tools on mobile devices?",
    answer: "Yes, all tools are fully responsive and optimized for mobile, tablet, and desktop devices.",
  },
];

const faqPageSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  pdf: FileText,
  image: ImageIcon,
  text: Type,
  developer: Code2,
  math: Calculator,
  converter: RefreshCw,
  color: Palette,
  generator: Sparkles,
  finance: Landmark,
  security: Shield,
  seo: Search,
};

export default function HomePage() {
  const featuredTools = TOOLS.filter((tool) => tool.featured).slice(0, 6);
  const latestTools = [...TOOLS].sort((a, b) => (b.addedAt ? Date.parse(b.addedAt) : 0) - (a.addedAt ? Date.parse(a.addedAt) : 0)).slice(0, 6);
  const popularTools = TOOLS.slice(0, 6);
  const latestPosts = getLatestPosts(3);
  const featuredPosts = getFeaturedPosts(3);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <HeroSection
        title={SITE_CONFIG.name}
        description={SITE_CONFIG.description}
        primaryAction={{
          label: "Explore Tools",
          href: "/tools",
        }}
        secondaryAction={{
          label: "Learn More",
          href: "/about",
        }}
      />

      {/* Search Section */}
      <section className="py-12 bg-muted/50">
        <Container>
          <div className="max-w-2xl mx-auto text-center">
            <Heading level="h2" className="mb-4">
              Find the Right Tool
            </Heading>
            <Text variant="muted" className="mb-6">
              Search through our collection of online utilities
            </Text>
            <SearchBar />
          </div>
        </Container>
      </section>

      {/* Categories Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <Heading level="h2" className="mb-4">
              Browse by Category
            </Heading>
            <Text variant="muted">
              Explore tools organized by their primary function
            </Text>
          </div>
          <CategoryGrid
            categories={CATEGORIES.map((category) => {
              const Icon = CATEGORY_ICONS[category.slug] ?? Box;
              return { ...category, icon: <Icon className="h-6 w-6" /> };
            })}
            columns={4}
          />
        </Container>
      </section>

      <Separator />

      {/* Popular Tools Section */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <Heading level="h2" className="mb-2">
                Popular Tools
              </Heading>
              <Text variant="muted">
                Most frequently used tools by our users
              </Text>
            </div>
            <Button variant="outline" asChild>
              <Link href="/tools">View All</Link>
            </Button>
          </div>
          <ToolGrid
            tools={popularTools.map((tool) => ({
              name: tool.name,
              description: tool.description,
              category: tool.category,
              slug: tool.slug,
              tags: tool.searchTags,
              featured: Boolean(tool.featured),
            }))}
            columns={3}
          />
        </Container>
      </section>

      {/* Latest Tools Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <Heading level="h2" className="mb-2">
                Latest Tools
              </Heading>
              <Text variant="muted">
                Recently added tools to our collection
              </Text>
            </div>
            <Button variant="outline" asChild>
              <Link href="/tools">View All</Link>
            </Button>
          </div>
          <ToolGrid
            tools={latestTools.map((tool) => ({
              name: tool.name,
              description: tool.description,
              category: tool.category,
              slug: tool.slug,
              tags: tool.searchTags,
              featured: Boolean(tool.featured),
            }))}
            columns={3}
          />
        </Container>
      </section>

      {/* Featured Tools Section */}
      <section className="py-16">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <Heading level="h2" className="mb-2">
                Featured Tools
              </Heading>
              <Text variant="muted">
                Hand-picked tools recommended by our team
              </Text>
            </div>
            <Button variant="outline" asChild>
              <Link href="/tools">View All</Link>
            </Button>
          </div>
          <ToolGrid
            tools={featuredTools.map((tool) => ({
              name: tool.name,
              description: tool.description,
              category: tool.category,
              slug: tool.slug,
              tags: tool.searchTags,
              featured: true,
            }))}
            columns={3}
          />
        </Container>
      </section>

      <Separator />

      {/* Featured Articles Section */}
      {featuredPosts.length > 0 && (
        <section className="py-16 bg-muted/50">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <div>
                <Heading level="h2" className="mb-2">
                  Featured Articles
                </Heading>
                <Text variant="muted">
                  Hand-picked guides recommended by our team
                </Text>
              </div>
              <Button variant="outline" asChild>
                <Link href={ROUTES.BLOG}>View All</Link>
              </Button>
            </div>
            <BlogGrid posts={featuredPosts} columns={3} />
          </Container>
        </section>
      )}

      {/* Latest from the Blog Section */}
      {latestPosts.length > 0 && (
        <section className="py-16">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <div>
                <Heading level="h2" className="mb-2">
                  Latest from the Blog
                </Heading>
                <Text variant="muted">
                  Guides and tutorials from the UtilityHub team
                </Text>
              </div>
              <Button variant="outline" asChild>
                <Link href={ROUTES.BLOG}>View All</Link>
              </Button>
            </div>
            <BlogGrid posts={latestPosts} columns={3} />
          </Container>
        </section>
      )}

      {/* Benefits Section */}
      <section className="py-16">
        <Container>
          <div className="text-center mb-12">
            <Heading level="h2" className="mb-4">
              Why Choose {SITE_CONFIG.name}
            </Heading>
            <Text variant="muted">
              Built for speed, security, and simplicity
            </Text>
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <Zap className="h-12 w-12 text-primary mb-4" />
                <Heading level="h3" className="mb-2">
                  Lightning Fast
                </Heading>
                <Text variant="muted">
                  All tools run instantly in your browser with no server-side processing
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <Heading level="h3" className="mb-2">
                  Privacy First
                </Heading>
                <Text variant="muted">
                  Your data never leaves your device. All processing happens locally
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Smartphone className="h-12 w-12 text-primary mb-4" />
                <Heading level="h3" className="mb-2">
                  Mobile Optimized
                </Heading>
                <Text variant="muted">
                  Perfect experience on any device, from desktop to smartphone
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Globe className="h-12 w-12 text-primary mb-4" />
                <Heading level="h3" className="mb-2">
                  No Registration
                </Heading>
                <Text variant="muted">
                  Use all tools without creating an account or providing personal information
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-primary mb-4" />
                <Heading level="h3" className="mb-2">
                  Always Available
                </Heading>
                <Text variant="muted">
                  24/7 availability with no downtime. Tools work offline once loaded
                </Text>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CheckCircle2 className="h-12 w-12 text-primary mb-4" />
                <Heading level="h3" className="mb-2">
                  Regular Updates
                </Heading>
                <Text variant="muted">
                  New tools added regularly with continuous improvements to existing ones
                </Text>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* FAQ Section */}
      <JsonLd data={faqPageSchema} />
      <FAQ
        items={faqItems}
      />

      {/* Stats Section */}
      <section className="py-16 bg-muted/50">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-4xl font-extrabold text-primary">{TOOLS.length}+</p>
              <Text variant="muted" className="mt-2">Free Online Tools</Text>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-4xl font-extrabold text-primary">{CATEGORIES.length}</p>
              <Text variant="muted" className="mt-2">Tool Categories</Text>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-4xl font-extrabold text-primary">0</p>
              <Text variant="muted" className="mt-2">Data Uploads</Text>
            </div>
            <div className="rounded-2xl border bg-card p-6 text-center">
              <p className="text-4xl font-extrabold text-primary">100%</p>
              <Text variant="muted" className="mt-2">Browser-Based</Text>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="py-16 text-center">
              <Heading level="h2" className="mb-4">
                Ready to Get Started?
              </Heading>
              <Text variant="lead" className="mb-8 text-primary-foreground/90">
                Explore our collection of free online tools and utilities
              </Text>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary" asChild>
                  <Link href="/tools">Browse All Tools</Link>
                </Button>
                <Button size="lg" variant="outline" className="bg-background text-foreground hover:bg-background/90" asChild>
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </Container>
      </section>
    </div>
  );
}
