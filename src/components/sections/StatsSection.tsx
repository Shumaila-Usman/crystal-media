import { getSiteSettings } from "@/lib/data";
import { Reveal, AnimatedCounter } from "@/components/motion/Reveal";

export async function StatsSection() {
  const settings = await getSiteSettings();
  const stats = settings.stats;

  const items = [
    { label: "Campaigns Delivered", value: stats.campaignsDelivered },
    { label: "Creators Represented", value: stats.creatorsRepresented },
    { label: "Combined Audience Reach", value: stats.combinedAudienceReach, suffix: "+" },
    { label: "Repeat Brand Partnerships", value: stats.repeatBrandPartnerships, suffix: "%" },
  ].filter((item) => item.value && item.value > 0);

  if (items.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, #13091C 0%, #260D30 50%, #4E204A 100%)",
        }}
      />
      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="text-center px-2">
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter
                    value={item.value!}
                    suffix={item.suffix || "+"}
                  />
                </p>
                <p className="text-muted-text text-sm">{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
