'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'fr' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

const translations: Record<Language, Record<string, any>> = {
  fr: {
    nav: {
      home: 'Accueil',
      activities: 'Activités',
      experiences: 'Expériences',
      about: 'À propos',
      blog: 'Blog',
      contact: 'Contact',
      reserve: 'Réserver',
    },
    hero: {
      allActivities: 'Toutes nos activités',
    },
    activities: {
      badge: 'Nos Activités',
      title: 'Expériences Phares',
      subtitle: 'Des aventures uniques au cœur de l\'océan Indien',
      viewAll: 'Voir toutes les activités',
      perPerson: '/pers',
      viewDetails: 'Voir détails',
      reserve: 'Réserver',
      ecoFriendly: 'Éco',
    },
    about: {
      badge: 'Notre Engagement',
      title: 'Tourisme Responsable à Sainte-Marie',
      description: 'Nous croyons en un tourisme qui respecte l\'environnement et soutient les communautés locales.',
      point1: '20% des bénéfices reversés aux associations locales',
      point2: 'Guides naturalistes passionnés',
      point3: 'Équipements écoresponsables',
      learnMore: 'En savoir plus',
    },
    testimonials: {
      badge: 'Témoignages',
      title: 'Ce que disent nos visiteurs',
    },
    cta: {
      title: 'Prêt pour l\'aventure?',
      description: 'Réservez votre excursion et contribuez à la préservation de l\'écosystème marin.',
      viewActivities: 'Voir les activités',
      contactUs: 'Nous contacter',
    },
    location: {
      badge: 'Localisation',
      title: 'Sainte-Marie, Madagascar',
      description: 'Surnommée "l\'île aux femmes", Sainte-Marie est un joyau de l\'océan Indien.',
      findUs: 'Nous trouver',
    },
    footer: {
      tagline: 'Votre partenaire pour des aventures nautiques inoubliables à Sainte-Marie.',
      ecoBadge: 'Tourisme durable certifié',
      quickLinks: 'Liens rapides',
      ourActivities: 'Nos activités',
      contact: 'Contact',
      newsletter: 'Newsletter',
      newsletterDesc: 'Recevez nos offres exclusives',
      emailPlaceholder: 'Votre email',
      subscribe: 'Merci pour votre inscription !',
      copyright: 'Tous droits réservés.',
      madeWith: 'Fait avec',
      madeIn: 'à Madagascar',
    },
  },
  en: {
    nav: {
      home: 'Home',
      activities: 'Activities',
      experiences: 'Experiences',
      about: 'About',
      blog: 'Blog',
      contact: 'Contact',
      reserve: 'Book Now',
    },
    hero: {
      allActivities: 'All our activities',
    },
    activities: {
      badge: 'Our Activities',
      title: 'Featured Experiences',
      subtitle: 'Unique adventures in the heart of the Indian Ocean',
      viewAll: 'View all activities',
      perPerson: '/person',
      viewDetails: 'View details',
      reserve: 'Book now',
      ecoFriendly: 'Eco',
    },
    about: {
      badge: 'Our Commitment',
      title: 'Responsible Tourism in Sainte-Marie',
      description: 'We believe in tourism that respects the environment and supports local communities.',
      point1: '20% of profits donated to local associations',
      point2: 'Passionate naturalist guides',
      point3: 'Eco-friendly equipment',
      learnMore: 'Learn more',
    },
    testimonials: {
      badge: 'Testimonials',
      title: 'What our visitors say',
    },
    cta: {
      title: 'Ready for adventure?',
      description: 'Book your excursion and contribute to marine ecosystem preservation.',
      viewActivities: 'View activities',
      contactUs: 'Contact us',
    },
    location: {
      badge: 'Location',
      title: 'Sainte-Marie, Madagascar',
      description: 'Known as "the island of women", Sainte-Marie is a gem of the Indian Ocean.',
      findUs: 'Find us',
    },
    footer: {
      tagline: 'Your partner for unforgettable nautical adventures in Sainte-Marie.',
      ecoBadge: 'Certified sustainable tourism',
      quickLinks: 'Quick links',
      ourActivities: 'Our activities',
      contact: 'Contact',
      newsletter: 'Newsletter',
      newsletterDesc: 'Receive our exclusive offers',
      emailPlaceholder: 'Your email',
      subscribe: 'Thank you for subscribing!',
      copyright: 'All rights reserved.',
      madeWith: 'Made with',
      madeIn: 'in Madagascar',
    },
  },
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize from localStorage if available (client-side only)
    if (typeof window !== 'undefined') {
      const savedLang = localStorage.getItem('language') as Language
      if (savedLang && (savedLang === 'fr' || savedLang === 'en')) {
        return savedLang
      }
    }
    return 'fr'
  })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('language', lang)
  }

  const toggleLanguage = () => {
    const newLang = language === 'fr' ? 'en' : 'fr'
    setLanguage(newLang)
  }

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations[language]
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key
      }
    }
    return typeof value === 'string' ? value : key
  }

  if (!mounted) {
    return null
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
