import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";
import { LEGAL_PAGES } from "@/lib/constants/legal";
import { SITE_CONFIG } from "@/lib/constants/config";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how UtilityHub collects, uses, and protects your information when you use our free online tools.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/privacy`,
    title: "Privacy Policy | UtilityHub",
    description:
      "Learn how UtilityHub collects, uses, and protects your information when you use our free online tools.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | UtilityHub",
    description:
      "Learn how UtilityHub collects, uses, and protects your information when you use our free online tools.",
  },
};

export default function PrivacyPolicyPage() {
  return <LegalPage config={LEGAL_PAGES.privacy} />;
}
