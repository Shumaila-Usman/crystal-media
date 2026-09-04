import type {
  TalentData,
  BrandData,
  ServiceData,
  PackageData,
  TestimonialData,
  BlogPostData,
  FAQData,
  SiteSettingsData,
} from "@/types";

export const seedTalents: TalentData[] = [
  {
    _id: "seed-1",
    name: "Alina Amir",
    slug: "alina-amir",
    niche: "Fashion & Lifestyle",
    city: "Lahore",
    bio: "Alina brings editorial fashion sensibility to everyday lifestyle content, partnering with premium brands across South Asia.",
    specialties: ["Fashion", "Lifestyle", "Brand Campaigns"],
    image: "/talents/alina-amir.jpg",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/alinaamiirr/",
      tiktok: "https://www.tiktok.com/@alinaamiirr",
    },
    metrics: {
      instagram: { followers: 2400000, engagementRate: 4.2 },
      tiktok: { followers: 2700000, engagementRate: 4.2 },
    },
    totalFollowers: 5100000,
    engagementRate: 4.2,
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    _id: "seed-2",
    name: "Jannat Mirza",
    slug: "jannat-mirza",
    niche: "Lifestyle & Fashion",
    city: "Karachi",
    bio: "Jannat connects with millions through refined lifestyle and fashion content built for premium brand partnerships.",
    specialties: ["Lifestyle", "Fashion", "Brand Campaigns"],
    image: "/talents/jannat-mirza.jpg",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/jannatmirza_/",
      tiktok: "https://www.tiktok.com/@jannatmirza",
    },
    metrics: {
      instagram: { followers: 6300000, engagementRate: 5.1 },
      tiktok: { followers: 25600000, engagementRate: 5.1 },
    },
    totalFollowers: 31900000,
    engagementRate: 5.1,
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    _id: "seed-3",
    name: "Iqra Kanwal",
    slug: "iqra-kanwal",
    niche: "Beauty & Lifestyle",
    city: "Lahore",
    bio: "Iqra is known for refined beauty and lifestyle content that resonates with discerning audiences across Pakistan.",
    specialties: ["Beauty", "Lifestyle", "Brand Campaigns"],
    image: "/talents/iqra-kanwal.jpg",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/iqrakanwal.official/",
      tiktok: "https://www.tiktok.com/@iqrakanwal.official",
      youtube: "https://www.youtube.com/@iqrakanwal",
    },
    metrics: {
      instagram: { followers: 3600000, engagementRate: 3.9 },
      tiktok: { followers: 2400000, engagementRate: 3.9 },
      youtube: { followers: 6240000, engagementRate: 3.9 },
    },
    totalFollowers: 12240000,
    engagementRate: 3.9,
    featured: true,
    published: true,
    sortOrder: 3,
  },
  {
    _id: "seed-4",
    name: "Zarnab Laraib",
    slug: "zarnab-laraib",
    niche: "Lifestyle & Fashion",
    city: "Karachi",
    bio: "Zarnab creates elevated lifestyle and fashion storytelling for brands seeking culturally relevant creator partnerships.",
    specialties: ["Fashion", "Lifestyle", "Brand Campaigns"],
    image: "/talents/zarnab-laraib.jpg",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/___zarnabfatima/",
      youtube: "https://www.youtube.com/@zarnabfatima",
    },
    metrics: {
      instagram: { followers: 1900000, engagementRate: 4.5 },
      youtube: { followers: 1040000, engagementRate: 4.5 },
    },
    totalFollowers: 2940000,
    engagementRate: 4.5,
    featured: true,
    published: true,
    sortOrder: 4,
  },
  {
    _id: "seed-5",
    name: "Maryam Noor",
    slug: "maryam-noor",
    niche: "Lifestyle & Fashion",
    city: "Islamabad",
    bio: "Maryam blends lifestyle and fashion content for brands targeting Pakistan's style-conscious, digitally native audience.",
    specialties: ["Fashion", "Lifestyle", "Brand Campaigns"],
    image: "/talents/aiman-zaman.jpg",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/maryamnoorofficial/",
      tiktok: "https://www.tiktok.com/@maryamnoorofficial",
    },
    metrics: {
      instagram: { followers: 753000, engagementRate: 5.6 },
      tiktok: { followers: 140700, engagementRate: 5.6 },
    },
    totalFollowers: 893700,
    engagementRate: 5.6,
    featured: true,
    published: true,
    sortOrder: 5,
  },
  {
    _id: "seed-6",
    name: "Aiman Zaman",
    slug: "aiman-zaman",
    niche: "Entertainment & Lifestyle",
    city: "Lahore",
    bio: "Aiman creates engaging entertainment and lifestyle content with an authentic voice brands love for meaningful reach.",
    specialties: ["Entertainment", "Lifestyle", "Brand Campaigns"],
    image: "/talents/maryam-noor.jpg",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/aimanzamanofficial/",
      tiktok: "https://www.tiktok.com/@aimanzamanofficial",
    },
    metrics: {
      instagram: { followers: 1400000, engagementRate: 6.8 },
      tiktok: { followers: 7500000, engagementRate: 6.8 },
    },
    totalFollowers: 8900000,
    engagementRate: 6.8,
    featured: true,
    published: true,
    sortOrder: 6,
  },
  {
    _id: "seed-7",
    name: "Hiba Bukhari",
    slug: "hiba-bukhari",
    niche: "Drama & Lifestyle",
    city: "Karachi",
    bio: "Hiba curates aspirational drama and lifestyle content for premium fashion and lifestyle brand partnerships.",
    specialties: ["Drama", "Fashion", "Lifestyle"],
    image: "/talents/hiba-bukhari.webp",
    gallery: [],
    platforms: { instagram: "https://www.instagram.com/ihibaqadir__/" },
    metrics: {
      instagram: { followers: 2300000, engagementRate: 4.7 },
    },
    totalFollowers: 2300000,
    engagementRate: 4.7,
    featured: true,
    published: true,
    sortOrder: 7,
  },
  {
    _id: "seed-8",
    name: "Monus Tayyab",
    slug: "monus-tayyab",
    niche: "Lifestyle & Entertainment",
    city: "Lahore",
    bio: "Monus combines lifestyle storytelling with entertainment-led content for brands seeking authentic creator collaborations.",
    specialties: ["Lifestyle", "Entertainment", "Brand Campaigns"],
    image: "/talents/talent-8.png",
    gallery: [],
    platforms: {
      instagram: "https://www.instagram.com/monus_tr/",
      youtube: "https://www.youtube.com/@monustayyab",
    },
    metrics: {
      instagram: { followers: 158000, engagementRate: 3.6 },
      youtube: { followers: 1340, engagementRate: 3.6 },
    },
    totalFollowers: 159340,
    engagementRate: 3.6,
    featured: true,
    published: true,
    sortOrder: 8,
  },
];

