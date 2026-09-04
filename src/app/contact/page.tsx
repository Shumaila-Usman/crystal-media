import { Suspense } from "react";
import { getTalentBySlug, getFAQs, getSiteSettings, resolveTalentQuery } from "@/lib/data";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";
import { ContactPageContent } from "@/components/forms/ContactPageContent";
import { FAQSection } from "@/components/sections/FAQSection";
import { getWhatsAppLink } from "@/lib/utils";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from "@/components/shared/SocialIcons";

export const metadata = buildMetadata({
  title: "Contact | Crystal Media",
  description:
    "Start a campaign, apply as a creator, or get in touch with Crystal Media — Pakistan's premium influencer marketing and PR agency.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{ creator?: string }>;
}

function FormSkeleton() {
  return (
    <div className="glass-card rounded-[24px] p-8 animate-pulse space-y-4">
      <div className="h-6 bg-white/5 rounded w-1/3" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-10 bg-white/5 rounded" />
      <div className="h-24 bg-white/5 rounded" />
    </div>
  );
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { creator } = await searchParams;
  const [settings, faqs, selectedTalent] = await Promise.all([
    getSiteSettings(),
    getFAQs(),
    creator ? resolveTalentQuery(creator) : Promise.resolve(null),
  ]);

  const whatsapp = settings.whatsappNumber || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const contactFaqs = faqs.slice(0, 4);

  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full bg-electric-purple/10 blur-[120px] aurora-blob" />
        <div className="container-xl relative z-10">
          <Reveal>
            <p className="text-electric-purple text-sm font-medium tracking-widest uppercase mb-4">
              Get in Touch
            </p>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-bold max-w-3xl mb-6">
              Let&apos;s create something{" "}
              <span className="gradient-text">extraordinary</span>
            </h1>
            <p className="text-muted-text text-lg max-w-2xl leading-relaxed">
              Whether you&apos;re a brand ready to launch a campaign or a creator
              seeking representation — we&apos;d love to hear from you.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-ink-black">
        <div className="container-xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3">
              <Suspense fallback={<FormSkeleton />}>
                <ContactPageContent selectedTalent={selectedTalent} />
              </Suspense>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <Reveal delay={0.1}>
                <div className="glass-card rounded-[24px] p-6 space-y-5">
                  <h2 className="font-display text-lg font-bold">Contact details</h2>

                  {whatsapp && (
                    <a
                      href={getWhatsAppLink(whatsapp, "Hi Crystal Media, I'd like to get in touch.")}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3.5 text-sm font-semibold text-white transition-all hover:bg-[#20bd5a] min-h-[48px]"
                    >
                      <WhatsAppIcon size={18} />
                      Chat on WhatsApp
                    </a>
                  )}

                  {settings.contactEmail && (
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-center gap-3 text-sm text-muted-text hover:text-pearl-white transition-colors"
                    >
                      <Mail size={16} className="text-electric-purple shrink-0" />
                      {settings.contactEmail}
                    </a>
                  )}

                  {settings.phone && (
                    <a
                      href={`tel:${settings.phone.replace(/\s/g, "")}`}
                      className="flex items-center gap-3 text-sm text-muted-text hover:text-pearl-white transition-colors"
                    >
                      <Phone size={16} className="text-electric-purple shrink-0" />
                      {settings.phone}
                    </a>
                  )}

                  {settings.instagramUrl && (
                    <a
                      href={settings.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-text hover:text-pearl-white transition-colors"
                    >
                      <InstagramIcon size={16} className="text-electric-purple shrink-0" />
                      @crystal_media.pk
                    </a>
                  )}

                  {settings.facebookUrl && (
                    <a
                      href={settings.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-sm text-muted-text hover:text-pearl-white transition-colors"
                    >
                      <FacebookIcon size={16} className="text-electric-purple shrink-0" />
                      Crystal Media Agency
                    </a>
                  )}

                  <div className="flex items-start gap-3 text-sm text-muted-text">
                    <MapPin size={16} className="text-electric-purple shrink-0 mt-0.5" />
                    <div>
                      <p>{settings.locationLahore}</p>
                      <p>{settings.locationKarachi}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-sm text-muted-text">
                    <Clock size={16} className="text-electric-purple shrink-0 mt-0.5" />
                    <div>
                      <p>{settings.businessHours}</p>
                      <p className="text-xs mt-1">{settings.responseTime}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={contactFaqs} />
    </>
  );
}
