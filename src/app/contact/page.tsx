import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/section-heading";
import { ContactForm } from "@/components/sections/contact-form";
import { contactHero } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maintenance Assistance Plus pour vos besoins en Facility Management, maintenance multi-technique ou infrastructure technique à Mohammedia, Maroc.",
};

export default function ContactPage() {
  return (
    <section className="bg-paper">
      <Container className="grid grid-cols-1 gap-16 py-16 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:py-24">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-6">
            <Eyebrow>{contactHero.eyebrow}</Eyebrow>
            <h1 className="max-w-[16ch] text-[clamp(2.25rem,4.6vw,3.5rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink text-balance">
              {contactHero.title}
            </h1>
            <p className="max-w-[46ch] text-[16px] leading-relaxed text-ink-soft">{contactHero.lead}</p>
          </div>

          <div className="flex flex-col gap-8 border-t border-ink/15 pt-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Adresse</p>
              <address className="mt-2 not-italic text-[15px] leading-relaxed text-ink">
                {contactInfo.companyName}
                <br />
                {contactInfo.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </address>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Téléphone</p>
              <a
                href={`tel:${contactInfo.phoneHref}`}
                className="mt-2 inline-block text-[15px] text-ink hover:text-steel"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">Email</p>
              <a
                href={`mailto:${contactInfo.email}`}
                className="mt-2 inline-block break-all text-[15px] text-ink hover:text-steel"
              >
                {contactInfo.email}
              </a>
            </div>
          </div>
        </div>

        <div className="lg:pt-2">
          <ContactForm />
        </div>
      </Container>
    </section>
  );
}
