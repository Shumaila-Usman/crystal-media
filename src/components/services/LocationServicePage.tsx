import Link from "next/link";
import { notFound } from "next/navigation";
import { locationServices } from "@/data/seed";
import { getServices } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { ServiceCardsGrid } from "@/components/services/ServiceCardsGrid";
import { CTASection } from "@/components/sections/CTASection";
import { Button } from "@/components/shared/Button";
import { ChevronRight, MapPin } from "lucide-react";
import type { Metadata } from "next";

interface LocationServicePageProps {
  slug: string;
}

function getLocation(slug: string) {
  return locationServices.find((l) => l.slug === slug);
}

export async function generateLocationMetadata(slug: string): Promise<Metadata> {
  const location = getLocation(slug);
  if (!location) return {};

  return buildMetadata({
    title: `${location.title} | Crystal Media`,
    description: location.description,
    path: `/services/${location.slug}`,
  });
}

export async function LocationServicePage({ slug }: LocationServicePageProps) {
  const location = getLocation(slug);
  if (!location) notFound();

  const services = await getServices();
  const otherLocations = locationServices.filter((l) => l.slug !== slug);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: location.title, url: `${SITE_URL}/services/${location.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-crystal-magenta/10 blur-[120px] aurora-blob" />
        <div className="container-xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-text mb-8">
            <Link href="/" className="hover:text-pearl-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} />
            <Link href="/services" className="hover:text-pearl-white transition-colors">
              Services
            </Link>
            <ChevronRight size={14} />
            <span className="text-pearl-white">{location.city}</span>
          </nav>

          <Reveal>
            <div className="flex items-center gap-3 mb-4">
              <MapPin className="text-electric-purple" size={20} />
              <span className="text-electric-purple text-sm font-medium tracking-widest uppercase">
                {location.city}
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              {location.title.split(" ").slice(0, -1).join(" ")}{" "}
              <span className="gradient-text">
                {location.title.split(" ").slice(-1)}
              </span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed mb-8">
              {location.description}
            </p>
            <Link href="/contact">
              <Button size="lg">Start a Campaign in {location.city}</Button>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              Premium services in {location.city}
            </h2>
            <p className="text-ink-black/60 max-w-2xl mb-12">
              Crystal Media delivers the full suite of influencer marketing, PR, and
              talent management services tailored for brands in {location.city} and
              beyond.
            </p>
          </Reveal>

          <ServiceCardsGrid services={services} />
        </div>
      </section>

      <section className="section-padding bg-ink-black">
        <div className="container-xl">
          <Reveal>
            <h2 className="font-display text-2xl font-bold mb-6">
              Other locations
            </h2>
            <div className="flex flex-wrap gap-3">
              {otherLocations.map((loc) => (
                <Link
                  key={loc.slug}
                  href={`/services/${loc.slug}`}
                  className="px-5 py-2.5 glass-card rounded-full text-sm font-medium hover:border-electric-purple/30 transition-colors"
                >
                  {loc.city}
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
