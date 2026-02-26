'use client'

/**
 * AquaVenture - App Providers
 * Wraps the application with all necessary context providers
 */

import { LanguageProvider } from '@/contexts/LanguageContext'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/toaster'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import SmoothScrollProvider from '@/components/providers/SmoothScroll'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <LanguageProvider>
        <SmoothScrollProvider>
          <Header />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster />
        </SmoothScrollProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}
