import Link from "next/link";
import { getServices } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import {
  ArrowUpRight,
  Crown,
  Megaphone,
  Users,
  Handshake,
  BarChart3,
  Sparkles,
  MapPin,
} from "lucide-react";

export const metadata = buildMetadata({
  title: "Services | Crystal Media",
  description:
    "Luxury influencer marketing, PR, talent management, brand collaborations, social media strategy, and event activations across Pakistan.",
  path: "/services",
});

const iconMap: Record<string, React.ReactNode> = {
  crown: <Crown size={24} />,
  megaphone: <Megaphone size={24} />,
  users: <Users size={24} />,
  handshake: <Handshake size={24} />,
  chart: <BarChart3 size={24} />,
  sparkles: <Sparkles size={24} />,
};

const locations = [
  { href: "/services/pakistan", label: "Pakistan" },
  { href: "/services/lahore", label: "Lahore" },
  { href: "/services/karachi", label: "Karachi" },
  { href: "/services/islamabad", label: "Islamabad" },
];

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-electric-purple/10 blur-[120px] aurora-blob" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Our Services
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Strategy-led influence for{" "}
              <span className="gradient-text">premium brands</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              From creator curation to PR amplification, we deliver end-to-end
              campaigns that elevate your brand across Pakistan&apos;s most engaged
              audiences.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((service) => (
              <StaggerItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="group relative block p-8 rounded-[24px] border border-ink-black/5 bg-white hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)] transition-all duration-500 hover:-translate-y-1 h-full"
                >
                  <div
                    className="absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(90,28,104,0.03), rgba(229,70,153,0.03))",
                    }}
                  />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-[14px] bg-gradient-to-br from-royal-violet/10 to-crystal-magenta/10 flex items-center justify-center text-royal-violet mb-5">
                      {iconMap[service.icon] || <Sparkles size={24} />}
                    </div>
                    <h2 className="font-display text-xl font-bold mb-3 group-hover:text-royal-violet transition-colors">
                      {service.title}
                    </h2>
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

      <section className="section-padding bg-ink-black">
        <div className="container-xl">
          <Reveal>
            <div className="flex items-center gap-3 mb-8">
              <MapPin className="text-electric-purple" size={20} />
              <h2 className="font-display text-2xl sm:text-3xl font-bold">
                Services by location
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              {locations.map((loc) => (
                <Link
                  key={loc.href}
                  href={loc.href}
                  className="px-5 py-2.5 glass-card rounded-full text-sm font-medium hover:border-electric-purple/30 transition-colors"
                >
                  {loc.label}
                </Link>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
