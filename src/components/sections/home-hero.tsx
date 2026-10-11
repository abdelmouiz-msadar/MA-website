import Image from "next/image";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/heading";
import { hero } from "@/lib/content/site";

export function HomeHero() {
  return (
    <section className="relative flex min-h-[640px] items-center overflow-hidden bg-navy-deep text-white h-svh">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-ducting-inspection.jpg"
          alt="Techniciens Maintenance Assistance Plus lors d'une inspection d'installation CVC"
          fill
          preload
          sizes="100vw"
          className="hero-zoom object-cover object-[50%_68%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_32_45/0.72)_0%,rgb(8_32_45/0.5)_35%,rgb(8_32_45/0.55)_65%,rgb(8_32_45/0.88)_100%)]" />
      </div>

      <Container className="relative z-10 flex flex-col items-center pt-24 text-center lg:pt-32">
        <Eyebrow tone="image">
          {hero.eyebrow}
        </Eyebrow>
        <h1 className="mt-6 max-w-[24ch] text-[clamp(2.75rem,6vw,5rem)] font-bold leading-[1.04] tracking-[-0.015em] text-balance">
          {hero.title}
        </h1>
        <p className="mt-6 max-w-[56ch] text-[17px] leading-relaxed text-white/85 sm:text-[19px]">{hero.lead}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          <ButtonLink href={hero.primaryCta.href} variant="text" tone="dark" size="lg">
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="text" tone="dark" size="lg">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>
      </Container>

      <div aria-hidden className="absolute bottom-0 left-1/2 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent to-white/70" />
    </section>
  );
}
