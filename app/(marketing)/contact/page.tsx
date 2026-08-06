import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Heading, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { SITE_CONFIG } from "@/lib/constants/config";
import { Mail, MessageCircle, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with the UtilityHub team. We are happy to help with questions, feedback, or suggestions about our free online tools.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/contact`,
    title: "Contact Us | UtilityHub",
    description:
      "Get in touch with the UtilityHub team. We are happy to help with questions, feedback, or suggestions about our free online tools.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us | UtilityHub",
    description:
      "Get in touch with the UtilityHub team. We are happy to help with questions, feedback, or suggestions about our free online tools.",
  },
};

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      <Container className="py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Contact" }]} className="mb-6" />
        <div className="mb-10 max-w-3xl">
          <Heading level="h1" className="mb-4">
            Contact Us
          </Heading>
          <Text variant="lead">
            Have a question, a suggestion, or found a bug? We would love to hear from you.
          </Text>
        </div>
      </Container>

      <Separator />

      <Container className="py-12">
        <div className="mx-auto max-w-3xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Email Us
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Text variant="muted" className="leading-relaxed">
                For questions, feedback, or tool requests, send us an email and we will get back to
                you as soon as we can.
              </Text>
              <Button asChild>
                <a href={`mailto:${SITE_CONFIG.contact.email}`}>
                  <Mail className="mr-2 h-4 w-4" />
                  {SITE_CONFIG.contact.email}
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5 text-primary" />
                Feedback and Tool Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="muted" className="leading-relaxed">
                Tell us which tools you use most and which new utilities you would like to see.
                Community feedback drives what we build next.
              </Text>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Privacy and Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Text variant="muted" className="leading-relaxed">
                Questions about how your data is handled? Read our{" "}
                <Link href="/privacy" className="font-medium text-primary underline underline-offset-4 hover:text-primary/80">
                  Privacy Policy
                </Link>{" "}
                or contact us directly.
              </Text>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
