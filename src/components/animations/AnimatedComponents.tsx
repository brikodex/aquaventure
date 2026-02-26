'use client'

/**
 * AquaVenture - Advanced Animation Components Library
 * Premium animations with Framer Motion for immersive UX
 * Supports reduced motion for accessibility
 */

import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useInView, AnimatePresence, MotionValue } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// TYPES
// ============================================

interface AnimationProps {
  duration?: number
  delay?: number
  easing?: number[]
  className?: string
  children: React.ReactNode
}

interface TiltCardProps extends AnimationProps {
  glareEnable?: boolean
  scale?: number
  tiltMaxAngle?: number
}

interface MagneticButtonProps extends AnimationProps {
  strength?: number
  disabled?: boolean
  onClick?: () => void
}

interface ParticleBackgroundProps {
  count?: number
  color?: string
  minSize?: number
  maxSize?: number
  speed?: number
  className?: string
}

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
}

interface TextRevealProps extends AnimationProps {
  text: string
  type?: 'blur' | 'slide' | 'wave' | 'typewriter' | 'gradient'
  staggerDelay?: number
}

// ============================================
// REDUCED MOTION CHECK
// ============================================

const useReducedMotion = () => {
  const [reducedMotion, setReducedMotion] = useState(() => {
    // Initialize from media query if available (client-side only)
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches
    }
    return false
  })

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return reducedMotion
}

// ============================================
// 1. TILT CARD - 3D Perspective Tilt
// ============================================

/**
 * TiltCard - 3D perspective tilt effect on mouse move
 * @param glareEnable - Enable glare effect overlay
 * @param scale - Scale on hover (default: 1.02)
 * @param tiltMaxAngle - Maximum tilt angle in degrees (default: 15)
 */
export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  glareEnable = true,
  scale = 1.02,
  tiltMaxAngle = 15,
  duration = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltMaxAngle, -tiltMaxAngle]), {
    stiffness: 200,
    damping: 30,
  })
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltMaxAngle, tiltMaxAngle]), {
    stiffness: 200,
    damping: 30,
  })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || reducedMotion) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) / rect.width)
    y.set((e.clientY - centerY) / rect.height)
  }, [x, y, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn('relative', className)}
      style={{
        perspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale }}
      transition={{ duration }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="w-full h-full"
      >
        {children}

        {/* Glare Effect */}
        {glareEnable && (
          <motion.div
            className="absolute inset-0 pointer-events-none rounded-inherit"
            style={{
              background: `linear-gradient(
                105deg,
                transparent 40%,
                rgba(255, 255, 255, 0.1) 45%,
                rgba(255, 255, 255, 0.2) 50%,
                rgba(255, 255, 255, 0.1) 55%,
                transparent 60%
              )`,
              transformStyle: 'preserve-3d',
              transform: 'translateZ(50px)',
              mixBlendMode: 'overlay',
            }}
          />
        )}
      </motion.div>
    </motion.div>
  )
}

// ============================================
// 2. MAGNETIC BUTTON - Cursor Follow Magnetic Pull
// ============================================

/**
 * MagneticButton - Magnetic pull effect towards cursor
 * @param strength - Magnetic pull strength (default: 0.5)
 */
export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  strength = 0.5,
  duration = 0.2,
  disabled = false,
  onClick,
}) => {
  const ref = useRef<HTMLButtonElement>(null)
  const reducedMotion = useReducedMotion()

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || reducedMotion) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    x.set((e.clientX - centerX) * strength)
    y.set((e.clientY - centerY) * strength)
  }, [x, y, strength, reducedMotion])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  return (
    <motion.button
      ref={ref}
      className={cn('relative', className)}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      transition={{ duration }}
    >
      {children}

      {/* Glow Effect */}
      <motion.div
        className="absolute inset-0 rounded-inherit pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 123, 255, 0.3), transparent 70%)',
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  )
}

// ============================================
// 3. GLOW CARD - Dynamic Glow on Mouse Position
// ============================================

