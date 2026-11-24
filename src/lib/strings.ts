export const strings = {
  // Navigation
  nav: {
    home: "Accueil",
    products: "Produits",
    categories: "Catégories",
    about: "À propos",
    contact: "Contact",
    search: "Rechercher des produits…",
  },

  // Home page
  home: {
    heroTitle: "Des produits authentiques,\nlivrés chez vous",
    heroSubtitle:
      "Découvrez notre sélection de produits de qualité, soigneusement choisis pour vous.",
    heroCtaShop: "Voir les produits",
    heroCtaWhatsapp: "Commander sur WhatsApp",
    categoriesTitle: "Nos catégories",
    categoriesSubtitle: "Explorez notre large gamme de produits",
    featuredTitle: "Produits vedettes",
    featuredSubtitle: "Les favoris de nos clients",
    newArrivalsTitle: "Nouveautés",
    newArrivalsSubtitle: "Les dernières additions à notre boutique",
    whyTitle: "Pourquoi nous choisir ?",
    whySubtitle: "Notre engagement envers votre satisfaction",
    whyCta: "Contactez-nous sur WhatsApp",
    whyPoints: [
      {
        title: "Qualité garantie",
        desc: "Chaque produit est sélectionné avec soin pour vous offrir le meilleur.",
      },
      {
        title: "Livraison rapide",
        desc: "Nous livrons partout au Maroc dans les meilleurs délais.",
      },
      {
        title: "Service client",
        desc: "Notre équipe est disponible pour répondre à toutes vos questions.",
      },
      {
        title: "Paiement sécurisé",
        desc: "Commandez en toute confiance, paiement à la livraison disponible.",
      },
    ],
    ctaBannerTitle: "Prêt à commander ?",
    ctaBannerSubtitle:
      "Envoyez-nous un message sur WhatsApp et nous vous répondrons immédiatement.",
    ctaBannerButton: "Commander maintenant",
  },

  // Products page
  products: {
    title: "Tous les produits",
    subtitle: "Découvrez notre catalogue complet",
    searchPlaceholder: "Rechercher…",
    filterCategory: "Catégorie",
    filterAllCategories: "Toutes les catégories",
    filterAvailability: "Disponibilité",
    filterAll: "Tous",
    filterInStock: "En stock",
    filterOutOfStock: "Rupture de stock",
    filterPriceRange: "Prix",
    sortLabel: "Trier par",
    sortOptions: {
      default: "Par défaut",
      priceAsc: "Prix croissant",
      priceDesc: "Prix décroissant",
      nameAsc: "Nom A-Z",
    },
    resultCount: (n: number) =>
      n === 0
        ? "Aucun produit trouvé"
        : n === 1
          ? "1 produit trouvé"
          : `${n} produits trouvés`,
    emptyTitle: "Aucun produit trouvé",
    emptyMessage:
      "Essayez de modifier vos filtres ou votre recherche pour trouver ce que vous cherchez.",
    resetFilters: "Réinitialiser les filtres",
  },

  // Product card & page
  product: {
    outOfStock: "Rupture de stock",
    inStock: "En stock",
    addToCart: "Commander sur WhatsApp",
    quantity: "Quantité",
    relatedTitle: "Produits similaires",
    breadcrumbHome: "Accueil",
    breadcrumbProducts: "Produits",
  },

  // Order modal
  order: {
    title: "Passer une commande",
    productLabel: "Produit",
    quantityLabel: "Quantité",
    priceLabel: "Prix unitaire",
    totalLabel: "Total",
    nameLabel: "Nom complet",
    namePlaceholder: "Votre nom complet",
    nameRequired: "Le nom complet est obligatoire.",
    addressLabel: "Adresse de livraison",
    addressPlaceholder: "Votre adresse complète",
    addressRequired: "L'adresse de livraison est obligatoire.",
    noteLabel: "Note (optionnel)",
    notePlaceholder: "Informations supplémentaires, instructions…",
    submitButton: "Commander",
    cancel: "Annuler",
    outOfStockTooltip: "Ce produit est actuellement indisponible.",
    whatsappMessage: (
      nom: string,
      quantite: number,
      produit: string,
      prix: number,
      total: number,
      adresse: string,
      note: string
    ) =>
      `Bonjour, je suis ${nom}. Je souhaite commander : ${quantite} x ${produit} (${prix} DH). Total : ${total} DH. Adresse de livraison : ${adresse}.${note ? ` ${note}` : ""}`,
  },

  // Category page
  category: {
    breadcrumbHome: "Accueil",
    breadcrumbCategories: "Catégories",
    noProducts: "Aucun produit dans cette catégorie pour le moment.",
  },

  // About page
  about: {
    title: "À propos de nous",
    subtitle: "Notre histoire et nos valeurs",
    storyTitle: "Notre histoire",
    storyText:
      "Boutique Maroc est née de la passion pour les produits authentiques du Maroc. Depuis notre création, nous nous engageons à offrir à nos clients des produits de la plus haute qualité, sélectionnés avec soin auprès de producteurs locaux.",
    missionTitle: "Notre mission",
    missionText:
      "Notre mission est de rendre accessibles les meilleurs produits marocains à tous, en proposant une expérience d'achat simple, sécurisée et agréable.",
    ctaTitle: "Contactez-nous",
    ctaSubtitle:
      "Une question ? Nous sommes là pour vous aider. Envoyez-nous un message sur WhatsApp.",
    ctaButton: "Nous contacter sur WhatsApp",
  },

  // Contact page
  contact: {
    title: "Contactez-nous",
    subtitle: "Nous sommes là pour vous aider",
    infoTitle: "Nos coordonnées",
    whatsappTitle: "WhatsApp",
    whatsappSubtitle: "La façon la plus rapide de nous joindre",
    whatsappButton: "Ouvrir WhatsApp",
    addressTitle: "Adresse",
    phoneTitle: "Téléphone",
    emailTitle: "Email",
    hoursTitle: "Horaires d'ouverture",
    mapTitle: "Notre localisation",
  },

  // 404
  notFound: {
    title: "Page introuvable",
    message:
      "Désolé, la page que vous recherchez n'existe pas ou a été déplacée.",
    backHome: "Retour à l'accueil",
    shopProducts: "Voir les produits",
  },

  // Footer
  footer: {
    description:
      "Votre boutique en ligne de confiance pour des produits authentiques.",
    quickLinks: "Liens rapides",
    categories: "Catégories",
    contact: "Contact",
    openingHours: "Horaires",
    followUs: "Suivez-nous",
    copyright: (year: number, name: string) =>
      `© ${year} ${name}. Tous droits réservés.`,
  },

  // Floating WhatsApp
  floatingWhatsapp: "Commandez sur WhatsApp",

  // General
  general: {
    viewAll: "Voir tout",
    viewProduct: "Voir le produit",
    loading: "Chargement…",
    close: "Fermer",
  },
} as const;
