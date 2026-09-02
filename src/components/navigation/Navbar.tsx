"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { BrandLogo } from "@/components/shared/BrandLogo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { InstagramIcon } from "@/components/shared/SocialIcons";

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

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (pathname.startsWith("/admin")) return null;

  const isActive = (href: string, label: string) => {
    if (href === "/") return pathname === "/";
    if (label === "About") return pathname === "/services";
    if (label === "Campaigns") return pathname === "/packages";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-ink-black/80 backdrop-blur-xl border-b border-white/5 py-3"
            : "bg-ink-black/30 backdrop-blur-md py-4"
        )}
      >
        <div className="container-xl flex items-center justify-between gap-6">
          <BrandLogo size="md" variant="light" />

          <nav
            className="hidden lg:flex items-center gap-7 xl:gap-9"
            aria-label="Main navigation"
          >
            {navLinks.map((link) => (
              <Link
                key={`${link.href}-${link.label}`}
                href={link.href}
                className={cn(
                  "relative text-sm font-medium transition-colors duration-300",
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

          <div className="hidden lg:flex items-center">
            <GradientBorderButton href="/contact">
              Start a Campaign
            </GradientBorderButton>
          </div>

          <button
            className="lg:hidden relative w-11 h-11 flex items-center justify-center text-pearl-white touch-target"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-ink-black/70 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              className="absolute inset-y-0 right-0 w-full max-w-sm bg-midnight-plum/95 backdrop-blur-xl border-l border-white/5 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              aria-label="Mobile navigation"
            >
              <div className="flex-1 flex flex-col justify-center px-8 gap-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={`${link.href}-${link.label}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "block py-3.5 text-xl font-display font-semibold transition-colors",
                        isActive(link.href, link.label)
                          ? "gradient-text"
                          : "text-pearl-white/70 hover:text-pearl-white"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="p-8 border-t border-white/5 space-y-4">
                <GradientBorderButton href="/contact" className="w-full justify-center">
                  Start a Campaign
                </GradientBorderButton>
                <a
                  href={
                    process.env.NEXT_PUBLIC_INSTAGRAM_URL ||
                    "https://www.instagram.com/crystal_media.pk/"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-text hover:text-pearl-white transition-colors"
                >
                  <InstagramIcon size={16} />
                  @crystal_media.pk
                </a>
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
