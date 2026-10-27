import { contactInfo } from "@/lib/content/navigation";

export const careersHero = {
  eyebrow: "Carrières",
  title: "Rejoignez une équipe multi-technique.",
  lead: "Électricité, CVC, fluides, maintenance : chez Maintenance Assistance Plus, chaque technicien contribue à la continuité de service des infrastructures de nos clients.",
  image: "/images/technician-hands-on.jpg",
};

export const careersAnchors = {
  why: "pourquoi-nous-rejoindre",
  trades: "metiers",
  offers: "offres",
  apply: "candidature",
};

export const whyJoin = {
  eyebrow: "Pourquoi nous rejoindre",
  title: "Progresser sur le terrain, dans huit domaines techniques.",
  paragraphs: [
    "Nos équipes interviennent sur l'ensemble des installations techniques de nos clients — des courants forts aux fluides médicaux — en préventif, en correctif comme en astreinte.",
    "Nous misons sur le perfectionnement continu de nos techniciens, pour garantir un service performant qui tient compte des évolutions technologiques.",
  ],
  image: "/images/team-cta-inspection.jpg",
  imageAlt: "Équipe technique Maintenance Assistance Plus lors d'une intervention sur site",
  pillars: [
    {
      title: "Formation continue",
      body: "Un perfectionnement continu des équipes techniques, pour suivre l'évolution des équipements et des technologies.",
    },
    {
      title: "Sécurité d'abord",
      body: "Des protocoles stricts de prévention des risques, dans le cadre de notre certification ISO 45001.",
    },
    {
      title: "Des missions variées",
      body: "Huit domaines techniques et des interventions préventives, correctives, prédictives et réglementaires.",
    },
  ],
};

export const trades = {
  eyebrow: "Nos métiers",
  title: "Les métiers de nos équipes.",
  lead: "Des profils techniques qui interviennent dans chacun de nos domaines d'expertise.",
  items: [
    "Électricien courants forts (H/F)",
    "Technicien courants faibles & GTB (H/F)",
    "Technicien CVC / frigoriste (H/F)",
    "Technicien fluides médicaux (H/F)",
    "Plombier (H/F)",
    "Technicien de maintenance multi-technique (H/F)",
    "Chef de chantier (H/F)",
    "Technicien aménagements (H/F)",
  ],
};

export type JobOffer = {
  /** Used in the URL (?poste=…) to preselect the offer in the application form. */
  slug: string;
  title: string;
  domain: string;
  location: string;
  contract: string;
  summary: string;
};

/**
 * Open positions shown on /carrieres. Leave empty when nothing is open — the page then
 * invites spontaneous applications. Example entry:
 * { slug: "technicien-cvc", title: "Technicien CVC (H/F)", domain: "CVC", location: "Mohammedia",
 *   contract: "CDI", summary: "Maintenance préventive et corrective des installations CVC de nos clients." }
 */
export const jobOffers: JobOffer[] = [];

export const offersSection = {
  eyebrow: "Offres d'emploi",
  title: "Nos offres du moment.",
  apply: "Postuler",
  emptyTitle: "Aucune offre n'est publiée pour le moment.",
  emptyBody: "Vous pouvez néanmoins nous adresser une candidature spontanée : précisez le domaine qui vous intéresse et joignez votre CV.",
  emptyCta: "Candidature spontanée",
};

/** Applications are prepared as an email to this address. */
export const applicationEmail = contactInfo.email;

export const applicationForm = {
  asideEyebrow: "Candidature",
  asideTitle: "Présentez-vous en quelques lignes.",
  howEyebrow: "Comment ça marche",
  how: [
    { title: "Vous complétez le formulaire", body: "Vos coordonnées, le domaine visé et quelques mots sur votre parcours." },
    { title: "Votre messagerie s'ouvre", body: "Avec un email pré-rempli : joignez-y votre CV avant l'envoi." },
    { title: "Vous vérifiez, puis envoyez", body: "Rien ne part sans votre validation : ce site ne transmet ni ne conserve aucune donnée." },
  ],
  required: "Les champs marqués d'un * sont obligatoires.",
  sections: { identity: "Vos coordonnées", position: "Le poste", message: "Votre motivation" },
  fields: {
    nom: "Nom et prénom",
    email: "Email",
    telephone: "Téléphone",
    ville: "Ville",
    poste: "Poste visé",
    message: "Parcours et motivation",
  },
  domainsLegend: "Domaine",
  domainsHint: "(facultatif, plusieurs choix possibles)",
  messageMax: 1500,
  counter: (n: number, max: number) => `${n} / ${max} caractères`,
  submit: "Préparer ma candidature",
  subjectPrefix: "[Candidature]",
  spontaneous: "Candidature spontanée",
  cvReminder: "CV : à joindre à cet email.",
  errors: {
    nom: "Votre nom est requis.",
    email: "Votre email est requis.",
    emailFormat: "Format d'email invalide.",
    message: "Quelques mots sur votre parcours sont requis.",
    summary: "Merci de compléter les champs obligatoires.",
  },
  ready: "Votre messagerie s'ouvre : pensez à joindre votre CV.",
  notice: (email: string) =>
    `Votre messagerie s'ouvre avec un email pré-rempli, adressé à ${email} : joignez-y votre CV, puis envoyez-le. Rien n'est transmis tant que vous ne l'avez pas validé.`,
};
