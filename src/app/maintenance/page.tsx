import type { Metadata } from "next";
import { SplitFeature } from "@/components/sections/editorial";
import { NextPage } from "@/components/sections/next-page";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeader } from "@/components/ui/heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { availability, maintenanceHero, operationalCycle, tooling } from "@/lib/content/maintenance";
import { primaryNav } from "@/lib/content/navigation";
import { approachPage, maintenancePageLabels } from "@/lib/content/pages";
import { routes } from "@/lib/content/routes";
import { maintenanceTypes } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Maintenance",
  description:
    "Maintenance préventive, corrective, prédictive et réglementaire, pilotée par GMAO et GTB, avec une disponibilité 24/7. La maintenance multi-technique de Maintenance Assistance Plus.",
};

const approachLabel = primaryNav.find((item) => item.href === routes.approach)?.label ?? "";

export default function MaintenancePage() {
  return (
    <>
      <PageHero
        crumbs={[{ label: maintenanceHero.eyebrow }]}
        title={maintenanceHero.title}
        lead={maintenanceHero.lead}
        image={maintenancePageLabels.image}
        imagePosition="50% 60%"
      />

      {/* FOUR TYPES */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={maintenancePageLabels.typesEyebrow} title={maintenancePageLabels.typesTitle} />
          <ol className="grid grid-cols-1 gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
            {maintenanceTypes.map((type, i) => (
              <li key={type.title}>
                <ParallaxImage src={type.image} alt="" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 48vw, 100vw" className="aspect-[4/5]" />
                <Reveal className="mt-7">
                  <p className="eyebrow text-muted">
                    <span className="text-accent">{String(i + 1).padStart(2, "0")}</span>
                    <span aria-hidden className="mx-2 opacity-50">
                      /
                    </span>
                    {maintenanceHero.eyebrow}
                  </p>
                  <h2 className="mt-3 text-h3 font-semibold">{type.title}</h2>
                  <p className="mt-3 max-w-sm text-muted">{type.description}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* 24/7 — dark statement */}
      <section className="theme-dark bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12 lg:items-end">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow>{availability.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="p" className="tabular mt-5 text-[clamp(5rem,3rem+9vw,11rem)] leading-none font-light tracking-[-0.04em]">
                24<span className="text-accent">/</span>7
              </Reveal>
            </div>
            <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
              <Reveal as="h2" className="text-h2 font-semibold text-balance">
                {availability.title}
              </Reveal>
              <Reveal as="p" className="mt-6 max-w-xl text-lg text-muted">
                {availability.body}
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* GMAO & GTB */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SplitFeature eyebrow={tooling.eyebrow} title={tooling.title} image={tooling.image} imageAlt={tooling.imageAlt} imageClassName="object-[50%_35%]">
            <div className="flex flex-col gap-5 text-lg text-muted">
              {tooling.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SplitFeature>
        </Container>
      </section>

      {/* OPERATIONAL CYCLE */}
      <section className="bg-surface py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={maintenancePageLabels.cycleEyebrow} title={maintenancePageLabels.cycleTitle} />
          <ProcessTimeline steps={operationalCycle.map((s) => ({ index: s.index, title: s.label }))} className="sm:grid-cols-2 lg:grid-cols-6" />
        </Container>
      </section>

      <NextPage href={routes.approach} label={approachLabel} image={approachPage.image} />
    </>
  );
}
