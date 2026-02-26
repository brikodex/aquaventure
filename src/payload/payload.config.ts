/**
 * AquaVenture - Payload CMS Configuration
 * Configuration complète pour la gestion des activités nautiques
 * Compatible Next.js 15 + Prisma
 */

import { CollectionConfig, GlobalConfig, Field, AccessControl } from './types'

// ============================================
// ACCESS CONTROL - Rôles et Permissions
// ============================================

/**
 * Définition des contrôles d'accès basés sur les rôles
 * - SUPER_ADMIN: Accès complet à tout
 * - ADMIN: Gestion activités, réservations, utilisateurs
 * - EDITOR: Édition activités et réservations
 * - USER: Accès limité à son propre compte
 */
export const accessControl: AccessControl = {
  // Super Admin - Full access
  superAdmin: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  
  // Admin - Manage activities, bookings, users
  admin: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: ({ req, id }) => {
      // Cannot delete super admins
      return true
    },
  },
  
  // Editor - Edit activities and bookings
  editor: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => false,
  },
  
  // User - Own data only
  user: {
    read: ({ req, id }) => {
      // Can only read own data
      return req.user?.id === id
    },
    create: () => false,
    update: ({ req, id }) => req.user?.id === id,
    delete: () => false,
  },
}

// ============================================
// FIELDS - Champs réutilisables
// ============================================

/**
 * Champ texte multilingue (FR/EN)
 * @param name - Nom du champ
 * @param required - Champ requis
 * @param localized - Activer la localisation
 */
const localizedTextField = (name: string, required: boolean = false): Field => ({
  name,
  type: 'text',
  required,
  localized: true,
  admin: {
    position: 'sidebar',
  },
})

/**
 * Champ textarea multilingue
 */
const localizedTextareaField = (name: string, required: boolean = false): Field => ({
  name,
  type: 'textarea',
  required,
  localized: true,
  admin: {
    rows: 4,
  },
})

/**
 * Champ richText (WYSIWYG) multilingue
 */
const localizedRichTextField = (name: string): Field => ({
  name,
  type: 'richText',
  localized: true,
  admin: {
    elements: ['h2', 'h3', 'h4', 'link', 'ol', 'ul', 'blockquote'],
    leaves: ['bold', 'italic', 'underline'],
  },
})

/**
 * Champ upload d'image
 */
const imageUploadField = (name: string = 'images'): Field => ({
  name,
  type: 'upload',
  relationTo: 'media',
  hasMany: true,
  admin: {
    position: 'sidebar',
    thumbnail: true,
  },
})

/**
 * Champ prix avec devise
 */
const priceField = (): Field => ({
  name: 'price',
  type: 'number',
  required: true,
  min: 0,
  admin: {
    position: 'sidebar',
    step: 0.01,
    description: 'Prix par personne en EUR',
  },
})

/**
 * Champ durée en minutes
 */
const durationField = (): Field => ({
  name: 'duration',
  type: 'number',
  required: true,
  admin: {
    position: 'sidebar',
    description: 'Durée en minutes',
  },
})

// ============================================
// COLLECTIONS
// ============================================

/**
 * Collection: Users
 * Gestion des utilisateurs avec rôles
 */
