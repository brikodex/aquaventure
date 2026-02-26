/**
 * Font Configuration for AquaVenture
 * Using next/font for optimal performance
 */
import { Montserrat, Inter, Playfair_Display } from 'next/font/google'

/**
 * Montserrat - Used for headings (H1-H6)
 * Bold 700 for main titles, SemiBold 600 for subtitles
 */
export const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
})

/**
 * Inter - Used for body text
 * Regular 400 for paragraphs, Medium 500 for labels
 */
export const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
})

/**
 * Playfair Display - Used for accent text and elegant descriptions
 * Italic style for a sophisticated touch
 */
export const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
})

/**
 * Combined font variables for use in layout
 */
export const fontVariables = `${montserrat.variable} ${inter.variable} ${playfair.variable}`
