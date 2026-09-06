"use client";

import { useState, useMemo, useId } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  campaignInquirySchema,
  homepageInquirySchema,
  type CampaignInquiryInput,
  type HomepageInquiryInput,
} from "@/lib/validation";
import { Button } from "@/components/shared/Button";
import { FormSelect, type FormSelectOption } from "@/components/forms/FormSelect";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle, AlertCircle } from "lucide-react";

const services = [
  "Social Media Marketing",
  "Influencer Marketing",
  "Talent Management",
  "Brand Collaborations",
  "Public Relations",
  "Events & Launches",
];

const budgets = [
  "Under Rs. 5 Lac",
  "Rs. 5 Lac – Rs. 25 Lac",
  "Rs. 25 Lac – Rs. 1 Crore",
  "Rs. 1 Crore+",
];

const timelines = [
  "ASAP (within 2 weeks)",
  "1 month",
  "2–3 months",
  "3+ months",
  "Flexible",
];

const roleOptions: FormSelectOption[] = [
  { value: "brand", label: "Brand / Company" },
  { value: "creator", label: "Creator / Influencer" },
  { value: "agency", label: "Agency Partner" },
];

const roleOptionsCompact: FormSelectOption[] = [
  { value: "brand", label: "Brand" },
  { value: "creator", label: "Creator" },
  { value: "agency", label: "Agency Partner" },
];

const budgetOptions: FormSelectOption[] = [
  { value: "", label: "Select range" },
  ...budgets.map((budget) => ({ value: budget, label: budget })),
];

const serviceOptions: FormSelectOption[] = [
  { value: "", label: "Select a service" },
  ...services.map((service) => ({ value: service, label: service })),
];

const timelineOptions: FormSelectOption[] = [
  { value: "", label: "Select timeline" },
  ...timelines.map((timeline) => ({ value: timeline, label: timeline })),
];

interface CampaignFormProps {
  selectedCreator?: string;
  selectedCreatorName?: string;
  compact?: boolean;
  variant?: "full" | "homepage" | "sidebar";
  defaultService?: string;
  className?: string;
}

function SuccessState({
  className,
  onReset,
}: {
  className?: string;
  onReset: () => void;
}) {
  return (
    <div className={cn("rounded-[20px] border border-white/10 bg-white/[0.03] p-8 text-center", className)}>
      <CheckCircle className="w-12 h-12 text-electric-purple mx-auto mb-4" />
      <h3 className="font-display text-xl font-bold mb-2">Thank you!</h3>
      <p className="text-muted-text text-sm">
        Your inquiry has been received. Our team will respond within 24 hours.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-4 text-sm text-electric-purple hover:underline"
      >
        Submit another inquiry
      </button>
    </div>
  );
}

export function CampaignInquiryForm({
  selectedCreator,
  selectedCreatorName,
  compact = false,
  variant = "full",
  defaultService,
  className,
}: CampaignFormProps) {
  const isHomepage = variant === "homepage";
  const isSidebar = variant === "sidebar";
  const defaultMessage = useMemo(
    () =>
      selectedCreatorName
        ? `I'd like to book ${selectedCreatorName} for a campaign.`
        : defaultService
          ? `I'm interested in ${defaultService}.`
          : "",
    [selectedCreatorName, defaultService]
  );

  if (isHomepage) {
    return (
      <HomepageForm
        className={className}
        selectedCreator={selectedCreator}
        selectedCreatorName={selectedCreatorName}
        defaultMessage={defaultMessage}
      />
    );
  }

  if (isSidebar) {
    return (
      <SidebarForm
        className={className}
        selectedCreator={selectedCreator}
        selectedCreatorName={selectedCreatorName}
        defaultService={defaultService}
        defaultMessage={defaultMessage}
      />
    );
  }

  return (
    <FullForm
      className={className}
      compact={compact}
      selectedCreator={selectedCreator}
      selectedCreatorName={selectedCreatorName}
      defaultService={defaultService}
    />
  );
}

function HomepageForm({
  selectedCreator,
  selectedCreatorName,
  defaultMessage,
  className,
}: {
  selectedCreator?: string;
  selectedCreatorName?: string;
  defaultMessage: string;
  className?: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<HomepageInquiryInput>({
    resolver: zodResolver(homepageInquirySchema),
    defaultValues: {
      role: "brand",
      selectedTalent: selectedCreator || "",
      message: defaultMessage,
    },
  });

  const onSubmit = async (data: HomepageInquiryInput) => {
    if (data.honeypot) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          consent: true,
          type: "campaign",
          selectedTalentName: selectedCreatorName,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setStatus("success");
      toast.success("Message sent! We'll be in touch soon.");
      reset();
    } catch (err) {
      setStatus("error");
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <SuccessState
        className={className}
        onReset={() => setStatus("idle")}
      />
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-pearl-white text-base placeholder:text-muted-text/50 focus:outline-none focus:border-electric-purple/50 transition-colors";
  const labelClass = "block text-sm font-medium text-pearl-white/80 mb-1.5";
  const errorClass = "text-warm-coral text-xs mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
    >
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" {...register("selectedTalent")} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full name</label>
          <input className={inputClass} placeholder="Your name" {...register("fullName")} />
          {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email</label>
          <input className={inputClass} type="email" placeholder="you@brand.com" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>I am a</label>
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormSelect
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={roleOptions}
                placeholder="Select role"
              />
            )}
          />
        </div>
        <div>
          <label className={labelClass}>Budget (PKR)</label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <FormSelect
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={budgetOptions}
                placeholder="Select range"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Tell us about your project</label>
        <textarea
          className={cn(inputClass, "min-h-[120px] resize-y")}
          placeholder="Campaign goals, timeline, platforms..."
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-warm-coral text-sm">
          <AlertCircle size={16} />
          Submission failed. Please try again.
        </div>
      )}

      <Button type="submit" loading={status === "loading"} className="w-full min-h-[48px]">
        Send Message
      </Button>
    </form>
  );
}

