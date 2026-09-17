import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { ClosingCta } from "@/components/sections/closing-cta";
import { maintenanceTypes } from "@/lib/content/site";
import { maintenanceHero, availability, tooling, operationalCycle, maintenanceCta } from "@/lib/content/maintenance";
import { ctas } from "@/lib/content/cta";
import { routes } from "@/lib/content/routes";

export const metadata: Metadata = {
  title: "Maintenance",
  description:
    "Maintenance préventive, corrective, prédictive et réglementaire, pilotée par GMAO et GTB, avec une disponibilité 24/7. La maintenance multi-technique de Maintenance Assistance Plus.",
};

export default function MaintenancePage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink/10 bg-paper">
        <Container className="flex flex-col gap-6 py-16 sm:py-20 lg:py-24">
          <Eyebrow>{maintenanceHero.eyebrow}</Eyebrow>
          <h1 className="max-w-[18ch] text-[clamp(2.5rem,5.4vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ink text-balance">
            {maintenanceHero.title}
          </h1>
          <p className="max-w-[56ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            {maintenanceHero.lead}
          </p>
        </Container>
      </section>

      {/* 4 TYPES */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <ol className="grid grid-cols-1 border-t border-ink/15 lg:grid-cols-4">
            {maintenanceTypes.map((type, i) => (
              <li
                key={type.title}
                className="flex flex-col gap-3 border-b border-ink/15 py-8 lg:border-r lg:border-b-0 lg:py-10 lg:pr-6 lg:pl-6 lg:first:pl-0 lg:last:border-r-0"
              >
                <span className="font-mono text-[13px] text-steel/70">{String(i + 1).padStart(2, "0")}</span>
                <h2 className="text-[18px] font-medium text-ink">{type.title}</h2>
                <p className="max-w-[32ch] text-[14px] leading-relaxed text-ink-soft">{type.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 24/7 */}
      <section className="bg-ink text-white">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <Eyebrow className="text-steel-line">{availability.eyebrow}</Eyebrow>
            <p className="mt-6 text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-[1.15] tracking-[-0.01em] text-balance">
              24/7
            </p>
          </div>
          <div className="flex flex-col gap-4 lg:pt-2">
            <h2 className="text-[20px] font-medium text-balance">{availability.title}</h2>
            <p className="max-w-[56ch] text-[15px] leading-relaxed text-white/60">{availability.body}</p>
          </div>
        </Container>
      </section>

      {/* GMAO / GTB */}
      <section className="bg-paper">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow={tooling.eyebrow} title={tooling.title} />
          <div className="flex flex-col gap-6 lg:pt-2">
            {tooling.paragraphs.map((p) => (
              <p key={p} className="max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* OPERATIONAL CYCLE */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <h2 className="mb-12 max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.01em] text-ink text-balance lg:mb-16">
            Le cycle opérationnel
          </h2>
          <ol className="flex flex-col border-t border-ink/15 sm:flex-row sm:flex-wrap">
            {operationalCycle.map((step, i) => (
              <li
                key={step.index}
                className="flex flex-1 items-center gap-3 border-b border-ink/15 py-5 sm:min-w-[200px] sm:border-r sm:pl-4 sm:first:pl-0 sm:last:border-r-0"
              >
                <span className="font-mono text-[13px] text-steel/70">{step.index}</span>
                <span className="text-[15px] font-medium text-ink">{step.label}</span>
                {i < operationalCycle.length - 1 ? (
                  <span aria-hidden className="ml-auto hidden text-ink/25 sm:inline">
                    &rarr;
                  </span>
                ) : null}
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CTA */}
      <ClosingCta title={maintenanceCta.title} body={maintenanceCta.body}>
        <CtaLink
          href={ctas.talkAboutMaintenance.href}
          variant="primary"
          className="bg-steel hover:bg-white hover:text-ink"
        >
          {ctas.talkAboutMaintenance.label}
        </CtaLink>
        <CtaLink
          href={routes.approach}
          variant="secondary"
          className="border-white/25 text-white hover:border-white hover:text-white"
        >
          {ctas.ourApproach.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
