import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";
import { LEGAL_PAGES } from "@/lib/constants/legal";
import { SITE_CONFIG } from "@/lib/constants/config";

export const metadata: Metadata = {
  title: "Cookie Policy: How UtilityHub Uses Cookies",
  description:
    "Explains how UtilityHub uses cookies and similar technologies, what is stored in your browser, and how to manage or disable them.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/cookie-policy`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/cookie-policy`,
    title: "Cookie Policy: How UtilityHub Uses Cookies",
    description:
      "Explains how UtilityHub uses cookies and similar technologies, what is stored in your browser, and how to manage or disable them.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cookie Policy: How UtilityHub Uses Cookies",
    description:
      "Explains how UtilityHub uses cookies and similar technologies, what is stored in your browser, and how to manage or disable them.",
  },
};

export default function CookiePolicyPage() {
  return <LegalPage config={LEGAL_PAGES["cookie-policy"]} />;
}
