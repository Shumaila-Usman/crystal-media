import { getBrands } from "@/lib/data";
import type { BrandData } from "@/types";
import { Reveal } from "@/components/motion/Reveal";

function BrandPill({ brand }: { brand: BrandData }) {
  return (
    <div className="mx-2.5 inline-flex shrink-0 items-center gap-3 rounded-full border border-ink-black/10 bg-white px-4 py-2.5 shadow-[0_1px_4px_rgba(0,0,0,0.04)] sm:mx-3 sm:px-5 sm:py-3">
      <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink-black/[0.06] bg-white sm:h-10 sm:w-10">
        {brand.logo ? (
          <img
            src={brand.logo}
            alt=""
            className="h-full w-full object-contain p-1"
          />
        ) : (
          <span className="text-xs font-bold text-royal-violet">
            {brand.name.charAt(0)}
          </span>
        )}
      </span>
      <span className="whitespace-nowrap pr-1 text-sm font-medium text-ink-black sm:text-[15px]">
        {brand.name}
      </span>
    </div>
  );
}

export async function BrandMarqueeSection() {
  const brands = await getBrands();
  const marqueeBrands = [...brands, ...brands];

  return (
    <section className="section-padding overflow-hidden bg-soft-lavender text-ink-black">
      <div className="container-xl relative z-20 mb-10 sm:mb-12">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-bold text-center leading-tight text-royal-violet">
            Brands
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-sm leading-relaxed text-ink-black/60 sm:text-base">
            From beauty giants to tech disruptors — brands choose Crystal Media
            to connect with creators who drive real results.
          </p>
        </Reveal>
      </div>

      {brands.length === 0 ? (
        <div className="container-xl">
          <p className="py-8 text-center text-sm text-ink-black/40">
            No brands yet — add them from the dashboard.
          </p>
        </div>
      ) : (
        <div className="relative z-10 space-y-4 sm:space-y-5">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-16 bg-gradient-to-r from-soft-lavender to-transparent sm:w-24" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-16 bg-gradient-to-l from-soft-lavender to-transparent sm:w-24" />

          <div className="marquee-track marquee-track-slow py-1">
            {marqueeBrands.map((brand, i) => (
              <BrandPill key={`r1-${brand._id ?? brand.name}-${i}`} brand={brand} />
            ))}
          </div>

          <div className="marquee-track marquee-track-reverse marquee-track-slow py-1">
            {marqueeBrands.map((brand, i) => (
              <BrandPill key={`r2-${brand._id ?? brand.name}-${i}`} brand={brand} />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
