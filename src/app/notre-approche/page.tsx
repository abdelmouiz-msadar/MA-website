import type { Metadata } from "next";
import { SplitFeature } from "@/components/sections/editorial";
import { NextPage } from "@/components/sections/next-page";
import { PageHero } from "@/components/sections/page-hero";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/heading";
import { primaryNav } from "@/lib/content/navigation";
import { approachPage } from "@/lib/content/pages";
import { qseHero } from "@/lib/content/qse";
import { routes } from "@/lib/content/routes";
import { processSteps } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Notre approche",
  description:
    "De l'analyse et du diagnostic à l'amélioration continue : la méthodologie en quatre étapes de Maintenance Assistance Plus pour piloter vos infrastructures.",
};

const qseLabel = primaryNav.find((item) => item.href === routes.qse)?.label ?? "";

export default function NotreApprochePage() {
  return (
    <>
      <PageHero crumbs={[{ label: approachPage.eyebrow }]} title={approachPage.eyebrow} lead={approachPage.lead} image={approachPage.image} imagePosition="50% 40%" />

      {/* OVERVIEW — timeline */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SectionHeader title={approachPage.title} />
          <ProcessTimeline steps={processSteps} className="lg:grid-cols-4" />
        </Container>
      </section>

      {/* STEP BY STEP */}
      <section className="bg-surface py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={approachPage.detailsEyebrow} title={approachPage.detailsTitle} />
          <ol className="flex flex-col gap-20 md:gap-28 lg:gap-40">
            {processSteps.map((step, i) => (
              <li key={step.index}>
                <SplitFeature
                  index={i + 1}
                  total={processSteps.length}
                  title={step.title}
                  image={approachPage.stepImages[i]}
                  reversed={i % 2 === 1}
                >
                  <p className="text-lg text-muted">{step.description}</p>
                  <ul className="mt-8 border-t border-border">
                    {step.details.map((d) => (
                      <li key={d} className="flex gap-4 border-b border-border py-3.5 text-[0.9375rem] leading-snug">
                        <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </SplitFeature>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <NextPage href={routes.qse} label={qseLabel} image={qseHero.image} />
    </>
  );
}
