import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth";
import { requireAdmin } from "@/lib/api-auth";
import { ensureDb } from "@/lib/api-utils";
import { AdminUser } from "@/models/AdminUser";
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

function stripSeedId<T extends { _id?: string }>(items: T[]) {
  return items.map(({ _id, ...rest }) => rest);
}

export async function POST(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    const authError = await requireAdmin();
    if (authError) return authError;
  }

  try {
    const dbError = await ensureDb();
    if (dbError) return dbError;

    const body = await request.json().catch(() => ({}));
    const force = body.force === true;

    const adminEmail =
      process.env.ADMIN_EMAIL || "admin@crystalmedia.pk";
    const adminPassword =
      process.env.ADMIN_PASSWORD || "changeme123";

    const existingAdmin = await AdminUser.findOne({
      email: adminEmail.toLowerCase(),
    });

    if (!existingAdmin) {
      const passwordHash = await hashPassword(adminPassword);
      await AdminUser.create({
        email: adminEmail.toLowerCase(),
        passwordHash,
        name: "Admin",
      });
    }

    const counts = {
      talents: 0,
      brands: 0,
      services: 0,
      packages: 0,
      testimonials: 0,
      blogPosts: 0,
      faqs: 0,
      settings: 0,
    };

    if (force) {
      await Promise.all([
        Talent.deleteMany({}),
        Brand.deleteMany({}),
        Service.deleteMany({}),
        Package.deleteMany({}),
        Testimonial.deleteMany({}),
        BlogPost.deleteMany({}),
        FAQ.deleteMany({}),
        SiteSettings.deleteMany({}),
      ]);
    }

    const talentCount = await Talent.countDocuments();
    if (talentCount === 0 || force) {
      if (force) await Talent.deleteMany({});
      const inserted = await Talent.insertMany(stripSeedId(seedTalents));
      counts.talents = inserted.length;
    }

    const brandCount = await Brand.countDocuments();
    if (brandCount === 0 || force) {
      if (force) await Brand.deleteMany({});
      const inserted = await Brand.insertMany(stripSeedId(seedBrands));
      counts.brands = inserted.length;
    }

    const serviceCount = await Service.countDocuments();
    if (serviceCount === 0 || force) {
      if (force) await Service.deleteMany({});
      const inserted = await Service.insertMany(stripSeedId(seedServices));
      counts.services = inserted.length;
    }

    const packageCount = await Package.countDocuments();
    if (packageCount === 0 || force) {
      if (force) await Package.deleteMany({});
      const inserted = await Package.insertMany(stripSeedId(seedPackages));
      counts.packages = inserted.length;
    }

    const testimonialCount = await Testimonial.countDocuments();
    if (testimonialCount === 0 || force) {
      if (force) await Testimonial.deleteMany({});
      const inserted = await Testimonial.insertMany(
        stripSeedId(seedTestimonials)
      );
      counts.testimonials = inserted.length;
    }

    const blogCount = await BlogPost.countDocuments();
    if (blogCount === 0 || force) {
      if (force) await BlogPost.deleteMany({});
      const blogData = stripSeedId(seedBlogPosts).map((post) => ({
        ...post,
        publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
      }));
      const inserted = await BlogPost.insertMany(blogData);
      counts.blogPosts = inserted.length;
    }

    const faqCount = await FAQ.countDocuments();
    if (faqCount === 0 || force) {
      if (force) await FAQ.deleteMany({});
      const inserted = await FAQ.insertMany(stripSeedId(seedFAQs));
      counts.faqs = inserted.length;
    }

    const settingsCount = await SiteSettings.countDocuments();
    if (settingsCount === 0 || force) {
      if (force) await SiteSettings.deleteMany({});
      await SiteSettings.create({
        ...seedSettings,
        contactEmail: process.env.CONTACT_RECEIVER_EMAIL || seedSettings.contactEmail,
        receiverEmail: process.env.CONTACT_RECEIVER_EMAIL || seedSettings.receiverEmail,
      });
      counts.settings = 1;
    }

    return NextResponse.json({
      success: true,
      message: force
        ? "Database re-seeded successfully"
        : "Database seeded successfully (skipped existing collections)",
      counts,
      admin: {
        email: adminEmail,
        created: !existingAdmin,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database" },
      { status: 500 }
    );
  }
}
