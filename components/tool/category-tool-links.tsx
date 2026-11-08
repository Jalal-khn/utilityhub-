import Link from "next/link";
import { Container } from "@/components/layout/container";
import { Heading, Text } from "@/components/ui/typography";
import { Separator } from "@/components/ui/separator";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOLS, getToolsByCategory } from "@/lib/constants/tools";
import { TOOL_ROUTE } from "@/lib/constants/routes";

interface CategoryToolLinksProps {
  category: string;
  currentSlug: string;
}

/**
 * Full sibling list for the current tool's category.
 *
 * The "Related Tools" grid picks the best matches by keyword overlap, which
 * leaves niche tools with no inbound internal links at all. This block gives
 * every tool a link from every one of its category peers, so no page depends
 * on a single link from its category hub to be discovered.
 */
export function CategoryToolLinks({ category, currentSlug }: CategoryToolLinksProps) {
  const categoryName =
    CATEGORIES.find((item) => item.slug === category)?.name ?? category;
  const siblings = getToolsByCategory(category).filter(
    (tool) => tool.slug !== currentSlug
  );

  if (siblings.length === 0) return null;

  return (
    <>
      <Separator />
      <Container className="py-12">
        <div className="mx-auto max-w-4xl">
          <Heading level="h2" className="mb-2">
            More {categoryName}
          </Heading>
          <Text variant="muted" className="mb-6">
            The other {siblings.length} tools in this category.
          </Text>
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {siblings.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={TOOL_ROUTE(tool.category, tool.slug)}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  {tool.name}
                </Link>
              </li>
            ))}
          </ul>
          <Text variant="muted" className="mt-8 text-sm">
            Need something different?{" "}
            <Link
              href="/tools"
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              Browse all {TOOLS.length} tools
            </Link>{" "}
            or{" "}
            <Link
              href={`/${category}`}
              className="font-medium text-primary underline-offset-4 hover:underline"
            >
              see the {categoryName} category page
            </Link>
            .
          </Text>
        </div>
      </Container>
    </>
  );
}
