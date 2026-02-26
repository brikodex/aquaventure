'use client'

/**
 * AquaVenture - Admin Animated Components
 * Premium animation library for back-office with glassmorphism and subtle effects
 * Optimized for non-tech users with intuitive hover states
 */

import React, { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'

// ============================================
// GLASS CARD - Glassmorphism container
// ============================================

interface GlassCardProps {
  children: React.ReactNode
  className?: string
  glow?: boolean
  hover?: boolean
  onClick?: () => void
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  glow = false,
  hover = true,
  onClick,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Always call useTransform at top level - not inside conditional
  const background = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(59, 130, 246, 0.1), transparent 40%)`
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onClick={onClick}
      whileHover={hover ? { y: -4, scale: 1.01 } : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white/80 dark:bg-slate-800/80',
        'backdrop-blur-xl backdrop-saturate-180',
        'border border-white/20 dark:border-slate-700/50',
        'shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50',
        hover && 'cursor-pointer transition-shadow hover:shadow-2xl',
        className
      )}
    >
      {/* Spotlight effect */}
      {glow && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ============================================
// COUNT UP - Animated number counter
// ============================================

interface CountUpProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
  decimals?: number
}

export const CountUp: React.FC<CountUpProps> = ({
  value,
  duration = 1.5,
  prefix = '',
  suffix = '',
  className,
  decimals = 0,
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)

      // Easing function
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = Math.floor(eased * value * 100) / 100

      setDisplayValue(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    // Use requestAnimationFrame to defer state update
    requestAnimationFrame(animate)
  }, [value, duration])

  return (
    <span className={cn('tabular-nums', className)}>
      {prefix}
      {displayValue.toFixed(decimals)}
      {suffix}
    </span>
  )
}

// ============================================
// MAGNETIC BUTTON - Cursor attract effect
// ============================================

interface MagneticButtonProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  disabled?: boolean
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  tooltip?: string
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  disabled = false,
  variant = 'primary',
  size = 'md',
  tooltip,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const springConfig = { damping: 15, stiffness: 150 }
  const springX = useSpring(x, springConfig)
  const springY = useSpring(y, springConfig)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current || disabled) return
    const rect = buttonRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    x.set((e.clientX - centerX) * 0.3)
    y.set((e.clientY - centerY) * 0.3)
  }, [x, y, disabled])

  const handleMouseLeave = useCallback(() => {
    x.set(0)
    y.set(0)
  }, [x, y])

  const variantStyles = {
    primary: 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
    secondary: 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600',
    ghost: 'bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-lg shadow-red-500/30',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2.5 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      disabled={disabled}
      style={{ x: springX, y: springY }}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={cn(
        'relative inline-flex items-center justify-center gap-2 rounded-xl font-medium',
        'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      title={tooltip}
    >
      {children}
    </motion.button>
  )
}

// ============================================
// RIPPLE EFFECT - Click ripple animation
// ============================================

interface RippleProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

export const RippleButton: React.FC<RippleProps> = ({ children, className, onClick }) => {
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([])

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const id = Date.now()

    setRipples((prev) => [...prev, { x, y, id }])
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id))
    }, 600)

    onClick?.()
  }

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative overflow-hidden inline-flex items-center justify-center gap-2',
        'px-4 py-2.5 rounded-xl font-medium',
        'bg-gradient-to-r from-blue-500 to-cyan-400 text-white',
        'shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50',
        'transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500',
        className
      )}
    >
      {children}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute w-4 h-4 bg-white/30 rounded-full pointer-events-none"
          style={{ left: ripple.x - 8, top: ripple.y - 8 }}
        />
      ))}
    </motion.button>
  )
}

// ============================================
// STAT CARD - Animated statistics widget
// ============================================

interface StatCardProps {
  title: string
  value: number
  change?: number
  changeLabel?: string
  icon: React.ElementType
  color?: 'blue' | 'green' | 'amber' | 'purple' | 'red'
  prefix?: string
  suffix?: string
  delay?: number
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  changeLabel = 'vs mois dernier',
  icon: Icon,
  color = 'blue',
  prefix = '',
  suffix = '',
  delay = 0,
}) => {
  const colorStyles = {
    blue: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
    green: 'text-green-500 bg-green-100 dark:bg-green-900/30',
    amber: 'text-amber-500 bg-amber-100 dark:bg-amber-900/30',
    purple: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
    red: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  }

  const glowStyles = {
    blue: 'hover:shadow-blue-500/20',
    green: 'hover:shadow-green-500/20',
    amber: 'hover:shadow-amber-500/20',
    purple: 'hover:shadow-purple-500/20',
    red: 'hover:shadow-red-500/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
    >
      <GlassCard
        glow
        className={cn('p-6', glowStyles[color])}
      >
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
            <p className="text-3xl font-bold text-slate-800 dark:text-slate-100">
              <CountUp value={value} prefix={prefix} suffix={suffix} />
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            className={cn('p-3 rounded-xl', colorStyles[color])}
          >
            <Icon className="w-6 h-6" />
          </motion.div>
        </div>
        {change !== undefined && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.3 }}
            className="mt-4 flex items-center gap-1"
          >
            <span
              className={cn(
                'text-sm font-medium',
                change >= 0 ? 'text-green-500' : 'text-red-500'
              )}
            >
              {change >= 0 ? '+' : ''}{change}%
            </span>
            <span className="text-xs text-slate-400">{changeLabel}</span>
          </motion.div>
        )}
      </GlassCard>
    </motion.div>
  )
}

// ============================================
// STATUS BADGE - Animated status indicator
// ============================================

interface StatusBadgeProps {
  status: 'active' | 'pending' | 'confirmed' | 'cancelled' | 'draft' | 'completed'
  label?: string
  pulse?: boolean
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  label,
  pulse = false,
  size = 'sm',
}) => {
  const statusConfig = {
    active: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-400', label: 'Actif' },
    pending: { bg: 'bg-amber-100 dark:bg-amber-900/30', text: 'text-amber-700 dark:text-amber-400', label: 'En attente' },
    confirmed: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-400', label: 'Confirmé' },
    cancelled: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-400', label: 'Annulé' },
    draft: { bg: 'bg-slate-100 dark:bg-slate-800', text: 'text-slate-600 dark:text-slate-400', label: 'Brouillon' },
    completed: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-400', label: 'Terminé' },
  }

  const config = statusConfig[status]
  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm',
  }

  return (
    <span className={cn('relative inline-flex items-center gap-1.5 rounded-full font-medium', config.bg, config.text, sizeStyles[size])}>
      {pulse && (
        <motion.span
          animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={cn('w-1.5 h-1.5 rounded-full', status === 'pending' ? 'bg-amber-500' : 'bg-green-500')}
        />
      )}
      {label || config.label}
    </span>
  )
}

// ============================================
// ECO BADGE - Ecoresponsability indicator
// ============================================

interface EcoBadgeProps {
  label?: string
  animated?: boolean
}

export const EcoBadge: React.FC<EcoBadgeProps> = ({
  label = 'Écoresponsable',
  animated = true,
}) => {
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 text-green-700 dark:text-green-400 text-xs font-medium"
    >
      <motion.span
        animate={animated ? { rotate: [0, 10, -10, 0] } : undefined}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
      >
        🌿
      </motion.span>
      {label}
    </motion.span>
  )
}

// ============================================
// HOVER LIFT ROW - Table row with hover effect
// ============================================

interface HoverLiftRowProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  index?: number
}

export const HoverLiftRow: React.FC<HoverLiftRowProps> = ({
  children,
  className,
  onClick,
  index = 0,
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03, duration: 0.2 }}
      whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
      onClick={onClick}
      className={cn(
        'border-b border-slate-100 dark:border-slate-700/50',
        'transition-all duration-200',
        onClick && 'cursor-pointer hover:shadow-lg',
        className
      )}
    >
      {children}
    </motion.tr>
  )
}

// ============================================
// SHIMMER LOADING - Loading skeleton
// ============================================

interface ShimmerProps {
  className?: string
}

export const Shimmer: React.FC<ShimmerProps> = ({ className }) => {
  return (
    <div className={cn('relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700', className)}>
      <motion.div
        animate={{ x: ['-100%', '100%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
      />
    </div>
  )
}

// ============================================
// PARTICLE SUCCESS - Success animation burst
// ============================================

interface ParticleSuccessProps {
  show: boolean
  onComplete?: () => void
}

export const ParticleSuccess: React.FC<ParticleSuccessProps> = ({ show, onComplete }) => {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    angle: (i * 30) * (Math.PI / 180),
  }))

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          <div className="relative">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                animate={{
                  x: Math.cos(particle.angle) * 100,
                  y: Math.sin(particle.angle) * 100,
                  scale: 0,
                  opacity: 0,
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="absolute w-3 h-3 rounded-full bg-green-500"
              />
            ))}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center"
            >
              <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ============================================
// ANIMATED BORDER GLOW - Form focus glow
// ============================================

interface AnimatedBorderGlowProps {
  children: React.ReactNode
  className?: string
  active?: boolean
}

export const AnimatedBorderGlow: React.FC<AnimatedBorderGlowProps> = ({
  children,
  className,
  active = false,
}) => {
  return (
    <motion.div
      animate={active ? { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' } : {}}
      className={cn(
        'relative rounded-xl transition-all duration-300',
        active && 'ring-2 ring-blue-500/50',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// TEXT REVEAL - Animated text reveal
// ============================================

interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export const TextReveal: React.FC<TextRevealProps> = ({ children, className, delay = 0 }) => {
  const words = children.split(' ')

  return (
    <span className={cn('inline', className)}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: delay + i * 0.05, duration: 0.3 }}
          className="inline-block mr-1"
        >
          {word}
        </motion.span>
      ))}
    </span>
  )
}

// ============================================
// GRADIENT TEXT - Animated gradient text
// ============================================

interface GradientTextProps {
  children: React.ReactNode
  className?: string
  from?: string
  via?: string
  to?: string
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  from = 'from-blue-500',
  via = 'via-cyan-400',
  to = 'to-green-500',
}) => {
  return (
    <motion.span
      initial={{ backgroundPosition: '0% 50%' }}
      animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
      transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
      className={cn(
        'bg-gradient-to-r bg-clip-text text-transparent bg-[length:200%_auto]',
        from,
        via,
        to,
        className
      )}
    >
      {children}
    </motion.span>
  )
}

// ============================================
// TOOLTIP WRAPPER - Radix tooltip helper
// ============================================

interface TooltipWrapperProps {
  children: React.ReactNode
  content: string
  side?: 'top' | 'right' | 'bottom' | 'left'
}

export const TooltipWrapper: React.FC<TooltipWrapperProps> = ({
  children,
  content,
  side = 'top',
}) => {
  return (
    <div className="relative group">
      {children}
      <motion.div
        initial={{ opacity: 0, y: 5 }}
        whileHover={{ opacity: 1, y: 0 }}
        className={cn(
          'absolute z-50 px-2 py-1 text-xs rounded-lg',
          'bg-slate-800 dark:bg-slate-700 text-white',
          'whitespace-nowrap pointer-events-none',
          'opacity-0 group-hover:opacity-100 transition-opacity',
          side === 'top' && 'bottom-full left-1/2 -translate-x-1/2 mb-2',
          side === 'bottom' && 'top-full left-1/2 -translate-x-1/2 mt-2',
          side === 'left' && 'right-full top-1/2 -translate-y-1/2 mr-2',
          side === 'right' && 'left-full top-1/2 -translate-y-1/2 ml-2'
        )}
      >
        {content}
      </motion.div>
    </div>
  )
}

// ============================================
// TILT CARD - 3D perspective tilt on hover
// ============================================

interface TiltCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  glareEnable?: boolean
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className,
  maxTilt = 10,
  scale = 1.02,
  glareEnable = true,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springConfig = { damping: 20, stiffness: 300 }
  const rotateXSpring = useSpring(rotateX, springConfig)
  const rotateYSpring = useSpring(rotateY, springConfig)

  // Always call useTransform at top level - not inside conditional
  const glareBackground = useTransform(
    [rotateX, rotateY],
    ([rx, ry]) =>
      `linear-gradient(${(ry as number) * 2}deg, rgba(255,255,255,0.15) 0%, transparent 60%)`
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    rotateX.set((mouseY / (rect.height / 2)) * -maxTilt)
    rotateY.set((mouseX / (rect.width / 2)) * maxTilt)
  }, [maxTilt, rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: 'preserve-3d',
      }}
      whileHover={{ scale }}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl',
        'border border-white/20 dark:border-slate-700/50',
        'shadow-xl shadow-slate-200/50 dark:shadow-slate-900/50',
        'cursor-pointer',
        className
      )}
    >
      {glareEnable && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-10"
          style={{ background: glareBackground }}
        />
      )}
      <div style={{ transform: 'translateZ(50px)' }} className="relative z-20">
        {children}
      </div>
    </motion.div>
  )
}

// ============================================
// PULSE RING - Pulsing ring for status badges
// ============================================

interface PulseRingProps {
  children: React.ReactNode
  color?: 'green' | 'amber' | 'red' | 'blue' | 'purple'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export const PulseRing: React.FC<PulseRingProps> = ({
  children,
  color = 'green',
  size = 'md',
  className,
}) => {
  const colorStyles = {
    green: 'bg-green-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    blue: 'bg-blue-500',
    purple: 'bg-purple-500',
  }

  const sizeStyles = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  }

  return (
    <div className={cn('relative inline-flex items-center justify-center', className)}>
      {/* Pulse rings */}
      {[1, 2, 3].map((i) => (
        <motion.span
          key={i}
          initial={{ scale: 1, opacity: 0.6 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.4,
          }}
          className={cn(
            'absolute rounded-full',
            colorStyles[color],
            sizeStyles[size]
          )}
        />
      ))}
      {/* Content */}
      <div className={cn(
        'relative z-10 rounded-full flex items-center justify-center',
        colorStyles[color],
        sizeStyles[size]
      )}>
        {children}
      </div>
    </div>
  )
}

// ============================================
// HOVER LIFT CARD - Card that lifts on hover
// ============================================

interface HoverLiftCardProps {
  children: React.ReactNode
  className?: string
  liftHeight?: number
  shadowIntensity?: 'sm' | 'md' | 'lg'
  onClick?: () => void
  delay?: number
}

export const HoverLiftCard: React.FC<HoverLiftCardProps> = ({
  children,
  className,
  liftHeight = 8,
  shadowIntensity = 'md',
  onClick,
  delay = 0,
}) => {
  const shadowStyles = {
    sm: 'hover:shadow-lg',
    md: 'hover:shadow-2xl hover:shadow-blue-500/10',
    lg: 'hover:shadow-3xl hover:shadow-blue-500/20',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={{ 
        y: -liftHeight,
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative overflow-hidden rounded-2xl',
        'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl',
        'border border-white/20 dark:border-slate-700/50',
        'shadow-xl transition-shadow duration-300',
        shadowStyles[shadowIntensity],
        onClick && 'cursor-pointer',
        className
      )}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// GLOW CARD - Dynamic glow effect for table rows
// ============================================

interface GlowCardProps {
  children: React.ReactNode
  className?: string
  glowColor?: string
  active?: boolean
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  className,
  glowColor = 'rgba(59, 130, 246, 0.5)',
  active = false,
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  // Always call useTransform at top level - not inside conditional
  const glowBackground = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(300px circle at ${x}px ${y}px, ${glowColor.replace('0.5', '0.1')}, transparent 40%)`
  )

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    mouseX.set(e.clientX - rect.left)
    mouseY.set(e.clientY - rect.top)
  }, [mouseX, mouseY])

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        boxShadow: active || isHovered
          ? `0 0 30px ${glowColor}, inset 0 0 30px rgba(59, 130, 246, 0.05)`
          : 'none'
      }}
      className={cn(
        'relative overflow-hidden rounded-xl transition-all duration-300',
        'bg-white dark:bg-slate-800',
        className
      )}
    >
      {isHovered && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: glowBackground }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </motion.div>
  )
}

