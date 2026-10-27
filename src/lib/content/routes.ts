export const routes = {
  home: "/",
  about: "/qui-sommes-nous",
  expertises: "/expertises",
  maintenance: "/maintenance",
  approach: "/notre-approche",
  qse: "/qse",
  careers: "/carrieres",
  contact: "/contact",
} as const;

export const expertiseHref = (slug: string) => `/expertises/${slug}`;
