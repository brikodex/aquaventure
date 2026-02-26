'use client'

/**
 * AquaVenture - Footer Component
 * Comprehensive footer with company info, links, newsletter, and social media
 */

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Anchor, 
  Waves, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Instagram, 
  Twitter,
  Leaf,
  Send,
  Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// ============================================
// TYPES & DATA
// ============================================

const quickLinks = [
  { label: 'Activités', href: '/activities' },
  { label: 'Expériences éco', href: '/experiences' },
  { label: 'À propos', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
]

const activities = [
  { label: 'Jet Ski', href: '/activities/jet-ski' },
  { label: 'Stand-Up Paddle', href: '/activities/stand-up-paddle' },
  { label: 'Bouée Tractée', href: '/activities/bouee-tractee' },
  { label: 'Wakeboard', href: '/activities/wakeboard' },
  { label: 'Pêche Durable', href: '/activities/peche-durable' },
  { label: 'Excursions', href: '/activities/excursion-iles' },
]

const socialLinks = [
  { label: 'Facebook', href: 'https://facebook.com', icon: Facebook },
  { label: 'Instagram', href: 'https://instagram.com', icon: Instagram },
  { label: 'Twitter', href: 'https://twitter.com', icon: Twitter },
]

// ============================================
// FOOTER COMPONENT
// ============================================

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      // Simulate API call
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <footer className="relative bg-gradient-to-b from-background to-muted/30 border-t border-border">
      {/* Decorative Wave */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-accent" />
      
      <motion.div
        className="container-wide py-16 md:py-20"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand Column */}
          <motion.div variants={itemVariants} className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-14 h-14">
                <Image
                  src="/aquaventure-logo.png"
                  alt="AquaVenture"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <span className="font-montserrat font-bold text-xl">
                  Aqua<span className="text-primary">Venture</span>
                </span>
                <p className="text-xs text-muted-foreground">Sainte-Marie, Madagascar</p>
              </div>
            </Link>
            
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              Votre partenaire pour des aventures nautiques inoubliables et écoresponsables 
              à Sainte-Marie, Madagascar.
            </p>
            
            {/* Eco Badge */}
            <div className="flex items-center gap-2 px-4 py-2 bg-nature/10 rounded-full w-fit">
              <Leaf className="w-4 h-4 text-nature" />
              <span className="text-sm font-medium text-nature">Tourisme durable certifié</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Liens rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-muted-foreground hover:text-primary transition-colors',
                      'flex items-center gap-2 group'
                    )}
                  >
                    <Waves className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Activities */}
          <motion.div variants={itemVariants}>
            <h3 className="font-montserrat font-semibold text-lg mb-6">Nos activités</h3>
            <ul className="space-y-3">
              {activities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      'text-muted-foreground hover:text-primary transition-colors',
                      'flex items-center gap-2 group'
                    )}
                  >
                    <Anchor className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact & Newsletter */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div>
              <h3 className="font-montserrat font-semibold text-lg mb-4">Contact</h3>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>Sainte-Marie, Madagascar</span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="tel:+26132123456" className="hover:text-primary transition-colors">
                    +261 32 123 456
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0" />
                  <a href="mailto:contact@aquaventure.mg" className="hover:text-primary transition-colors">
                    contact@aquaventure.mg
                  </a>
                </li>
              </ul>
            </div>

            {/* Newsletter */}
            <div>
              <h3 className="font-montserrat font-semibold text-lg mb-4">Newsletter</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Recevez nos offres exclusives et actualités
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  size="icon"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
              {isSubscribed && (
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-sm text-nature mt-2"
                >
                  Merci pour votre inscription !
                </motion.p>
              )}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemVariants}
          className="mt-16 pt-8 border-t border-border"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center',
                    'bg-muted/50 hover:bg-primary hover:text-white',
                    'transition-all duration-300'
                  )}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted-foreground text-center">
              © {new Date().getFullYear()} AquaVenture. Tous droits réservés.
            </p>

            {/* Made with love */}
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Fait avec <Heart className="w-4 h-4 text-red-500 fill-red-500" /> à Madagascar
            </p>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
