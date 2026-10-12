export const hero = {
  eyebrow: "Facility Management — Maintenance multi-technique",
  title: "Experts multi-techniques, fiables et réactifs.",
  lead: "Maintenance Assistance Plus accompagne les entreprises dans la gestion, la maintenance et l'optimisation de leurs infrastructures, avec une équipe technique disponible 24/7.",
  primaryCta: { label: "Découvrir nos expertises", href: "/expertises" },
  secondaryCta: { label: "Nous contacter", href: "/contact" },
  /** Short facts along the bottom rule of the hero. */
  pillars: ["Support & astreinte 24/7", "8 domaines techniques", "ISO 9001 · 45001 · 14001"],
};

export const introduction = {
  eyebrow: "Qui sommes-nous",
  title: "Votre infrastructure. Notre expertise.",
  lead: "Maintenance Assistance Plus est votre partenaire de confiance pour la gestion et l'optimisation de vos infrastructures.",
  body: [
    "Nous nous engageons à offrir des solutions sur mesure, alliant expertise technique, innovation et proximité. Notre mission : vous offrir une tranquillité d'esprit totale pour vous permettre de vous concentrer sur votre cœur de métier.",
    "Notre philosophie repose sur une relation de proximité et de confiance. Grâce à notre collaboration, vous vous recentrez sur vos activités principales et allégez votre structure, en particulier les fonctions support, pour gagner en flexibilité et en efficience.",
  ],
  link: "Découvrir MA+",
  scope: {
    label: "Nos interventions couvrent",
    items: ["Aménagements", "Rénovation", "Maintenance", "Ingénierie technique"],
  },
};

export type Commitment = {
  index: string;
  title: string;
  description: string;
};

export const commitments: Commitment[] = [
  {
    index: "01",
    title: "Maintenance proactive",
    description:
      "Une gestion proactive, préventive, curative et corrective, anticipant les problèmes avant qu'ils ne surviennent pour maximiser la disponibilité et la performance des équipements.",
  },
  {
    index: "02",
    title: "Fiabilité & réactivité",
    description: "Des interventions rapides assurées 24 heures sur 24, 7 jours sur 7.",
  },
  {
    index: "03",
    title: "Formation continue",
    description:
      "Un perfectionnement continu des équipes techniques pour garantir un service performant qui tient compte des évolutions technologiques.",
  },
  {
    index: "04",
    title: "Respect des réglementations",
    description:
      "Une conformité en toutes circonstances aux normes en vigueur : sécurité, environnement, accessibilité.",
  },
  {
    index: "05",
    title: "Transparence & traçabilité",
    description:
      "Des rapports détaillés sur les interventions et l'état des installations pour une gestion claire et maîtrisée.",
  },
  {
    index: "06",
    title: "Optimisation des coûts",
    description: "Les solutions les plus rentables et durables pour réduire les dépenses d'exploitation.",
  },
  {
    index: "07",
    title: "Pilotage & reporting",
    description: "Utilisation d'outils de GMAO et GTB pour un suivi en temps réel des performances.",
  },
];

export type MaintenanceType = {
  title: string;
  description: string;
  image: string;
};

export const maintenanceTypes: MaintenanceType[] = [
  {
    title: "Préventive",
    description:
      "Interventions planifiées pour éviter les pannes et prolonger la durée de vie des équipements.",
    image: "/images/technician-hands-on.jpg",
  },
  {
    title: "Corrective",
    description: "Réparation rapide des équipements en cas de dysfonctionnement.",
    image: "/images/domains/maintenance-intervention.jpg",
  },
  {
    title: "Prédictive",
    description:
      "Capteurs et analyse de données pour anticiper les pannes avant qu'elles ne surviennent.",
    image: "/images/domains/cfa-control-cabinet.jpg",
  },
  {
    title: "Réglementaire",
    description: "Vérification des équipements conformément aux obligations légales et normes en vigueur.",
    image: "/images/technicians-diagnostic-device.jpg",
  },
];

export type ProcessStep = {
  index: string;
  title: string;
  description: string;
  details: string[];
};

export const processSteps: ProcessStep[] = [
  {
    index: "01",
    title: "Analyse & diagnostic",
    description:
      "Identifier vos besoins et évaluer l'état de vos infrastructures pour définir une stratégie de maintenance sur mesure.",
    details: [
      "Recueil des besoins et des priorités",
      "Audit technique des équipements (CFO, CFA, CVC, PLM)",
      "Analyse des risques et de la conformité réglementaire",
      "Évaluation des coûts et préconisations",
    ],
  },
  {
    index: "02",
    title: "Planification & mise en place",
    description:
      "Structurer une stratégie de maintenance préventive, corrective et prédictive pour assurer la continuité d'exploitation.",
    details: [
      "Définition du plan de maintenance",
      "Mise en place d'une GMAO pour un suivi précis des interventions",
      "Planification des interventions et gestion des priorités",
      "Gestion des stocks et de la logistique des pièces de rechange",
    ],
  },
  {
    index: "03",
    title: "Exécution & suivi opérationnel",
    description: "Assurer l'efficacité des interventions et minimiser l'impact des pannes sur vos activités.",
    details: [
      "Maintenance préventive : inspections, nettoyage, remplacement des pièces usées",
      "Gestion des pannes via la GMAO, adaptée à leur criticité",
      "Surveillance à distance et maintenance prédictive via GTB",
      "Reporting en temps réel des KPIs et optimisation énergétique",
    ],
  },
  {
    index: "04",
    title: "Contrôle qualité & amélioration continue",
    description: "Optimiser les performances et garantir un service de qualité à long terme.",
    details: [
      "Formation continue des équipes",
      "Modernisation des équipements et solutions d'efficacité énergétique",
      "Retour d'expérience et ajustement des prestations",
    ],
  },
];

export type QseStandard = {
  code: string;
  /** One-word pillar, for compact figures. */
  short: string;
  title: string;
  description: string;
};

export const qseStandards: QseStandard[] = [
  {
    code: "ISO 9001",
    short: "Qualité",
    title: "Qualité et excellence opérationnelle",
    description:
      "Application de standards élevés pour prolonger la durée de vie des équipements et optimiser leur performance, conformément à la norme internationale ISO 9001.",
  },
  {
    code: "ISO 45001",
    short: "Sécurité",
    title: "Sécurité et prévention des risques",
    description:
      "Protocoles stricts de prévention des risques garantissant la sécurité des collaborateurs et des usagers, conformément à la norme internationale ISO 45001.",
  },
  {
    code: "ISO 14001",
    short: "Environnement",
    title: "Responsabilité environnementale",
    description:
      "Réduction de l'empreinte carbone grâce à des pratiques durables — optimisation énergétique, tri et recyclage des déchets — conformément à la norme internationale ISO 14001.",
  },
];

export const qseCertifiedBy = "Certifié Bureau Veritas Certification";

export const finalCta = {
  eyebrow: "Vos installations",
  title: "Parlons de vos installations.",
  body: "Un besoin en maintenance, facility management ou infrastructure technique ? Échangeons sur vos enjeux.",
  cta: { label: "Nous contacter", href: "/contact" },
};