export const seedBrands: BrandData[] = [
  { _id: "brand-1", name: "Khair by Gauhar", logo: "/brands/khair-by-gauhar.png", sortOrder: 1, active: true },
  { _id: "brand-2", name: "LOOX", logo: "/brands/loox.png", sortOrder: 2, active: true },
  { _id: "brand-3", name: "Naya Zamaana", logo: "/brands/naya-zamaana.png", sortOrder: 3, active: true },
  { _id: "brand-4", name: "Pure IT", logo: "/brands/pure-it.png", sortOrder: 4, active: true },
  { _id: "brand-5", name: "SB Natural", logo: "/brands/sb-natural.png", sortOrder: 5, active: true },
  { _id: "brand-6", name: "Liven", logo: "/brands/liven.png", sortOrder: 6, active: true },
  { _id: "brand-7", name: "Rapho", logo: "/brands/rapho.png", sortOrder: 7, active: true },
  { _id: "brand-8", name: "Velvon Paris", logo: "/brands/velvon-paris.png", sortOrder: 8, active: true },
  { _id: "brand-9", name: "Bi", logo: "/brands/bi.png", sortOrder: 9, active: true },
  { _id: "brand-10", name: "Accu-Chek", logo: "/brands/accu-chek.png", sortOrder: 10, active: true },
  { _id: "brand-11", name: "Mega Thrift Store", logo: "/brands/mega-thrift-store.png", sortOrder: 11, active: true },
  { _id: "brand-12", name: "Skincare", logo: "/brands/skincare.png", sortOrder: 12, active: true },
  { _id: "brand-13", name: "Silo Scents", logo: "/brands/silo-scents.png", sortOrder: 13, active: true },
  { _id: "brand-14", name: "Olsey", logo: "/brands/olsey.png", sortOrder: 14, active: true },
  { _id: "brand-15", name: "Cosmo Medionique", logo: "/brands/cosmo-medionique.png", sortOrder: 15, active: true },
  { _id: "brand-16", name: "Galavya", logo: "/brands/galavya.png", sortOrder: 16, active: true },
  { _id: "brand-17", name: "Nixia Health Care", logo: "/brands/nixia-health-care.png", sortOrder: 17, active: true },
  { _id: "brand-18", name: "Cosmyst", logo: "/brands/cosmyst.png", sortOrder: 18, active: true },
  { _id: "brand-19", name: "Organic Sens", logo: "/brands/organic-sens.png", sortOrder: 19, active: true },
  { _id: "brand-20", name: "FW Organics", logo: "/brands/fworganics.png", sortOrder: 20, active: true },
  { _id: "brand-21", name: "Sparx", logo: "/brands/sparx.png", sortOrder: 21, active: true },
  { _id: "brand-22", name: "Herb Greek", logo: "/brands/herb-greek.png", sortOrder: 22, active: true },
  { _id: "brand-23", name: "Evrblush", logo: "/brands/evrblush.png", sortOrder: 23, active: true },
  { _id: "brand-24", name: "Mélange Fragrances", logo: "/brands/melange-fragrances.png", sortOrder: 24, active: true },
  { _id: "brand-25", name: "Eluma by H", logo: "/brands/eluma-by-h.png", sortOrder: 25, active: true },
  { _id: "brand-26", name: "Sensue", logo: "/brands/sensue.png", sortOrder: 26, active: true },
  { _id: "brand-27", name: "Propia", logo: "/brands/propia.png", sortOrder: 27, active: true },
  { _id: "brand-28", name: "Mubbis", logo: "/brands/mubbis.png", sortOrder: 28, active: true },
  { _id: "brand-29", name: "Z'Lenso", logo: "/brands/zlenso.png", sortOrder: 29, active: true },
  { _id: "brand-30", name: "Vasha Organics", logo: "/brands/vasha-organics.png", sortOrder: 30, active: true },
  { _id: "brand-31", name: "RO", logo: "/brands/ro.png", sortOrder: 31, active: true },
  { _id: "brand-32", name: "Shaigan Healthcare", logo: "/brands/shaigan-healthcare.png", sortOrder: 32, active: true },
  { _id: "brand-33", name: "Aromist", logo: "/brands/aromist.png", sortOrder: 33, active: true },
  { _id: "brand-34", name: "Momzee", logo: "/brands/momzee.png", sortOrder: 34, active: true },
  { _id: "brand-35", name: "Haniya Jibran", logo: "/brands/haniya-jibran.png", sortOrder: 35, active: true },
];

