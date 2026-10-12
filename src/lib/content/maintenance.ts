export const maintenanceHero = {
  eyebrow: "Maintenance",
  title: "Maintenance multi-technique.",
  lead: "Une gestion proactive, préventive, curative et corrective, qui anticipe les problèmes avant qu'ils ne surviennent pour maximiser la disponibilité et la performance de vos équipements.",
};

export const availability = {
  eyebrow: "Disponibilité",
  title: "Des interventions rapides, 24 heures sur 24, 7 jours sur 7.",
  body: "Nous assurons des interventions rapides pour garantir la continuité de vos services, quelle que soit l'heure. Une équipe réactive prend en charge les incidents et en limite l'impact sur votre activité.",
};

export const tooling = {
  eyebrow: "GMAO & GTB",
  image: "/images/control-room-monitoring.jpg",
  imageAlt: "Supervision et suivi technique dans une salle de contrôle Maintenance Assistance Plus",
  title: "Piloter la maintenance par la donnée, sans automatiser à l'aveugle.",
  paragraphs: [
    "Nous intégrons des outils de GMAO (Gestion de Maintenance Assistée par Ordinateur) pour planifier les interventions, suivre leur exécution et garantir la traçabilité de chaque action sur vos équipements.",
    "La GTB (Gestion Technique du Bâtiment) complète ce dispositif : elle permet une surveillance à distance et une maintenance prédictive, en s'appuyant sur des capteurs plutôt que sur des inspections systématiques.",
  ],
};

export type CycleStep = {
  index: string;
  label: string;
};

export const operationalCycle: CycleStep[] = [
  { index: "01", label: "Diagnostic" },
  { index: "02", label: "Planification" },
  { index: "03", label: "Intervention" },
  { index: "04", label: "Suivi & traçabilité" },
  { index: "05", label: "Reporting" },
  { index: "06", label: "Amélioration continue" },
];

export const maintenanceCta = {
  title: "Parlons de votre maintenance.",
  body: "Un parc d'équipements à sécuriser, une continuité de service à garantir ? Échangeons sur votre stratégie de maintenance.",
};
