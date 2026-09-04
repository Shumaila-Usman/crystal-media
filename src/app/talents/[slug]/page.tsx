import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTalentBySlug, getTalents } from "@/lib/data";
import { buildMetadata, breadcrumbJsonLd, SITE_URL } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { TalentPlaceholder } from "@/components/talent/TalentPlaceholder";
import { TalentCard } from "@/components/talent/TalentCard";
import { Button } from "@/components/shared/Button";
import { CTASection } from "@/components/sections/CTASection";
import { formatFollowers } from "@/lib/utils";
import { ChevronRight, MapPin, ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/shared/SocialIcons";
import type { Metadata } from "next";

interface TalentPageProps {
  params: Promise<{ slug: string }>;
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

export async function generateStaticParams() {
  const { talents } = await getTalents({ limit: 100 });
  return talents.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: TalentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const talent = await getTalentBySlug(slug);
  if (!talent) return {};

  return buildMetadata({
    title: talent.seoTitle || `${talent.name} | Crystal Media Talent`,
    description:
      talent.seoDescription ||
      `${talent.name} — ${talent.niche} creator based in ${talent.city}. ${formatFollowers(talent.totalFollowers)} followers. Represented by Crystal Media.`,
    path: `/talents/${talent.slug}`,
    image: talent.image || undefined,
  });
}

function instagramHandle(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/instagram\.com\/([^/?]+)/);
  return match ? `@${match[1]}` : null;
}

export default async function TalentDetailPage({ params }: TalentPageProps) {
  const { slug } = await params;
  const talent = await getTalentBySlug(slug);
  if (!talent) notFound();

  const { talents: related } = await getTalents({
    niche: talent.niche.split("&")[0].trim(),
    limit: 4,
  });
  const relatedTalents = related.filter((t) => t.slug !== talent.slug).slice(0, 3);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Talent", url: `${SITE_URL}/talents` },
    { name: talent.name, url: `${SITE_URL}/talents/${talent.slug}` },
  ];

  const platformEntries = [
    { key: "instagram", label: "Instagram", icon: InstagramIcon, url: talent.platforms.instagram, metrics: talent.metrics.instagram },
    { key: "tiktok", label: "TikTok", icon: TikTokIcon, url: talent.platforms.tiktok, metrics: talent.metrics.tiktok },
    { key: "youtube", label: "YouTube", icon: YouTubeIcon, url: talent.platforms.youtube, metrics: talent.metrics.youtube },
  ].filter((p) => p.url);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />

      <section className="relative pt-24 sm:pt-32 pb-12 sm:pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="container-xl relative z-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-text mb-8">
            <Link href="/" className="hover:text-pearl-white transition-colors">Home</Link>
            <ChevronRight size={14} className="shrink-0" />
            <Link href="/talents" className="hover:text-pearl-white transition-colors">Talent</Link>
            <ChevronRight size={14} className="shrink-0" />
            <span className="text-pearl-white break-words">{talent.name}</span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <Reveal>
              <div className="relative rounded-[24px] overflow-hidden glass-card">
                {talent.image ? (
                  <Image
                    src={talent.image}
                    alt={talent.name}
                    width={600}
                    height={750}
                    className="w-full object-cover"
                    style={{
                      aspectRatio: "4/5",
                      objectPosition: talent.imageObjectPosition || "center top",
                    }}
                    priority
                  />
                ) : (
                  <TalentPlaceholder name={talent.name} slug={talent.slug} />
                )}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              {talent.featured && (
                <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-royal-violet to-crystal-magenta rounded-full mb-4">
                  Featured Creator
                </span>
              )}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">
                {talent.name}
              </h1>
              <p className="text-electric-purple font-medium mb-4">{talent.niche}</p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-text mb-6">
                <span className="flex items-center gap-1.5">
                  <MapPin size={14} />
                  {talent.city}
                </span>
                <span>{formatFollowers(talent.totalFollowers)} followers</span>
                <span>{talent.engagementRate}% engagement</span>
              </div>

              <p className="text-muted-text leading-relaxed mb-8">{talent.bio}</p>

              <div className="flex flex-wrap gap-2 mb-8">
                {talent.specialties.map((s) => (
                  <span
                    key={s}
                    className="px-3 py-1 text-xs font-medium glass-card rounded-full"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {platformEntries.length > 0 && (
                <div className="space-y-3 mb-8">
                  <h2 className="text-sm font-medium text-muted-text uppercase tracking-wide">
                    Platforms
                  </h2>
                  {platformEntries.map((p) => (
                    <a
                      key={p.key}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 glass-card rounded-[16px] hover:border-electric-purple/30 transition-colors group min-h-[48px]"
                    >
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        <p.icon className="text-crystal-magenta shrink-0" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm">{p.label}</p>
                          {p.metrics && (
                            <p className="text-xs text-muted-text truncate">
                              {p.key === "instagram" && instagramHandle(p.url)
                                ? `${instagramHandle(p.url)} · `
                                : ""}
                              {formatFollowers(p.metrics.followers)} · {p.metrics.engagementRate}% ER
                            </p>
                          )}
                        </div>
                      </div>
                      <ArrowUpRight size={16} className="text-muted-text group-hover:text-electric-purple transition-colors" />
                    </a>
                  ))}
                </div>
              )}

              <Link
                href={`/?creator=${encodeURIComponent(talent.name)}#contact`}
                className="block w-full sm:w-auto"
              >
                <Button size="lg" className="w-full sm:w-auto">Collaborate with {talent.name.split(" ")[0]}</Button>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {relatedTalents.length > 0 && (
        <section className="section-padding bg-pearl-white text-ink-black">
          <div className="container-xl">
            <Reveal>
              <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                Similar creators
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedTalents.map((t) => (
                <TalentCard key={t.slug} talent={t} />
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection />
    </>
  );
}
