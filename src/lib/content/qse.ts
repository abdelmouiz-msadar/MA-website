export const qseHero = {
  eyebrow: "QSE",
  title: "Qualité, sécurité, environnement.",
  lead: "Dans une démarche d'amélioration continue, nous appliquons un système de management intégré Qualité, Sécurité et Environnement, conforme aux exigences des normes internationales en vigueur.",
};

export type QseCertificate = {
  code: string;
  standard: string;
  title: string;
  description: string;
  image: string;
};

export const qseCertificates: QseCertificate[] = [
  {
    code: "01",
    standard: "ISO 9001 : 2015",
    title: "Qualité et excellence opérationnelle",
    description:
      "Application de standards élevés pour prolonger la durée de vie des équipements et optimiser leur performance, conformément à la norme internationale ISO 9001.",
    image: "/images/qse/cert-iso-9001.jpg",
  },
  {
    code: "02",
    standard: "ISO 45001 : 2018",
    title: "Sécurité et prévention des risques",
    description:
      "Protocoles stricts de prévention des risques garantissant la sécurité des collaborateurs et des usagers, conformément à la norme internationale ISO 45001.",
    image: "/images/qse/cert-iso-45001.jpg",
  },
  {
    code: "03",
    standard: "ISO 14001 : 2015",
    title: "Responsabilité environnementale",
    description:
      "Réduction de l'empreinte carbone grâce à des pratiques durables — optimisation énergétique, tri et recyclage des déchets — conformément à la norme internationale ISO 14001.",
    image: "/images/qse/cert-iso-14001.jpg",
  },
];

export const qseCertifiedBy = "Certifié Bureau Veritas Certification";

export const qseCommitment = {
  eyebrow: "Engagement",
  title: "Une certification qui engage, pas un argument marketing.",
  paragraphs: [
    "Cette certification témoigne de notre engagement à fournir des prestations de qualité, à garantir la santé et la sécurité de nos collaborateurs, et à maîtriser l'impact de nos activités sur l'environnement.",
    "Elle s'inscrit dans le respect des exigences réglementaires et des attentes de nos parties prenantes, dans une logique d'amélioration continue plutôt que de conformité ponctuelle.",
  ],
};
