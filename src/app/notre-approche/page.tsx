import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { ChevronRight } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { processSteps } from "@/lib/content/site";
import { approachPage } from "@/lib/content/pages";
import { ctas } from "@/lib/content/cta";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Notre approche",
  description:
    "De l'analyse et du diagnostic à l'amélioration continue : la méthodologie en quatre étapes de Maintenance Assistance Plus pour piloter vos infrastructures.",
};

const stepImages = [
  "/images/technicians-diagnostic-device.jpg",
  "/images/control-room-monitoring.jpg",
  "/images/team-cta-inspection.jpg",
  "/images/technician-electrical-cabinet.jpg",
];

export default function NotreApprochePage() {
  return (
    <>
      <PageHero crumbs={[{ label: approachPage.eyebrow }]} title={approachPage.title} highlight="Une méthode éprouvée," lead={approachPage.lead} />

      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ol className="flex flex-col gap-20 lg:gap-28">
            {processSteps.map((step, i) => {
              const reversed = i % 2 === 1;
              return (
                <li key={step.index} className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
                  <Reveal className={cn("relative aspect-[4/3] overflow-hidden bg-wash", reversed && "lg:order-2")}>
                    <Image src={stepImages[i]} alt="" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                    <span className="absolute top-0 left-0 flex h-16 w-16 items-center justify-center bg-brand text-[22px] font-bold text-white">
                      {step.index}
                    </span>
                  </Reveal>
                  <Reveal delay={120} className={cn("flex flex-col", reversed && "lg:order-1")}>
                    <span className="text-[15px] font-bold uppercase tracking-[0.12em] text-brand">
                      Étape {step.index} / {String(processSteps.length).padStart(2, "0")}
                    </span>
                    <h2 className="mt-4 text-[clamp(1.875rem,3.2vw,2.75rem)] font-bold leading-[1.12] text-navy text-balance">{step.title}</h2>
                    <p className="mt-5 max-w-[56ch] text-[18px] leading-relaxed text-ink/85">{step.description}</p>
                    <ul className="mt-8 flex flex-col border-t border-line">
                      {step.details.map((d) => (
                        <li key={d} className="flex gap-3 border-b border-line py-3.5 text-[16px] leading-snug text-ink">
                          <ChevronRight size={18} className="mt-0.5 shrink-0 text-brand" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      <ClosingCta title={approachPage.cta.title} body={approachPage.cta.body}>
        <ButtonLink href={ctas.contactUs.href} variant="solid">
          {ctas.contactUs.label}
        </ButtonLink>
        <ButtonLink href={ctas.discoverMaintenance.href}>{ctas.discoverMaintenance.label}</ButtonLink>
      </ClosingCta>
    </>
  );
}
