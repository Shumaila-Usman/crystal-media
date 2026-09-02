import { getWhatsAppLink } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/shared/SocialIcons";

const DEFAULT_MESSAGE = "Hi Crystal Media, I'd like to get in touch.";

interface WhatsAppFloatButtonProps {
  number: string;
  message?: string;
}

export function WhatsAppFloatButton({
  number,
  message = DEFAULT_MESSAGE,
}: WhatsAppFloatButtonProps) {
  if (!number) return null;

  return (
    <a
      href={getWhatsAppLink(number, message)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contact us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_28px_rgba(37,211,102,0.45)] transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6 animate-[whatsapp-pulse_2.5s_ease-in-out_infinite]"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
