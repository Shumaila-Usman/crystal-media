import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";
import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { Button } from "@/components/shared/Button";
import { locationServices } from "@/data/seed";

const includedItems = [
  "Social media marketing strategy & positioning",
  "Instagram Reels & TikTok content systems",
  "Influencer amplification for product launches",
  "Monthly reporting and creative iteration",
];

export function SocialMediaServiceLayout() {
  const exploreLinks = [
    { href: "/services", label: "All services" },
    ...locationServices.map((loc) => ({
      href: `/services/${loc.slug}`,
      label: loc.city,
    })),
    { href: "/packages", label: "Packages" },
    { href: "/testimonials", label: "Reviews" },
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
              <span className="hidden sm:inline text-white/20">/</span>
              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-pearl-white/50">
                Social media
              </span>
            </div>

            <h1 className="font-display max-w-4xl text-3xl font-bold leading-[1.08] sm:text-4xl lg:text-[3.25rem]">
              Social media marketing agency{" "}
              <span className="gradient-text">for brands that sell</span>
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted-text sm:text-lg">
              Full-service social media marketing services — content strategy,
              Instagram &amp; TikTok campaigns, community growth, and paid
              amplification — led by a team that understands Pakistan&apos;s feeds.
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
            <div className="min-w-0 space-y-10">
              <Reveal>
                <div>
                  <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                    Social media marketing services
                  </h2>
                  <p className="max-w-3xl text-base leading-relaxed text-ink-black/70 sm:text-lg">
                    Strategy, content calendars, Reels/TikTok short-form, community
                    management, influencer seeding, and campaign reporting — a
                    practical social media marketing services list built around your
                    KPIs, not vanity metrics.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.05}>
                <div>
                  <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                    Platforms we run
                  </h2>
                  <p className="max-w-3xl text-base leading-relaxed text-ink-black/70 sm:text-lg">
                    Instagram, TikTok, YouTube, and Facebook. We match format to
                    audience: Reels for discovery, Stories for retention, long-form
                    for trust, and creator collabs for proof.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
                <div>
                  <h2 className="font-display mb-4 text-2xl font-bold sm:text-3xl">
                    Why brands choose Crystal Media
                  </h2>
                  <p className="max-w-3xl text-base leading-relaxed text-ink-black/70 sm:text-lg">
                    You&apos;re not buying &ldquo;posts.&rdquo; You&apos;re getting a social
                    media marketing company that pairs organic storytelling with
                    influencer distribution so every rupee of attention can turn into
                    inquiries.
                  </p>
                </div>
              </Reveal>
            </div>

            <aside className="min-w-0 space-y-6 lg:sticky lg:top-28 lg:self-start">
              <Reveal delay={0.08}>
                <div className="rounded-[24px] border border-ink-black/8 bg-white p-6">
                  <h3 className="font-display mb-4 text-lg font-bold">Included</h3>
                  <ul className="space-y-3">
                    {includedItems.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm leading-relaxed text-ink-black/70 sm:text-base"
                      >
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-royal-violet" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>

              <Reveal delay={0.1}>
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
                      defaultService="Social Media Marketing"
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
    </>
  );
}
