"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { format } from "date-fns";
import { Search, ArrowUpRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPostData } from "@/types";

interface BlogListingProps {
  initialPosts: BlogPostData[];
  initialTotal: number;
  categories: string[];
}

function PostSkeleton() {
  return (
    <div className="rounded-[24px] overflow-hidden bg-white border border-ink-black/5 animate-pulse p-6 space-y-3">
      <div className="h-6 bg-ink-black/5 rounded-full w-20" />
      <div className="h-3 bg-ink-black/5 rounded w-1/3" />
      <div className="h-5 bg-ink-black/5 rounded w-3/4" />
      <div className="h-4 bg-ink-black/5 rounded w-full" />
    </div>
  );
}

export function BlogListing({
  initialPosts,
  initialTotal,
  categories,
}: BlogListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [posts, setPosts] = useState(initialPosts);
  const [total, setTotal] = useState(initialTotal);
  const [loading, setLoading] = useState(false);

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";

  const updateParams = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value) params.set(key, value);
        else params.delete(key);
      });
      startTransition(() => {
        router.push(`/blog?${params.toString()}`, { scroll: false });
      });
    },
    [router, searchParams]
  );

  useEffect(() => {
    if (!search && !category) {
      setPosts(initialPosts);
      setTotal(initialTotal);
      return;
    }

    const fetchPosts = async () => {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      if (category) params.set("category", category);
      params.set("limit", "20");

      try {
        const res = await fetch(`/api/blog?${params.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setPosts(data.posts);
          setTotal(data.total);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [search, category, initialPosts, initialTotal]);

  const hasFilters = Boolean(search || category);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-black/40"
            size={18}
          />
          <input
            type="search"
            placeholder="Search articles..."
            defaultValue={search}
            className="w-full pl-11 pr-4 py-3 bg-white border border-ink-black/10 rounded-[14px] text-ink-black text-sm placeholder:text-ink-black/40 focus:outline-none focus:border-royal-violet/50 transition-colors"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                updateParams({ search: (e.target as HTMLInputElement).value });
              }
            }}
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => updateParams({ category: "" })}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !category
              ? "bg-royal-violet text-pearl-white"
              : "bg-white border border-ink-black/10 text-ink-black/60 hover:border-royal-violet/30"
          )}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => updateParams({ category: cat })}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              category === cat
                ? "bg-royal-violet text-pearl-white"
                : "bg-white border border-ink-black/10 text-ink-black/60 hover:border-royal-violet/30"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {hasFilters && (
        <div className="flex items-center gap-3">
          <span className="text-xs text-ink-black/50 uppercase tracking-wide">
            {total} article{total !== 1 ? "s" : ""}
          </span>
          <button
            onClick={() => router.push("/blog")}
            className="inline-flex items-center gap-1 text-xs text-royal-violet hover:underline"
          >
            <X size={12} />
            Clear filters
          </button>
        </div>
      )}

      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
          (loading || isPending) && "opacity-60"
        )}
      >
        {(loading || isPending) && hasFilters
          ? Array.from({ length: 6 }).map((_, i) => <PostSkeleton key={i} />)
          : posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group block rounded-[24px] overflow-hidden bg-white border border-ink-black/5 hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)] transition-all duration-500 hover:-translate-y-1"
              >
                <div className="p-6">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-royal-violet/10 text-royal-violet rounded-full mb-4">
                    {post.category}
                  </span>
                  <div className="flex items-center gap-3 text-xs text-ink-black/40 mb-3">
                    {post.publishedAt && (
                      <time>{format(new Date(post.publishedAt), "MMM d, yyyy")}</time>
                    )}
                    <span>&middot;</span>
                    <span>{post.readingTime} min read</span>
                  </div>
                  <h3 className="font-display text-lg font-bold mb-2 group-hover:text-royal-violet transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-ink-black/60 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-royal-violet sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                    Read article <ArrowUpRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
      </div>

      {!loading && !isPending && posts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-ink-black/50 mb-4">No articles match your search.</p>
          <button
            onClick={() => router.push("/blog")}
            className="text-sm text-royal-violet hover:underline"
          >
            View all articles
          </button>
        </div>
      )}
    </div>
  );
}
