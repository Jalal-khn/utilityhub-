import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants/config";
import { getBlogCategory } from "@/lib/blog/constants";
import { getPostDetail } from "@/lib/blog/load-posts";

export const alt = `${SITE_CONFIG.name} Blog`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function PostOgImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostDetail(params.slug);
  const category = post ? getBlogCategory(post.category) : undefined;
  const meta = post ? `${post.author} · ${post.readingTime} min read` : SITE_CONFIG.description;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: "linear-gradient(135deg, #0f172a 0%, #1e3a8a 55%, #2563eb 100%)",
          color: "#ffffff",
          fontFamily: "Segoe UI, Arial, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ fontSize: 32, fontWeight: 700 }}>{SITE_CONFIG.name}</div>
          <div style={{ fontSize: 24, opacity: 0.85 }}>Blog</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          {category && (
            <div
              style={{
                fontSize: 24,
                fontWeight: 600,
                color: "#93c5fd",
                marginBottom: 20,
              }}
            >
              {category.name}
            </div>
          )}
          <div
            style={{
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.15,
              maxWidth: 940,
            }}
          >
            {post?.title ?? alt}
          </div>
          <div style={{ fontSize: 26, opacity: 0.9, marginTop: 28 }}>
            {meta}
          </div>
        </div>
      </div>
    ),
    size
  );
}
