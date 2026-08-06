import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Heading, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { LegalPageConfig } from "@/lib/constants/legal";

interface LegalPageProps {
  config: LegalPageConfig;
}

export function LegalPage({ config }: LegalPageProps) {
  return (
    <div className="flex flex-col">
      <Container className="py-8">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: config.title }]} className="mb-6" />
        <div className="mb-8 max-w-3xl">
          <Heading level="h1" className="mb-4">
            {config.title}
          </Heading>
          <Text variant="lead">{config.description}</Text>
          <Text variant="muted" className="mt-3 text-sm">
            Last updated: {config.lastUpdated}
          </Text>
        </div>
      </Container>

      <Separator />

      <Container className="py-12">
        <div className="mx-auto max-w-3xl space-y-8">
          {config.sections.map((section, index) => (
            <Card key={section.heading}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-xl">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                    {index + 1}
                  </span>
                  {section.heading}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {section.paragraphs.map((paragraph, paragraphIndex) => (
                  <Text key={paragraphIndex} variant="muted" className="leading-relaxed">
                    {paragraph}
                  </Text>
                ))}
              </CardContent>
            </Card>
          ))}

          <div className="pt-2">
            <Link href="/" className="text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80">
              Back to homepage
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
