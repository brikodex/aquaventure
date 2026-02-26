'use client'

/**
 * AquaVenture - Admin Dashboard
 * Premium dashboard with animated widgets, charts, and intuitive UX for non-tech users
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Anchor,
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Clock,
  Leaf,
  Star,
  Eye,
  Check,
  X,
  Plus,
  Download,
  RefreshCw,
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
  StatCard,
  StatusBadge,
  EcoBadge,
  CountUp,
  RippleButton,
  MagneticButton,
  HoverLiftRow,
  ParticleSuccess,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore } from '@/lib/admin-store'

// ============================================
// DASHBOARD PAGE
// ============================================

export default function AdminDashboard() {
  const { activities, bookings, clients } = useAdminStore()
  const [showSuccess, setShowSuccess] = useState(false)
  const [isRefreshing, setIsRefreshing] = useState(false)

  // Calculate stats
  const stats = {
    todayBookings: bookings.filter(b => b.status === 'confirmed').length,
    monthlyRevenue: bookings
      .filter(b => b.paymentStatus === 'paid')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    activeActivities: activities.filter(a => a.status === 'active').length,
    totalClients: clients.length,
    ecoActivities: activities.filter(a => a.isEcoFriendly).length,
    pendingBookings: bookings.filter(b => b.status === 'pending').length,
  }

  // Recent bookings for table
  const recentBookings = bookings.slice(0, 5)

  // Handle refresh
  const handleRefresh = async () => {
    setIsRefreshing(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setIsRefreshing(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-8">
        {/* Success Animation */}
        <ParticleSuccess show={showSuccess} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
              Tableau de bord
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Bienvenue ! Voici un aperçu de votre activité.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleRefresh}
                  disabled={isRefreshing}
                >
                  <motion.div
                    animate={isRefreshing ? { rotate: 360 } : {}}
                    transition={{ duration: 1, repeat: isRefreshing ? Infinity : 0, ease: 'linear' }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Actualiser les données</p>
              </TooltipContent>
            </Tooltip>

            <MagneticButton asChild>
              <Link href="/admin/activities/new">
                <Plus className="w-4 h-4" />
                Nouvelle activité
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Réservations du jour"
            value={stats.todayBookings}
            change={12}
            icon={Calendar}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Revenus du mois"
            value={stats.monthlyRevenue}
            change={8}
            icon={DollarSign}
            color="green"
            prefix="€"
            delay={0.1}
          />
          <StatCard
            title="Activités actives"
            value={stats.activeActivities}
            icon={Anchor}
            color="purple"
            delay={0.2}
          />
          <StatCard
            title="Clients totaux"
            value={stats.totalClients}
            change={15}
            icon={Users}
            color="amber"
            delay={0.3}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Bookings Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <GlassCard className="overflow-hidden">
              <div className="p-6 border-b border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                    Réservations récentes
                  </h2>
                  <p className="text-sm text-slate-500">Les dernières demandes de réservation</p>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" asChild>
                      <Link href="/admin/bookings">
                        Voir tout
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Voir toutes les réservations</p>
                  </TooltipContent>
                </Tooltip>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-slate-50 dark:bg-slate-800/50">
                      <th className="text-left p-4 text-sm font-medium text-slate-500">Client</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-500">Activité</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-500">Date</th>
                      <th className="text-left p-4 text-sm font-medium text-slate-500">Statut</th>
                      <th className="text-right p-4 text-sm font-medium text-slate-500">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking, index) => (
                      <HoverLiftRow key={booking.id} index={index}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-sm font-medium">
                              {booking.clientName.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200">
                                {booking.clientName}
                              </p>
                              <p className="text-xs text-slate-400">{booking.clientEmail}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">
                          {booking.activityName}
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="text-slate-600 dark:text-slate-300">{booking.date}</p>
                            <p className="text-xs text-slate-400">{booking.time}</p>
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={booking.status} pulse={booking.status === 'pending'} />
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            <CountUp value={booking.totalPrice} prefix="" suffix="€" duration={1} />
                          </span>
                        </td>
                      </HoverLiftRow>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
          </motion.div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            {/* Eco Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="p-2 rounded-xl bg-green-100 dark:bg-green-900/30"
                  >
                    <Leaf className="w-5 h-5 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                      Impact Écologique
                    </h3>
                    <p className="text-xs text-slate-500">Notre contribution durable</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-100 dark:border-green-800/30">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-slate-600 dark:text-slate-300">
                        Activités éco-certifiées
                      </span>
                      <EcoBadge label={`${stats.ecoActivities}/${activities.length}`} animated={false} />
                    </div>
                    <div className="w-full h-2 bg-green-100 dark:bg-green-900/30 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(stats.ecoActivities / activities.length) * 100}%` }}
                        transition={{ duration: 1, delay: 0.7 }}
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                      <p className="text-2xl font-bold text-green-500">
                        <CountUp value={stats.ecoActivities} duration={1.5} />
                      </p>
                      <p className="text-xs text-slate-500">Labels éco</p>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-center">
                      <p className="text-2xl font-bold text-blue-500">
                        <CountUp value={245} suffix="kg" duration={1.5} />
                      </p>
                      <p className="text-xs text-slate-500">CO2 économisé</p>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <GlassCard className="p-6">
                <h3 className="font-semibold text-slate-800 dark:text-slate-100 mb-4">
                  Actions rapides
                </h3>

                <div className="space-y-2">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                        asChild
                      >
                        <Link href="/admin/activities">
                          <Anchor className="w-4 h-4 text-blue-500" />
                          Gérer les activités
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Ajouter, modifier ou supprimer des activités</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 hover:bg-amber-50 dark:hover:bg-amber-900/20"
                        asChild
                      >
                        <Link href="/admin/bookings">
                          <Calendar className="w-4 h-4 text-amber-500" />
                          Voir les réservations
                          {stats.pendingBookings > 0 && (
                            <Badge className="ml-auto bg-amber-100 text-amber-700">
                              {stats.pendingBookings}
                            </Badge>
                          )}
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>{stats.pendingBookings} réservations en attente de confirmation</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 hover:bg-green-50 dark:hover:bg-green-900/20"
                        asChild
                      >
                        <Link href="/admin/clients">
                          <Users className="w-4 h-4 text-green-500" />
                          Base clients
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Gérer la base de données clients</p>
                    </TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-3 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                        asChild
                      >
                        <Link href="/admin/settings">
                          <DollarSign className="w-4 h-4 text-purple-500" />
                          Paramètres
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right">
                      <p>Configurer les tarifs et options</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </GlassCard>
            </motion.div>

            {/* Top Activities */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-slate-800 dark:text-slate-100">
                    Top activités
                  </h3>
                  <Star className="w-4 h-4 text-amber-500" />
                </div>

                <div className="space-y-3">
                  {activities
                    .filter(a => a.status === 'active')
                    .sort((a, b) => b.rating - a.rating)
                    .slice(0, 3)
                    .map((activity, index) => (
                      <motion.div
                        key={activity.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                      >
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700">
                          <img
                            src={activity.images[0]}
                            alt={activity.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-slate-800 dark:text-slate-200 truncate">
                            {activity.title}
                          </p>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                            <span className="text-xs text-slate-500">{activity.rating}</span>
                            {activity.isEcoFriendly && <EcoBadge label="" />}
                          </div>
                        </div>
                        <span className="font-semibold text-blue-500">{activity.price}€</span>
                      </motion.div>
                    ))}
                </div>
              </GlassCard>
            </motion.div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  )
}
