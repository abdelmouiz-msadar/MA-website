import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { ctas } from "@/lib/content/cta";
import { primaryNav } from "@/lib/content/navigation";
import { notFoundPage } from "@/lib/content/pages";
import { routes } from "@/lib/content/routes";

export const metadata: Metadata = {
  title: notFoundPage.title,
};

const homeLabel = primaryNav.find((item) => item.href === routes.home)?.label ?? "";

export default function NotFound() {
  return (
    <PageHero crumbs={[{ label: notFoundPage.eyebrow }]} title={notFoundPage.title} lead={notFoundPage.lead} image={notFoundPage.image}>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={routes.home} variant="inverted">
          {homeLabel}
        </ButtonLink>
        <ButtonLink href={ctas.discoverExpertises.href} variant="outline-light">
          {ctas.discoverExpertises.label}
        </ButtonLink>
      </div>
    </PageHero>
  );
}
