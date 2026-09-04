"use client";

import { useCallback, useMemo, useState } from "react";
import { TalentCard } from "@/components/talent/TalentCard";
import { Button } from "@/components/shared/Button";
import type { TalentData } from "@/types";
import { AlertCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface TalentDirectoryProps {
  initialTalents: TalentData[];
  initialTotal: number;
}

const nicheFilters = [
  "All",
  "Fashion",
  "Tech",
  "Fitness",
  "Beauty",
  "Travel",
  "Lifestyle",
  "Food",
  "Gaming",
  "Entertainment",
  "Drama",
];

function TalentSkeleton() {
  return (
    <div className="rounded-[20px] overflow-hidden border border-ink-black/[0.06] bg-white animate-pulse">
      <div className="bg-ink-black/5" style={{ aspectRatio: "4/5" }} />
      <div className="space-y-3 p-5">
        <div className="h-5 w-2/3 rounded bg-ink-black/5" />
        <div className="h-4 w-1/3 rounded bg-ink-black/5" />
      </div>
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
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredTalents = useMemo(() => {
    if (activeFilter === "All") return talents;
    const needle = activeFilter.toLowerCase();
    return talents.filter(
      (t) =>
        t.niche.toLowerCase().includes(needle) ||
        t.specialties.some((s) => s.toLowerCase().includes(needle))
    );
  }, [talents, activeFilter]);

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
      <div className="flex flex-wrap gap-2">
        {nicheFilters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setActiveFilter(filter)}
            className={cn(
              "px-4 py-2.5 rounded-full text-sm font-medium transition-colors min-h-[44px]",
              activeFilter === filter
                ? "bg-gradient-to-r from-royal-violet to-crystal-magenta text-pearl-white"
                : "border border-ink-black/10 bg-white text-ink-black hover:border-royal-violet/30"
            )}
          >
            {filter}
          </button>
        ))}
      </div>

      <p className="text-sm text-muted-text">
        Showing {filteredTalents.length} creator{filteredTalents.length === 1 ? "" : "s"}
      </p>

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
            "grid grid-cols-1 min-[400px]:grid-cols-2 lg:grid-cols-3 gap-5",
            loading && page === 1 && "opacity-60"
          )}
        >
          {loading && page === 1
            ? Array.from({ length: 8 }).map((_, i) => <TalentSkeleton key={i} />)
            : filteredTalents.map((talent) => (
                <TalentCard key={talent.slug} talent={talent} />
              ))}
        </div>
      )}

      {!error && !loading && filteredTalents.length === 0 && (
        <div className="glass-card rounded-[24px] p-12 text-center">
          <Users className="w-12 h-12 text-muted-text mx-auto mb-4" />
          <h3 className="font-display text-xl font-bold mb-2">No creators match your search</h3>
          <p className="text-muted-text text-sm mb-4">
            Try a different filter or check back soon for new talent.
          </p>
          <Button size="sm" variant="secondary" onClick={() => setActiveFilter("All")}>
            Clear filters
          </Button>
        </div>
      )}

      {hasMore && !error && !loading && activeFilter === "All" && (
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
