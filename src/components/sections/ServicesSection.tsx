import Link from "next/link";
import { getServices } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCardsGrid } from "@/components/services/ServiceCardsGrid";
import { ArrowRight } from "lucide-react";

export async function ServicesSection() {
  const services = await getServices();

  return (
    <section className="section-padding bg-soft-lavender text-ink-black">
      <div className="container-xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] uppercase text-royal-violet">
                What we do
              </p>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-tight">
                Everything your brand needs to become unforgettable.
              </h2>
              <p className="mt-4 max-w-2xl leading-relaxed text-ink-black/55">
                From influencer campaigns and talent management to PR and social
                strategy — one agency for premium creator partnerships in Pakistan.
              </p>
            </div>
            <Link
              href="/services"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full border border-ink-black/10 bg-white px-6 py-3.5 text-sm font-semibold text-ink-black transition-all hover:border-royal-violet/30 hover:shadow-[0_8px_28px_rgba(115,37,139,0.12)] min-h-[48px] w-full sm:w-auto"
            >
              View all services
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <ServiceCardsGrid services={services} />
      </div>
    </section>
  );
}
