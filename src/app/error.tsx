"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <section className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center px-4">
        <h1 className="font-display text-2xl font-bold mb-4">Something went wrong</h1>
        <p className="text-muted-text mb-8 max-w-md mx-auto">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="px-6 py-3 bg-gradient-to-r from-royal-violet to-crystal-magenta rounded-[18px] text-sm font-medium"
        >
          Try Again
        </button>
      </div>
    </section>
  );
}