export const UsersCollection: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
    group: 'Administration',
    description: 'Gestion des utilisateurs et des rôles',
    defaultColumns: ['email', 'name', 'role', 'createdAt'],
    listSearchableFields: ['email', 'name'],
  },
  auth: {
    verifyEmail: true,
    maxLoginAttempts: 5,
    lockTime: 60000, // 1 minute
    tokenExpiration: 86400, // 24 hours
    passwordReset: true,
  },
  access: {
    read: ({ req }) => {
      if (req.user?.role === 'SUPER_ADMIN' || req.user?.role === 'ADMIN') return true
      return { id: { equals: req.user?.id } }
    },
    create: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
    update: ({ req }) => {
      if (['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || '')) return true
      return { id: { equals: req.user?.id } }
    },
    delete: ({ req }) => ['SUPER_ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'firstName',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'lastName',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'phone',
      type: 'text',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        position: 'sidebar',
        thumbnail: true,
      },
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'USER',
      options: [
        { label: 'Utilisateur', value: 'USER' },
        { label: 'Éditeur', value: 'EDITOR' },
        { label: 'Administrateur', value: 'ADMIN' },
        { label: 'Super Admin', value: 'SUPER_ADMIN' },
      ],
      admin: {
        position: 'sidebar',
      },
      access: {
        read: () => true,
        update: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
      },
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'fr',
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}

/**
 * Collection: Activities
 * Gestion des activités nautiques
 */
export const ActivitiesCollection: CollectionConfig = {
  slug: 'activities',
  admin: {
    useAsTitle: 'name',
    group: 'Contenu',
    description: 'Activités nautiques et excursions',
    defaultColumns: ['name', 'category', 'price', 'featured', 'isActive'],
    listSearchableFields: ['name', 'description'],
    preview: (doc: any) => `/activite/${doc.slug}`,
  },
  access: {
    read: () => true, // Public read
    create: ({ req }) => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user?.role || ''),
    update: ({ req }) => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user?.role || ''),
    delete: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    // Titre et slug
    {
      name: 'name',
      type: 'text',
      required: true,
      localized: true,
      admin: {
        description: 'Nom de l\'activité',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        readOnly: true,
        description: 'URL-friendly identifier (auto-generated)',
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (!value && data?.name) {
              return data.name
                .toLowerCase()
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
            }
            return value
          },
        ],
      },
    },
    
    // Descriptions
    localizedTextareaField('shortDescription', true),
    localizedRichTextField('description'),
    
    // Catégorisation
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: '🚤 Jet Ski', value: 'JET_SKI' },
        { label: '🛟 Bouée Tractée', value: 'BUOY' },
        { label: '🏄 Stand-Up Paddle', value: 'PADDLE' },
        { label: '🎿 Wakeboard', value: 'WAKEBOARD' },
        { label: '🎣 Pêche Durable', value: 'FISHING' },
        { label: '🏝️ Excursion', value: 'EXCURSION' },
        { label: '🤿 Plongée', value: 'DIVING' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'difficulty',
      type: 'select',
      defaultValue: 'BEGINNER',
      options: [
        { label: '🟢 Débutant', value: 'BEGINNER' },
        { label: '🟡 Intermédiaire', value: 'INTERMEDIATE' },
        { label: '🟠 Avancé', value: 'ADVANCED' },
        { label: '🔴 Expert', value: 'EXPERT' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    
    // Prix et capacité
    priceField(),
    durationField(),
    {
      name: 'maxParticipants',
      type: 'number',
      defaultValue: 10,
      min: 1,
      admin: {
        position: 'sidebar',
        description: 'Nombre maximum de participants',
      },
    },
    {
      name: 'minParticipants',
      type: 'number',
      defaultValue: 1,
      min: 1,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'minAge',
      type: 'number',
      defaultValue: 8,
      min: 0,
      admin: {
        position: 'sidebar',
        description: 'Âge minimum requis',
      },
    },
    
    // Média
    imageUploadField('images'),
    {
      name: 'mainImageIndex',
      type: 'number',
      defaultValue: 0,
      admin: {
        position: 'sidebar',
        description: 'Index de l\'image principale',
      },
    },
    {
      name: 'videoUrl',
      type: 'text',
      admin: {
        description: 'URL de la vidéo (YouTube, Vimeo)',
      },
    },
    
    // Écoresponsabilité
    {
      name: 'ecoFriendly',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Cette activité est-elle écoresponsable ?',
      },
    },
    localizedTextareaField('ecoDescription'),
    
    // Détails
    {
      name: 'included',
      type: 'array',
      localized: true,
      admin: {
        description: 'Ce qui est inclus',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'requirements',
      type: 'array',
      localized: true,
      admin: {
        description: 'Ce qu\'il faut apporter',
      },
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'schedule',
      type: 'array',
      admin: {
        description: 'Créneaux horaires disponibles',
      },
      fields: [
        {
          name: 'time',
          type: 'text',
          required: true,
          admin: {
            placeholder: '09:00',
          },
        },
      ],
    },
    
    // Localisation
    {
      name: 'location',
      type: 'text',
      required: true,
      admin: {
        description: 'Nom du lieu',
      },
    },
    localizedTextField('meetingPoint'),
    {
      name: 'coordinates',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'latitude',
          type: 'number',
          admin: {
            placeholder: '-16.8833',
          },
        },
        {
          name: 'longitude',
          type: 'number',
          admin: {
            placeholder: '49.8833',
          },
        },
      ],
    },
    
    // Mise en avant
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'Afficher sur la page d\'accueil',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
      admin: {
        position: 'sidebar',
      },
    },
    
    // SEO
    {
      name: 'seo',
      type: 'group',
      admin: {
        position: 'sidebar',
        group: 'SEO',
      },
      fields: [
        localizedTextField('metaTitle'),
        localizedTextareaField('metaDescription'),
      ],
    },
  ],
}

