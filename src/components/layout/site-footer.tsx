import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ArrowRight, MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { contactInfo, primaryNav } from "@/lib/content/navigation";
import { expertises } from "@/lib/content/expertises";
import { expertiseHref, routes } from "@/lib/content/routes";
import { footerContent } from "@/lib/content/pages";
import { finalCta } from "@/lib/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white text-ink">
      <Container>
        <div className="flex flex-col gap-8 border-b border-line py-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col items-start gap-5">
            <Image src="/brand/ma-plus-logo-full.svg" alt="Maintenance Assistance Plus" width={190} height={64} className="h-14 w-auto" />
            <p className="max-w-[46ch] text-[15px] leading-relaxed text-muted">{footerContent.tagline}</p>
          </div>
          <ButtonLink href={routes.contact} variant="outline" className="self-start sm:self-auto">
            {finalCta.cta.label}
          </ButtonLink>
        </div>

        <div className="grid grid-cols-1 gap-12 border-b border-line py-12 lg:grid-cols-[1.4fr_1fr]">
          <nav aria-label="Pied de page" className="grid grid-cols-1 content-start gap-x-12 sm:grid-cols-2">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between gap-6 border-b border-line/60 py-3 text-[24px] font-bold text-navy transition-colors hover:text-brand sm:max-w-[320px] sm:border-none sm:py-2.5 lg:text-[28px]"
              >
                {item.label}
                <ArrowRight size={22} className="shrink-0 text-brand transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </nav>

          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-1">
            <div>
              <p className="mb-4 text-[15px] font-bold text-navy">Nos expertises</p>
              <ul className="grid grid-cols-1 gap-x-8 gap-y-2.5 lg:grid-cols-2">
                {expertises.map((exp) => (
                  <li key={exp.slug}>
                    <Link href={expertiseHref(exp.slug)} className="text-[15px] text-ink transition-colors hover:text-brand">
                      {exp.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-4 text-[15px] font-bold text-navy">Contact</p>
              <address className="flex flex-col gap-3 text-[15px] not-italic text-ink">
                <span className="flex items-start gap-3">
                  <PinIcon size={18} className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    {contactInfo.companyName}
                    {contactInfo.addressLines.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
                <a href={`tel:${contactInfo.phoneHref}`} className="flex items-center gap-3 hover:text-brand">
                  <PhoneIcon size={18} className="shrink-0 text-brand" /> {contactInfo.phone}
                </a>
                <a href={`mailto:${contactInfo.email}`} className="flex items-center gap-3 break-words hover:text-brand">
                  <MailIcon size={18} className="shrink-0 text-brand" /> {contactInfo.email}
                </a>
              </address>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 py-8 text-[14px] text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {contactInfo.companyName}. {footerContent.rights}
          </p>
          <p>{footerContent.certifications}</p>
        </div>
      </Container>
      <div className="brand-line" />
    </footer>
  );
}
