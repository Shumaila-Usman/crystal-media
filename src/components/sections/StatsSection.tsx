import { getSiteSettings } from "@/lib/data";
import { Reveal, AnimatedCounter } from "@/components/motion/Reveal";

export async function StatsSection() {
  const settings = await getSiteSettings();
  const stats = settings.stats;

  const items = [
    { label: "Brand Deals Closed", value: stats.campaignsDelivered ?? 0 },
    { label: "Creators Managed", value: stats.creatorsRepresented ?? 0 },
    {
      label: "Total Reach Delivered",
      value: stats.combinedAudienceReach ?? 0,
      suffix: "M+",
    },
    {
      label: "Client Retention Rate",
      value: stats.repeatBrandPartnerships ?? 0,
      suffix: "%",
    },
  ];

  return (
    <section className="section-padding bg-midnight-plum border-y border-white/5">
      <div className="container-xl">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="text-center px-2">
                <p className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  <AnimatedCounter
                    value={item.value}
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
