import Image from "next/image";
import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";

/** Interior page hero — full-bleed photo under ink gradients, breadcrumb, display headline, lead. */
export function PageHero({
  crumbs,
  title,
  lead,
  image,
  imagePosition,
  children,
}: {
  crumbs: Crumb[];
  title: string;
  lead?: ReactNode;
  image: string;
  /** CSS object-position for the photo, e.g. "50% 30%". */
  imagePosition?: string;
  children?: ReactNode;
}) {
  return (
    <header className="theme-dark relative isolate flex min-h-[74svh] flex-col overflow-hidden bg-ink text-text lg:min-h-[80svh]">
      <div aria-hidden className="intro-settle absolute inset-0 -z-20">
        <Image src={image} alt="" fill preload sizes="100vw" className="object-cover" style={{ objectPosition: imagePosition }} />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink/55" />
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-64 bg-linear-to-b from-ink/70 to-transparent" />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-t from-ink via-ink/45 to-transparent" />

      <Container className="mt-auto pt-36 pb-10 md:pt-44 md:pb-14">
        <Breadcrumb crumbs={crumbs} className="intro-fade" />
        <div className="-mb-2 mt-5 overflow-hidden pb-2">
          <h1 className="intro-mask max-w-4xl text-display font-semibold text-balance text-white">{title}</h1>
        </div>
        {lead ? (
          <p className="intro-fade mt-6 max-w-2xl text-lg text-white/80" style={{ animationDelay: "0.45s" }}>
            {lead}
          </p>
        ) : null}
        {children ? (
          <div className="intro-fade" style={{ animationDelay: "0.6s" }}>
            {children}
          </div>
        ) : null}
      </Container>
    </header>
  );
}

/** Row of anchor chips under a hero ("Accès rapide"). */
export function QuickAccess({ label, items }: { label: string; items: { href: string; label: string }[] }) {
  return (
    <nav aria-label={label} className="mt-12 border-t border-white/20 pt-6 md:mt-16">
      <p className="eyebrow text-white/70">{label}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {items.map((item) => (
          <li key={item.href}>
            <a
              href={item.href}
              className="inline-flex min-h-[44px] items-center border border-white/25 px-4 text-sm font-medium text-white transition-colors duration-300 ease-editorial hover:border-white hover:bg-white hover:text-ink"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
