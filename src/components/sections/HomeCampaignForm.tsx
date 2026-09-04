"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { Reveal } from "@/components/motion/Reveal";

interface HomeCampaignFormProps {
  creatorSlug?: string;
  creatorName?: string;
}

export function HomeCampaignForm({
  creatorSlug,
  creatorName,
}: HomeCampaignFormProps) {
  const searchParams = useSearchParams();
  const creatorFromUrl = searchParams.get("creator");
  const resolvedName =
    creatorName ||
    (creatorFromUrl ? decodeURIComponent(creatorFromUrl) : undefined);

  useEffect(() => {
    if (window.location.hash === "#contact" || creatorFromUrl) {
      const el = document.getElementById("contact");
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [creatorFromUrl]);

  return (
    <section
      id="contact"
      className="section-padding bg-ink-black border-t border-white/5 scroll-mt-20"
    >
      <div className="container-xl max-w-3xl">
        <Reveal>
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="font-display text-2xl sm:text-3xl font-bold mb-2">
              Start a project
            </h2>
            <p className="text-muted-text">We reply within 24 hours.</p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <CampaignInquiryForm
            variant="homepage"
            selectedCreator={creatorSlug}
            selectedCreatorName={resolvedName}
          />
        </Reveal>
      </div>
    </section>
  );
}
