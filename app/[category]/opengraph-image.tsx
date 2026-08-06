import { ImageResponse } from "next/og";
import { CATEGORIES } from "@/lib/constants/categories";
import { SITE_CONFIG } from "@/lib/constants/config";

export const alt = "Free Online Tools";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface CategoryImageParams {
  params: {
    category: string;
  };
}

export default function OpengraphImage({ params }: CategoryImageParams) {
  const category = CATEGORIES.find((item) => item.slug === params.category);
  const name = category?.name ?? params.category;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 55%, #a21caf 100%)",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 42,
            color: "rgba(255,255,255,0.75)",
            marginBottom: 20,
          }}
        >
          Free online tools
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 96,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
            textAlign: "center",
          }}
        >
          {name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            color: "rgba(255,255,255,0.7)",
            marginTop: 28,
          }}
        >
          {SITE_CONFIG.name}
        </div>
      </div>
    ),
    { ...size }
  );
}
