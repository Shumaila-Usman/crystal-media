import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { Button } from "@/components/shared/Button";
import { FAQSection } from "@/components/sections/FAQSection";
import { locationServices } from "@/data/seed";
import type { ServiceData } from "@/types";

const SERVICE_FORM_VALUES: Record<string, string> = {
  "influencer-marketing": "Influencer Marketing",
  "public-relations": "Public Relations",
  "talent-management": "Talent Management",
  "brand-collaborations": "Brand Collaborations",
  "social-media-marketing": "Social Media Marketing",
  "events-launches": "Events & Launches",
};

function splitServiceTitle(title: string) {
  const words = title.trim().split(/\s+/);
  if (words.length <= 1) return { lead: title, accent: "" };
  const accentCount = words.length >= 4 ? 2 : 1;
  return {
    lead: words.slice(0, -accentCount).join(" "),
    accent: words.slice(-accentCount).join(" "),
  };
}

interface ServiceDetailLayoutProps {
  service: ServiceData;
  allServices: ServiceData[];
}

export function ServiceDetailLayout({
  service,
  allServices,
}: ServiceDetailLayoutProps) {
  const { lead, accent } = splitServiceTitle(service.title);
  const otherServices = allServices.filter((s) => s.slug !== service.slug);
  const defaultService = SERVICE_FORM_VALUES[service.slug] || service.title;

  const faqItems = service.faqs.map((f) => ({
    _id: f.question,
    question: f.question,
    answer: f.answer,
    sortOrder: 0,
    published: true,
  }));

  const exploreLinks = [
    { href: "/services", label: "All services" },
    ...locationServices.map((loc) => ({
      href: `/services/${loc.slug}`,
      label: loc.city,
    })),
    { href: "/packages", label: "Packages" },
    { href: "/testimonials", label: "Reviews" },
    { href: "/talents", label: "Browse talents" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-ink-black pt-24 sm:pt-28 pb-14 sm:pb-16">
        <div className="container-xl relative z-10">
          <Reveal>
            <div className="mb-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-muted-text">
              <Link
                href="/"
                className="inline-flex items-center gap-2 transition-colors hover:text-pearl-white"
              >
                <ArrowLeft size={16} />
                Back to home
              </Link>
              <span className="hidden sm:inline text-white/20">|</span>
              <Link
                href="/services"
                className="text-xs font-semibold uppercase tracking-[0.25em] text-pearl-white/50 transition-colors hover:text-pearl-white"
              >
                Services
              </Link>
            </div>

            <h1 className="font-display max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[3.25rem]">
              {lead}
              {accent ? (
                <>
                  {" "}
                  <span className="gradient-text">{accent}</span>
                </>
              ) : null}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-text sm:text-lg">
              {service.shortDescription}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a href="#service-inquiry">
                <Button size="lg" className="w-full sm:w-auto">
                  Start a project
                </Button>
              </a>
              <Link href="/talents">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                  Browse talents
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] xl:gap-16">
            <div className="min-w-0 space-y-12">
              <Reveal>
                <div>
                  <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                    What we do
                  </h2>
                  <p className="max-w-3xl text-base leading-relaxed text-ink-black/70 sm:text-lg">
                    {service.description}
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div>
                  <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                    Who we help
                  </h2>
                  <p className="max-w-3xl text-base leading-relaxed text-ink-black/70 sm:text-lg">
                    {service.idealClient}
                  </p>
                </div>
              </Reveal>

              {otherServices.length > 0 && (
                <Reveal delay={0.1}>
                  <div>
                    <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">
                      Choose a focus
                    </h2>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      {otherServices.map((item) => (
                        <Link
                          key={item.slug}
                          href={`/services/${item.slug}`}
                          className="group flex min-h-[140px] flex-col rounded-[20px] border border-ink-black/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-royal-violet/20 hover:shadow-[0_16px_48px_rgba(78,32,74,0.08)]"
                        >
                          <h3 className="font-display mb-3 text-lg font-bold leading-snug group-hover:text-royal-violet">
                            {item.title}
                          </h3>
                          <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-royal-violet">
                            Learn more
                            <ArrowRight
                              size={15}
                              className="transition-transform group-hover:translate-x-0.5"
                            />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </Reveal>
              )}
            </div>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.08}>
                <div
                  id="service-inquiry"
                  className="scroll-mt-28 rounded-[24px] bg-ink-black p-6 sm:p-7 text-pearl-white shadow-[0_24px_80px_rgba(0,0,0,0.18)]"
                >
                  <h3 className="font-display text-xl font-bold sm:text-2xl">
                    Talk to Crystal Media
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-text">
                    Tell us your brand goals — we reply within 24 hours with a
                    tailored plan.
                  </p>
                  <div className="mt-6">
                    <CampaignInquiryForm
                      variant="sidebar"
                      defaultService={defaultService}
                    />
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="rounded-[24px] border border-ink-black/8 bg-white p-6">
                  <h3 className="font-display mb-4 text-lg font-bold">Explore</h3>
                  <ul className="space-y-1">
                    {exploreLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="block rounded-xl px-3 py-2.5 text-sm font-medium text-ink-black/70 transition-colors hover:bg-soft-lavender/60 hover:text-royal-violet"
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {faqItems.length > 0 && <FAQSection faqs={faqItems} />}
    </>
  );
}
