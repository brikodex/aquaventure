/**
 * AquaVenture - Seed Data
 * Données initiales pour les activités nautiques
 * Sainte-Marie, Madagascar
 */

export const seedActivities = [
  {
    name: {
      fr: "Bouée Tractée - Sensations Fortes",
      en: "Towed Buoy - Thrilling Experience"
    },
    slug: "bouee-tractee",
    description: {
      fr: "Vivez des sensations inoubliables avec notre bouée tractée ! Tirée par un bateau à moteur puissant, vous glisserez sur les eaux cristallines de Sainte-Marie en toute sécurité. Notre équipe de professionnels vous assure une expérience palpitante tout en respectant l'environnement marin. Idéal pour les familles et les groupes d'amis en quête d'aventure.",
      en: "Experience unforgettable thrills with our towed buoy! Pulled by a powerful motorboat, you'll glide over the crystal-clear waters of Sainte-Marie in complete safety. Our team of professionals ensures a thrilling experience while respecting the marine environment. Perfect for families and groups of friends seeking adventure."
    },
    shortDescription: {
      fr: "Sensations fortes garanties sur les eaux turquoise de Sainte-Marie",
      en: "Guaranteed thrills on the turquoise waters of Sainte-Marie"
    },
    price: 45,
    duration: 20,
    difficulty: "BEGINNER",
    category: "BUOY",
    images: [
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800",
      "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800"
    ],
    featured: true,
    maxParticipants: 6,
    minParticipants: 1,
    minAge: 8,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Moteur 4 temps respectueux de l'environnement, zones de navigation définies pour protéger les herbiers marins",
      en: "Eco-friendly 4-stroke engine, defined navigation zones to protect seagrass beds"
    },
    included: {
      fr: ["Équipement de sécurité", "Gilet de sauvetage", "Briefing sécurité", "Encadrement professionnel"],
      en: ["Safety equipment", "Life jacket", "Safety briefing", "Professional supervision"]
    },
    requirements: {
      fr: ["Maillot de bain", "Crème solaire écologique", "Serviette", "Lunettes de soleil"],
      en: ["Swimsuit", "Eco-friendly sunscreen", "Towel", "Sunglasses"]
    },
    schedule: ["09:00", "11:00", "14:00", "16:00"],
    location: "Plage de l'Île aux Nattes",
    meetingPoint: {
      fr: "Point de rencontre : Bureau AquaVenture, Plage principale",
      en: "Meeting point: AquaVenture office, Main beach"
    },
    coordinates: { latitude: -16.8833, longitude: 49.8833 },
    rating: 4.8,
    reviewCount: 127
  },
  {
    name: {
      fr: "Stand-Up Paddle - Exploration Lagune",
      en: "Stand-Up Paddle - Lagoon Exploration"
    },
    slug: "stand-up-paddle",
    description: {
      fr: "Explorez la magnifique lagune de Sainte-Marie à votre rythme sur nos planches de SUP premium. Glissez silencieusement sur des eaux turquoises, observez les tortues marines et découvrez les mangroves préservées. Une activité éco-responsable par excellence, parfaite pour les amoureux de la nature et ceux qui recherchent la sérénité.",
      en: "Explore the magnificent lagoon of Sainte-Marie at your own pace on our premium SUP boards. Glide silently over turquoise waters, observe sea turtles and discover preserved mangroves. An eco-responsible activity par excellence, perfect for nature lovers and those seeking serenity."
    },
    shortDescription: {
      fr: "Explorez les lagons préservés en silence et en harmonie avec la nature",
      en: "Explore preserved lagoons in silence and harmony with nature"
    },
    price: 25,
    duration: 120,
    difficulty: "BEGINNER",
    category: "PADDLE",
    images: [
      "https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800",
      "https://images.unsplash.com/photo-1510306750644-5734b4fe22d1?w=800"
    ],
    featured: true,
    maxParticipants: 8,
    minParticipants: 1,
    minAge: 10,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Activité zéro-carbone, participation à la protection des mangroves et sensibilisation à l'écosystème",
      en: "Zero-carbon activity, participation in mangrove protection and ecosystem awareness"
    },
    included: {
      fr: ["Planche SUP premium", "Pagaie", "Gilet de sauvetage", "Guide naturaliste", "Goûter local"],
      en: ["Premium SUP board", "Paddle", "Life jacket", "Naturalist guide", "Local snack"]
    },
    requirements: {
      fr: ["Maillot de bain", "Chapeau", "Crème solaire écologique", "Eau"],
      en: ["Swimsuit", "Hat", "Eco-friendly sunscreen", "Water"]
    },
    schedule: ["07:00", "09:00", "16:00"],
    location: "Lagune de Sainte-Marie",
    meetingPoint: {
      fr: "Centre AquaVenture, bord de lagune",
      en: "AquaVenture center, lagoon side"
    },
    coordinates: { latitude: -16.8667, longitude: 49.9000 },
    rating: 4.9,
    reviewCount: 203
  },
  {
    name: {
      fr: "Jet Ski - Aventure Extrême",
      en: "Jet Ski - Extreme Adventure"
    },
    slug: "jet-ski",
    description: {
      fr: "Découvrez les côtes préservées de Sainte-Marie à bord de nos Jet Skis dernière génération. Des vagues aux criques secrètes, vivez une aventure inoubliable tout en profitant de vues spectaculaires. Nos guides expérimentés vous emmèneront vers les plus beaux spots de l'île en respectant la faune et la flore marines.",
      en: "Discover the pristine coasts of Sainte-Marie aboard our latest generation Jet Skis. From waves to secret coves, experience an unforgettable adventure while enjoying spectacular views. Our experienced guides will take you to the most beautiful spots on the island while respecting marine fauna and flora."
    },
    shortDescription: {
      fr: "Adrénaline et paysages spectaculaires le long des côtes préservées",
      en: "Adrenaline and spectacular scenery along pristine coasts"
    },
    price: 85,
    duration: 60,
    difficulty: "INTERMEDIATE",
    category: "JET_SKI",
    images: [
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800",
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800"
    ],
    featured: true,
    maxParticipants: 4,
    minParticipants: 1,
    minAge: 16,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Jet Skis 4 temps basse émission, zones de navigation éco-certifiées, formation éco-conduite incluse",
      en: "Low-emission 4-stroke Jet Skis, eco-certified navigation zones, eco-driving training included"
    },
    included: {
      fr: ["Jet Ski récent", "Équipement complet", "Briefing sécurité et éco-conduite", "Guide accompagnateur"],
      en: ["Recent Jet Ski", "Complete equipment", "Safety and eco-driving briefing", "Accompanying guide"]
    },
    requirements: {
      fr: ["Maillot de bain", "Lunettes de soleil attachées", "Crème solaire résistante à l'eau"],
      en: ["Swimsuit", "Attached sunglasses", "Water-resistant sunscreen"]
    },
    schedule: ["08:00", "10:00", "14:00", "16:00"],
    location: "Club Nautique Sainte-Marie",
    meetingPoint: {
      fr: "Club Nautique, Port principal",
      en: "Nautical Club, Main Port"
    },
    coordinates: { latitude: -16.8500, longitude: 49.8500 },
    rating: 4.7,
    reviewCount: 89
  },
  {
    name: {
      fr: "Wakeboard - Glisse Urbaine",
      en: "Wakeboard - Urban Glide"
    },
    slug: "wakeboard",
    description: {
      fr: "Initiez-vous ou perfectionnez votre technique de wakeboard dans les conditions idéales de Sainte-Marie. Nos moniteurs certifiés vous accompagnent quel que soit votre niveau. Profitez d'une eau plate parfaite et d'un cadre idyllique pour progresser rapidement. Une expérience de glisse unique dans l'océan Indien.",
      en: "Discover or perfect your wakeboarding technique in the ideal conditions of Sainte-Marie. Our certified instructors accompany you whatever your level. Enjoy perfectly flat water and an idyllic setting to progress quickly. A unique gliding experience in the Indian Ocean."
    },
    shortDescription: {
      fr: "Sensations de glisse dans un cadre paradisiaque",
      en: "Gliding sensations in a paradisiacal setting"
    },
    price: 55,
    duration: 30,
    difficulty: "INTERMEDIATE",
    category: "WAKEBOARD",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      "https://images.unsplash.com/photo-1547447134-cd3f5c716030?w=800"
    ],
    featured: false,
    maxParticipants: 3,
    minParticipants: 1,
    minAge: 12,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Bateau électrique en développement, programmes de compensation carbone actifs",
      en: "Electric boat in development, active carbon offset programs"
    },
    included: {
      fr: ["Planche et accessoires", "Gilet et casque", "Moniteur diplômé", "Session photo offerte"],
      en: ["Board and accessories", "Vest and helmet", "Certified instructor", "Free photo session"]
    },
    requirements: {
      fr: ["Maillot de bain", "Serviette", "Détermination"],
      en: ["Swimsuit", "Towel", "Determination"]
    },
    schedule: ["09:00", "11:00", "14:00", "16:00"],
    location: "Baie de Sainte-Marie",
    meetingPoint: {
      fr: "Quai des sports nautiques",
      en: "Water sports dock"
    },
    coordinates: { latitude: -16.8700, longitude: 49.8700 },
    rating: 4.6,
    reviewCount: 67
  },
  {
    name: {
      fr: "Pêche Durable - Pirogue Traditionnelle",
      en: "Sustainable Fishing - Traditional Canoe"
    },
    slug: "peche-durable",
    description: {
      fr: "Participez à une expérience de pêche authentique et responsable avec nos pêcheurs locaux partenaires. À bord de pirogues traditionnelles, apprenez les techniques ancestrales de pêche respectueuses des ressources marines. Les prises sont partagées équitablement et une partie est offerte aux familles locales. Une immersion culturelle inoubliable.",
      en: "Participate in an authentic and responsible fishing experience with our local partner fishermen. Aboard traditional canoes, learn ancestral fishing techniques that respect marine resources. Catches are shared fairly and part is offered to local families. An unforgettable cultural immersion."
    },
    shortDescription: {
      fr: "Pêche traditionnelle avec les pêcheurs locaux - Impact positif garanti",
      en: "Traditional fishing with local fishermen - Guaranteed positive impact"
    },
    price: 65,
    duration: 240,
    difficulty: "BEGINNER",
    category: "FISHING",
    images: [
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800",
      "https://images.unsplash.com/photo-1504472478235-9bc48ba4d60f?w=800"
    ],
    featured: true,
    maxParticipants: 4,
    minParticipants: 2,
    minAge: 12,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Pêche sélective, partenariat équitable avec les pêcheurs locaux, 20% reversé aux associations de protection marine",
      en: "Selective fishing, fair partnership with local fishermen, 20% donated to marine protection associations"
    },
    included: {
      fr: ["Pirogue et matériel", "Guide pêcheur local", "Cours de pêche", "Repas de fruits de mer partagé"],
      en: ["Canoe and equipment", "Local fisherman guide", "Fishing lesson", "Shared seafood meal"]
    },
    requirements: {
      fr: ["Vêtements légers", "Chapeau", "Crème solaire", "Appareil photo"],
      en: ["Light clothing", "Hat", "Sunscreen", "Camera"]
    },
    schedule: ["05:00", "15:00"],
    location: "Village de pêcheurs d'Ambodifotatra",
    meetingPoint: {
      fr: "Village d'Ambodifotatra, devant l'école",
      en: "Ambodifotatra village, in front of the school"
    },
    coordinates: { latitude: -16.8833, longitude: 49.9167 },
    rating: 4.9,
    reviewCount: 156
  },
  {
    name: {
      fr: "Excursion Îles aux Nattes & Baleines",
      en: "Îles aux Nattes & Whales Excursion"
    },
    slug: "excursion-iles-aux-nattes",
    description: {
      fr: "Une journée inoubliable à la découverte des trésors de Sainte-Marie ! Navigation vers l'Île aux Nattes pour un déjeuner de fruits de mer frais, baignade dans des criques paradisiaques, et observation des baleines à bosse (saison de juillet à septembre). Snorkeling sur des récifs coralliens préservés avec notre guide naturaliste.",
      en: "An unforgettable day discovering the treasures of Sainte-Marie! Navigation to Île aux Nattes for a fresh seafood lunch, swimming in paradisiacal coves, and humpback whale watching (July to September season). Snorkeling on preserved coral reefs with our naturalist guide."
    },
    shortDescription: {
      fr: "Journée complète : baleines, plongée, plage et gastronomie locale",
      en: "Full day: whales, diving, beach and local gastronomy"
    },
    price: 95,
    duration: 480,
    difficulty: "BEGINNER",
    category: "EXCURSION",
    images: [
      "https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    ],
    featured: true,
    maxParticipants: 12,
    minParticipants: 4,
    minAge: 6,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Observation respectueuse des baleines, ancrage écologique, participation aux programmes de préservation des coraux",
      en: "Respectful whale watching, ecological anchoring, participation in coral preservation programs"
    },
    included: {
      fr: ["Transport bateau", "Guide naturaliste", "Déjeuner fruits de mer", "Équipement snorkeling", "Boissons"],
      en: ["Boat transport", "Naturalist guide", "Seafood lunch", "Snorkeling equipment", "Drinks"]
    },
    requirements: {
      fr: ["Maillot de bain", "Serviette", "Crème solaire", "Appareil photo étanche", "Vêtements de rechange"],
      en: ["Swimsuit", "Towel", "Sunscreen", "Waterproof camera", "Change of clothes"]
    },
    schedule: ["07:00"],
    location: "Port de Sainte-Marie",
    meetingPoint: {
      fr: "Port principal de Sainte-Marie",
      en: "Main port of Sainte-Marie"
    },
    coordinates: { latitude: -16.8667, longitude: 49.8833 },
    rating: 4.9,
    reviewCount: 287
  },
  {
    name: {
      fr: "Plongée Sous-Marine - Récifs Coralliens",
      en: "Scuba Diving - Coral Reefs"
    },
    slug: "plongee-sous-marine",
    description: {
      fr: "Explorez les fonds marins exceptionnels de Sainte-Marie avec nos instructeurs certifiés PADI. Découvrez une biodiversité incroyable : tortues, raies, requins de récif et une multitude de poissons tropicaux. Adapté à tous les niveaux, du baptême à la certification. Équipement complet fourni.",
      en: "Explore the exceptional seabed of Sainte-Marie with our PADI certified instructors. Discover incredible biodiversity: turtles, rays, reef sharks and a multitude of tropical fish. Suitable for all levels, from discovery to certification. Complete equipment provided."
    },
    shortDescription: {
      fr: "Explorez les trésors sous-marins de Sainte-Marie",
      en: "Explore the underwater treasures of Sainte-Marie"
    },
    price: 75,
    duration: 180,
    difficulty: "INTERMEDIATE",
    category: "DIVING",
    images: [
      "https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800",
      "https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800"
    ],
    featured: false,
    maxParticipants: 6,
    minParticipants: 1,
    minAge: 10,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Éco-gestes enseignés, participation au programme de surveillance des récifs",
      en: "Eco-gestures taught, participation in reef monitoring program"
    },
    included: {
      fr: ["Équipement complet", "Instructeur certifié", "Bouteilles", "Baptême ou exploration"],
      en: ["Complete equipment", "Certified instructor", "Tanks", "Discovery or exploration"]
    },
    requirements: {
      fr: ["Maillot de bain", "Certificat médical si nécessaire"],
      en: ["Swimsuit", "Medical certificate if required"]
    },
    schedule: ["08:00", "14:00"],
    location: "Centre de plongée",
    meetingPoint: {
      fr: "Centre de plongée AquaVenture",
      en: "AquaVenture diving center"
    },
    coordinates: { latitude: -16.8600, longitude: 49.8800 },
    rating: 4.8,
    reviewCount: 98
  },
  {
    name: {
      fr: "Kayak de Mer - Découverte Mangroves",
      en: "Sea Kayak - Mangrove Discovery"
    },
    slug: "kayak-mer",
    description: {
      fr: "Pagayez à travers les mangroves préservées de Sainte-Marie et découvrez un écosystème unique. Observez les oiseaux migrateurs, les crabes de mangrove et apprenez l'importance de ces forêts marines. Activité familiale idéale accessible à tous.",
      en: "Paddle through the preserved mangroves of Sainte-Marie and discover a unique ecosystem. Observe migratory birds, mangrove crabs and learn the importance of these marine forests. Ideal family activity accessible to all."
    },
    shortDescription: {
      fr: "Exploration tranquille des écosystèmes de mangrove",
      en: "Peaceful exploration of mangrove ecosystems"
    },
    price: 35,
    duration: 150,
    difficulty: "BEGINNER",
    category: "PADDLE",
    images: [
      "https://images.unsplash.com/photo-1472745942893-4b9f730c7668?w=800",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
    ],
    featured: false,
    maxParticipants: 10,
    minParticipants: 2,
    minAge: 8,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Zéro impact carbone, sensibilisation à la protection des mangroves",
      en: "Zero carbon impact, awareness of mangrove protection"
    },
    included: {
      fr: ["Kayak double", "Gilets", "Guide nature", "Collation locale"],
      en: ["Double kayak", "Life jackets", "Nature guide", "Local snack"]
    },
    requirements: {
      fr: ["Vêtements pouvant être mouillés", "Chaussures d'eau", "Chapeau"],
      en: ["Clothes that can get wet", "Water shoes", "Hat"]
    },
    schedule: ["08:00", "10:00", "15:00"],
    location: "Mangrove d'Ambodifotatra",
    meetingPoint: {
      fr: "Entrée de la mangrove",
      en: "Mangrove entrance"
    },
    coordinates: { latitude: -16.8900, longitude: 49.9100 },
    rating: 4.7,
    reviewCount: 64
  },
  {
    name: {
      fr: "Tour de l'Île en Bateau",
      en: "Island Boat Tour"
    },
    slug: "tour-ile-bateau",
    description: {
      fr: "Faites le tour complet de l'île de Sainte-Marie en bateau traditionnel. Admirez les falaises, les plages désertes, les villages de pêcheurs et les sites historiques. Commentaire historique et culturel par notre guide local. Déjeuner inclus sur une plage privée.",
      en: "Take a complete tour of Sainte-Marie island by traditional boat. Admire the cliffs, deserted beaches, fishing villages and historical sites. Historical and cultural commentary by our local guide. Lunch included on a private beach."
    },
    shortDescription: {
      fr: "Tour complet de l'île avec déjeuner plage privée",
      en: "Complete island tour with private beach lunch"
    },
    price: 75,
    duration: 360,
    difficulty: "BEGINNER",
    category: "EXCURSION",
    images: [
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800",
      "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
    ],
    featured: false,
    maxParticipants: 15,
    minParticipants: 4,
    minAge: 5,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Bateau à voile quand le vent le permet, nettoyage des plages visitées",
      en: "Sailing boat when wind permits, cleaning of visited beaches"
    },
    included: {
      fr: ["Tour en bateau", "Guide local", "Déjeuner", "Boissons", "Snorkeling"],
      en: ["Boat tour", "Local guide", "Lunch", "Drinks", "Snorkeling"]
    },
    requirements: {
      fr: ["Protection solaire", "Maillot de bain", "Appareil photo"],
      en: ["Sun protection", "Swimsuit", "Camera"]
    },
    schedule: ["08:00"],
    location: "Port de Sainte-Marie",
    meetingPoint: {
      fr: "Bureau du port",
      en: "Port office"
    },
    coordinates: { latitude: -16.8667, longitude: 49.8833 },
    rating: 4.8,
    reviewCount: 112
  },
  {
    name: {
      fr: "Ski Nautique - Initiation",
      en: "Water Skiing - Introduction"
    },
    slug: "ski-nautique",
    description: {
      fr: "Initiez-vous au ski nautique dans les eaux calmes de la baie de Sainte-Marie. Nos moniteurs patients vous accompagneront pour vos premiers glissages. Sensations garanties dès la première réussite !",
      en: "Discover water skiing in the calm waters of Sainte-Marie bay. Our patient instructors will accompany you for your first slides. Guaranteed sensations from the first success!"
    },
    shortDescription: {
      fr: "Apprenez le ski nautique dans un cadre idéal",
      en: "Learn water skiing in an ideal setting"
    },
    price: 50,
    duration: 20,
    difficulty: "BEGINNER",
    category: "WAKEBOARD",
    images: [
      "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800",
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800"
    ],
    featured: false,
    maxParticipants: 3,
    minParticipants: 1,
    minAge: 10,
    ecoFriendly: true,
    ecoDescription: {
      fr: "Formation à l'éco-responsabilité incluse",
      en: "Eco-responsibility training included"
    },
    included: {
      fr: ["Skis", "Gilet", "Moniteur", "Tir depuis le bateau"],
      en: ["Skis", "Life jacket", "Instructor", "Boat pull"]
    },
    requirements: {
      fr: ["Maillot de bain", "Motivation"],
      en: ["Swimsuit", "Motivation"]
    },
    schedule: ["09:00", "11:00", "14:00", "16:00"],
    location: "Baie de Sainte-Marie",
    meetingPoint: {
      fr: "Ponton principal",
      en: "Main pontoon"
    },
    coordinates: { latitude: -16.8700, longitude: 49.8700 },
    rating: 4.5,
    reviewCount: 45
  }
]

