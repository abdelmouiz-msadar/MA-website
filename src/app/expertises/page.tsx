import type { Metadata } from "next";
import { SplitFeature } from "@/components/sections/editorial";
import { NextPage } from "@/components/sections/next-page";
import { PageHero, QuickAccess } from "@/components/sections/page-hero";
import { TextLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { expertises } from "@/lib/content/expertises";
import { primaryNav } from "@/lib/content/navigation";
import { expertisesPage, maintenancePageLabels } from "@/lib/content/pages";
import { expertiseHref, routes } from "@/lib/content/routes";
import { ui } from "@/lib/content/ui";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "Huit domaines techniques — courants forts, courants faibles, CVC, fluides médicaux, plomberie, construction, maintenance, aménagements. L'index complet des capacités techniques de Maintenance Assistance Plus.",
};

const maintenanceLabel = primaryNav.find((item) => item.href === routes.maintenance)?.label ?? "";

export default function ExpertisesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: expertisesPage.eyebrow }]} title={expertisesPage.title} lead={expertisesPage.lead} image={expertisesPage.image} imagePosition="50% 30%">
        <QuickAccess label={ui.quickAccess} items={expertises.map((exp) => ({ href: `#${exp.slug}`, label: exp.shortLabel ?? exp.name }))} />
      </PageHero>

      <section className="bg-background py-section-y text-text">
        <Container>
          <ol className="flex flex-col gap-20 md:gap-28 lg:gap-40">
            {expertises.map((exp, i) => (
              <li key={exp.slug}>
                <SplitFeature id={exp.slug} index={i + 1} total={expertises.length} title={exp.name} image={exp.cover} reversed={i % 2 === 1}>
                  <p className="max-w-md text-lg text-muted">{exp.summary}</p>
                  <TextLink href={expertiseHref(exp.slug)} className="mt-8">
                    {expertisesPage.discover}
                  </TextLink>
                </SplitFeature>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <NextPage href={routes.maintenance} label={maintenanceLabel} image={maintenancePageLabels.image} />
    </>
  );
}
