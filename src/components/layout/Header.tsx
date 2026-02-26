'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from 'next-themes'
import { useLanguage } from '@/contexts/LanguageContext'
import { 
  Menu, 
  X, 
  Sun, 
  Moon, 
  Globe,
  Anchor,
  Waves,
  ChevronDown,
  Compass,
  Fish,
  Ship,
  Heart,
  Info,
  Newspaper,
  Phone,
  MapPin,
  Sparkles
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { Sheet, SheetContent, SheetTrigger, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { VisuallyHidden } from '@radix-ui/react-visually-hidden'

// ============================================
// NAVIGATION DATA
// ============================================

const activitiesMenu = [
  {
    title: 'Jet Ski',
    href: '/activities/jet-ski',
    description: 'Adrénaline et paysages spectaculaires le long des côtes préservées',
    icon: '🚤',
  },
  {
    title: 'Stand-Up Paddle',
    href: '/activities/stand-up-paddle',
    description: 'Explorez les lagons préservés en silence et en harmonie avec la nature',
    icon: '🏄',
  },
  {
    title: 'Bouée Tractée',
    href: '/activities/bouee-tractee',
    description: 'Sensations fortes garanties sur les eaux turquoise',
    icon: '🛟',
  },
  {
    title: 'Wakeboard',
    href: '/activities/wakeboard',
    description: 'Sensations de glisse dans un cadre paradisiaque',
    icon: '🎿',
  },
  {
    title: 'Pêche Durable',
    href: '/activities/peche-durable',
    description: 'Pêche traditionnelle avec les pêcheurs locaux - Impact positif garanti',
    icon: '🎣',
  },
  {
    title: 'Excursions',
    href: '/activities/excursion-iles',
    description: 'Journée complète : baleines, plongée, plage et gastronomie locale',
    icon: '🏝️',
  },
]

const experiencesMenu = [
  {
    title: 'Excursions Îles',
    href: '/experiences/excursions',
    description: 'Découvrez les îles aux Nattes et les trésors de Sainte-Marie',
    icon: '🏝️',
  },
  {
    title: 'Observation Baleines',
    href: '/experiences/baleines',
    description: 'Observez les baleines à bosse (saison juillet-septembre)',
    icon: '🐋',
  },
  {
    title: 'Snorkeling',
    href: '/experiences/snorkeling',
    description: 'Explorez les récifs coralliens préservés',
    icon: '🤿',
  },
]

const mainNavLinks = [
  { labelKey: 'nav.home', href: '/' },
  { labelKey: 'nav.activities', href: '/activities', hasDropdown: true, items: activitiesMenu },
  { labelKey: 'nav.experiences', href: '/experiences', hasDropdown: true, items: experiencesMenu },
  { labelKey: 'nav.about', href: '/about' },
  { labelKey: 'nav.blog', href: '/blog' },
  { labelKey: 'nav.contact', href: '/contact' },
]

// ============================================
// MEGA MENU ITEM COMPONENT
// ============================================

const MegaMenuItem: React.FC<{
  item: typeof activitiesMenu[0]
}> = ({ item }) => {
  return (
    <NavigationMenuLink asChild>
      <Link
        href={item.href}
        className={cn(
          'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none',
          'transition-colors hover:bg-primary/10 hover:text-primary',
          'focus:bg-primary/10 focus:text-primary'
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-xl">{item.icon}</span>
          <span className="text-sm font-semibold leading-none">{item.title}</span>
        </div>
        <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
          {item.description}
        </p>
      </Link>
    </NavigationMenuLink>
  )
}

// ============================================
// HEADER COMPONENT
// ============================================

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [langDropdown, setLangDropdown] = useState(false)
  const { theme, setTheme } = useTheme()
  const { language, setLanguage, t } = useLanguage()
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Mount effect for theme
  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 0)
    return () => clearTimeout(timer)
  }, [])

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  // Check if link is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname.startsWith(href)
  }

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'glass-card py-2 shadow-lg' 
          : 'bg-transparent py-4'
      )}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <nav className="container-wide flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative z-10 flex items-center gap-2 group">
          <motion.div
            className="relative w-12 h-12 md:w-14 md:h-14"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src="/aquaventure-logo.png"
              alt="AquaVenture Logo"
              fill
              className="object-contain"
              priority
            />
            <motion.div
              className="absolute inset-0 rounded-full bg-primary/20 blur-xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>
          <div className="hidden sm:block">
            <span className="font-montserrat font-bold text-xl text-foreground">
              Aqua<span className="text-primary">Venture</span>
            </span>
            <p className="text-xs text-muted-foreground">Sainte-Marie</p>
          </div>
        </Link>

        {/* Desktop Navigation - Mega Menu */}
        <div className="hidden lg:flex items-center">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center gap-1">
              {mainNavLinks.map((link, index) => (
                <NavigationMenuItem key={link.href}>
                  {link.hasDropdown ? (
                    <>
                      <NavigationMenuTrigger
                        className={cn(
                          'font-inter font-medium bg-transparent',
                          isActive(link.href) && 'text-primary'
                        )}
                      >
                        {t(link.labelKey)}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <motion.ul
                          className="grid gap-3 p-4 w-[400px] md:w-[500px] md:grid-cols-2"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          {/* View All Link */}
                          <li className="col-span-2 row-span-1">
                            <NavigationMenuLink asChild>
                              <Link
                                href={link.href}
                                className={cn(
                                  'flex h-full w-full select-none flex-col justify-end rounded-md',
                                  'bg-gradient-to-br from-primary/20 to-secondary/10',
                                  'p-4 no-underline outline-none focus:shadow-md',
                                  'hover:from-primary/30 hover:to-secondary/20 transition-all'
                                )}
                              >
                                <div className="flex items-center gap-2 mb-2">
                                  <Waves className="w-5 h-5 text-primary" />
                                  <span className="text-sm font-semibold text-primary">
                                    {language === 'fr' ? `Voir toutes les ${t(link.labelKey).toLowerCase()}` : `View all ${t(link.labelKey)}`}
                                  </span>
                                </div>
                                <p className="text-xs text-muted-foreground">
                                  {language === 'fr' ? "Explorez notre collection complète d'expériences nautiques" : "Explore our complete collection of nautical experiences"}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </li>
                          {/* Menu Items */}
                          {link.items?.map((item) => (
                            <li key={item.href}>
                              <MegaMenuItem item={item} />
                            </li>
                          ))}
                        </motion.ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          'font-inter font-medium bg-transparent',
                          isActive(link.href) && 'text-primary'
                        )}
                      >
                        {t(link.labelKey)}
                      </Link>
                    </NavigationMenuLink>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Language Switcher */}
          <div className="relative hidden sm:block">
            <motion.button
              onClick={() => setLangDropdown(!langDropdown)}
              className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Changer de langue"
            >
              <Globe className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">{language.toUpperCase()}</span>
              <ChevronDown className="w-3 h-3 text-muted-foreground" />
            </motion.button>
            
            <AnimatePresence>
              {langDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 5 }}
                  className="absolute top-full right-0 mt-1 bg-card border border-border rounded-md shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => {
                      setLanguage('fr')
                      setLangDropdown(false)
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm hover:bg-primary/10",
                      language === 'fr' && "bg-primary/5"
                    )}
                  >
                    🇫🇷 Français
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en')
                      setLangDropdown(false)
                    }}
                    className={cn(
                      "block w-full px-4 py-2 text-left text-sm hover:bg-primary/10",
                      language === 'en' && "bg-primary/5"
                    )}
                  >
                    🇬🇧 English
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle */}
          {mounted && (
            <motion.button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-muted/50 transition-colors"
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.95 }}
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              <AnimatePresence mode="wait">
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun className="w-5 h-5 text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon className="w-5 h-5 text-primary" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          )}

          {/* CTA Button - Desktop */}
          <motion.div
            className="hidden md:block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button asChild className="font-semibold">
              <Link href="/activities">
                <Anchor className="w-4 h-4 mr-2" />
                {t('nav.reserve')}
              </Link>
            </Button>
          </motion.div>

          {/* Mobile Menu */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Menu">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] glass-card overflow-y-auto">
              <VisuallyHidden>
                <SheetTitle>Menu de navigation</SheetTitle>
                <SheetDescription>Naviguez vers les différentes sections du site</SheetDescription>
              </VisuallyHidden>
              <div className="flex flex-col h-full pt-8 pb-4">
                {/* Mobile Logo */}
                <div className="flex items-center gap-2 mb-8">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/aquaventure-logo.png"
                      alt="AquaVenture"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="font-montserrat font-bold text-xl">
                    Aqua<span className="text-primary">Venture</span>
                  </span>
                </div>

                {/* Mobile Nav Links with Accordions */}
                <nav className="flex-1">
                  <Accordion type="single" collapsible className="w-full space-y-1">
                    {/* Home Link */}
                    <Link
                      href="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-lg',
                        'text-foreground hover:bg-primary/10 hover:text-primary',
                        'transition-colors duration-200 font-inter font-medium',
                        isActive('/') && 'bg-primary/10 text-primary'
                      )}
                    >
                      <span className="text-lg">🏠</span>
                      {t('nav.home')}
                    </Link>

                    {/* Activities Accordion */}
                    <AccordionItem value="activities" className="border-none">
                      <AccordionTrigger
                        className={cn(
                          'px-4 py-3 rounded-lg hover:bg-primary/10 no-underline',
                          'font-inter font-medium hover:no-underline',
                          isActive('/activities') && 'text-primary'
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-lg">🚤</span>
                          {t('nav.activities')}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 pl-8 pt-1">
                        <div className="space-y-1">
                          {activitiesMenu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <span>{item.icon}</span>
                              {item.title}
                            </Link>
                          ))}
                          <Link
                            href="/activities"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Waves className="w-4 h-4" />
                            {language === 'fr' ? 'Toutes les activités' : 'All activities'}
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Experiences Accordion */}
                    <AccordionItem value="experiences" className="border-none">
                      <AccordionTrigger
                        className={cn(
                          'px-4 py-3 rounded-lg hover:bg-primary/10 no-underline',
                          'font-inter font-medium hover:no-underline',
                          isActive('/experiences') && 'text-primary'
                        )}
                      >
                        <span className="flex items-center gap-3">
                          <span className="text-lg">🏝️</span>
                          {t('nav.experiences')}
                        </span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-0 pl-8 pt-1">
                        <div className="space-y-1">
                          {experiencesMenu.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                            >
                              <span>{item.icon}</span>
                              {item.title}
                            </Link>
                          ))}
                          <Link
                            href="/experiences"
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-semibold text-primary hover:bg-primary/10 transition-colors"
                          >
                            <Compass className="w-4 h-4" />
                            {language === 'fr' ? 'Toutes les expériences' : 'All experiences'}
                          </Link>
                        </div>
                      </AccordionContent>
                    </AccordionItem>

                    {/* Simple Links */}
                    {[
                      { href: '/about', labelKey: 'nav.about', icon: 'ℹ️' },
                      { href: '/blog', labelKey: 'nav.blog', icon: '📰' },
                      { href: '/contact', labelKey: 'nav.contact', icon: '📞' },
                    ].map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={cn(
                          'flex items-center gap-3 px-4 py-3 rounded-lg',
                          'text-foreground hover:bg-primary/10 hover:text-primary',
                          'transition-colors duration-200 font-inter font-medium',
                          isActive(link.href) && 'bg-primary/10 text-primary'
                        )}
                      >
                        <span className="text-lg">{link.icon}</span>
                        {t(link.labelKey)}
                      </Link>
                    ))}
                  </Accordion>
                </nav>

                {/* Mobile Actions */}
                <div className="mt-4 space-y-4 border-t border-border pt-4">
                  {/* Language */}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Langue' : 'Language'}</span>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => setLanguage('fr')}
                        className={cn(
                          "px-2 py-1 text-sm rounded",
                          language === 'fr' ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        FR
                      </button>
                      <button 
                        onClick={() => setLanguage('en')}
                        className={cn(
                          "px-2 py-1 text-sm rounded",
                          language === 'en' ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted"
                        )}
                      >
                        EN
                      </button>
                    </div>
                  </div>
                  
                  {/* Theme */}
                  <div className="flex items-center justify-between px-4 py-3 bg-muted/30 rounded-lg">
                    <span className="text-sm text-muted-foreground">{language === 'fr' ? 'Thème' : 'Theme'}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleTheme}
                      className="gap-2"
                    >
                      {mounted && theme === 'dark' ? (
                        <>
                          <Sun className="w-4 h-4" />
                          {language === 'fr' ? 'Clair' : 'Light'}
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4" />
                          {language === 'fr' ? 'Sombre' : 'Dark'}
                        </>
                      )}
                    </Button>
                  </div>
                  
                  <Button asChild className="w-full">
                    <Link href="/activities" onClick={() => setIsMobileMenuOpen(false)}>
                      <Anchor className="w-4 h-4 mr-2" />
                      {language === 'fr' ? 'Réserver maintenant' : 'Book now'}
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </motion.header>
  )
}

export default Header
