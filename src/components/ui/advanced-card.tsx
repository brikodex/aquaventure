'use client'

/**
 * AquaVenture - Advanced Card Components
 * Premium 3D WebGL tilt effects with perfect light/dark mode text visibility
 */

import React, { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Clock, Users, Star, Leaf, ArrowRight, Heart, MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import type { Activity } from '@/data/activities'

// ============================================
// WEBGL 3D TILT CARD - Advanced effect
// ============================================

interface Card3DProps {
  children: React.ReactNode
  className?: string
  glareEnable?: boolean
  tiltMax?: number
  perspective?: number
  scale?: number
  spotlightEnable?: boolean
}

export const Card3D: React.FC<Card3DProps> = ({
  children,
  className,
  glareEnable = true,
  tiltMax = 15,
  perspective = 1000,
  scale = 1.02,
  spotlightEnable = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 400 }
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMax, -tiltMax]), springConfig)
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMax, tiltMax]), springConfig)

  // Glare effect position
  const glareX = useTransform(x, [-0.5, 0.5], ['200%', '-200%'])
  const glareY = useTransform(y, [-0.5, 0.5], ['200%', '-200%'])

  // Spotlight effect
  const spotlightX = useTransform(x, [-0.5, 0.5], ['0%', '100%'])
  const spotlightY = useTransform(y, [-0.5, 0.5], ['0%', '100%'])

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const xPos = (e.clientX - rect.left) / rect.width - 0.5
    const yPos = (e.clientY - rect.top) / rect.height - 0.5
    x.set(xPos)
    y.set(yPos)
  }, [x, y])

  const handleMouseEnter = () => setIsHovered(true)
  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={cardRef}
      className={cn('relative will-change-transform', className)}
      style={{
        perspective: `${perspective}px`,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        className="relative w-full h-full"
      >
        {children}

        {/* WebGL-style Glare effect */}
        {glareEnable && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            style={{ zIndex: 100 }}
          >
            <motion.div
              className="absolute w-[300%] h-[300%]"
              style={{
                left: glareX,
                top: glareY,
                transform: 'translate(-50%, -50%)',
                background: `conic-gradient(
                  from 0deg,
                  transparent 0deg,
                  rgba(255, 255, 255, 0.15) 60deg,
                  rgba(255, 255, 255, 0.3) 90deg,
                  rgba(255, 255, 255, 0.15) 120deg,
                  transparent 180deg
                )`,
              }}
            />
          </motion.div>
        )}

        {/* Spotlight effect - follows cursor */}
        {spotlightEnable && isHovered && (
          <motion.div
            className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl"
            style={{ zIndex: 99 }}
          >
            <motion.div
              className="absolute w-64 h-64 rounded-full"
              style={{
                left: spotlightX,
                top: spotlightY,
                transform: 'translate(-50%, -50%)',
                background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
              }}
            />
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  )
}

// ============================================
// PREMIUM ACTIVITY CARD - Light/Dark Optimized
// ============================================

interface ActivityCardProps {
  activity: Activity
  locale?: 'fr' | 'en'
  index?: number
  className?: string
}

export const PremiumActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  locale = 'fr',
  index = 0,
  className,
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const title = activity.title[locale]
  const description = activity.shortDescription[locale]

  return (
    <Card3D className={className} tiltMax={12} spotlightEnable>
      <Link href={`/activities/${activity.slug}`} className="block h-full group">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="relative h-full overflow-hidden rounded-2xl 
            bg-white dark:bg-slate-900 
            border border-slate-200 dark:border-slate-700 
            hover:border-blue-400 dark:hover:border-blue-500 
            shadow-lg hover:shadow-2xl hover:shadow-blue-500/10
            transition-all duration-500"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Image Section */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={activity.images[0]}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              unoptimized
            />
            
            {/* Multi-layer gradient overlay - optimized for both modes */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

            {/* Top Badges - High contrast for visibility */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-10">
              {activity.featured && (
                <Badge className="bg-amber-400 dark:bg-amber-400 text-slate-900 border-0 px-3 py-1 shadow-xl font-semibold backdrop-blur-sm">
                  <Star className="w-3.5 h-3.5 mr-1 fill-slate-900 text-slate-900" />
                  Vedette
                </Badge>
              )}

              {/* Heart Button - Improved dark mode visibility */}
              <motion.button
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="ml-auto w-10 h-10 rounded-full 
                  bg-white dark:bg-slate-800 
                  flex items-center justify-center 
                  shadow-xl backdrop-blur-sm
                  hover:bg-slate-100 dark:hover:bg-slate-700 
                  transition-colors 
                  border border-slate-200 dark:border-slate-600"
              >
                <Heart
                  className={cn(
                    'w-5 h-5 transition-colors',
                    isLiked 
                      ? 'text-red-500 fill-red-500' 
                      : 'text-slate-400 dark:text-slate-400'
                  )}
                />
              </motion.button>
            </div>

            {/* Eco Badge - Improved contrast */}
            {activity.isEcoFriendly && (
              <div className="absolute top-4 left-4 mt-12 z-10">
                <Badge className="bg-emerald-500 dark:bg-emerald-400 text-white dark:text-slate-900 border-0 px-3 py-1 shadow-xl font-semibold">
                  <Leaf className="w-3.5 h-3.5 mr-1" />
                  Éco-responsable
                </Badge>
              </div>
            )}

            {/* Bottom Info - High contrast badges for both modes */}
            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end z-10">
              <Badge 
                className="bg-white dark:bg-slate-800 
                  text-slate-900 dark:text-white 
                  border-0 px-3 py-1.5 shadow-xl font-medium
                  backdrop-blur-sm
                  ring-1 ring-black/5 dark:ring-white/10"
              >
                <Clock className="w-4 h-4 mr-1.5 text-blue-600 dark:text-blue-400" />
                {activity.duration}
              </Badge>
              
              {/* Price badge - Improved contrast */}
              <div className="bg-white dark:bg-slate-800 backdrop-blur-sm px-4 py-2 rounded-xl shadow-xl 
                ring-1 ring-black/5 dark:ring-white/10">
                <span className="font-bold text-xl text-blue-600 dark:text-blue-400">{activity.price}€</span>
                <span className="text-slate-500 dark:text-slate-400 text-sm ml-1">/pers</span>
              </div>
            </div>
          </div>

          {/* Content Section - Optimized for light/dark */}
          <div 
            className="p-5 space-y-4 
              bg-white dark:bg-slate-900"
            style={{ transform: 'translateZ(20px)' }}
          >
            {/* Title */}
            <h3 className="font-montserrat font-bold text-xl 
              text-slate-900 dark:text-white 
              group-hover:text-blue-600 dark:group-hover:text-blue-400 
              transition-colors line-clamp-1">
              {title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>

            {/* Meta Info */}
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-slate-700 dark:text-slate-200">
                  Max {activity.maxParticipants}
                </span>
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-700 dark:text-slate-200">{activity.rating}</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">({activity.reviewCount})</span>
              </span>
            </div>

            {/* CTA */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <span className="inline-flex items-center text-sm font-semibold 
                text-blue-600 dark:text-blue-400 
                group-hover:text-blue-700 dark:group-hover:text-blue-300 
                transition-colors">
                Voir détails
                <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
              </span>
              <Badge 
                variant="secondary" 
                className="text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
              >
                {activity.category === 'water-sports' && '🚤 Nautique'}
                {activity.category === 'fishing' && '🎣 Pêche'}
                {activity.category === 'excursions' && '🏝️ Excursion'}
                {activity.category === 'diving' && '🤿 Plongée'}
              </Badge>
            </div>
          </div>
        </motion.div>
      </Link>
    </Card3D>
  )
}

// ============================================
// FEATURED ACTIVITY CARD - Premium Layout
// ============================================

export const PremiumFeaturedCard: React.FC<ActivityCardProps> = ({
  activity,
  locale = 'fr',
  className,
}) => {
  const title = activity.title[locale]
  const description = activity.description[locale]

  return (
    <Card3D className={className} tiltMax={8} scale={1.01} spotlightEnable>
      <Link href={`/activities/${activity.slug}`} className="block group">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl 
            bg-white dark:bg-slate-900 
            border border-slate-200 dark:border-slate-700 
            hover:border-blue-400 dark:hover:border-blue-500 
            shadow-xl hover:shadow-2xl
            transition-all duration-500"
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image */}
            <div className="relative aspect-[16/10] md:aspect-auto md:min-h-[400px] overflow-hidden">
              <Image
                src={activity.images[0]}
                alt={title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent md:hidden" />

              {/* Mobile info overlay */}
              <motion.div
                className="absolute bottom-6 left-6 right-6 md:hidden"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <div className="bg-white dark:bg-slate-800 backdrop-blur-sm rounded-2xl p-4 shadow-2xl
                  ring-1 ring-black/5 dark:ring-white/10">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center">
                      <Leaf className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">Tourisme Durable</p>
                      <p className="text-sm text-slate-600 dark:text-slate-300">Certifié écoresponsable</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Content */}
            <div className="p-8 md:p-10 flex flex-col justify-center bg-white dark:bg-slate-900 space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  {activity.isEcoFriendly && (
                    <Badge className="bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-700 mb-3 font-semibold">
                      <Leaf className="w-3.5 h-3.5 mr-1" />
                      Écoresponsable
                    </Badge>
                  )}
                  <h3 className="font-montserrat font-bold text-2xl md:text-3xl 
                    text-slate-900 dark:text-white 
                    group-hover:text-blue-600 dark:group-hover:text-blue-400 
                    transition-colors">
                    {title}
                  </h3>
                </div>
                <div className="text-right flex-shrink-0 
                  bg-blue-50 dark:bg-blue-900/30 
                  px-4 py-2 rounded-xl border border-blue-100 dark:border-blue-800">
                  <div className="text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider font-medium">
                    À partir de
                  </div>
                  <div className="font-bold text-3xl text-blue-600 dark:text-blue-400">
                    {activity.price}€
                  </div>
                </div>
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3 text-base">
                {description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm">
                <span className="flex items-center gap-2 
                  bg-slate-100 dark:bg-slate-800 
                  px-4 py-2 rounded-lg">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">{activity.duration}</span>
                </span>
                <span className="flex items-center gap-2 
                  bg-slate-100 dark:bg-slate-800 
                  px-4 py-2 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="font-semibold text-slate-700 dark:text-slate-200">Max {activity.maxParticipants}</span>
                </span>
                <span className="flex items-center gap-2 
                  bg-slate-100 dark:bg-slate-800 
                  px-4 py-2 rounded-lg">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-slate-700 dark:text-slate-200">{activity.rating}</span>
                  <span className="text-slate-500 dark:text-slate-400">({activity.reviewCount} avis)</span>
                </span>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-fit px-8 py-3 
                  bg-gradient-to-r from-blue-600 to-cyan-500 
                  hover:from-blue-700 hover:to-cyan-600 
                  text-white font-semibold rounded-full 
                  transition-all flex items-center gap-2 
                  shadow-lg shadow-blue-500/30"
              >
                Réserver maintenant
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </Link>
    </Card3D>
  )
}

// ============================================
// COMPACT CARD FOR GRIDS - Light/Dark Optimized
// ============================================

export const CompactActivityCard: React.FC<ActivityCardProps> = ({
  activity,
  locale = 'fr',
  index = 0,
  className,
}) => {
  const [isLiked, setIsLiked] = useState(false)
  const title = activity.title[locale]

  return (
    <Card3D className={className} tiltMax={10} scale={1.03} spotlightEnable>
      <Link href={`/activities/${activity.slug}`} className="block h-full group">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05 }}
          className="relative h-full overflow-hidden rounded-2xl 
            bg-white dark:bg-slate-900 
            border border-slate-200 dark:border-slate-700 
            hover:border-blue-400 dark:hover:border-blue-500 
            shadow-lg hover:shadow-xl hover:shadow-blue-500/10
            transition-all duration-300"
        >
          {/* Image */}
          <div className="relative aspect-[4/3] overflow-hidden">
            <Image
              src={activity.images[0]}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              unoptimized
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Top badges */}
            <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
              {activity.featured && (
                <Badge className="bg-amber-400 text-slate-900 border-0 px-2 py-0.5 shadow-lg text-xs font-semibold">
                  <Star className="w-3 h-3 mr-1 fill-slate-900 text-slate-900" />
                  Vedette
                </Badge>
              )}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={(e) => {
                  e.preventDefault()
                  setIsLiked(!isLiked)
                }}
                className="ml-auto w-8 h-8 rounded-full 
                  bg-white dark:bg-slate-800 
                  flex items-center justify-center shadow-lg
                  border border-slate-200 dark:border-slate-600"
              >
                <Heart
                  className={cn(
                    'w-4 h-4',
                    isLiked ? 'text-red-500 fill-red-500' : 'text-slate-400 dark:text-slate-400'
                  )}
                />
              </motion.button>
            </div>

            {/* Eco badge */}
            {activity.isEcoFriendly && (
              <Badge className="absolute top-3 left-3 mt-10 
                bg-emerald-500 dark:bg-emerald-400 
                text-white dark:text-slate-900 
                border-0 px-2 py-0.5 shadow-lg text-xs font-semibold z-10">
                <Leaf className="w-3 h-3 mr-1" />
                Éco
              </Badge>
            )}

            {/* Bottom info - Improved contrast */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end z-10">
              <Badge 
                className="bg-white dark:bg-slate-800 
                  text-slate-900 dark:text-white 
                  border-0 px-2 py-1 shadow-lg text-xs font-medium
                  ring-1 ring-black/5 dark:ring-white/10"
              >
                <Clock className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
                {activity.duration}
              </Badge>
              <div className="bg-white dark:bg-slate-800 px-3 py-1.5 rounded-lg shadow-lg 
                ring-1 ring-black/5 dark:ring-white/10">
                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{activity.price}€</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3 bg-white dark:bg-slate-900">
            <h3 className="font-montserrat font-bold text-base 
              text-slate-900 dark:text-white 
              group-hover:text-blue-600 dark:group-hover:text-blue-400 
              transition-colors line-clamp-1">
              {title}
            </h3>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                <span className="font-medium text-slate-700 dark:text-slate-200">{activity.location.name}</span>
              </span>
              <span className="flex items-center gap-1">
                <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                <span className="font-semibold text-slate-700 dark:text-slate-200">{activity.rating}</span>
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-700">
              <span className="text-xs font-medium text-blue-600 dark:text-blue-400 flex items-center gap-1 group-hover:gap-2 transition-all">
                Voir <ArrowRight className="w-3 h-3" />
              </span>
              <Badge 
                variant="secondary" 
                className="text-xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                Max {activity.maxParticipants} pers.
              </Badge>
            </div>
          </div>
        </motion.div>
      </Link>
    </Card3D>
  )
}

export default PremiumActivityCard
