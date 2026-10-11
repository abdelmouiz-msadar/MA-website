import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { keyFigures } from "@/lib/content/pages";
import { ctas } from "@/lib/content/cta";

export function KeyFigures() {
  return (
    <section className="relative overflow-hidden bg-navy-deep text-white">
      <Image src="/images/team-cta-inspection.jpg" alt="" fill sizes="100vw" className="object-cover object-center" />
      <div className="absolute inset-0 bg-[linear-gradient(100deg,rgb(8_32_45/0.92)_0%,rgb(8_32_45/0.78)_45%,rgb(12_47_64/0.6)_100%)]" />

      <Container className="relative grid grid-cols-1 gap-14 py-24 sm:py-32 lg:grid-cols-[1fr_1fr] lg:items-center lg:gap-20">
        <Reveal className="flex flex-col items-start gap-8">
          <h2 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold leading-[1.02] tracking-[-0.015em]">{keyFigures.title}</h2>
          <ButtonLink href={ctas.discoverExpertises.href} variant="text" tone="dark" size="lg">
            {ctas.discoverExpertises.label}
          </ButtonLink>
        </Reveal>

        <dl className="grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
          {keyFigures.items.map((item, i) => (
            <Reveal key={item.value} delay={i * 120} className="border-t border-white/25 pt-6">
              <dt className="text-[clamp(3.25rem,6vw,5rem)] font-bold leading-none tracking-[-0.02em]">{item.value}</dt>
              <dd className="mt-4 max-w-[30ch] text-[16px] leading-snug text-white/80">{item.label}</dd>
            </Reveal>
          ))}
        </dl>
      </Container>
    </section>
  );
}
