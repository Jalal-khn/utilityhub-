export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export interface LegalPageConfig {
  title: string;
  description: string;
  lastUpdated: string;
  sections: LegalSection[];
}

const CONTACT_EMAIL = "jalalkhan0314076@gmail.com";

export const LEGAL_PAGES: Record<string, LegalPageConfig> = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Learn how UtilityHub collects, uses, and protects your information when you use our free online tools.",
    lastUpdated: "2026-08-03",
    sections: [
      {
        heading: "Information We Collect",
        paragraphs: [
          `UtilityHub is designed to respect your privacy. Most tools on this website run entirely in your browser, which means the files, text, and data you work with are never uploaded to our servers and never leave your device.`,
          `We do not require an account and we do not collect personal information such as your name or email address to use the tools. We may collect limited technical data such as your browser type, device type, and pages visited to help us understand how the site is used and improve it.`,
        ],
      },
      {
        heading: "Cookies and Local Storage",
        paragraphs: [
          `We use browser storage for essential site functionality, such as remembering your theme preference (light or dark mode). This information is stored locally on your device and is not shared with anyone.`,
          `We may also use cookies to measure site usage and to enable advertising partners (including Google AdSense) to serve and measure relevant advertisements.`,
        ],
      },
      {
        heading: "Third-Party Advertising",
        paragraphs: [
          `We display advertising through Google AdSense. Google and its partners may use cookies (such as the DART cookie) to serve ads based on your visits to this and other websites.`,
          `You can learn more about how Google uses information from sites that use its services at policies.google.com/technologies/partner-sites, and you can opt out of personalized advertising through Google Ads Settings at adssettings.google.com.`,
        ],
      },
      {
        heading: "Analytics",
        paragraphs: [
          `We may use privacy-respecting analytics to understand aggregate usage patterns, such as which tools are most popular. This data does not identify individual users.`,
        ],
      },
      {
        heading: "Data Sharing and Disclosure",
        paragraphs: [
          `We do not sell, trade, or rent your personal information to third parties. We may share aggregated, non-personal information with partners to improve our services or as required by law.`,
        ],
      },
      {
        heading: "Third-Party Links",
        paragraphs: [
          `Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites, and we encourage you to review their privacy policies.`,
        ],
      },
      {
        heading: "Children's Privacy",
        paragraphs: [
          `UtilityHub does not knowingly collect personal information from children under the age of 13. If you believe a child has provided us with personal information, please contact us and we will remove it.`,
        ],
      },
      {
        heading: "Your Rights",
        paragraphs: [
          `Depending on your location, you may have the right to access, correct, or delete personal information we hold about you. To exercise any of these rights, please contact us using the details below.`,
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `If you have questions about this Privacy Policy or your data, please contact us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  terms: {
    title: "Terms of Service",
    description:
      "The terms and conditions that govern your use of the UtilityHub website and its free online tools.",
    lastUpdated: "2026-08-03",
    sections: [
      {
        heading: "Acceptance of Terms",
        paragraphs: [
          `By accessing or using UtilityHub, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please do not use the website.`,
        ],
      },
      {
        heading: "Use of the Services",
        paragraphs: [
          `UtilityHub provides free online tools for personal and commercial use. All tools are provided to help you complete everyday tasks and should be used responsibly and lawfully.`,
          `You agree not to misuse the website, attempt to disrupt its operation, or use any tool to process content that is unlawful, infringing, or harmful.`,
        ],
      },
      {
        heading: "No Professional Advice",
        paragraphs: [
          `Tools and information on UtilityHub are provided for general informational purposes only and do not constitute professional, legal, financial, medical, or other expert advice. Always verify important results with a qualified professional.`,
        ],
      },
      {
        heading: "Intellectual Property",
        paragraphs: [
          `The website design, text, and original content are the property of UtilityHub and are protected by applicable copyright laws. Tool output generated by you from your own input remains yours.`,
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          `To the maximum extent permitted by law, UtilityHub and its operators are not liable for any direct, indirect, incidental, or consequential damages arising from your use of the website or reliance on any tool output.`,
        ],
      },
      {
        heading: "Changes to These Terms",
        paragraphs: [
          `We may update these Terms of Service from time to time. Changes take effect when posted on this page, and your continued use of the website constitutes acceptance of the updated terms.`,
        ],
      },
      {
        heading: "Governing Law",
        paragraphs: [
          `These terms are governed by and interpreted in accordance with the laws of the jurisdiction in which UtilityHub operates, without regard to conflict of law principles.`,
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `If you have any questions about these terms, please contact us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer",
    description:
      "Important disclaimers about the accuracy, reliability, and limitations of the tools available on UtilityHub.",
    lastUpdated: "2026-08-03",
    sections: [
      {
        heading: "No Warranty",
        paragraphs: [
          `UtilityHub is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including but not limited to implied warranties of merchantability or fitness for a particular purpose.`,
        ],
      },
      {
        heading: "Accuracy of Results",
        paragraphs: [
          `While we work hard to keep our tools accurate and reliable, we cannot guarantee that results are always correct, complete, or error-free. You are responsible for verifying important outputs before relying on them.`,
        ],
      },
      {
        heading: "Not Professional Advice",
        paragraphs: [
          `Content and tools on this website are for general informational purposes only and are not a substitute for professional advice. For financial, legal, medical, or technical decisions, consult a qualified professional.`,
        ],
      },
      {
        heading: "Third-Party Content and Links",
        paragraphs: [
          `UtilityHub may reference or link to third-party websites. We do not endorse and are not responsible for the content, accuracy, or practices of these external sites.`,
        ],
      },
      {
        heading: "Limitation of Liability",
        paragraphs: [
          `In no event shall UtilityHub or its operators be liable for any loss or damage, including loss of data, arising from the use of this website or any of its tools.`,
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `If you have concerns about the accuracy of any tool or content, please contact us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
  "cookie-policy": {
    title: "Cookie Policy",
    description:
      "Explains how UtilityHub uses cookies and similar technologies to improve your experience.",
    lastUpdated: "2026-08-03",
    sections: [
      {
        heading: "What Are Cookies?",
        paragraphs: [
          `Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and understand how visitors use the site.`,
        ],
      },
      {
        heading: "How We Use Cookies",
        paragraphs: [
          `We use essential cookies and local storage to make the site function, such as remembering your theme preference.`,
          `We may use third-party advertising cookies through Google AdSense to serve and measure ads. These cookies help Google show you ads that are more relevant to your interests.`,
        ],
      },
      {
        heading: "Managing Cookies",
        paragraphs: [
          `You can control cookies through your browser settings by deleting existing cookies or blocking new ones. You can also opt out of personalized advertising via Google Ads Settings at adssettings.google.com.`,
          `Please note that disabling certain cookies may affect how the website functions.`,
        ],
      },
      {
        heading: "Contact Us",
        paragraphs: [
          `For questions about our use of cookies, please contact us at ${CONTACT_EMAIL}.`,
        ],
      },
    ],
  },
};
