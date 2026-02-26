'use client'

/**
 * AquaVenture - Client Detail Page
 * Complete client profile with booking history
 */

import React, { useEffect, use, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Star,
  Users,
  TrendingUp,
  Clock,
  ChevronRight,
  Leaf,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  GlassCard,
  StatusBadge,
  HoverLiftRow,
  CountUp,
  EcoBadge,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore, Client } from '@/lib/admin-store'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

// ============================================
// PAGE COMPONENT
// ============================================

export default function ClientDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { clients, bookings } = useAdminStore()
  
  // Use useMemo for computed values - no local state needed
  const client = useMemo(() => clients.find((c) => c.id === id), [id, clients])
  const clientBookings = useMemo(() => {
    if (!client) return []
    return bookings.filter((b) => b.clientEmail === client.email)
  }, [client, bookings])

  // Redirect if client not found - use effect for side effects only
  useEffect(() => {
    if (!client) {
      const timer = setTimeout(() => {
        router.push('/admin/clients')
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [client, router])

  if (!client) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    )
  }

  // Client stats
  const clientStats = {
    totalBookings: clientBookings.length,
    confirmedBookings: clientBookings.filter((b) => b.status === 'confirmed').length,
    cancelledBookings: clientBookings.filter((b) => b.status === 'cancelled').length,
    totalSpent: clientBookings
      .filter((b) => b.paymentStatus === 'paid')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    pendingPayments: clientBookings
      .filter((b) => b.paymentStatus === 'pending')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    totalParticipants: clientBookings.reduce((acc, b) => acc + b.participants, 0),
    ecoDonations: clientBookings.reduce((acc, b) => acc + b.ecoDonation, 0),
    favoriteActivity: clientBookings.length > 0
      ? clientBookings.reduce((acc, b) => {
          const count = clientBookings.filter((bb) => bb.activityName === b.activityName).length
          return count > acc.count ? { name: b.activityName, count } : acc
        }, { name: '', count: 0 }).name
      : null,
  }

  const isVip = client.totalSpent > 300

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/clients">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Retour aux clients</p>
              </TooltipContent>
            </Tooltip>
            <div className="flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={cn(
                  'w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg',
                  isVip
                    ? 'bg-gradient-to-br from-amber-400 to-orange-500 shadow-amber-500/30'
                    : 'bg-gradient-to-br from-blue-500 to-cyan-400 shadow-blue-500/30'
                )}
              >
                {client.name.charAt(0)}
              </motion.div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                    {client.name}
                  </h1>
                  {isVip && (
                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      VIP
                    </Badge>
                  )}
                </div>
                <p className="text-slate-500">
                  Client depuis {format(new Date(client.createdAt), 'MMMM yyyy', { locale: fr })}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0 }}
          >
            <GlassCard className="p-4 text-center">
              <Calendar className="w-6 h-6 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <CountUp value={clientStats.totalBookings} />
              </p>
              <p className="text-sm text-slate-500">Réservations</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <GlassCard className="p-4 text-center">
              <DollarSign className="w-6 h-6 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <CountUp value={clientStats.totalSpent} prefix="€" />
              </p>
              <p className="text-sm text-slate-500">Total dépensé</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <GlassCard className="p-4 text-center">
              <Users className="w-6 h-6 text-purple-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <CountUp value={clientStats.totalParticipants} />
              </p>
              <p className="text-sm text-slate-500">Participants</p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <GlassCard className="p-4 text-center">
              <Leaf className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                <CountUp value={clientStats.ecoDonations} prefix="€" />
              </p>
              <p className="text-sm text-slate-500">Dons éco</p>
            </GlassCard>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Client Info */}
          <div className="space-y-6">
            {/* Contact Info */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informations de contact</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Mail className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="text-xs text-slate-500">Email</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {client.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <Phone className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="text-xs text-slate-500">Téléphone</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">
                      {client.phone}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Client Stats */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Statistiques</h3>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Confirmées</span>
                  <Badge className="bg-green-100 text-green-700">
                    {clientStats.confirmedBookings}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Annulées</span>
                  <Badge className="bg-red-100 text-red-700">
                    {clientStats.cancelledBookings}
                  </Badge>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Paiements en attente</span>
                  <span className="font-medium text-amber-600">
                    {clientStats.pendingPayments}€
                  </span>
                </div>
                {clientStats.favoriteActivity && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-slate-500">Activité préférée</span>
                    <span className="font-medium text-blue-600">
                      {clientStats.favoriteActivity}
                    </span>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* VIP Status */}
            {isVip && (
              <GlassCard className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-8 h-8 text-amber-500 fill-amber-500" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-amber-700 dark:text-amber-400">
                      Client VIP
                    </h3>
                    <p className="text-sm text-amber-600 dark:text-amber-500">
                      Plus de 300€ de dépenses
                    </p>
                  </div>
                </div>
                <p className="text-sm text-amber-600 dark:text-amber-500">
                  Ce client bénéficie de notre programme VIP avec avantages exclusifs.
                </p>
              </GlassCard>
            )}

            {/* Eco Impact */}
            {clientStats.ecoDonations > 0 && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-6 h-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold">Impact Écologique</h3>
                    <p className="text-sm text-slate-500">Contribution durable</p>
                  </div>
                </div>
                
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                  <EcoBadge label="Éco-donateur" />
                  <p className="mt-2 text-2xl font-bold text-green-600">
                    {clientStats.ecoDonations}€
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Utilisé pour la préservation des océans
                  </p>
                </div>
              </GlassCard>
            )}
          </div>

          {/* Right Column - Booking History */}
          <div className="lg:col-span-2">
            <GlassCard className="overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700/50">
                <h3 className="text-lg font-semibold">Historique des réservations</h3>
                <p className="text-sm text-slate-500">
                  {clientBookings.length} réservation(s)
                </p>
              </div>

              {clientBookings.length === 0 ? (
                <div className="p-8 text-center text-slate-500">
                  <Calendar className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Aucune réservation</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {clientBookings.map((booking, index) => (
                    <motion.div
                      key={booking.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                      <Link
                        href={`/admin/bookings/${booking.id}`}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-medium text-slate-800 dark:text-slate-200">
                              {booking.activityName}
                            </p>
                            <p className="text-sm text-slate-500 flex items-center gap-2">
                              <Clock className="w-3 h-3" />
                              {format(new Date(booking.date), 'dd MMM yyyy', { locale: fr })} à {booking.time}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <p className="font-semibold text-slate-800 dark:text-slate-200">
                              {booking.totalPrice}€
                            </p>
                            <p className="text-xs text-slate-500">
                              {booking.participants} pers.
                            </p>
                          </div>
                          <StatusBadge status={booking.status} size="sm" />
                          <ChevronRight className="w-4 h-4 text-slate-400" />
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
