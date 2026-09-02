import Link from "next/link";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/data";
import {
  buildMetadata,
  breadcrumbJsonLd,
  articleJsonLd,
  SITE_URL,
} from "@/lib/seo";
import { sanitizeHtml } from "@/lib/utils";
import { Reveal } from "@/components/motion/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { ChevronRight, Clock, User, ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

interface BlogArticleProps {
  params: Promise<{ slug: string }>;
}

function extractHeadings(html: string): { id: string; text: string }[] {
  const matches = html.matchAll(/<h2[^>]*>(.*?)<\/h2>/gi);
  return Array.from(matches).map((m, i) => ({
    id: `section-${i}`,
    text: m[1].replace(/<[^>]+>/g, ""),
  }));
}

function addHeadingIds(html: string): string {
  let index = 0;
  return html.replace(/<h2([^>]*)>/gi, () => {
    const id = `section-${index++}`;
    return `<h2 id="${id}"$1>`;
  });
}

export async function generateStaticParams() {
  const { posts } = await getBlogPosts({ limit: 100 });
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: BlogArticleProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.seoTitle || `${post.title} | Crystal Media`,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage,
    type: "article",
  });
}

export default async function BlogArticlePage({ params }: BlogArticleProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  const { posts: allPosts } = await getBlogPosts({ limit: 20 });
  const relatedPosts = allPosts
    .filter((p) => p.slug !== post.slug)
    .filter((p) => p.category === post.category || p.featured)
    .slice(0, 3);

  const headings = extractHeadings(post.content);
  const contentWithIds = addHeadingIds(post.content);
  const safeContent = sanitizeHtml(contentWithIds);

  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: "Insights", url: `${SITE_URL}/blog` },
    { name: post.title, url: `${SITE_URL}/blog/${post.slug}` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd(breadcrumbs)),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd(post)),
        }}
      />

      <article>
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
          <div className="container-xl relative z-10 max-w-4xl">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-muted-text mb-8 flex-wrap">
              <Link href="/" className="hover:text-pearl-white transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/blog" className="hover:text-pearl-white transition-colors">Insights</Link>
              <ChevronRight size={14} />
              <span className="text-pearl-white line-clamp-1">{post.title}</span>
            </nav>

            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-medium bg-electric-purple/20 text-electric-purple rounded-full mb-4">
                {post.category}
              </span>
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                {post.title}
              </h1>
              <p className="text-muted-text text-lg leading-relaxed mb-6">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-text">
                <span className="flex items-center gap-1.5">
                  <User size={14} />
                  {post.author}
                </span>
                {post.publishedAt && (
                  <time>
                    {format(new Date(post.publishedAt), "MMMM d, yyyy")}
                  </time>
                )}
                <span className="flex items-center gap-1.5">
                  <Clock size={14} />
                  {post.readingTime} min read
                </span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section-padding bg-pearl-white text-ink-black">
          <div className="container-xl">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-5xl mx-auto">
              {headings.length > 0 && (
                <aside className="lg:col-span-1 order-2 lg:order-1">
                  <nav className="sticky top-28" aria-label="Table of contents">
                    <h2 className="text-xs font-medium uppercase tracking-widest text-ink-black/40 mb-4">
                      Contents
                    </h2>
                    <ul className="space-y-2">
                      {headings.map((h) => (
                        <li key={h.id}>
                          <a
                            href={`#${h.id}`}
                            className="text-sm text-ink-black/60 hover:text-royal-violet transition-colors"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </aside>
              )}

              <div className={headings.length > 0 ? "lg:col-span-3 order-1 lg:order-2" : "lg:col-span-4"}>
                <div
                  className="prose-blog max-w-none"
                  dangerouslySetInnerHTML={{ __html: safeContent }}
                />
              </div>
            </div>
          </div>
        </section>

        {relatedPosts.length > 0 && (
          <section className="section-padding bg-soft-lavender text-ink-black">
            <div className="container-xl">
              <Reveal>
                <h2 className="font-display text-2xl sm:text-3xl font-bold mb-8">
                  Related articles
                </h2>
              </Reveal>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((related, i) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group block rounded-[24px] overflow-hidden bg-white border border-ink-black/5 hover:shadow-[0_20px_60px_rgba(78,32,74,0.08)] transition-all duration-500 hover:-translate-y-1"
                  >
                    <div
                      className="h-36 relative"
                      style={{
                        background: `linear-gradient(135deg, hsl(${260 + i * 20}, 40%, 30%), hsl(${300 + i * 15}, 50%, 40%))`,
                      }}
                    >
                      <span className="absolute top-3 left-3 px-2 py-0.5 text-xs font-medium bg-white/90 text-royal-violet rounded-full">
                        {related.category}
                      </span>
                    </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold mb-2 group-hover:text-royal-violet transition-colors line-clamp-2">
                        {related.title}
                      </h3>
                      <span className="inline-flex items-center gap-1 text-sm font-medium text-royal-violet">
                        Read <ArrowUpRight size={14} />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>

      <CTASection />
    </>
  );
}
