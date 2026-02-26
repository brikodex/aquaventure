'use client'

/**
 * AquaVenture - Bookings Admin Page
 * Full CRUD operations with filters, export, and stats
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  Filter,
  Download,
  Check,
  X,
  Clock,
  Users,
  Calendar,
  DollarSign,
  AlertCircle,
  ChevronRight,
  Eye,
  FileText,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import {
  GlassCard,
  StatusBadge,
  HoverLiftRow,
  Shimmer,
  MagneticButton,
  ParticleSuccess,
  CountUp,
  StatCard,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore, Booking } from '@/lib/admin-store'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

// ============================================
// BOOKINGS ADMIN PAGE
// ============================================

export default function BookingsAdminPage() {
  const { bookings, updateBooking } = useAdminStore()

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [paymentFilter, setPaymentFilter] = useState<string>('all')
  const [dateFrom, setDateFrom] = useState<Date | undefined>()
  const [dateTo, setDateTo] = useState<Date | undefined>()
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  // Filter bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.clientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.activityName.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || booking.paymentStatus === paymentFilter
    
    const bookingDate = new Date(booking.date)
    const matchesDateFrom = !dateFrom || bookingDate >= dateFrom
    const matchesDateTo = !dateTo || bookingDate <= dateTo

    return matchesSearch && matchesStatus && matchesPayment && matchesDateFrom && matchesDateTo
  })

  // Stats
  const stats = {
    total: bookings.length,
    confirmed: bookings.filter((b) => b.status === 'confirmed').length,
    pending: bookings.filter((b) => b.status === 'pending').length,
    cancelled: bookings.filter((b) => b.status === 'cancelled').length,
    completed: bookings.filter((b) => b.status === 'completed').length,
    totalRevenue: bookings
      .filter((b) => b.paymentStatus === 'paid')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    pendingRevenue: bookings
      .filter((b) => b.paymentStatus === 'pending')
      .reduce((acc, b) => acc + b.totalPrice, 0),
    totalParticipants: bookings.reduce((acc, b) => acc + b.participants, 0),
    ecoDonations: bookings.reduce((acc, b) => acc + b.ecoDonation, 0),
  }

  // Handle status update
  const handleStatusUpdate = async (booking: Booking, newStatus: Booking['status']) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    updateBooking(booking.id, { status: newStatus })
    
    setSuccessMessage(`Réservation ${newStatus === 'confirmed' ? 'confirmée' : newStatus === 'cancelled' ? 'annulée' : 'mise à jour'}`)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    setIsLoading(false)
  }

  // Handle payment update
  const handlePaymentUpdate = async (booking: Booking, newPaymentStatus: Booking['paymentStatus']) => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    updateBooking(booking.id, { paymentStatus: newPaymentStatus })
    
    setSuccessMessage(`Paiement ${newPaymentStatus === 'paid' ? 'confirmé' : 'mis à jour'}`)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    setIsLoading(false)
  }

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['ID', 'Client', 'Email', 'Téléphone', 'Activité', 'Date', 'Heure', 'Participants', 'Prix Total', 'Don Éco', 'Statut', 'Paiement']
    
    const rows = filteredBookings.map((b) => [
      b.id,
      b.clientName,
      b.clientEmail,
      b.clientPhone,
      b.activityName,
      b.date,
      b.time,
      b.participants.toString(),
      b.totalPrice.toString(),
      b.ecoDonation.toString(),
      b.status,
      b.paymentStatus,
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map((row) => row.join(',')),
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `reservations_${format(new Date(), 'yyyy-MM-dd')}.csv`
    link.click()
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6">
        {/* Success Animation */}
        <ParticleSuccess show={showSuccess} />

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100 tracking-wide uppercase">
              Gestion des Réservations
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {stats.total} réservations • {stats.totalParticipants} participants
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
                  Exporter CSV
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Télécharger les réservations filtrées</p>
              </TooltipContent>
            </Tooltip>
          </motion.div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          <StatCard
            title="Total"
            value={stats.total}
            icon={Calendar}
            color="blue"
            delay={0}
          />
          <StatCard
            title="Confirmées"
            value={stats.confirmed}
            icon={Check}
            color="green"
            delay={0.1}
          />
          <StatCard
            title="En attente"
            value={stats.pending}
            icon={Clock}
            color="amber"
            delay={0.2}
          />
          <StatCard
            title="Revenus"
            value={stats.totalRevenue}
            icon={DollarSign}
            color="purple"
            prefix="€"
            delay={0.3}
          />
          <StatCard
            title="Don Éco"
            value={stats.ecoDonations}
            icon={DollarSign}
            color="green"
            prefix="€"
            delay={0.4}
          />
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <GlassCard className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input
                  placeholder="Rechercher par client, email ou activité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-800"
                />
              </div>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-44 bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="confirmed">✅ Confirmé</SelectItem>
                  <SelectItem value="pending">⏳ En attente</SelectItem>
                  <SelectItem value="completed">✨ Terminé</SelectItem>
                  <SelectItem value="cancelled">❌ Annulé</SelectItem>
                </SelectContent>
              </Select>

              {/* Payment Filter */}
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-full lg:w-44 bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Paiement" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous paiements</SelectItem>
                  <SelectItem value="paid">💰 Payé</SelectItem>
                  <SelectItem value="pending">⏳ En attente</SelectItem>
                  <SelectItem value="refunded">↩️ Remboursé</SelectItem>
                </SelectContent>
              </Select>

              {/* Date Range */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full lg:w-auto gap-2">
                    <Calendar className="w-4 h-4" />
                    {dateFrom || dateTo ? (
                      <>
                        {dateFrom ? format(dateFrom, 'dd/MM/yy') : '...'}
                        {' - '}
                        {dateTo ? format(dateTo, 'dd/MM/yy') : '...'}
                      </>
                    ) : (
                      'Période'
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="end">
                  <div className="p-4 space-y-4">
                    <div>
                      <p className="text-sm font-medium mb-2">Du</p>
                      <CalendarComponent
                        mode="single"
                        selected={dateFrom}
                        onSelect={setDateFrom}
                        locale={fr}
                      />
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Au</p>
                      <CalendarComponent
                        mode="single"
                        selected={dateTo}
                        onSelect={setDateTo}
                        locale={fr}
                      />
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full"
                      onClick={() => {
                        setDateFrom(undefined)
                        setDateTo(undefined)
                      }}
                    >
                      Réinitialiser
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </GlassCard>
        </motion.div>

        {/* Bookings Table */}
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
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Activité</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Date & Heure</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">Participants</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Statut</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Paiement</th>
                    <th className="text-right p-4 text-sm font-medium text-slate-500">Total</th>
                    <th className="text-center p-4 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="p-4"><Shimmer className="h-12 w-48" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-32" /></td>
                        <td className="p-4"><Shimmer className="h-10 w-24" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-16 mx-auto" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-20" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-20" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-16 ml-auto" /></td>
                        <td className="p-4"><Shimmer className="h-8 w-24 mx-auto" /></td>
                      </tr>
                    ))
                  ) : filteredBookings.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                          <AlertCircle className="w-8 h-8" />
                          <p>Aucune réservation trouvée</p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredBookings.map((booking, index) => (
                      <HoverLiftRow key={booking.id} index={index}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-medium"
                            >
                              {booking.clientName.charAt(0)}
                            </motion.div>
                            <div>
                              <p className="font-medium text-slate-800 dark:text-slate-200">
                                {booking.clientName}
                              </p>
                              <p className="text-xs text-slate-400">{booking.clientEmail}</p>
                              <p className="text-xs text-slate-400">{booking.clientPhone}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <p className="font-medium text-slate-700 dark:text-slate-300">
                            {booking.activityName}
                          </p>
                          {booking.ecoDonation > 0 && (
                            <Badge variant="outline" className="text-xs text-green-600 border-green-200 mt-1">
                              🌿 +{booking.ecoDonation}€ éco
                            </Badge>
                          )}
                        </td>
                        <td className="p-4">
                          <div>
                            <p className="font-medium text-slate-700 dark:text-slate-300">
                              {format(new Date(booking.date), 'dd MMM yyyy', { locale: fr })}
                            </p>
                            <p className="text-sm text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {booking.time}
                            </p>
                          </div>
                        </td>
                        <td className="p-4 text-center">
                          <div className="flex items-center justify-center gap-1">
                            <Users className="w-4 h-4 text-slate-400" />
                            <span className="font-medium">{booking.participants}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={booking.status} pulse={booking.status === 'pending'} />
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className={cn(
                              booking.paymentStatus === 'paid' && 'border-green-200 text-green-600',
                              booking.paymentStatus === 'pending' && 'border-amber-200 text-amber-600',
                              booking.paymentStatus === 'refunded' && 'border-red-200 text-red-600'
                            )}
                          >
                            {booking.paymentStatus === 'paid' && '💰 Payé'}
                            {booking.paymentStatus === 'pending' && '⏳ En attente'}
                            {booking.paymentStatus === 'refunded' && '↩️ Remboursé'}
                          </Badge>
                        </td>
                        <td className="p-4 text-right">
                          <span className="font-bold text-slate-800 dark:text-slate-200">
                            {booking.totalPrice}€
                          </span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center gap-1">
                            {/* Quick Actions for Pending */}
                            {booking.status === 'pending' && (
                              <>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-green-500 hover:bg-green-50"
                                      onClick={() => handleStatusUpdate(booking, 'confirmed')}
                                      disabled={isLoading}
                                    >
                                      <Check className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Confirmer</p>
                                  </TooltipContent>
                                </Tooltip>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-8 w-8 text-red-500 hover:bg-red-50"
                                      onClick={() => handleStatusUpdate(booking, 'cancelled')}
                                      disabled={isLoading}
                                    >
                                      <X className="w-4 h-4" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Annuler</p>
                                  </TooltipContent>
                                </Tooltip>
                              </>
                            )}

                            {/* View Details */}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <Link href={`/admin/bookings/${booking.id}`}>
                                    <Eye className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Voir détails</p>
                              </TooltipContent>
                            </Tooltip>

                            {/* Mark Payment for Confirmed */}
                            {booking.status === 'confirmed' && booking.paymentStatus === 'pending' && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-green-500 hover:bg-green-50"
                                    onClick={() => handlePaymentUpdate(booking, 'paid')}
                                    disabled={isLoading}
                                  >
                                    <DollarSign className="w-4 h-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Marquer comme payé</p>
                                </TooltipContent>
                              </Tooltip>
                            )}
                          </div>
                        </td>
                      </HoverLiftRow>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Footer with summary */}
            {!isLoading && filteredBookings.length > 0 && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 bg-slate-50 dark:bg-slate-800/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <span className="text-slate-500">
                      <strong className="text-slate-700 dark:text-slate-300">{filteredBookings.length}</strong> réservation(s) affichée(s)
                    </span>
                    <span className="text-slate-500">
                      Total affiché: <strong className="text-green-600">{filteredBookings.reduce((acc, b) => acc + b.totalPrice, 0)}€</strong>
                    </span>
                    <span className="text-slate-500">
                      Participants: <strong className="text-slate-700 dark:text-slate-300">{filteredBookings.reduce((acc, b) => acc + b.participants, 0)}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>
      </div>
    </TooltipProvider>
  )
}
