import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/container";
import { MailIcon, PhoneIcon, PinIcon } from "@/components/ui/icons";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { contactHero } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";
import { contactLabels } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maintenance Assistance Plus pour vos besoins en Facility Management, maintenance multi-technique ou infrastructure technique à Mohammedia, Maroc.",
};

const channels = [
  {
    icon: PinIcon,
    label: contactLabels.address,
    value: (
      <>
        {contactInfo.companyName}
        {contactInfo.addressLines.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </>
    ),
  },
  {
    icon: PhoneIcon,
    label: contactLabels.phone,
    value: (
      <a href={`tel:${contactInfo.phoneHref}`} className="hover:text-brand">
        {contactInfo.phone}
      </a>
    ),
  },
  {
    icon: MailIcon,
    label: contactLabels.email,
    value: (
      <a href={`mailto:${contactInfo.email}`} className="break-words hover:text-brand">
        {contactInfo.email}
      </a>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero crumbs={[{ label: contactHero.eyebrow }]} title={contactHero.title} highlight="votre infrastructure." lead={contactHero.lead} />

      <section className="bg-white py-20 sm:py-24">
        <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <ul className="flex flex-col gap-4">
            {channels.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex gap-5 border border-line p-6">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-brand text-white">
                  <Icon size={22} />
                </span>
                <div className="flex min-w-0 flex-col gap-1.5">
                  <span className="text-[15px] font-bold text-navy">{label}</span>
                  <span className="text-[16px] leading-relaxed text-ink">{value}</span>
                </div>
              </li>
            ))}
          </ul>

          <div className="bg-wash p-6 sm:p-10">
            <Suspense fallback={<div className="min-h-[560px]" />}>
              <ContactForm />
            </Suspense>
          </div>
        </Container>
      </section>
    </>
  );
}
