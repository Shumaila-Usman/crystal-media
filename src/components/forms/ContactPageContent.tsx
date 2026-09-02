"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { CampaignInquiryForm } from "@/components/forms/CampaignInquiryForm";
import { CreatorApplicationForm } from "@/components/forms/CreatorApplicationForm";
import { cn } from "@/lib/utils";
import type { TalentData } from "@/types";

interface ContactPageContentProps {
  selectedTalent?: TalentData | null;
}

export function ContactPageContent({ selectedTalent }: ContactPageContentProps) {
  const searchParams = useSearchParams();
  const creatorParam = searchParams.get("creator");

  const defaultTab =
    creatorParam || selectedTalent ? "campaign" : "campaign";

  const [activeTab, setActiveTab] = useState<"campaign" | "creator">(
    searchParams.get("tab") === "creator" ? "creator" : defaultTab
  );

  const tabs = [
    { id: "campaign" as const, label: "Brand Campaign Inquiry" },
    { id: "creator" as const, label: "Creator Application" },
  ];

  return (
    <div>
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "px-5 py-3 rounded-full text-sm font-medium transition-colors min-h-[48px]",
              activeTab === tab.id
                ? "bg-gradient-to-r from-royal-violet to-crystal-magenta text-pearl-white"
                : "glass-card hover:border-electric-purple/30"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "campaign" ? (
        <CampaignInquiryForm
          selectedCreator={selectedTalent?.slug || creatorParam || undefined}
          selectedCreatorName={selectedTalent?.name}
        />
      ) : (
        <CreatorApplicationForm />
      )}
    </div>
  );
}
