'use client'

/**
 * AquaVenture - Booking Detail Page
 * Complete booking view with status management
 */

import React, { useState, useEffect, use, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ArrowLeft,
  Check,
  X,
  Clock,
  Users,
  MapPin,
  Mail,
  Phone,
  Calendar,
  DollarSign,
  Leaf,
  FileText,
  AlertCircle,
  Loader2,
  Send,
  MessageSquare,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  GlassCard,
  MagneticButton,
  ParticleSuccess,
  StatusBadge,
  EcoBadge,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore, Booking } from '@/lib/admin-store'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'

// ============================================
// PAGE COMPONENT
// ============================================

export default function BookingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { bookings, updateBooking } = useAdminStore()
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showCancelDialog, setShowCancelDialog] = useState(false)
  
  // Use useMemo with direct store selector for reactive updates
  const booking = useMemo(() => bookings.find((b) => b.id === id), [bookings, id])
  const [notes, setNotes] = useState(booking?.notes || '')

  // Redirect if booking not found - use effect for side effects only
  useEffect(() => {
    if (!booking) {
      const timer = setTimeout(() => {
        router.push('/admin/bookings')
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [booking, router])

  // Handle status update
  const handleStatusUpdate = async (newStatus: Booking['status']) => {
    if (!booking) return
    
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    updateBooking(booking.id, { status: newStatus })
    // No need for setBooking - Zustand store update triggers re-render
    
    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    toast.success(`Réservation ${newStatus === 'confirmed' ? 'confirmée' : newStatus === 'cancelled' ? 'annulée' : 'mise à jour'}`)
  }

  // Handle payment update
  const handlePaymentUpdate = async (newPaymentStatus: Booking['paymentStatus']) => {
    if (!booking) return
    
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    
    updateBooking(booking.id, { paymentStatus: newPaymentStatus })
    // No need for setBooking - Zustand store update triggers re-render
    
    setIsLoading(false)
    toast.success(`Paiement mis à jour`)
  }

  // Handle save notes
  const handleSaveNotes = async () => {
    if (!booking) return
    
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 300))
    
    updateBooking(booking.id, { notes })
    
    setIsLoading(false)
    toast.success('Notes enregistrées')
  }

  // Handle cancel
  const handleCancel = async () => {
    await handleStatusUpdate('cancelled')
    setShowCancelDialog(false)
    if (booking?.paymentStatus === 'paid') {
      handlePaymentUpdate('refunded')
    }
  }

  if (!booking) {
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

  return (
    <TooltipProvider delayDuration={200}>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Success Animation */}
        <ParticleSuccess show={showSuccess} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/bookings">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Retour aux réservations</p>
              </TooltipContent>
            </Tooltip>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Détail de la réservation
              </h1>
              <p className="text-slate-500 text-sm">
                #{booking.id} • Créée le {format(new Date(booking.createdAt), 'dd/MM/yyyy à HH:mm')}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <StatusBadge status={booking.status} size="md" pulse={booking.status === 'pending'} />
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-500" />
                Informations Client
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-lg font-bold">
                      {booking.clientName.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {booking.clientName}
                      </p>
                      <p className="text-sm text-slate-500">Client</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{booking.clientEmail}</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm">{booking.clientPhone}</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            {/* Activity Information */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-purple-500" />
                Détails de l'Activité
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-100 dark:border-purple-800">
                  <p className="text-sm text-slate-500 mb-1">Activité</p>
                  <p className="font-semibold text-lg text-slate-800 dark:text-slate-200">
                    {booking.activityName}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-500 mb-1">Date & Heure</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200">
                    {format(new Date(booking.date), 'EEEE dd MMMM yyyy', { locale: fr })}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4" />
                    {booking.time}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-500 mb-1">Participants</p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    {booking.participants} personne(s)
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <p className="text-sm text-slate-500 mb-1">Statut</p>
                  <Select
                    value={booking.status}
                    onValueChange={(value) => handleStatusUpdate(value as Booking['status'])}
                    disabled={isLoading || booking.status === 'cancelled'}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">⏳ En attente</SelectItem>
                      <SelectItem value="confirmed">✅ Confirmé</SelectItem>
                      <SelectItem value="completed">✨ Terminé</SelectItem>
                      <SelectItem value="cancelled" disabled>❌ Annulé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </GlassCard>

            {/* Notes */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5 text-amber-500" />
                Notes & Commentaires
              </h3>
              
              <Textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Ajoutez des notes sur cette réservation..."
                rows={4}
                className="mb-4"
              />
              
              <Button onClick={handleSaveNotes} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <FileText className="w-4 h-4 mr-2" />
                )}
                Enregistrer les notes
              </Button>
            </GlassCard>
          </div>

          {/* Right Column - Payment & Actions */}
          <div className="space-y-6">
            {/* Payment Summary */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-500" />
                Paiement
              </h3>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Prix par personne</span>
                  <span className="font-medium">{(booking.totalPrice / booking.participants).toFixed(0)}€</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                  <span className="text-slate-500">Participants</span>
                  <span className="font-medium">× {booking.participants}</span>
                </div>
                {booking.ecoDonation > 0 && (
                  <div className="flex justify-between items-center py-2 border-b border-slate-100 dark:border-slate-700">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Leaf className="w-4 h-4 text-green-500" />
                      Don éco
                    </span>
                    <span className="font-medium text-green-600">+{booking.ecoDonation}€</span>
                  </div>
                )}
                <div className="flex justify-between items-center pt-2">
                  <span className="font-semibold text-lg">Total</span>
                  <span className="font-bold text-2xl text-slate-800 dark:text-slate-200">
                    {booking.totalPrice + booking.ecoDonation}€
                  </span>
                </div>
              </div>

              <Separator className="my-4" />

              {/* Payment Status */}
              <div className="space-y-3">
                <Label>Statut du paiement</Label>
                <Select
                  value={booking.paymentStatus}
                  onValueChange={(value) => handlePaymentUpdate(value as Booking['paymentStatus'])}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paid">💰 Payé</SelectItem>
                    <SelectItem value="pending">⏳ En attente</SelectItem>
                    <SelectItem value="refunded">↩️ Remboursé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </GlassCard>

            {/* Actions */}
            <GlassCard className="p-6">
              <h3 className="text-lg font-semibold mb-4">Actions</h3>

              <div className="space-y-3">
                {booking.status === 'pending' && (
                  <>
                    <MagneticButton
                      className="w-full"
                      onClick={() => handleStatusUpdate('confirmed')}
                      disabled={isLoading}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Confirmer la réservation
                    </MagneticButton>

                    <Button
                      variant="outline"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setShowCancelDialog(true)}
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                )}

                {booking.status === 'confirmed' && (
                  <>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleStatusUpdate('completed')}
                      disabled={isLoading}
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Marquer comme terminé
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => setShowCancelDialog(true)}
                      disabled={isLoading}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Annuler
                    </Button>
                  </>
                )}

                {booking.status === 'cancelled' && (
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-center">
                    <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                    <p className="text-red-600 font-medium">Réservation annulée</p>
                    {booking.paymentStatus === 'refunded' && (
                      <Badge variant="outline" className="mt-2">
                        ↩️ Remboursé
                      </Badge>
                    )}
                  </div>
                )}

                {booking.status === 'completed' && (
                  <div className="p-4 rounded-xl bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-center">
                    <Check className="w-8 h-8 text-green-500 mx-auto mb-2" />
                    <p className="text-green-600 font-medium">Activité terminée</p>
                  </div>
                )}
              </div>
            </GlassCard>

            {/* Eco Impact */}
            {booking.ecoDonation > 0 && (
              <GlassCard className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Leaf className="w-6 h-6 text-green-500" />
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">Impact Écologique</h3>
                    <p className="text-sm text-slate-500">Contribution durable</p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                  <EcoBadge label="Éco-don" />
                  <p className="mt-2 text-lg font-bold text-green-600">
                    +{booking.ecoDonation}€
                  </p>
                  <p className="text-sm text-slate-500 mt-1">
                    Utilisé pour la préservation des océans
                  </p>
                </div>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Cancel Dialog */}
        <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                Annuler la réservation
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir annuler la réservation de{' '}
                <strong className="text-foreground">{booking.clientName}</strong> ?
                {booking.paymentStatus === 'paid' && (
                  <span className="block mt-2 text-amber-600">
                    Un remboursement sera nécessaire ({booking.totalPrice}€).
                  </span>
                )}
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCancelDialog(false)}>
                Non, garder
              </Button>
              <Button variant="destructive" onClick={handleCancel} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <X className="w-4 h-4 mr-2" />
                )}
                Oui, annuler
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
