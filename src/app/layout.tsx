import type { Metadata, Viewport } from "next";
import { Sora, Manrope } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/layout/Providers";
import { PublicChrome } from "@/components/layout/PublicChrome";
import { getSiteSettings, getServices } from "@/lib/data";
import { organizationJsonLd } from "@/lib/seo";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings();
  return {
    title: {
      default: settings.defaultSeoTitle,
      template: `%s | Crystal Media`,
    },
    description: settings.defaultSeoDescription,
    metadataBase: new URL(
      process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
    ),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, services] = await Promise.all([
    getSiteSettings(),
    getServices(),
  ]);
  const jsonLd = organizationJsonLd(settings);

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable} h-full`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {settings.googleAnalyticsId && (
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${settings.googleAnalyticsId}`}
          />
        )}
      </head>
      <body className="min-h-full flex flex-col font-body antialiased">
        <Providers>
          <PublicChrome settings={settings} services={services}>
            {children}
          </PublicChrome>
        </Providers>
      </body>
    </html>
  );
}