/**
 * GlowCard - Card with dynamic glow effect following cursor
 */
export const GlowCard: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 0.3,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) => `radial-gradient(600px circle at ${x}px ${y}px, rgba(0, 123, 255, 0.1), transparent 40%)`
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || reducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY, reducedMotion])

  return (
    <motion.div
      ref={ref}
      className={cn('relative overflow-hidden rounded-2xl', className)}
      onMouseMove={handleMouseMove}
      whileHover={{ boxShadow: '0 0 30px rgba(0, 123, 255, 0.2)' }}
      transition={{ duration }}
    >
      <motion.div
        className="pointer-events-none absolute inset-0"
        style={{ background }}
      />
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ============================================
// 4. PARTICLE BACKGROUND - Floating Particles
// ============================================

/**
 * ParticleBackground - Floating particles (bubbles/waves themed)
 * @param count - Number of particles (default: 40)
 * @param color - Particle color (default: primary)
 */
export const ParticleBackground: React.FC<ParticleBackgroundProps> = ({
  count = 40,
  color = 'rgba(0, 123, 255, 0.3)',
  minSize = 2,
  maxSize = 8,
  speed = 20,
  className,
}) => {
  const reducedMotion = useReducedMotion()

  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (maxSize - minSize) + minSize,
      duration: Math.random() * speed + speed / 2,
      delay: Math.random() * 5,
    }))
  }, [count, minSize, maxSize, speed])

  if (reducedMotion) return null

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            background: color,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}

// ============================================
// 5. PULSE RING - Expanding Pulse Rings
// ============================================

/**
 * PulseRing - Breathing pulse effect for status badges
 */
export const PulseRing: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 2,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={cn('relative', className)}>
      {children}
      <motion.div
        className="absolute inset-0 rounded-inherit border-2 border-primary"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </div>
  )
}

// ============================================
// 6. LIGHT BEAM - Animated Light Beam
// ============================================

/**
 * LightBeam - Animated light beam sweeping across element
 */
export const LightBeam: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 3,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      {children}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)',
          width: '50%',
        }}
        animate={{
          x: ['-200%', '300%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

// ============================================
// 7. ANIMATED BORDER GLOW - Rotating Gradient Border
// ============================================

/**
 * AnimatedBorderGlow - Rotating gradient border effect
 */
export const AnimatedBorderGlow: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 4,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={cn('relative p-[2px] rounded-2xl overflow-hidden', className)}>
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'conic-gradient(from 0deg, #007BFF, #28A745, #FFC107, #007BFF)',
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <div className="relative bg-card rounded-2xl">{children}</div>
    </div>
  )
}

// ============================================
// 8. NEON GLOW TEXT - Pulsing Neon Text
// ============================================

/**
 * NeonGlowText - Text with pulsing neon glow effect
 */
export const NeonGlowText: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 2,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <span className={className}>{children}</span>
  }

  return (
    <motion.span
      className={cn('inline-block', className)}
      animate={{
        textShadow: [
          '0 0 5px rgba(0, 123, 255, 0.5)',
          '0 0 20px rgba(0, 123, 255, 0.8)',
          '0 0 5px rgba(0, 123, 255, 0.5)',
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.span>
  )
}

// ============================================
// 9. RIPPLE BUTTON - Enhanced Ripple on Click
// ============================================

/**
 * RippleButton - Button with enhanced ripple effect on click
 */
export const RippleButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
}) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])
  const reducedMotion = useReducedMotion()

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (reducedMotion || disabled) return

    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const id = Date.now()
    setRipples((prev) => [...prev, { x, y, id }])

    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)

    onClick?.()
  }, [onClick, disabled, reducedMotion])

  return (
    <motion.button
      className={cn('relative overflow-hidden', className)}
      onClick={handleClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: 10,
            height: 10,
            marginLeft: -5,
            marginTop: -5,
          }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: 20, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
    </motion.button>
  )
}

