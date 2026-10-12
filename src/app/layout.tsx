import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { ui } from "@/lib/content/ui";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Maintenance Assistance Plus — Facility Management & Maintenance multi-technique",
    template: "%s — Maintenance Assistance Plus",
  },
  description:
    "Experts multi-techniques, fiables et réactifs. Maintenance Assistance Plus accompagne les entreprises dans la gestion, la maintenance et l'optimisation de leurs infrastructures.",
  metadataBase: new URL("https://www.maintenanceassistanceplus.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Maintenance Assistance Plus",
  },
};

export const viewport: Viewport = {
  themeColor: "#fafafa",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={manrope.variable}>
      <body className="font-sans">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a href="#main-content" className="skip-link">
          {ui.skipToContent}
        </a>
        <SiteHeader />
        <main id="main-content" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
