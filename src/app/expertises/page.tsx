import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { CtaLink } from "@/components/ui/cta-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExpertiseIndex } from "@/components/sections/expertise-index";
import { ClosingCta } from "@/components/sections/closing-cta";
import { expertises } from "@/lib/content/expertises";
import { ctas } from "@/lib/content/cta";

export const metadata: Metadata = {
  title: "Expertises",
  description:
    "Huit domaines techniques — courants forts, courants faibles, CVC, fluides médicaux, plomberie, construction, maintenance, aménagements. L'index complet des capacités techniques de Maintenance Assistance Plus.",
};

export default function ExpertisesPage() {
  return (
    <>
      <section className="border-b border-ink/10 bg-paper">
        <Container className="flex flex-col gap-6 py-16 sm:py-20 lg:py-24">
          <SectionHeading
            titleAs="h1"
            eyebrow="Expertises"
            title="L'index technique de nos capacités."
            lead="Huit domaines, une seule équipe. Chaque expertise couvre l'ensemble du cycle de vie des installations — de l'étude à la maintenance — dans le respect des normes en vigueur."
          />
        </Container>
      </section>

      <section className="bg-paper">
        <Container className="py-20 sm:py-28">
          <ExpertiseIndex items={expertises} showCapabilities />
        </Container>
      </section>

      <ClosingCta
        title="Une question sur une expertise en particulier ?"
        body="Chaque site a ses contraintes. Échangeons sur les vôtres pour identifier les bonnes priorités techniques."
      >
        <CtaLink href={ctas.contactUs.href} variant="primary" className="bg-steel hover:bg-white hover:text-ink">
          {ctas.contactUs.label}
        </CtaLink>
      </ClosingCta>
    </>
  );
}
