import type { Metadata } from "next";
import { Suspense } from "react";
import { ContactForm, ContactFormFromUrl } from "@/components/sections/contact-form";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { EmailText } from "@/components/ui/email-text";
import { ArrowUpRight } from "@/components/ui/icons";
import { contactForm, contactHero } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";
import { footerContent } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maintenance Assistance Plus pour vos besoins en Facility Management, maintenance multi-technique ou infrastructure technique à Mohammedia, Maroc.",
};

const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
  [contactInfo.companyName, ...contactInfo.addressLines].join(", "),
)}`;

export default function ContactPage() {
  const channels = [
    { href: `mailto:${contactInfo.email}`, label: contactHero.writeUs, value: <EmailText email={contactInfo.email} /> },
    { href: `tel:${contactInfo.phoneHref}`, label: contactHero.callUs, value: <span className="whitespace-nowrap">{contactInfo.phone}</span> },
  ];

  return (
    <>
      <PageHero
        crumbs={[{ label: contactHero.eyebrow }]}
        title={contactHero.title}
        lead={contactHero.lead}
        image={contactHero.image}
        imagePosition="50% 30%"
      >
        <div className="mt-14 grid border-t border-white/20 md:mt-20 md:grid-cols-2">
          {channels.map((channel, i) => (
            <a
              key={channel.href}
              href={channel.href}
              className={
                i === 0
                  ? "group flex items-end justify-between gap-6 border-b border-white/20 py-7 md:border-b-0 md:py-9 md:pr-10"
                  : "group flex items-end justify-between gap-6 py-7 md:border-l md:border-white/20 md:py-9 md:pl-10"
              }
            >
              <span className="min-w-0">
                <span className="eyebrow block text-white/70">{channel.label}</span>
                <span className="relative mt-3 inline-block text-xl font-semibold tracking-tight break-words text-white sm:text-h3">
                  {channel.value}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-500 ease-editorial group-hover:scale-x-100 group-focus-visible:scale-x-100"
                  />
                </span>
              </span>
              <span
                aria-hidden
                className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/25 text-white transition-colors duration-300 ease-editorial group-hover:border-accent group-hover:bg-accent md:h-12 md:w-12"
              >
                <ArrowUpRight
                  size={16}
                  className="transition-transform duration-500 ease-editorial group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </a>
          ))}
        </div>
      </PageHero>

      <section className="bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <aside className="col-span-4 mb-14 md:col-span-8 lg:col-span-4 lg:mb-0">
              <div className="lg:sticky lg:top-32">
                <h2 className="eyebrow text-muted">{contactForm.asideEyebrow}</h2>
                <p className="mt-5 max-w-sm text-h3 font-semibold tracking-tight">{contactForm.asideTitle}</p>

                <h3 className="eyebrow mt-12 text-muted">{contactForm.howEyebrow}</h3>
                <ol className="mt-5 border-t border-border">
                  {contactForm.how.map((step, i) => (
                    <li key={step.title} className="flex gap-5 border-b border-border py-5">
                      <span aria-hidden className="tabular pt-0.5 text-sm font-semibold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-sm text-muted">
                        <span className="block font-semibold text-text">{step.title}</span>
                        {step.body}
                      </p>
                    </li>
                  ))}
                </ol>

                <h3 className="eyebrow mt-12 text-muted">{contactForm.addressEyebrow}</h3>
                <address className="mt-4 text-sm text-text not-italic">
                  <span className="block font-semibold">{contactInfo.companyName}</span>
                  {contactInfo.addressLines.map((line) => (
                    <span key={line} className="block text-muted">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-4 inline-flex items-center gap-1.5 border-b border-text/25 pb-1 text-sm font-semibold transition-colors hover:border-accent hover:text-accent"
                >
                  {contactForm.directions}
                  <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>

                <p className="mt-10 hidden max-w-xs text-sm text-muted lg:block">{footerContent.motto}</p>
              </div>
            </aside>

            <div className="col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-6">
              <Suspense fallback={<ContactForm />}>
                <ContactFormFromUrl />
              </Suspense>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
