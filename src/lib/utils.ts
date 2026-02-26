import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names with Tailwind CSS classes
 * Useful for conditional and dynamic class application
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats a price with currency
 * @param price - The price value
 * @param currency - Currency code (default: EUR)
 * @param locale - Locale for formatting (default: fr-FR)
 */
export function formatPrice(
  price: number,
  currency: string = 'EUR',
  locale: string = 'fr-FR'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price)
}

/**
 * Formats a date with locale
 * @param date - Date to format
 * @param options - Intl.DateTimeFormatOptions
 * @param locale - Locale for formatting (default: fr-FR)
 */
export function formatDate(
  date: Date | string,
  options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  },
  locale: string = 'fr-FR'
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, options).format(d)
}

/**
 * Formats a time with locale
 * @param date - Date to format
 * @param locale - Locale for formatting (default: fr-FR)
 */
export function formatTime(
  date: Date | string,
  locale: string = 'fr-FR'
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  return new Intl.DateTimeFormat(locale, {
    hour: '2-digit',
    minute: '2-digit',
  }).format(d)
}

/**
 * Generates a URL-friendly slug from a string
 * @param text - Text to convert to slug
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .trim()
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single
}

/**
 * Truncates text to a specified length
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @param suffix - Suffix to append (default: ...)
 */
export function truncate(
  text: string,
  maxLength: number,
  suffix: string = '...'
): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength - suffix.length) + suffix
}

/**
 * Debounce function
 * @param func - Function to debounce
 * @param wait - Wait time in milliseconds
 */
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

/**
 * Throttle function
 * @param func - Function to throttle
 * @param limit - Time limit in milliseconds
 */
export function throttle<T extends (...args: unknown[]) => unknown>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * Generates initials from a name
 * @param name - Full name
 * @param maxLength - Maximum number of initials (default: 2)
 */
export function getInitials(name: string, maxLength: number = 2): string {
  return name
    .split(' ')
    .map((part) => part.charAt(0).toUpperCase())
    .slice(0, maxLength)
    .join('')
}

/**
 * Validates email format
 * @param email - Email to validate
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Formats phone number for display
 * @param phone - Phone number string
 */
export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const match = cleaned.match(/^(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/)
  if (match) {
    return match.slice(1).join(' ')
  }
  return phone
}

/**
 * Calculates percentage
 * @param value - Current value
 * @param total - Total value
 * @param decimals - Decimal places (default: 0)
 */
export function calculatePercentage(
  value: number,
  total: number,
  decimals: number = 0
): number {
  if (total === 0) return 0
  return Number(((value / total) * 100).toFixed(decimals))
}

/**
 * Gets relative time string (e.g., "2 hours ago")
 * @param date - Date to compare
 * @param locale - Locale for formatting (default: fr-FR)
 */
export function getRelativeTime(
  date: Date | string,
  locale: string = 'fr-FR'
): string {
  const d = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

  const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' })

  if (diffInSeconds < 60) {
    return rtf.format(-diffInSeconds, 'second')
  } else if (diffInSeconds < 3600) {
    return rtf.format(-Math.floor(diffInSeconds / 60), 'minute')
  } else if (diffInSeconds < 86400) {
    return rtf.format(-Math.floor(diffInSeconds / 3600), 'hour')
  } else if (diffInSeconds < 2592000) {
    return rtf.format(-Math.floor(diffInSeconds / 86400), 'day')
  } else if (diffInSeconds < 31536000) {
    return rtf.format(-Math.floor(diffInSeconds / 2592000), 'month')
  } else {
    return rtf.format(-Math.floor(diffInSeconds / 31536000), 'year')
  }
}

/**
 * Generates a random ID
 * @param prefix - Optional prefix
 */
export function generateId(prefix?: string): string {
  const id = Math.random().toString(36).substring(2, 15)
  return prefix ? `${prefix}_${id}` : id
}

/**
 * Sleep function for async operations
 * @param ms - Milliseconds to sleep
 */
export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Capitalizes first letter of a string
 * @param text - Text to capitalize
 */
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

/**
 * Checks if code is running on the client side
 */
export function isClient(): boolean {
  return typeof window !== 'undefined'
}

/**
 * Gets scroll percentage of the page
 */
export function getScrollPercentage(): number {
  if (!isClient()) return 0
  
  const scrollTop = window.scrollY
  const docHeight = document.documentElement.scrollHeight - window.innerHeight
  
  return docHeight > 0 ? (scrollTop / docHeight) * 100 : 0
}
