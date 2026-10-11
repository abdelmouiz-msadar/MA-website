import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { Statement } from "@/components/sections/statement";
import { ImageCard } from "@/components/sections/image-card";
import { ClosingCta } from "@/components/sections/closing-cta";
import { expertises, getExpertiseBySlug, getRelatedExpertises } from "@/lib/content/expertises";
import { expertiseHref, routes } from "@/lib/content/routes";
import { ctas } from "@/lib/content/cta";
import { expertiseDetailLabels, expertisesPage } from "@/lib/content/pages";

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

  const related = getRelatedExpertises(slug);
  const eyebrow = `Expertise ${expertise.index}${expertise.shortLabel ? ` — ${expertise.shortLabel}` : ""}`;

  return (
    <>
      <PageHero
        crumbs={[{ label: expertisesPage.eyebrow, href: routes.expertises }, { label: expertise.name }]}
        eyebrow={eyebrow}
        title={expertise.name}
        highlight={expertise.name}
        lead={expertise.positioning}
      />

      {/* OVERVIEW — image left, text right */}
      <section className="bg-white py-20 sm:py-28">
        <Container className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative aspect-[4/3] overflow-hidden bg-wash">
            <Image src={expertise.cover} alt={expertise.name} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </Reveal>
          <Reveal delay={120} className="flex flex-col gap-6">
            <Eyebrow>{expertiseDetailLabels.overview}</Eyebrow>
            {expertise.overview.map((p, i) => (
              <p
                key={p}
                className={
                  i === 0
                    ? "max-w-[56ch] text-[20px] font-bold leading-snug text-navy sm:text-[22px]"
                    : "max-w-[58ch] text-[17px] leading-relaxed text-ink/85"
                }
              >
                {p}
              </p>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* CAPABILITIES — inset navy panel */}
      <section className="bg-white pb-20 sm:pb-28">
        <Container>
          <Reveal className="overflow-hidden">
            <div className="bg-deep px-7 py-14 text-white sm:px-12 lg:px-16 lg:py-20">
              <h2 className="text-center text-[clamp(1.875rem,3.4vw,3rem)] font-bold leading-tight">
                {expertiseDetailLabels.capabilities}
              </h2>
              <ol className="mt-12 grid grid-cols-1 gap-x-14 gap-y-8 md:grid-cols-2 lg:mt-14">
                {expertise.capabilities.map((cap, i) => {
                  const [term, ...rest] = cap.split(" : ");
                  const description = rest.join(" : ");
                  return (
                    <li key={cap} className="flex gap-5 border-t border-white/20 pt-6">
                      <span className="w-10 shrink-0 text-[28px] font-bold leading-none text-brand-light">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col gap-2">
                        <h3 className="text-[19px] font-bold leading-snug">{term}</h3>
                        {description ? <p className="text-[15px] leading-relaxed text-white/75">{description}</p> : null}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
            <div className="brand-line w-[86%]" />
          </Reveal>
        </Container>
      </section>

      {/* ROLE IN THE MA+ OFFER */}
      <section className="bg-wash py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-[1080px]">
            <Eyebrow>{expertiseDetailLabels.role}</Eyebrow>
            <Statement text={expertise.operationalValue} size="md" className="mt-6" />
          </div>
        </Container>
      </section>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="bg-white py-20 sm:py-28">
          <Container>
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <h2 className="text-[clamp(1.875rem,3.4vw,3rem)] font-bold leading-tight text-navy">{expertiseDetailLabels.related}</h2>
              <ButtonLink href={routes.expertises}>{ctas.discoverExpertises.label}</ButtonLink>
            </div>
            <ul className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
              {related.map((item, i) => (
                <Reveal as="li" key={item.slug} delay={i * 100}>
                  <ImageCard
                    href={expertiseHref(item.slug)}
                    image={item.image}
                    title={item.name}
                    label={item.index}
                    sizes="(min-width: 640px) 31vw, 100vw"
                    className="aspect-[4/5] sm:aspect-[3/4]"
                  />
                </Reveal>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      <ClosingCta title={expertiseDetailLabels.ctaTitle} body={expertiseDetailLabels.ctaBody(expertise.name)}>
        <ButtonLink href={ctas.contactUs.href} variant="solid">
          {ctas.contactUs.label}
        </ButtonLink>
        <ButtonLink href={ctas.discoverMaintenance.href}>{ctas.discoverMaintenance.label}</ButtonLink>
      </ClosingCta>
    </>
  );
}
