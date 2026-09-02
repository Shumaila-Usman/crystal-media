import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { Reveal } from "@/components/motion/Reveal";

export function CampaignFormSection() {
  return (
    <section
      id="campaign-form"
      className="section-padding bg-midnight-plum relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-ink-black/50 to-transparent pointer-events-none" />
      <div className="container-xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase text-crystal-magenta mb-4">
              Start Your Campaign
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Tell us about your vision.
            </h2>
            <p className="text-muted-text leading-relaxed max-w-md">
              Share your campaign brief and our team will craft a tailored
              proposal with the right creators, strategy, and timeline for your
              brand.
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <CampaignInquiryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
