import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { ExpertiseIndex } from "@/components/sections/expertise-index";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { CommitmentList } from "@/components/sections/commitment-list";
import { ClosingCta } from "@/components/sections/closing-cta";
import { expertises } from "@/lib/content/expertises";
import {
  hero,
  introduction,
  commitments,
  maintenanceTypes,
  processSteps,
  qseStandards,
  qseCertifiedBy,
  finalCta,
} from "@/lib/content/site";

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-ink/10">
        <Container className="grid grid-cols-1 gap-12 pt-16 pb-20 sm:pt-20 sm:pb-28 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24 lg:pb-0">
          <div className="flex flex-col justify-center gap-8 lg:pb-24">
            <Eyebrow>{hero.eyebrow}</Eyebrow>
            <h1 className="max-w-[16ch] text-[clamp(2.5rem,5.4vw,4.5rem)] font-medium leading-[1.04] tracking-[-0.02em] text-ink text-balance">
              {hero.title}
            </h1>
            <p className="max-w-[48ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
              {hero.lead}
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <CtaLink href={hero.primaryCta.href} variant="primary">
                {hero.primaryCta.label}
              </CtaLink>
              <CtaLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </CtaLink>
            </div>
          </div>

          <div className="relative -mx-[var(--gutter)] lg:mx-0">
            <div className="corner-cut relative aspect-[4/5] w-full overflow-hidden bg-grey-200 lg:aspect-auto lg:h-[calc(100%+6rem)]">
              <Image
                src="/images/hero-ducting-inspection.jpg"
                alt="Techniciens Maintenance Assistance Plus lors d'une inspection d'installation CVC"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="absolute bottom-4 left-[var(--gutter)] flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.12em] text-white/80 lg:bottom-6 lg:left-8">
              <span className="h-1.5 w-1.5 rounded-full bg-steel-line" aria-hidden />
              CVC — Inspection d&apos;installation
            </p>
          </div>
        </Container>
      </section>

      {/* INTRODUCTION */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
            <div className="flex flex-col gap-8">
              <SectionHeading eyebrow={introduction.eyebrow} title={introduction.title} />
              <div className="corner-cut relative aspect-[3/4] w-full max-w-[540px] overflow-hidden bg-grey-200">
                <Image
                  src="/images/control-room-monitoring.jpg"
                  alt="Supervision et suivi technique dans une salle de contrôle Maintenance Assistance Plus"
                  fill
                  sizes="(min-width: 1024px) 40vw, 90vw"
                  className="object-cover"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:pt-2">
              <p className="max-w-[52ch] text-[17px] leading-relaxed text-ink font-medium">
                {introduction.lead}
              </p>
              {introduction.body.map((p) => (
                <p key={p} className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
                  {p}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* EXPERTISE INDEX */}
      <section id="expertises" className="bg-paper">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Expertises"
            title="Huit domaines techniques, une seule équipe."
            lead="Des courants forts aux aménagements, nous couvrons l'ensemble des disciplines nécessaires à la continuité de vos infrastructures."
            className="mb-14 lg:mb-16"
          />
          <ExpertiseIndex items={expertises} />
        </Container>
      </section>

      {/* MAINTENANCE — flagship, dark band */}
      <section className="bg-ink text-white">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <Eyebrow className="text-steel-line">Maintenance</Eyebrow>
              <h2 className="mt-4 max-w-[16ch] text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.01em] text-balance">
                Anticiper plutôt que subir.
              </h2>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-white/60">
                Une gestion proactive du cycle de vie de vos équipements pour maximiser leur
                disponibilité et la performance de vos installations.
              </p>
              <div className="mt-10 inline-flex items-baseline gap-3 border-t border-white/15 pt-6">
                <span className="font-mono text-[13px] uppercase tracking-[0.1em] text-white/50">
                  Support &amp; astreinte
                </span>
                <span className="text-[22px] font-medium text-steel-line">24/7</span>
              </div>
            </div>

            <dl className="grid grid-cols-1 gap-x-10 gap-y-10 border-t border-white/15 pt-10 sm:grid-cols-2">
              {maintenanceTypes.map((type, i) => (
                <div key={type.title} className="border-l border-white/15 pl-6">
                  <span className="font-mono text-[13px] text-steel-line">{String(i + 1).padStart(2, "0")}</span>
                  <dt className="mt-2 text-[18px] font-medium text-white">{type.title}</dt>
                  <dd className="mt-2 text-[15px] leading-relaxed text-white/55">{type.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* COMMITMENTS */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Nos engagements"
            title="Ce que nous garantissons à chaque collaboration."
            className="mb-14 lg:mb-16"
          />
          <CommitmentList items={commitments} />
        </Container>
      </section>

      {/* APPROACH */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Notre approche"
            title="Une méthode éprouvée, du diagnostic à l'amélioration continue."
            className="mb-14 lg:mb-16"
          />
          <ProcessTimeline steps={processSteps} />
        </Container>
      </section>

      {/* QSE */}
      <section className="bg-paper-deep">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
            <SectionHeading eyebrow="QSE" title="Qualité, sécurité, environnement." />
            <div className="grid grid-cols-1 gap-8 border-t border-ink/15 pt-10 sm:grid-cols-3 sm:gap-6">
              {qseStandards.map((std) => (
                <div key={std.code} className="flex flex-col gap-3">
                  <p className="font-mono text-[13px] text-steel">{std.code}</p>
                  <h3 className="text-[16px] font-medium text-ink">{std.title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-soft">{std.description}</p>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-14 border-t border-ink/15 pt-6 text-[13px] font-mono uppercase tracking-[0.1em] text-ink-soft">
            {qseCertifiedBy}
          </p>
        </Container>
      </section>

      {/* FINAL CTA */}
      <ClosingCta title={finalCta.title} body={finalCta.body}>
        <CtaLink href={finalCta.cta.href} variant="primary" className="bg-steel hover:bg-white hover:text-ink">
          {finalCta.cta.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
