export interface SocialLinks {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  facebook?: string;
  linkedin?: string;
}

export interface PlatformMetrics {
  followers: number;
  engagementRate: number;
}

export interface TalentData {
  _id?: string;
  name: string;
  slug: string;
  niche: string;
  city: string;
  bio: string;
  specialties: string[];
  image: string;
  imagePublicId?: string;
  imageObjectPosition?: string;
  gallery: string[];
  platforms: {
    instagram?: string;
    tiktok?: string;
    youtube?: string;
  };
  metrics: {
    instagram?: PlatformMetrics;
    tiktok?: PlatformMetrics;
    youtube?: PlatformMetrics;
  };
  totalFollowers: number;
  engagementRate: number;
  featured: boolean;
  published: boolean;
  sortOrder: number;
  campaignLogos?: string[];
  seoTitle?: string;
  seoDescription?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandData {
  _id?: string;
  name: string;
  logo: string;
  logoPublicId?: string;
  website?: string;
  sortOrder: number;
  active: boolean;
}

export interface ServiceData {
  _id?: string;
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  icon: string;
  benefits: string[];
  problems: string[];
  deliverables: string[];
  process: { step: string; description: string }[];
  idealClient: string;
  platforms?: { name: string; services: string }[];
  faqs: { question: string; answer: string }[];
  published: boolean;
  sortOrder: number;
  seoTitle?: string;
  seoDescription?: string;
}

export interface PackageData {
  _id?: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  features: string[];
  bestFor: string;
  featured: boolean;
  price?: string;
  published: boolean;
  sortOrder: number;
}

export interface TestimonialData {
  _id?: string;
  brandName: string;
  brandLogo?: string;
  reviewerName: string;
  reviewerRole: string;
  rating: number;
  review: string;
  category?: string;
  featured: boolean;
  published: boolean;
  sortOrder: number;
}

export interface BlogPostData {
  _id?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  featuredImage?: string;
  readingTime: number;
  published: boolean;
  featured: boolean;
  seoTitle?: string;
  seoDescription?: string;
  publishedAt?: string;
  createdAt?: string;
}

export interface FAQData {
  _id?: string;
  question: string;
  answer: string;
  sortOrder: number;
  published: boolean;
}

export interface SiteStats {
  campaignsDelivered?: number;
  creatorsRepresented?: number;
  combinedAudienceReach?: number;
  repeatBrandPartnerships?: number;
}

export interface SiteSettingsData {
  siteName: string;
  tagline: string;
  description: string;
  contactEmail: string;
  receiverEmail: string;
  whatsappNumber: string;
  phone: string;
  instagramUrl: string;
  facebookUrl: string;
  linkedinUrl: string;
  locationLahore: string;
  locationKarachi: string;
  businessHours: string;
  responseTime: string;
  stats: SiteStats;
  metaPixelId?: string;
  googleAnalyticsId?: string;
  defaultSeoTitle: string;
  defaultSeoDescription: string;
  homepageCopy?: {
    heroEyebrow?: string;
    heroHeading?: string;
    heroSubheading?: string;
  };
}

export interface InquiryData {
  _id?: string;
  type: "campaign" | "creator" | "partner";
  fullName: string;
  email: string;
  phone: string;
  role: "brand" | "creator" | "agency";
  service?: string;
  budget?: string;
  selectedTalent?: string;
  selectedTalentName?: string;
  timeline?: string;
  message: string;
  status: "new" | "contacted" | "qualified" | "proposal_sent" | "won" | "lost";
  notes?: string;
  createdAt?: string;
}
