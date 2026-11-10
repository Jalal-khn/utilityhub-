import { AllToolsDirectoryPage } from "@/components/tools/all-tools-directory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Browse 90+ Free Online Tools and Calculators",
  description:
    "Browse all 90+ free online tools on UtilityHub, including PDF and image converters, calculators, text utilities, generators, and SEO tools.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "Browse 90+ Free Online Tools and Calculators | UtilityHub",
    description:
      "Browse all 90+ free online tools on UtilityHub, including PDF and image converters, calculators, text utilities, generators, and SEO tools.",
    url: "/tools",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Browse 90+ Free Online Tools and Calculators | UtilityHub",
    description:
      "Browse all 90+ free online tools on UtilityHub, including PDF and image converters, calculators, text utilities, generators, and SEO tools.",
  },
};

export default function ToolsDirectoryPage() {
  return <AllToolsDirectoryPage />;
}
