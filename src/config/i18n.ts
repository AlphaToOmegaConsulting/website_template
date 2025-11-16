/**
 * i18n Translations
 *
 * Centralized translation strings for UI elements.
 * Following Alpha WebCore v3 principles for easy localization.
 */

export const translations = {
  fr: {
    // Navigation
    nav: {
      home: 'Accueil',
      events: 'Événements',
      partners: 'Partenaires',
      about: 'À propos',
      contact: 'Contact',
    },

    // Common UI
    common: {
      readMore: 'En savoir plus',
      register: "S'inscrire",
      close: 'Fermer',
      openMenu: 'Ouvrir le menu',
      allRightsReserved: 'Tous droits réservés.',
      links: 'Liens',
      social: 'Réseaux sociaux',
    },

    // Events
    events: {
      title: 'Événements',
      upcoming: 'Événements à venir',
      past: 'Événements passés',
      noUpcoming: 'Aucun événement à venir pour le moment.',
      noPast: 'Aucun événement passé.',
      featured: 'À la une',
      register: "S'inscrire",
    },

    // Forms
    forms: {
      required: 'Requis',
      email: 'Email',
      message: 'Message',
      send: 'Envoyer',
    },

    // Footer
    footer: {
      description: 'Un site web multilingue moderne construit avec Astro, TypeScript et Tailwind CSS.',
    },
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      events: 'Events',
      partners: 'Partners',
      about: 'About',
      contact: 'Contact',
    },

    // Common UI
    common: {
      readMore: 'Read more',
      register: 'Register',
      close: 'Close',
      openMenu: 'Open menu',
      allRightsReserved: 'All rights reserved.',
      links: 'Links',
      social: 'Social',
    },

    // Events
    events: {
      title: 'Events',
      upcoming: 'Upcoming Events',
      past: 'Past Events',
      noUpcoming: 'No upcoming events at the moment.',
      noPast: 'No past events.',
      featured: 'Featured',
      register: 'Register',
    },

    // Forms
    forms: {
      required: 'Required',
      email: 'Email',
      message: 'Message',
      send: 'Send',
    },

    // Footer
    footer: {
      description: 'A modern multilingual website built with Astro, TypeScript, and Tailwind CSS.',
    },
  },
} as const;

export type Locale = keyof typeof translations;
export type TranslationKeys = typeof translations.fr;

/**
 * Get translation for a given locale
 */
export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations.fr;
}
