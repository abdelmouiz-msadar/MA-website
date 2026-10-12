import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NumberedColumns } from "@/components/sections/editorial";
import { NextPage } from "@/components/sections/next-page";
import { PageHero } from "@/components/sections/page-hero";
import { PhotoCard } from "@/components/sections/photo-card";
import { ButtonLink, TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeader } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { isNeed } from "@/lib/content/contact";
import { ctas } from "@/lib/content/cta";
import { expertises, getExpertiseBySlug, getRelatedExpertises } from "@/lib/content/expertises";
import { expertiseDetailLabels, expertisesPage } from "@/lib/content/pages";
import { expertiseHref, routes } from "@/lib/content/routes";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return expertises.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);
  if (!expertise) return {};
  return { title: expertise.name, description: expertise.summary };
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);
  if (!expertise) notFound();

  const position = expertises.findIndex((e) => e.slug === slug);
  const next = expertises[(position + 1) % expertises.length];
  const related = getRelatedExpertises(slug);
  const contactHref = isNeed(slug) ? `${routes.contact}?sujet=${slug}` : routes.contact;
  const capabilities = expertise.capabilities.map((cap) => {
    const [term, ...rest] = cap.split(" : ");
    return { title: term, body: rest.join(" : ") };
  });

  return (
    <>
      <PageHero
        crumbs={[{ label: expertisesPage.eyebrow, href: routes.expertises }, { label: expertise.name }]}
        title={expertise.name}
        lead={expertise.positioning}
        image={expertise.cover}
      />

      {/* OVERVIEW */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-6">
              <Reveal>
                <Eyebrow>
                  {expertiseDetailLabels.overview} — {expertise.index}
                  {expertise.shortLabel ? ` · ${expertise.shortLabel}` : ""}
                </Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-2xl text-h3 font-semibold">
                {expertise.overview[0]}
              </Reveal>
            </div>
            <div className="col-span-4 flex flex-col items-start gap-10 md:col-span-8 lg:col-span-5 lg:col-start-8 lg:pt-10">
              {expertise.overview.slice(1).map((p) => (
                <Reveal as="p" key={p} className="text-lg text-text/80">
                  {p}
                </Reveal>
              ))}
              <Reveal>
                <ButtonLink href={contactHref} size="md">
                  {expertiseDetailLabels.contactAbout(expertise.shortLabel ?? expertise.name)}
                </ButtonLink>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-surface py-section-y text-text">
        <Container>
          <SectionHeader title={expertiseDetailLabels.capabilities} />
          <NumberedColumns items={capabilities} className="md:grid-cols-2 lg:grid-cols-3 lg:gap-y-14" />
        </Container>
      </section>

      {/* ROLE IN THE MA+ OFFER — dark statement */}
      <section className="theme-dark bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-8 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <Reveal className="col-span-4 md:col-span-8 lg:col-span-4">
              <Eyebrow>{expertiseDetailLabels.role}</Eyebrow>
            </Reveal>
            <Reveal as="p" className="col-span-4 text-h2 font-semibold text-balance md:col-span-8 lg:col-span-7 lg:col-start-6">
              {expertise.operationalValue}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="bg-background py-section-y text-text">
          <Container>
            <SectionHeader
              title={expertiseDetailLabels.related}
              action={<TextLink href={ctas.discoverExpertises.href}>{ctas.discoverExpertises.label}</TextLink>}
            />
            <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 90}>
                  <PhotoCard
                    href={expertiseHref(item.slug)}
                    image={item.image}
                    index={item.index}
                    title={item.name}
                    sizes="(min-width: 640px) 31vw, 100vw"
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <NextPage href={expertiseHref(next.slug)} label={next.name} image={next.cover} eyebrow={`${expertisesPage.eyebrow} — ${next.index}`} />
    </>
  );
}
