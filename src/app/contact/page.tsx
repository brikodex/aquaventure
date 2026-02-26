'use client'

/**
 * AquaVenture - Contact Page
 * Hero, contact form, contact info, WhatsApp button, office hours, social media
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Facebook,
  Instagram,
  Twitter,
  Globe,
  Check,
  ChevronRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ScrollReveal, GlassCard } from '@/components/animations/AnimatedComponents'

// ============================================
// DATA
// ============================================

const contactInfo = [
  {
    icon: MapPin,
    title: 'Adresse',
    details: ['Plage de l\'Île aux Nattes', 'Sainte-Marie, Madagascar', '515000'],
  },
  {
    icon: Phone,
    title: 'Téléphone',
    details: ['+261 32 123 456', '+261 34 987 654'],
    href: 'tel:+26132123456',
  },
  {
    icon: Mail,
    title: 'Email',
    details: ['contact@aquaventure.mg', 'reservation@aquaventure.mg'],
    href: 'mailto:contact@aquaventure.mg',
  },
  {
    icon: Clock,
    title: 'Horaires',
    details: ['Lun - Sam: 7h - 18h', 'Dimanche: 8h - 12h'],
  },
]

const subjects = [
  { value: 'reservation', label: 'Réservation' },
  { value: 'information', label: 'Demande d\'information' },
  { value: 'groupe', label: 'Groupe / Événement' },
  { value: 'partenariat', label: 'Partenariat' },
  { value: 'autre', label: 'Autre' },
]

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/aquaventure', label: 'Facebook' },
  { icon: Instagram, href: 'https://instagram.com/aquaventure', label: 'Instagram' },
  { icon: Twitter, href: 'https://twitter.com/aquaventure', label: 'Twitter' },
]

// ============================================
// CONTACT PAGE COMPONENT
// ============================================

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [isNewsletterSubscribed, setIsNewsletterSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate form submission
    setIsSubmitted(true)
    setTimeout(() => setIsSubmitted(false), 5000)
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsNewsletterSubscribed(true)
    setTimeout(() => setIsNewsletterSubscribed(false), 5000)
    setNewsletterEmail('')
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
            alt="Contactez-nous"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <div className="relative z-10 container-wide text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <Badge className="bg-primary/20 text-primary-light border-primary/30 px-4 py-2">
              <Mail className="w-4 h-4 mr-2" />
              Contact
            </Badge>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              Contactez-nous
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Notre équipe est à votre disposition pour répondre à toutes vos questions
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <ScrollReveal>
              <GlassCard className="p-8">
                <h2 className="font-montserrat font-bold text-2xl text-foreground mb-6">
                  Envoyez-nous un message
                </h2>

                {isSubmitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-nature/20 flex items-center justify-center mx-auto mb-4">
                      <Check className="w-8 h-8 text-nature" />
                    </div>
                    <h3 className="font-montserrat font-bold text-xl text-foreground mb-2">
                      Message envoyé !
                    </h3>
                    <p className="text-muted-foreground">
                      Nous vous répondrons dans les plus brefs délais.
                    </p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Nom complet *</Label>
                        <Input
                          id="name"
                          placeholder="Votre nom"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="votre@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="phone">Téléphone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+261 32 123 456"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="subject">Sujet *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(v) => setFormData({ ...formData, subject: v })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionner un sujet" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject.value} value={subject.value}>
                                {subject.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        placeholder="Comment pouvons-nous vous aider ?"
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                    >
                      <Send className="w-5 h-5 mr-2" />
                      Envoyer le message
                    </Button>
                  </form>
                )}
              </GlassCard>
            </ScrollReveal>

            {/* Contact Info */}
            <div className="space-y-6">
              {/* Info Cards */}
              <ScrollReveal>
                <div className="grid gap-4">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="border-border/50 hover:border-primary/30 transition-colors">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <info.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-montserrat font-semibold text-foreground mb-1">
                            {info.title}
                          </h3>
                          {info.details.map((detail, i) => (
                            <p key={i} className="text-muted-foreground text-sm">
                              {detail}
                            </p>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>

              {/* Map Placeholder */}
              <ScrollReveal>
                <Card className="border-border/50 overflow-hidden">
                  <div className="relative h-64">
                    <Image
                      src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                      alt="Carte Sainte-Marie"
                      fill
                      className="object-cover"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <MapPin className="w-5 h-5" />
                      <span className="font-medium">Sainte-Marie, Madagascar</span>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>

              {/* Social Media */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardContent className="p-5">
                    <h3 className="font-montserrat font-semibold text-foreground mb-4">
                      Suivez-nous
                    </h3>
                    <div className="flex gap-3">
                      {socialLinks.map((social, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="icon"
                          asChild
                        >
                          <a
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.label}
                          >
                            <social.icon className="w-5 h-5" />
                          </a>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Newsletter */}
              <ScrollReveal>
                <Card className="border-border/50 bg-primary/5">
                  <CardContent className="p-5">
                    <h3 className="font-montserrat font-semibold text-foreground mb-2">
                      Newsletter
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Recevez nos offres exclusives et actualités
                    </p>
                    {isNewsletterSubscribed ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-nature"
                      >
                        <Check className="w-5 h-5" />
                        <span className="font-medium">Merci pour votre inscription !</span>
                      </motion.div>
                    ) : (
                      <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Votre email"
                          value={newsletterEmail}
                          onChange={(e) => setNewsletterEmail(e.target.value)}
                          required
                          className="flex-1"
                        />
                        <Button type="submit" className="bg-primary hover:bg-primary/90">
                          <Send className="w-4 h-4" />
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp Floating Button */}
      <motion.a
        href="https://wa.me/26132123456"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 bg-[#25D366] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="font-medium hidden sm:inline">WhatsApp</span>
      </motion.a>
    </div>
  )
}
