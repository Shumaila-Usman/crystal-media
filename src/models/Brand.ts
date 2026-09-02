import mongoose, { Schema, models } from "mongoose";

const BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    logo: { type: String, default: "" },
    logoPublicId: { type: String },
    website: { type: String },
    sortOrder: { type: Number, default: 0 },
    active: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Brand = models.Brand || mongoose.model("Brand", BrandSchema);
