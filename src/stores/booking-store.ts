/**
 * AquaVenture - Booking Store
 * Zustand store for managing booking state
 */

import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Activity } from '@/data/activities'

// ============================================
// TYPES
// ============================================

export interface BookingItem {
  activity: Activity
  date: string
  time: string
  participants: number
  ecoDonation: boolean
}

export interface BookingState {
  items: BookingItem[]
  contactInfo: {
    name: string
    email: string
    phone: string
    specialRequests: string
  }
  
  // Actions
  addItem: (item: BookingItem) => void
  removeItem: (activityId: string) => void
  updateItem: (activityId: string, updates: Partial<BookingItem>) => void
  updateContactInfo: (info: Partial<BookingState['contactInfo']>) => void
  clearBooking: () => void
  
  // Computed
  getTotalPrice: () => number
  getItemCount: () => number
}

// ============================================
// STORE
// ============================================

export const useBookingStore = create<BookingState>()(
  persist(
    (set, get) => ({
      items: [],
      contactInfo: {
        name: '',
        email: '',
        phone: '',
        specialRequests: '',
      },

      addItem: (item) =>
        set((state) => ({
          items: [...state.items.filter((i) => i.activity.id !== item.activity.id), item],
        })),

      removeItem: (activityId) =>
        set((state) => ({
          items: state.items.filter((i) => i.activity.id !== activityId),
        })),

      updateItem: (activityId, updates) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.activity.id === activityId ? { ...item, ...updates } : item
          ),
        })),

      updateContactInfo: (info) =>
        set((state) => ({
          contactInfo: { ...state.contactInfo, ...info },
        })),

      clearBooking: () =>
        set({
          items: [],
          contactInfo: {
            name: '',
            email: '',
            phone: '',
            specialRequests: '',
          },
        }),

      getTotalPrice: () => {
        const { items } = get()
        return items.reduce((total, item) => {
          const activityPrice = item.activity.price * item.participants
          const donation = item.ecoDonation ? 5 : 0
          return total + activityPrice + donation
        }, 0)
      },

      getItemCount: () => get().items.length,
    }),
    {
      name: 'aquaventure-booking',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        contactInfo: state.contactInfo,
      }),
    }
  )
)

// ============================================
// SELECTORS
// ============================================

export const selectBookingItems = (state: BookingState) => state.items
export const selectContactInfo = (state: BookingState) => state.contactInfo
export const selectTotalPrice = (state: BookingState) => 
  state.items.reduce((total, item) => {
    const activityPrice = item.activity.price * item.participants
    const donation = item.ecoDonation ? 5 : 0
    return total + activityPrice + donation
  }, 0)
export const selectItemCount = (state: BookingState) => state.items.length

export default useBookingStore
