"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  creatorApplicationSchema,
  type CreatorApplicationInput,
} from "@/lib/validation";
import { Button } from "@/components/shared/Button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle, AlertCircle } from "lucide-react";

interface CreatorApplicationFormProps {
  className?: string;
}

export function CreatorApplicationForm({ className }: CreatorApplicationFormProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreatorApplicationInput>({
    resolver: zodResolver(creatorApplicationSchema),
  });

  const onSubmit = async (data: CreatorApplicationInput) => {
    if (data.honeypot) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, type: "creator" }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Submission failed");
      }

      setStatus("success");
      toast.success("Application submitted! We'll review and get back to you.");
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
        <h3 className="font-display text-xl font-bold mb-2">Application received!</h3>
        <p className="text-muted-text text-sm">
          Thank you for applying. Our talent team reviews every submission and will
          respond within 5–7 business days.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 text-sm text-electric-purple hover:underline"
        >
          Submit another application
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
      className={cn("glass-card rounded-[24px] p-6 md:p-8 space-y-4", className)}
    >
      <div className="mb-2">
        <h3 className="font-display text-lg font-bold">Creator Application</h3>
        <p className="text-muted-text text-sm mt-1">
          Join our roster of premium creators and unlock brand partnership opportunities.
        </p>
      </div>

      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input className={inputClass} placeholder="Your name" {...register("fullName")} />
          {errors.fullName && <p className={errorClass}>{errors.fullName.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Email *</label>
          <input className={inputClass} type="email" placeholder="you@email.com" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Phone / WhatsApp *</label>
          <input className={inputClass} placeholder="+92 3XX XXXXXXX" {...register("phone")} />
          {errors.phone && <p className={errorClass}>{errors.phone.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Niche / Category *</label>
          <input className={inputClass} placeholder="e.g. Fashion, Beauty, Fitness" {...register("niche")} />
          {errors.niche && <p className={errorClass}>{errors.niche.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Platforms *</label>
          <input
            className={inputClass}
            placeholder="Instagram, YouTube..."
            {...register("platforms")}
          />
          {errors.platforms && <p className={errorClass}>{errors.platforms.message}</p>}
        </div>
        <div>
          <label className={labelClass}>Follower Counts *</label>
          <input
            className={inputClass}
            placeholder="e.g. IG: 150K, YouTube: 80K"
            {...register("followers")}
          />
          {errors.followers && <p className={errorClass}>{errors.followers.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass}>Tell us about yourself *</label>
        <textarea
          className={cn(inputClass, "min-h-[100px] resize-y")}
          placeholder="Share your content style, past brand partnerships, and why you'd like to join Crystal Media..."
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-3">
        <input
          type="checkbox"
          id="creator-consent"
          className="mt-1 accent-electric-purple"
          {...register("consent")}
        />
        <label htmlFor="creator-consent" className="text-xs text-muted-text leading-relaxed">
          I agree to Crystal Media&apos;s privacy policy and consent to being contacted about my application.
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
        Submit Application
      </Button>
    </form>
  );
}
