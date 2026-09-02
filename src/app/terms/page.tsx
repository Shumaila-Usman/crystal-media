import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = buildMetadata({
  title: "Terms of Service | Crystal Media",
  description:
    "Crystal Media terms of service — the terms governing use of our website and services.",
  path: "/terms",
});

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By accessing or using the Crystal Media website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our website or services.

These terms apply to all visitors, users, brand clients, and creators who access or use our services.`,
  },
  {
    title: "Services Description",
    content: `Crystal Media provides influencer marketing, public relations, talent management, brand collaboration, social media strategy, and event activation services. Specific deliverables, timelines, and fees are defined in individual service agreements or proposals agreed upon between Crystal Media and the client.

We reserve the right to modify, suspend, or discontinue any aspect of our services at any time.`,
  },
  {
    title: "Client Responsibilities",
    content: `Brand clients agree to provide accurate campaign briefs, timely feedback, and necessary brand assets for campaign execution. Clients are responsible for ensuring they have the rights to any materials they provide for use in campaigns.

Payment terms, cancellation policies, and revision limits are specified in individual service agreements.`,
  },
  {
    title: "Creator Representation",
    content: `Creators represented by Crystal Media enter into separate representation agreements that govern commission structures, exclusivity terms, and deliverable expectations. Application to our talent roster does not guarantee representation.

Crystal Media reserves the right to accept or decline creator applications at its sole discretion.`,
  },
  {
    title: "Intellectual Property",
    content: `Content created during campaigns is subject to usage rights defined in individual campaign agreements. Unless otherwise specified, brands receive agreed-upon usage rights for campaign content, while creators retain ownership of their likeness and personal brand.

The Crystal Media name, logo, and website content are protected intellectual property and may not be used without written permission.`,
  },
  {
    title: "Limitation of Liability",
    content: `Crystal Media provides services on a best-efforts basis. We are not liable for indirect, incidental, or consequential damages arising from the use of our services. Our total liability for any claim is limited to the fees paid for the specific service giving rise to the claim.

Campaign performance metrics (reach, engagement, conversions) are estimates and not guaranteed outcomes.`,
  },
  {
    title: "Governing Law",
    content: `These terms are governed by the laws of Pakistan. Any disputes arising from these terms or our services shall be subject to the exclusive jurisdiction of the courts in Lahore, Pakistan.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-deep-aubergine/40 to-ink-black" />
        <div className="container-xl relative z-10 max-w-3xl">
          <Reveal>
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              Terms of Service
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
              These Terms of Service (&quot;Terms&quot;) govern your use of the Crystal Media
              website and services. Please read them carefully before engaging with
              our agency.
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
                Questions about these terms?{" "}
                <Link href="/contact" className="text-royal-violet hover:underline">
                  Contact us
                </Link>
                . See also our{" "}
                <Link href="/privacy-policy" className="text-royal-violet hover:underline">
                  Privacy Policy
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
