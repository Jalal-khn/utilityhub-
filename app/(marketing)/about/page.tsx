import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Heading, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants/config";
import { Shield, Zap, Globe, Wrench } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "UtilityHub is a collection of free, privacy-first online tools. Fast, accurate, and always free - everything runs directly in your browser.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/about`,
    title: "About Us | UtilityHub",
    description:
      "UtilityHub is a collection of free, privacy-first online tools. Fast, accurate, and always free - everything runs directly in your browser.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us | UtilityHub",
    description:
      "UtilityHub is a collection of free, privacy-first online tools. Fast, accurate, and always free - everything runs directly in your browser.",
  },
};

const values = [
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "Every tool runs 100% in your browser. Your files and data never leave your device, so nothing is stored or shared.",
  },
  {
    icon: Zap,
    title: "Fast by Design",
    description:
      "Tools are lightweight and optimized to give you instant results without unnecessary round trips or waiting.",
  },
  {
    icon: Globe,
    title: "Always Free",
    description:
      "No paywalls, no premium tiers, no sign-ups. Every utility is free to use on any device, whenever you need it.",
  },
  {
    icon: Wrench,
    title: "Practical Utilities",
    description:
      "From PDF and image conversion to calculators and developer tools, everything is built to solve real, everyday problems.",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">
      <Container className="py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "About" }]} className="mb-6" />
        <div className="mb-10 max-w-3xl">
          <Heading level="h1" className="mb-4">
            About {SITE_CONFIG.name}
          </Heading>
          <Text variant="lead">
            {SITE_CONFIG.name} is your one-stop destination for online tools and utilities. We build
            simple, reliable, and privacy-first tools that help you get things done without
            installing software or creating accounts.
          </Text>
        </div>
      </Container>

      <Separator />

      <Container className="py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <div>
            <Heading level="h2" className="mb-3">
              Our Mission
            </Heading>
            <Text variant="muted" className="leading-relaxed">
              We believe everyday tasks - converting files, calculating values, analyzing text, and
              generating data - should be fast, free, and private. Too many online tools are slow,
              cluttered with ads, or require you to upload sensitive information to a server. We built
              {SITE_CONFIG.name} to be the opposite: clean, fast, and completely private by keeping all
              processing in your browser.
            </Text>
          </div>

          <div>
            <Heading level="h2" className="mb-3">
              What We Offer
            </Heading>
            <Text variant="muted" className="leading-relaxed">
              Our collection spans PDF tools, image tools, text utilities, calculators, converters,
              developer tools, generators, color tools, security utilities, and SEO tools. Every tool
              is free, requires no registration, and works across desktop, tablet, and mobile devices.
              New tools are added regularly, and existing ones are continuously improved.
            </Text>
          </div>
        </div>
      </Container>

      <Container className="pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {values.map((value) => (
            <Card key={value.title}>
              <CardHeader>
                <value.icon className="mb-3 h-10 w-10 text-primary" />
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <Text variant="muted">{value.description}</Text>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>

      <Container className="pb-16">
        <Card className="bg-primary text-primary-foreground">
          <CardContent className="py-12 text-center">
            <Heading level="h2" className="mb-4">
              Try a Tool Today
            </Heading>
            <Text variant="lead" className="mb-8 text-primary-foreground/90">
              Explore the collection and find the utility you need.
            </Text>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/tools">Browse All Tools</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-background text-foreground hover:bg-background/90"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
}