// ============================================
// 10. TEXT REVEAL - Multiple Animation Types
// ============================================

/**
 * TextReveal - Text reveal animation with multiple types
 * @param type - Animation type: blur, slide, wave, typewriter, gradient
 */
export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  type = 'slide',
  className,
  staggerDelay = 0.05,
  duration = 0.5,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  const reducedMotion = useReducedMotion()

  const words = text.split(' ')

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  }

  const wordVariants = {
    blur: {
      hidden: { filter: 'blur(10px)', opacity: 0 },
      visible: { filter: 'blur(0px)', opacity: 1 },
    },
    slide: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    wave: {
      hidden: { y: 0, opacity: 0 },
      visible: { y: [0, -10, 0], opacity: 1 },
    },
    typewriter: {
      hidden: { clipPath: 'inset(0 100% 0 0)' },
      visible: { clipPath: 'inset(0 0% 0 0)' },
    },
    gradient: {
      hidden: { backgroundPosition: '100% center' },
      visible: { backgroundPosition: '0% center' },
    },
  }

  if (reducedMotion) {
    return <div className={className}>{text}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={cn('flex flex-wrap', className)}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVariants[type]}
          transition={{ duration, ease: 'easeOut' }}
          className={cn(
            'mr-2',
            type === 'gradient' && 'bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent'
          )}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// ============================================
// 11. COUNT UP - Animated Number Counter
// ============================================

/**
 * CountUp - Animated number counter
 */
export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
}) => {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const reducedMotion = useReducedMotion()

  // Initialize count based on reduced motion preference
  const [count, setCount] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return end
    }
    return start
  })

  useEffect(() => {
    if (!isInView || reducedMotion) {
      return
    }

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

      setCount(start + (end - start) * progress)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [isInView, start, end, duration, reducedMotion])

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toFixed(decimals)}{suffix}
    </span>
  )
}

// ============================================
// 12. FLOATING ICON - Floating Decoration
// ============================================

/**
 * FloatingIcon - Floating animation for decorative icons
 */
export const FloatingIcon: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 3,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [-5, 5, -5],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 13. SCROLL REVEAL - Scroll Triggered Reveal
// ============================================

/**
 * ScrollReveal - Reveal animation on scroll into view
 */
export const ScrollReveal: React.FC<AnimationProps & {
  direction?: 'up' | 'down' | 'left' | 'right'
  once?: boolean
}> = ({
  children,
  className,
  direction = 'up',
  duration = 0.5,
  delay = 0,
  once = true,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-50px' })
  const reducedMotion = useReducedMotion()

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
  }

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, ...directions[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, ...directions[direction] }}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 14. AURORA BACKGROUND - Aurora Gradient
// ============================================

/**
 * AuroraBackground - Animated aurora gradient background
 */
