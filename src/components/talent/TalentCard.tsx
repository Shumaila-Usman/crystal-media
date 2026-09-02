"use client";

import Image from "next/image";
import { TalentPlaceholder } from "./TalentPlaceholder";
import type { TalentData } from "@/types";
import { cn, formatFollowers } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { InstagramIcon } from "@/components/shared/SocialIcons";

interface TalentCardProps {
  talent: TalentData;
  className?: string;
  showDetails?: boolean;
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.76a4.85 4.85 0 0 1-1.01-.07z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

export function TalentCard({
  talent,
  className,
  showDetails = false,
}: TalentCardProps) {
  const hasImage = talent.image && talent.image.length > 0;

  return (
    <article
      className={cn(
        "group relative rounded-[20px] sm:rounded-[24px] overflow-hidden glass-card transition-all duration-500 hover:shadow-[0_20px_60px_rgba(163,58,209,0.15)]",
        className
      )}
    >
      <Link href={`/talents/${talent.slug}`} className="block">
        <div className="relative overflow-hidden" style={{ aspectRatio: "4/5" }}>
          {hasImage ? (
            <Image
              src={talent.image}
              alt={`${talent.niche} creator — ${talent.city}`}
              fill
              className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, 33vw"
            />
          ) : (
            <TalentPlaceholder name={talent.name} slug={talent.slug} className="w-full h-full rounded-none" />
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-ink-black/70 via-ink-black/10 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-500" />

          {talent.featured && (
            <span className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2.5 py-1 text-[10px] sm:text-xs font-semibold tracking-wider uppercase bg-gradient-to-r from-royal-violet to-crystal-magenta rounded-full">
              Featured
            </span>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 translate-y-0 opacity-100 sm:translate-y-4 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 transition-all duration-500">
            {showDetails ? (
              <>
                <p className="text-soft-lavender/90 text-sm mb-2">{talent.niche}</p>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-text">
                  <span>{talent.city}</span>
                  <span>·</span>
                  <span>{formatFollowers(talent.totalFollowers)} followers</span>
                </div>
              </>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-pearl-white">
                View Profile
                <ArrowUpRight size={14} />
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300">
        <Link
          href={`/contact?creator=${talent.slug}`}
          className="flex items-center gap-1 px-3 py-2 text-xs font-medium bg-white/10 backdrop-blur-md rounded-full border border-white/20 hover:bg-white/20 transition-colors min-h-[36px] sm:min-h-0"
          onClick={(e) => e.stopPropagation()}
        >
          Collaborate
          <ArrowUpRight size={12} />
        </Link>
      </div>
    </article>
  );
}
