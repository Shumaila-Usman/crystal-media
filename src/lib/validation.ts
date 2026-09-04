import { z } from "zod";

export const campaignInquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  role: z.enum(["brand", "creator", "agency"]),
  service: z.string().optional(),
  budget: z.string().optional(),
  selectedTalent: z.string().optional(),
  timeline: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
  consent: z.literal(true, { message: "You must agree to continue" }),
  honeypot: z.string().max(0).optional(),
});

export const homepageInquirySchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  role: z.enum(["brand", "creator", "agency"]),
  budget: z.string().optional(),
  selectedTalent: z.string().optional(),
  message: z.string().min(10, "Please provide more details"),
  honeypot: z.string().max(0).optional(),
});

export const creatorApplicationSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  platforms: z.string().min(1, "Please list your platforms"),
  followers: z.string().min(1, "Please provide follower counts"),
  niche: z.string().min(2),
  message: z.string().min(10),
  consent: z.literal(true, { message: "You must agree to continue" }),
  honeypot: z.string().max(0).optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type CampaignInquiryInput = z.infer<typeof campaignInquirySchema>;
export type HomepageInquiryInput = z.infer<typeof homepageInquirySchema>;
export type CreatorApplicationInput = z.infer<typeof creatorApplicationSchema>;
