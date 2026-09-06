import Link from "next/link";
import { getTalents } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { TalentCard } from "@/components/talent/TalentCard";
import { ArrowRight } from "lucide-react";

export async function FeaturedTalentSection() {
  const { talents } = await getTalents({ featured: true, limit: 6 });

  return (
    <section className="section-padding bg-pearl-white text-ink-black">
      <div className="container-xl">
        <Reveal>
          <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-3 text-xs font-semibold tracking-[0.25em] uppercase text-royal-violet">
                Our Roster
              </p>
              <h2 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                Hire{" "}
                <span className="gradient-text">influencers</span>
              </h2>
              <p className="mt-4 leading-relaxed text-ink-black/55">
                Micro influencers and managed creators across Pakistan —
                Instagram &amp; YouTube talent ready for brand deals and social
                media campaigns.
              </p>
            </div>
            <Link
              href="/talents"
              className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-full px-6 py-3.5 text-sm font-semibold text-pearl-white transition-all hover:shadow-[0_8px_28px_rgba(115,37,139,0.35)] min-h-[48px] w-full sm:w-auto"
              style={{
                background:
                  "linear-gradient(135deg, #73258B 0%, #A33AD1 50%, #E54699 100%)",
              }}
            >
              View All Talents
              <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-5 min-[400px]:grid-cols-2 lg:grid-cols-3">
          {talents.map((talent) => (
            <TalentCard key={talent.slug} talent={talent} />
          ))}
        </div>
      </div>
    </section>
  );
}
