'use client'

/**
 * AquaVenture - Smooth Scroll Provider
 * Lenis smooth scroll for premium 60fps scrolling experience
 * Disabled on mobile to prevent scroll issues
 */

import { useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check for mobile device
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Don't initialize Lenis on mobile or if user prefers reduced motion
    if (isMobile) return
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) return

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    })

    lenisRef.current = lenis

    // Animation frame loop
    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Cleanup
    return () => {
      lenis.destroy()
      lenisRef.current = null
    }
  }, [isMobile])

  // Handle anchor links
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement
      if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
        e.preventDefault()
        const id = target.getAttribute('href')?.slice(1)
        if (id) {
          const element = document.getElementById(id)
          if (element && lenisRef.current) {
            lenisRef.current.scrollTo(element, { offset: -80 })
          } else if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' })
          }
        }
      }
    }

    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [])

  return <>{children}</>
}

export default SmoothScrollProvider
