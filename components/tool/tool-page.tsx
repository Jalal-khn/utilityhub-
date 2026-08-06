import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FAQ } from "@/components/common/faq";
import { Separator } from "@/components/ui/separator";
import { ToolGrid } from "@/components/tool/tool-grid";
import { getToolFeatures, getToolBenefits } from "@/lib/tool-engine/features";
import type { ToolEngineConfig } from "@/lib/tool-engine";
import type { ReactNode } from "react";

interface ToolPageProps {
  config: ToolEngineConfig;
  categoryLabel?: string;
  toolComponent: ReactNode;
  relatedTools: ToolEngineConfig[];
  guide?: ReactNode;
}

export function ToolPage({ config, categoryLabel, toolComponent, relatedTools, guide }: ToolPageProps) {
  const features = getToolFeatures(config);
  const benefits = getToolBenefits(config);

  return (
    <div className="flex flex-col">
      <Container className="py-8">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: categoryLabel ?? config.category.charAt(0).toUpperCase() + config.category.slice(1), href: `/${config.category}` },
            { label: config.name, href: `/${config.category}/${config.slug}` },
          ]}
          className="mb-6"
        />
        <div className="mb-8">
          <Heading level="h1" className="mb-4">
            {config.name}
          </Heading>
          <Text variant="lead">
            {config.description}
          </Text>
        </div>
      </Container>

      <Separator />

      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          {toolComponent}
        </div>
      </Container>

      <Separator />

      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          <Heading level="h2" className="mb-6">
            Key Features
          </Heading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <Text variant="muted">{feature}</Text>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {guide && (
        <>
          <Separator />
          <Container className="py-12">
            <div className="max-w-4xl mx-auto">
              <Heading level="h2" className="mb-6">
                How to Use
              </Heading>
              {guide}
            </div>
          </Container>
        </>
      )}

      <Separator />

      <Container className="py-12">
        <div className="max-w-4xl mx-auto">
          <Heading level="h2" className="mb-6">
            Benefits
          </Heading>
          <ul className="grid gap-3 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-start gap-3 rounded-lg border border-border/60 bg-card p-4">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                <Text variant="muted">{benefit}</Text>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      {config.faq && config.faq.length > 0 && (
        <FAQ items={config.faq} />
      )}

      {relatedTools.length > 0 && (
        <>
          <Separator />
          <Container className="py-12">
            <div className="mb-8">
              <Heading level="h2" className="mb-2">
                Related Tools
              </Heading>
              <Text variant="muted">
                You might also find these tools useful
              </Text>
            </div>
            <ToolGrid
              tools={relatedTools.map((tool) => ({
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
        </>
      )}
    </div>
  );
}
