import { ImageResponse } from "next/og";
import { getPostDetail } from "@/lib/blog/load-posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog article cover";

const categoryGradients: Record<string, [string, string]> = {
  finance: ["#831843", "#ec4899"],
  converter: ["#6d28d9", "#8b5cf6"],
  generator: ["#b45309", "#f59e0b"],
  security: ["#be123c", "#f43f5e"],
};

const defaultGradient: [string, string] = ["#4338ca", "#7c3aed"];

function gradientFor(category?: string): [string, string] {
  if (!category) return defaultGradient;
  return categoryGradients[category] ?? defaultGradient;
}

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostDetail(params.slug);
  const title = post?.title ?? "UtilityHub Blog";
  const label = (post?.categoryName ?? "Blog").toUpperCase();
  const [from, to] = gradientFor(post?.category);

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background: `linear-gradient(135deg, ${from} 0%, ${to} 100%)`,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", fontSize: 34, fontWeight: 700, color: "#ffffff" }}>
            UtilityHub
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "rgba(255,255,255,0.85)" }}>
            Blog
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontSize: 26,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: "rgba(255,255,255,0.8)",
              marginBottom: 24,
            }}
          >
            {label}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: title.length > 60 ? 56 : 68,
              fontWeight: 700,
              lineHeight: 1.15,
              color: "#ffffff",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", fontSize: 28, color: "rgba(255,255,255,0.85)" }}>
          UtilityHub Team
        </div>
      </div>
    ),
    { ...size }
  );
}
