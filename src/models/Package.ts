import mongoose, { Schema, models } from "mongoose";

const PackageSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    tagline: { type: String, required: true },
    description: { type: String, default: "" },
    features: [{ type: String }],
    bestFor: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    price: { type: String },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Package =
  models.Package || mongoose.model("Package", PackageSchema);