export const seedServices: ServiceData[] = [
  {
    _id: "svc-1",
    title: "Luxury Influencer Marketing",
    slug: "influencer-marketing",
    shortDescription:
      "Strategic creator partnerships that elevate your brand with culturally relevant, high-impact content.",
    description:
      "We connect premium brands with the right creators to deliver campaigns that feel authentic, aspirational, and measurable.",
    icon: "crown",
    benefits: [
      "Curated creator matching",
      "End-to-end campaign management",
      "Performance tracking & reporting",
    ],
    problems: [
      "Low-quality creator partnerships",
      "Inconsistent brand messaging",
      "Poor campaign ROI",
    ],
    deliverables: [
      "Creator shortlist & vetting",
      "Campaign strategy & briefs",
      "Content production oversight",
      "Performance analytics",
    ],
    process: [
      { step: "Discovery", description: "Understand brand goals and audience." },
      { step: "Curation", description: "Match creators by fit and quality." },
      { step: "Execution", description: "Manage production and publishing." },
      { step: "Analysis", description: "Report results and optimize." },
    ],
    idealClient: "Premium brands seeking authentic creator partnerships in Pakistan.",
    faqs: [
      {
        question: "What platforms do you cover?",
        answer: "Instagram, YouTube, and emerging platforms relevant to your audience.",
      },
    ],
    published: true,
    sortOrder: 1,
  },
  {
    _id: "svc-2",
    title: "Public Relations & Brand Positioning",
    slug: "public-relations",
    shortDescription:
      "Shape how the market perceives your brand through strategic PR, media relations, and narrative building.",
    description:
      "From press releases to media placements, we position your brand as a category leader.",
    icon: "megaphone",
    benefits: ["Media coverage", "Brand narrative", "Crisis management"],
    problems: ["Low brand visibility", "Weak media presence"],
    deliverables: ["PR strategy", "Press kits", "Media outreach", "Coverage reports"],
    process: [
      { step: "Audit", description: "Assess current brand perception." },
      { step: "Strategy", description: "Build PR narrative and plan." },
      { step: "Outreach", description: "Connect with media and influencers." },
      { step: "Amplify", description: "Maximize coverage impact." },
    ],
    idealClient: "Brands launching or repositioning in competitive markets.",
    faqs: [],
    published: true,
    sortOrder: 2,
  },
  {
    _id: "svc-3",
    title: "Talent Management",
    slug: "talent-management",
    shortDescription:
      "Full-service representation for creators seeking premium brand partnerships and career growth.",
    description:
      "We manage negotiations, contracts, and brand relationships so creators can focus on content.",
    icon: "users",
    benefits: ["Brand deal negotiation", "Career strategy", "Contract management"],
    problems: ["Missed opportunities", "Unfair deals", "Brand misalignment"],
    deliverables: ["Representation", "Deal sourcing", "Contract review", "Career planning"],
    process: [
      { step: "Onboarding", description: "Understand creator goals and brand." },
      { step: "Positioning", description: "Build creator media kit and rate card." },
      { step: "Sourcing", description: "Match with premium brand opportunities." },
      { step: "Management", description: "Handle negotiations and deliverables." },
    ],
    idealClient: "Established creators with 50K+ engaged followers.",
    faqs: [],
    published: true,
    sortOrder: 3,
  },
  {
    _id: "svc-4",
    title: "Brand Collaborations & Campaigns",
    slug: "brand-collaborations",
    shortDescription:
      "Multi-creator campaign orchestration for product launches, seasonal pushes, and brand activations.",
    description:
      "We design and execute collaborative campaigns that generate buzz and drive conversions.",
    icon: "handshake",
    benefits: ["Multi-creator coordination", "Unified messaging", "Scalable reach"],
    problems: ["Fragmented campaigns", "Inconsistent creative"],
    deliverables: ["Campaign concept", "Creator roster", "Content calendar", "Launch report"],
    process: [
      { step: "Concept", description: "Develop campaign creative direction." },
      { step: "Assembly", description: "Build the creator roster." },
      { step: "Production", description: "Coordinate content creation." },
      { step: "Launch", description: "Execute synchronized publishing." },
    ],
    idealClient: "Brands planning product launches or seasonal campaigns.",
    faqs: [],
    published: true,
    sortOrder: 4,
  },
  {
    _id: "svc-5",
    title: "Social Media Strategy & Content",
    slug: "social-media-marketing",
    shortDescription:
      "Data-driven social strategies and content frameworks that build lasting audience connection.",
    description:
      "From content pillars to posting cadence, we architect social presence that converts.",
    icon: "chart",
    benefits: ["Content strategy", "Platform optimization", "Audience growth"],
    problems: ["Inconsistent posting", "Low engagement", "No clear strategy"],
    deliverables: ["Strategy document", "Content calendar", "Creative guidelines", "Monthly reports"],
    process: [
      { step: "Audit", description: "Analyze current social performance." },
      { step: "Strategy", description: "Define pillars and content plan." },
      { step: "Creation", description: "Produce or guide content." },
      { step: "Optimize", description: "Iterate based on data." },
    ],
    idealClient: "Brands building or refreshing their social presence.",
    faqs: [],
    published: true,
    sortOrder: 5,
  },
  {
    _id: "svc-6",
    title: "Events, Launches & Activations",
    slug: "events-launches",
    shortDescription:
      "Immersive brand experiences amplified through creator attendance, live content, and PR coverage.",
    description:
      "We turn launches and events into cultural moments with creator integration and media buzz.",
    icon: "sparkles",
    benefits: ["Event PR", "Creator attendance", "Live content capture"],
    problems: ["Low event visibility", "Missed content opportunities"],
    deliverables: ["Event strategy", "Creator invitations", "Live coverage", "Post-event report"],
    process: [
      { step: "Planning", description: "Design event experience and goals." },
      { step: "Activation", description: "Integrate creators and media." },
      { step: "Coverage", description: "Capture and publish live content." },
      { step: "Follow-up", description: "Maximize post-event reach." },
    ],
    idealClient: "Brands hosting launches, pop-ups, or experiential events.",
    faqs: [],
    published: true,
    sortOrder: 6,
  },
];

