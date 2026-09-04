import Link from "next/link";
import {
  Crown,
  Megaphone,
  Users,
  Handshake,
  BarChart3,
  Sparkles,
} from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import type { ServiceData } from "@/types";

const iconMap: Record<string, React.ReactNode> = {
  crown: <Crown size={24} />,
  megaphone: <Megaphone size={24} />,
  users: <Users size={24} />,
  handshake: <Handshake size={24} />,
  chart: <BarChart3 size={24} />,
  sparkles: <Sparkles size={24} />,
};

interface ServiceCardsGridProps {
  services: ServiceData[];
  className?: string;
}

export function ServiceCardsGrid({ services, className }: ServiceCardsGridProps) {
  return (
    <StaggerContainer
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch ${className ?? ""}`}
    >
      {services.map((service) => (
        <StaggerItem key={service.slug} className="h-full">
          <Link
            href={`/services/${service.slug}`}
            className="group flex h-full min-h-[220px] flex-col p-6 rounded-[24px] border border-ink-black/5 bg-white hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)] transition-all duration-500 hover:-translate-y-1"
          >
            <div className="mb-4 flex h-12 w-12 shrink-0 items-center justify-center rounded-[14px] bg-gradient-to-br from-royal-violet/15 to-crystal-magenta/15 text-electric-purple">
              {iconMap[service.icon] || <Sparkles size={24} />}
            </div>
            <h3 className="font-display text-lg font-bold mb-2 min-h-[3.25rem] line-clamp-2 group-hover:text-royal-violet transition-colors">
              {service.title}
            </h3>
            <p className="text-ink-black/60 text-sm leading-relaxed flex-1">
              {service.shortDescription}
            </p>
          </Link>
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
