import { getTestimonials } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Star } from "lucide-react";

export const metadata = buildMetadata({
  title: "Testimonials | Crystal Media",
  description:
    "Read what brands and partners say about working with Crystal Media on influencer marketing and PR campaigns across Pakistan.",
  path: "/testimonials",
});

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-amber-glow fill-amber-glow" : "text-white/20"}
        />
      ))}
    </div>
  );
}

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials();

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Client Stories
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Loved by brands.{" "}
              <span className="gradient-text">Trusted by talent.</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              Hear from the brands and partners who&apos;ve experienced the Crystal
              Media difference — from campaign strategy to flawless execution.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t) => (
              <StaggerItem key={t._id}>
                <article className="p-8 rounded-[24px] bg-white border border-ink-black/5 hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)] transition-all duration-500 h-full flex flex-col">
                  <StarRating rating={t.rating} />
                  <blockquote className="font-display text-lg font-medium leading-relaxed mt-5 mb-6 flex-1">
                    &ldquo;{t.review}&rdquo;
                  </blockquote>
                  <div>
                    <p className="font-semibold">{t.reviewerName}</p>
                    <p className="text-ink-black/50 text-sm">
                      {t.reviewerRole}, {t.brandName}
                    </p>
                    {t.category && (
                      <span className="inline-block mt-3 px-3 py-1 text-xs bg-royal-violet/10 text-royal-violet rounded-full">
                        {t.category}
                      </span>
                    )}
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
