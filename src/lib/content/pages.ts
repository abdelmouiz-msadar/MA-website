/** Section-level copy for each page (wording carried over from v1 wherever it existed). */

import { routes } from "@/lib/content/routes";

export const homeSections = {
  /** Copy for this band lives in about.ts (dimensionsIntro). */
  dimensions: {
    image: "/images/team-cta-inspection.jpg",
    imageAlt: "Équipe technique Maintenance Assistance Plus lors d'une intervention sur site",
  },
  expertises: {
    eyebrow: "Expertises",
    title: "Huit domaines techniques, une seule équipe.",
    lead: "Des courants forts aux aménagements, nous couvrons l'ensemble des disciplines nécessaires à la continuité de vos infrastructures.",
  },
  maintenance: {
    eyebrow: "Maintenance",
    title: "Anticiper plutôt que subir.",
    lead: "Une gestion proactive du cycle de vie de vos équipements pour maximiser la disponibilité et la performance de vos installations.",
    availabilityLabel: "Support & astreinte",
    availabilityValue: "24/7",
  },
  commitments: {
    eyebrow: "Nos engagements",
    title: "Ce que nous garantissons à chaque collaboration.",
    lead: "Une maintenance proactive, des interventions tracées, des coûts maîtrisés.",
  },
  approach: {
    eyebrow: "Notre approche",
    title: "Une méthode éprouvée, du diagnostic à l'amélioration continue.",
    lead: "Un processus structuré en quatre étapes, adapté aux enjeux de chaque infrastructure.",
  },
  qse: {
    eyebrow: "QSE",
    title: "Qualité, sécurité, environnement.",
    feature: {
      label: "Système de management intégré",
      title: "Une certification qui engage, pas un argument marketing.",
      image: "/images/control-room-monitoring.jpg",
      imageAlt: "Supervision et suivi technique dans une salle de contrôle",
    },
  },
};

/** "MA+ en chiffres" — counts taken directly from brochure facts; no external statistics. */
export const keyFigures = [
  { value: "24/7", label: "Support & astreinte", href: routes.maintenance },
  { value: "8", label: "Domaines d'expertise", href: routes.expertises },
  { value: "4", label: "Étapes, une méthode", href: routes.approach },
  { value: "3", label: "Certifications ISO", href: routes.qse },
];

export const expertisesPage = {
  eyebrow: "Expertises",
  title: "L'index technique de nos capacités.",
  lead: "Huit domaines, une seule équipe. Chaque expertise couvre l'ensemble du cycle de vie des installations — de l'étude à la maintenance — dans le respect des normes en vigueur.",
  image: "/images/control-room-monitoring.jpg",
  discover: "Découvrir l'expertise",
};

export const expertiseDetailLabels = {
  overview: "Vue d'ensemble",
  capabilities: "Capacités techniques",
  role: "Rôle dans l'offre MA+",
  related: "Expertises liées",
  contactAbout: (shortLabel: string) => `Parler de votre projet ${shortLabel}`,
};

export const maintenancePageLabels = {
  typesEyebrow: "Quatre types de maintenance",
  typesTitle: "Une stratégie adaptée à chaque infrastructure.",
  cycleEyebrow: "Méthode",
  cycleTitle: "Le cycle opérationnel",
  image: "/images/hero-ducting-inspection.jpg",
};

export const approachPage = {
  eyebrow: "Notre approche",
  title: "Une méthode éprouvée, du diagnostic à l'amélioration continue.",
  lead: "Chaque collaboration suit un processus structuré en quatre étapes, conçu pour s'adapter aux enjeux spécifiques de chaque infrastructure tout en gardant une rigueur opérationnelle constante.",
  image: "/images/technician-hands-on.jpg",
  detailsEyebrow: "Concrètement",
  detailsTitle: "Analyser, planifier, exécuter, améliorer.",
  stepImages: [
    "/images/technicians-diagnostic-device.jpg",
    "/images/control-room-monitoring.jpg",
    "/images/team-cta-inspection.jpg",
    "/images/technician-electrical-cabinet.jpg",
  ],
};

export const notFoundPage = {
  eyebrow: "Erreur 404",
  title: "Page introuvable.",
  lead: "La page que vous recherchez n'existe pas ou a été déplacée.",
  image: "/images/control-room-monitoring.jpg",
};

export const footerContent = {
  motto: "Experts multi-techniques, fiables et réactifs.",
  tagline: "Facility Management et maintenance multi-technique au service de la continuité de vos infrastructures.",
  certifications: "ISO 9001 · ISO 45001 · ISO 14001 — Certifié Bureau Veritas",
  rights: "Tous droits réservés.",
  expertisesHeading: "Expertises",
  contactHeading: "Contact",
};
