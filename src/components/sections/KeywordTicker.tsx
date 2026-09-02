import { keywordTicker } from "@/data/seed";

function DiamondSeparator() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" className="mx-6 shrink-0 opacity-40">
      <path d="M6 0L12 6L6 12L0 6Z" fill="url(#diamondGrad)" />
      <defs>
        <linearGradient id="diamondGrad" x1="0" y1="0" x2="12" y2="12">
          <stop offset="0%" stopColor="#A33AD1" />
          <stop offset="100%" stopColor="#FF963D" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function KeywordTicker() {
  const items = [...keywordTicker, ...keywordTicker];

  return (
    <section className="py-6 border-y border-white/5 bg-midnight-plum/50 overflow-hidden">
      <div className="marquee-track">
        {items.map((keyword, i) => (
          <span key={`${keyword}-${i}`} className="flex items-center shrink-0">
            <span className="text-sm font-medium tracking-wider uppercase text-muted-text whitespace-nowrap px-2">
              {keyword}
            </span>
            <DiamondSeparator />
          </span>
        ))}
      </div>
    </section>
  );
}
