import { getBrands } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";

export async function BrandMarqueeSection() {
  const brands = await getBrands();
  const row1 = [...brands, ...brands];
  const row2 = [...brands.slice().reverse(), ...brands.slice().reverse()];

  return (
    <section className="section-padding bg-soft-lavender text-ink-black overflow-hidden">
      <div className="container-xl relative z-20 mb-12 sm:mb-16">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-royal-violet mb-4 text-center">
            Brand Partners
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-center leading-tight">
            Trusted by leading brands
          </h2>
          <p className="text-ink-black/60 text-center max-w-2xl mx-auto mt-4 leading-relaxed">
            From beauty giants to tech disruptors — brands choose Crystal Media
            to connect with creators who drive real results.
          </p>
        </Reveal>
      </div>

      {brands.length === 0 ? (
        <div className="container-xl">
          <p className="text-center text-ink-black/40 text-sm py-8">
            No brands yet — add them from the dashboard.
          </p>
        </div>
      ) : (
        <div className="relative z-10 mt-2 space-y-6">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-soft-lavender to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-soft-lavender to-transparent z-10 pointer-events-none" />

          <div className="marquee-track">
            {row1.map((brand, i) => (
              <div
                key={`r1-${brand._id}-${i}`}
                className="flex items-center justify-center mx-8 px-8 py-4 min-w-[180px] h-20 rounded-[18px] border border-ink-black/5 bg-white/60 hover:bg-white transition-all duration-300 group"
              >
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="max-h-10 max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                  <span className="font-display font-semibold text-ink-black/40 group-hover:text-royal-violet transition-colors text-sm tracking-wide">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="marquee-track marquee-track-reverse">
            {row2.map((brand, i) => (
              <div
                key={`r2-${brand._id}-${i}`}
                className="flex items-center justify-center mx-8 px-8 py-4 min-w-[180px] h-20 rounded-[18px] border border-ink-black/5 bg-white/60 hover:bg-white transition-all duration-300 group"
              >
                {brand.logo ? (
                  <img src={brand.logo} alt={brand.name} className="max-h-10 max-w-[120px] object-contain grayscale group-hover:grayscale-0 transition-all" />
                ) : (
                  <span className="font-display font-semibold text-ink-black/40 group-hover:text-royal-violet transition-colors text-sm tracking-wide">
                    {brand.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
