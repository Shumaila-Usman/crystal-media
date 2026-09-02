import Link from "next/link";
import { BrandLogo } from "@/components/shared/BrandLogo";
import {
  InstagramIcon,
  FacebookIcon,
  LinkedInIcon,
} from "@/components/shared/SocialIcons";
import type { ServiceData, SiteSettingsData } from "@/types";

interface FooterProps {
  services: ServiceData[];
  settings: SiteSettingsData;
}

export function Footer({ services, settings }: FooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-midnight-plum border-t border-white/5">
      <div className="container-xl py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="lg:col-span-1">
            <BrandLogo size="md" className="mb-4" />
            <p className="text-muted-text text-sm leading-relaxed max-w-xs">
              {settings.description ||
                "Premium influencer marketing, public relations, and talent management across Pakistan."}
            </p>
            <div className="flex items-center gap-4 mt-6">
              {settings.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="text-muted-text hover:text-crystal-magenta transition-colors touch-target p-2 -m-2"
                >
                  <InstagramIcon className="w-5 h-5" />
                </a>
              )}
              {settings.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="text-muted-text hover:text-crystal-magenta transition-colors touch-target p-2 -m-2"
                >
                  <FacebookIcon className="w-5 h-5" />
                </a>
              )}
              {settings.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="text-muted-text hover:text-crystal-magenta transition-colors touch-target p-2 -m-2"
                >
                  <LinkedInIcon className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          <div>
            <h3 className="font-display font-semibold text-pearl-white mb-4 text-sm tracking-wider uppercase">
              Services
            </h3>
            <ul className="space-y-2">
              {services.slice(0, 6).map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-muted-text hover:text-pearl-white text-sm transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-pearl-white mb-4 text-sm tracking-wider uppercase">
              Explore
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/talents", label: "Our Talent" },
                { href: "/packages", label: "Packages" },
                { href: "/testimonials", label: "Testimonials" },
                { href: "/blog", label: "Insights" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-text hover:text-pearl-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-pearl-white mb-4 text-sm tracking-wider uppercase">
              Locations
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/services/lahore", label: settings.locationLahore || "Lahore" },
                { href: "/services/karachi", label: settings.locationKarachi || "Karachi" },
                { href: "/services/islamabad", label: "Islamabad" },
                { href: "/services/pakistan", label: "Pakistan" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-text hover:text-pearl-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 space-y-1 text-sm text-muted-text">
              {settings.contactEmail ? (
                <p>
                  <a href={`mailto:${settings.contactEmail}`} className="hover:text-pearl-white transition-colors break-all">
                    {settings.contactEmail}
                  </a>
                </p>
              ) : (
                <p className="italic text-muted-text/60">Email — configure in admin</p>
              )}
              {settings.phone ? (
                <p>{settings.phone}</p>
              ) : (
                <p className="italic text-muted-text/60">Phone — configure in admin</p>
              )}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted-text text-xs">
            &copy; {year} Crystal Media. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="text-muted-text hover:text-pearl-white text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-text hover:text-pearl-white text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