export const seedSiteSettings = {
  siteName: "AquaVenture",
  siteDescription: {
    fr: "Excursions nautiques écoresponsables à Sainte-Marie, Madagascar. Bouée tractée, SUP, jet ski, wakeboard, pêche durable.",
    en: "Eco-friendly water excursions in Sainte-Marie, Madagascar. Towed buoy, SUP, jet ski, wakeboard, sustainable fishing."
  },
  contact: {
    email: "contact@aquaventure.mg",
    phone: "+261 32 123 456",
    address: "Plage principale, Sainte-Marie, Madagascar",
    whatsapp: "+26132123456"
  },
  socialLinks: {
    facebook: "https://facebook.com/aquaventuremg",
    instagram: "https://instagram.com/aquaventuremg",
    twitter: "https://twitter.com/aquaventuremg"
  },
  booking: {
    ecoDonationAmount: 5,
    commissionRate: 0.10,
    currency: "EUR"
  }
}

export const seedTestimonials = [
  {
    name: "Marie Dupont",
    location: "Paris, France",
    rating: 5,
    comment: "Une expérience inoubliable ! Les guides sont passionnés et l'approche écoresponsable rend l'aventure encore plus spéciale.",
    activity: "Excursion Îles aux Nattes",
    isVerified: true
  },
  {
    name: "Jean-Pierre Martin",
    location: "Lyon, France",
    rating: 5,
    comment: "Le SUP au lever du soleil était un moment de pure sérénité. Notre guide naturaliste nous a expliqué l'écosystème des mangroves.",
    activity: "Stand-Up Paddle",
    isVerified: true
  },
  {
    name: "Sarah Johnson",
    location: "London, UK",
    rating: 5,
    comment: "The sustainable fishing experience was incredible. Learning traditional techniques from local fishermen while supporting the community.",
    activity: "Pêche Durable",
    isVerified: true
  },
  {
    name: "Marco Rossi",
    location: "Milano, Italia",
    rating: 5,
    comment: "La bouée tractée avec mes enfants - des fous rires garantis ! L'équipe est très professionnelle et attentionnée.",
    activity: "Bouée Tractée",
    isVerified: true
  }
]

const seedData = {
  activities: seedActivities,
  siteSettings: seedSiteSettings,
  testimonials: seedTestimonials
}

export default seedData
