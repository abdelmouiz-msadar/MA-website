import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { EmailText } from "@/components/ui/email-text";
import { ArrowUp } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { expertises } from "@/lib/content/expertises";
import { contactInfo, primaryNav } from "@/lib/content/navigation";
import { footerContent } from "@/lib/content/pages";
import { expertiseHref } from "@/lib/content/routes";
import { finalCta } from "@/lib/content/site";
import { ui } from "@/lib/content/ui";

const linkClass = "inline-block py-1 text-sm text-text/75 transition-colors duration-300 hover:text-text";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="theme-dark bg-background text-text">
      {/* Closing call to action */}
      <Container className="border-b border-text/10 py-section-y">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-end lg:gap-6">
          <div className="lg:col-span-8">
            <Reveal as="p" className="eyebrow text-muted">
              {finalCta.eyebrow}
            </Reveal>
            <Reveal as="h2" className="mt-5 max-w-3xl text-h1 font-semibold text-balance">
              {finalCta.title}
            </Reveal>
            <Reveal as="p" className="mt-6 max-w-xl text-lg text-muted">
              {finalCta.body}
            </Reveal>
          </div>
          <Reveal className="flex flex-col gap-6 sm:items-start lg:col-span-4 lg:items-end">
            <ButtonLink href={finalCta.cta.href} variant="inverted" className="w-full sm:w-auto">
              {finalCta.cta.label}
            </ButtonLink>
            <div className="flex flex-col gap-1 text-sm text-muted lg:items-end">
              <a href={`mailto:${contactInfo.email}`} className="py-1 transition-colors hover:text-text">
                <EmailText email={contactInfo.email} />
              </a>
              <a href={`tel:${contactInfo.phoneHref}`} className="py-1 whitespace-nowrap transition-colors hover:text-text">
                {contactInfo.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="grid grid-cols-2 gap-x-6 gap-y-12 py-section-y-sm md:grid-cols-12">
        <div className="col-span-2 md:col-span-12 lg:col-span-4">
          <Image src="/brand/ma-plus-logo-white.svg" alt={contactInfo.companyName} width={210} height={46} className="h-[46px] w-auto" />
          <p className="mt-8 max-w-sm text-h3 font-semibold">{footerContent.motto}</p>
          <p className="mt-4 max-w-sm text-sm text-muted">{footerContent.tagline}</p>
        </div>

        <nav aria-label={ui.footerNav} className="col-span-1 md:col-span-4 lg:col-span-2">
          <h2 className="eyebrow text-muted">{ui.navigation}</h2>
          <ul className="mt-5 flex flex-col">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className={linkClass}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-1 md:col-span-4 lg:col-span-3">
          <h2 className="eyebrow text-muted">{footerContent.expertisesHeading}</h2>
          <ul className="mt-5 flex flex-col">
            {expertises.map((exp) => (
              <li key={exp.slug}>
                <Link href={expertiseHref(exp.slug)} className={linkClass}>
                  {exp.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-4 lg:col-span-3">
          <h2 className="eyebrow text-muted">{footerContent.contactHeading}</h2>
          <ul className="mt-5 flex flex-col">
            <li>
              <a href={`mailto:${contactInfo.email}`} className={linkClass}>
                <EmailText email={contactInfo.email} />
              </a>
            </li>
            <li>
              <a href={`tel:${contactInfo.phoneHref}`} className={`${linkClass} whitespace-nowrap`}>
                {contactInfo.phone}
              </a>
            </li>
          </ul>
          <address className="mt-4 text-sm text-text/75 not-italic">
            {contactInfo.addressLines.map((line) => (
              <span key={line} className="block py-0.5">
                {line}
              </span>
            ))}
          </address>
        </div>

        <div className="col-span-2 flex flex-col gap-4 border-t border-text/10 pt-6 text-sm text-muted md:col-span-12 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {contactInfo.companyName} — {footerContent.rights}
            <span className="block md:mt-1">{footerContent.certifications}</span>
          </span>
          <a href="#main-content" className="group inline-flex w-fit items-center gap-2 py-1 transition-colors hover:text-text">
            {ui.backToTop}
            <ArrowUp size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </Container>
    </footer>
  );
}
