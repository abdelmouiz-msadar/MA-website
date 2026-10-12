import type { Metadata } from "next";
import { DetailList, FigureLinks, LabelGrid, NumberedColumns, SplitFeature } from "@/components/sections/editorial";
import { NextPage } from "@/components/sections/next-page";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeader } from "@/components/ui/heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { aboutHero, continuity, dimensions, dimensionsIntro, mission, positioning, proximityBlock } from "@/lib/content/about";
import { primaryNav } from "@/lib/content/navigation";
import { expertisesPage, keyFigures } from "@/lib/content/pages";
import { routes } from "@/lib/content/routes";
import { introduction } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Qui sommes-nous",
  description:
    "Maintenance Assistance Plus : partenaire de confiance pour la gestion et l'optimisation de vos infrastructures, avec une approche technique fondée sur l'expertise et la proximité.",
};

const expertisesLabel = primaryNav.find((item) => item.href === routes.expertises)?.label ?? "";

export default function QuiSommesNousPage() {
  return (
    <>
      <PageHero crumbs={[{ label: aboutHero.eyebrow }]} title={aboutHero.eyebrow} lead={aboutHero.lead} image={aboutHero.image} imagePosition="50% 35%" />

      {/* POSITIONING */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <Reveal>
                <Eyebrow>{positioning.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-2xl text-h1 font-semibold text-balance">
                {positioning.title}
              </Reveal>
            </div>
            <div className="col-span-4 flex flex-col gap-10 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pt-10">
              <Reveal className="flex flex-col gap-5 text-lg text-text/80">
                {positioning.paragraphs.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </Reveal>
              <Reveal>
                <LabelGrid label={introduction.scope.label} items={introduction.scope.items} />
              </Reveal>
            </div>
          </div>
          <FigureLinks items={keyFigures} className="mt-16 lg:mt-24" />
        </Container>
      </section>

      {/* MISSION — wide photo + three pillars */}
      <section className="bg-surface py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={mission.eyebrow} title={mission.quote} />
          <ParallaxImage
            src={mission.image}
            alt={mission.imageAlt}
            sizes="(min-width: 1680px) 1680px, 100vw"
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
            imageClassName="object-[50%_60%]"
          />
          <NumberedColumns
            items={[proximityBlock.expertise, proximityBlock.proximity, proximityBlock.outcome].map((b) => ({ title: b.label, body: b.body }))}
            className="mt-12 md:grid-cols-3 lg:mt-16"
          />
        </Container>
      </section>

      {/* DIMENSIONS — dark */}
      <section className="theme-dark bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow>{dimensionsIntro.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-md text-h2 font-semibold text-balance">
                {dimensionsIntro.title}
              </Reveal>
            </div>
            <DetailList
              items={dimensions.map((d) => ({ title: d.title, body: d.body }))}
              className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7"
            />
          </div>
        </Container>
      </section>

      {/* CONTINUITY */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SplitFeature eyebrow={continuity.eyebrow} title={continuity.title} image={continuity.image} imageAlt={continuity.imageAlt} reversed>
            <div className="flex flex-col gap-5 text-lg text-muted">
              {continuity.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </SplitFeature>
        </Container>
      </section>

      <NextPage href={routes.expertises} label={expertisesLabel} image={expertisesPage.image} />
    </>
  );
}
