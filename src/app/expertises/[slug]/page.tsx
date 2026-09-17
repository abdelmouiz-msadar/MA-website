import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow } from "@/components/ui/section-heading";
import { ClosingCta } from "@/components/sections/closing-cta";
import { expertises, getExpertiseBySlug, getRelatedExpertises } from "@/lib/content/expertises";
import { expertiseHref, routes } from "@/lib/content/routes";
import { ctas } from "@/lib/content/cta";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return expertises.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);
  if (!expertise) return {};
  return {
    title: expertise.name,
    description: expertise.summary,
  };
}

export default async function ExpertiseDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const expertise = getExpertiseBySlug(slug);
  if (!expertise) notFound();

  const related = getRelatedExpertises(slug);

  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink/10 bg-paper">
        <Container className="flex flex-col gap-6 pt-16 pb-12 sm:pt-20 lg:pt-24">
          <Link
            href={routes.expertises}
            className="inline-flex w-fit items-center gap-2 text-[13px] font-medium text-ink-soft hover:text-steel"
          >
            <span aria-hidden>&larr;</span> Toutes les expertises
          </Link>
          <div className="flex flex-col gap-4">
            <Eyebrow>
              Expertise {expertise.index} {expertise.shortLabel ? `— ${expertise.shortLabel}` : ""}
            </Eyebrow>
            <h1 className="max-w-[20ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink text-balance">
              {expertise.name}
            </h1>
            <p className="max-w-[54ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
              {expertise.positioning}
            </p>
          </div>
        </Container>

        <div className="relative">
          <div className="corner-cut relative aspect-[4/5] w-full overflow-hidden bg-grey-200 sm:aspect-[21/9]">
            <Image
              src={expertise.image}
              alt={expertise.name}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="bg-white">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-28 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <Eyebrow>Vue d&apos;ensemble</Eyebrow>
          <div className="flex flex-col gap-6">
            {expertise.overview.map((p) => (
              <p key={p} className="max-w-[62ch] text-[16px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <h2 className="mb-12 max-w-[24ch] text-[clamp(1.5rem,2.6vw,2.25rem)] font-medium leading-[1.15] tracking-[-0.01em] text-ink text-balance lg:mb-16">
            Capacités techniques
          </h2>
          <ol className="grid grid-cols-1 border-t border-ink/15 lg:grid-cols-2">
            {expertise.capabilities.map((cap, i) => {
              const [term, ...rest] = cap.split(" : ");
              const description = rest.join(" : ");
              return (
                <li
                  key={cap}
                  className="flex gap-5 border-b border-ink/15 py-7 lg:odd:border-r lg:odd:pr-10 lg:even:pl-10"
                >
                  <span className="shrink-0 font-mono text-[13px] text-steel/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <h3 className="text-[16px] font-medium text-ink">{term}</h3>
                    {description ? (
                      <p className="max-w-[46ch] text-[14px] leading-relaxed text-ink-soft">{description}</p>
                    ) : null}
                  </div>
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* OPERATIONAL VALUE */}
      <section className="bg-steel-tint">
        <Container className="py-20 sm:py-24">
          <Eyebrow>Rôle dans l&apos;offre MA+</Eyebrow>
          <p className="mt-6 max-w-[64ch] text-[clamp(1.25rem,2.4vw,1.75rem)] font-medium leading-[1.35] tracking-[-0.005em] text-ink text-balance">
            {expertise.operationalValue}
          </p>
        </Container>
      </section>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="bg-white">
          <Container className="py-20 sm:py-28">
            <Eyebrow>Expertises liées</Eyebrow>
            <ul className="mt-8 grid grid-cols-1 gap-8 border-t border-ink/15 pt-8 sm:grid-cols-3">
              {related.map((item) => (
                <li key={item.slug}>
                  <Link href={expertiseHref(item.slug)} className="group flex flex-col gap-2">
                    <span className="font-mono text-[13px] text-steel/70">{item.index}</span>
                    <span className="text-[17px] font-medium text-ink transition-colors group-hover:text-steel">
                      {item.name}
                    </span>
                    <span className="text-[14px] leading-relaxed text-ink-soft">{item.summary}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      ) : null}

      {/* CTA */}
      <ClosingCta
        title={`${ctas.talkAboutInfrastructure.label}.`}
        body={`Un besoin en ${expertise.name} ? Échangeons sur votre installation.`}
      >
        <CtaLink
          href={ctas.talkAboutInfrastructure.href}
          variant="primary"
          className="bg-steel hover:bg-white hover:text-ink"
        >
          {ctas.contactUs.label}
        </CtaLink>
        <CtaLink
          href={routes.maintenance}
          variant="secondary"
          className="border-white/25 text-white hover:border-white hover:text-white"
        >
          {ctas.discoverMaintenance.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
