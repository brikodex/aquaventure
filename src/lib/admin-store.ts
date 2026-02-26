/**
 * AquaVenture - Admin Store
 * Global state management for admin panel using Zustand
 */

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

// ============================================
// TYPES
// ============================================

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'editor' | 'viewer'
  avatar?: string
  createdAt: string
}

export interface Activity {
  id: string
  title: string
  titleEn: string
  description: string
  descriptionEn: string
  category: 'water-sports' | 'fishing' | 'excursions' | 'diving'
  price: number
  duration: string
  maxParticipants: number
  minAge: number
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  images: string[]
  included: string[]
  includedEn: string[]
  whatToBring: string[]
  whatToBringEn: string[]
  schedule: string[]
  location: {
    name: string
    coordinates: { lat: number; lng: number }
  }
  isEcoFriendly: boolean
  ecoLabel?: string
  ecoDescription?: string
  ecoDescriptionEn?: string
  featured: boolean
  rating: number
  reviewCount: number
  status: 'active' | 'draft' | 'archived'
  createdAt: string
  updatedAt: string
}

export interface Booking {
  id: string
  activityId: string
  activityName: string
  clientName: string
  clientEmail: string
  clientPhone: string
  date: string
  time: string
  participants: number
  totalPrice: number
  ecoDonation: number
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
  paymentStatus: 'paid' | 'pending' | 'refunded'
  notes?: string
  createdAt: string
  updatedAt: string
}

export interface Client {
  id: string
  name: string
  email: string
  phone: string
  bookingsCount: number
  totalSpent: number
  createdAt: string
  lastBooking?: string
}

// ============================================
// INITIAL DATA
// ============================================

