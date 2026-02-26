'use client'

/**
 * AquaVenture - Eco Experiences Page
 * Hero, three featured eco experiences, detailed cards
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Leaf,
  Clock,
  Users,
  Star,
  MapPin,
  Fish,
  Ship,
  Sailboat,
  ArrowRight,
  Calendar,
  Check,
  Anchor,
} from 'lucide-react'  // Whale icon not available; using Sailboat for marine theme
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal, GlassCard, CountUp } from '@/components/animations/AnimatedComponents'

// ============================================
// DATA
// ============================================

const ecoExperiences = [
  {
    id: 1,
    slug: 'excursions',
    title: 'Excursions Îles aux Nattes',
    subtitle: 'Journée complète d\'exploration',
    description: 'Une journée inoubliable à la découverte des trésors de Sainte-Marie ! Navigation vers l\'Île aux Nattes pour un déjeuner de fruits de mer frais, baignade dans des criques paradisiaques, et snorkeling sur des récifs coralliens préservés avec notre guide naturaliste.',
    image: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800',
    duration: '8h',
    price: 95,
    maxParticipants: 12,
    minAge: 6,
    rating: 4.9,
    reviewCount: 287,
    location: 'Port de Sainte-Marie',
    highlights: [
      'Navigation pittoresque vers l\'Île aux Nattes',
      'Déjeuner fruits de mer sur la plage',
      'Snorkeling sur récifs coralliens',
      'Observation des baleines (saison)',
      'Guide naturaliste francophone',
    ],
    included: ['Transport bateau', 'Guide naturaliste', 'Déjeuner fruits de mer', 'Équipement snorkeling', 'Boissons'],
    schedule: 'Départ 7h00 - Retour 15h00',
    season: 'Toute l\'année',
  },
  {
    id: 2,
    slug: 'baleines',
    title: 'Observation des Baleines',
    subtitle: 'Spectacle naturel unique',
    description: 'Vivez une expérience émotionnelle unique en observant les baleines à bosse dans leur habitat naturel. De juillet à septembre, ces géants des mers migrent vers les eaux chaudes de Sainte-Marie pour mettre bas et élever leurs petits.',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800',
    duration: '3h',
    price: 75,
    maxParticipants: 10,
    minAge: 5,
    rating: 4.9,
    reviewCount: 156,
    location: 'Côte Est de Sainte-Marie',
    highlights: [
      'Observation respectueuse des baleines',
      'Approche éthique et respectueuse',
      'Commentaires naturaliste expert',
      'Photos souvenirs offertes',
      'Contribution aux programmes de recherche',
    ],
    included: ['Sortie bateau', 'Guide naturaliste', 'Jumelles prêtées', 'Photos souvenirs', 'Collation'],
    schedule: 'Départs 7h00 et 14h00',
    season: 'Juillet à Septembre',
  },
  {
    id: 3,
    slug: 'snorkeling',
    title: 'Snorkeling Récifs Coralliens',
    subtitle: 'Exploration sous-marine éco-responsable',
    description: 'Explorez les fonds marins exceptionnels de Sainte-Marie ! Découvrez une biodiversité marine incroyable : poissons tropicaux colorés, coraux, tortues marines et peut-être même des dauphins. Notre approche respectueuse garantit la préservation de cet écosystème fragile.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800',
    duration: '3h',
    price: 45,
    maxParticipants: 8,
    minAge: 8,
    rating: 4.8,
    reviewCount: 203,
    location: 'Récifs de l\'Île aux Nattes',
    highlights: [
      'Découverte de la biodiversité marine',
      'Encadrement par guide naturaliste',
      'Équipement éco-responsable fourni',
      'Initiation aux gestes de préservation',
      'Possibilité de voir des tortues',
    ],
    included: ['Équipement complet', 'Guide naturaliste', 'Combinaison légère', 'Goûter local', 'Photos sous-marines'],
    schedule: 'Départs 8h00, 11h00, 14h00',
    season: 'Toute l\'année',
  },
]

const impactStats = [
  { value: 2000, suffix: '€', label: 'Donnés aux associations locales', icon: Leaf },
  { value: 500, suffix: '+', label: 'Observations de baleines', icon: Sailboat },
  { value: 100, suffix: '%', label: 'Pratiques éco-certifiées', icon: Fish },
  { value: 50, suffix: '+', label: 'Familles locales soutenues', icon: Users },
]

// ============================================
// EXPERIENCES PAGE COMPONENT
// ============================================

export default function ExperiencesPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=1920"
            alt="Expériences écoresponsables"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-background" />
        </div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-20 right-20 w-40 h-40 bg-nature/20 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-60 h-60 bg-primary/20 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        <div className="relative z-10 container-wide text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <Badge className="bg-nature/30 text-white border-nature/50 px-4 py-2">
              <Leaf className="w-4 h-4 mr-2" />
              Écotourisme
            </Badge>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              Expériences Écoresponsables
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Des aventures uniques qui respectent l'environnement et soutiennent les communautés locales de Sainte-Marie
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-nature hover:bg-nature/90 text-white">
                <Link href="#experiences">
                  Découvrir les expériences
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                <Link href="/about">
                  Notre engagement
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-nature text-white">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {impactStats.map((stat, index) => (
              <div key={index} className="space-y-2">
                <stat.icon className="w-8 h-8 mx-auto mb-2 text-white/80" />
                <div className="font-montserrat font-bold text-3xl md:text-4xl">
                  <CountUp end={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-white/70 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiences Section */}
      <section id="experiences" className="section-padding bg-background">
        <div className="container-wide">
          <ScrollReveal className="text-center mb-16">
            <Badge className="bg-primary/10 text-primary mb-4">
              <Leaf className="w-4 h-4 mr-2" />
              Nos Expériences
            </Badge>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl text-foreground mb-4">
              Trois aventures inoubliables
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Chaque expérience est conçue pour minimiser notre impact environnemental tout en maximisant votre plaisir
            </p>
          </ScrollReveal>

          <div className="space-y-16">
            {ecoExperiences.map((experience, index) => (
              <ScrollReveal key={experience.id}>
                <ExperienceCard experience={experience} index={index} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920"
            alt="Ocean"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-r from-nature/90 to-primary/80" />
        </div>

        <div className="container-wide relative z-10 text-center text-white">
          <ScrollReveal className="space-y-6">
            <Badge className="bg-white/20 text-white border-white/30">
              <Leaf className="w-4 h-4 mr-2" />
              Engagement Éco
            </Badge>
            <h2 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl">
              Ensemble, préservons l'océan
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto">
              20% de nos bénéfices sont reversés aux programmes de protection marine et aux familles locales
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-nature hover:bg-white/90 font-semibold"
              >
                <Link href="/contact">
                  Réserver une expérience
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Link href="/about">En savoir plus</Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}

// ============================================
// EXPERIENCE CARD COMPONENT
// ============================================

function ExperienceCard({ experience, index }: { experience: typeof ecoExperiences[0]; index: number }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-border/50 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
        <div className={cn(
          'grid md:grid-cols-2',
          !isEven && 'md:flex-row-reverse'
        )}>
          {/* Image */}
          <div className={cn('relative h-72 md:h-auto', !isEven && 'md:order-2')}>
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/50 to-transparent" />
            
            {/* Price Badge */}
            <div className="absolute top-4 left-4">
              <div className="glass-card px-4 py-2 rounded-lg">
                <span className="text-white font-montserrat font-bold text-2xl">
                  {experience.price}€
                </span>
                <span className="text-white/70 text-sm">/pers</span>
              </div>
            </div>

            {/* Season Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge className="bg-nature/90 text-white border-0">
                <Calendar className="w-3 h-3 mr-1" />
                {experience.season}
              </Badge>
            </div>
          </div>

          {/* Content */}
          <CardContent className="p-6 md:p-8 space-y-4">
            <div>
              <p className="text-primary font-medium text-sm mb-1">{experience.subtitle}</p>
              <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground">
                {experience.title}
              </h3>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {experience.description}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-primary" />
                <span>{experience.duration}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-primary" />
                <span>Max {experience.maxParticipants} pers</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 text-sand fill-sand" />
                <span className="font-medium text-foreground">{experience.rating}</span>
                <span className="text-xs">({experience.reviewCount} avis)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span>{experience.location}</span>
              </div>
            </div>

            {/* Highlights */}
            <div className="space-y-2">
              <h4 className="font-montserrat font-semibold text-foreground">Points forts</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {experience.highlights.slice(0, 4).map((highlight, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="w-4 h-4 text-nature mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Schedule */}
            <div className="flex items-center gap-2 text-sm">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">{experience.schedule}</span>
            </div>

            {/* CTA */}
            <div className="flex gap-3 pt-2">
              <Button asChild className="bg-primary hover:bg-primary/90 text-white">
                <Link href={`/contact?experience=${experience.slug}`}>
                  <Anchor className="w-4 h-4 mr-2" />
                  Réserver
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href={`/activities/${experience.slug}`}>
                  Plus d'infos
                </Link>
              </Button>
            </div>
          </CardContent>
        </div>
      </Card>
    </motion.div>
  )
}
