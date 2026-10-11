/** Section-level copy for each page (wording carried over unchanged from v1). */

export const homeSections = {
  expertises: {
    eyebrow: "Expertises",
    title: "Huit domaines techniques, une seule équipe.",
    lead: "Des courants forts aux aménagements, nous couvrons l'ensemble des disciplines nécessaires à la continuité de vos infrastructures.",
  },
  maintenance: {
    eyebrow: "Maintenance",
    title: "Anticiper plutôt que subir.",
    lead: "Une gestion proactive du cycle de vie de vos équipements pour maximiser leur disponibilité et la performance de vos installations.",
    availabilityLabel: "Support & astreinte",
    availabilityValue: "24/7",
  },
  commitments: {
    eyebrow: "Nos engagements",
    title: "Ce que nous garantissons à chaque collaboration.",
  },
  approach: {
    eyebrow: "Notre approche",
    title: "Une méthode éprouvée, du diagnostic à l'amélioration continue.",
  },
  qse: {
    eyebrow: "QSE",
    title: "Qualité, sécurité, environnement.",
  },
};

/** "MA+ en chiffres" — counts taken directly from brochure facts; no external statistics. */
export const keyFigures = {
  title: "MA+ en chiffres",
  items: [
    { value: "24/7", label: "Support et astreinte pour la continuité des services" },
    { value: "8", label: "Domaines d'expertise technique" },
    { value: "3", label: "Certifications ISO — 9001, 45001 et 14001" },
    { value: "4", label: "Types de maintenance : préventive, corrective, prédictive, réglementaire" },
  ],
};

export const expertisesPage = {
  eyebrow: "Expertises",
  title: "L'index technique de nos capacités.",
  lead: "Huit domaines, une seule équipe. Chaque expertise couvre l'ensemble du cycle de vie des installations — de l'étude à la maintenance — dans le respect des normes en vigueur.",
  cta: {
    title: "Une question sur une expertise en particulier ?",
    body: "Chaque site a ses contraintes. Échangeons sur les vôtres pour identifier les bonnes priorités techniques.",
  },
};

export const expertiseDetailLabels = {
  overview: "Vue d'ensemble",
  capabilities: "Capacités techniques",
  role: "Rôle dans l'offre MA+",
  related: "Expertises liées",
  ctaTitle: "Parler de votre infrastructure.",
  ctaBody: (name: string) => `Un besoin en ${name} ? Échangeons sur votre installation.`,
};

export const aboutDimensions = {
  eyebrow: "Énergie, confort, bien-être",
  title: "Des dimensions interconnectées, pas des promesses isolées.",
};

export const maintenancePageLabels = {
  cycleTitle: "Le cycle opérationnel",
};

export const approachPage = {
  eyebrow: "Notre approche",
  title: "Une méthode éprouvée, du diagnostic à l'amélioration continue.",
  lead: "Chaque collaboration suit un processus structuré en quatre étapes, conçu pour s'adapter aux enjeux spécifiques de chaque infrastructure tout en gardant une rigueur opérationnelle constante.",
  cta: {
    title: "Une méthode qui s'applique à votre infrastructure.",
    body: "Échangeons sur l'état actuel de vos installations pour définir la première étape : l'analyse et le diagnostic.",
  },
};

export const qsePageCta = {
  title: "Une exigence qui structure chaque intervention.",
  body: "Pour en savoir plus sur notre organisation et notre approche, découvrez qui nous sommes.",
};

export const contactLabels = {
  address: "Adresse",
  phone: "Téléphone",
  email: "Email",
};

export const notFoundPage = {
  eyebrow: "Erreur 404",
  title: "Page introuvable.",
  lead: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export const footerContent = {
  tagline:
    "Experts multi-techniques, fiables et réactifs. Facility Management et maintenance multi-technique au service de la continuité de vos infrastructures.",
  certifications: "ISO 9001 · ISO 45001 · ISO 14001 — Certifié Bureau Veritas",
  rights: "Tous droits réservés.",
};
