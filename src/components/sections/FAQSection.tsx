"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import type { FAQData } from "@/types";
import { Reveal } from "@/components/motion/Reveal";

export function FAQSection({ faqs }: { faqs: FAQData[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="section-padding bg-ink-black">
      <div className="container-xl max-w-3xl">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-center mb-12">
            Frequently asked questions
          </h2>
        </Reveal>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <Reveal key={faq._id} delay={i * 0.05}>
                <div className="glass-card rounded-[20px] overflow-hidden">
                  <button
                    className="w-full flex items-center justify-between p-5 text-left"
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
      </div>
    </section>
  );
}
