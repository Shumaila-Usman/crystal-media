"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { campaignInquirySchema, type CampaignInquiryInput } from "@/lib/validation";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle, AlertCircle } from "lucide-react";

const services = [
  "Luxury Influencer Marketing",
  "Public Relations",
  "Talent Management",
  "Brand Collaborations",
  "Social Media Strategy",
  "Events & Launches",
];

const budgets = [
  "Under PKR 100,000",
  "PKR 100,000 – 500,000",
  "PKR 500,000 – 1,000,000",
  "PKR 1,000,000 – 3,000,000",
  "PKR 3,000,000+",
  "Not sure yet",
];

const timelines = [
  "ASAP (within 2 weeks)",
  "1 month",
  "2–3 months",
  "3+ months",
  "Flexible",
];

interface CampaignFormProps {
  selectedCreator?: string;
  selectedCreatorName?: string;
  compact?: boolean;
  className?: string;
}

export function CampaignInquiryForm({
  selectedCreator,
  selectedCreatorName,
  compact = false,
  className,
}: CampaignFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CampaignInquiryInput>({
    resolver: zodResolver(campaignInquirySchema),
    defaultValues: {
      role: "brand",
      selectedTalent: selectedCreator || "",
      consent: undefined,
    },
  });

  const onSubmit = async (data: CampaignInquiryInput) => {
    if (data.honeypot) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          type: "campaign",
          selectedTalentName: selectedCreatorName,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setStatus("success");
      toast.success("Inquiry submitted! We'll be in touch soon.");
      reset();
    } catch (err) {
      setStatus("error");
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <div className={cn("glass-card rounded-[24px] p-8 text-center", className)}>
        <CheckCircle className="w-12 h-12 text-electric-purple mx-auto mb-4" />
        <h3 className="font-display text-xl font-bold mb-2">Thank you!</h3>
        <p className="text-muted-text text-sm">
          Your inquiry has been received. Our team will respond within 24–48 business hours.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-electric-purple hover:underline"
        >
          Submit another inquiry
        </button>
      </div>
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[14px] text-pearl-white text-sm placeholder:text-muted-text/50 focus:outline-none focus:border-electric-purple/50 transition-colors";
  const labelClass = "block text-xs font-medium text-muted-text mb-1.5 tracking-wide uppercase";
  const errorClass = "text-warm-coral text-xs mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("glass-card rounded-[20px] sm:rounded-[24px] p-4 sm:p-6 md:p-8 space-y-4", className)}
    >
      {!compact && (
        <div className="mb-2">
          <h3 className="font-display text-lg font-bold">Start Your Campaign</h3>
          <p className="text-muted-text text-sm mt-1">
            Tell us about your project and we&apos;ll craft a proposal.
          </p>
        </div>
      )}

      {selectedCreatorName && (
        <div className="px-4 py-2 bg-electric-purple/10 border border-electric-purple/20 rounded-[14px] text-sm">
          Selected creator: <strong>{selectedCreatorName}</strong>
        </div>
      )}

      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" {...register("selectedTalent")} />

      <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <label className={labelClass}>Full Name *</label>
          <input className={inputClass} placeholder="Your name" {...register("fullName")} />
          {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Business Email *</label>
          <input className={inputClass} type="email" placeholder="you@brand.com" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <label className={labelClass}>Phone / WhatsApp *</label>
          <input className={inputClass} placeholder="+92 3XX XXXXXXX" {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>I am a *</label>
          <select className={inputClass} {...register("role")}>
            <option value="brand">Brand</option>
            <option value="creator">Creator</option>
            <option value="agency">Agency Partner</option>
          </select>
        </div>
      </div>

      <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <label className={labelClass}>Service Required</label>
          <select className={inputClass} {...register("service")}>
            <option value="">Select a service</option>
            {services.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={labelClass}>Budget Range (PKR)</label>
          <select className={inputClass} {...register("budget")}>
            <option value="">Select budget</option>
            {budgets.map((b) => (
              <option key={b} value={b}>{b}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className={labelClass}>Campaign Timeline</label>
        <select className={inputClass} {...register("timeline")}>
          <option value="">Select timeline</option>
          {timelines.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>Project Details *</label>
        <textarea
          className={cn(inputClass, "min-h-[100px] resize-y")}
          placeholder="Tell us about your campaign goals, target audience, and any specific creators in mind..."
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="consent"
          className="mt-1 accent-electric-purple"
          {...register("consent")}
        />
        <label htmlFor="consent" className="text-xs text-muted-text leading-relaxed">
          I agree to Crystal Media&apos;s privacy policy and consent to being contacted about my inquiry.
        </label>
      </div>
      {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

      {status === "error" && (
        <div className="flex items-center gap-2 text-warm-coral text-sm">
          <AlertCircle size={16} />
          Submission failed. Please try again.
        </div>
      )}

      <Button type="submit" loading={status === "loading"} className="w-full">
        Submit Inquiry
      </Button>
    </form>
  );
}
