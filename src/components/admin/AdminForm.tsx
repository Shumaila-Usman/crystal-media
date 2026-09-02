"use client";

import { cn } from "@/lib/utils";

interface AdminFormProps {
  title?: string;
  description?: string;
  onSubmit: (e: React.FormEvent) => void;
  children: React.ReactNode;
  loading?: boolean;
  submitLabel?: string;
  cancelLabel?: string;
  onCancel?: () => void;
  className?: string;
}

export function AdminForm({
  title,
  description,
  onSubmit,
  children,
  loading,
  submitLabel = "Save",
  cancelLabel = "Cancel",
  onCancel,
  className,
}: AdminFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      className={cn("glass-card rounded-2xl p-6", className)}
    >
      {(title || description) && (
        <div className="mb-6">
          {title && (
            <h2 className="font-display text-lg font-semibold text-pearl-white">
              {title}
            </h2>
          )}
          {description && (
            <p className="mt-1 text-sm text-muted-text">{description}</p>
          )}
        </div>
      )}

      <div className="space-y-4">{children}</div>

      <div className="mt-6 flex items-center gap-3 border-t border-white/8 pt-6">
        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-electric-purple px-5 py-2.5 text-sm font-medium text-pearl-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Saving..." : submitLabel}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-xl border border-white/10 px-5 py-2.5 text-sm text-muted-text transition-colors hover:border-white/20 hover:text-pearl-white"
          >
            {cancelLabel}
          </button>
        )}
      </div>
    </form>
  );
}

export function FormField({
  label,
  children,
  hint,
  required,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-pearl-white">
        {label}
        {required && <span className="ml-1 text-electric-purple">*</span>}
      </label>
      {children}
      {hint && <p className="mt-1 text-xs text-muted-text">{hint}</p>}
    </div>
  );
}

export const inputClassName =
  "w-full rounded-xl border border-white/10 bg-ink-black/50 px-4 py-2.5 text-sm text-pearl-white placeholder:text-muted-text focus:border-electric-purple/50 focus:outline-none";

export const textareaClassName =
  "w-full rounded-xl border border-white/10 bg-ink-black/50 px-4 py-2.5 text-sm text-pearl-white placeholder:text-muted-text focus:border-electric-purple/50 focus:outline-none min-h-[100px] resize-y";

export const selectClassName =
  "w-full rounded-xl border border-white/10 bg-ink-black/50 px-4 py-2.5 text-sm text-pearl-white focus:border-electric-purple/50 focus:outline-none";
