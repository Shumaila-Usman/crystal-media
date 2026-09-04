"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { TestimonialData } from "@/types";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/motion/Reveal";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={16}
          className={i < rating ? "text-amber-glow fill-amber-glow" : "text-white/20"}
        />
      ))}
    </div>
  );
}

export function TestimonialsCarousel({
  testimonials,
}: {
  testimonials: TestimonialData[];
}) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % testimonials.length);
  }, [testimonials.length]);

  const prev = () => {
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (paused || testimonials.length <= 1) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next, testimonials.length]);

  if (testimonials.length === 0) {
    return (
      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-royal-violet mb-4 text-center">
              Testimonials
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-8">
              Loved by brands &amp; creators
            </h2>
            <p className="text-center text-ink-black/40 text-sm">Loading reviews…</p>
          </Reveal>
        </div>
      </section>
    );
  }

  const t = testimonials[current];

  return (
    <section className="section-padding bg-pearl-white text-ink-black">
      <div className="container-xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-royal-violet mb-4 text-center">
            Testimonials
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            Loved by brands &amp; creators
          </h2>
        </Reveal>

        <div
          className="relative max-w-3xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4"
            >
              <StarRating rating={t.rating} />
              <blockquote className="font-display text-xl sm:text-2xl font-medium leading-relaxed mt-6 mb-8">
                &ldquo;{t.review}&rdquo;
              </blockquote>
              <div>
                <p className="font-semibold">{t.reviewerName}</p>
                <p className="text-ink-black/50 text-sm">
                  {t.reviewerRole}, {t.brandName}
                </p>
                {t.category && (
                  <span className="inline-block mt-2 px-3 py-1 text-xs bg-royal-violet/10 text-royal-violet rounded-full">
                    {t.category}
                  </span>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={prev}
                className="w-11 h-11 rounded-full border border-ink-black/10 flex items-center justify-center hover:bg-ink-black/5 transition-colors touch-target"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={next}
                className="w-11 h-11 rounded-full border border-ink-black/10 flex items-center justify-center hover:bg-ink-black/5 transition-colors touch-target"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
