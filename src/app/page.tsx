import { HeroSection } from "@/components/sections/HeroSection";
import { CampaignFormSection } from "@/components/sections/CampaignFormSection";
import { KeywordTicker } from "@/components/sections/KeywordTicker";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { FeaturedTalentSection } from "@/components/sections/FeaturedTalentSection";
import { BrandMarqueeSection } from "@/components/sections/BrandMarqueeSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { TestimonialsCarousel } from "@/components/sections/TestimonialsCarousel";
import { BlogPreviewSection } from "@/components/sections/BlogPreviewSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { getSiteSettings, getTestimonials, getFAQs } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Crystal Media | Luxury Influencer Marketing & PR Agency Pakistan",
  description:
    "Crystal Media connects premium brands with culturally relevant creators through strategy-led PR, talent management, and high-impact influencer campaigns across Pakistan.",
  path: "/",
});

export default async function HomePage() {
  const [settings, testimonials, faqs] = await Promise.all([
    getSiteSettings(),
    getTestimonials(true),
    getFAQs(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <CampaignFormSection />
      <KeywordTicker />
      <ServicesSection />
      <FeaturedTalentSection />
      <BrandMarqueeSection />
      <ProcessSection />
      <StatsSection />
      <TestimonialsCarousel testimonials={testimonials} />
      <BlogPreviewSection />
      <FAQSection faqs={faqs} />
      <CTASection />
    </>
  );
}
