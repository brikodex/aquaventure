/**
 * AquaVenture - Root Layout
 * Main layout with providers, fonts, and global structure
 */

import type { Metadata, Viewport } from 'next'
import { Providers } from '@/components/Providers'
import { fontVariables, montserrat, inter, playfair } from '@/lib/fonts'
import './globals.css'

// ============================================
// METADATA
// ============================================

export const metadata: Metadata = {
  title: {
    default: 'AquaVenture - Excursions Nautiques Écoresponsables | Sainte-Marie Madagascar',
    template: '%s | AquaVenture'
  },
  description: 'Découvrez les eaux cristallines de Sainte-Marie à travers des activités nautiques uniques : bouée tractée, SUP, jet ski, wakeboard, pêche durable. Expériences écoresponsables avec impact local positif.',
  keywords: [
    'AquaVenture',
    'Sainte-Marie',
    'Madagascar',
    'excursions nautiques',
    'jet ski',
    'stand-up paddle',
    'pêche durable',
    'tourisme écoresponsable',
    'activités nautiques',
    'wakeboard',
    'bouée tractée',
    'whale watching',
    'baleines',
    'océan Indien',
  ],
  authors: [{ name: 'AquaVenture Team' }],
  creator: 'AquaVenture',
  publisher: 'AquaVenture',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://aquaventure.mg'),
  alternates: {
    canonical: '/',
    languages: {
      'fr-FR': '/fr',
      'en-US': '/en',
    },
  },
  openGraph: {
    title: 'AquaVenture - Excursions Nautiques Écoresponsables',
    description: 'Activités nautiques à Sainte-Marie, Madagascar. Bouée tractée, SUP, jet ski, pêche durable.',
    url: 'https://aquaventure.mg',
    siteName: 'AquaVenture',
    locale: 'fr_MG',
    type: 'website',
    images: [
      {
        url: '/aquaventure-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AquaVenture - Excursions Nautiques Sainte-Marie',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AquaVenture - Excursions Nautiques Écoresponsables',
    description: 'Découvrez les eaux cristallines de Sainte-Marie, Madagascar',
    images: ['/aquaventure-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/aquaventure-logo.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/aquaventure-logo.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#007BFF' },
    { media: '(prefers-color-scheme: dark)', color: '#4DA3FF' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: 'light dark',
}

// ============================================
// ROOT LAYOUT
// ============================================

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html 
      lang="fr" 
      suppressHydrationWarning
      className={`${fontVariables} scroll-smooth`}
    >
      <head>
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://images.unsplash.com" />
      </head>
      <body 
        suppressHydrationWarning
        className={`
          ${montserrat.variable} 
          ${inter.variable} 
          ${playfair.variable}
          font-sans antialiased
          bg-background text-foreground
          min-h-screen flex flex-col
        `}
      >
        {/* Skip to main content - Accessibility */}
        <a
          href="#main-content"
          className="skip-link sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
        >
          Aller au contenu principal
        </a>

        {/* Providers */}
        <Providers>
          {children}
        </Providers>

        {/* Smooth Scroll Script - No-JS Fallback handled by CSS */}
      </body>
    </html>
  )
}