function FullForm({
  selectedCreator,
  selectedCreatorName,
  compact,
  defaultService,
  className,
}: {
  selectedCreator?: string;
  selectedCreatorName?: string;
  compact?: boolean;
  defaultService?: string;
  className?: string;
}) {
  const consentId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CampaignInquiryInput>({
    resolver: zodResolver(campaignInquirySchema),
    defaultValues: {
      role: "brand",
      selectedTalent: selectedCreator || "",
      service: defaultService || "",
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
      <SuccessState
        className={className}
        onReset={() => setStatus("idle")}
      />
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-[14px] text-pearl-white text-base placeholder:text-muted-text/50 focus:outline-none focus:border-electric-purple/50 transition-colors";
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
          <Controller
            name="role"
            control={control}
            render={({ field }) => (
              <FormSelect
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={roleOptionsCompact}
                placeholder="Select role"
              />
            )}
          />
        </div>
      </div>

      <div className={compact ? "space-y-4" : "grid grid-cols-1 md:grid-cols-2 gap-4"}>
        <div>
          <label className={labelClass}>Service Required</label>
          <Controller
            name="service"
            control={control}
            render={({ field }) => (
              <FormSelect
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={serviceOptions}
                placeholder="Select a service"
              />
            )}
          />
        </div>
        <div>
          <label className={labelClass}>Budget (PKR)</label>
          <Controller
            name="budget"
            control={control}
            render={({ field }) => (
              <FormSelect
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                options={budgetOptions}
                placeholder="Select range"
              />
            )}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Campaign Timeline</label>
        <Controller
          name="timeline"
          control={control}
          render={({ field }) => (
            <FormSelect
              value={field.value || ""}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={timelineOptions}
              placeholder="Select timeline"
            />
          )}
        />
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

      <div className="flex items-start gap-3 py-1">
        <input
          type="checkbox"
          id={consentId}
          className="mt-0.5 accent-electric-purple min-h-[20px] min-w-[20px] shrink-0"
          {...register("consent")}
        />
        <label htmlFor={consentId} className="text-sm text-muted-text leading-relaxed py-2 -my-2">
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
        Submit inquiry
      </Button>
    </form>
  );
}

function SidebarForm({
  selectedCreator,
  selectedCreatorName,
  defaultService,
  defaultMessage,
  className,
}: {
  selectedCreator?: string;
  selectedCreatorName?: string;
  defaultService?: string;
  defaultMessage: string;
  className?: string;
}) {
  const consentId = useId();
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CampaignInquiryInput>({
    resolver: zodResolver(campaignInquirySchema),
    defaultValues: {
      role: "brand",
      selectedTalent: selectedCreator || "",
      service: defaultService || "",
      message: defaultMessage,
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
      reset({
        role: "brand",
        selectedTalent: selectedCreator || "",
        service: defaultService || "",
        message: defaultMessage,
      });
    } catch (err) {
      setStatus("error");
      toast.error(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  if (status === "success") {
    return (
      <SuccessState
        className={className}
        onReset={() => setStatus("idle")}
      />
    );
  }

  const inputClass =
    "w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-pearl-white text-sm placeholder:text-muted-text/50 focus:outline-none focus:border-electric-purple/50 transition-colors";
  const labelClass = "block text-xs font-medium text-pearl-white/70 mb-1.5";
  const errorClass = "text-warm-coral text-xs mt-1";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("space-y-4", className)}
    >
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />
      <input type="hidden" {...register("selectedTalent")} />
      <input type="hidden" {...register("service")} />

      <div>
        <label className={labelClass}>Full name</label>
        <input className={inputClass} placeholder="Your name" {...register("fullName")} />
        {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Email</label>
        <input className={inputClass} type="email" placeholder="you@brand.com" {...register("email")} />
        {errors.email && <p className={errorClass}>{errors.email.message}</p>}
      </div>

      <div>
        <label className={labelClass}>Phone / WhatsApp</label>
        <input className={inputClass} placeholder="+92 3XX XXXXXXX" {...register("phone")} />
        {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
      </div>

      <div>
        <label className={labelClass}>I am a</label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <FormSelect
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              options={roleOptionsCompact}
              placeholder="Select role"
            />
          )}
        />
      </div>

      <div>
        <label className={labelClass}>Tell us about your project</label>
        <textarea
          className={cn(inputClass, "min-h-[110px] resize-y")}
          placeholder="Campaign goals, timeline, platforms..."
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id={consentId}
          className="mt-0.5 accent-electric-purple min-h-[18px] min-w-[18px] shrink-0"
          {...register("consent")}
        />
        <label htmlFor={consentId} className="text-xs leading-relaxed text-muted-text">
          I agree to Crystal Media&apos;s privacy policy and consent to being contacted.
        </label>
      </div>
      {errors.consent && <p className={errorClass}>{errors.consent.message}</p>}

      {status === "error" && (
        <div className="flex items-center gap-2 text-warm-coral text-sm">
          <AlertCircle size={16} />
          Submission failed. Please try again.
        </div>
      )}

      <Button type="submit" loading={status === "loading"} className="w-full min-h-[48px]">
        Send message
      </Button>
    </form>
  );
}
