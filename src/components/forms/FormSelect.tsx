"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FormSelectOption {
  value: string;
  label: string;
}

interface FormSelectProps {
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  options: FormSelectOption[];
  placeholder?: string;
  className?: string;
  id?: string;
}

export function FormSelect({
  value = "",
  onChange,
  onBlur,
  options,
  placeholder = "Select...",
  className,
  id,
}: FormSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selected = options.find(
    (option) => option.value === value && option.value !== ""
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        onBlur?.();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        onBlur?.();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [onBlur]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        type="button"
        id={id}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => setOpen((current) => !current)}
        className={cn(
          "flex w-full items-center justify-between gap-2 px-4 py-3",
          "rounded-[14px] border bg-white/5 text-base transition-colors",
          "focus:outline-none",
          open
            ? "border-electric-purple/60"
            : "border-white/10 focus:border-electric-purple/50",
          selected ? "text-pearl-white" : "text-muted-text/70"
        )}
      >
        <span className="truncate text-left">
          {selected?.label ?? placeholder}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            "shrink-0 text-muted-text transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-56 w-full overflow-auto rounded-[14px] border border-white/10 bg-ink-black py-1 shadow-[0_16px_48px_rgba(0,0,0,0.65)]"
        >
          {options.map((option) => {
            const isSelected = option.value === value;

            return (
              <li
                key={option.value || `placeholder-${option.label}`}
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                  onBlur?.();
                }}
                className={cn(
                  "cursor-pointer px-4 py-2.5 text-sm transition-colors",
                  isSelected
                    ? "bg-electric-purple/35 text-pearl-white"
                    : "text-pearl-white/90 hover:bg-white/10"
                )}
              >
                {option.label}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
