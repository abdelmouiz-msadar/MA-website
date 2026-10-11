import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, SectionIntro } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Statement } from "@/components/sections/statement";
import { ClosingCta } from "@/components/sections/closing-cta";
import { aboutCta, aboutHero, continuity, dimensions, missionQuote, positioning, proximityBlock } from "@/lib/content/about";
import { aboutDimensions } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "Maintenance Assistance Plus : partenaire de confiance pour la gestion et l'optimisation de vos infrastructures, avec une approche technique fondée sur l'expertise et la proximité.",
};

export default function QuiSommesNousPage() {
  return (
    <>
      <PageHero crumbs={[{ label: aboutHero.eyebrow }]} title={aboutHero.title} highlight="Notre expertise." lead={aboutHero.lead} />

      {/* POSITIONING — image left, text right */}
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-wash">
            <Image src={aboutHero.image} alt={aboutHero.imageAlt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <SectionIntro eyebrow={positioning.eyebrow} title={positioning.title} highlight="pas un simple prestataire." size="sub" />
            {positioning.paragraphs.map((p) => (
              <p key={p} className="max-w-[58ch] text-[17px] leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* MISSION — scroll-filled statement */}
      <section className="bg-wash py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-[1080px]">
            <Eyebrow>Notre mission</Eyebrow>
            <Statement as="blockquote" text={missionQuote} className="mt-6" />
          </div>
        </Container>
      </section>

      {/* EXPERTISE + PROXIMITY — inset navy panel */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <Reveal className="relative overflow-hidden">
            <div className="bg-deep px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
              <ul className="grid grid-cols-1 gap-12 md:grid-cols-3 md:gap-10">
                {[proximityBlock.expertise, proximityBlock.proximity, proximityBlock.outcome].map((block) => (
                  <li key={block.label} className="flex flex-col gap-4">
                    <h2 className="text-[24px] font-bold leading-snug">{block.label}</h2>
                    <p className="text-[16px] leading-relaxed text-white/80">{block.body}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="brand-line w-[86%]" />
          </Reveal>
        </Container>
      </section>

      {/* DIMENSIONS */}
      <section className="bg-wash py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionIntro align="center" eyebrow={aboutDimensions.eyebrow} title={aboutDimensions.title} highlight="pas des promesses isolées." />
          </Reveal>
          <ol className="mt-14 grid grid-cols-1 gap-5 md:grid-cols-3 lg:mt-16 lg:gap-6">
            {dimensions.map((d, i) => (
              <Reveal as="li" key={d.index} delay={i * 110} className="flex flex-col bg-white p-8 lg:p-10">
                <span className="text-[56px] font-bold leading-none text-brand">{d.index}</span>
                <h3 className="mt-6 text-[22px] font-bold text-navy">{d.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{d.body}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* CONTINUITY — text left, image right */}
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="order-2 flex flex-col gap-6 lg:order-1">
            <SectionIntro eyebrow={continuity.eyebrow} title={continuity.title} highlight="en continu." size="sub" />
            {continuity.paragraphs.map((p) => (
              <p key={p} className="max-w-[58ch] text-[17px] leading-relaxed text-ink/85">
                {p}
              </p>
            ))}
          </Reveal>
          <Reveal delay={120} className="relative order-1 aspect-[4/3] overflow-hidden bg-wash lg:order-2">
            <Image src={continuity.image} alt={continuity.imageAlt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
        </Container>
      </section>

      <ClosingCta title={aboutCta.title} body={aboutCta.body}>
        <ButtonLink href={aboutCta.cta.href} variant="solid">
          {aboutCta.cta.label}
        </ButtonLink>
      </ClosingCta>
    </>
  );
}
