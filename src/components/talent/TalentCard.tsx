"use client";

import Image from "next/image";
import { TalentPlaceholder } from "./TalentPlaceholder";
import type { TalentData } from "@/types";
import { cn, formatFollowersLong } from "@/lib/utils";
import Link from "next/link";

interface TalentCardProps {
  talent: TalentData;
  className?: string;
}

function getCategoryLabel(niche: string): string {
  const first = niche.split(/[&/,]/)[0]?.trim() || niche;
  return first.toUpperCase();
}

function formatLocation(city: string): string {
  if (/pakistan/i.test(city)) return city;
  return `${city}, PK`;
}

function PlatformBadge({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={
        label === "IG" ? "Instagram" : label === "TT" ? "TikTok" : "YouTube"
      }
      className="flex h-8 w-8 items-center justify-center rounded-lg bg-royal-violet/10 text-[10px] font-bold text-royal-violet transition-colors hover:bg-royal-violet/20"
      onClick={(e) => e.stopPropagation()}
    >
      {label}
    </a>
  );
}

export function TalentCard({ talent, className }: TalentCardProps) {
  const hasImage = talent.image && talent.image.length > 0;
  const platforms = [
    talent.platforms.instagram && { label: "IG", href: talent.platforms.instagram },
    talent.platforms.tiktok && { label: "TT", href: talent.platforms.tiktok },
    talent.platforms.youtube && { label: "YT", href: talent.platforms.youtube },
  ].filter(Boolean) as { label: string; href: string }[];

  return (
    <article
      className={cn(
        "group h-full overflow-hidden rounded-[20px] border border-ink-black/[0.06] bg-white shadow-[0_2px_16px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(78,32,74,0.12)]",
        className
      )}
    >
      <Link href={`/talents/${talent.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[4/5] overflow-hidden bg-ink-black/5">
          {hasImage ? (
            <Image
              src={talent.image}
              alt={talent.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              style={{
                objectPosition: talent.imageObjectPosition || "center top",
              }}
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          ) : (
            <TalentPlaceholder
              name={talent.name}
              slug={talent.slug}
              className="h-full w-full rounded-none"
            />
          )}

          <span className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold tracking-wide text-ink-black uppercase shadow-sm">
            {getCategoryLabel(talent.niche)}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <h3 className="font-display text-base sm:text-lg font-bold text-ink-black leading-tight">
            {talent.name}
          </h3>
          <p className="mt-1 text-sm text-ink-black/45">
            {formatLocation(talent.city)}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <p className="text-xl sm:text-2xl font-bold text-royal-violet leading-none">
                {formatFollowersLong(talent.totalFollowers)}
              </p>
              <p className="mt-1.5 text-[10px] font-medium tracking-[0.12em] text-ink-black/40 uppercase">
                Followers
              </p>
            </div>
            <div>
              <p className="text-xl sm:text-2xl font-bold text-royal-violet leading-none">
                {talent.engagementRate}%
              </p>
              <p className="mt-1.5 text-[10px] font-medium tracking-[0.12em] text-ink-black/40 uppercase">
                Engagement
              </p>
            </div>
          </div>

          {platforms.length > 0 && (
            <div className="mt-4 flex gap-2 border-t border-ink-black/[0.06] pt-4">
              {platforms.map((platform) => (
                <PlatformBadge
                  key={platform.label}
                  label={platform.label}
                  href={platform.href}
                />
              ))}
            </div>
          )}
        </div>
      </Link>
    </article>
  );
}