const initialActivities: Activity[] = [
  {
    id: '1',
    title: 'Jet Ski Sensation',
    titleEn: 'Jet Ski Sensation',
    description: 'Sensation forte garantie ! Explorez les côtes de Sainte-Marie à bord de notre Jet Ski moderne. Encadré par un moniteur professionnel.',
    descriptionEn: 'Guaranteed thrill! Explore the coasts of Sainte-Marie aboard our modern Jet Ski. Supervised by a professional instructor.',
    category: 'water-sports',
    price: 85,
    duration: '1h',
    maxParticipants: 2,
    minAge: 16,
    difficulty: 'beginner',
    images: [
      'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    included: ['Matériel complet', 'Moniteur diplômé', 'Assurance', 'Brière photos'],
    includedEn: ['Complete equipment', 'Certified instructor', 'Insurance', 'Photo briefing'],
    whatToBring: ['Maillot de bain', 'Crème solaire', 'Serviette'],
    whatToBringEn: ['Swimsuit', 'Sunscreen', 'Towel'],
    schedule: ['09:00', '11:00', '14:00', '16:00'],
    location: { name: 'Plage principale', coordinates: { lat: -16.8842, lng: 49.8756 } },
    isEcoFriendly: true,
    ecoLabel: 'Éco-responsable',
    ecoDescription: 'Activité respectueuse de la faune marine locale',
    ecoDescriptionEn: 'Activity respectful of local marine life',
    featured: true,
    rating: 4.9,
    reviewCount: 127,
    status: 'active',
    createdAt: '2024-01-01',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Paddle au Coucher de Soleil',
    titleEn: 'Sunset Paddle',
    description: 'Vivez un moment magique sur les eaux calmes de la lagune. Parfait pour tous les niveaux, cette excursion vous fera découvrir la beauté de Sainte-Marie.',
    descriptionEn: 'Experience a magical moment on the calm waters of the lagoon. Perfect for all levels.',
    category: 'water-sports',
    price: 25,
    duration: '2h',
    maxParticipants: 8,
    minAge: 12,
    difficulty: 'beginner',
    images: [
      'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=800',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800',
    ],
    included: ['Paddle', 'Pagaie', 'Gilet', 'Guide', 'Snacks locaux'],
    includedEn: ['Paddle board', 'Paddle', 'Life jacket', 'Guide', 'Local snacks'],
    whatToBring: ['Maillot de bain', 'Vêtements légers'],
    whatToBringEn: ['Swimsuit', 'Light clothing'],
    schedule: ['07:00', '16:30'],
    location: { name: 'Lagune calme', coordinates: { lat: -16.8792, lng: 49.8806 } },
    isEcoFriendly: true,
    ecoLabel: 'Green Activity',
    ecoDescription: 'Zéro plastique, snacks bio locaux',
    ecoDescriptionEn: 'Zero plastic, local organic snacks',
    featured: true,
    rating: 4.8,
    reviewCount: 89,
    status: 'active',
    createdAt: '2024-01-02',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    title: 'Excursion Îles aux Nattes',
    titleEn: 'Îles aux Nattes Excursion',
    description: 'Une journée complète d\'exploration : bateau traditionnel, snorkeling, repas local et découverte de la faune marine exceptionnelle.',
    descriptionEn: 'A full day of exploration: traditional boat, snorkeling, local meal and exceptional marine life.',
    category: 'excursions',
    price: 95,
    duration: '6h',
    maxParticipants: 12,
    minAge: 8,
    difficulty: 'beginner',
    images: [
      'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=800',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800',
    ],
    included: ['Transport bateau', 'Équipement snorkeling', 'Déjeuner créole', 'Guide naturaliste'],
    includedEn: ['Boat transport', 'Snorkeling gear', 'Creole lunch', 'Naturalist guide'],
    whatToBring: ['Maillot de bain', 'Crème solaire', 'Appareil photo'],
    whatToBringEn: ['Swimsuit', 'Sunscreen', 'Camera'],
    schedule: ['07:00'],
    location: { name: 'Îles aux Nattes', coordinates: { lat: -16.8242, lng: 49.8956 } },
    isEcoFriendly: true,
    ecoLabel: 'Éco-certifié',
    ecoDescription: 'Participation à la préservation des récifs coralliens',
    ecoDescriptionEn: 'Participation in coral reef preservation',
    featured: true,
    rating: 4.9,
    reviewCount: 156,
    status: 'active',
    createdAt: '2024-01-03',
    updatedAt: '2024-01-15',
  },
  {
    id: '4',
    title: 'Bouée Tractée Adrénaline',
    titleEn: 'Adrenaline Towable',
    description: 'Glissez sur les vagues à toute vitesse ! Sensations garanties pour les amateurs de strong sensations.',
    descriptionEn: 'Slide on the waves at full speed! Guaranteed thrills for adrenaline lovers.',
    category: 'water-sports',
    price: 45,
    duration: '30min',
    maxParticipants: 4,
    minAge: 10,
    difficulty: 'intermediate',
    images: [
      'https://images.unsplash.com/photo-1530053969600-caed2596d242?w=800',
    ],
    included: ['Bouée', 'Gilet', 'Pilote professionnel'],
    includedEn: ['Tube', 'Life jacket', 'Professional pilot'],
    whatToBring: ['Maillot de bain'],
    whatToBringEn: ['Swimsuit'],
    schedule: ['10:00', '12:00', '14:00', '16:00'],
    location: { name: 'Plage principale', coordinates: { lat: -16.8842, lng: 49.8756 } },
    isEcoFriendly: false,
    featured: false,
    rating: 4.7,
    reviewCount: 67,
    status: 'active',
    createdAt: '2024-01-04',
    updatedAt: '2024-01-15',
  },
  {
    id: '5',
    title: 'Pêche Sportive Grand Large',
    titleEn: 'Deep Sea Sport Fishing',
    description: 'Partez à la conquête des grands prédateurs : marlin, thon, dorade. Bateau professionnel et équipement de qualité.',
    descriptionEn: 'Conquer great predators: marlin, tuna, mahi-mahi. Professional boat and quality equipment.',
    category: 'fishing',
    price: 65,
    duration: '4h',
    maxParticipants: 4,
    minAge: 14,
    difficulty: 'advanced',
    images: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    ],
    included: ['Bateau', 'Matériel de pêche', 'Appâts', 'En-cas'],
    includedEn: ['Boat', 'Fishing gear', 'Baits', 'Snacks'],
    whatToBring: ['Lunettes de soleil', 'Couvre-chef'],
    whatToBringEn: ['Sunglasses', 'Hat'],
    schedule: ['05:00', '13:00'],
    location: { name: 'Port de Sainte-Marie', coordinates: { lat: -16.8892, lng: 49.8706 } },
    isEcoFriendly: true,
    ecoLabel: 'Pêche durable',
    ecoDescription: 'Pêche responsable, respect des quotas',
    ecoDescriptionEn: 'Responsible fishing, quota respect',
    featured: false,
    rating: 4.6,
    reviewCount: 43,
    status: 'active',
    createdAt: '2024-01-05',
    updatedAt: '2024-01-15',
  },
  {
    id: '6',
    title: 'Wakeboard Initiation',
    titleEn: 'Wakeboard Introduction',
    description: 'Apprenez le wakeboard avec nos moniteurs diplômés. Progression rapide garantie !',
    descriptionEn: 'Learn wakeboarding with our certified instructors. Fast progress guaranteed!',
    category: 'water-sports',
    price: 55,
    duration: '1h',
    maxParticipants: 1,
    minAge: 12,
    difficulty: 'intermediate',
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    ],
    included: ['Planche', 'Gilet', 'Moniteur', 'Initiation'],
    includedEn: ['Board', 'Life jacket', 'Instructor', 'Introduction'],
    whatToBring: ['Maillot de bain', 'Détermination'],
    whatToBringEn: ['Swimsuit', 'Determination'],
    schedule: ['09:00', '11:00', '14:00'],
    location: { name: 'Lac intérieur', coordinates: { lat: -16.8742, lng: 49.8856 } },
    isEcoFriendly: false,
    featured: false,
    rating: 4.5,
    reviewCount: 34,
    status: 'draft',
    createdAt: '2024-01-06',
    updatedAt: '2024-01-15',
  },
]

