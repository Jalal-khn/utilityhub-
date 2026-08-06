import * as React from "react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { cn } from "@/lib/utils/cn";

interface HeroSectionProps {
  title: string;
  description: string;
  primaryAction?: {
    label: string;
    href: string;
  };
  secondaryAction?: {
    label: string;
    href: string;
  };
  className?: string;
  variant?: "default" | "center" | "left";
}

export function HeroSection({
  title,
  description,
  primaryAction,
  secondaryAction,
  className,
  variant = "center",
}: HeroSectionProps) {
  const alignmentClasses = {
    default: "text-center",
    center: "text-center",
    left: "text-left",
  };

  return (
    <section className={cn("py-12 md:py-20 lg:py-32", className)}>
      <Container>
        <div className={cn("flex flex-col items-center gap-6", alignmentClasses[variant])}>
          <Heading level="h1" className="max-w-3xl">
            {title}
          </Heading>
          <Text variant="lead" className="max-w-2xl">
            {description}
          </Text>
          {(primaryAction || secondaryAction) && (
            <div className="flex flex-col sm:flex-row gap-4">
              {primaryAction && (
                <Button asChild size="lg">
                  <a href={primaryAction.href}>{primaryAction.label}</a>
                </Button>
              )}
              {secondaryAction && (
                <Button asChild variant="outline" size="lg">
                  <a href={secondaryAction.href}>{secondaryAction.label}</a>
                </Button>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
