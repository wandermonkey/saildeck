import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { WhatsAppFab } from "@/components/WhatsAppFab";
import { JsonLd } from "@/components/JsonLd";
import { localBusinessSchema, organizationSchema, websiteSchema } from "@/lib/seo";
import { site } from "@/lib/site";

/* Self-hosted by next/font at build time: no render-blocking request to
   Google, no layout shift, and `display: swap` keeps text visible. */
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Saildeck — Yacht Charters, Speedboats & Marine Services in India",
    // Every page title ends with the brand, which keeps SERP listings
    // consistent and builds recall across impressions.
    template: "%s | Saildeck",
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "yacht rental Mumbai",
    "yacht charter Goa",
    "speedboat Mumbai to Alibaug",
    "speedboat Mumbai to Elephanta",
    "buy a yacht in India",
    "yacht management India",
    "sailing school Mumbai",
    "boat rental Navi Mumbai",
  ],
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "en_IN", siteName: site.name, url: site.url },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  formatDetection: { telephone: true },
};

export const viewport: Viewport = {
  themeColor: "#0a2a43",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* No `js` class script here any more. Scroll-reveal now arms itself
            from the component, so nothing on the page depends on hydration
            having succeeded in order to be visible. */}
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body className="antialiased">
        <JsonLd data={[organizationSchema(), websiteSchema(), localBusinessSchema()]} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