export const seedPackages: PackageData[] = [
  {
    _id: "pkg-1",
    name: "Crystal Spark",
    slug: "crystal-spark",
    tagline: "Focused creator seeding for brands testing the waters.",
    description:
      "A strategic entry point for brands exploring influencer marketing with a curated selection of micro and mid-tier creators.",
    features: [
      "2–3 curated creators",
      "Campaign strategy brief",
      "Content approval workflow",
      "Basic performance report",
      "30-day campaign window",
    ],
    bestFor: "Small test campaigns and product seeding",
    featured: false,
    published: true,
    sortOrder: 1,
  },
  {
    _id: "pkg-2",
    name: "Signature Launch",
    slug: "signature-launch",
    tagline: "Multi-creator campaigns for product launches and activations.",
    description:
      "Our most popular package for brands ready to make a statement with coordinated multi-platform creator content.",
    features: [
      "5–8 curated creators",
      "Full campaign management",
      "Cross-platform content strategy",
      "PR & media outreach support",
      "Detailed analytics dashboard",
      "60-day campaign window",
    ],
    bestFor: "Product launches and brand activations",
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    _id: "pkg-3",
    name: "Elite Presence",
    slug: "elite-presence",
    tagline: "Ongoing PR, creator campaigns, and ambassador management.",
    description:
      "A comprehensive partnership for brands seeking sustained influence through ongoing creator relationships and PR.",
    features: [
      "Dedicated account manager",
      "Ongoing creator roster",
      "Monthly campaign cycles",
      "Brand ambassador program",
      "PR & media relations",
      "Quarterly strategy reviews",
      "Priority creator access",
    ],
    bestFor: "Long-term brand building and ambassador programs",
    featured: false,
    published: true,
    sortOrder: 3,
  },
];

