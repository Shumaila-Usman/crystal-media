import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    shortDescription: { type: String, required: true },
    description: { type: String, default: "" },
    icon: { type: String, default: "sparkles" },
    benefits: [{ type: String }],
    problems: [{ type: String }],
    deliverables: [{ type: String }],
    process: [
      {
        step: String,
        description: String,
      },
    ],
    idealClient: { type: String, default: "" },
    faqs: [
      {
        question: String,
        answer: String,
      },
    ],
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
    seoTitle: String,
    seoDescription: String,
  },
  { timestamps: true }
);

export const Service =
  models.Service || mongoose.model("Service", ServiceSchema);
