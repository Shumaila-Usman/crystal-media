import { Suspense } from "react";
import { getTalents } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { TalentDirectory } from "@/components/talent/TalentDirectory";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = buildMetadata({
  title: "Hire Influencers in Pakistan | Crystal Media",
  description:
    "Hire managed influencers for brand deals and campaigns — filtered by niche, audience size, and platform across Pakistan.",
  path: "/talents",
});

function DirectorySkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {Array.from({ length: 8 }).map((_, i) => (
    <div className="rounded-[20px] overflow-hidden border border-ink-black/[0.06] bg-white animate-pulse">
      <div className="bg-ink-black/5" style={{ aspectRatio: "4/5" }} />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-ink-black/5" />
        <div className="h-4 w-1/3 rounded bg-ink-black/5" />
      </div>
    </div>
      ))}
    </div>
  );
}

export default async function TalentsPage() {
  const { talents, total } = await getTalents({ limit: 100 });

  return (
    <>
      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-electric-purple/10 blur-[100px] aurora-blob" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Influencer Talent Roster
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Instagram &amp;{" "}
              <span className="gradient-text">YouTube creators</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              Hire managed influencers for brand deals and campaigns — filtered by
              niche, audience size, and platform. Every creator is vetted,
              represented, and campaign-ready across Pakistan and beyond.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
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
