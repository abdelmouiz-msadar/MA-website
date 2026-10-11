import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { PageHero } from "@/components/sections/page-hero";
import { ImageCard } from "@/components/sections/image-card";
import { ClosingCta } from "@/components/sections/closing-cta";
import { expertises } from "@/lib/content/expertises";
import { expertiseHref } from "@/lib/content/routes";
import { ctas } from "@/lib/content/cta";
import { expertisesPage } from "@/lib/content/pages";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "Huit domaines techniques — courants forts, courants faibles, CVC, fluides médicaux, plomberie, construction, maintenance, aménagements. L'index complet des capacités techniques de Maintenance Assistance Plus.",
};

export default function ExpertisesPage() {
  return (
    <>
      <PageHero crumbs={[{ label: expertisesPage.eyebrow }]} title={expertisesPage.title} highlight="nos capacités." lead={expertisesPage.lead} />

      <section className="bg-deep py-20 text-white sm:py-28">
        <Container>
          <ul className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {expertises.map((exp, i) => (
              <Reveal as="li" key={exp.slug} delay={(i % 4) * 90} className="flex flex-col gap-5">
                <ImageCard
                  href={expertiseHref(exp.slug)}
                  image={exp.image}
                  title={exp.name}
                  label={exp.index}
                  sizes="(min-width: 1024px) 23vw, (min-width: 640px) 46vw, 100vw"
                  className="aspect-[3/4] border border-white/15"
                />
                <p className="text-[15px] leading-relaxed text-white/80">{exp.summary}</p>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <ClosingCta title={expertisesPage.cta.title} body={expertisesPage.cta.body}>
        <ButtonLink href={ctas.contactUs.href} variant="solid">
          {ctas.contactUs.label}
        </ButtonLink>
      </ClosingCta>
    </>
  );
}
