import { Suspense } from "react";
import { getTalents } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { TalentDirectory } from "@/components/talent/TalentDirectory";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = buildMetadata({
  title: "Talent Directory | Crystal Media",
  description:
    "Browse Crystal Media's roster of premium creators across fashion, beauty, fitness, food, tech, and entertainment in Pakistan.",
  path: "/talents",
});

function DirectorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="rounded-[24px] overflow-hidden glass-card animate-pulse">
          <div className="bg-white/5" style={{ aspectRatio: "4/5" }} />
        </div>
      ))}
    </div>
  );
}

export default async function TalentsPage() {
  const { talents, total } = await getTalents({ limit: 12 });

  return (
    <>
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-electric-purple/10 blur-[100px] aurora-blob" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Talent Roster
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Meet our <span className="gradient-text">creators</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              Discover vetted creators with engaged audiences across Pakistan&apos;s
              most influential niches — fashion, beauty, fitness, food, tech, and more.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-ink-black">
        <div className="container-xl">
          <Suspense fallback={<DirectorySkeleton />}>
            <TalentDirectory
              initialTalents={talents}
              initialTotal={total}
            />
          </Suspense>
        </div>
      </section>

      <CTASection />
    </>
  );
}