/**
 * Collection: Bookings
 * Gestion des réservations
 */
export const BookingsCollection: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'bookingNumber',
    group: 'Commerce',
    description: 'Réservations clients',
    defaultColumns: ['bookingNumber', 'activity', 'date', 'status', 'totalAmount'],
    listSearchableFields: ['bookingNumber', 'contactEmail'],
  },
  access: {
    read: ({ req }) => {
      if (['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user?.role || '')) return true
      return { userId: { equals: req.user?.id } }
    },
    create: () => true, // Public can create bookings
    update: ({ req }) => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user?.role || ''),
    delete: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    {
      name: 'bookingNumber',
      type: 'text',
      unique: true,
      admin: {
        readOnly: true,
      },
      hooks: {
        beforeValidate: [
          ({ value }) => {
            if (!value) {
              // Generate booking number: AV-YYYYMMDD-XXXX
              const date = new Date().toISOString().slice(0, 10).replace(/-/g, '')
              const random = Math.random().toString(36).substring(2, 6).toUpperCase()
              return `AV-${date}-${random}`
            }
            return value
          },
        ],
      },
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'activity',
      type: 'relationship',
      relationTo: 'activities',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: {
        date: {
          minDate: new Date(),
        },
      },
    },
    {
      name: 'timeSlot',
      type: 'select',
      required: true,
      options: [
        { label: '07:00', value: '07:00' },
        { label: '09:00', value: '09:00' },
        { label: '11:00', value: '11:00' },
        { label: '14:00', value: '14:00' },
        { label: '16:00', value: '16:00' },
      ],
    },
    {
      name: 'participants',
      type: 'number',
      required: true,
      min: 1,
      defaultValue: 1,
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'email', type: 'email', required: true },
        { name: 'phone', type: 'text', required: true },
        { name: 'specialRequests', type: 'textarea' },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        { name: 'basePrice', type: 'number', required: true },
        { name: 'ecoDonation', type: 'number', defaultValue: 0 },
        { name: 'totalAmount', type: 'number', required: true },
        { name: 'currency', type: 'text', defaultValue: 'EUR' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'PENDING',
      options: [
        { label: '⏳ En attente', value: 'PENDING' },
        { label: '✅ Confirmée', value: 'CONFIRMED' },
        { label: '💰 Payée', value: 'PAID' },
        { label: '❌ Annulée', value: 'CANCELLED' },
        { label: '🎉 Terminée', value: 'COMPLETED' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'payment',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        { name: 'stripePaymentId', type: 'text' },
        { name: 'stripeSessionId', type: 'text' },
        {
          name: 'status',
          type: 'select',
          defaultValue: 'PENDING',
          options: [
            { label: 'En attente', value: 'PENDING' },
            { label: 'En cours', value: 'PROCESSING' },
            { label: 'Réussi', value: 'SUCCEEDED' },
            { label: 'Échoué', value: 'FAILED' },
            { label: 'Remboursé', value: 'REFUNDED' },
          ],
        },
      ],
    },
  ],
}

/**
 * Collection: Media
 * Gestion des fichiers média
 */
export const MediaCollection: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'filename',
    group: 'Système',
    description: 'Images et fichiers',
  },
  upload: {
    staticURL: '/uploads',
    staticDir: 'uploads',
    imageSizes: [
      { name: 'thumbnail', width: 300, height: 200 },
      { name: 'card', width: 600, height: 400 },
      { name: 'hero', width: 1920, height: 1080 },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      localized: true,
      admin: {
        description: 'Texte alternatif pour l\'accessibilité',
      },
    },
    {
      name: 'caption',
      type: 'text',
      localized: true,
    },
  ],
}