export const seedTestimonials: TestimonialData[] = [
  {
    _id: "test-1",
    brandName: "Luxe Fashion Co.",
    reviewerName: "Sarah Ahmed",
    reviewerRole: "Marketing Director",
    rating: 5,
    review:
      "Crystal Media transformed our launch campaign. The creator selection was impeccable, and the content quality exceeded our expectations. True partners in every sense.",
    category: "Fashion Launch",
    featured: true,
    published: true,
    sortOrder: 1,
  },
  {
    _id: "test-2",
    brandName: "Glow Beauty",
    reviewerName: "Mariam Hassan",
    reviewerRole: "Brand Manager",
    rating: 5,
    review:
      "Working with Crystal Media felt like having an extension of our team. They understood our brand voice and matched us with creators who genuinely loved our products.",
    category: "Beauty Campaign",
    featured: true,
    published: true,
    sortOrder: 2,
  },
  {
    _id: "test-3",
    brandName: "TechNova",
    reviewerName: "Ali Raza",
    reviewerRole: "CEO",
    rating: 5,
    review:
      "The ROI on our influencer campaign was remarkable. Crystal Media's strategic approach and attention to detail set them apart from other agencies we've worked with.",
    category: "Tech Launch",
    featured: true,
    published: true,
    sortOrder: 3,
  },
  {
    _id: "test-4",
    brandName: "Urban Eats",
    reviewerName: "Nadia Khan",
    reviewerRole: "Head of Marketing",
    rating: 4,
    review:
      "From brief to execution, the process was seamless. Our food creators delivered content that drove real foot traffic to our locations.",
    category: "F&B Campaign",
    featured: false,
    published: true,
    sortOrder: 4,
  },
];

