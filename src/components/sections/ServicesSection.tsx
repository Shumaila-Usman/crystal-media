import { getServices } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCardsGrid } from "@/components/services/ServiceCardsGrid";

export async function ServicesSection() {
  const services = await getServices();

  return (
    <section className="section-padding bg-soft-lavender text-ink-black">
      <div className="container-xl">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold max-w-3xl mb-10 sm:mb-12 leading-tight">
            Everything your brand needs to become unforgettable.
          </h2>
        </Reveal>

        <ServiceCardsGrid services={services} />
      </div>
    </section>
  );
}
