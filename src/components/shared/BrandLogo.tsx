"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  variant?: "default" | "light" | "dark";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

function CrystalIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <polygon
        points="20,2 36,12 36,28 20,38 4,28 4,12"
        fill="url(#crystalIconFill)"
        stroke="url(#crystalIconStroke)"
        strokeWidth="0.8"
      />
      <polygon
        points="20,8 30,14 30,26 20,32 10,26 10,14"
        fill="url(#crystalIconInner)"
        opacity="0.6"
      />
      <defs>
        <linearGradient id="crystalIconFill" x1="4" y1="2" x2="36" y2="38">
          <stop offset="0%" stopColor="#73258B" />
          <stop offset="50%" stopColor="#A33AD1" />
          <stop offset="100%" stopColor="#E54699" />
        </linearGradient>
        <linearGradient id="crystalIconStroke" x1="4" y1="2" x2="36" y2="38">
          <stop offset="0%" stopColor="#A33AD1" />
          <stop offset="100%" stopColor="#FF963D" />
        </linearGradient>
        <linearGradient id="crystalIconInner" x1="10" y1="8" x2="30" y2="32">
          <stop offset="0%" stopColor="#E54699" />
          <stop offset="100%" stopColor="#FF963D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function BrandLogo({
  className,
  variant = "default",
  size = "md",
  showIcon = true,
}: BrandLogoProps) {
  const [logoExists, setLogoExists] = useState(false);

  useEffect(() => {
    fetch("/brand/crystal-media-logo.png", { method: "HEAD" })
      .then((res) => setLogoExists(res.ok))
      .catch(() => setLogoExists(false));
  }, []);

  const iconSizes = { sm: "w-7 h-7", md: "w-9 h-9", lg: "w-12 h-12" };
  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-lg",
  };

  if (logoExists) {
    const heights = { sm: "h-8", md: "h-10", lg: "h-14" };
    return (
      <Link href="/" className={cn("relative block", heights[size], className)}>
        <Image
          src="/brand/crystal-media-logo.png"
          alt="Crystal Media"
          fill
          className="object-contain object-left"
          priority
        />
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn("flex items-center gap-2.5 group", className)}
    >
      {showIcon && <CrystalIcon className={iconSizes[size]} />}
      <span
        className={cn(
          "font-display font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase truncate",
          textSizes[size],
          variant === "light" && "text-pearl-white",
          variant === "dark" && "text-ink-black",
          variant === "default" && "text-pearl-white"
        )}
      >
        Crystal Media
      </span>
    </Link>
  );
}