// ============================================
// SHIMMER EFFECT - Loading skeleton shimmer
// ============================================

interface ShimmerEffectProps {
  className?: string
  count?: number
}

export const ShimmerEffect: React.FC<ShimmerEffectProps> = ({ className, count = 1 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className={cn('relative overflow-hidden rounded-lg bg-slate-200 dark:bg-slate-700', className)}>
          <motion.div
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
        </div>
      ))}
    </>
  )
}

// ============================================
// ANIMATED COUNTER - Enhanced count up with decimals
// ============================================

interface AnimatedCounterProps {
  value: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  className?: string
  separator?: string
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  prefix = '',
  suffix = '',
  decimals = 0,
  className,
  separator = ' ',
}) => {
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    const startTime = Date.now()
    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = eased * value
      setDisplayValue(current)
      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [value, duration])

  const formattedValue = displayValue.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, separator)

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      className={cn('tabular-nums', className)}
    >
      {prefix}{formattedValue}{suffix}
    </motion.span>
  )
}

// ============================================
// EMPTY STATE - Empty state with animation
// ============================================

interface EmptyStateProps {
  icon: React.ElementType
  title: string
  description?: string
  action?: React.ReactNode
  className?: string
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon,
  title,
  description,
  action,
  className,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('flex flex-col items-center justify-center py-12 text-center', className)}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mb-4"
      >
        <Icon className="w-8 h-8 text-slate-400" />
      </motion.div>
      <h3 className="text-lg font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      {description && (
        <p className="text-sm text-slate-500 mb-4 max-w-sm">{description}</p>
      )}
      {action}
    </motion.div>
  )
}

// ============================================
// EXPORT ALL
// ============================================

export default {
  GlassCard,
  CountUp,
  MagneticButton,
  RippleButton,
  StatCard,
  StatusBadge,
  EcoBadge,
  HoverLiftRow,
  Shimmer,
  ParticleSuccess,
  AnimatedBorderGlow,
  TextReveal,
  GradientText,
  TooltipWrapper,
  TiltCard,
  PulseRing,
  HoverLiftCard,
  GlowCard,
  ShimmerEffect,
  AnimatedCounter,
  EmptyState,
}
