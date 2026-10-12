export const contactHero = {
  eyebrow: "Contact",
  title: "Parlons de votre infrastructure.",
  lead: "Un besoin en maintenance, facility management ou infrastructure technique ? Échangeons sur vos enjeux.",
  image: "/images/team-cta-inspection.jpg",
  writeUs: "Écrivez-nous",
  callUs: "Appelez-nous",
};

export type NeedOption = { value: string; label: string };

export const needOptions: NeedOption[] = [
  { value: "facility-management", label: "Facility Management" },
  { value: "maintenance", label: "Maintenance" },
  { value: "cfo", label: "Courants Forts (CFO)" },
  { value: "cfa", label: "Courants Faibles (CFA)" },
  { value: "cvc", label: "CVC" },
  { value: "fluides-medicaux", label: "Fluides Médicaux" },
  { value: "plomberie", label: "Plomberie" },
  { value: "construction", label: "Construction" },
  { value: "amenagements", label: "Aménagements" },
  { value: "autre", label: "Autre" },
];

export const isNeed = (value: string | null): value is string => needOptions.some((o) => o.value === value);

/** Microcopy for the contact form (describes the interaction only — no promises about response times). */
export const contactForm = {
  asideEyebrow: "Votre message",
  asideTitle: "Décrivez-nous votre besoin en quelques lignes.",
  howEyebrow: "Comment ça marche",
  how: [
    { title: "Vous décrivez votre besoin", body: "Quelques informations sur vous et sur votre installation." },
    { title: "Votre messagerie s'ouvre", body: "Avec un email pré-rempli, adressé à notre équipe." },
    { title: "Vous vérifiez, puis envoyez", body: "Rien ne part sans votre validation : ce site ne transmet ni ne conserve aucune donnée." },
  ],
  addressEyebrow: "Adresse",
  directions: "Itinéraire",
  required: "Les champs marqués d'un * sont obligatoires.",
  sections: { contact: "Vos coordonnées", project: "Votre besoin", message: "Votre message" },
  fields: {
    nom: "Nom",
    societe: "Société",
    email: "Email",
    telephone: "Téléphone",
    site: "Type de site, équipements concernés",
    message: "Message",
  },
  needsLegend: "Domaine concerné",
  needsHint: "(facultatif, plusieurs choix possibles)",
  messageMax: 1500,
  counter: (n: number, max: number) => `${n} / ${max} caractères`,
  submit: "Préparer mon email",
  errors: {
    nom: "Votre nom est requis.",
    email: "Votre email est requis.",
    emailFormat: "Format d'email invalide.",
    message: "Votre message est requis.",
    summary: "Merci de compléter les champs obligatoires.",
  },
  ready: "Votre messagerie s'ouvre avec votre message pré-rempli.",
  notice: (email: string) =>
    `Votre messagerie s'ouvre avec un email pré-rempli, adressé à ${email} : il n'est envoyé que lorsque vous le validez. Sans messagerie configurée sur cet appareil, vous pouvez nous écrire ou nous appeler directement.`,
};
