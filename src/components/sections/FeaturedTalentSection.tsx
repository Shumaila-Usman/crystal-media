import Link from "next/link";
import { getTalents } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { TalentCard } from "@/components/talent/TalentCard";
import { Button } from "@/components/shared/Button";
import { ArrowRight } from "lucide-react";

export async function FeaturedTalentSection() {
  const { talents } = await getTalents({ featured: true, limit: 8 });

  return (
    <section className="section-padding bg-ink-black relative overflow-hidden">
      <div className="absolute inset-0" style={{ background: "var(--gradient-dark)" }} />
      <div className="container-xl relative z-10">
        <Reveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                Meet the faces shaping culture.
              </h2>
              <p className="text-muted-text max-w-xl leading-relaxed">
                Crystal Media represents and works with creators across fashion, beauty, lifestyle, food, travel, technology, fitness, and entertainment.
              </p>
            </div>
            <Link href="/talents">
              <Button variant="secondary" icon={<ArrowRight size={16} />}>
                View All Talent
              </Button>
            </Link>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {talents.map((talent, i) => (
            <div
              key={talent.slug}
              className={i === 0 ? "sm:row-span-1" : ""}
            >
              <TalentCard talent={talent} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
