'use client'

/**
 * AquaVenture - Modern Activity Card Component
 * With TiltCard 3D effect, glow, and premium hover states
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, Users, Star, Leaf, ArrowRight, Heart } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Activity } from '@/data/activities'

// ============================================
// TYPES
// ============================================

interface ActivityCardProps {
  activity: Activity
  locale?: 'fr' | 'en'
  index?: number
  className?: string
}

// ============================================
// ACTIVITY CARD - With 3D Tilt Effect
// ============================================

export const ActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  locale = 'fr',
  index = 0,
  className,
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const title = activity.title[locale]
  const description = activity.shortDescription[locale]

  // 3D Tilt Effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setMousePosition({ x, y })
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    setMousePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      className={cn('group', className)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Link href={`/activities/${activity.slug}`} className="block">
        <div
          className="relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
          style={{
            perspective: '1000px',
            transform: isHovered
              ? `rotateY(${mousePosition.x * 8}deg) rotateX(${-mousePosition.y * 8}deg) scale(1.02)`
              : 'rotateY(0deg) rotateX(0deg) scale(1)',
            transition: 'transform 0.3s ease-out',
            boxShadow: isHovered
              ? '0 20px 40px rgba(0, 123, 255, 0.15), 0 0 0 1px rgba(0, 123, 255, 0.1)'
              : 'none'
          }}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={activity.images[0]}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

            {/* Top Badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              {activity.featured && (
                <Badge className="bg-accent text-accent-foreground border-0 px-3 py-1 shadow-lg">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  Vedette
                </Badge>
              )}

              {/* Heart Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="ml-auto w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors shadow-lg"
              >
                <Heart
                  className={cn(
                    'w-4 h-4 transition-colors',
                    isLiked ? 'text-red-500 fill-red-500' : 'text-gray-600'
                  )}
                />
              </motion.button>
            </div>

            {/* Eco Badge */}
            {activity.isEcoFriendly && (
              <div className="absolute top-4 right-4 mt-10">
                <Badge className="bg-nature text-white border-0 px-3 py-1 shadow-lg">
                  <Leaf className="w-3 h-3 mr-1" />
                  Éco
                </Badge>
              </div>
            )}

            {/* Duration Badge */}
            <div className="absolute bottom-4 left-4">
              <Badge variant="outline" className="bg-white/90 border-0 text-foreground px-3 py-1 shadow-lg">
                <Clock className="w-3 h-3 mr-1" />
                {activity.duration}
              </Badge>
            </div>

            {/* Price */}
            <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
              <span className="font-bold text-xl text-primary">{activity.price}€</span>
              <span className="text-muted-foreground text-sm ml-1">/pers</span>
            </div>

            {/* Spotlight Effect on Hover */}
            {isHovered && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: `radial-gradient(300px circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(255,255,255,0.1), transparent 40%)`
                }}
              />
            )}
          </div>

          {/* Content */}
          <div className="p-5 space-y-3">
            <h3 className="font-montserrat font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {title}
            </h3>

            <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                Max {activity.maxParticipants}
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-medium text-foreground">{activity.rating}</span>
                <span className="text-xs">({activity.reviewCount})</span>
              </span>
            </div>

            {/* CTA */}
            <div className="pt-3 border-t border-border/50 flex items-center justify-between">
              <span className="inline-flex items-center text-sm font-medium text-primary group-hover:text-primary/80 transition-colors">
                Voir détails
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
              <Badge variant="secondary" className="text-xs">
                {activity.category === 'water-sports' && '🚤 Nautique'}
                {activity.category === 'fishing' && '🎣 Pêche'}
                {activity.category === 'excursions' && '🏝️ Excursion'}
                {activity.category === 'diving' && '🤿 Plongée'}
              </Badge>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

// ============================================
// FEATURED ACTIVITY CARD - Premium Layout
// ============================================

export const FeaturedActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  locale = 'fr',
  className,
}) => {
  const title = activity.title[locale]
  const description = activity.description[locale]
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      className={cn('group', className)}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <Link href={`/activities/${activity.slug}`} className="block">
        <div
          className="relative overflow-hidden rounded-3xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-500"
          style={{
            boxShadow: isHovered
              ? '0 30px 60px rgba(0, 123, 255, 0.15)'
              : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[16/10] md:aspect-auto overflow-hidden">
              <Image
                src={activity.images[0]}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/20 hidden md:block" />

              {/* Floating particles on image */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white/30"
                    style={{
                      left: `${20 + i * 15}%`,
                      top: `${30 + i * 10}%`,
                    }}
                    animate={{
                      y: [-10, 10, -10],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 3 + i * 0.5,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {activity.isEcoFriendly && (
                    <Badge className="bg-nature/10 text-nature border-nature/20 mb-3">
                      <Leaf className="w-3 h-3 mr-1" />
                      Écoresponsable
                    </Badge>
                  )}
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground group-hover:text-primary transition-colors">
                    {title}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className="text-muted-foreground text-xs uppercase tracking-wider">À partir de</div>
                  <div className="font-bold text-3xl text-primary">{activity.price}€</div>
                </div>
              </div>

              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">{activity.duration}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-primary" />
                  <span className="font-medium text-foreground">Max {activity.maxParticipants}</span>
                </span>
                <span className="flex items-center gap-2">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-foreground">{activity.rating}</span>
                  <span>({activity.reviewCount} avis)</span>
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit px-8 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition-colors flex items-center gap-2"
              >
                Réserver
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ActivityCard
