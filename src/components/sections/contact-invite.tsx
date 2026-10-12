import Image from "next/image";
import Link from "next/link";
import { AvailabilityBadge } from "@/components/ui/availability-badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { HighlightText } from "@/components/ui/heading";
import { ChevronRight, PhoneIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { contactBuilder, needImage, needOptions } from "@/lib/content/contact";
import { contactInfo } from "@/lib/content/navigation";
import { routes } from "@/lib/content/routes";
import { finalCta } from "@/lib/content/site";

/** Homepage contact section — choosing a need here opens the contact builder with it pre-selected. */
export function ContactInvite() {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep py-24 text-white sm:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="glow-drift absolute -top-1/3 -left-1/4 h-[140%] w-[85%] bg-[radial-gradient(closest-side,rgb(76_176_216/0.26),transparent)]" />
        <div className="glow-drift absolute -right-1/4 -bottom-1/3 h-[130%] w-[80%] bg-[radial-gradient(closest-side,rgb(30_100_137/0.6),transparent)] [animation-delay:-8s]" />
      </div>

      <Container className="grid grid-cols-1 gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-20">
        <Reveal className="flex flex-col items-start gap-7">
          <AvailabilityBadge />
          <h2 className="text-[clamp(2.25rem,4.6vw,4rem)] font-bold leading-[1.05] tracking-[-0.015em] text-balance">
            <HighlightText title={finalCta.title} highlight="vos installations." tone="dark" />
          </h2>
          <p className="max-w-[46ch] text-[18px] leading-relaxed text-white/80">{finalCta.body}</p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5 pt-2">
            <ButtonLink href={finalCta.cta.href} variant="solid" tone="dark">
              {finalCta.cta.label}
            </ButtonLink>
            <a href={`tel:${contactInfo.phoneHref}`} className="group inline-flex items-center gap-3 text-[17px] font-bold text-white">
              <span className="flex h-12 w-12 items-center justify-center border border-white/30 transition-colors duration-300 group-hover:border-white group-hover:bg-white group-hover:text-navy">
                <PhoneIcon size={20} />
              </span>
              {contactInfo.phone}
            </a>
          </div>
        </Reveal>

        <Reveal delay={150} className="bg-white p-6 text-ink shadow-[0_40px_90px_-40px_rgb(0_0_0/0.6)] sm:p-9">
          <p className="text-[13px] font-bold uppercase tracking-[0.12em] text-brand">{contactBuilder.steps[0].label}</p>
          <p className="mt-3 text-[clamp(1.375rem,2.1vw,1.75rem)] leading-snug font-bold text-navy">{contactBuilder.steps[0].title}</p>
          <ul className="mt-7 grid grid-cols-1 border-t border-line sm:grid-cols-2 sm:gap-x-6">
            {needOptions.map((opt) => (
              <li key={opt.value} className="border-b border-line">
                <Link
                  href={`${routes.contact}?sujet=${opt.value}`}
                  className="group -mx-3 flex items-center gap-4 px-3 py-3 transition-colors duration-300 hover:bg-wash"
                >
                  <span className="relative h-11 w-11 shrink-0 overflow-hidden bg-navy-deep">
                    <Image
                      src={needImage(opt.value)}
                      alt=""
                      fill
                      sizes="44px"
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="flex-1 text-[16px] font-bold text-navy transition-colors duration-300 group-hover:text-brand">
                    {opt.label}
                  </span>
                  <ChevronRight
                    size={18}
                    className="shrink-0 text-muted transition-[color,transform] duration-300 group-hover:translate-x-1 group-hover:text-brand"
                  />
                </Link>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
