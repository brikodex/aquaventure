/**
 * AquaVenture - Internationalization Configuration
 * Supports French (default) and English
 */

export const locales = ['fr', 'en'] as const
export type Locale = (typeof locales)[number]

export const defaultLocale: Locale = 'fr'

export const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English'
}

export const localeFlags: Record<Locale, string> = {
  fr: '🇫🇷',
  en: '🇬🇧'
}

/**
 * Get locale from pathname
 */
export function getLocaleFromPathname(pathname: string): Locale {
  const firstSegment = pathname.split('/')[1]
  return locales.includes(firstSegment as Locale) ? (firstSegment as Locale) : defaultLocale
}

/**
 * Remove locale prefix from pathname
 */
export function removeLocalePrefix(pathname: string): string {
  const firstSegment = pathname.split('/')[1]
  if (locales.includes(firstSegment as Locale)) {
    return pathname.replace(`/${firstSegment}`, '') || '/'
  }
  return pathname
}

/**
 * Add locale prefix to pathname
 */
export function addLocalePrefix(pathname: string, locale: Locale): string {
  const cleanPath = removeLocalePrefix(pathname)
  return locale === defaultLocale ? cleanPath : `/${locale}${cleanPath}`
}