export const seedBlogPosts: BlogPostData[] = [
  {
    _id: "blog-1",
    title: "How Luxury Brands Should Choose Influencers in Pakistan",
    slug: "luxury-brands-choose-influencers-pakistan",
    excerpt:
      "The influencer landscape in Pakistan is evolving rapidly. Here's how premium brands can identify creators who truly align with their positioning.",
    content: `<h2>Understanding the Pakistani Creator Landscape</h2>
<p>Pakistan's influencer ecosystem has matured significantly, with creators across fashion, beauty, lifestyle, and entertainment commanding substantial engaged audiences. For luxury brands, the challenge isn't finding influencers — it's finding the right ones.</p>
<h2>Quality Over Quantity</h2>
<p>Follower count alone is a poor metric. Look for engagement rates above 3%, audience demographics that match your target market, and content aesthetics that align with your brand identity.</p>
<h2>Brand Fit Assessment</h2>
<p>Review a creator's past partnerships, content tone, and audience comments. The best partnerships feel organic because the creator genuinely resonates with the brand's values.</p>
<h2>Working with an Agency</h2>
<p>A specialized agency like Crystal Media vets creators for brand safety, audience authenticity, and partnership history — saving brands from costly mismatches.</p>`,
    category: "Strategy",
    author: "Crystal Media",
    readingTime: 6,
    published: true,
    featured: true,
    publishedAt: "2025-11-15T00:00:00.000Z",
  },
  {
    _id: "blog-2",
    title: "Micro vs Macro Influencers: Which Campaign Model Works Better?",
    slug: "micro-vs-macro-influencers",
    excerpt:
      "Should your brand invest in a few macro creators or distribute budget across micro-influencers? We break down the data.",
    content: `<h2>The Macro Advantage</h2>
<p>Macro influencers (500K+ followers) deliver massive reach and brand awareness. They're ideal for launch campaigns and establishing credibility quickly.</p>
<h2>The Micro Edge</h2>
<p>Micro-influencers (10K–100K) often achieve higher engagement rates and more authentic audience connections. They're perfect for niche products and community building.</p>
<h2>The Hybrid Approach</h2>
<p>The most effective campaigns often combine both — macro creators for reach and micro creators for engagement and conversion.</p>`,
    category: "Insights",
    author: "Crystal Media",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: "2025-10-28T00:00:00.000Z",
  },
  {
    _id: "blog-3",
    title: "Building Long-Term Creator Partnerships",
    slug: "building-long-term-creator-partnerships",
    excerpt:
      "One-off campaigns generate spikes. Long-term ambassador relationships build lasting brand equity. Here's how to structure them.",
    content: `<h2>Why Long-Term Matters</h2>
<p>Audiences recognize authentic brand-creator relationships. When a creator consistently partners with your brand, their endorsement carries more weight.</p>
<h2>Structuring Ambassador Programs</h2>
<p>Define clear expectations, compensation models, exclusivity terms, and content deliverables. Quarterly reviews keep partnerships aligned with evolving brand goals.</p>
<h2>Measuring Ambassador ROI</h2>
<p>Track not just reach and engagement, but brand sentiment, repeat purchase rates, and content reuse value over time.</p>`,
    category: "Strategy",
    author: "Crystal Media",
    readingTime: 7,
    published: true,
    featured: false,
    publishedAt: "2025-10-10T00:00:00.000Z",
  },
  {
    _id: "blog-4",
    title: "A Brand's Guide to Influencer Campaign Briefs",
    slug: "influencer-campaign-briefs-guide",
    excerpt:
      "A well-crafted brief is the foundation of every successful campaign. Learn what to include and what to leave open for creative freedom.",
    content: `<h2>Essential Brief Elements</h2>
<p>Every campaign brief should include brand background, campaign objectives, target audience, key messages, deliverables, timeline, and dos and don'ts.</p>
<h2>Balancing Control and Creativity</h2>
<p>The best briefs provide clear direction while leaving room for the creator's authentic voice. Overly restrictive briefs produce content that feels forced.</p>`,
    category: "Guides",
    author: "Crystal Media",
    readingTime: 5,
    published: true,
    featured: false,
    publishedAt: "2025-09-22T00:00:00.000Z",
  },
  {
    _id: "blog-5",
    title: "PR and Influencer Marketing: How They Work Together",
    slug: "pr-influencer-marketing-together",
    excerpt:
      "PR and influencer marketing aren't separate strategies — they're most powerful when integrated into a unified brand narrative.",
    content: `<h2>The Synergy Effect</h2>
<p>When PR placements and influencer content tell the same story, brand messaging becomes exponentially more credible and memorable.</p>
<h2>Integrated Campaign Planning</h2>
<p>Plan PR moments alongside creator content releases. A product launch backed by media coverage and creator unboxings creates a cultural moment.</p>`,
    category: "PR",
    author: "Crystal Media",
    readingTime: 4,
    published: true,
    featured: false,
    publishedAt: "2025-09-05T00:00:00.000Z",
  },
];

