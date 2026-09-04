import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { servicesFocusLinks } from "@/data/service-hubs";
import { Button } from "@/components/shared/Button";
import { ChevronLeft } from "lucide-react";

export const metadata = buildMetadata({
  title: "Services | Social Media & Influencer Marketing | Crystal Media",
  description:
    "Social media marketing agency and influencer marketing agency in Pakistan — brand deals, creator campaigns, and talent management built for measurable results.",
  path: "/services",
});

const exploreLinks = [
  { href: "/services", label: "All services" },
  { href: "/services/pakistan", label: "Pakistan" },
  { href: "/services/karachi", label: "Karachi" },
  { href: "/services/lahore", label: "Lahore" },
  { href: "/services/islamabad", label: "Islamabad" },
  { href: "/packages", label: "Packages" },
  { href: "/testimonials", label: "Reviews" },
];

export default function ServicesPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink-black pt-28 pb-14 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_100%,rgba(115,37,139,0.22),transparent)]" />
        <div className="container-xl relative z-10">
          <Reveal>
            <nav className="mb-10 flex flex-wrap items-center gap-2 text-sm text-muted-text">
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 hover:text-pearl-white transition-colors"
              >
                <ChevronLeft size={16} />
                Back to home
              </Link>
              <span className="text-white/25">/</span>
              <span className="font-medium tracking-[0.18em] text-pearl-white/70 uppercase text-xs">
                Services
              </span>
            </nav>

            <h1 className="font-display text-3xl sm:text-4xl lg:text-[3.25rem] font-bold max-w-4xl mb-6 leading-[1.12] text-pearl-white">
              Social media &amp; influencer marketing{" "}
              <span className="gradient-text">that converts</span>
            </h1>
            <p className="text-muted-text text-base sm:text-lg max-w-3xl leading-relaxed mb-8">
              Crystal Media is a social media marketing agency and influencer
              marketing agency in Pakistan — brand deals, creator campaigns, and
              talent management built for measurable results.
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Link href="/#contact" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Start a project
                </Button>
              </Link>
              <Link href="/talents" className="w-full sm:w-auto">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto min-h-[48px]">
                  Browse talents
                </Button>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-[#f7f7f9] text-ink-black">
        <div className="container-xl">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-16">
            <div className="space-y-12 min-w-0">
              <Reveal>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                  What we do
                </h2>
                <p className="text-ink-black/65 text-base sm:text-lg leading-relaxed max-w-3xl">
                  We connect brands with vetted creators and run end-to-end social
                  media marketing services — strategy, influencer outreach, content
                  coordination, and reporting.
                </p>
              </Reveal>

              <Reveal delay={0.05}>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-4">
                  Who we help
                </h2>
                <p className="text-ink-black/65 text-base sm:text-lg leading-relaxed max-w-3xl">
                  E‑commerce brands, startups, agencies, and growing businesses that
                  need Instagram and YouTube influence without managing dozens of
                  creators in-house.
                </p>
              </Reveal>

              <Reveal delay={0.1}>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-6">
                  Choose a focus
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesFocusLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="group flex min-h-[108px] flex-col justify-center rounded-2xl border border-ink-black/[0.08] bg-white p-5 transition-all hover:border-royal-violet/20 hover:shadow-[0_8px_30px_rgba(78,32,74,0.08)]"
                    >
                      <p className="font-display text-base font-bold text-ink-black group-hover:text-royal-violet transition-colors">
                        {link.title}
                      </p>
                      <span className="mt-2 text-sm font-medium text-royal-violet">
                        Learn more →
                      </span>
                    </Link>
                  ))}
                </div>
              </Reveal>
            </div>

            <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.15}>
                <div className="rounded-2xl bg-ink-black p-6 sm:p-7 text-pearl-white">
                  <h3 className="font-display text-xl font-bold mb-2">
                    Talk to Crystal Media
                  </h3>
                  <p className="text-sm text-pearl-white/60 leading-relaxed mb-6">
                    Tell us your brand goals — we reply within 24 hours with a
                    tailored plan.
                  </p>
                  <Link href="/#contact" className="block">
                    <Button size="lg" className="w-full min-h-[48px]">
                      Send message
                    </Button>
                  </Link>
                </div>
              </Reveal>

              <Reveal delay={0.2}>
                <div className="rounded-2xl border border-ink-black/[0.08] bg-white p-6 sm:p-7">
                  <h3 className="font-display text-xl font-bold text-ink-black mb-4">
                    Explore
                  </h3>
                  <ul className="space-y-3">
                    {exploreLinks.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          className="text-sm font-medium text-royal-violet hover:text-electric-purple transition-colors"
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
    </>
  );
}
