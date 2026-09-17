import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { PullQuote } from "@/components/ui/pull-quote";
import { ClosingCta } from "@/components/sections/closing-cta";
import {
  aboutHero,
  positioning,
  missionQuote,
  proximityBlock,
  dimensions,
  continuity,
  aboutCta,
} from "@/lib/content/about";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "Maintenance Assistance Plus : partenaire de confiance pour la gestion et l'optimisation de vos infrastructures, avec une approche technique fondée sur l'expertise et la proximité.",
};

export default function QuiSommesNousPage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink/10 bg-paper">
        <Container className="flex flex-col gap-6 pt-16 pb-12 sm:pt-20 lg:pt-24">
          <Eyebrow>{aboutHero.eyebrow}</Eyebrow>
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink text-balance">
            {aboutHero.title}
          </h1>
          <p className="max-w-[54ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            {aboutHero.lead}
          </p>
        </Container>

        <div className="relative">
          <div className="corner-cut relative aspect-[4/5] w-full overflow-hidden bg-grey-200 sm:aspect-[16/9]">
            <Image
              src={aboutHero.image}
              alt={aboutHero.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* POSITIONING */}
      <section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow={positioning.eyebrow} title={positioning.title} />
          <div className="flex flex-col gap-6 lg:pt-2">
            {positioning.paragraphs.map((p) => (
              <p key={p} className="max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* MISSION — dark pull quote */}
      <section className="bg-ink text-white">
        <Container className="py-24 sm:py-28">
          <PullQuote eyebrow="Notre mission">{missionQuote}</PullQuote>
        </Container>
      </section>

      {/* EXPERTISE + PROXIMITY */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <div className="grid grid-cols-1 gap-10 border-t border-ink/15 pt-10 sm:grid-cols-3 sm:gap-8">
            {[proximityBlock.expertise, proximityBlock.proximity, proximityBlock.outcome].map((block) => (
              <div key={block.label} className="flex flex-col gap-3">
                <Eyebrow>{block.label}</Eyebrow>
                <p className="text-[15px] leading-relaxed text-ink-soft">{block.body}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* DIMENSIONS */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <SectionHeading
            eyebrow="Énergie, confort, bien-être"
            title="Des dimensions interconnectées, pas des promesses isolées."
            className="mb-14 lg:mb-16"
          />
          <ol className="grid grid-cols-1 border-t border-ink/15 sm:grid-cols-3">
            {dimensions.map((d) => (
              <li
                key={d.index}
                className="flex flex-col gap-3 border-b border-ink/15 py-8 sm:border-r sm:border-b-0 sm:py-10 sm:pr-8 sm:pl-8 sm:first:pl-0 sm:last:border-r-0"
              >
                <span className="font-mono text-[13px] text-steel/70">{d.index}</span>
                <h3 className="text-[18px] font-medium text-ink">{d.title}</h3>
                <p className="max-w-[38ch] text-[15px] leading-relaxed text-ink-soft">{d.body}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* CONTINUITY */}
      <section className="bg-paper">
        <Container className="grid grid-cols-1 gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div className="flex flex-col gap-6 lg:order-1 lg:pt-2">
            <SectionHeading eyebrow={continuity.eyebrow} title={continuity.title} />
            {continuity.paragraphs.map((p) => (
              <p key={p} className="max-w-[52ch] text-[15px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
          <div className="corner-cut relative aspect-[4/3] w-full overflow-hidden bg-grey-200 lg:order-2">
            <Image
              src={continuity.image}
              alt={continuity.imageAlt}
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
        </Container>
      </section>

      {/* CLOSING CTA */}
      <ClosingCta title={aboutCta.title} body={aboutCta.body}>
        <CtaLink href={aboutCta.cta.href} variant="primary" className="bg-steel hover:bg-white hover:text-ink">
          {aboutCta.cta.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