/**
 * Collection: Reviews
 * Avis clients
 */
export const ReviewsCollection: CollectionConfig = {
  slug: 'reviews',
  admin: {
    useAsTitle: 'id',
    group: 'Contenu',
    description: 'Avis clients',
    defaultColumns: ['activity', 'rating', 'user', 'createdAt'],
  },
  access: {
    read: () => true,
    create: ({ req }) => !!req.user,
    update: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
    delete: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'activity',
      type: 'relationship',
      relationTo: 'activities',
      required: true,
    },
    {
      name: 'rating',
      type: 'number',
      required: true,
      min: 1,
      max: 5,
      admin: {
        description: 'Note de 1 à 5 étoiles',
      },
    },
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'comment',
      type: 'textarea',
      required: true,
    },
    {
      name: 'isVerified',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Réservation vérifiée',
      },
    },
    {
      name: 'isPublished',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
}

/**
 * Collection: Submissions
 * Formulaires de contact et dépôts
 */
export const SubmissionsCollection: CollectionConfig = {
  slug: 'submissions',
  admin: {
    useAsTitle: 'id',
    group: 'Administration',
    description: 'Soumissions de formulaires',
    defaultColumns: ['type', 'name', 'email', 'status', 'createdAt'],
  },
  access: {
    read: ({ req }) => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user?.role || ''),
    create: () => true, // Public can submit
    update: ({ req }) => ['SUPER_ADMIN', 'ADMIN', 'EDITOR'].includes(req.user?.role || ''),
    delete: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Contact', value: 'contact' },
        { label: 'Déposer activité', value: 'deposer' },
        { label: 'Devis', value: 'quote' },
        { label: 'Newsletter', value: 'newsletter' },
      ],
    },
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'phone', type: 'text' },
    { name: 'subject', type: 'text' },
    { name: 'message', type: 'textarea', required: true },
    { name: 'data', type: 'json' }, // Additional fields
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: '🆕 Nouveau', value: 'new' },
        { label: '📖 Lu', value: 'read' },
        { label: '✉️ Répondu', value: 'replied' },
        { label: '✅ Fermé', value: 'closed' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}

/**
 * Collection: Newsletters
 * Abonnements newsletter
 */
export const NewslettersCollection: CollectionConfig = {
  slug: 'newsletters',
  admin: {
    useAsTitle: 'email',
    group: 'Marketing',
    description: 'Abonnements newsletter',
    defaultColumns: ['email', 'active', 'createdAt'],
  },
  access: {
    read: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
    create: () => true,
    update: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
    delete: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    { name: 'email', type: 'email', required: true, unique: true },
    { name: 'name', type: 'text' },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'fr',
      options: [
        { label: 'Français', value: 'fr' },
        { label: 'English', value: 'en' },
      ],
    },
    { name: 'active', type: 'checkbox', defaultValue: true },
    { name: 'source', type: 'text' },
  ],
}

