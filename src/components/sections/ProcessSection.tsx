"use client";

import { Reveal } from "@/components/motion/Reveal";

const steps = [
  {
    number: "01",
    title: "Discover",
    description:
      "Understand the brand, audience, objectives, budget, and campaign KPIs.",
  },
  {
    number: "02",
    title: "Curate",
    description:
      "Match the brand with creators based on audience quality, brand fit, content style, and reputation.",
  },
  {
    number: "03",
    title: "Create",
    description:
      "Manage briefs, approvals, negotiations, production, timelines, and publishing.",
  },
  {
    number: "04",
    title: "Amplify",
    description:
      "Track performance, report results, repurpose content, and optimize the next campaign.",
  },
];

export function ProcessSection() {
  return (
    <section className="section-padding bg-midnight-plum relative">
      <div className="container-xl">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-16 text-center">
            From first brief to lasting influence.
          </h2>
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
