import type { Metadata } from "next";
import Image from "next/image";
import { Suspense } from "react";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { HighlightText } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { ContactBuilder, ContactBuilderFromUrl } from "@/components/sections/contact-builder";
import { ContactChannels } from "@/components/sections/contact-channels";
import { contactHero } from "@/lib/content/contact";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactez Maintenance Assistance Plus pour vos besoins en Facility Management, maintenance multi-technique ou infrastructure technique à Mohammedia, Maroc.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep pt-32 pb-44 text-white sm:pb-48 lg:pt-44 lg:pb-60">
        <Image
          src="/images/team-cta-inspection.jpg"
          alt=""
          fill
          preload
          sizes="100vw"
          className="hero-zoom object-cover object-[50%_35%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_32_45/0.86)_0%,rgb(8_32_45/0.72)_45%,rgb(8_32_45/0.94)_100%)]" />

        <Container className="relative">
          <Breadcrumb crumbs={[{ label: contactHero.eyebrow }]} tone="dark" />
          <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end lg:gap-16">
            <Reveal className="flex flex-col items-start gap-7">
              <AvailabilityBadge />
              <h1 className="text-[clamp(2.5rem,5.6vw,4.75rem)] font-bold leading-[1.04] tracking-[-0.015em] text-balance">
                <HighlightText title={contactHero.title} highlight="votre infrastructure." tone="dark" />
              </h1>
              <p className="max-w-[50ch] text-[18px] leading-relaxed text-white/85 sm:text-[20px]">{contactHero.lead}</p>
            </Reveal>
            <Reveal delay={150}>
              <ContactChannels />
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="bg-wash pb-24 sm:pb-32">
        <Container className="relative z-10 -mt-28 sm:-mt-32 lg:-mt-40">
          <Reveal>
            <Suspense fallback={<ContactBuilder />}>
              <ContactBuilderFromUrl />
            </Suspense>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
