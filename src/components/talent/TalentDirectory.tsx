"use client";

import { useCallback, useState } from "react";
import { TalentCard } from "@/components/talent/TalentCard";
import { Button } from "@/components/shared/Button";
import type { TalentData } from "@/types";
import { AlertCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TalentDirectoryProps {
  initialTalents: TalentData[];
  initialTotal: number;
}

function TalentSkeleton() {
  return (
    <div className="rounded-[24px] overflow-hidden glass-card animate-pulse">
      <div className="bg-white/5" style={{ aspectRatio: "4/5" }} />
    </div>
  );
}

export function TalentDirectory({
  initialTalents,
  initialTotal,
}: TalentDirectoryProps) {
  const [talents, setTalents] = useState(initialTalents);
  const [total, setTotal] = useState(initialTotal);
  const [page, setPage] = useState(1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const hasMore = talents.length < total;

  const fetchTalents = useCallback(async (pageNum: number, append = false) => {
    setLoading(true);
    setError(null);

    const params = new URLSearchParams();
    params.set("page", String(pageNum));
    params.set("limit", "12");

    try {
      const res = await fetch(`/api/talents?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to load talents");
      const data = await res.json();
      setTalents((prev) => (append ? [...prev, ...data.talents] : data.talents));
      setTotal(data.total);
      setPage(pageNum);
    } catch {
      setError("Unable to load creators. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="space-y-8">
      {error && (
        <div className="glass-card rounded-[20px] p-6 text-center">
          <AlertCircle className="w-8 h-8 text-warm-coral mx-auto mb-3" />
          <p className="text-sm text-muted-text mb-4">{error}</p>
          <Button size="sm" onClick={() => fetchTalents(page)}>
            Try again
          </Button>
        </div>
      )}

      {!error && (
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6",
            loading && page === 1 && "opacity-60"
          )}
        >
          {loading && page === 1
            ? Array.from({ length: 8 }).map((_, i) => <TalentSkeleton key={i} />)
            : talents.map((talent) => (
                <TalentCard key={talent.slug} talent={talent} />
              ))}
        </div>
      )}

      {!error && !loading && talents.length === 0 && (
        <div className="glass-card rounded-[24px] p-12 text-center">
          <Users className="w-12 h-12 text-muted-text mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">No creators found</h3>
          <p className="text-muted-text text-sm">
            Check back soon for new talent on our roster.
          </p>
        </div>
      )}

      {hasMore && !error && !loading && (
        <div className="text-center pt-4">
          <Button
            variant="secondary"
            loading={loading}
            onClick={() => fetchTalents(page + 1, true)}
          >
            Load more creators
          </Button>
        </div>
      )}
    </div>
  );
}
