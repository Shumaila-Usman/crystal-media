"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const LOGO_SRC = "/brand/crystal-media-logo.png";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-10 w-[108px]",
  md: "h-14 w-[150px]",
  lg: "h-[4.5rem] w-[195px]",
  xl: "h-20 w-[220px]",
};

export function BrandLogo({ className, size = "md" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Crystal Media home"
      className={cn("relative block shrink-0", sizeClasses[size], className)}
    >
      <Image
        src={LOGO_SRC}
        alt="Crystal Media"
        fill
        className="object-contain object-left"
        priority
        sizes="(max-width: 640px) 150px, 220px"
      />
    </Link>
  );
}
