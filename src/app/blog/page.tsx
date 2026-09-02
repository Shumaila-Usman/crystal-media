import { Suspense } from "react";
import { getBlogPosts } from "@/lib/data";
import { seedBlogPosts } from "@/data/seed";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { BlogListing } from "@/components/blog/BlogListing";
import { CTASection } from "@/components/sections/CTASection";

export const metadata = buildMetadata({
  title: "Insights & Blog | Crystal Media",
  description:
    "Expert insights on influencer marketing, creator partnerships, PR strategy, and brand campaigns in Pakistan.",
  path: "/blog",
});

function ListingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-[24px] overflow-hidden bg-white border border-ink-black/5 animate-pulse">
          <div className="h-48 bg-ink-black/5" />
          <div className="p-6 space-y-3">
            <div className="h-3 bg-ink-black/5 rounded w-1/3" />
            <div className="h-5 bg-ink-black/5 rounded w-3/4" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function BlogPage() {
  const { posts, total } = await getBlogPosts({ limit: 20 });
  const categories = [...new Set(seedBlogPosts.map((p) => p.category))].sort();

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Insights
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Inside <span className="gradient-text">influence</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              Strategy, trends, and practical guides for brands navigating
              influencer marketing and PR in Pakistan.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-soft-lavender text-ink-black">
        <div className="container-xl">
          <Suspense fallback={<ListingSkeleton />}>
            <BlogListing
              initialPosts={posts}
              initialTotal={total}
              categories={categories}
            />
          </Suspense>
        </div>
      </section>

      <CTASection />
    </>
  );
}
