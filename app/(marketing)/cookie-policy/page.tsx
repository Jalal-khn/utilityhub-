import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";
import { LEGAL_PAGES } from "@/lib/constants/legal";
import { SITE_CONFIG } from "@/lib/constants/config";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Explains how UtilityHub uses cookies and similar technologies to improve your experience.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/cookie-policy`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/cookie-policy`,
    title: "Cookie Policy | UtilityHub",
    description:
      "Explains how UtilityHub uses cookies and similar technologies to improve your experience.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy | UtilityHub",
    description:
      "Explains how UtilityHub uses cookies and similar technologies to improve your experience.",
  },
};

export default function CookiePolicyPage() {
  return <LegalPage config={LEGAL_PAGES["cookie-policy"]} />;
}
