import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionIntro } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { maintenanceTypes } from "@/lib/content/site";
import { availability, maintenanceCta, maintenanceHero, operationalCycle, tooling } from "@/lib/content/maintenance";
import { maintenancePageLabels } from "@/lib/content/pages";
import { ctas } from "@/lib/content/cta";

export const metadata: Metadata = {
  title: "Maintenance",
  description:
    "Maintenance préventive, corrective, prédictive et réglementaire, pilotée par GMAO et GTB, avec une disponibilité 24/7. La maintenance multi-technique de Maintenance Assistance Plus.",
};

const typeImages = [
  "/images/technician-hands-on.jpg",
  "/images/domains/maintenance-intervention.jpg",
  "/images/domains/cfa-control-cabinet.jpg",
  "/images/technicians-diagnostic-device.jpg",
];

export default function MaintenancePage() {
  return (
    <>
      <PageHero crumbs={[{ label: maintenanceHero.eyebrow }]} title={maintenanceHero.title} highlight="multi-technique." lead={maintenanceHero.lead} />

      {/* FOUR TYPES */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ol className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {maintenanceTypes.map((type, i) => (
              <Reveal as="li" key={type.title} delay={i * 90} className="flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden bg-wash">
                  <Image src={typeImages[i]} alt="" fill sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw" className="object-cover" />
                  <span className="absolute top-0 left-0 flex h-14 w-14 items-center justify-center bg-brand text-[20px] font-bold text-white">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h2 className="mt-6 text-[24px] font-bold text-navy">{type.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{type.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* 24/7 — full-bleed photo band */}
      <section className="relative overflow-hidden bg-navy-deep text-white">
        <Image src="/images/technicians-diagnostic-device.jpg" alt="" fill sizes="100vw" className="object-cover object-[50%_30%]" />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(8_32_45/0.94)_0%,rgb(8_32_45/0.82)_50%,rgb(12_47_64/0.65)_100%)]" />
        <Container className="relative grid grid-cols-1 gap-10 py-24 sm:py-32 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          <Reveal>
            <Eyebrow tone="dark">{availability.eyebrow}</Eyebrow>
            <p className="mt-4 text-[clamp(4.5rem,11vw,9rem)] font-bold leading-none tracking-[-0.03em]">24/7</p>
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-5">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight text-balance">{availability.title}</h2>
            <p className="max-w-[56ch] text-[17px] leading-relaxed text-white/80">{availability.body}</p>
          </Reveal>
        </Container>
      </section>

      {/* GMAO & GTB */}
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-wash">
            <Image
              src="/images/control-room-monitoring.jpg"
              alt="Supervision et suivi technique dans une salle de contrôle Maintenance Assistance Plus"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover object-[50%_35%]"
            />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <SectionIntro eyebrow={tooling.eyebrow} title={tooling.title} highlight="par la donnée," size="sub" />
            {tooling.paragraphs.map((p) => (
              <p key={p} className="max-w-[58ch] text-[17px] leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* OPERATIONAL CYCLE */}
      <section className="bg-wash py-24 sm:py-32">
        <Container>
          <Reveal>
            <h2 className="text-center text-[clamp(1.875rem,3.4vw,3rem)] font-bold leading-tight text-navy">
              {maintenancePageLabels.cycleTitle}
            </h2>
          </Reveal>
          <div className="relative mt-14 lg:mt-16">
            <div aria-hidden className="brand-line absolute top-7 right-[8%] left-[8%] hidden h-[2px] opacity-60 lg:block" />
            <ol className="relative grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-6">
              {operationalCycle.map((step, i) => (
                <Reveal as="li" key={step.index} delay={i * 80} className="flex flex-col items-center text-center">
                  <span className="flex h-14 w-14 items-center justify-center bg-brand text-[18px] font-bold text-white">{step.index}</span>
                  <span className="mt-5 text-[18px] font-bold leading-snug text-navy">{step.label}</span>
                </Reveal>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <ClosingCta title={maintenanceCta.title} body={maintenanceCta.body}>
        <ButtonLink href={ctas.talkAboutMaintenance.href} variant="solid">
          {ctas.talkAboutMaintenance.label}
        </ButtonLink>
        <ButtonLink href={ctas.ourApproach.href}>{ctas.ourApproach.label}</ButtonLink>
      </ClosingCta>
    </>
  );
}
