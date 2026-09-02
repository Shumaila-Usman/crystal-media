import mongoose, { Schema, models } from "mongoose";

const PlatformMetricsSchema = new Schema(
  {
    followers: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
  },
  { _id: false }
);

const TalentSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    niche: { type: String, required: true },
    city: { type: String, required: true },
    bio: { type: String, default: "" },
    specialties: [{ type: String }],
    image: { type: String, default: "" },
    imagePublicId: { type: String },
    gallery: [{ type: String }],
    platforms: {
      instagram: String,
      tiktok: String,
      youtube: String,
    },
    metrics: {
      instagram: PlatformMetricsSchema,
      tiktok: PlatformMetricsSchema,
      youtube: PlatformMetricsSchema,
    },
    totalFollowers: { type: Number, default: 0 },
    engagementRate: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    campaignLogos: [{ type: String }],
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

TalentSchema.index({ published: 1, featured: -1, sortOrder: 1 });
TalentSchema.index({ niche: 1 });
TalentSchema.index({ city: 1 });

export const Talent = models.Talent || mongoose.model("Talent", TalentSchema);
