import Link from "next/link";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Page Not Found",
  description: "The page you're looking for doesn't exist.",
  path: "/404",
});

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-ink-black">
      <div className="text-center px-4">
        <p className="text-8xl font-display font-bold gradient-text mb-4">404</p>
        <h1 className="font-display text-2xl font-bold mb-4">Page not found</h1>
        <p className="text-muted-text mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-royal-violet to-crystal-magenta rounded-[18px] text-sm font-medium hover:shadow-lg transition-shadow"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
