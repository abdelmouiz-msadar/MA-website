import { getExpertiseBySlug } from "@/lib/content/expertises";

export const contactHero = {
  eyebrow: "Contact",
  title: "Parlons de votre infrastructure.",
  lead: "Un besoin en maintenance, facility management ou infrastructure technique ? Échangeons sur vos enjeux.",
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

/** Needs that aren't an expertise domain get their own photo; the rest reuse the domain's card photo. */
const extraNeedImages: Record<string, string> = {
  "facility-management": "/images/hero-ducting-inspection.jpg",
  autre: "/images/technicians-diagnostic-device.jpg",
};

export const needImage = (value: string) => getExpertiseBySlug(value)?.image ?? extraNeedImages[value] ?? "";

export const isNeed = (value: string | null): value is string => needOptions.some((o) => o.value === value);

/** Microcopy for the guided contact request (describes the interaction only — no promises about response times). */
export const contactBuilder = {
  steps: [
    { label: "Votre besoin", title: "Sur quel domaine pouvons-nous vous accompagner ?" },
    { label: "Votre projet", title: "Décrivez votre installation et vos enjeux." },
    { label: "Vos coordonnées", title: "Comment vous joindre ?" },
  ],
  stepCounter: (current: number, total: number) => `Étape ${current} sur ${total}`,
  next: "Continuer",
  back: "Retour",
  edit: "Modifier",
  submit: "Envoyer le message",
  messagePlaceholder: "Type de site, équipements concernés, contraintes, calendrier…",
  summaryTitle: "Votre demande",
  summaryEmpty: "À compléter",
  successTitle: "Votre demande est prête.",
  orCall: "Vous préférez nous appeler ?",
  restart: "Nouvelle demande",
  copy: "Copier",
  copied: "Copié",
  directions: "Itinéraire",
  errors: {
    need: "Sélectionnez votre besoin.",
    message: "Votre message est requis.",
    name: "Votre nom est requis.",
    email: "Votre email est requis.",
    emailFormat: "Format d'email invalide.",
  },
  notice: {
    idle: "Ce formulaire ouvre votre client email avec un message pré-rempli — aucun envoi automatique n'est encore connecté à ce site.",
    ready: (email: string) => `Votre client email va s'ouvrir avec votre message pré-rempli, à destination de ${email}.`,
  },
};
