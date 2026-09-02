import mongoose, { Schema, models } from "mongoose";

const BlogPostSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: String, required: true },
    author: { type: String, default: "Crystal Media" },
    featuredImage: { type: String },
    readingTime: { type: Number, default: 5 },
    published: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    seoTitle: String,
    seoDescription: String,
    publishedAt: { type: Date },
  },
  { timestamps: true }
);

BlogPostSchema.index({ published: 1, publishedAt: -1 });

export const BlogPost =
  models.BlogPost || mongoose.model("BlogPost", BlogPostSchema);
