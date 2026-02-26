'use client'

/**
 * AquaVenture - Experience Detail Page
 * Dynamic page for eco-experiences (excursions, baleines, snorkeling)
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Clock,
  Users,
  Star,
  Leaf,
  MapPin,
  Check,
  Calendar,
  Heart,
  Share2,
  ArrowRight,
  Anchor,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal, GlassCard } from '@/components/animations/AnimatedComponents'

// ============================================
// EXPERIENCES DATA
// ============================================

const experiencesData: Record<string, {
  title: string
  subtitle: string
  description: string
  image: string
  duration: string
  price: number
  maxParticipants: number
  minAge: number
  rating: number
  reviewCount: number
  location: string
  highlights: string[]
  included: string[]
  schedule: string
  season: string
}> = {
  excursions: {
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
  baleines: {
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
  snorkeling: {
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
}

// ============================================
// EXPERIENCE DETAIL PAGE
// ============================================

export default function ExperienceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const experience = experiencesData[slug]
  const [isLiked, setIsLiked] = useState(false)

  if (!experience) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-foreground mb-4">
            Expérience non trouvée
          </h1>
          <p className="text-muted-foreground mb-6">
            Cette expérience n'existe pas ou a été supprimée.
          </p>
          <Button asChild>
            <Link href="/experiences">Voir toutes les expériences</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="outline"
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
            asChild
          >
            <Link href="/experiences">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour
            </Link>
          </Button>
        </div>

        {/* Actions */}
        <div className="absolute top-6 right-6 z-10 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
            onClick={() => setIsLiked(!isLiked)}
          >
            <Heart className={cn('w-5 h-5', isLiked && 'fill-red-500 text-red-500')} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
          >
            <Share2 className="w-5 h-5" />
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-nature/90 text-white border-0 gap-1">
                  <Leaf className="w-3 h-3" />
                  Écoresponsable
                </Badge>
                <Badge className="bg-primary/90 text-white border-0">
                  <Calendar className="w-3 h-3 mr-1" />
                  {experience.season}
                </Badge>
              </div>
              <h1 className="font-montserrat font-bold text-3xl md:text-5xl text-white">
                {experience.title}
              </h1>
              <p className="text-white/80 text-lg">{experience.subtitle}</p>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-semibold">{experience.rating}</span>
                  <span className="text-sm">({experience.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{experience.location}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Clock, label: 'Durée', value: experience.duration },
                    { icon: Users, label: 'Participants', value: `Max ${experience.maxParticipants}` },
                    { icon: Calendar, label: 'Saison', value: experience.season },
                    { icon: Leaf, label: 'Prix', value: `${experience.price}€/pers` },
                  ].map((item, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-4 text-center">
                        <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-montserrat font-bold text-foreground">{item.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h2 className="font-montserrat font-bold text-xl text-foreground mb-4">
                      Description
                    </h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {experience.description}
                    </p>
                    <div className="mt-4 p-4 rounded-lg bg-nature/10 border border-nature/20">
                      <div className="flex items-center gap-2">
                        <Leaf className="w-5 h-5 text-nature" />
                        <span className="font-semibold text-nature">Engagement écoresponsable</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">
                        Cette activité respecte l'écosystème marin et soutient les communautés locales de Sainte-Marie.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Highlights */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h2 className="font-montserrat font-bold text-xl text-foreground mb-4">
                      Points forts
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {experience.highlights.map((highlight, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="w-5 h-5 rounded-full bg-nature/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3 h-3 text-nature" />
                          </div>
                          <span className="text-muted-foreground">{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Included */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardContent className="p-6">
                    <h2 className="font-montserrat font-bold text-xl text-foreground mb-4">
                      Ce qui est inclus
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {experience.included.map((item, index) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Right Column - Booking */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ScrollReveal>
                  <GlassCard className="p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-montserrat font-bold text-xl text-foreground">
                        Réserver
                      </h3>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">À partir de</p>
                        <p className="font-montserrat font-bold text-2xl text-primary">
                          {experience.price}€
                        </p>
                        <p className="text-xs text-muted-foreground">par personne</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{experience.schedule}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>{experience.location}</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="w-4 h-4 text-primary" />
                        <span>Max {experience.maxParticipants} participants</span>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{experience.season}</span>
                      </div>
                    </div>

                    <Button asChild className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6">
                      <Link href={`/contact?experience=${slug}`}>
                        <Anchor className="w-5 h-5 mr-2" />
                        Réserver maintenant
                      </Link>
                    </Button>

                    <p className="text-xs text-center text-muted-foreground">
                      Paiement sécurisé • Annulation gratuite 24h avant
                    </p>
                  </GlassCard>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Experiences */}
      <section className="section-padding bg-muted/30">
        <div className="container-wide">
          <ScrollReveal className="text-center mb-12">
            <h2 className="font-montserrat font-bold text-2xl text-foreground mb-2">
              Autres expériences
            </h2>
            <p className="text-muted-foreground">
              Découvrez nos autres expériences écoresponsables
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(experiencesData)
              .filter(([key]) => key !== slug)
              .map(([key, exp]) => (
                <ScrollReveal key={key}>
                  <Link href={`/experiences/${key}`} className="block group">
                    <Card className="border-border/50 overflow-hidden hover:shadow-xl transition-all">
                      <div className="flex">
                        <div className="relative w-32 h-32 flex-shrink-0">
                          <Image
                            src={exp.image}
                            alt={exp.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                        <CardContent className="p-4 flex-1">
                          <h3 className="font-montserrat font-bold text-foreground group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                            {exp.subtitle}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-sm">
                            <span className="text-primary font-bold">{exp.price}€</span>
                            <span className="text-muted-foreground">{exp.duration}</span>
                          </div>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
          </div>

          <ScrollReveal className="text-center mt-8">
            <Button asChild variant="outline">
              <Link href="/experiences">
                Voir toutes les expériences
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
