import { AllToolsDirectoryPage } from "@/components/tools/all-tools-directory";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Free Online Tools | UtilityHub",
  description:
    "Browse all free online tools available on UtilityHub including image tools, PDF tools, calculators, converters, developer tools, SEO tools, generators, and more.",
  alternates: {
    canonical: "/tools",
  },
  openGraph: {
    title: "All Free Online Tools | UtilityHub",
    description:
      "Browse all free online tools available on UtilityHub including image tools, PDF tools, calculators, converters, developer tools, SEO tools, generators, and more.",
    url: "/tools",
    type: "website",
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Free Online Tools | UtilityHub",
    description:
      "Browse all free online tools available on UtilityHub including image tools, PDF tools, calculators, converters, developer tools, SEO tools, generators, and more.",
  },
};

export default function ToolsDirectoryPage() {
  return <AllToolsDirectoryPage />;
}
