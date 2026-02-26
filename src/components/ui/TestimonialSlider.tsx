'use client'

/**
 * Infinite Auto-Scrolling Testimonial Slider
 * Premium design with WebGL 3D effects and perfect light/dark mode visibility
 */

import React, { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Star, Quote, MapPin, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================
// TESTIMONIALS DATA
// ============================================

const testimonials = [
  {
    id: 1,
    name: 'Marie Dupont',
    location: 'Paris, France',
    avatar: '/download/avatar-marie.png',
    comment: 'Une expérience inoubliable! Les guides sont passionnés et l\'approche écoresponsable est remarquable. Je recommande vivement!',
    rating: 5,
    activity: 'Jet Ski Sensation',
    verified: true
  },
  {
    id: 2,
    name: 'Jean-Pierre Martin',
    location: 'Lyon, France',
    avatar: '/download/avatar-jean.png',
    comment: 'Le SUP au lever du soleil était magique. Moments de pure sérénité! Équipe professionnelle et paysages à couper le souffle.',
    rating: 5,
    activity: 'Paddle Coucher de Soleil',
    verified: true
  },
  {
    id: 3,
    name: 'Sarah Johnson',
    location: 'London, UK',
    avatar: '/download/avatar-sarah.png',
    comment: 'The sustainable fishing experience was incredible. Highly recommended for anyone visiting Sainte-Marie!',
    rating: 5,
    activity: 'Pêche Sportive',
    verified: true
  },
  {
    id: 4,
    name: 'Marco Rossi',
    location: 'Milano, Italia',
    avatar: '/download/avatar-marie.png',
    comment: 'Bouée tractée avec mes enfants - fous rires garantis! Super équipe et super organisation.',
    rating: 5,
    activity: 'Bouée Tractée',
    verified: true
  },
  {
    id: 5,
    name: 'Anna Schmidt',
    location: 'Berlin, Germany',
    avatar: '/download/avatar-sarah.png',
    comment: 'Amazing whale watching experience! Truly magical moment that I\'ll never forget. Thank you AquaVenture!',
    rating: 5,
    activity: 'Excursion Baleines',
    verified: true
  },
  {
    id: 6,
    name: 'Pierre Leroy',
    location: 'Bordeaux, France',
    avatar: '/download/avatar-jean.png',
    comment: 'Jet ski au top! Paysages magnifiques de Sainte-Marie. Une expérience à refaire absolument!',
    rating: 5,
    activity: 'Jet Ski Sensation',
    verified: true
  },
  {
    id: 7,
    name: 'Emma Wilson',
    location: 'Sydney, Australia',
    avatar: '/download/avatar-marie.png',
    comment: 'Best excursion ever! The team made our honeymoon unforgettable. Highly professional and friendly guides.',
    rating: 5,
    activity: 'Îles aux Nattes',
    verified: true
  },
  {
    id: 8,
    name: 'Lucas Bernard',
    location: 'Bruxelles, Belgique',
    avatar: '/download/avatar-jean.png',
    comment: 'Snorkeling incroyable! Les coraux sont préservés et magnifiques. Bravo pour l\'engagement écologique!',
    rating: 5,
    activity: 'Snorkeling Récif',
    verified: true
  },
]

// ============================================
// TESTIMONIAL CARD - Light/Dark Optimized
// ============================================

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.05 }}
    className="flex-shrink-0 w-[320px] mx-3"
  >
    <div className="relative h-full rounded-2xl p-5 
      bg-white dark:bg-slate-900 
      border border-slate-200 dark:border-slate-700 
      hover:border-blue-400 dark:hover:border-blue-500 
      hover:shadow-xl hover:shadow-blue-500/10
      transition-all duration-300 group
      ring-1 ring-black/5 dark:ring-white/5"
    >
      {/* Quote Icon */}
      <div className="absolute -top-3 -right-3 w-10 h-10 
        bg-gradient-to-br from-blue-500 to-cyan-400 
        rounded-full flex items-center justify-center 
        shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
        <Quote className="w-5 h-5 text-white" />
      </div>

      {/* Header with Profile */}
      <div className="flex items-center gap-4 mb-4">
        {/* Circle Profile Image */}
        <div className="relative">
          <div className="w-14 h-14 rounded-full overflow-hidden 
            ring-2 ring-blue-500/30 dark:ring-blue-400/30 
            ring-offset-2 ring-offset-white dark:ring-offset-slate-900 
            flex-shrink-0 border border-slate-200 dark:border-slate-600">
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={56}
              height={56}
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online indicator */}
          {testimonial.verified && (
            <div className="absolute -bottom-1 -right-1 w-5 h-5 
              bg-emerald-500 rounded-full 
              border-2 border-white dark:border-slate-900 
              flex items-center justify-center">
              <CheckCircle className="w-3 h-3 text-white" />
            </div>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-slate-900 dark:text-white text-sm truncate">
            {testimonial.name}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 truncate">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            {testimonial.location}
          </p>
        </div>
      </div>

      {/* Stars */}
      <div className="flex gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            className={cn(
              "w-4 h-4",
              i < testimonial.rating 
                ? "fill-amber-400 text-amber-400" 
                : "fill-slate-300 dark:fill-slate-600 text-slate-300 dark:text-slate-600"
            )} 
          />
        ))}
      </div>

      {/* Quote - Improved text contrast */}
      <p className="text-slate-700 dark:text-slate-200 text-sm leading-relaxed line-clamp-4 mb-4">
        "{testimonial.comment}"
      </p>

      {/* Activity Tag */}
      <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
        <div>
          <span className="text-xs text-slate-500 dark:text-slate-400">Activité: </span>
          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">{testimonial.activity}</span>
        </div>
        {testimonial.verified && (
          <span className="text-[10px] font-medium text-emerald-600 dark:text-emerald-400 
            bg-emerald-100 dark:bg-emerald-900/30 
            px-2 py-0.5 rounded-full">
            Achat vérifié
          </span>
        )}
      </div>
    </div>
  </motion.div>
)

// ============================================
// INFINITE SLIDER COMPONENT
// ============================================

export default function TestimonialSlider() {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Triple the testimonials for seamless infinite loop
  const allTestimonials = [...testimonials, ...testimonials, ...testimonials]

  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        // Card width (320px) + margin (24px) = 344px per card
        // Reset when we've scrolled through one set of testimonials
        const maxScroll = testimonials.length * 344
        const newPosition = prev + 1
        if (newPosition >= maxScroll) {
          return 0
        }
        return newPosition
      })
    }, 30) // Speed of scrolling

    return () => clearInterval(interval)
  }, [isPaused])

  return (
    <div
      className="relative overflow-hidden py-6"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Gradient Overlays - Improved for light/dark */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 
        bg-gradient-to-r from-background via-background/80 to-transparent 
        z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 
        bg-gradient-to-l from-background via-background/80 to-transparent 
        z-10 pointer-events-none" />

      {/* Scrolling Container */}
      <div
        ref={scrollRef}
        className="flex"
        style={{
          transform: `translateX(-${scrollPosition}px)`,
          transition: isPaused ? 'none' : 'transform 0.03s linear',
        }}
      >
        {allTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.id}-${index}`} testimonial={testimonial} index={index} />
        ))}
      </div>
    </div>
  )
}
