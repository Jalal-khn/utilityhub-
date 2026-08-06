import type { Metadata } from "next";
import { LegalPage } from "@/components/common/legal-page";
import { LEGAL_PAGES } from "@/lib/constants/legal";
import { SITE_CONFIG } from "@/lib/constants/config";

export const metadata: Metadata = {
  title: "Disclaimer",
  description:
    "Important disclaimers about the accuracy, reliability, and limitations of the tools available on UtilityHub.",
  alternates: {
    canonical: `${SITE_CONFIG.url}/disclaimer`,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${SITE_CONFIG.url}/disclaimer`,
    title: "Disclaimer | UtilityHub",
    description:
      "Important disclaimers about the accuracy, reliability, and limitations of the tools available on UtilityHub.",
    siteName: SITE_CONFIG.name,
    images: [{ url: "/opengraph-image" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Disclaimer | UtilityHub",
    description:
      "Important disclaimers about the accuracy, reliability, and limitations of the tools available on UtilityHub.",
  },
};

export default function DisclaimerPage() {
  return <LegalPage config={LEGAL_PAGES.disclaimer} />;
}
