/**
 * AquaVenture - Activities Data
 * Sample activities for Sainte-Marie, Madagascar
 * All activities emphasize eco-responsibility and local community support
 */

export interface Activity {
  id: string
  slug: string
  title: {
    fr: string
    en: string
  }
  description: {
    fr: string
    en: string
  }
  shortDescription: {
    fr: string
    en: string
  }
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  price: number
  currency: string
  maxParticipants: number
  minAge: number
  images: string[]
  isEcoFriendly: boolean
  ecoDescription?: {
    fr: string
    en: string
  }
  included: {
    fr: string[]
    en: string[]
  }
  whatToBring: {
    fr: string[]
    en: string[]
  }
  schedule: string[]
  location: {
    name: string
    coordinates: {
      lat: number
      lng: number
    }
  }
  rating: number
  reviewCount: number
  featured: boolean
  category: 'water-sports' | 'excursions' | 'fishing' | 'diving'
  tags: string[]
}

export const activities: Activity[] = [
  {
    id: '1',
    slug: 'bouee-tractee',
    title: {
      fr: "Bouée Tractée - Sensations Fortes",
      en: "Towed Buoy - Thrilling Experience"
    },
    description: {
      fr: "Vivez des sensations inoubliables avec notre bouée tractée ! Tirez par un bateau à moteur puissant, vous glisserez sur les eaux cristallines de Sainte-Marie en toute sécurité. Notre équipe de professionnels vous assure une expérience palpitante tout en respectant l'environnement marin. Idéal pour les familles et les groupes d'amis en quête d'aventure.",
      en: "Experience unforgettable thrills with our towed buoy! Pulled by a powerful motorboat, you'll glide over the crystal-clear waters of Sainte-Marie in complete safety. Our team of professionals ensures a thrilling experience while respecting the marine environment. Perfect for families and groups of friends seeking adventure."
    },
    shortDescription: {
      fr: "Sensations fortes garanties sur les eaux turquoise de Sainte-Marie",
      en: "Guaranteed thrills on the turquoise waters of Sainte-Marie"
    },
    duration: "20 min",
    difficulty: "beginner",
    price: 45,
    currency: "EUR",
    maxParticipants: 6,
    minAge: 8,
    images: [
      "/download/activity-bouee.png"
    ],
    isEcoFriendly: true,
    ecoDescription: {
      fr: "Moteur 4 temps respectueux de l'environnement, zones de navigation définies pour protéger les herbiers marins",
      en: "Eco-friendly 4-stroke engine, defined navigation zones to protect seagrass beds"
    },
    included: {
      fr: ["Équipement de sécurité", "Gilet de sauvetage", "Briefing sécurité", "Encadrement professionnel"],
      en: ["Safety equipment", "Life jacket", "Safety briefing", "Professional supervision"]
    },
    whatToBring: {
      fr: ["Maillot de bain", "Crème solaire écologique", "Serviette", "Lunettes de soleil"],
      en: ["Swimsuit", "Eco-friendly sunscreen", "Towel", "Sunglasses"]
    },
    schedule: ["09:00", "11:00", "14:00", "16:00"],
    location: {
      name: "Plage de l'Île aux Nattes",
      coordinates: { lat: -16.8833, lng: 49.8833 }
    },
    rating: 4.8,
    reviewCount: 127,
    featured: true,
    category: "water-sports",
    tags: ["sensations", "famille", "groupe", "débutant"]
  },
  {
    id: '2',
    slug: 'stand-up-paddle',
    title: {
      fr: "Stand-Up Paddle - Exploration Lagune",
      en: "Stand-Up Paddle - Lagoon Exploration"
    },
    description: {
      fr: "Explorez la magnifique lagune de Sainte-Marie à votre rythme sur notre planches de SUP premium. Glissez silencieusement sur des eaux turquoises, observez les tortues marines et découvrez les mangroves préservées. Une activité éco-responsable par excellence, parfaite pour les amoureux de la nature et ceux qui recherchent la sérénité.",
      en: "Explore the magnificent lagoon of Sainte-Marie at your own pace on our premium SUP boards. Glide silently over turquoise waters, observe sea turtles and discover preserved mangroves. An eco-responsible activity par excellence, perfect for nature lovers and those seeking serenity."
    },
    shortDescription: {
      fr: "Explorez les lagons préservés en silence et en harmonie avec la nature",
      en: "Explore preserved lagoons in silence and harmony with nature"
    },
    duration: "2h",
    difficulty: "beginner",
    price: 25,
    currency: "EUR",
    maxParticipants: 8,
    minAge: 10,
    images: [
      "/download/activity-paddle.png"
    ],
    isEcoFriendly: true,
    ecoDescription: {
      fr: "Activité zero-carbone, participation à la protection des mangroves et sensibilisation à l'écosystème",
      en: "Zero-carbon activity, participation in mangrove protection and ecosystem awareness"
    },
    included: {
      fr: ["Planche SUP premium", "Pagaie", "Gilet de sauvetage", "Guide naturaliste", "Goûter local"],
      en: ["Premium SUP board", "Paddle", "Life jacket", "Naturalist guide", "Local snack"]
    },
    whatToBring: {
      fr: ["Maillot de bain", "Chapeau", "Crème solaire écologique", "Eau"],
      en: ["Swimsuit", "Hat", "Eco-friendly sunscreen", "Water"]
    },
    schedule: ["07:00", "09:00", "16:00"],
    location: {
      name: "Lagone de Sainte-Marie",
      coordinates: { lat: -16.8667, lng: 49.9000 }
    },
    rating: 4.9,
    reviewCount: 203,
    featured: true,
    category: "water-sports",
    tags: ["éco-responsable", "nature", "calme", "débutant"]
  },
  {
    id: '3',
    slug: 'jet-ski',
    title: {
      fr: "Jet Ski - Aventure Extrême",
      en: "Jet Ski - Extreme Adventure"
    },
    description: {
      fr: "Découvrez les côtes préservées de Sainte-Marie à bord de nos Jet Skis dernière génération. Des vagues aux criques secrètes, vivez une aventure inoubliable tout en profitant de vues spectaculaires. Nos guides expérimentés vous emmèneront vers les plus beaux spots de l'île en respectant la faune et la flore marines.",
      en: "Discover the pristine coasts of Sainte-Marie aboard our latest generation Jet Skis. From waves to secret coves, experience an unforgettable adventure while enjoying spectacular views. Our experienced guides will take you to the most beautiful spots on the island while respecting marine fauna and flora."
    },
    shortDescription: {
      fr: "Adrénaline et paysages spectaculaires le long des côtes préservées",
      en: "Adrenaline and spectacular scenery along pristine coasts"
    },
    duration: "1h",
    difficulty: "intermediate",
    price: 85,
    currency: "EUR",
    maxParticipants: 4,
    minAge: 16,
    images: [
      "/download/activity-jetski.png"
    ],
    isEcoFriendly: true,
    ecoDescription: {
      fr: "Jet Skis 4 temps basse émission, zones de navigation éco-certifiées, formation éco-conduite incluse",
      en: "Low-emission 4-stroke Jet Skis, eco-certified navigation zones, eco-driving training included"
    },
    included: {
      fr: ["Jet Ski récent", "Équipement complet", "Briefing sécurité et éco-conduite", "Guide accompagnateur"],
      en: ["Recent Jet Ski", "Complete equipment", "Safety and eco-driving briefing", "Accompanying guide"]
    },
    whatToBring: {
      fr: ["Maillot de bain", "Lunettes de soleil attachées", "Crème solaire résistante à l'eau"],
      en: ["Swimsuit", "Attached sunglasses", "Water-resistant sunscreen"]
    },
    schedule: ["08:00", "10:00", "14:00", "16:00"],
    location: {
      name: "Club Nautique Sainte-Marie",
      coordinates: { lat: -16.8500, lng: 49.8500 }
    },
    rating: 4.7,
    reviewCount: 89,
    featured: true,
    category: "water-sports",
    tags: ["adrénaline", "vitesse", "aventure", "intermédiaire"]
  },
  {
    id: '4',
    slug: 'wakeboard',
    title: {
      fr: "Wakeboard - Glisse Urbaine",
      en: "Wakeboard - Urban Glide"
    },
    description: {
      fr: "Initiez-vous ou perfectionnez votre technique de wakeboard dans les conditions idéales de Sainte-Marie. Nos moniteurs certifiés vous accompagnent quel que soit votre niveau. Profitez d'une eau plate parfaite et d'un cadre idyllique pour progresser rapidement. Une expérience de glisse unique dans l'océan Indien.",
      en: "Discover or perfect your wakeboarding technique in the ideal conditions of Sainte-Marie. Our certified instructors accompany you whatever your level. Enjoy perfectly flat water and an idyllic setting to progress quickly. A unique gliding experience in the Indian Ocean."
    },
    shortDescription: {
      fr: "Sensations de glisse dans un cadre paradisiaque",
      en: "Gliding sensations in a paradisiacal setting"
    },
    duration: "30 min",
    difficulty: "intermediate",
    price: 55,
    currency: "EUR",
    maxParticipants: 3,
    minAge: 12,
    images: [
      "/download/activity-wakeboard.png"
    ],
    isEcoFriendly: true,
    ecoDescription: {
      fr: "Bateau électrique en développement, programmes de compensation carbone actifs",
      en: "Electric boat in development, active carbon offset programs"
    },
    included: {
      fr: ["Planche et accessoires", "Gilet et casque", "Moniteur diplômé", "Session photo offerte"],
      en: ["Board and accessories", "Vest and helmet", "Certified instructor", "Free photo session"]
    },
    whatToBring: {
      fr: ["Maillot de bain", "Serviette", "Détermination"],
      en: ["Swimsuit", "Towel", "Determination"]
    },
    schedule: ["09:00", "11:00", "14:00", "16:00"],
    location: {
      name: "Baie de Sainte-Marie",
      coordinates: { lat: -16.8700, lng: 49.8700 }
    },
    rating: 4.6,
    reviewCount: 67,
    featured: false,
    category: "water-sports",
    tags: ["glisse", "sport", "technique", "intermédiaire"]
  },
  {
    id: '5',
    slug: 'peche-durable',
    title: {
      fr: "Pêche Sportive - Big Game Fishing",
      en: "Sport Fishing - Big Game Adventure"
    },
    description: {
      fr: "Vivez une expérience de pêche sportive inoubliable à bord de notre bateau professionnel équipé pour le big game fishing. Chassez les poissons tropicaux légendaires : marlin, thon, dorade... Nos capitaines expérimentés vous guident vers les meilleurs spots au large de Sainte-Marie. Équipement professionnel fourni.",
      en: "Experience unforgettable sport fishing aboard our professional boat equipped for big game fishing. Hunt legendary tropical fish: marlin, tuna, mahi-mahi... Our experienced captains guide you to the best spots off Sainte-Marie. Professional equipment provided."
    },
    shortDescription: {
      fr: "Pêche sportive en haute mer - Marlin, Thon, Dorade",
      en: "Deep sea sport fishing - Marlin, Tuna, Mahi-mahi"
    },
    duration: "4h",
    difficulty: "beginner",
    price: 65,
    currency: "EUR",
    maxParticipants: 4,
    minAge: 12,
    images: [
      "/download/activity-sportfishing.png"
    ],
    isEcoFriendly: true,
    ecoDescription: {
      fr: "Pêche sélective, partenariat équitable avec les pêcheurs locaux, 20% reversé aux associations de protection marine",
      en: "Selective fishing, fair partnership with local fishermen, 20% donated to marine protection associations"
    },
    included: {
      fr: ["Bateau professionnel", "Équipement de pêche haut de gamme", "Capitaine expérimenté", "En-cas et boissons"],
      en: ["Professional boat", "Premium fishing equipment", "Experienced captain", "Snacks and drinks"]
    },
    whatToBring: {
      fr: ["Vêtements légers", "Chapeau", "Crème solaire", "Appareil photo"],
      en: ["Light clothing", "Hat", "Sunscreen", "Camera"]
    },
    schedule: ["05:00", "15:00"],
    location: {
      name: "Village de pêcheurs d'Ambodifotatra",
      coordinates: { lat: -16.8833, lng: 49.9167 }
    },
    rating: 4.9,
    reviewCount: 156,
    featured: true,
    category: "fishing",
    tags: ["sport", "aventure", "big game", "haute mer"]
  },
  {
    id: '6',
    slug: 'excursion-iles',
    title: {
      fr: "Excursion Îles aux Nattes & Baleines",
      en: "Îles aux Nattes & Whales Excursion"
    },
    description: {
      fr: "Une journée inoubliable à la découverte des trésors de Sainte-Marie ! Navigation vers l'Île aux Nattes pour un déjeuner de fruits de mer frais, baignade dans des criques paradisiaques, et observation des baleines à bosse (saison de juillet à septembre). Snorkeling sur des récifs coralliens préservés avec notre guide naturaliste.",
      en: "An unforgettable day discovering the treasures of Sainte-Marie! Navigation to Île aux Nattes for a fresh seafood lunch, swimming in paradisiacal coves, and humpback whale watching (July to September season). Snorkeling on preserved coral reefs with our naturalist guide."
    },
    shortDescription: {
      fr: "Journée complète : baleines, plongée, plage et gastronomie locale",
      en: "Full day: whales, diving, beach and local gastronomy"
    },
    duration: "8h",
    difficulty: "beginner",
    price: 95,
    currency: "EUR",
    maxParticipants: 12,
    minAge: 6,
    images: [
      "/download/activity-excursion.png"
    ],
    isEcoFriendly: true,
    ecoDescription: {
      fr: "Observation respectueuse des baleines, ancrage écologique, participation aux programmes de préservation des coraux",
      en: "Respectful whale watching, ecological anchoring, participation in coral preservation programs"
    },
    included: {
      fr: ["Transport bateau", "Guide naturaliste", "Déjeuner fruits de mer", "Équipement snorkeling", "Boissons"],
      en: ["Boat transport", "Naturalist guide", "Seafood lunch", "Snorkeling equipment", "Drinks"]
    },
    whatToBring: {
      fr: ["Maillot de bain", "Serviette", "Crème solaire", "Appareil photo étanche", "Vêtements de rechange"],
      en: ["Swimsuit", "Towel", "Sunscreen", "Waterproof camera", "Change of clothes"]
    },
    schedule: ["07:00"],
    location: {
      name: "Port de Sainte-Marie",
      coordinates: { lat: -16.8667, lng: 49.8833 }
    },
    rating: 4.9,
    reviewCount: 287,
    featured: true,
    category: "excursions",
    tags: ["baleines", "snorkeling", "plage", "journée complète"]
  }
]

/**
 * Get featured activities for homepage
 */
export const getFeaturedActivities = (): Activity[] => {
  return activities.filter(activity => activity.featured)
}

/**
 * Get activity by slug
 */
export const getActivityBySlug = (slug: string): Activity | undefined => {
  return activities.find(activity => activity.slug === slug)
}

/**
 * Get activities by category
 */
export const getActivitiesByCategory = (category: Activity['category']): Activity[] => {
  return activities.filter(activity => activity.category === category)
}

/**
 * Get eco-friendly activities
 */
export const getEcoFriendlyActivities = (): Activity[] => {
  return activities.filter(activity => activity.isEcoFriendly)
}

export default activities
