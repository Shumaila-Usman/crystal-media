import { Suspense } from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { KeywordTicker } from "@/components/sections/KeywordTicker";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedTalentSection } from "@/components/sections/FeaturedTalentSection";
import { BrandMarqueeSection } from "@/components/sections/BrandMarqueeSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import {
  getSiteSettings,
  getTestimonials,
  getFAQs,
  resolveTalentQuery,
} from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crystal Media | Social Media & Influencer Marketing Agency Pakistan",
  description:
    "Crystal Media is a social media and influencer marketing agency in Pakistan — brand deals, creator campaigns, and talent management built for measurable results.",
  path: "/",
});

function HeroSkeleton() {
  return (
    <div className="min-h-[70vh] bg-ink-black pt-32 pb-16">
      <div className="container-xl grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4 animate-pulse">
          <div className="h-4 w-48 rounded bg-white/10" />
          <div className="h-12 w-full max-w-md rounded bg-white/10" />
          <div className="h-20 w-full max-w-sm rounded bg-white/10" />
        </div>
        <div className="h-[520px] rounded-[24px] bg-white/5 animate-pulse" />
      </div>
    </div>
  );
}

interface HomePageProps {
  searchParams: Promise<{ creator?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { creator } = await searchParams;
  const [settings, testimonials, faqs, selectedTalent] = await Promise.all([
    getSiteSettings(),
    getTestimonials(true),
    getFAQs(),
    creator ? resolveTalentQuery(creator) : Promise.resolve(null),
  ]);

  return (
    <>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroSection
          whatsappNumber={settings.whatsappNumber}
          creatorSlug={selectedTalent?.slug}
          creatorName={selectedTalent?.name}
        />
      </Suspense>
      <KeywordTicker />
      <ServicesSection />
      <FeaturedTalentSection />
      <BrandMarqueeSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsCarousel testimonials={testimonials} />
      <BlogPreviewSection />
      <FAQSection faqs={faqs} />
    </>
  );
}
