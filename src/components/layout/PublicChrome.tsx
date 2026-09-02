"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { AppShell } from "@/components/layout/AppShell";
import { WhatsAppFloatButton } from "@/components/shared/WhatsAppFloatButton";
import type { ServiceData, SiteSettingsData } from "@/types";

interface PublicChromeProps {
  children: React.ReactNode;
  settings: SiteSettingsData;
  services: ServiceData[];
}

export function PublicChrome({ children, settings, services }: PublicChromeProps) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <AppShell>
        <Navbar whatsappNumber={settings.whatsappNumber} />
        <main className="flex-1">{children}</main>
        <Footer settings={settings} services={services} />
        <WhatsAppFloatButton number={settings.whatsappNumber} />
      </AppShell>
    </SmoothScroll>
  );
}
