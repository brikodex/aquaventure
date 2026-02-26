'use client'

/**
 * HeroCarousel - Premium immersive hero section
 * With particles, parallax, and advanced animations
 * Supports EN/FR language switching
 */

import React, { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight, Waves } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/contexts/LanguageContext'
import { ParticleBackground, GradientTextAnimated, MagneticButton } from '@/components/animations/AnimatedComponents'

// ============================================
// CAROUSEL SLIDES DATA
// ============================================

const slides = [
  {
    id: 1,
    image: '/download/hero-jetski.png',
    slug: 'jet-ski',
  },
  {
    id: 2,
    image: '/download/hero-whale.png',
    slug: 'excursion-iles',
  },
  {
    id: 3,
    image: '/download/hero-paddle.png',
    slug: 'stand-up-paddle',
  }
]

// ============================================
// ANIMATION VARIANTS
// ============================================

const slideVariants = {
  enter: { opacity: 0, scale: 1.15 },
  center: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
}

const textVariants = {
  hidden: { opacity: 0, y: 50, filter: 'blur(10px)' },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      delay: i * 0.12,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1]
    }
  })
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
}

// ============================================
// FLOATING PARTICLES COMPONENT
// ============================================

const FloatingBubbles = () => {
  const bubbles = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    size: Math.random() * 20 + 10,
    x: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 10 + 15
  }))

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full border border-white/20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.x}%`,
            bottom: '-10%',
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// HERO CAROUSEL COMPONENT
// ============================================

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const { language } = useLanguage()
  const slideCount = slides.length

  // Translations per slide
  const slideTexts = {
    fr: {
      0: { 
        title: 'Jet Ski', 
        subtitle: 'Aventure & Adrénaline', 
        description: 'Explorez les eaux cristallines de Sainte-Marie à pleine vitesse.', 
        cta: 'Réserver',
        badge: 'À partir de 85€'
      },
      1: { 
        title: 'Excursions', 
        subtitle: 'Observation des Baleines', 
        description: 'Un rendez-vous magique avec les baleines à bosse de juillet à septembre.', 
        cta: 'Découvrir',
        badge: 'Inoubliable'
      },
      2: { 
        title: 'Paddle', 
        subtitle: 'Sérénité & Nature', 
        description: 'Glissez silencieusement sur la lagune au lever du soleil.', 
        cta: 'Explorer',
        badge: 'Éco-responsable'
      },
    },
    en: {
      0: { 
        title: 'Jet Ski', 
        subtitle: 'Adventure & Adrenaline', 
        description: 'Explore the crystal-clear waters of Sainte-Marie at full speed.', 
        cta: 'Book Now',
        badge: 'From 85€'
      },
      1: { 
        title: 'Excursions', 
        subtitle: 'Whale Watching', 
        description: 'A magical encounter with humpback whales from July to September.', 
        cta: 'Discover',
        badge: 'Unforgettable'
      },
      2: { 
        title: 'Paddle', 
        subtitle: 'Serenity & Nature', 
        description: 'Silently glide on the lagoon at sunrise.', 
        cta: 'Explore',
        badge: 'Eco-friendly'
      },
    }
  }

  const getText = (slideIndex: number) => {
    return slideTexts[language][slideIndex as keyof typeof slideTexts.fr]
  }

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideCount)
    }, 7000)
    return () => clearInterval(interval)
  }, [slideCount])

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index)
  }, [])

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slideCount)
  }, [slideCount])

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slideCount) % slideCount)
  }, [slideCount])

  const currentText = getText(currentSlide)

  return (
    <section className="relative h-screen min-h-[700px] flex items-center overflow-hidden bg-black">
      {/* Background Images with Parallax Effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image}
            alt={currentText.title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Particle Effects */}
      <ParticleBackground count={30} color="rgba(255, 255, 255, 0.15)" />

      {/* Floating Bubbles */}
      <FloatingBubbles />

      {/* Decorative Wave Pattern */}
      <div className="absolute bottom-0 left-0 right-0 h-32 opacity-30">
        <svg viewBox="0 0 1440 120" className="w-full h-full">
          <path
            fill="rgba(0, 123, 255, 0.3)"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 lg:px-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            className="max-w-2xl"
          >
            {/* Badge */}
            <motion.div
              custom={0}
              variants={textVariants}
              className="inline-flex items-center gap-2 mb-6"
            >
              <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium">
                {currentText.badge}
              </span>
              <Waves className="w-5 h-5 text-primary animate-float" />
            </motion.div>

            {/* Subtitle */}
            <motion.p
              custom={1}
              variants={textVariants}
              className="text-primary text-sm md:text-base tracking-[0.2em] uppercase mb-4 font-medium"
            >
              {currentText.subtitle}
            </motion.p>

            {/* Title */}
            <motion.h1
              custom={2}
              variants={textVariants}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-[0.9] tracking-tight"
            >
              <GradientTextAnimated duration={4}>
                {currentText.title}
              </GradientTextAnimated>
            </motion.h1>

            {/* Description */}
            <motion.p
              custom={3}
              variants={textVariants}
              className="text-white/80 text-lg md:text-xl mb-10 max-w-lg leading-relaxed"
            >
              {currentText.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              custom={4} 
              variants={textVariants}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                size="lg"
                className="bg-white text-black hover:bg-white/90 rounded-full px-8 py-6 text-base font-medium group shadow-xl shadow-white/10"
              >
                <Link href={`/activities/${slides[currentSlide].slug}`}>
                  {currentText.cta}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/30 text-white hover:bg-white/10 hover:border-white/50 rounded-full px-8 py-6 text-base"
              >
                <Link href="/activities">
                  {language === 'fr' ? 'Toutes les activités' : 'All activities'}
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation - Premium Style */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-8 z-20">
        {/* Prev Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.button>

        {/* Progress Indicators */}
        <div className="flex items-center gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className="relative group"
            >
              <div
                className={cn(
                  'h-1.5 rounded-full transition-all duration-500',
                  index === currentSlide
                    ? 'w-12 bg-white'
                    : 'w-3 bg-white/30 group-hover:bg-white/50'
                )}
              />
              {index === currentSlide && (
                <motion.div
                  className="absolute left-0 top-0 h-full bg-primary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 7, ease: 'linear' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </motion.button>
      </div>

      {/* Side Counter */}
      <div className="absolute right-8 bottom-12 text-white/40 text-sm font-mono hidden md:block">
        <span className="text-white text-3xl font-light">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="mx-2">/</span>
        <span>{String(slideCount).padStart(2, '0')}</span>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-white/50 z-10"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 rounded-full border border-white/30 flex justify-center pt-2">
          <motion.div
            className="w-1 h-2 bg-white/60 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </div>
        <span className="text-xs tracking-widest uppercase mt-2">
          {language === 'fr' ? 'Défiler' : 'Scroll'}
        </span>
      </motion.div>
    </section>
  )
}
