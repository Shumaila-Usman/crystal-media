import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Privacy Policy | Crystal Media",
  description:
    "Crystal Media privacy policy — how we collect, use, and protect your personal information.",
  path: "/privacy-policy",
});

const sections = [
  {
    title: "Information We Collect",
    content: `We collect information you provide directly when submitting campaign inquiries, creator applications, or contacting us through our website. This may include your name, email address, phone number, company name, social media handles, and any message content you submit through our forms.

We also automatically collect certain technical information when you visit our website, including your IP address, browser type, device information, and pages visited. This data helps us improve our website experience and understand how visitors interact with our content.`,
  },
  {
    title: "How We Use Your Information",
    content: `We use the information we collect to respond to your inquiries, process campaign and creator applications, communicate about our services, and improve our website and offerings. With your consent, we may also send you relevant updates about Crystal Media services and industry insights.

We do not sell your personal information to third parties. We may share information with trusted service providers who assist us in operating our website and delivering our services, subject to confidentiality obligations.`,
  },
  {
    title: "Cookies & Analytics",
    content: `Our website may use cookies and similar tracking technologies to enhance your browsing experience and analyze site traffic. You can control cookie preferences through your browser settings. We may use analytics tools such as Google Analytics to understand website usage patterns.

Third-party platforms embedded on our site (such as social media links) may collect information according to their own privacy policies.`,
  },
  {
    title: "Data Security",
    content: `We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.`,
  },
  {
    title: "Your Rights",
    content: `You have the right to access, correct, or delete your personal information held by us. You may also withdraw consent for marketing communications at any time. To exercise these rights, please contact us through our contact page or email us directly.`,
  },
  {
    title: "Changes to This Policy",
    content: `We may update this privacy policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
];

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="container-xl relative z-10 max-w-3xl">
          <Reveal>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Privacy Policy
            </h1>
            <p className="text-muted-text">
              Last updated: September 2025
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section-padding bg-pearl-white text-ink-black">
        <div className="container-xl max-w-3xl">
          <Reveal>
            <p className="text-ink-black/70 leading-relaxed mb-12">
              Crystal Media (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is committed to protecting
              your privacy. This policy explains how we collect, use, and safeguard
              your information when you visit{" "}
              <Link href="/" className="text-royal-violet hover:underline">
                crystalmedia.pk
              </Link>{" "}
              or interact with our services.
            </p>
          </Reveal>

          <div className="space-y-10">
            {sections.map((section, i) => (
              <Reveal key={section.title} delay={i * 0.05}>
                <h2 className="font-display text-xl font-bold mb-4">
                  {section.title}
                </h2>
                <p className="text-ink-black/70 leading-relaxed whitespace-pre-line">
                  {section.content}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.3}>
            <div className="mt-12 p-6 rounded-[20px] bg-royal-violet/5 border border-royal-violet/10">
              <p className="text-sm text-ink-black/70">
                Questions about this policy?{" "}
                <Link href="/contact" className="text-royal-violet hover:underline">
                  Contact us
                </Link>
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
