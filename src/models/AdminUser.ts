import mongoose, { Schema, models } from "mongoose";

const AdminUserSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    name: { type: String, default: "Admin" },
  },
  { timestamps: true }
);

export const AdminUser =
  models.AdminUser || mongoose.model("AdminUser", AdminUserSchema);
