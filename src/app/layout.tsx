import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${lato.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white text-ink">
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Aller au contenu
        </a>
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
