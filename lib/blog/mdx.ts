import { compileMDX } from "next-mdx-remote/rsc";
import type { ReactNode } from "react";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeHighlight from "rehype-highlight";
import { mdxComponents } from "./mdx-components";
import { remarkToolLinks } from "./remark-tool-links";

export interface RenderedMdx {
  content: ReactNode;
  frontmatter: Record<string, unknown>;
}

export async function renderMdx(source: string): Promise<RenderedMdx> {
  const { content, frontmatter } = await compileMDX({
    source,
    components: mdxComponents,
    options: {
      blockJS: false,
      blockDangerousJS: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkToolLinks],
        rehypePlugins: [rehypeSlug, rehypeHighlight],
      },
    },
  });

  return { content, frontmatter };
}
