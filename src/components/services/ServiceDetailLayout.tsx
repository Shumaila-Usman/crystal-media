import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { Button } from "@/components/shared/Button";
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
        <div className="container-xl max-w-4xl space-y-12">
          <Reveal>
            <div>
              <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                What we do
              </h2>
              <p className="text-base leading-relaxed text-ink-black/70 sm:text-lg">
                {service.description.split("\n\n")[0]}
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div>
              <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                Who we help
              </h2>
              <p className="text-base leading-relaxed text-ink-black/70 sm:text-lg">
                {service.idealClient}
              </p>
            </div>
          </Reveal>

          {service.platforms && service.platforms.length > 0 && (
            <Reveal delay={0.08}>
              <div>
                <h2 className="font-display mb-3 text-2xl font-bold sm:text-3xl">
                  Platforms & services
                </h2>
                <p className="mb-6 max-w-2xl text-sm leading-relaxed text-ink-black/55 sm:text-base">
                  Here is exactly what Crystal Media delivers — platform by platform.
                </p>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {service.platforms.map((platform) => (
                    <div
                      key={platform.name}
                      className="rounded-[20px] border border-ink-black/8 bg-white p-5"
                    >
                      <h3 className="font-display mb-2 text-lg font-bold text-royal-violet">
                        {platform.name}
                      </h3>
                      <p className="text-sm leading-relaxed text-ink-black/70 sm:text-base">
                        {platform.services}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {service.deliverables.length > 0 && (
            <Reveal delay={0.1}>
              <div>
                <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                  What&apos;s included
                </h2>
                <ul className="space-y-3">
                  {service.deliverables.slice(0, 5).map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-base leading-relaxed text-ink-black/70"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-violet" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}

          {otherServices.length > 0 && (
            <Reveal delay={0.12}>
              <div>
                <h2 className="font-display mb-6 text-2xl font-bold sm:text-3xl">
                  Choose a focus
                </h2>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {otherServices.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/services/${item.slug}`}
                      className="group flex min-h-[120px] flex-col rounded-[20px] border border-ink-black/8 bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-royal-violet/20 hover:shadow-[0_16px_48px_rgba(78,32,74,0.08)]"
                    >
                      <h3 className="font-display mb-2 text-lg font-bold leading-snug group-hover:text-royal-violet">
                        {item.title}
                      </h3>
                      <p className="mb-3 line-clamp-2 text-sm text-ink-black/55">
                        {item.shortDescription}
                      </p>
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

          <Reveal delay={0.14}>
            <div className="rounded-[20px] border border-ink-black/8 bg-soft-lavender/40 p-6">
              <h3 className="font-display mb-4 text-lg font-bold">Explore</h3>
              <div className="flex flex-wrap gap-2">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-ink-black/10 bg-white px-4 py-2 text-sm font-medium text-ink-black/70 transition-colors hover:border-royal-violet/30 hover:text-royal-violet"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        id="service-inquiry"
        className="scroll-mt-24 section-padding bg-ink-black text-pearl-white"
      >
        <div className="container-xl max-w-2xl">
          <Reveal>
            <h2 className="font-display mb-2 text-2xl font-bold sm:text-3xl">
              Talk to Crystal Media
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-text sm:text-base">
              Tell us your brand goals — we reply within 24 hours with a tailored
              plan for {defaultService.toLowerCase()}.
            </p>
            <CampaignInquiryForm
              variant="sidebar"
              defaultService={defaultService}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
