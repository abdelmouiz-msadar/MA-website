export type Expertise = {
  index: string;
  slug: string;
  name: string;
  shortLabel?: string;
  /** One-line positioning statement, used in hero contexts */
  positioning: string;
  /** Condensed teaser used on the homepage index */
  summary: string;
  /** Fuller "what MA+ covers" paragraph(s) for the detail page overview */
  overview: string[];
  /** Role of this domain within MA+'s broader Facility Management offering */
  operationalValue: string;
  capabilities: string[];
  /** Card / thumbnail photo (may be lower resolution) */
  image: string;
  /** Large placements — always a high-resolution original */
  cover: string;
  /** Slugs of related domains, for cross-linking */
  related: string[];
};

export const expertises: Expertise[] = [
  {
    index: "01",
    slug: "cfo",
    name: "Courants Forts",
    shortLabel: "CFO",
    positioning: "Sécuriser et optimiser l'alimentation électrique de vos infrastructures.",
    summary:
      "Études, dimensionnement, installation et sécurisation des réseaux électriques, de l'alimentation générale aux systèmes de secours.",
    overview: [
      "Nos équipes interviennent sur l'ensemble de la chaîne électrique : études et dimensionnement, installation et distribution, sécurisation des réseaux et maintenance dans la durée.",
      "Chaque installation est pensée pour la conformité réglementaire et la continuité de service, de l'armoire électrique jusqu'aux systèmes d'alimentation de secours.",
    ],
    operationalValue:
      "Une installation électrique fiable conditionne le fonctionnement de l'ensemble des autres systèmes techniques du bâtiment — c'est le socle sur lequel repose notre offre de Facility Management.",
    capabilities: [
      "Études et dimensionnement électrique : calcul des puissances, choix des transformateurs, TGBT, onduleurs",
      "Installation et distribution : armoires électriques, câblages, prises, éclairages, alimentation des machines",
      "Sécurisation des installations : protection contre les surtensions, disjoncteurs, mise à la terre, conformité NF C 15-100",
      "Éclairage et gestion énergétique : LED, détecteurs de présence, gradation automatique",
      "Systèmes d'alimentation de secours : groupes électrogènes et onduleurs",
    ],
    image: "/images/domains/cfo-transformer.jpg",
    cover: "/images/technician-electrical-cabinet.jpg",
    related: ["cfa", "cvc", "construction"],
  },
  {
    index: "02",
    slug: "cfa",
    name: "Courants Faibles",
    shortLabel: "CFA",
    positioning: "Connecter, sécuriser et surveiller vos infrastructures.",
    summary:
      "Réseaux informatiques, sécurité électronique et gestion technique du bâtiment pour des infrastructures connectées et surveillées.",
    overview: [
      "De la connectivité réseau à la sécurité électronique, nous concevons et maintenons les systèmes qui permettent de connecter, surveiller et automatiser vos bâtiments.",
      "Ces installations forment également le socle technique de la gestion technique du bâtiment (GTB/GTC) et de la maintenance prédictive par capteurs.",
    ],
    operationalValue:
      "Les systèmes courants faibles sont le socle des outils de supervision — GTB, vidéosurveillance, détection — sur lesquels s'appuie notre maintenance prédictive.",
    capabilities: [
      "Réseaux informatiques et téléphonie : câblage RJ45, fibre optique, WiFi",
      "Systèmes de sécurité : vidéosurveillance (CCTV), contrôle d'accès, alarme incendie et anti-intrusion",
      "Gestion technique du bâtiment (GTB/GTC) : suivi et régulation de l'éclairage, la CVC et l'énergie",
      "Automatisation et capteurs intelligents : surveillance des équipements, maintenance prédictive",
      "Signalétique et multimédia : affichage dynamique, sonorisation, interphonie",
    ],
    image: "/images/domains/cfa-control-cabinet.jpg",
    cover: "/images/control-room-monitoring.jpg",
    related: ["cfo", "cvc", "maintenance"],
  },
  {
    index: "03",
    slug: "cvc",
    name: "Chauffage, Ventilation et Climatisation",
    shortLabel: "CVC",
    positioning: "Garantir confort thermique et qualité de l'air, durablement.",
    summary:
      "Conception, installation et régulation des systèmes thermiques pour garantir confort, qualité de l'air et performance énergétique.",
    overview: [
      "Nous concevons, installons et régulons les systèmes de chauffage, ventilation et climatisation, à partir d'études thermiques et énergétiques propres à chaque site.",
      "La régulation par GTB et le contrôle de la qualité de l'air intérieur complètent cette offre pour un pilotage énergétique fin dans la durée.",
    ],
    operationalValue:
      "La performance CVC influence directement le confort des occupants et la facture énergétique du bâtiment — un point de vigilance constant dans notre approche de maintenance.",
    capabilities: [
      "Études thermiques et énergétiques : calcul des déperditions et gains pour dimensionner les équipements",
      "Systèmes de chauffage : chaudières, pompes à chaleur, radiateurs, planchers chauffants",
      "Climatisation et rafraîchissement : VRV/VRF, splits, groupes froids, roof-tops, free-cooling",
      "Ventilation et traitement d'air : CTA, VMC simple et double flux, désenfumage",
      "Régulation et GTB : automatisation pour optimiser la consommation énergétique",
      "Qualité de l'air intérieur : filtration, humidification, purification",
    ],
    image: "/images/domains/cvc-split-unit.jpg",
    cover: "/images/hero-ducting-inspection.jpg",
    related: ["cfo", "fluides-medicaux", "amenagements"],
  },
  {
    index: "04",
    slug: "fluides-medicaux",
    name: "Fluides Médicaux",
    shortLabel: "FM",
    positioning: "Une exigence de sécurité propre à l'environnement hospitalier.",
    summary:
      "Conception et sécurisation des réseaux de gaz médicaux, conformes aux normes hospitalières les plus strictes.",
    overview: [
      "Nous concevons et sécurisons les réseaux de distribution de gaz médicaux — oxygène, azote, air médical — dans le strict respect des normes hospitalières et de sécurité.",
      "L'évacuation des gaz anesthésiques et la détection de fuites complètent un dispositif pensé pour protéger personnel et patients.",
    ],
    operationalValue:
      "Dans un environnement hospitalier, la continuité de l'alimentation en fluides médicaux est une question de sécurité des patients autant que de conformité réglementaire.",
    capabilities: [
      "Étude des besoins : calcul des débits et pressions pour oxygène, azote, air médical et autres gaz",
      "Réseaux d'alimentation en gaz médicaux conformes aux normes hospitalières et de sécurité",
      "Évacuation des gaz anesthésiques : réseaux sécurisés protégeant personnel et patients",
      "Systèmes de pompage et surpression : compresseurs et groupes de surpression",
      "Traitement de l'air médical : filtration, humidification, purification",
      "Sécurité et conformité : détection de fuites et systèmes d'alerte",
    ],
    image: "/images/technician-hands-on.jpg",
    cover: "/images/technician-hands-on.jpg",
    related: ["cvc", "plomberie", "maintenance"],
  },
  {
    index: "05",
    slug: "plomberie",
    name: "Plomberie",
    shortLabel: "PLM",
    positioning: "Des réseaux d'eau maîtrisés, de l'adduction à l'évacuation.",
    summary:
      "Études hydrauliques, distribution d'eau, traitement et protection incendie pour une gestion fiable des réseaux fluides.",
    overview: [
      "Nous intervenons sur l'ensemble du cycle de l'eau : études hydrauliques, distribution d'eau potable, évacuation des eaux usées et pluviales.",
      "Traitement de l'eau et protection incendie complètent cette offre pour une gestion fiable et conforme des réseaux fluides.",
    ],
    operationalValue:
      "Une gestion rigoureuse des réseaux hydrauliques limite les risques de dégât des eaux et préserve la disponibilité des installations sanitaires.",
    capabilities: [
      "Étude des besoins hydrauliques : calcul des débits et pressions",
      "Réseaux d'alimentation en eau potable conformes aux normes sanitaires",
      "Évacuation des eaux usées et pluviales : réseaux gravitaires ou sous pression",
      "Systèmes de pompage et surpression pour un débit constant",
      "Traitement des eaux : adoucisseurs, filtres, réduction du tartre",
      "Protection incendie : sprinklers et RIA",
    ],
    image: "/images/domains/plomberie-pumps.jpg",
    cover: "/images/technicians-diagnostic-device.jpg",
    related: ["cvc", "fluides-medicaux", "construction"],
  },
  {
    index: "06",
    slug: "construction",
    name: "Construction",
    positioning: "Coordonner les corps de métier techniques, du chantier à la livraison.",
    summary:
      "Coordination des corps de métier techniques et mise en conformité des installations, hors génie civil.",
    overview: [
      "Nous assurons l'installation et la coordination des systèmes techniques — électricité, CVC, plomberie, sécurité, GTB — en veillant à la cohérence entre corps de métier.",
      "Tests de conformité, respect des délais et du budget encadrent chaque intervention jusqu'à la livraison.",
    ],
    operationalValue:
      "Une coordination technique rigoureuse en phase chantier conditionne la qualité et la maintenabilité des installations sur le long terme.",
    capabilities: [
      "Installation et maintenance des équipements : réseaux électriques, CVC, plomberie, sécurité, GTB",
      "Coordination des corps de métier : suivi des sous-traitants et des équipes internes",
      "Mise en conformité et tests avant livraison",
      "Intégration des solutions connectées pour la maintenance prédictive",
      "Respect des délais et du budget",
    ],
    image: "/images/team-cta-inspection.jpg",
    cover: "/images/team-cta-inspection.jpg",
    related: ["cfo", "cfa", "amenagements"],
  },
  {
    index: "07",
    slug: "maintenance",
    name: "Maintenance",
    positioning: "Préventive, corrective, prédictive, réglementaire.",
    summary:
      "Préventive, corrective, prédictive et réglementaire : une gestion complète du cycle de vie de vos équipements.",
    overview: [
      "Nous structurons une stratégie de maintenance adaptée à chaque infrastructure, combinant interventions planifiées, réactivité 24/7 et suivi par capteurs et GTB.",
      "Cette approche s'applique transversalement à l'ensemble des domaines techniques présentés sur ce site.",
    ],
    operationalValue:
      "La maintenance est au cœur de notre positionnement : elle conditionne la disponibilité, la durée de vie et la conformité de l'ensemble des installations techniques.",
    capabilities: [
      "Maintenance préventive : interventions planifiées pour éviter les pannes",
      "Maintenance corrective : réparation en cas de dysfonctionnement",
      "Maintenance prédictive : capteurs et analyse de données pour anticiper les pannes",
      "Maintenance réglementaire : conformité aux obligations légales",
      "Support et astreinte 24/7 : continuité des services",
    ],
    image: "/images/domains/maintenance-intervention.jpg",
    cover: "/images/technicians-diagnostic-device.jpg",
    related: ["cfa", "cvc", "construction"],
  },
  {
    index: "08",
    slug: "amenagements",
    name: "Aménagements",
    positioning: "Optimiser les espaces de travail et les locaux techniques.",
    summary:
      "Optimisation des espaces de travail et des locaux techniques, alliant conformité, confort et performance énergétique.",
    overview: [
      "Nous adaptons les espaces de travail comme les locaux techniques pour améliorer productivité, confort et conformité aux normes de sécurité et d'accessibilité.",
      "Ventilation, climatisation, éclairage et technologies connectées sont intégrés à chaque projet d'aménagement.",
    ],
    operationalValue:
      "Un aménagement pensé en amont facilite l'exploitation et la maintenance des installations techniques sur toute leur durée de vie.",
    capabilities: [
      "Optimisation des espaces de travail pour améliorer la productivité",
      "Aménagement des locaux techniques et des bureaux",
      "Mise en conformité avec les normes de sécurité et d'accessibilité",
      "Solutions acoustiques et thermiques pour un confort optimal",
      "Réaménagement des espaces techniques et installation de nouvelles technologies",
      "Optimisation énergétique des installations existantes",
    ],
    image: "/images/control-room-monitoring.jpg",
    cover: "/images/technician-electrical-cabinet.jpg",
    related: ["cvc", "cfa", "construction"],
  },
];

export const getExpertiseBySlug = (slug: string) =>
  expertises.find((expertise) => expertise.slug === slug);

export const getRelatedExpertises = (slug: string) => {
  const current = getExpertiseBySlug(slug);
  if (!current) return [];
  return current.related
    .map((relatedSlug) => getExpertiseBySlug(relatedSlug))
    .filter((item): item is Expertise => Boolean(item));
};
