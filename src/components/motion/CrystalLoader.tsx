"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/shared/BrandLogo";

export function CrystalLoader({ onComplete }: { onComplete: () => void }) {
  const [skipped, setSkipped] = useState(false);

  useEffect(() => {
    const hasSeen = sessionStorage.getItem("crystal_intro_seen");
    if (hasSeen) {
      onComplete();
      return;
    }

    const timer = setTimeout(() => {
      sessionStorage.setItem("crystal_intro_seen", "true");
      onComplete();
    }, 1800);

    return () => clearTimeout(timer);
  }, [onComplete]);

  const handleSkip = () => {
    sessionStorage.setItem("crystal_intro_seen", "true");
    setSkipped(true);
    onComplete();
  };

  if (skipped) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-ink-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-electric-purple/20 blur-[120px] aurora-blob" />
          <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] rounded-full bg-crystal-magenta/15 blur-[80px] aurora-blob" style={{ animationDelay: "-4s" }} />
        </div>

        <motion.div
          className="relative z-10 flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="80" height="80" viewBox="0 0 80 80" className="mb-2">
            <motion.polygon
              points="40,5 70,25 70,55 40,75 10,55 10,25"
              fill="none"
              stroke="url(#crystalGrad)"
              strokeWidth="1.5"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            />
            <motion.polygon
              points="40,15 60,28 60,52 40,65 20,52 20,28"
              fill="url(#crystalFill)"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            />
            <defs>
              <linearGradient id="crystalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A33AD1" />
                <stop offset="50%" stopColor="#E54699" />
                <stop offset="100%" stopColor="#FF963D" />
              </linearGradient>
              <linearGradient id="crystalFill" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#73258B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#E54699" stopOpacity="0.2" />
              </linearGradient>
            </defs>
          </svg>

          <BrandLogo size="lg" />

          <motion.div
            className="w-32 h-0.5 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div
              className="h-full bg-gradient-to-r from-electric-purple to-crystal-magenta rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>

        <button
          onClick={handleSkip}
          className="absolute bottom-8 right-8 text-xs text-muted-text hover:text-pearl-white transition-colors tracking-wider uppercase"
        >
          Skip
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
