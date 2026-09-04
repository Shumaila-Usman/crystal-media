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
  sm: "h-11 w-[118px]",
  md: "h-16 w-[172px]",
  lg: "h-[5.25rem] w-[228px]",
  xl: "h-24 w-[264px]",
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
        sizes="(max-width: 640px) 200px, 300px"
      />
    </Link>
  );
}
