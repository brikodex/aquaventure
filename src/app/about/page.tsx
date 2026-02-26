'use client'

/**
 * AquaVenture - About Page
 * Hero with parallax, mission, timeline, team, partners, stats, impact
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Leaf,
  Heart,
  Shield,
  Users,
  Fish,
  Waves,
  Anchor,
  MapPin,
  Award,
  Target,
  Globe,
  ArrowRight,
  Check,
  Star,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal, GlassCard, CountUp } from '@/components/animations/AnimatedComponents'

// ============================================
// DATA
// ============================================

const timelineEvents = [
  {
    year: '2019',
    title: 'Création',
    description: 'Fondation d\'AquaVenture avec une vision de tourisme nautique responsable à Sainte-Marie.',
  },
  {
    year: '2020',
    title: 'Premiers partenariats',
    description: 'Collaboration avec 20 familles de pêcheurs locaux et lancement des activités éco-responsables.',
  },
  {
    year: '2021',
    title: 'Certification éco',
    description: 'Obtention de la certification "Tourisme Durable Madagascar" pour nos pratiques responsables.',
  },
  {
    year: '2022',
    title: 'Expansion',
    description: 'Ouverture de nouvelles activités : snorkeling, observation des baleines, wakeboard.',
  },
  {
    year: '2023',
    title: '5000+ clients',
    description: 'Plus de 5000 clients satisfaits et 50+ pêcheurs partenaires dans notre réseau.',
  },
  {
    year: '2025',
    title: 'Vision future',
    description: 'Développement de notre centre éco-touristique et programmes éducatifs pour la jeunesse locale.',
  },
]

const teamMembers = [
  {
    name: 'Jean-Baptiste Ramanantsoa',
    role: 'Fondateur & Directeur',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    bio: 'Passionné par l\'océan et les traditions malgaches, il a créé AquaVenture pour partager sa vision d\'un tourisme responsable.',
  },
  {
    name: 'Marie Andrianarisoa',
    role: 'Responsable Expériences',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
    bio: 'Naturaliste diplômée, elle conçoit des activités qui allient découverte et respect de l\'environnement.',
  },
  {
    name: 'Hery Rakotondrabe',
    role: 'Chef Moniteur',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    bio: 'Champion de jet-ski, il encadre nos activités nautiques avec passion et professionnalisme depuis 2019.',
  },
  {
    name: 'Noro Rasoarimanana',
    role: 'Community Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
    bio: 'Elle fait le lien entre AquaVenture et notre communauté, tant locale qu\'internationale.',
  },
]

const stats = [
  { value: 5000, suffix: '+', label: 'Clients satisfaits', icon: Users },
  { value: 6, suffix: '', label: 'Activités', icon: Waves },
  { value: 50, suffix: '+', label: 'Pêcheurs partenaires', icon: Fish },
  { value: 4.9, suffix: '/5', label: 'Note moyenne', icon: Star },
]

const ecoPractices = [
  {
    icon: Leaf,
    title: 'Équipements durables',
    description: 'Utilisation de matériels respectueux de l\'environnement, moteurs 4 temps basse émission.',
  },
  {
    icon: Fish,
    title: 'Pêche responsable',
    description: 'Partenariats équitables avec les pêcheurs locaux, techniques traditionnelles respectueuses.',
  },
  {
    icon: Heart,
    title: 'Impact positif',
    description: '20% des bénéfices reversés aux associations locales de protection marine.',
  },
  {
    icon: Users,
    title: 'Communauté locale',
    description: 'Emploi prioritaire des habitants de Sainte-Marie, formation continue.',
  },
]

const partners = [
  { name: 'Office du Tourisme Madagascar', logo: '/partners/tourism-madagascar.png' },
  { name: 'Parc Marin', logo: '/partners/parc-marin.png' },
  { name: 'WWF Madagascar', logo: '/partners/wwf.png' },
  { name: 'Conservation International', logo: '/partners/ci.png' },
]

// ============================================
// ABOUT PAGE COMPONENT
// ============================================

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
            alt="Sainte-Marie, Madagascar"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        {/* Parallax Elements */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"
          animate={{ y: [0, 30, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />

        <div className="relative z-10 container-wide text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="bg-primary/20 text-primary-light border-primary/30 px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              Notre Histoire
            </Badge>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              À Propos d'AquaVenture
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Des aventures nautiques qui respectent l'océan et soutiennent les communautés locales
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <Badge className="bg-nature/10 text-nature">
                  <Target className="w-4 h-4 mr-2" />
                  Notre Mission
                </Badge>
                <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground">
                  Notre Engagement Écoresponsable
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  AquaVenture est né d'une conviction profonde : le tourisme peut être une force positive.
                  Nous croyons que chaque excursion peut contribuer à préserver l'écosystème marin exceptionnel
                  de Sainte-Marie tout en valorisant les savoir-faire locaux.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Notre mission est de créer des expériences inoubliables qui laissent une empreinte positive
                  sur l'environnement et sur la vie des habitants de notre île. Chaque activité est conçue
                  pour minimiser notre impact écologique tout en maximisant l'impact social et économique
                  pour la communauté locale.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-primary hover:bg-primary/90">
                    <Link href="/activities">
                      Découvrir nos activités
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                  <Button variant="outline" asChild>
                    <Link href="/contact">Nous contacter</Link>
                  </Button>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800"
                    alt="Notre équipe"
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 glass-card p-4 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-nature/20 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-nature" />
                    </div>
                    <div>
                      <p className="font-montserrat font-bold text-foreground">100%</p>
                      <p className="text-sm text-muted-foreground">Écoresponsable</p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              <Award className="w-4 h-4 mr-2" />
              Notre Parcours
            </Badge>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              L'Histoire d'AquaVenture
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              De notre création à aujourd'hui, une aventure humaine au service du tourisme responsable
            </p>
          </ScrollReveal>

          {/* Timeline */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/30 hidden md:block" />

            {timelineEvents.map((event, index) => (
              <ScrollReveal key={index}>
                <div
                  className={cn(
                    'relative grid md:grid-cols-2 gap-8 mb-12',
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  )}
                >
                  {/* Content */}
                  <div
                    className={cn(
                      'space-y-3',
                      index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'
                    )}
                  >
                    <Badge className="bg-primary text-white">{event.year}</Badge>
                    <h3 className="font-montserrat font-bold text-xl text-foreground">
                      {event.title}
                    </h3>
                    <p className="text-muted-foreground">{event.description}</p>
                  </div>

                  {/* Center Dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex">
                    <div className="w-4 h-4 rounded-full bg-primary ring-4 ring-primary/20" />
                  </div>

                  {/* Empty column for grid layout */}
                  <div className="hidden md:block" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-primary text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <ScrollReveal key={index}>
                <div className="space-y-2">
                  <stat.icon className="w-10 h-10 mx-auto mb-3 text-white/80" />
                  <div className="font-montserrat font-bold text-4xl md:text-5xl">
                    <CountUp end={stat.value} decimals={stat.value % 1 !== 0 ? 1 : 0} />
                    {stat.suffix}
                  </div>
                  <div className="text-white/70">{stat.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-secondary/10 text-secondary mb-4">
              <Users className="w-4 h-4 mr-2" />
              Notre Équipe
            </Badge>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Les Visages d'AquaVenture
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Une équipe passionnée, locale et engagée pour vous offrir des expériences uniques
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <ScrollReveal key={index}>
                <motion.div
                  className="group text-center"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative w-40 h-40 mx-auto mb-4 rounded-full overflow-hidden ring-4 ring-primary/20 group-hover:ring-primary transition-all duration-300">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-primary font-medium text-sm mb-2">{member.role}</p>
                  <p className="text-muted-foreground text-sm">{member.bio}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-nature/10 text-nature mb-4">
              <Globe className="w-4 h-4 mr-2" />
              Notre Impact
            </Badge>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Pratiques Écoresponsables
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Chaque aspect de nos activités est pensé pour minimiser notre impact environnemental
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoPractices.map((practice, index) => (
              <ScrollReveal key={index}>
                <GlassCard className="p-6 h-full hover:border-primary/30 transition-colors">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <practice.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-montserrat font-bold text-lg text-foreground mb-2">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">{practice.description}</p>
                </GlassCard>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary mb-4">
              <Shield className="w-4 h-4 mr-2" />
              Nos Partenaires
            </Badge>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground">
              Ils nous font confiance
            </h2>
          </ScrollReveal>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <ScrollReveal key={index}>
                <div className="w-32 h-16 rounded-lg bg-muted/50 flex items-center justify-center p-4 hover:bg-muted transition-colors">
                  <span className="font-montserrat font-semibold text-muted-foreground text-sm text-center">
                    {partner.name}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
            alt="Ocean"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80" />
        </div>

        <div className="container-wide relative z-10 text-center text-white">
          <ScrollReveal className="space-y-6">
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl">
              Prêt à vivre l'aventure ?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto">
              Rejoignez-nous pour des expériences nautiques inoubliables qui respectent l'environnement
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold"
              >
                <Link href="/activities">
                  Voir nos activités
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/contact">Nous contacter</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
