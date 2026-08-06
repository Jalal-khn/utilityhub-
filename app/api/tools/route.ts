import { NextResponse } from "next/server";
import { TOOLS } from "@/lib/constants/tools";

export async function GET() {
  return NextResponse.json({
    tools: TOOLS.map((tool) => ({
      slug: tool.slug,
      name: tool.name,
      description: tool.description,
      category: tool.category,
      primaryKeyword: tool.primaryKeyword,
      featured: Boolean(tool.featured),
      href: `/${tool.category}/${tool.slug}`,
    })),
  });
}
