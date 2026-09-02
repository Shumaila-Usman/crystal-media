"use client";

import { cn, getPlaceholderGradient, getTalentPlaceholderFilename } from "@/lib/utils";

interface TalentPlaceholderProps {
  name: string;
  slug: string;
  className?: string;
  aspectRatio?: string;
}

export function TalentPlaceholder({
  name,
  slug,
  className,
  aspectRatio = "4/5",
}: TalentPlaceholderProps) {
  const gradient = getPlaceholderGradient(name);
  const filename = getTalentPlaceholderFilename(slug);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden rounded-[20px]",
        className
      )}
      style={{
        background: gradient,
        aspectRatio,
      }}
    >
      <div className="absolute inset-0 opacity-20 grid-texture" />
      <div className="relative z-10 text-center px-4">
        <div className="w-12 h-12 mx-auto mb-3 rounded-full border border-white/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
        <p className="text-white/60 text-xs font-medium tracking-wide uppercase mb-1">
          Replace with
        </p>
        <p className="text-white/90 text-sm font-semibold break-all">{filename}</p>
        <p className="text-white/40 text-xs mt-2">1200 × 1500 · 4:5</p>
      </div>
    </div>
  );
}
