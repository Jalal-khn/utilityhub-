import { notFound } from "next/navigation";
import { getToolBySlug } from "@/lib/constants/tools";
import { CATEGORIES } from "@/lib/constants/categories";
import { TOOLS } from "@/lib/constants/tools";
import { ToolPage } from "@/components/tool/tool-page";
import { JsonLd } from "@/components/seo/json-ld";
import { ToolGuide } from "@/components/tool/tool-guide";
import { getToolEngine } from "@/lib/tool-engine";
import { SITE_CONFIG } from "@/lib/constants/config";
import type { Metadata } from "next";
import { ToolWidget } from "@/components/tool/tool-widget";

interface ToolPageParams {
  params: {
    category: string;
    tool: string;
  };
}

const toolEngine = () =>
  getToolEngine(
    {
      siteUrl: SITE_CONFIG.url,
      siteName: SITE_CONFIG.name,
      ogImageDefault: SITE_CONFIG.ogImage,
    },
    TOOLS
  );

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    category: tool.category,
    tool: tool.slug,
  }));
}

export async function generateMetadata({ params }: ToolPageParams): Promise<Metadata> {
  const tool = getToolBySlug(params.tool);

  if (!tool) {
    return {
      title: "Tool Not Found",
    };
  }

  const result = toolEngine().generate(tool);

  return result.metadata;
}

export default function ToolPageRoute({ params }: ToolPageParams) {
  const tool = getToolBySlug(params.tool);

  if (!tool) {
    notFound();
  }

  const engine = toolEngine();
  const category = CATEGORIES.find((item) => item.slug === tool.category);
  const result = engine.generate(tool, { categoryLabel: category?.name });
  const relatedTools = result.relatedTools
    .map((slug) => getToolBySlug(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));

  const ToolComponent = <ToolWidget category={tool.category} slug={tool.slug} />;

  return (
    <>
      <JsonLd data={JSON.parse(result.jsonLd) as object} />
      <ToolPage
        config={tool}
        categoryLabel={category?.name}
        toolComponent={ToolComponent}
        relatedTools={relatedTools}
        guide={<ToolGuide config={tool} />}
      />
    </>
  );
}
