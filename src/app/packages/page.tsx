import Link from "next/link";
import { getPackages } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/shared/Button";
import { Check, Sparkles } from "lucide-react";

export const metadata = buildMetadata({
  title: "Campaign Packages | Crystal Media",
  description:
    "Choose from Crystal Spark, Signature Launch, or Elite Presence — curated influencer marketing packages for brands at every stage.",
  path: "/packages",
});

export default async function PackagesPage() {
  const packages = await getPackages();

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="absolute top-1/4 right-1/3 w-96 h-96 rounded-full bg-electric-purple/10 blur-[120px] aurora-blob" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Campaign Packages
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Packages built for{" "}
              <span className="gradient-text">every ambition</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              From focused creator seeding to full-scale ambassador programs — choose
              the package that matches your brand&apos;s goals and budget.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl">
          <StaggerContainer className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {packages.map((pkg) => (
              <StaggerItem key={pkg.slug}>
                <div
                  className={`relative flex flex-col h-full p-5 sm:p-8 rounded-[20px] sm:rounded-[24px] border transition-all duration-500 hover:-translate-y-1 ${
                    pkg.featured
                      ? "border-royal-violet/30 bg-gradient-to-b from-royal-violet/5 to-white shadow-[0_20px_60px_rgba(78,32,74,0.12)]"
                      : "border-ink-black/5 bg-white hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)]"
                  }`}
                >
                  {pkg.featured && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-4 py-1 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-royal-violet to-crystal-magenta text-pearl-white rounded-full">
                      <Sparkles size={12} />
                      Most Popular
                    </span>
                  )}

                  <div className="mb-6">
                    <h2 className="font-display text-2xl font-bold mb-2">
                      {pkg.name}
                    </h2>
                    <p className="text-ink-black/60 text-sm leading-relaxed">
                      {pkg.tagline}
                    </p>
                  </div>

                  <p className="text-ink-black/70 text-sm leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <ul className="space-y-3 mb-8 flex-1">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm">
                        <Check
                          size={16}
                          className="text-royal-violet shrink-0 mt-0.5"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-4 border-t border-ink-black/5">
                    <p className="text-xs text-ink-black/40 uppercase tracking-wide mb-1">
                      Best for
                    </p>
                    <p className="text-sm font-medium mb-6">{pkg.bestFor}</p>
                    <Link href="/contact" className="block">
                      <Button
                        className="w-full"
                        variant={pkg.featured ? "primary" : "lightOutline"}
                      >
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <CTASection />
    </>
  );
}
