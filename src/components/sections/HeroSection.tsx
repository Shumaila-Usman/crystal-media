"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { WhatsAppCTA } from "@/components/shared/WhatsAppCTA";
import type { SiteSettingsData } from "@/types";

function SparkleIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
      <path
        d="M5 0L5.8 4.2L10 5L5.8 5.8L5 10L4.2 5.8L0 5L4.2 4.2L5 0Z"
        fill="url(#sparkleGrad)"
      />
      <defs>
        <linearGradient id="sparkleGrad" x1="0" y1="0" x2="10" y2="10">
          <stop offset="0%" stopColor="#E54699" />
          <stop offset="100%" stopColor="#FF963D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const models = [
  {
    src: "/hero/model-left-v2.png",
    alt: "Crystal Media creator — fashion",
    className:
      "hidden sm:block left-0 sm:left-1 lg:-left-2 z-10 w-[44%] sm:w-[42%] lg:w-[40%] -rotate-6 top-14 sm:top-16 lg:top-20 xl:top-24",
    imageClassName: "object-cover object-[center_15%]",
    imageScale: 1.38,
    imagePosition: "50% 12%",
    delay: 0.3,
  },
  {
    src: "/hero/model-center.png",
    alt: "Crystal Media creator — luxury lifestyle",
    className:
      "left-1/2 -translate-x-1/2 z-30 w-[70%] sm:w-[48%] lg:w-[46%] top-0 sm:top-1 lg:top-2 xl:top-4",
    imageClassName: "object-cover object-top",
    imageScale: 1,
    imagePosition: "50% 0%",
    delay: 0.15,
  },
  {
    src: "/hero/model-right.png",
    alt: "Crystal Media creator — premium fashion",
    className:
      "hidden sm:block right-0 sm:right-1 lg:-right-2 z-20 w-[44%] sm:w-[42%] lg:w-[40%] rotate-6 top-10 sm:top-12 lg:top-16 xl:top-20",
    imageClassName: "object-cover object-top",
    imageScale: 1,
    imagePosition: "50% 0%",
    delay: 0.25,
  },
];

interface HeroSectionProps {
  settings: SiteSettingsData;
}

export function HeroSection({ settings }: HeroSectionProps) {
  return (
    <section className="relative min-h-0 sm:min-h-screen flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/hero/background.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-black/95 via-ink-black/75 to-ink-black/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-black/80 via-transparent to-ink-black/30" />
      </div>

      <div className="container-xl relative z-10 pt-24 pb-10 sm:pt-28 sm:pb-16 lg:pt-32 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-8 items-start lg:min-h-[calc(100vh-8rem)]">
          {/* Left — Copy */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl"
          >
            <p className="text-[11px] sm:text-xs font-semibold tracking-[0.28em] uppercase text-electric-purple/90 mb-5">
              Luxury Influencer Marketing &amp; PR
            </p>

            <h1 className="font-display text-[1.75rem] sm:text-5xl lg:text-[3.4rem] xl:text-6xl font-bold leading-[1.12] sm:leading-[1.08] mb-5 sm:mb-6 text-pearl-white">
              We turn influence into{" "}
              <span className="block sm:inline mt-1 sm:mt-0">
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
              </span>
            </h1>

            <p className="text-pearl-white/60 text-base sm:text-lg leading-relaxed mb-8 max-w-md">
              Crystal Media connects premium brands with culturally relevant
              creators through strategy-led PR, talent management and
              high-impact campaigns.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4 mb-8 sm:mb-10">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 text-sm font-semibold text-pearl-white rounded-full transition-all duration-300 hover:shadow-[0_8px_32px_rgba(163,58,209,0.45)] hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto min-h-[48px]"
                style={{
                  background:
                    "linear-gradient(135deg, #73258B 0%, #A33AD1 40%, #E54699 75%, #FF963D 100%)",
                }}
              >
                Start a Campaign
              </Link>

              <Link
                href="/talents"
                className="hero-outline-btn inline-flex items-center justify-center px-6 sm:px-7 py-3.5 text-sm font-semibold text-pearl-white rounded-full transition-all duration-300 hover:bg-white/5 w-full sm:w-auto min-h-[48px]"
              >
                Explore Talent
              </Link>

              {settings.whatsappNumber && (
                <WhatsAppCTA
                  number={settings.whatsappNumber}
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

          {/* Right — Model showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative h-[300px] sm:h-[520px] lg:h-[580px] xl:h-[640px] w-full max-w-sm sm:max-w-none mx-auto lg:-mt-6 xl:-mt-10"
          >
            {/* Glow behind center card */}
            <div className="absolute top-[35%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[75%] rounded-full bg-amber-glow/20 blur-[90px] pointer-events-none" />
            <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[65%] rounded-full bg-electric-purple/25 blur-[70px] pointer-events-none" />

            <div className="relative w-full h-full">
              {models.map((model) => (
                <motion.div
                  key={model.src}
                  className={`absolute ${model.className}`}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: model.delay,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <div className="relative rounded-[20px] sm:rounded-[24px] overflow-hidden shadow-[0_24px_80px_rgba(0,0,0,0.5)] border border-white/10">
                    <div
                      className="relative w-full overflow-hidden"
                      style={{ aspectRatio: "3/4" }}
                    >
                      <div
                        className="absolute inset-0"
                        style={{
                          transform: `scale(${model.imageScale})`,
                          transformOrigin: "top center",
                        }}
                      >
                        <Image
                          src={model.src}
                          alt={model.alt}
                          fill
                          className={model.imageClassName}
                          style={{ objectPosition: model.imagePosition }}
                          sizes="(max-width: 768px) 40vw, 22vw"
                          priority
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-ink-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
