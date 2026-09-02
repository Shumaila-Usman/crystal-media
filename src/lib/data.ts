import "server-only";
import { connectDB } from "@/lib/db";
import { Talent } from "@/models/Talent";
import { Brand } from "@/models/Brand";
import { Service } from "@/models/Service";
import { Package } from "@/models/Package";
import { Testimonial } from "@/models/Testimonial";
import { BlogPost } from "@/models/BlogPost";
import { FAQ } from "@/models/FAQ";
import { SiteSettings } from "@/models/SiteSettings";
import {
  seedTalents,
  seedBrands,
  seedServices,
  seedPackages,
  seedTestimonials,
  seedBlogPosts,
  seedFAQs,
  seedSettings,
} from "@/data/seed";
import type {
  TalentData,
  BrandData,
  ServiceData,
  PackageData,
  TestimonialData,
  BlogPostData,
  FAQData,
  SiteSettingsData,
} from "@/types";

function toPlain<T>(doc: T): T {
  return JSON.parse(JSON.stringify(doc));
}

export async function getTalents(filters?: {
  featured?: boolean;
  niche?: string;
  city?: string;
  platform?: string;
  search?: string;
  minFollowers?: number;
  maxFollowers?: number;
  sort?: string;
  page?: number;
  limit?: number;
}): Promise<{ talents: TalentData[]; total: number }> {
  const db = await connectDB();
  let talents: TalentData[] = [];

  if (db) {
    try {
      const query: Record<string, unknown> = { published: true };
      if (filters?.featured) query.featured = true;
      if (filters?.niche) query.niche = new RegExp(filters.niche, "i");
      if (filters?.city) query.city = new RegExp(filters.city, "i");
      if (filters?.search) {
        query.$or = [
          { name: new RegExp(filters.search, "i") },
          { niche: new RegExp(filters.search, "i") },
          { city: new RegExp(filters.search, "i") },
        ];
      }
      if (filters?.minFollowers)
        query.totalFollowers = { $gte: filters.minFollowers };
      if (filters?.maxFollowers) {
        query.totalFollowers = {
          ...(query.totalFollowers as object),
          $lte: filters.maxFollowers,
        };
      }

      let sortQuery: Record<string, 1 | -1> = { sortOrder: 1 };
      if (filters?.sort === "followers") sortQuery = { totalFollowers: -1 };
      if (filters?.sort === "engagement") sortQuery = { engagementRate: -1 };
      if (filters?.sort === "name") sortQuery = { name: 1 };
      if (filters?.sort === "newest") sortQuery = { createdAt: -1 };

      const page = filters?.page || 1;
      const limit = filters?.limit || 12;
      const skip = (page - 1) * limit;

      const [docs, total] = await Promise.all([
        Talent.find(query).sort(sortQuery).skip(skip).limit(limit).lean(),
        Talent.countDocuments(query),
      ]);

      if (docs.length > 0) {
        return { talents: toPlain(docs) as TalentData[], total };
      }
    } catch (e) {
      console.error("Error fetching talents:", e);
    }
  }

  talents = [...seedTalents];
  if (filters?.featured) talents = talents.filter((t) => t.featured);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    talents = talents.filter(
      (t) =>
        t.name.toLowerCase().includes(s) ||
        t.niche.toLowerCase().includes(s) ||
        t.city.toLowerCase().includes(s)
    );
  }
  if (filters?.niche)
    talents = talents.filter((t) =>
      t.niche.toLowerCase().includes(filters.niche!.toLowerCase())
    );
  if (filters?.city)
    talents = talents.filter((t) =>
      t.city.toLowerCase().includes(filters.city!.toLowerCase())
    );
  if (filters?.platform) {
    const p = filters.platform.toLowerCase();
    talents = talents.filter(
      (t) => t.platforms[p as keyof typeof t.platforms]
    );
  }
  if (filters?.minFollowers)
    talents = talents.filter((t) => t.totalFollowers >= filters.minFollowers!);
  if (filters?.maxFollowers)
    talents = talents.filter((t) => t.totalFollowers <= filters.maxFollowers!);

  if (filters?.sort === "followers")
    talents.sort((a, b) => b.totalFollowers - a.totalFollowers);
  if (filters?.sort === "engagement")
    talents.sort((a, b) => b.engagementRate - a.engagementRate);
  if (filters?.sort === "name")
    talents.sort((a, b) => a.name.localeCompare(b.name));

  const page = filters?.page || 1;
  const limit = filters?.limit || 12;
  const start = (page - 1) * limit;
  return { talents: talents.slice(start, start + limit), total: talents.length };
}

export async function getTalentBySlug(slug: string): Promise<TalentData | null> {
  const db = await connectDB();
  if (db) {
    try {
      const doc = await Talent.findOne({ slug, published: true }).lean();
      if (doc) return toPlain(doc) as TalentData;
    } catch (e) {
      console.error("Error fetching talent:", e);
    }
  }
  return seedTalents.find((t) => t.slug === slug) || null;
}

