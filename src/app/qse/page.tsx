import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { SectionIntro } from "@/components/ui/heading";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ClosingCta } from "@/components/sections/closing-cta";
import { qseCertificates, qseCertifiedBy, qseCommitment, qseHero } from "@/lib/content/qse";
import { qsePageCta } from "@/lib/content/pages";
import { primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/content/routes";
import { ctas } from "@/lib/content/cta";

export const metadata: Metadata = {
  title: "QSE",
  description:
    "Qualité, sécurité, environnement : le système de management intégré de Maintenance Assistance Plus, certifié ISO 9001, ISO 45001 et ISO 14001 par Bureau Veritas.",
};

const aboutLabel = primaryNav.find((item) => item.href === routes.about)?.label ?? "";

export default function QsePage() {
  return (
    <>
      <PageHero crumbs={[{ label: qseHero.eyebrow }]} title={qseHero.title} highlight="Qualité," lead={qseHero.lead} />

      {/* CERTIFICATES */}
      <section className="bg-white py-20 sm:py-28">
        <Container>
          <ol className="grid grid-cols-1 gap-x-8 gap-y-16 md:grid-cols-3">
            {qseCertificates.map((cert, i) => (
              <Reveal as="li" key={cert.code} delay={i * 110} className="flex flex-col">
                <div className="bg-wash px-8 pt-10 pb-8 sm:px-10">
                  <div className="relative mx-auto aspect-[3/4] w-full max-w-[300px] overflow-hidden border border-line bg-white shadow-[0_28px_56px_-30px_rgb(12_47_64/0.5)]">
                    <Image
                      src={cert.image}
                      alt={`Certificat Bureau Veritas — ${cert.standard}`}
                      fill
                      sizes="(min-width: 768px) 25vw, 80vw"
                      className="object-cover object-top"
                    />
                  </div>
                </div>
                <div className="mt-7 flex items-baseline gap-3">
                  <span className="text-[15px] font-bold text-brand">{cert.code}</span>
                  <span className="text-[15px] font-bold uppercase tracking-[0.08em] text-brand">{cert.standard}</span>
                </div>
                <h2 className="mt-3 text-[23px] font-bold leading-snug text-navy">{cert.title}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink/80">{cert.description}</p>
              </Reveal>
            ))}
          </ol>
          <p className="mt-16 border-t border-line pt-8 text-center text-[16px] font-bold text-navy">{qseCertifiedBy}</p>
        </Container>
      </section>

      {/* COMMITMENT — inset navy panel */}
      <section className="bg-white pb-20 sm:pb-28">
        <Container>
          <Reveal className="overflow-hidden">
            <div className="bg-deep grid grid-cols-1 gap-10 px-7 py-14 text-white sm:px-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-16 lg:py-20">
              <SectionIntro tone="dark" eyebrow={qseCommitment.eyebrow} title={qseCommitment.title} highlight="pas un argument marketing." size="sub" />
              <div className="flex flex-col gap-6 lg:pt-10">
                {qseCommitment.paragraphs.map((p) => (
                  <p key={p} className="max-w-[58ch] text-[17px] leading-relaxed text-white/85">
                    {p}
                  </p>
                ))}
              </div>
            </div>
            <div className="brand-line w-[86%]" />
          </Reveal>
        </Container>
      </section>

      <ClosingCta title={qsePageCta.title} body={qsePageCta.body}>
        <ButtonLink href={routes.about} variant="solid">
          {aboutLabel}
        </ButtonLink>
        <ButtonLink href={ctas.contactUs.href}>{ctas.contactUs.label}</ButtonLink>
      </ClosingCta>
    </>
  );
}
