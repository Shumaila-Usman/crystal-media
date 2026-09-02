"use client";

import { useState, useCallback } from "react";
import { usePathname } from "next/navigation";
import { CrystalLoader } from "@/components/motion/CrystalLoader";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [introDone, setIntroDone] = useState(pathname.startsWith("/admin"));

  const handleIntroComplete = useCallback(() => {
    setIntroDone(true);
  }, []);

  return (
    <>
      {!introDone && !pathname.startsWith("/admin") && (
        <CrystalLoader onComplete={handleIntroComplete} />
      )}
      {children}
    </>
  );
}
