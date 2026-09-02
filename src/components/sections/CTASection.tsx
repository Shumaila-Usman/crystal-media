import Link from "next/link";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/shared/Button";
import { getWhatsAppLink } from "@/lib/utils";
import { getSiteSettings } from "@/lib/data";
import { MessageCircle } from "lucide-react";

export async function CTASection() {
  const settings = await getSiteSettings();
  const whatsapp = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-deep-aubergine via-royal-violet/80 to-crystal-plum" />
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-electric-purple/20 blur-[100px] aurora-blob" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-crystal-magenta/15 blur-[80px] aurora-blob" style={{ animationDelay: "-5s" }} />
      </div>

      <div className="container-xl relative z-10 text-center">
        <Reveal>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 max-w-2xl mx-auto">
            Ready to create a campaign people remember?
          </h2>
          <p className="text-muted-text max-w-lg mx-auto mb-8">
            Let&apos;s craft something extraordinary together. Start with a brief or reach out directly.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link href="/contact">
              <Button size="lg">Start a Campaign</Button>
            </Link>
            {whatsapp && (
              <a
                href={getWhatsAppLink(whatsapp, "Hi Crystal Media, I'd like to discuss a campaign.")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="secondary" size="lg" icon={<MessageCircle size={18} />}>
                  Talk on WhatsApp
                </Button>
              </a>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
