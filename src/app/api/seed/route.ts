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

async function upsertMany<T extends Record<string, unknown>>(
  model: {
    updateOne: (
      filter: Record<string, unknown>,
      update: Record<string, unknown>,
      options: { upsert: boolean }
    ) => Promise<unknown>;
  },
  items: T[],
  key: keyof T & string
) {
  let count = 0;
  for (const item of items) {
    await model.updateOne({ [key]: item[key] }, { $set: item }, { upsert: true });
    count++;
  }
  return count;
}

export async function POST(request: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    const authError = await requireAdmin();
    if (authError) return authError;
  }

  const warnings: string[] = [];

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

    let adminCreated = false;
    if (!existingAdmin) {
      try {
        const passwordHash = await hashPassword(adminPassword);
        await AdminUser.create({
          email: adminEmail.toLowerCase(),
          passwordHash,
          name: "Admin",
        });
        adminCreated = true;
      } catch (adminError) {
        warnings.push("Admin user could not be created (collection limit or existing cluster issue).");
        console.warn("Admin user seed skipped:", adminError);
      }
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

    const seedTalentsData = stripSeedId(seedTalents);
    const seedServicesData = stripSeedId(seedServices);
    const seedBrandsData = stripSeedId(seedBrands);
    const seedPackagesData = stripSeedId(seedPackages);
    const seedTestimonialsData = stripSeedId(seedTestimonials);
    const seedBlogData = stripSeedId(seedBlogPosts).map((post) => ({
      ...post,
      publishedAt: post.publishedAt ? new Date(post.publishedAt) : undefined,
    }));
    const seedFaqsData = stripSeedId(seedFAQs);

    if (force) {
      counts.talents = await upsertMany(Talent, seedTalentsData, "slug");
      counts.brands = await upsertMany(Brand, seedBrandsData, "name");
      counts.services = await upsertMany(Service, seedServicesData, "slug");
      counts.packages = await upsertMany(Package, seedPackagesData, "slug");
      counts.testimonials = await upsertMany(
        Testimonial,
        seedTestimonialsData,
        "brandName"
      );
      counts.blogPosts = await upsertMany(BlogPost, seedBlogData, "slug");
      counts.faqs = await upsertMany(FAQ, seedFaqsData, "question");
      await SiteSettings.updateOne(
        {},
        {
          $set: {
            ...seedSettings,
            contactEmail:
              process.env.CONTACT_RECEIVER_EMAIL || seedSettings.contactEmail,
            receiverEmail:
              process.env.CONTACT_RECEIVER_EMAIL || seedSettings.receiverEmail,
          },
        },
        { upsert: true }
      );
      counts.settings = 1;
    } else {
      if ((await Talent.countDocuments()) === 0) {
        counts.talents = await upsertMany(Talent, seedTalentsData, "slug");
      }
      if ((await Brand.countDocuments()) === 0) {
        counts.brands = await upsertMany(Brand, seedBrandsData, "name");
      }
      if ((await Service.countDocuments()) === 0) {
        counts.services = await upsertMany(Service, seedServicesData, "slug");
      }
      if ((await Package.countDocuments()) === 0) {
        counts.packages = await upsertMany(Package, seedPackagesData, "slug");
      }
      if ((await Testimonial.countDocuments()) === 0) {
        counts.testimonials = await upsertMany(
          Testimonial,
          seedTestimonialsData,
          "brandName"
        );
      }
      if ((await BlogPost.countDocuments()) === 0) {
        counts.blogPosts = await upsertMany(BlogPost, seedBlogData, "slug");
      }
      if ((await FAQ.countDocuments()) === 0) {
        counts.faqs = await upsertMany(FAQ, seedFaqsData, "question");
      }
      if ((await SiteSettings.countDocuments()) === 0) {
        await SiteSettings.updateOne(
          {},
          {
            $set: {
              ...seedSettings,
              contactEmail:
                process.env.CONTACT_RECEIVER_EMAIL || seedSettings.contactEmail,
              receiverEmail:
                process.env.CONTACT_RECEIVER_EMAIL || seedSettings.receiverEmail,
            },
          },
          { upsert: true }
        );
        counts.settings = 1;
      }
    }

    return NextResponse.json({
      success: true,
      message: force
        ? "Database re-seeded successfully (upsert)"
        : "Database seeded successfully (skipped existing collections)",
      counts,
      warnings,
      admin: {
        email: adminEmail,
        created: adminCreated,
      },
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed database", details: String(error) },
      { status: 500 }
    );
  }
}