const initialBookings: Booking[] = [
  {
    id: '1',
    activityId: '1',
    activityName: 'Jet Ski Sensation',
    clientName: 'Marie Dupont',
    clientEmail: 'marie.dupont@email.com',
    clientPhone: '+261 32 12 345 67',
    date: '2024-01-20',
    time: '09:00',
    participants: 2,
    totalPrice: 170,
    ecoDonation: 5,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '2',
    activityId: '2',
    activityName: 'Paddle au Coucher de Soleil',
    clientName: 'Jean Martin',
    clientEmail: 'jean.martin@email.com',
    clientPhone: '+261 33 98 765 43',
    date: '2024-01-21',
    time: '16:30',
    participants: 1,
    totalPrice: 25,
    ecoDonation: 0,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15',
  },
  {
    id: '3',
    activityId: '3',
    activityName: 'Excursion Îles aux Nattes',
    clientName: 'Sarah Johnson',
    clientEmail: 'sarah.j@email.com',
    clientPhone: '+33 6 12 34 56 78',
    date: '2024-01-22',
    time: '07:00',
    participants: 3,
    totalPrice: 285,
    ecoDonation: 5,
    status: 'confirmed',
    paymentStatus: 'paid',
    createdAt: '2024-01-14',
    updatedAt: '2024-01-14',
  },
  {
    id: '4',
    activityId: '4',
    activityName: 'Bouée Tractée Adrénaline',
    clientName: 'Marco Rossi',
    clientEmail: 'marco.rossi@email.com',
    clientPhone: '+39 333 123 4567',
    date: '2024-01-22',
    time: '14:00',
    participants: 4,
    totalPrice: 180,
    ecoDonation: 0,
    status: 'completed',
    paymentStatus: 'paid',
    createdAt: '2024-01-13',
    updatedAt: '2024-01-13',
  },
  {
    id: '5',
    activityId: '5',
    activityName: 'Pêche Sportive Grand Large',
    clientName: 'Anna Schmidt',
    clientEmail: 'anna.schmidt@email.com',
    clientPhone: '+49 170 123 4567',
    date: '2024-01-18',
    time: '05:00',
    participants: 2,
    totalPrice: 130,
    ecoDonation: 5,
    status: 'cancelled',
    paymentStatus: 'refunded',
    notes: 'Annulé pour mauvaises conditions météo',
    createdAt: '2024-01-12',
    updatedAt: '2024-01-17',
  },
  {
    id: '6',
    activityId: '1',
    activityName: 'Jet Ski Sensation',
    clientName: 'Pierre Leroy',
    clientEmail: 'pierre.leroy@email.com',
    clientPhone: '+261 34 55 666 77',
    date: '2024-01-23',
    time: '11:00',
    participants: 1,
    totalPrice: 85,
    ecoDonation: 0,
    status: 'pending',
    paymentStatus: 'pending',
    createdAt: '2024-01-16',
    updatedAt: '2024-01-16',
  },
]

