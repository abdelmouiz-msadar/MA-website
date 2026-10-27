import type { Metadata } from "next";
import Image from "next/image";
import { NextPage } from "@/components/sections/next-page";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";
import { Eyebrow, SectionHeader } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { careersHero } from "@/lib/content/careers";
import { primaryNav } from "@/lib/content/navigation";
import { qseCertificates, qseCertifiedBy, qseCommitment, qseHero } from "@/lib/content/qse";
import { routes } from "@/lib/content/routes";

export const metadata: Metadata = {
  title: "QSE",
  description:
    "Qualité, sécurité, environnement : le système de management intégré de Maintenance Assistance Plus, certifié ISO 9001, ISO 45001 et ISO 14001 par Bureau Veritas.",
};

const careersLabel = primaryNav.find((item) => item.href === routes.careers)?.label ?? "";

export default function QsePage() {
  return (
    <>
      <PageHero crumbs={[{ label: qseHero.eyebrow }]} title={qseHero.title} lead={qseHero.lead} image={qseHero.image} imagePosition="50% 40%" />

      {/* CERTIFICATES */}
      <section className="bg-background py-section-y text-text">
        <Container>
          <SectionHeader eyebrow={qseCertifiedBy} title={qseHero.certificatesTitle} />
          <ol className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-3">
            {qseCertificates.map((cert, i) => (
              <Reveal as="li" key={cert.code} delay={i * 90}>
                <div className="bg-surface px-8 pt-10 pb-8 sm:px-10">
                  <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden border border-border bg-white">
                    <Image
                      src={cert.image}
                      alt={`Certificat Bureau Veritas — ${cert.standard}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 80vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <p className="eyebrow mt-7 text-muted">
                  <span className="text-accent">{cert.code}</span>
                  <span aria-hidden className="mx-2 opacity-50">
                    /
                  </span>
                  {cert.standard}
                </p>
                <h2 className="mt-3 text-h3 font-semibold">{cert.title}</h2>
                <p className="mt-3 max-w-sm text-muted">{cert.description}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* COMMITMENT — dark */}
      <section className="theme-dark bg-background py-section-y text-text">
        <Container>
          <div className="grid grid-cols-4 gap-x-4 gap-y-10 md:grid-cols-8 md:gap-x-6 lg:grid-cols-12">
            <div className="col-span-4 md:col-span-8 lg:col-span-5">
              <Reveal>
                <Eyebrow>{qseCommitment.eyebrow}</Eyebrow>
              </Reveal>
              <Reveal as="h2" className="mt-5 max-w-md text-h2 font-semibold text-balance">
                {qseCommitment.title}
              </Reveal>
            </div>
            <div className="col-span-4 flex flex-col gap-6 md:col-span-8 lg:col-span-6 lg:col-start-7 lg:pt-10">
              {qseCommitment.paragraphs.map((p) => (
                <Reveal as="p" key={p} className="text-lg text-text/80">
                  {p}
                </Reveal>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <NextPage href={routes.careers} label={careersLabel} image={careersHero.image} />
    </>
  );
}
