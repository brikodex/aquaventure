'use client'

/**
 * AquaVenture - Clients Admin Page
 * Full client management with search and stats
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  Users,
  DollarSign,
  Calendar,
  Mail,
  Phone,
  Eye,
  TrendingUp,
  Star,
  AlertCircle,
  Download,
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
import {
  GlassCard,
  HoverLiftRow,
  Shimmer,
  StatCard,
  CountUp,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore, Client } from '@/lib/admin-store'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

// ============================================
// CLIENTS ADMIN PAGE
// ============================================

export default function ClientsAdminPage() {
  const { clients, bookings } = useAdminStore()

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'name' | 'bookings' | 'spent'>('spent')

  // Filter and sort clients
  const filteredClients = clients
    .filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        client.phone.includes(searchQuery)
      return matchesSearch
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name)
      if (sortBy === 'bookings') return b.bookingsCount - a.bookingsCount
      if (sortBy === 'spent') return b.totalSpent - a.totalSpent
      return 0
    })

  // Stats
  const stats = {
    total: clients.length,
    totalBookings: clients.reduce((acc, c) => acc + c.bookingsCount, 0),
    totalRevenue: clients.reduce((acc, c) => acc + c.totalSpent, 0),
    avgSpent: clients.length > 0 
      ? clients.reduce((acc, c) => acc + c.totalSpent, 0) / clients.length 
      : 0,
    newThisMonth: clients.filter((c) => {
      const created = new Date(c.createdAt)
      const now = new Date()
      return created.getMonth() === now.getMonth() && created.getFullYear() === now.getFullYear()
    }).length,
    vipClients: clients.filter((c) => c.totalSpent > 300).length,
  }

  // Get client bookings
  const getClientBookings = (email: string) => {
    return bookings.filter((b) => b.clientEmail === email)
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Nom', 'Email', 'Téléphone', 'Réservations', 'Total dépensé', 'Dernière réservation']
    
    const rows = filteredClients.map((c) => [
      c.name,
      c.email,
      c.phone,
      c.bookingsCount.toString(),
      c.totalSpent.toString(),
      c.lastBooking || 'N/A',
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `clients_${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
              Gestion des Clients
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {stats.total} clients • {stats.totalBookings} réservations
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" onClick={exportToCSV}>
                  <Download className="w-4 h-4 mr-2" />
                  Exporter
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Télécharger la liste des clients</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard
            title="Total Clients"
            value={stats.total}
            icon={Users}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Nouveaux ce mois"
            value={stats.newThisMonth}
            icon={TrendingUp}
            color="green"
            delay={0.1}
          />
          <StatCard
            title="Clients VIP"
            value={stats.vipClients}
            icon={Star}
            color="amber"
            delay={0.2}
          />
          <StatCard
            title="Revenus totaux"
            value={stats.totalRevenue}
            icon={DollarSign}
            color="purple"
            prefix="€"
            delay={0.3}
          />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par nom, email ou téléphone..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-800"
                />
              </div>

              {/* Sort */}
              <div className="flex gap-2">
                <Button
                  variant={sortBy === 'spent' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('spent')}
                >
                  Par dépenses
                </Button>
                <Button
                  variant={sortBy === 'bookings' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('bookings')}
                >
                  Par réservations
                </Button>
                <Button
                  variant={sortBy === 'name' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortBy('name')}
                >
                  Par nom
                </Button>
              </div>
            </div>
          </GlassCard>
        </motion.div>

        {/* Clients Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <GlassCard className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50">
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Client</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Contact</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">Réservations</th>
                    <th className="text-right p-4 text-sm font-medium text-slate-500">Total dépensé</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Dernière réservation</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                          <AlertCircle className="w-8 h-8" />
                          <p>Aucun client trouvé</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredClients.map((client, index) => {
                      const isVip = client.totalSpent > 300
                      const clientBookings = getClientBookings(client.email)
                      
                      return (
                        <HoverLiftRow key={client.id} index={index}>
                          <td className="p-4">
                            <div className="flex items-center gap-3">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                className={cn(
                                  'w-12 h-12 rounded-full flex items-center justify-center text-white font-bold',
                                  isVip
                                    ? 'bg-gradient-to-br from-amber-400 to-orange-500'
                                    : 'bg-gradient-to-br from-blue-500 to-cyan-400'
                                )}
                              >
                                {client.name.charAt(0)}
                              </motion.div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="font-medium text-slate-800 dark:text-slate-200">
                                    {client.name}
                                  </p>
                                  {isVip && (
                                    <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs">
                                      <Star className="w-3 h-3 mr-1" />
                                      VIP
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-xs text-slate-400">
                                  Client depuis {format(new Date(client.createdAt), 'MMM yyyy', { locale: fr })}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="p-4">
                            <div className="space-y-1">
                              <div className="flex items-center gap-2 text-sm">
                                <Mail className="w-3 h-3 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-300">{client.email}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-3 h-3 text-slate-400" />
                                <span className="text-slate-600 dark:text-slate-300">{client.phone}</span>
                              </div>
                            </div>
                          </td>
                          <td className="p-4 text-center">
                            <div className="flex flex-col items-center">
                              <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                                {client.bookingsCount}
                              </span>
                              {clientBookings.filter((b) => b.status === 'confirmed').length > 0 && (
                                <span className="text-xs text-green-500">
                                  {clientBookings.filter((b) => b.status === 'confirmed').length} confirmée(s)
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="p-4 text-right">
                            <span className={cn(
                              'text-lg font-bold',
                              isVip ? 'text-amber-500' : 'text-slate-800 dark:text-slate-200'
                            )}>
                              {client.totalSpent}€
                            </span>
                            {client.totalSpent > 0 && (
                              <p className="text-xs text-slate-400">
                                Moy. {(client.totalSpent / client.bookingsCount).toFixed(0)}€/résa
                              </p>
                            )}
                          </td>
                          <td className="p-4">
                            {client.lastBooking ? (
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                <span className="text-sm text-slate-600 dark:text-slate-300">
                                  {format(new Date(client.lastBooking), 'dd MMM yyyy', { locale: fr })}
                                </span>
                              </div>
                            ) : (
                              <span className="text-sm text-slate-400">-</span>
                            )}
                          </td>
                          <td className="p-4">
                            <div className="flex items-center justify-center gap-1">
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8"
                                    asChild
                                  >
                                    <Link href={`/admin/clients/${client.id}`}>
                                      <Eye className="w-4 h-4" />
                                    </Link>
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Voir le profil</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                          </td>
                        </HoverLiftRow>
                      )
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            {!filteredClients.length && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 text-center text-sm text-slate-500">
                {filteredClients.length} client(s) affiché(s)
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
