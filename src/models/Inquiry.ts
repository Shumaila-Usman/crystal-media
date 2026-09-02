import mongoose, { Schema, models } from "mongoose";

const InquirySchema = new Schema(
  {
    type: {
      type: String,
      enum: ["campaign", "creator", "partner"],
      default: "campaign",
    },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    role: {
      type: String,
      enum: ["brand", "creator", "agency"],
      default: "brand",
    },
    service: { type: String },
    budget: { type: String },
    selectedTalent: { type: String },
    selectedTalentName: { type: String },
    timeline: { type: String },
    message: { type: String, required: true },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "proposal_sent", "won", "lost"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

InquirySchema.index({ status: 1, createdAt: -1 });

export const Inquiry =
  models.Inquiry || mongoose.model("Inquiry", InquirySchema);
