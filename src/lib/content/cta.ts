import { routes } from "@/lib/content/routes";

/** Centralized CTA vocabulary — reuse these rather than inventing new wording per page. */
export const ctas = {
  discoverExpertises: { label: "Découvrir nos expertises", href: routes.expertises },
  discoverMaintenance: { label: "Découvrir la maintenance", href: routes.maintenance },
  ourApproach: { label: "Notre approche", href: routes.approach },
  contactUs: { label: "Nous contacter", href: routes.contact },
  talkAboutInfrastructure: { label: "Parler de votre infrastructure", href: routes.contact },
  talkAboutMaintenance: { label: "Parler de votre maintenance", href: routes.contact },
} as const;
