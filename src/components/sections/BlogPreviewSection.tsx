import Link from "next/link";
import { getBlogPosts } from "@/lib/data";
import { Reveal } from "@/components/motion/Reveal";
import { format } from "date-fns";
import { ArrowUpRight } from "lucide-react";

export async function BlogPreviewSection() {
  const { posts } = await getBlogPosts({ limit: 3 });

  return (
    <section className="section-padding bg-soft-lavender text-ink-black">
      <div className="container-xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-royal-violet mb-4">
            Blog
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <h2 className="font-display text-3xl sm:text-4xl font-bold">
              Latest insights
            </h2>
            <Link
              href="/blog"
              className="text-sm font-medium text-royal-violet hover:underline shrink-0"
            >
              View all articles →
            </Link>
          </div>
          <p className="text-ink-black/60 max-w-2xl mb-12 leading-relaxed">
            Strategy notes on influencer marketing, social campaigns, and growing
            brands in Pakistan.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <Reveal key={post.slug} delay={i * 0.1}>
              <Link
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
