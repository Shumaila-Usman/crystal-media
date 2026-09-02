import mongoose, { Schema, models } from "mongoose";

const SiteSettingsSchema = new Schema(
  {
    siteName: { type: String, default: "Crystal Media" },
    tagline: {
      type: String,
      default: "Luxury Influencer Marketing & PR Agency",
    },
    description: { type: String, default: "" },
    contactEmail: { type: String, default: "" },
    receiverEmail: { type: String, default: "" },
    whatsappNumber: { type: String, default: "" },
    phone: { type: String, default: "" },
    instagramUrl: {
      type: String,
      default: "https://www.instagram.com/crystal_media.pk/",
    },
    facebookUrl: { type: String, default: "" },
    linkedinUrl: { type: String, default: "" },
    locationLahore: { type: String, default: "Lahore, Pakistan" },
    locationKarachi: { type: String, default: "Karachi, Pakistan" },
    businessHours: {
      type: String,
      default: "Mon – Sat, 10:00 AM – 7:00 PM PKT",
    },
    responseTime: {
      type: String,
      default: "We respond within 24–48 business hours.",
    },
    stats: {
      campaignsDelivered: Number,
      creatorsRepresented: Number,
      combinedAudienceReach: Number,
      repeatBrandPartnerships: Number,
    },
    metaPixelId: String,
    googleAnalyticsId: String,
    defaultSeoTitle: {
      type: String,
      default: "Crystal Media | Luxury Influencer Marketing & PR Agency Pakistan",
    },
    defaultSeoDescription: {
      type: String,
      default:
        "Crystal Media is Pakistan's premium influencer marketing and PR agency. Luxury campaigns, talent management, and brand collaborations in Lahore and Karachi.",
    },
    homepageCopy: {
      heroEyebrow: String,
      heroHeading: String,
      heroSubheading: String,
    },
  },
  { timestamps: true }
);

export const SiteSettings =
  models.SiteSettings ||
  mongoose.model("SiteSettings", SiteSettingsSchema);
