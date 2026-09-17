import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { ClosingCta } from "@/components/sections/closing-cta";
import { qseHero, qseCertificates, qseCertifiedBy, qseCommitment } from "@/lib/content/qse";
import { ctas } from "@/lib/content/cta";
import { routes } from "@/lib/content/routes";

export const metadata: Metadata = {
  title: "QSE",
  description:
    "Qualité, sécurité, environnement : le système de management intégré de Maintenance Assistance Plus, certifié ISO 9001, ISO 45001 et ISO 14001 par Bureau Veritas.",
};

export default function QsePage() {
  return (
    <>
      {/* HERO */}
      <section className="border-b border-ink/10 bg-paper">
        <Container className="flex flex-col gap-6 py-16 sm:py-20 lg:py-24">
          <Eyebrow>{qseHero.eyebrow}</Eyebrow>
          <h1 className="max-w-[18ch] text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.06] tracking-[-0.02em] text-ink text-balance">
            {qseHero.title}
          </h1>
          <p className="max-w-[58ch] text-[17px] leading-relaxed text-ink-soft sm:text-[19px]">
            {qseHero.lead}
          </p>
        </Container>
      </section>

      {/* CERTIFICATES */}
      <section className="bg-white">
        <Container className="py-20 sm:py-28">
          <ol className="grid grid-cols-1 gap-12 border-t border-ink/15 pt-12 sm:grid-cols-3 sm:gap-8">
            {qseCertificates.map((cert) => (
              <li key={cert.code} className="flex flex-col gap-5">
                <div className="relative aspect-[3/4] w-full max-w-[340px] overflow-hidden border border-ink/10 bg-grey-100">
                  <Image
                    src={cert.image}
                    alt={`Certificat Bureau Veritas — ${cert.standard}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 80vw"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[13px] text-steel/70">{cert.code}</span>
                    <span className="font-mono text-[13px] text-steel">{cert.standard}</span>
                  </div>
                  <h2 className="text-[17px] font-medium text-ink">{cert.title}</h2>
                  <p className="max-w-[36ch] text-[14px] leading-relaxed text-ink-soft">{cert.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-14 border-t border-ink/15 pt-6 text-[13px] font-mono uppercase tracking-[0.1em] text-ink-soft">
            {qseCertifiedBy}
          </p>
        </Container>
      </section>

      {/* COMMITMENT */}
      <section className="bg-steel-tint">
        <Container className="grid grid-cols-1 gap-10 py-20 sm:py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading eyebrow={qseCommitment.eyebrow} title={qseCommitment.title} />
          <div className="flex flex-col gap-6 lg:pt-2">
            {qseCommitment.paragraphs.map((p) => (
              <p key={p} className="max-w-[58ch] text-[16px] leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <ClosingCta
        title="Une exigence qui structure chaque intervention."
        body="Pour en savoir plus sur notre organisation et notre approche, découvrez qui nous sommes."
      >
        <CtaLink href={routes.about} variant="primary" className="bg-steel hover:bg-white hover:text-ink">
          Qui sommes-nous
        </CtaLink>
        <CtaLink
          href={ctas.contactUs.href}
          variant="secondary"
          className="border-white/25 text-white hover:border-white hover:text-white"
        >
          {ctas.contactUs.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
