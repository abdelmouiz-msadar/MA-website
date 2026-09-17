import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/section-heading";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { ClosingCta } from "@/components/sections/closing-cta";
import { processSteps } from "@/lib/content/site";
import { ctas } from "@/lib/content/cta";

export const metadata: Metadata = {
  title: "Notre approche",
  description:
    "De l'analyse et du diagnostic à l'amélioration continue : la méthodologie en quatre étapes de Maintenance Assistance Plus pour piloter vos infrastructures.",
};

export default function NotreApprochePage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink/10 bg-paper">
        <Container className="flex flex-col gap-6 py-16 sm:py-20 lg:py-24">
          <Eyebrow>Notre approche</Eyebrow>
          <h1 className="max-w-[22ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink text-balance">
            Une méthode éprouvée, du diagnostic à l&apos;amélioration continue.
          </h1>
          <p className="max-w-[56ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            Chaque collaboration suit un processus structuré en quatre étapes, conçu pour s&apos;adapter
            aux enjeux spécifiques de chaque infrastructure tout en gardant une rigueur opérationnelle
            constante.
          </p>
        </Container>
      </section>

      {/* METHODOLOGY */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      {/* CTA */}
      <ClosingCta
        title="Une méthode qui s'applique à votre infrastructure."
        body="Échangeons sur l'état actuel de vos installations pour définir la première étape : l'analyse et le diagnostic."
      >
        <CtaLink href={ctas.contactUs.href} variant="primary" className="bg-steel hover:bg-white hover:text-ink">
          {ctas.contactUs.label}
        </CtaLink>
        <CtaLink
          href={ctas.discoverMaintenance.href}
          variant="secondary"
          className="border-white/25 text-white hover:border-white hover:text-white"
        >
          {ctas.discoverMaintenance.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