export const seedFAQs: FAQData[] = [
  {
    _id: "faq-1",
    question: "What type of brands does Crystal Media work with?",
    answer:
      "We partner with premium and aspirational brands across fashion, beauty, lifestyle, food, technology, fitness, and entertainment. Our focus is on brands that value quality creator partnerships over volume.",
    sortOrder: 1,
    published: true,
  },
  {
    _id: "faq-2",
    question: "How do you select influencers for a campaign?",
    answer:
      "We evaluate creators based on audience quality, engagement authenticity, brand alignment, content aesthetics, and reputation. Every creator in our roster is vetted for brand safety and partnership history.",
    sortOrder: 2,
    published: true,
  },
  {
    _id: "faq-3",
    question: "Can brands request a specific creator?",
    answer:
      "Absolutely. If you have a creator in mind, we'll assess fit and availability. If they're in our roster, we can facilitate the partnership directly.",
    sortOrder: 3,
    published: true,
  },
  {
    _id: "faq-4",
    question: "What does talent management include?",
    answer:
      "Our talent management covers brand deal sourcing, contract negotiation, rate card development, media kit creation, career strategy, and ongoing brand relationship management.",
    sortOrder: 4,
    published: true,
  },
  {
    _id: "faq-5",
    question: "How long does a campaign take?",
    answer:
      "Typical campaigns run 4–8 weeks from brief to final reporting. Signature launches may take 8–12 weeks. Elite Presence programs operate on ongoing monthly cycles.",
    sortOrder: 5,
    published: true,
  },
  {
    _id: "faq-6",
    question: "Do you work outside Lahore and Karachi?",
    answer:
      "Yes. While our primary presence is in Lahore and Karachi, we work with creators and brands across Pakistan including Islamabad, and can coordinate campaigns nationally.",
    sortOrder: 6,
    published: true,
  },
  {
    _id: "faq-7",
    question: "Do you offer PR and event-launch support?",
    answer:
      "Yes. Our Events, Launches & Activations service includes PR outreach, creator attendance, live content capture, and post-event amplification.",
    sortOrder: 7,
    published: true,
  },
  {
    _id: "faq-8",
    question: "How can a creator apply for representation?",
    answer:
      "Creators can apply through our Contact page by selecting the Creator Application form. We review applications based on content quality, audience engagement, and brand partnership potential.",
    sortOrder: 8,
    published: true,
  },
];

