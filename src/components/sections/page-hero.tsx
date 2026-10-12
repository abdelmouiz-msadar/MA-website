import type { ReactNode } from "react";
import { Breadcrumb, type Crumb } from "@/components/ui/breadcrumb";
import { Container } from "@/components/ui/container";
import { Eyebrow, HighlightText } from "@/components/ui/heading";

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
        <Breadcrumb crumbs={crumbs} center />

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
