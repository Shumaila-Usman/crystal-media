"use client";

import { cn } from "@/lib/utils";
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  loading?: boolean;
  icon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      loading,
      icon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const base =
      "relative inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 rounded-[18px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-purple focus-visible:ring-offset-2 focus-visible:ring-offset-ink-black disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary:
        "bg-gradient-to-r from-royal-violet via-electric-purple to-crystal-magenta text-pearl-white hover:shadow-[0_8px_32px_rgba(163,58,209,0.35)] active:scale-[0.98]",
      secondary:
        "bg-white/5 border border-white/10 text-pearl-white hover:bg-white/10 hover:border-white/20 active:scale-[0.98]",
      ghost: "text-pearl-white hover:bg-white/5 active:scale-[0.98]",
      outline:
        "border border-electric-purple/40 text-pearl-white hover:bg-electric-purple/10 active:scale-[0.98]",
    };

    const sizes = {
      sm: "px-4 py-2 text-sm",
      md: "px-6 py-3 text-sm",
      lg: "px-8 py-4 text-base",
    };

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? (
          <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            {children}
            {icon && <span className="ml-1">{icon}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
