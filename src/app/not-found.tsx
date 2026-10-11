import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { PageHero } from "@/components/sections/page-hero";
import { ctas } from "@/lib/content/cta";
import { primaryNav } from "@/lib/content/navigation";
import { routes } from "@/lib/content/routes";
import { notFoundPage } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: notFoundPage.title,
};

const homeLabel = primaryNav.find((item) => item.href === routes.home)?.label ?? "";

export default function NotFound() {
  return (
    <PageHero crumbs={[{ label: notFoundPage.eyebrow }]} title={notFoundPage.title} lead={notFoundPage.lead}>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <ButtonLink href={routes.home} variant="solid">
          {homeLabel}
        </ButtonLink>
        <ButtonLink href={ctas.discoverExpertises.href}>{ctas.discoverExpertises.label}</ButtonLink>
      </div>
    </PageHero>
  );
}