export const AuroraBackground: React.FC<{ className?: string }> = ({ className }) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={cn('bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10', className)} />
  }

  return (
    <motion.div
      className={cn('absolute inset-0 overflow-hidden', className)}
      style={{
        background: 'linear-gradient(45deg, rgba(0,123,255,0.1), rgba(40,167,69,0.05), rgba(255,193,7,0.1), rgba(0,123,255,0.1))',
        backgroundSize: '400% 400%',
      }}
      animate={{
        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      }}
      transition={{
        duration: 15,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  )
}

// ============================================
// 15. SPOTLIGHT CARD - Mouse Follow Spotlight
// ============================================

/**
 * SpotlightCard - Card with spotlight effect following cursor
 */
export const SpotlightCard: React.FC<AnimationProps> = ({
  children,
  className,
}) => {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const reducedMotion = useReducedMotion()

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current || reducedMotion) return
    const rect = ref.current.getBoundingClientRect()
    setPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [reducedMotion])

  return (
    <div
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      style={{
        // @ts-ignore
        '--x': `${position.x}px`,
        '--y': `${position.y}px`,
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(0, 123, 255, 0.15), transparent 50%)`,
        }}
      />
      {children}
    </div>
  )
}

// ============================================
// 16. GRADIENT TEXT ANIMATED - Flowing Gradient
// ============================================

/**
 * GradientTextAnimated - Text with flowing gradient effect
 */
export const GradientTextAnimated: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 3,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <span className={cn('bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent', className)}>{children}</span>
  }

  return (
    <motion.span
      className={cn(
        'bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent',
        className
      )}
      animate={{
        backgroundPosition: ['0% center', '200% center'],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  )
}

// ============================================
// 17. GLASS CARD - Glassmorphism Card
// ============================================

/**
 * GlassCard - Card with glassmorphism effect - Light/Dark optimized
 */
export const GlassCard: React.FC<AnimationProps> = ({
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'backdrop-blur-xl',
        'bg-white/90 dark:bg-slate-900/90',
        'border border-slate-200/50 dark:border-slate-700/50',
        'rounded-2xl shadow-xl',
        'hover:shadow-2xl hover:border-slate-300 dark:hover:border-slate-600',
        'transition-all duration-300',
        className
      )}
    >
      {children}
    </div>
  )
}

// ============================================
// 18. SHIMMER EFFECT - Loading Skeleton
// ============================================

/**
 * ShimmerEffect - Shimmer loading skeleton
 */
export const ShimmerEffect: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={cn(
        'animate-shimmer bg-[linear-gradient(110deg,#e0e0e0_45%,#f0f0f0_50%,#e0e0e0_55%)]',
        'dark:bg-[linear-gradient(110deg,#2a2a2a_45%,#3a3a3a_50%,#2a2a2a_55%)]',
        'bg-[length:200%_100%]',
        className
      )}
    />
  )
}

// ============================================
// 19. HOVER LIFT CARD - Hover Lift Effect
// ============================================

/**
 * HoverLiftCard - Card that lifts on hover
 */
export const HoverLiftCard: React.FC<AnimationProps> = ({
  children,
  className,
  duration = 0.3,
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      whileHover={{
        y: -5,
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
      }}
      transition={{ duration, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// 20. BORDER BEAM - Animated Border Beam
// ============================================

/**
 * BorderBeam - Animated beam traveling along border
 */
export const BorderBeam: React.FC<{
  className?: string
  size?: number
  duration?: number
  color?: string
}> = ({
  className,
  size = 100,
  duration = 4,
  color = 'rgba(0, 123, 255, 0.5)',
}) => {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return null

  return (
    <div className={cn('absolute inset-0 overflow-hidden rounded-inherit pointer-events-none', className)}>
      <motion.div
        className="absolute"
        style={{
          width: size,
          height: size,
          background: `radial-gradient(circle, ${color}, transparent 70%)`,
        }}
        animate={{
          top: ['0%', '100%', '100%', '0%', '0%'],
          left: ['0%', '0%', '100%', '100%', '0%'],
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </div>
  )
}

// ============================================
// PAGE TRANSITION - Fade/Slide Page Transition
// ============================================

/**
 * PageTransition - Wrapper for page transitions
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}

// ============================================
// STAGGER CONTAINER - Stagger Children Animation
// ============================================

/**
 * StaggerContainer - Container that staggers children animations
 */
export const StaggerContainer: React.FC<{
  children: React.ReactNode
  className?: string
  staggerDelay?: number
}> = ({ children, className, staggerDelay = 0.1 }) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem - Individual item for stagger animations
 */
export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export default {
  TiltCard,
  MagneticButton,
  GlowCard,
  ParticleBackground,
  PulseRing,
  LightBeam,
  AnimatedBorderGlow,
  NeonGlowText,
  RippleButton,
  TextReveal,
  CountUp,
  FloatingIcon,
  ScrollReveal,
  AuroraBackground,
  SpotlightCard,
  GradientTextAnimated,
  GlassCard,
  ShimmerEffect,
  HoverLiftCard,
  BorderBeam,
  PageTransition,
  StaggerContainer,
  StaggerItem,
}