export async function getBrands(): Promise<BrandData[]> {
  const db = await connectDB();
  if (db) {
    try {
      const docs = await Brand.find({ active: true }).sort({ sortOrder: 1 }).lean();
      if (docs.length > 0) return toPlain(docs) as BrandData[];
    } catch (e) {
      console.error("Error fetching brands:", e);
    }
  }
  return seedBrands;
}

export async function getServices(): Promise<ServiceData[]> {
  const db = await connectDB();
  if (db) {
    try {
      const docs = await Service.find({ published: true }).sort({ sortOrder: 1 }).lean();
      if (docs.length > 0) return toPlain(docs) as ServiceData[];
    } catch (e) {
      console.error("Error fetching services:", e);
    }
  }
  return seedServices;
}

export async function getServiceBySlug(slug: string): Promise<ServiceData | null> {
  const db = await connectDB();
  if (db) {
    try {
      const doc = await Service.findOne({ slug, published: true }).lean();
      if (doc) return toPlain(doc) as ServiceData;
    } catch (e) {
      console.error("Error fetching service:", e);
    }
  }
  return seedServices.find((s) => s.slug === slug) || null;
}

export async function getPackages(): Promise<PackageData[]> {
  const db = await connectDB();
  if (db) {
    try {
      const docs = await Package.find({ published: true }).sort({ sortOrder: 1 }).lean();
      if (docs.length > 0) return toPlain(docs) as PackageData[];
    } catch (e) {
      console.error("Error fetching packages:", e);
    }
  }
  return seedPackages;
}

export async function getTestimonials(featured?: boolean): Promise<TestimonialData[]> {
  const db = await connectDB();
  if (db) {
    try {
      const query: Record<string, unknown> = { published: true };
      if (featured) query.featured = true;
      const docs = await Testimonial.find(query).sort({ sortOrder: 1 }).lean();
      if (docs.length > 0) return toPlain(docs) as TestimonialData[];
    } catch (e) {
      console.error("Error fetching testimonials:", e);
    }
  }
  return featured
    ? seedTestimonials.filter((t) => t.featured)
    : seedTestimonials;
}

export async function getBlogPosts(filters?: {
  category?: string;
  search?: string;
  featured?: boolean;
  page?: number;
  limit?: number;
}): Promise<{ posts: BlogPostData[]; total: number }> {
  const db = await connectDB();
  if (db) {
    try {
      const query: Record<string, unknown> = { published: true };
      if (filters?.category) query.category = filters.category;
      if (filters?.featured) query.featured = true;
      if (filters?.search) {
        query.$or = [
          { title: new RegExp(filters.search, "i") },
          { excerpt: new RegExp(filters.search, "i") },
        ];
      }
      const page = filters?.page || 1;
      const limit = filters?.limit || 9;
      const skip = (page - 1) * limit;
      const [docs, total] = await Promise.all([
        BlogPost.find(query).sort({ publishedAt: -1 }).skip(skip).limit(limit).lean(),
        BlogPost.countDocuments(query),
      ]);
      if (docs.length > 0) return { posts: toPlain(docs) as BlogPostData[], total };
    } catch (e) {
      console.error("Error fetching blog posts:", e);
    }
  }

  let posts = [...seedBlogPosts];
  if (filters?.category)
    posts = posts.filter((p) => p.category === filters.category);
  if (filters?.search) {
    const s = filters.search.toLowerCase();
    posts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(s) ||
        p.excerpt.toLowerCase().includes(s)
    );
  }
  if (filters?.featured) posts = posts.filter((p) => p.featured);
  const page = filters?.page || 1;
  const limit = filters?.limit || 9;
  const start = (page - 1) * limit;
  return { posts: posts.slice(start, start + limit), total: posts.length };
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPostData | null> {
  const db = await connectDB();
  if (db) {
    try {
      const doc = await BlogPost.findOne({ slug, published: true }).lean();
      if (doc) return toPlain(doc) as BlogPostData;
    } catch (e) {
      console.error("Error fetching blog post:", e);
    }
  }
  return seedBlogPosts.find((p) => p.slug === slug) || null;
}

export async function getFAQs(): Promise<FAQData[]> {
  const db = await connectDB();
  if (db) {
    try {
      const docs = await FAQ.find({ published: true }).sort({ sortOrder: 1 }).lean();
      if (docs.length > 0) return toPlain(docs) as FAQData[];
    } catch (e) {
      console.error("Error fetching FAQs:", e);
    }
  }
  return seedFAQs;
}

export async function getSiteSettings(): Promise<SiteSettingsData> {
  const db = await connectDB();
  let settings: SiteSettingsData = seedSettings;

  if (db) {
    try {
      const doc = await SiteSettings.findOne().lean();
      if (doc) settings = toPlain(doc) as SiteSettingsData;
    } catch (e) {
      console.error("Error fetching settings:", e);
    }
  }

  return {
    ...settings,
    phone: settings.phone || seedSettings.phone,
    whatsappNumber:
      settings.whatsappNumber ||
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
      seedSettings.whatsappNumber,
    facebookUrl:
      settings.facebookUrl ||
      process.env.NEXT_PUBLIC_FACEBOOK_URL ||
      seedSettings.facebookUrl,
    instagramUrl:
      settings.instagramUrl ||
      process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
      seedSettings.instagramUrl,
  };
}
