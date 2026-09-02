import type { Metadata } from "next";
import type { SiteSettingsData } from "@/types";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export function buildMetadata({
  title,
  description,
  path = "",
  image,
  type = "website",
}: {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName: "Crystal Media",
      type,
      images: image ? [{ url: image }] : [{ url: `${SITE_URL}/og-default.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function organizationJsonLd(settings: SiteSettingsData) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.siteName,
    description: settings.description,
    url: SITE_URL,
    logo: `${SITE_URL}/brand/crystal-media-logo.png`,
    sameAs: [
      settings.instagramUrl,
      settings.facebookUrl,
      settings.linkedinUrl,
    ].filter(Boolean),
    areaServed: [
      { "@type": "City", name: "Lahore" },
      { "@type": "City", name: "Karachi" },
      { "@type": "Country", name: "Pakistan" },
    ],
    serviceType: [
      "Influencer Marketing",
      "Public Relations",
      "Talent Management",
    ],
  };
}

export function articleJsonLd(post: {
  title: string;
  excerpt: string;
  slug: string;
  author: string;
  publishedAt?: string;
  featuredImage?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    author: { "@type": "Person", name: post.author },
    datePublished: post.publishedAt,
    image: post.featuredImage,
    url: `${SITE_URL}/blog/${post.slug}`,
    publisher: {
      "@type": "Organization",
      name: "Crystal Media",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/crystal-media-logo.png` },
    },
  };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; url: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export { SITE_URL };
