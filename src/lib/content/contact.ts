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
