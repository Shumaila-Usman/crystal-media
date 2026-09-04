import Link from "next/link";
import { notFound } from "next/navigation";
import { getServiceBySlug, getServices } from "@/lib/data";
import {
  buildMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  SITE_URL,
} from "@/lib/seo";
import { Reveal, StaggerContainer, StaggerItem } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { FAQSection } from "@/components/sections/FAQSection";
import { Button } from "@/components/shared/Button";
import {
  Crown,
  Megaphone,
  Users,
  Handshake,
  BarChart3,
  Sparkles,
  CheckCircle,
  AlertTriangle,
  Package,
  ChevronRight,
} from "lucide-react";
import type { Metadata } from "next";

const iconMap: Record<string, React.ReactNode> = {
  crown: <Crown size={28} />,
  megaphone: <Megaphone size={28} />,
  users: <Users size={28} />,
  handshake: <Handshake size={28} />,
  chart: <BarChart3 size={28} />,
  sparkles: <Sparkles size={28} />,
};

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.seoTitle || `${service.title} | Crystal Media`,
    description: service.seoDescription || service.shortDescription,
    path: `/services/${service.slug}`,
  });
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Services", url: `${SITE_URL}/services` },
    { name: service.title, url: `${SITE_URL}/services/${service.slug}` },
  ];

  const faqItems = service.faqs.map((f) => ({
    _id: f.question,
    question: f.question,
    answer: f.answer,
    sortOrder: 0,
    published: true,
  }));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      {service.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqJsonLd(service.faqs)),
          }}
        />
      )}

      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="container-xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-text mb-8">
            <Link href="/" className="hover:text-pearl-white transition-colors">
              Home
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/services" className="hover:text-pearl-white transition-colors">
              Services
            </Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-pearl-white break-words">{service.title}</span>
          </nav>

          <Reveal>
            <div className="flex items-start gap-5 mb-6">
              <div className="w-14 h-14 rounded-[16px] bg-gradient-to-br from-royal-violet/20 to-crystal-magenta/20 flex items-center justify-center text-electric-purple shrink-0">
                {iconMap[service.icon] || <Sparkles size={28} />}
              </div>
              <div>
                <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  {service.title}
                </h1>
                <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
                  {service.shortDescription}
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-8">
              <Link href="/#contact">
                <Button size="lg">Start a project</Button>
              </Link>
              <Link href="/talents">
                <Button variant="secondary" size="lg">
                  Browse talents
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl max-w-4xl space-y-10">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              What we do
            </h2>
            <p className="text-ink-black/70 text-lg leading-relaxed">
              {service.description}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              Who we help
            </h2>
            <p className="text-ink-black/70 text-lg leading-relaxed">
              {service.idealClient}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black border-t border-ink-black/5">
        <div className="container-xl max-w-4xl">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">Overview</h2>
            <p className="text-ink-black/70 text-lg leading-relaxed mb-8">
              {service.shortDescription}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {service.benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex items-start gap-3 p-4 rounded-[16px] bg-royal-violet/5 border border-royal-violet/10"
                >
                  <CheckCircle size={18} className="text-royal-violet shrink-0 mt-0.5" />
                  <span className="text-sm font-medium">{benefit}</span>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-ink-black">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
                Problems we solve
              </h2>
              <ul className="space-y-4">
                {service.problems.map((problem) => (
                  <li
                    key={problem}
                    className="flex items-start gap-3 glass-card rounded-[16px] p-4"
                  >
                    <AlertTriangle size={18} className="text-warm-coral shrink-0 mt-0.5" />
                    <span className="text-muted-text text-sm">{problem}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
                What you get
              </h2>
              <ul className="space-y-4">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 glass-card rounded-[16px] p-4"
                  >
                    <Package size={18} className="text-electric-purple shrink-0 mt-0.5" />
                    <span className="text-muted-text text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-padding bg-soft-lavender text-ink-black">
        <div className="container-xl">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-12 text-center">
              Our process
            </h2>
          </Reveal>
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.process.map((step, i) => (
              <StaggerItem key={step.step}>
                <div className="relative p-6 rounded-[24px] bg-white border border-ink-black/5 h-full">
                  <span className="text-4xl font-display font-bold text-royal-violet/20">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-lg font-bold mt-2 mb-2">
                    {step.step}
                  </h3>
                  <p className="text-ink-black/60 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="section-padding bg-ink-black">
        <div className="container-xl max-w-3xl text-center">
          <Reveal>
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
              Ideal client
            </h2>
            <p className="text-muted-text text-lg leading-relaxed">
              {service.idealClient}
            </p>
          </Reveal>
        </div>
      </section>

      {faqItems.length > 0 && <FAQSection faqs={faqItems} />}

      <CTASection />
    </>
  );
}
