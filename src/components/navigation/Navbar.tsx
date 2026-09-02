"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn, getWhatsAppLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/shared/SocialIcons";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/talents", label: "Talent" },
  { href: "/packages", label: "Campaigns" },
  { href: "/services", label: "About" },
  { href: "/contact", label: "Contact" },
];

function GradientBorderButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "hero-gradient-border-btn relative inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-pearl-white rounded-full transition-all duration-300 hover:shadow-[0_0_24px_rgba(163,58,209,0.35)]",
        className
      )}
    >
      {children}
    </Link>
  );
}

export function Navbar({ whatsappNumber }: { whatsappNumber?: string }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const whatsapp =
    whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";
  const whatsappHref = whatsapp
    ? getWhatsAppLink(whatsapp, "Hi Crystal Media, I'd like to get in touch.")
    : "";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string, label: string) => {
    if (href === "/") return pathname === "/";
    if (label === "About") return pathname === "/services";
    if (label === "Campaigns") return pathname === "/packages";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-ink-black/85 backdrop-blur-xl border-b border-white/5 py-3 md:py-3.5"
          : "bg-ink-black/35 backdrop-blur-md py-3.5 md:py-4"
      )}
    >
      <div className="container-xl">
        <div className="flex items-center justify-between gap-3 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:items-center md:gap-6 lg:gap-8">
          <div className="min-w-0 shrink-0 justify-self-start">
            <BrandLogo size="md" variant="light" />
          </div>

          <nav
            className="hidden md:flex items-center justify-center gap-5 lg:gap-7 xl:gap-8"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={cn(
                  "relative whitespace-nowrap text-[13px] lg:text-sm font-medium tracking-wide transition-colors duration-300",
                  isActive(link.href, link.label)
                    ? "text-pearl-white"
                    : "text-pearl-white/65 hover:text-pearl-white"
                )}
              >
                {link.label}
                {isActive(link.href, link.label) && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="absolute -bottom-1.5 left-0 right-0 h-px bg-gradient-to-r from-electric-purple to-crystal-magenta"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="flex items-center justify-end gap-2 sm:gap-3 justify-self-end shrink-0">
            {whatsappHref && (
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat on WhatsApp"
                className="hidden sm:inline-flex items-center justify-center gap-2 rounded-full border border-[#25D366]/40 bg-[#25D366]/10 px-3.5 py-2 text-[13px] font-medium text-pearl-white transition-all hover:bg-[#25D366]/20 lg:px-4 lg:py-2.5 lg:text-sm"
              >
                <WhatsAppIcon size={16} className="text-[#25D366]" />
                <span className="hidden lg:inline">WhatsApp</span>
              </a>
            )}
            <GradientBorderButton
              href="/contact"
              className="px-3.5 py-2 text-xs sm:px-4 sm:py-2 sm:text-[13px] lg:px-5 lg:py-2.5 lg:text-sm whitespace-nowrap"
            >
              Start a Campaign
            </GradientBorderButton>
          </div>
        </div>
      </div>
    </header>
  );
}
