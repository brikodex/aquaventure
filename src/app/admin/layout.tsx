'use client'

/**
 * AquaVenture - Admin Layout
 * Premium back-office with glassmorphism, animations, and intuitive navigation
 */

import React, { useEffect, useState, useSyncExternalStore } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard,
  Anchor,
  Calendar,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Waves,
  ChevronRight,
  Moon,
  Sun,
  Bell,
  Search,
  Leaf,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useAdminStore } from '@/lib/admin-store'

// ============================================
// NAVIGATION CONFIG
// ============================================

const navItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/admin',
    icon: LayoutDashboard,
    description: 'Vue d\'ensemble et statistiques',
  },
  {
    id: 'activities',
    label: 'Activités',
    href: '/admin/activities',
    icon: Anchor,
    description: 'Gérer les activités nautiques',
  },
  {
    id: 'bookings',
    label: 'Réservations',
    href: '/admin/bookings',
    icon: Calendar,
    description: 'Suivi des réservations',
  },
  {
    id: 'clients',
    label: 'Clients',
    href: '/admin/clients',
    icon: Users,
    description: 'Base de données clients',
  },
  {
    id: 'settings',
    label: 'Paramètres',
    href: '/admin/settings',
    icon: Settings,
    description: 'Configuration du compte',
  },
]

// ============================================
// ADMIN LAYOUT COMPONENT
// ============================================

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Use useSyncExternalStore for hydration-safe mounted check
  // This is the recommended React pattern for detecting client-side rendering
  const mounted = useSyncExternalStore(
    () => () => {}, // noop subscribe
    () => true, // client value
    () => false // server value
  )

  const { isAuthenticated, currentUser, logout, darkMode, toggleDarkMode } = useAdminStore()

  // Check authentication
  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push('/login')
    }
  }, [mounted, isAuthenticated, router])

  // Handle logout
  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  // Loading state
  if (!mounted || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="w-16 h-16 mx-auto mb-6 border-4 border-blue-400 border-t-transparent rounded-full"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Waves className="w-12 h-12 text-blue-400 mx-auto mb-4" />
            <p className="text-white/80">Chargement du back-office...</p>
          </motion.div>
        </motion.div>
      </div>
    )
  }

  const isActive = (href: string) => {
    if (href === '/admin') {
      return pathname === '/admin'
    }
    return pathname?.startsWith(href)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className={cn(
        'min-h-screen flex transition-colors duration-300',
        darkMode ? 'dark bg-slate-900' : 'bg-slate-50'
      )}>
        {/* Mobile Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{ x: sidebarOpen ? 0 : -280 }}
          className={cn(
            'fixed lg:static inset-y-0 left-0 z-50 w-72 flex flex-col',
            'bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl',
            'border-r border-slate-200/50 dark:border-slate-700/50',
            'lg:translate-x-0 transition-transform duration-300',
            'shadow-xl lg:shadow-none'
          )}
        >
          {/* Logo */}
          <div className="p-6 border-b border-slate-200/50 dark:border-slate-700/50">
            <Link href="/admin" className="flex items-center gap-3 group">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 5 }}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-blue-500/30"
              >
                <Waves className="w-7 h-7 text-white" />
              </motion.div>
              <div>
                <h1 className="font-bold text-lg tracking-wider bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  AQUAVENTURE
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">Back-Office</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {navItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group',
                        isActive(item.href)
                          ? 'bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/30'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                      )}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={cn(
                          'p-2 rounded-lg transition-colors',
                          isActive(item.href)
                            ? 'bg-white/20'
                            : 'bg-slate-100 dark:bg-slate-700 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/50'
                        )}
                      >
                        <item.icon className="w-5 h-5" />
                      </motion.div>
                      <div className="flex-1">
                        <span className="font-medium">{item.label}</span>
                      </div>
                      {isActive(item.href) && (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="hidden lg:block">
                    <p>{item.description}</p>
                  </TooltipContent>
                </Tooltip>
              </motion.div>
            ))}
          </nav>

          {/* Eco Badge */}
          <div className="px-4 py-2">
            <div className="p-3 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20">
              <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
                <Leaf className="w-4 h-4" />
                <span className="text-sm font-medium">Écoresponsable</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">Plateforme durable</p>
            </div>
          </div>

          {/* User & Logout */}
          <div className="p-4 border-t border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-100 dark:bg-slate-700/50 mb-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold">
                {currentUser?.name?.charAt(0) || 'A'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm truncate">{currentUser?.name}</p>
                <p className="text-xs text-slate-500 truncate">{currentUser?.email}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                Admin
              </Badge>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full justify-start gap-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </div>
        </motion.aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4">
              {/* Mobile Menu */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>

              {/* Search */}
              <div className="hidden md:flex flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-100 dark:bg-slate-700 border-0 focus-visible:ring-2 focus-visible:ring-blue-500"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {/* Dark Mode Toggle */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleDarkMode}
                      className="rounded-full"
                    >
                      <motion.div
                        initial={false}
                        animate={{ rotate: darkMode ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                      </motion.div>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{darkMode ? 'Mode clair' : 'Mode sombre'}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Notifications */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full relative">
                      <Bell className="w-5 h-5" />
                      <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 lg:p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  )
}
