export const aboutHero = {
  eyebrow: "Qui sommes-nous",
  title: "Votre infrastructure. Notre expertise.",
  lead: "Maintenance Assistance Plus est le partenaire de confiance des entreprises pour la gestion et l'optimisation de leurs infrastructures.",
  image: "/images/team-cta-inspection.jpg",
  imageAlt: "Équipe technique Maintenance Assistance Plus lors d'une intervention sur site",
};

export const positioning = {
  eyebrow: "Positionnement",
  title: "Un partenaire technique, pas un simple prestataire.",
  paragraphs: [
    "Depuis sa création, Maintenance Assistance Plus s'adapte aux évolutions et aux besoins de ses clients, dans une logique de croissance continue.",
    "Nous nous engageons à offrir des solutions sur mesure, alliant expertise technique, innovation et proximité — plutôt que des prestations standardisées appliquées sans distinction d'un site à l'autre.",
  ],
};

export const missionQuote =
  "Vous offrir une tranquillité d'esprit totale pour vous permettre de vous concentrer sur votre cœur de métier.";

export const proximityBlock = {
  expertise: {
    label: "Expertise technique",
    body: "Un large éventail de compétences techniques et managériales, mobilisé pour répondre à l'ensemble des besoins de gestion d'infrastructures — des études préalables au suivi opérationnel.",
  },
  proximity: {
    label: "Proximité",
    body: "Notre philosophie repose sur une relation de proximité et de confiance. Nous nous engageons à comprendre les enjeux spécifiques de chaque client pour proposer des solutions réellement adaptées à ses besoins.",
  },
  outcome: {
    label: "Bénéfice client",
    body: "Grâce à cette collaboration, nos clients se recentrent sur leur cœur de métier et allègent leur structure — en particulier leurs fonctions support — pour gagner en flexibilité et en efficience.",
  },
};

export type Dimension = {
  index: string;
  title: string;
  body: string;
};

export const dimensions: Dimension[] = [
  {
    index: "01",
    title: "Efficacité énergétique",
    body: "Nous réduisons durablement la consommation d'énergie de nos clients et les accompagnons dans une démarche éco-responsable.",
  },
  {
    index: "02",
    title: "Confort & sécurité",
    body: "Nous créons des espaces de travail qui allient esthétisme, confort et sécurité, pour favoriser le bien-être des équipes.",
  },
  {
    index: "03",
    title: "Attractivité",
    body: "Des infrastructures mieux gérées et plus confortables renforcent directement l'attractivité de la structure pour ses équipes comme pour ses visiteurs.",
  },
];

export const continuity = {
  eyebrow: "Continuité de service",
  title: "Un fonctionnement optimal, en continu.",
  paragraphs: [
    "Nos interventions couvrent les aménagements, la rénovation, la maintenance et les services d'ingénierie technique — avec un objectif constant : garantir un fonctionnement optimal des équipements pour assurer la qualité et la continuité du service.",
    "Grâce à notre expertise, nous assurons un suivi rigoureux et une maintenance proactive, plutôt qu'une gestion par intervention subie.",
  ],
  image: "/images/technicians-diagnostic-device.jpg",
  imageAlt: "Techniciens Maintenance Assistance Plus lors d'un diagnostic d'équipement",
};

export const aboutCta = {
  title: "Découvrir nos expertises.",
  body: "Huit domaines techniques, une seule équipe — de l'électricité aux fluides médicaux.",
  cta: { label: "Découvrir nos expertises", href: "/expertises" },
};