// ============================================
// GLOBALS
// ============================================

/**
 * Global: Site Settings
 * Configuration globale du site
 */
export const SiteSettingsGlobal: GlobalConfig = {
  slug: 'site-settings',
  admin: {
    group: 'Système',
    description: 'Configuration du site',
  },
  access: {
    read: () => true,
    update: ({ req }) => ['SUPER_ADMIN', 'ADMIN'].includes(req.user?.role || ''),
  },
  fields: [
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'AquaVenture',
      required: true,
    },
    localizedTextField('siteDescription'),
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'favicon',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'contact',
      type: 'group',
      fields: [
        { name: 'email', type: 'email' },
        { name: 'phone', type: 'text' },
        { name: 'address', type: 'text' },
        { name: 'whatsapp', type: 'text' },
      ],
    },
    {
      name: 'socialLinks',
      type: 'group',
      fields: [
        { name: 'facebook', type: 'text' },
        { name: 'instagram', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'youtube', type: 'text' },
      ],
    },
    {
      name: 'stripe',
      type: 'group',
      admin: {
        group: 'Paiements',
      },
      fields: [
        { name: 'publicKey', type: 'text' },
        { name: 'secretKey', type: 'text', admin: { hidden: true } },
        { name: 'webhookSecret', type: 'text', admin: { hidden: true } },
      ],
    },
    {
      name: 'booking',
      type: 'group',
      admin: {
        group: 'Réservations',
      },
      fields: [
        { name: 'ecoDonationAmount', type: 'number', defaultValue: 5 },
        { name: 'commissionRate', type: 'number', defaultValue: 0.10 },
        { name: 'currency', type: 'text', defaultValue: 'EUR' },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      admin: {
        group: 'SEO',
      },
      fields: [
        localizedTextField('defaultMetaTitle'),
        localizedTextareaField('defaultMetaDescription'),
        { name: 'googleAnalyticsId', type: 'text' },
        { name: 'googleTagManagerId', type: 'text' },
      ],
    },
  ],
}

// ============================================
// EXPORTS
// ============================================

export const payloadConfig = {
  // Server URL
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000',
  
  // Collections
  collections: [
    UsersCollection,
    ActivitiesCollection,
    BookingsCollection,
    MediaCollection,
    ReviewsCollection,
    SubmissionsCollection,
    NewslettersCollection,
  ],
  
  // Globals
  globals: [
    SiteSettingsGlobal,
  ],
  
  // Localization
  localization: {
    locales: ['fr', 'en'],
    defaultLocale: 'fr',
    fallback: true,
  },
  
  // Admin panel
  admin: {
    user: 'users',
    autoLogin: {
      email: 'admin@aquaventure.mg',
      password: 'admin123',
    },
    avatar: 'image',
    meta: {
      titleSuffix: ' | AquaVenture Admin',
      favicon: '/favicon.ico',
    },
    css: `
      /* Custom nautical theme for admin */
      :root {
        --theme-primary: #007BFF;
        --theme-secondary: #28A745;
        --theme-accent: #FFC107;
      }
      
      .collection-list__row:hover {
        background-color: rgba(0, 123, 255, 0.05);
      }
      
      .btn--primary {
        background-color: var(--theme-primary);
      }
      
      .sidebar__logo {
        font-family: 'Montserrat', sans-serif;
        font-weight: 700;
      }
    `,
    components: {
      beforeNavLinks: [
        {
          path: '/src/payload/components/CustomNavLinks',
        },
      ],
    },
  },
  
  // Rate limiting
  rateLimit: {
    max: 100,
    window: 60000, // 1 minute
  },
  
  // CORS
  cors: [
    'http://localhost:3000',
    'https://aquaventure.mg',
    'https://www.aquaventure.mg',
  ],
  
  // CSRF
  csrf: [
    'http://localhost:3000',
    'https://aquaventure.mg',
    'https://www.aquaventure.mg',
  ],
}

export default payloadConfig