export const seedSettings: SiteSettingsData = {
  siteName: "Crystal Media",
  tagline: "Luxury Influencer Marketing & PR Agency",
  description:
    "Crystal Media connects premium brands with culturally relevant creators through strategy-led public relations, talent management, and high-impact influencer campaigns across Pakistan.",
  contactEmail: "crystalmediacollaborative5@gmail.com",
  receiverEmail: "crystalmediacollaborative5@gmail.com",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923162981050",
  phone: "+92 316 2981050",
  instagramUrl:
    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
    "https://www.instagram.com/crystal_media.pk/",
  facebookUrl:
    process.env.NEXT_PUBLIC_FACEBOOK_URL ||
    "https://www.facebook.com/share/1PUeHYiJMA/?mibextid=wwXIfr",
  linkedinUrl: process.env.NEXT_PUBLIC_LINKEDIN_URL || "",
  locationLahore: "Lahore, Pakistan",
  locationKarachi: "Karachi, Pakistan",
  businessHours: "Mon – Sat, 10:00 AM – 7:00 PM PKT",
  responseTime: "We respond within 24–48 business hours.",
  stats: {
    campaignsDelivered: 500,
    creatorsRepresented: 100,
    combinedAudienceReach: 30,
    repeatBrandPartnerships: 70,
  },
  defaultSeoTitle:
    "Crystal Media | Luxury Influencer Marketing & PR Agency Pakistan",
  defaultSeoDescription:
    "Crystal Media is Pakistan's premium influencer marketing and PR agency. Luxury campaigns, talent management, and brand collaborations in Lahore and Karachi.",
};

export const keywordTicker = [
  "Luxury Influencer Marketing",
  "Public Relations",
  "Premium Brand Campaigns",
  "Talent Management",
  "Brand Collaborations",
  "Content Creators",
  "Instagram Campaigns",
  "YouTube Strategy",
  "UGC Production",
  "Lahore",
  "Karachi",
  "Pakistan",
  "Celebrity Collaborations",
  "Brand Positioning",
];

export const locationServices = [
  {
    slug: "pakistan",
    title: "Influencer Marketing Pakistan",
    city: "Pakistan",
    description:
      "Nationwide influencer marketing and PR services connecting premium brands with top creators across Pakistan.",
  },
  {
    slug: "lahore",
    title: "Influencer Marketing Lahore",
    city: "Lahore",
    description:
      "Lahore's leading luxury influencer marketing agency. Local creator expertise with national campaign reach.",
  },
  {
    slug: "karachi",
    title: "Influencer Marketing Karachi",
    city: "Karachi",
    description:
      "Karachi-based premium influencer campaigns and talent management for brands that demand excellence.",
  },
  {
    slug: "islamabad",
    title: "Influencer Marketing Islamabad",
    city: "Islamabad",
    description:
      "Strategic influencer marketing services for brands in Islamabad and the capital region.",
  },
];
