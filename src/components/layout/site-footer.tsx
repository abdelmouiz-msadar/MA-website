import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { primaryNav, contactInfo } from "@/lib/content/navigation";
import { expertises } from "@/lib/content/expertises";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-ink text-white/70">
      <Container className="py-16 sm:py-20">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-6">
            <Image
              src="/brand/ma-plus-logo-full.svg"
              alt="Maintenance Assistance Plus"
              width={190}
              height={64}
              className="h-10 w-auto"
            />
            <p className="max-w-[36ch] text-[15px] leading-relaxed text-white/60">
              Experts multi-techniques, fiables et réactifs. Facility Management et maintenance
              multi-technique au service de la continuité de vos infrastructures.
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 mb-5">Navigation</p>
            <ul className="flex flex-col gap-3">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-[15px] text-white/70 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 mb-5">Expertises</p>
            <ul className="flex flex-col gap-3">
              {expertises.slice(0, 6).map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/expertises/${item.slug}`}
                    className="text-[15px] text-white/70 hover:text-white"
                  >
                    {item.shortLabel ?? item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/40 mb-5">Contact</p>
            <address className="not-italic flex flex-col gap-3 text-[15px] text-white/70">
              {contactInfo.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
              <a href={`tel:${contactInfo.phoneHref}`} className="hover:text-white">
                {contactInfo.phone}
              </a>
              <a href={`mailto:${contactInfo.email}`} className="hover:text-white break-all">
                {contactInfo.email}
              </a>
            </address>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[13px] text-white/40">
            © {year} Maintenance Assistance Plus. Tous droits réservés.
          </p>
          <p className="text-[13px] text-white/40">ISO 9001 · ISO 45001 · ISO 14001 — Certifié Bureau Veritas</p>
        </div>
      </Container>
    </footer>
  );
}
