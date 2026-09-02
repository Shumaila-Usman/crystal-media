import Link from "next/link";
import { getServices } from "@/lib/data";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { ArrowUpRight, Crown, Megaphone, Users, Handshake, BarChart3, Sparkles } from "lucide-react";

const iconMap: Record<string, React.ReactNode> = {
  crown: <Crown size={24} />,
  megaphone: <Megaphone size={24} />,
  users: <Users size={24} />,
  handshake: <Handshake size={24} />,
  chart: <BarChart3 size={24} />,
  sparkles: <Sparkles size={24} />,
};

export async function ServicesSection() {
  const services = await getServices();

  return (
    <section className="section-padding bg-pearl-white text-ink-black">
      <div className="container-xl">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold max-w-2xl mb-16">
            Everything your brand needs to become unforgettable.
          </h2>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, i) => (
            <StaggerItem key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className={`group relative block p-8 rounded-[24px] border border-ink-black/5 bg-white hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)] transition-all duration-500 hover:-translate-y-1 ${
                  i === 0 ? "md:col-span-2 lg:col-span-1 lg:row-span-1" : ""
                }`}
              >
                <div className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "linear-gradient(135deg, rgba(90,28,104,0.03), rgba(229,70,153,0.03))" }}
                />
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-royal-violet/10 to-crystal-magenta/10 flex items-center justify-center text-royal-violet mb-5">
                    {iconMap[service.icon] || <Sparkles size={24} />}
                  </div>
                  <h3 className="font-display text-xl font-bold mb-3 group-hover:text-royal-violet transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-ink-black/60 text-sm leading-relaxed mb-4">
                    {service.shortDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-medium text-royal-violet opacity-0 group-hover:opacity-100 transition-opacity">
                    Learn more <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
