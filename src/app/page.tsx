import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow, HighlightText, SectionIntro } from "@/components/ui/heading";
import { ArrowRight, ClockIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { HomeHero } from "@/components/sections/home-hero";
import { Statement } from "@/components/sections/statement";
import { KeyFigures } from "@/components/sections/key-figures";
import { ImageCard } from "@/components/sections/image-card";
import { ClosingCta } from "@/components/sections/closing-cta";
import { expertises } from "@/lib/content/expertises";
import { expertiseHref, routes } from "@/lib/content/routes";
import { ctas } from "@/lib/content/cta";
import { homeSections } from "@/lib/content/pages";
import { qseCertificates } from "@/lib/content/qse";
import {
  commitments,
  finalCta,
  introduction,
  maintenanceTypes,
  processSteps,
  qseCertifiedBy,
  qseStandards,
} from "@/lib/content/site";

export default function Home() {
  return (
    <>
      <HomeHero />

      {/* WHO WE ARE — statement + detail */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-[1080px]">
            <Eyebrow>{introduction.eyebrow}</Eyebrow>
            <Statement text={introduction.lead} className="mt-6" />
            <div className="mt-10">
              <ButtonLink href={routes.about}>{introduction.eyebrow}</ButtonLink>
            </div>
          </div>

          <div className="mt-20 grid grid-cols-1 items-center gap-12 lg:mt-28 lg:grid-cols-2 lg:gap-20">
            <Reveal className="relative aspect-[4/3] overflow-hidden bg-wash lg:aspect-[5/4]">
              <Image
                src="/images/technicians-diagnostic-device.jpg"
                alt="Techniciens Maintenance Assistance Plus lors d'un diagnostic d'équipement"
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={120} className="flex flex-col gap-6">
              <h2 className="text-[clamp(1.875rem,3.2vw,2.75rem)] font-bold leading-[1.12] tracking-[-0.01em] text-navy text-balance">
                <HighlightText title={introduction.title} highlight="Notre expertise." />
              </h2>
              {introduction.body.map((p) => (
                <p key={p} className="max-w-[58ch] text-[17px] leading-relaxed text-ink/85">
                  {p}
                </p>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      <KeyFigures />

      {/* EXPERTISES — image cards */}
      <section className="bg-wash py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionIntro
              align="center"
              eyebrow={homeSections.expertises.eyebrow}
              title={homeSections.expertises.title}
              highlight="une seule équipe."
              lead={homeSections.expertises.lead}
            />
          </Reveal>
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {expertises.map((exp, i) => (
              <Reveal as="li" key={exp.slug} delay={(i % 4) * 90}>
                <ImageCard
                  href={expertiseHref(exp.slug)}
                  image={exp.image}
                  title={exp.name}
                  label={exp.index}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                  className="aspect-[4/5]"
                />
              </Reveal>
            ))}
          </ul>
          <div className="mt-12 flex justify-center">
            <ButtonLink href={ctas.discoverExpertises.href}>{ctas.discoverExpertises.label}</ButtonLink>
          </div>
        </Container>
      </section>

      {/* MAINTENANCE — deep gradient block */}
      <section className="bg-deep py-24 text-white sm:py-32">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionIntro
                tone="dark"
                eyebrow={homeSections.maintenance.eyebrow}
                title={homeSections.maintenance.title}
                highlight="plutôt que subir."
                lead={homeSections.maintenance.lead}
              />
            </Reveal>
            <Reveal delay={120} className="shrink-0">
              <ButtonLink href={ctas.discoverMaintenance.href} tone="dark">
                {ctas.discoverMaintenance.label}
              </ButtonLink>
            </Reveal>
          </div>

          <ol className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {maintenanceTypes.map((type, i) => (
              <Reveal as="li" key={type.title} delay={i * 90} className="flex flex-col bg-white p-7 text-ink lg:p-8">
                <span className="text-[44px] font-bold leading-none text-brand">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-6 text-[22px] font-bold text-navy">{type.title}</h3>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{type.description}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="mt-6 flex flex-col gap-3 border border-white/20 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
            <span className="flex items-center gap-3 text-[17px] text-white/90">
              <ClockIcon size={22} className="text-brand-light" />
              {homeSections.maintenance.availabilityLabel}
            </span>
            <span className="text-[40px] font-bold leading-none">{homeSections.maintenance.availabilityValue}</span>
          </Reveal>
        </Container>
      </section>

      {/* COMMITMENTS */}
      <section className="bg-white py-24 sm:py-32">
        <Container>
          <Reveal>
            <SectionIntro
              align="center"
              eyebrow={homeSections.commitments.eyebrow}
              title={homeSections.commitments.title}
              highlight="chaque collaboration."
            />
          </Reveal>
          <ul className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {commitments.map((item, i) => (
              <Reveal
                as="li"
                key={item.index}
                delay={(i % 4) * 90}
                className="flex flex-col border border-line border-t-[3px] border-t-brand bg-white p-7"
              >
                <span className="text-[15px] font-bold text-brand">{item.index}</span>
                <h3 className="mt-4 text-[20px] font-bold leading-snug text-navy">{item.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{item.description}</p>
              </Reveal>
            ))}
            <Reveal as="li" delay={270}>
              <Link
                href={routes.contact}
                className="group flex h-full min-h-56 flex-col justify-between bg-brand p-7 text-white transition-colors hover:bg-brand-dark"
              >
                <span className="text-[22px] font-bold leading-snug text-balance">{finalCta.title}</span>
                <span className="flex items-center gap-2 text-[15px] font-bold">
                  {finalCta.cta.label}
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          </ul>
        </Container>
      </section>

      {/* APPROACH */}
      <section className="bg-wash py-24 sm:py-32">
        <Container>
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionIntro
                eyebrow={homeSections.approach.eyebrow}
                title={homeSections.approach.title}
                highlight="Une méthode éprouvée,"
              />
            </Reveal>
            <Reveal delay={120} className="shrink-0">
              <ButtonLink href={ctas.ourApproach.href}>{ctas.ourApproach.label}</ButtonLink>
            </Reveal>
          </div>

          <div className="relative mt-16">
            <div aria-hidden className="brand-line absolute top-[27px] right-0 left-0 hidden h-[2px] opacity-60 lg:block" />
            <ol className="relative grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {processSteps.map((step, i) => (
              <Reveal as="li" key={step.index} delay={i * 110} className="relative flex flex-col">
                <span className="relative z-10 flex h-14 w-14 items-center justify-center bg-brand text-[20px] font-bold text-white">
                  {step.index}
                </span>
                <h3 className="mt-7 text-[21px] font-bold leading-snug text-navy">{step.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{step.description}</p>
              </Reveal>
            ))}
            </ol>
          </div>
        </Container>
      </section>

      {/* QSE */}
      <section className="bg-white py-24 sm:py-32">
        <Container className="grid grid-cols-1 items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
          <Reveal className="flex flex-col gap-10">
            <SectionIntro eyebrow={homeSections.qse.eyebrow} title={homeSections.qse.title} highlight="Qualité," />
            <ul className="flex flex-col">
              {qseStandards.map((std) => (
                <li key={std.code} className="grid grid-cols-[112px_1fr] gap-6 border-t border-line py-5 last:border-b">
                  <span className="text-[17px] font-bold text-brand">{std.code}</span>
                  <span>
                    <span className="block text-[17px] font-bold text-navy">{std.title}</span>
                    <span className="mt-1 block text-[15px] leading-relaxed text-ink/80">{std.description}</span>
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
              <span className="text-[15px] font-bold text-navy">{qseCertifiedBy}</span>
              <ButtonLink href={routes.qse} variant="text">
                {homeSections.qse.eyebrow}
              </ButtonLink>
            </div>
          </Reveal>

          <Reveal delay={150} className="grid grid-cols-3 gap-3 sm:gap-5">
            {qseCertificates.map((cert, i) => (
              <div
                key={cert.code}
                className={`relative aspect-[3/4] overflow-hidden border border-line bg-white shadow-[0_24px_48px_-28px_rgb(12_47_64/0.45)] ${i === 1 ? "lg:-translate-y-8" : ""}`}
              >
                <Image src={cert.image} alt={`Certificat Bureau Veritas — ${cert.standard}`} fill sizes="(min-width: 1024px) 16vw, 30vw" className="object-cover object-top" />
              </div>
            ))}
          </Reveal>
        </Container>
      </section>

      <ClosingCta title={finalCta.title} body={finalCta.body} showNeeds>
        <ButtonLink href={finalCta.cta.href} variant="solid">
          {finalCta.cta.label}
        </ButtonLink>
      </ClosingCta>
    </>
  );
}
