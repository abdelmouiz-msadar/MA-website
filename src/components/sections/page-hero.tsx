import Link from "next/link";
import type { ReactNode } from "react";
import { Container } from "@/components/ui/container";
import { Eyebrow, HighlightText } from "@/components/ui/heading";
import { HomeIcon } from "@/components/ui/icons";

export type Crumb = { label: string; href?: string };

/** Interior page hero — pale wash, centered breadcrumb, large split-colour headline (ENGIE interior pattern). */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  highlight,
  lead,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  highlight?: string;
  lead?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <section className="bg-wash pt-32 pb-16 sm:pb-20 lg:pt-48 lg:pb-24">
      <Container className="flex flex-col items-center text-center">
        <nav aria-label="Fil d'Ariane">
          <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[14px] text-ink">
            <li>
              <Link href="/" className="flex items-center text-navy hover:text-brand" aria-label="Accueil">
                <HomeIcon size={16} />
              </Link>
            </li>
            {crumbs.map((crumb, i) => {
              const last = i === crumbs.length - 1;
              return (
                <li key={crumb.label} className="flex items-center gap-2">
                  <span aria-hidden className="text-muted">
                    /
                  </span>
                  {crumb.href && !last ? (
                    <Link href={crumb.href} className="hover:text-brand">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span aria-current={last ? "page" : undefined} className={last ? "font-bold text-navy" : undefined}>
                      {crumb.label}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>

        {eyebrow ? <Eyebrow className="mt-10">{eyebrow}</Eyebrow> : null}
        <h1
          className={`${eyebrow ? "mt-5" : "mt-10"} max-w-[20ch] text-[clamp(2.375rem,5.2vw,4.25rem)] font-bold leading-[1.06] tracking-[-0.015em] text-navy text-balance`}
        >
          <HighlightText title={title} highlight={highlight} />
        </h1>
        {lead ? <p className="mt-7 max-w-[62ch] text-[17px] leading-relaxed text-ink/85 sm:text-[20px]">{lead}</p> : null}
        {children}
      </Container>
    </section>
  );
}
