import { ImageResponse } from "next/og";
import { SITE_CONFIG } from "@/lib/constants/config";

export const alt = `${SITE_CONFIG.name} - Free Online Tools`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
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
            fontSize: 110,
            fontWeight: 700,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          {SITE_CONFIG.name}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 38,
            color: "rgba(255,255,255,0.85)",
            marginTop: 28,
          }}
        >
          Free online tools and utilities
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.6)",
            marginTop: 12,
          }}
        >
          Private, fast, and right in your browser
        </div>
      </div>
    ),
    { ...size }
  );
}
