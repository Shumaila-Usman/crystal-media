"use client";

import Image from "next/image";
import { TalentPlaceholder } from "./TalentPlaceholder";
import type { TalentData } from "@/types";
import { cn, formatFollowers } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface TalentCardProps {
  talent: TalentData;
  className?: string;
  showDetails?: boolean;
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
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              style={{
                objectPosition: talent.imageObjectPosition || "center top",
              }}
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
