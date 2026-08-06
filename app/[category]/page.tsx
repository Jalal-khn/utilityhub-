import { notFound } from "next/navigation";
import { CATEGORIES } from "@/lib/constants/categories";
import { getToolsByCategory } from "@/lib/constants/tools";
import { CategoryPage } from "@/components/category/category-page";
import { JsonLd } from "@/components/seo/json-ld";
import { SITE_CONFIG } from "@/lib/constants/config";
import type { Metadata } from "next";

interface CategoryPageParams {
  params: {
    category: string;
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({
    category: category.slug,
  }));
}

export async function generateMetadata({ params }: CategoryPageParams): Promise<Metadata> {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    return {
      title: "Category Not Found",
    };
  }

  const url = `${SITE_CONFIG.url}/${category.slug}`;

  return {
    title: `${category.name} - Free Online Tools`,
    description: category.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url,
      title: `${category.name} - Free Online Tools`,
      description: category.description,
      siteName: SITE_CONFIG.name,
    },
    twitter: {
      card: "summary_large_image",
      title: `${category.name} - Free Online Tools`,
      description: category.description,
    },
  };
}

export default function CategoryPageRoute({ params }: CategoryPageParams) {
  const category = CATEGORIES.find((c) => c.slug === params.category);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(params.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.name} - Free Online Tools`,
    description: category.description,
    url: `${SITE_CONFIG.url}/${category.slug}`,
    hasPart: tools.map((tool) => ({
      "@type": "WebApplication",
      name: tool.name,
      description: tool.description,
      url: `${SITE_CONFIG.url}/${tool.category}/${tool.slug}`,
      applicationCategory: "UtilitiesApplication",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_CONFIG.url}/` },
      { "@type": "ListItem", position: 2, name: category.name, item: `${SITE_CONFIG.url}/${category.slug}` },
    ],
  };

  const faqItems = [
    {
      question: `What tools are included in ${category.name}?`,
      answer: `${category.name} brings together related utilities so you can browse and compare tools without leaving the category page.`,
    },
    {
      question: "How do I find a specific tool quickly?",
      answer: "Use the built-in search box to narrow the list by tool name, keyword, or related tag.",
    },
    {
      question: "Will new tools appear automatically?",
      answer: "Yes. This category page reads directly from the shared tool registry, so new additions appear automatically.",
    },
  ];

  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <JsonLd data={[jsonLd, breadcrumbJsonLd, faqPageSchema]} />
      <CategoryPage
        name={category.name}
        description={category.description}
        intro={category.intro}
        slug={category.slug}
        tools={tools}
        faq={faqItems}
      />
    </>
  );
}
