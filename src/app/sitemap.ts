import type { MetadataRoute } from "next";
import { seedServices, seedBlogPosts, seedTalents } from "@/data/seed";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    "",
    "/services",
    "/talents",
    "/packages",
    "/testimonials",
    "/blog",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/services/pakistan",
    "/services/lahore",
    "/services/karachi",
    "/services/islamabad",
  ];

  return [
    ...staticPages.map((path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...seedServices.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...seedTalents.map((t) => ({
      url: `${SITE_URL}/talents/${t.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...seedBlogPosts.map((p) => ({
      url: `${SITE_URL}/blog/${p.slug}`,
      lastModified: p.publishedAt ? new Date(p.publishedAt) : new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
