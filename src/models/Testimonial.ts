import mongoose, { Schema, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    brandName: { type: String, required: true },
    brandLogo: { type: String },
    reviewerName: { type: String, required: true },
    reviewerRole: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true },
    category: { type: String },
    featured: { type: Boolean, default: false },
    published: { type: Boolean, default: true },
    sortOrder: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial =
  models.Testimonial || mongoose.model("Testimonial", TestimonialSchema);