const initialClients: Client[] = [
  {
    id: '1',
    name: 'Marie Dupont',
    email: 'marie.dupont@email.com',
    phone: '+261 32 12 345 67',
    bookingsCount: 3,
    totalSpent: 340,
    createdAt: '2023-06-15',
    lastBooking: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jean Martin',
    email: 'jean.martin@email.com',
    phone: '+261 33 98 765 43',
    bookingsCount: 1,
    totalSpent: 25,
    createdAt: '2024-01-15',
    lastBooking: '2024-01-15',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    email: 'sarah.j@email.com',
    phone: '+33 6 12 34 56 78',
    bookingsCount: 2,
    totalSpent: 380,
    createdAt: '2023-11-20',
    lastBooking: '2024-01-14',
  },
  {
    id: '4',
    name: 'Marco Rossi',
    email: 'marco.rossi@email.com',
    phone: '+39 333 123 4567',
    bookingsCount: 1,
    totalSpent: 180,
    createdAt: '2024-01-13',
    lastBooking: '2024-01-13',
  },
  {
    id: '5',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@email.com',
    phone: '+49 170 123 4567',
    bookingsCount: 1,
    totalSpent: 0,
    createdAt: '2024-01-12',
    lastBooking: '2024-01-12',
  },
]

// ============================================
// STORE INTERFACE
// ============================================

interface AdminState {
  // Auth
  isAuthenticated: boolean
  currentUser: AdminUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void

  // Activities
  activities: Activity[]
  addActivity: (activity: Omit<Activity, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateActivity: (id: string, updates: Partial<Activity>) => void
  deleteActivity: (id: string) => void
  getActivityById: (id: string) => Activity | undefined

  // Bookings
  bookings: Booking[]
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>) => void
  updateBooking: (id: string, updates: Partial<Booking>) => void
  deleteBooking: (id: string) => void
  getBookingById: (id: string) => Booking | undefined

  // Clients
  clients: Client[]
  updateClient: (id: string, updates: Partial<Client>) => void
  deleteClient: (id: string) => void

  // UI State
  sidebarCollapsed: boolean
  toggleSidebar: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

// ============================================
// STORE
// ============================================

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      // Auth
      isAuthenticated: false,
      currentUser: null,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000))

        // Demo credentials
        if (email === 'admin@aquaventure.mg' && password === 'admin123') {
          set({
            isAuthenticated: true,
            currentUser: {
              id: '1',
              email: 'admin@aquaventure.mg',
              name: 'Admin AquaVenture',
              role: 'super_admin',
              createdAt: new Date().toISOString(),
            },
          })
          return true
        }
        return false
      },

      logout: () => {
        set({ isAuthenticated: false, currentUser: null })
      },

      // Activities
      activities: initialActivities,

      addActivity: (activity) => {
        const newActivity: Activity = {
          ...activity,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ activities: [...state.activities, newActivity] }))
      },

      updateActivity: (id, updates) => {
        set((state) => ({
          activities: state.activities.map((a) =>
            a.id === id ? { ...a, ...updates, updatedAt: new Date().toISOString() } : a
          ),
        }))
      },

      deleteActivity: (id) => {
        set((state) => ({
          activities: state.activities.filter((a) => a.id !== id),
        }))
      },

      getActivityById: (id) => {
        return get().activities.find((a) => a.id === id)
      },

      // Bookings
      bookings: initialBookings,

      addBooking: (booking) => {
        const newBooking: Booking = {
          ...booking,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
        set((state) => ({ bookings: [...state.bookings, newBooking] }))
      },

      updateBooking: (id, updates) => {
        set((state) => ({
          bookings: state.bookings.map((b) =>
            b.id === id ? { ...b, ...updates, updatedAt: new Date().toISOString() } : b
          ),
        }))
      },

      deleteBooking: (id) => {
        set((state) => ({
          bookings: state.bookings.filter((b) => b.id !== id),
        }))
      },

      getBookingById: (id) => {
        return get().bookings.find((b) => b.id === id)
      },

      // Clients
      clients: initialClients,

      updateClient: (id, updates) => {
        set((state) => ({
          clients: state.clients.map((c) => (c.id === id ? { ...c, ...updates } : c)),
        }))
      },

      deleteClient: (id) => {
        set((state) => ({
          clients: state.clients.filter((c) => c.id !== id),
        }))
      },

      // UI State
      sidebarCollapsed: false,
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

      darkMode: false,
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
    }),
    {
      name: 'aquaventure-admin',
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        currentUser: state.currentUser,
        darkMode: state.darkMode,
      }),
    }
  )
)
