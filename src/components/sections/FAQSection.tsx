"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import Link from "next/link";
import type { FAQData } from "@/types";
import { Reveal } from "@/components/motion/Reveal";

export function FAQSection({ faqs }: { faqs: FAQData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-ink-black">
      <div className="container-xl max-w-3xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-electric-purple mb-4 text-center">
            FAQ
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-4">
            Influencer marketing questions, answered.
          </h2>
          <p className="text-muted-text text-center mb-12 max-w-xl mx-auto">
            Everything about brand deals, talent management, and creator campaigns
            with Crystal Media.
          </p>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq._id} delay={i * 0.05}>
                <div className="rounded-xl border border-white/10 bg-white/[0.03] overflow-hidden">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-5 text-left min-h-[56px]"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-medium text-sm sm:text-base pr-4">
                      {faq.question}
                    </span>
                    {isOpen ? (
                      <Minus size={18} className="shrink-0 text-electric-purple" />
                    ) : (
                      <Plus size={18} className="shrink-0 text-muted-text" />
                    )}
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p className="px-5 pb-5 text-muted-text text-sm leading-relaxed">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="text-center text-muted-text mt-10">
            Still have questions?{" "}
            <Link href="/contact" className="text-electric-purple hover:underline font-medium">
              Get in touch
            </Link>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
