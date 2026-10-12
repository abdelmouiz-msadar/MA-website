import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { hero } from "@/lib/content/site";
import { ui } from "@/lib/content/ui";

export function HomeHero() {
  return (
    <section className="relative flex min-h-svh w-full flex-col overflow-hidden bg-ink">
      <div className="intro-settle absolute inset-0">
        <Image
          src="/images/hero-ducting-inspection.jpg"
          alt="Techniciens Maintenance Assistance Plus lors d'une inspection d'installation CVC"
          fill
          preload
          sizes="100vw"
          className="object-cover object-[50%_68%]"
        />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/75 via-black/15 to-black/10" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_top,rgb(0_0_0/0.3),transparent_70%),linear-gradient(to_right,rgb(0_0_0/0.5),rgb(0_0_0/0.35)_45%,transparent_80%)] [mask-image:linear-gradient(to_top,#000_55%,transparent_90%)]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/0 from-20% via-black/30 via-55% to-black/0 to-90% md:hidden" />
      {/* Keeps the navigation legible over bright ceilings. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-linear-to-b from-black/60 to-transparent" />

      <Container className="relative mt-auto pt-32 pb-8 md:pb-10">
        <p className="intro-fade eyebrow text-white/90" style={{ animationDelay: "0.1s" }}>
          {hero.eyebrow}
        </p>
        <div className="-mb-2 mt-4 overflow-hidden pb-2">
          <h1 className="intro-mask max-w-2xl text-display font-semibold text-balance text-white">{hero.title}</h1>
        </div>

        <div className="intro-fade mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap md:mt-10" style={{ animationDelay: "0.45s" }}>
          <ButtonLink href={hero.primaryCta.href} variant="inverted">
            {hero.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={hero.secondaryCta.href} variant="outline-light">
            {hero.secondaryCta.label}
          </ButtonLink>
        </div>

        <div
          className="intro-fade mt-12 flex items-end justify-between gap-6 border-t border-white/20 pt-6 md:mt-16"
          style={{ animationDelay: "0.7s" }}
        >
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {hero.pillars.map((pillar) => (
              <li key={pillar} className="text-sm font-medium text-white/80">
                {pillar}
              </li>
            ))}
          </ul>
          <a
            href="#positionnement"
            className="group hidden shrink-0 items-center gap-3 text-sm font-medium text-white/80 transition-colors hover:text-white md:flex"
          >
            {ui.scroll}
            <span aria-hidden className="relative h-9 w-px overflow-hidden bg-white/25">
              <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-cue bg-white" />
            </span>
          </a>
        </div>
      </Container>
    </section>
  );
}
