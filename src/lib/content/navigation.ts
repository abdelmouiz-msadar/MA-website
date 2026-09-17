export type NavItem = {
  label: string;
  href: string;
};

export const primaryNav: NavItem[] = [
  { label: "Accueil", href: "/" },
  { label: "Qui sommes-nous", href: "/qui-sommes-nous" },
  { label: "Expertises", href: "/expertises" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Notre approche", href: "/notre-approche" },
  { label: "QSE", href: "/qse" },
  { label: "Contact", href: "/contact" },
];

export const contactInfo = {
  companyName: "Maintenance Assistance Plus",
  addressLines: [
    "Kamal Park, Imm A 30, Etg 5",
    "Angle Bd. Rachidi et Bd Zerktouni",
    "Mohammedia, Maroc",
  ],
  email: "contact@maintenanceassistanceplus.com",
  phone: "+212 5 23 31 20 45",
  phoneHref: "+212523312045",
};
