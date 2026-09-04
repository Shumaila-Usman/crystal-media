"use client";

import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Deep-dive into brand goals, audience demographics, and campaign KPIs to craft a winning strategy.",
  },
  {
    number: "02",
    title: "Match",
    description:
      "AI-assisted creator vetting matched with human intuition — finding voices that resonate authentically.",
  },
  {
    number: "03",
    title: "Execute",
    description:
      "End-to-end deal management, content coordination, and real-time campaign monitoring.",
  },
  {
    number: "04",
    title: "Amplify",
    description:
      "Performance analysis, ROI reporting, and optimization for scale on your next campaign.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-midnight-plum relative">
      <div className="container-xl">
        <Reveal>
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-crystal-magenta mb-4 text-center">
            How it works
          </p>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 text-center">
            From brief to brilliance
          </h2>
          <p className="text-muted-text text-center max-w-2xl mx-auto mb-16 leading-relaxed">
            A battle-tested four-step framework that removes friction and
            maximizes every collaboration.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          <div className="hidden lg:block absolute top-12 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-electric-purple/30 to-transparent" />

          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 0.15}>
              <div className="relative text-center lg:text-left">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full border border-electric-purple/30 bg-electric-purple/5 mb-6 relative z-10">
                  <span className="font-display text-lg font-bold gradient-text">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-bold mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-text text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
