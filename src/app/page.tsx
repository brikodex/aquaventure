'use client'

/**
 * AquaVenture - Homepage
 * Clean, modern design with premium animations
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Leaf, Star, ArrowRight, MapPin, Waves, Users, Clock, Award, Globe, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PremiumActivityCard, PremiumFeaturedCard } from '@/components/ui/advanced-card'
import { ScrollReveal, ParticleBackground, CountUp, GradientTextAnimated, AuroraBackground } from '@/components/animations/AnimatedComponents'
import { getFeaturedActivities } from '@/data/activities'
import HeroCarousel from '@/components/sections/HeroCarousel'
import TestimonialSlider from '@/components/ui/TestimonialSlider'

// ============================================
// STATS DATA
// ============================================

const stats = [
  { icon: Users, value: 5000, suffix: '+', label: 'Clients satisfaits' },
  { icon: Award, value: 98, suffix: '%', label: 'Taux de satisfaction' },
  { icon: Globe, value: 15, suffix: '+', label: 'Activités uniques' },
  { icon: Shield, value: 100, suffix: '%', label: 'Sécurité garantie' },
]

// ============================================
// HOMEPAGE COMPONENT
// ============================================

export default function HomePage() {
  const featuredActivities = getFeaturedActivities()

  return (
    <div className="overflow-hidden">
      {/* HERO */}
      <HeroCarousel />

      {/* STATS BAR */}
      <section className="relative py-12 bg-primary text-white overflow-hidden">
        <AuroraBackground className="opacity-20" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 opacity-80" />
                <div className="font-montserrat font-bold text-3xl md:text-4xl">
                  <CountUp end={stat.value} duration={2} suffix={stat.suffix} />
                </div>
                <p className="text-white/80 text-sm mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ACTIVITIES */}
      <section className="py-20 md:py-28 bg-background relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-30" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <ScrollReveal className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Waves className="w-4 h-4 mr-2" />
              Nos Activités
            </Badge>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <GradientTextAnimated duration={4}>
                Expériences Phares
              </GradientTextAnimated>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Des aventures uniques au cœur de l'océan Indien, conçues pour vous offrir des souvenirs inoubliables
            </p>
          </ScrollReveal>

          {/* Featured */}
          <ScrollReveal className="mb-12">
            <PremiumFeaturedCard activity={featuredActivities[0]} />
          </ScrollReveal>

          {/* Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredActivities.slice(1).map((activity, index) => (
              <PremiumActivityCard key={activity.id} activity={activity} index={index} />
            ))}
          </div>

          <ScrollReveal className="text-center mt-12">
            <Button asChild variant="outline" size="lg" className="rounded-full px-8 group">
              <Link href="/activities">
                Voir toutes les activités
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* ABOUT / FEATURES */}
      <section className="py-20 md:py-28 bg-muted/30 relative overflow-hidden">
        <ParticleBackground count={20} color="rgba(0, 123, 255, 0.1)" />
        
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <ScrollReveal>
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800"
                  alt="Sainte-Marie"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent" />
                
                {/* Floating Badge */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-nature/20 flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-nature" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Tourisme Durable</p>
                        <p className="text-sm text-muted-foreground">Certifié écoresponsable</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>

            {/* Content */}
            <ScrollReveal className="space-y-6">
              <Badge variant="outline">
                <Leaf className="w-4 h-4 mr-2" />
                Notre Engagement
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Tourisme Responsable à Sainte-Marie
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Nous croyons en un tourisme qui respecte l'environnement et soutient les communautés locales.
                Chaque excursion contribue à la préservation de l'écosystème marin et au développement durable de Sainte-Marie.
              </p>
              
              <ul className="space-y-4">
                {[
                  { icon: Leaf, text: '20% des bénéfices reversés aux associations locales' },
                  { icon: Users, text: 'Guides naturalistes passionnés et expérimentés' },
                  { icon: Shield, text: 'Équipements écoresponsables et sécurisés' },
                ].map((item, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <span className="text-foreground">{item.text}</span>
                  </motion.li>
                ))}
              </ul>
              
              <Button asChild size="lg" className="rounded-full px-8 mt-4">
                <Link href="/about">
                  En savoir plus
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - Infinite Slider */}
      <section className="py-20 md:py-28 bg-background overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        
        <div className="relative max-w-7xl mx-auto px-6 mb-12">
          <ScrollReveal className="text-center">
            <Badge variant="outline" className="mb-4">
              <Star className="w-4 h-4 mr-2 fill-amber-400 text-amber-400" />
              Témoignages
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold">
              Ce que disent nos visiteurs
            </h2>
          </ScrollReveal>
        </div>

        {/* Infinite Slider */}
        <TestimonialSlider />
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1920"
            alt="Ocean"
            fill
            className="object-cover"
            unoptimized
          />
          <div className="absolute inset-0 bg-primary/90" />
        </div>

        {/* Animated Background Elements */}
        <ParticleBackground count={15} color="rgba(255, 255, 255, 0.2)" />

        <div className="relative max-w-3xl mx-auto px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-6"
            >
              <Waves className="w-8 h-8" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-bold">
              Prêt pour l'aventure?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto">
              Réservez votre excursion et contribuez à la préservation de l'écosystème marin de Sainte-Marie.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button asChild size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full px-8 shadow-xl">
                <Link href="/activities">
                  Voir les activités
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-8">
                <Link href="/contact">
                  Nous contacter
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* LOCATION */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal className="space-y-6 order-2 lg:order-1">
              <Badge variant="outline">
                <MapPin className="w-4 h-4 mr-2" />
                Localisation
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Sainte-Marie, Madagascar
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Surnommée "l'île aux femmes", Sainte-Marie est un joyau de l'océan Indien avec ses eaux cristallines 
                et ses plages de sable blanc. Un paradis pour les amoureux de la nature et des sports nautiques.
              </p>
              
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { label: 'Température', value: '25-30°C' },
                  { label: 'Meilleure saison', value: 'Avril - Décembre' },
                  { label: 'Baleines', value: 'Juillet - Septembre' },
                  { label: 'Activités', value: 'Toute l\'année' },
                ].map((info, i) => (
                  <div key={i} className="p-4 rounded-xl bg-white/50 dark:bg-white/5">
                    <p className="text-sm text-muted-foreground">{info.label}</p>
                    <p className="font-semibold text-foreground">{info.value}</p>
                  </div>
                ))}
              </div>
              
              <Button asChild size="lg" className="rounded-full px-8 mt-4">
                <Link href="/contact">
                  Nous trouver
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </ScrollReveal>

            <ScrollReveal className="order-1 lg:order-2">
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                  alt="Sainte-Marie"
                  fill
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                
                {/* Location Tag */}
                <motion.div
                  className="absolute bottom-6 left-6 right-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Île Sainte-Marie</p>
                        <p className="text-sm text-muted-foreground">Côte Est de Madagascar</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
