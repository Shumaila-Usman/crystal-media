import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/shared/SocialIcons";

const DEFAULT_MESSAGE = "Hi Crystal Media, I'd like to get in touch.";

interface WhatsAppCTAProps {
  number: string;
  message?: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline" | "green";
}

export function WhatsAppCTA({
  number,
  message = DEFAULT_MESSAGE,
  label = "Chat on WhatsApp",
  className,
  variant = "outline",
}: WhatsAppCTAProps) {
  if (!number) return null;

  return (
    <a
      href={getWhatsAppLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-full transition-all duration-300 min-h-[48px]",
        variant === "solid" &&
          "text-pearl-white hover:shadow-[0_8px_32px_rgba(37,211,102,0.35)] hover:scale-[1.02] active:scale-[0.98] bg-[#25D366]",
        variant === "green" &&
          "text-white bg-[#25D366] hover:bg-[#20bd5a] shadow-[0_4px_20px_rgba(37,211,102,0.35)]",
        variant === "outline" &&
          "hero-outline-btn text-pearl-white hover:bg-white/5 w-full sm:w-auto",
        className
      )}
    >
      <WhatsAppIcon size={18} />
      {label}
    </a>
  );
}
