import { HomeHero } from "@/components/sections/home-hero";
import { CardCarousel } from "@/components/sections/card-carousel";
import { FigureLinks, LabelGrid, NumberedColumns, NumberedList } from "@/components/sections/editorial";
import { ExpertiseIndex } from "@/components/sections/expertise-index";
import { ProcessTimeline } from "@/components/sections/process-timeline";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeader } from "@/components/ui/heading";
import { ParallaxImage } from "@/components/ui/parallax-image";
import { Reveal } from "@/components/ui/reveal";
import { dimensions, dimensionsIntro } from "@/lib/content/about";
import { ctas } from "@/lib/content/cta";
import { expertises } from "@/lib/content/expertises";
import { homeSections, keyFigures } from "@/lib/content/pages";
import { routes } from "@/lib/content/routes";
import { commitments, introduction, maintenanceTypes, processSteps, qseCertifiedBy, qseStandards } from "@/lib/content/site";

export default function Home() {
  const { qse } = homeSections;

  return (
    <>
      <HomeHero />

      {/* WHO WE ARE */}
      <section id="positionnement" className="bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <Reveal>
                <Eyebrow>{introduction.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-2xl text-h1 font-semibold text-balance">
                {introduction.title}
              </Reveal>
            </div>
            <div className="col-span-4 flex flex-col gap-10 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pt-10">
              <Reveal as="p" className="text-lg text-text/80">
                {introduction.lead} {introduction.body[0]}
              </Reveal>
              <Reveal>
                <LabelGrid label={introduction.scope.label} items={introduction.scope.items} />
              </Reveal>
              <Reveal>
                <TextLink href={routes.about}>{introduction.link}</TextLink>
              </Reveal>
            </div>
          </div>
          <FigureLinks items={keyFigures} className="mt-16 lg:mt-24" />
        </Container>
      </section>

      {/* DIMENSIONS — wide photo + three numbered columns */}
      <section className="bg-surface py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={dimensionsIntro.eyebrow} title={dimensionsIntro.title} />
          <ParallaxImage
            src={homeSections.dimensions.image}
            alt={homeSections.dimensions.imageAlt}
            sizes="(min-width: 1680px) 1680px, 100vw"
            className="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[21/9]"
          />
          <NumberedColumns
            items={dimensions.map((d) => ({ index: d.index, title: d.title, body: d.body }))}
            className="mt-12 md:grid-cols-3 lg:mt-16"
          />
        </Container>
      </section>

      {/* EXPERTISES — index with sticky photo */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SectionHeader
            eyebrow={homeSections.expertises.eyebrow}
            title={homeSections.expertises.title}
            lead={homeSections.expertises.lead}
            action={<TextLink href={ctas.discoverExpertises.href}>{ctas.discoverExpertises.label}</TextLink>}
          />
          <ExpertiseIndex items={expertises} />
        </Container>
      </section>

      {/* MAINTENANCE — dark photo carousel */}
      <section className="theme-dark overflow-hidden bg-background py-section-y text-text">
        <CardCarousel
          id="maintenance-track"
          label={homeSections.maintenance.eyebrow}
          eyebrow={homeSections.maintenance.eyebrow}
          title={homeSections.maintenance.title}
          lead={homeSections.maintenance.lead}
          action={<TextLink href={ctas.discoverMaintenance.href}>{ctas.discoverMaintenance.label}</TextLink>}
          items={maintenanceTypes.map((type, i) => ({
            key: type.title,
            index: String(i + 1).padStart(2, "0"),
            title: type.title,
            description: type.description,
            image: type.image,
            href: routes.maintenance,
          }))}
        />
      </section>

      {/* APPROACH — scroll-filled timeline */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SectionHeader
            eyebrow={homeSections.approach.eyebrow}
            title={homeSections.approach.title}
            lead={homeSections.approach.lead}
            action={<TextLink href={ctas.ourApproach.href}>{ctas.ourApproach.label}</TextLink>}
          />
          <ProcessTimeline steps={processSteps} className="lg:grid-cols-4" />
        </Container>
      </section>

      {/* QSE — featured image with overlaid standards */}
      <section className="bg-surface py-section-y text-text">
        <Container>
          <SectionHeader
            eyebrow={qse.eyebrow}
            title={qse.title}
            action={<TextLink href={ctas.discoverQse.href}>{ctas.discoverQse.label}</TextLink>}
          />
          <article aria-labelledby="qse-feature" className="relative">
            <ParallaxImage
              src={qse.feature.image}
              alt={qse.feature.imageAlt}
              sizes="(min-width: 1680px) 1680px, 100vw"
              className="aspect-[4/3] md:aspect-[16/9] xl:aspect-[2/1]"
              imageClassName="object-[50%_40%]"
            >
              <div className="pointer-events-none absolute inset-0 hidden bg-linear-to-t from-black/90 from-0% via-black/65 via-55% to-black/0 to-100% lg:block" />
            </ParallaxImage>

            <div className="mt-8 grid grid-cols-1 gap-8 lg:pointer-events-none lg:absolute lg:inset-x-0 lg:bottom-0 lg:mt-0 lg:grid-cols-12 lg:items-end lg:gap-6 lg:p-10 xl:p-12">
              <Reveal className="lg:pointer-events-auto lg:col-span-7">
                <p className="eyebrow text-accent lg:text-white">{qseCertifiedBy}</p>
                <h3 id="qse-feature" className="mt-3 max-w-2xl text-h2 font-semibold text-balance lg:text-white">
                  {qse.feature.title}
                </h3>
              </Reveal>
              <Reveal className="lg:col-span-5">
                <dl className="grid grid-cols-3 gap-x-4 gap-y-6 border-t sm:gap-x-8 border-border pt-6 lg:border-white/25">
                  {qseStandards.map((std) => (
                    <div key={std.code} className="flex flex-col gap-1.5">
                      <dt className="eyebrow order-2 text-muted lg:text-white/75">{std.short}</dt>
                      <dd className="tabular order-1 text-h2 font-light whitespace-nowrap text-text lg:text-white">
                        <span className="sr-only">{std.code}</span>
                        <span aria-hidden>{std.code.replace("ISO ", "")}</span>
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </article>
        </Container>
      </section>

      {/* COMMITMENTS */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-12 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow>{homeSections.commitments.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-xl text-h1 font-semibold text-balance">
                {homeSections.commitments.title}
              </Reveal>
              <Reveal as="p" className="mt-6 max-w-sm text-lg text-muted">
                {homeSections.commitments.lead}
              </Reveal>
            </div>
            <NumberedList items={commitments.map((c) => c.title)} className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:self-end" />
          </div>
        </Container>
      </section>
    </>
  );
}
