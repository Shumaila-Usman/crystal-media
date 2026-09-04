"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";

function SparkleIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2L5 0Z"
        fill="url(#heroSparkleGrad)"
      />
      <defs>
        <linearGradient id="heroSparkleGrad" x1="0" y1="0" x2="10" y2="10">
          <stop offset="0%" stopColor="#E54699" />
          <stop offset="100%" stopColor="#FF963D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

interface HeroSectionProps {
  whatsappNumber?: string;
  creatorSlug?: string;
  creatorName?: string;
}

export function HeroSection({
  whatsappNumber,
  creatorSlug,
  creatorName,
}: HeroSectionProps) {
  const searchParams = useSearchParams();
  const creatorFromUrl = searchParams.get("creator");
  const resolvedName =
    creatorName ||
    (creatorFromUrl ? decodeURIComponent(creatorFromUrl) : undefined);

  useEffect(() => {
    if (window.location.hash === "#contact" || creatorFromUrl) {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [creatorFromUrl]);

  return (
    <section
      id="contact"
      className="relative min-h-0 lg:min-h-screen flex items-center overflow-hidden scroll-mt-24"
    >
      <div className="absolute inset-0 bg-ink-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_50%,rgba(163,58,209,0.22),transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_80%_30%,rgba(229,70,153,0.12),transparent)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink-black/95 via-ink-black/80 to-ink-black/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-black via-transparent to-ink-black/40" />

      <div className="container-xl relative z-10 pt-28 pb-12 sm:pt-32 sm:pb-16 lg:pt-36 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 xl:gap-16 items-start lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-[10px] sm:text-sm font-semibold tracking-[0.16em] sm:tracking-[0.28em] uppercase text-electric-purple/90 mb-5">
              Luxury Influencer Marketing &amp; PR
            </p>

            <h1 className="font-display text-[1.85rem] sm:text-4xl lg:text-[3.15rem] xl:text-6xl font-bold leading-[1.12] mb-5 sm:mb-6 text-pearl-white">
              We turn influence into{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #9632C6 0%, #E54699 55%, #FF963D 100%)",
                }}
              >
                iconic brand
              </span>{" "}
              moments.
            </h1>

            <p className="text-pearl-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Crystal Media connects premium brands with culturally relevant
              creators through strategy-led PR, talent management, and
              high-impact campaigns.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 text-sm font-semibold text-pearl-white rounded-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(163,58,209,0.45)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto min-h-[48px]"
                style={{
                  background:
                    "linear-gradient(135deg, #73258B 0%, #A33AD1 40%, #E54699 75%, #FF963D 100%)",
                }}
              >
                Start a Campaign
              </a>

              <Link
                href="/talents"
                className="hero-outline-btn inline-flex items-center justify-center px-6 sm:px-7 py-3.5 text-sm font-semibold text-pearl-white rounded-full transition-all duration-300 hover:bg-white/5 w-full sm:w-auto min-h-[48px]"
              >
                Explore Talent
              </Link>

              {whatsappNumber && (
                <WhatsAppCTA
                  number={whatsappNumber}
                  message="Hi Crystal Media, I'd like to discuss a campaign."
                  label="Chat on WhatsApp"
                  variant="outline"
                  className="w-full sm:w-auto"
                />
              )}
            </div>

            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              {[
                "Curated creators",
                "Premium campaigns",
                "Measurable impact",
              ].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 text-xs sm:text-sm text-pearl-white/55"
                >
                  <SparkleIcon />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="w-full min-w-0 lg:max-w-xl lg:justify-self-end"
          >
            <CampaignInquiryForm
              variant="full"
              selectedCreator={creatorSlug}
              selectedCreatorName={resolvedName}
              className="shadow-[0_24px_80px_rgba(0,0,0,0.45)] max-h-none"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
