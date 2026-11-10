import type { Metadata, Viewport } from "next";
import { Barlow_Condensed, Montserrat } from "next/font/google";
import { Navbar2 } from "@/components/relume/Navbar2";
import { Footer4 } from "@/components/relume/Footer4";
import { RevealInit } from "@/components/RevealInit";
import { themeScript } from "@/components/ThemeToggle";
import { site } from "@/lib/content";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["600", "700", "900"], style: ["normal", "italic"], variable: "--font-montserrat", display: "swap" });
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["700", "800", "900"], style: ["normal", "italic"], variable: "--font-barlow", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: "Workin Gamerz | Hawaiʻi Esports Leagues for Gamers with Jobs", template: "%s | Workin Gamerz" },
  description: "Workin Gamerz runs Hawaiʻi esports leagues, tournaments and community events for working adults. Work hard. Play together.",
  robots: site.previewMode ? { index: false, follow: false } : undefined,
  openGraph: { type: "website", siteName: site.name, images: ["/img/community.jpg"] },
};

export const viewport: Viewport = { themeColor: [{ media: "(prefers-color-scheme: light)", color: "#f5f3ee" }, { media: "(prefers-color-scheme: dark)", color: "#0b0d13" }] };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${barlow.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[3000] focus:bg-gold focus:px-4 focus:py-2 focus:text-night">
          Skip to content
        </a>
        <Navbar2 />
        <main id="main">{children}</main>
        <Footer4 />
        <span className="cursor" aria-hidden />
        <RevealInit />
      </body>
    </html>
  );
}
