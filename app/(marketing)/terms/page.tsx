import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";
import { LEGAL_PAGES } from "@/lib/constants/legal";
import { SITE_CONFIG } from "@/lib/constants/config";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms and conditions that govern your use of the UtilityHub website and its free online tools.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/terms`,
    title: "Terms of Service | UtilityHub",
    description:
      "The terms and conditions that govern your use of the UtilityHub website and its free online tools.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms of Service | UtilityHub",
    description:
      "The terms and conditions that govern your use of the UtilityHub website and its free online tools.",
  },
};

export default function TermsPage() {
  return <LegalPage config={LEGAL_PAGES.terms} />;
}
