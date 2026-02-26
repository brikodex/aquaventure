'use client'

/**
 * AquaVenture - Payment Modal Component
 * Secure payment form with credit card fields - Fully scrollable and responsive
 */

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import {
  CreditCard,
  Lock,
  Check,
  AlertCircle,
  ChevronRight,
  Shield,
  Leaf,
  Calendar,
  Users,
  ChevronLeft,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ============================================
// FORM SCHEMA
// ============================================

const paymentSchema = z.object({
  cardNumber: z
    .string()
    .min(16, 'Numéro de carte invalide')
    .max(19, 'Numéro de carte invalide')
    .regex(/^[\d\s]+$/, 'Numéro de carte invalide'),
  cardHolder: z
    .string()
    .min(3, 'Nom du titulaire requis')
    .regex(/^[a-zA-Z\s]+$/, 'Nom invalide'),
  expiryDate: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, 'Format MM/AA requis'),
  cvv: z
    .string()
    .min(3, 'CVV invalide')
    .max(4, 'CVV invalide')
    .regex(/^\d+$/, 'CVV invalide'),
})

type PaymentFormData = z.infer<typeof paymentSchema>

// ============================================
// PROPS
// ============================================

interface PaymentModalProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  bookingDetails: {
    activityName: string
    date: string
    time: string
    participants: number
    pricePerPerson: number
    ecoDonation: number
    total: number
    contactName: string
    contactEmail: string
    contactPhone: string
  }
}

// ============================================
// CARD TYPE DETECTION
// ============================================

const detectCardType = (number: string): string => {
  const cleanNumber = number.replace(/\s/g, '')
  if (/^4/.test(cleanNumber)) return 'visa'
  if (/^5[1-5]/.test(cleanNumber)) return 'mastercard'
  if (/^3[47]/.test(cleanNumber)) return 'amex'
  return 'unknown'
}

// ============================================
// PAYMENT MODAL COMPONENT
// ============================================

export const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  bookingDetails,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details')
  const [progress, setProgress] = useState(0)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      cardNumber: '',
      cardHolder: '',
      expiryDate: '',
      cvv: '',
    },
  })

  const cardNumber = watch('cardNumber')
  const cardType = detectCardType(cardNumber)

  // Reset form when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStep('details')
      setProgress(0)
      reset()
    }
  }, [isOpen, reset])

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ''
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    return parts.length ? parts.join(' ') : value
  }

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const onSubmit = async (data: PaymentFormData) => {
    setStep('processing')
    setProgress(0)

    // Simulate payment processing
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 10
      })
    }, 200)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2500))

    clearInterval(interval)
    setProgress(100)

    await new Promise((resolve) => setTimeout(resolve, 500))
    setStep('success')

    setTimeout(() => {
      onSuccess()
    }, 2000)
  }

  const handleNextStep = () => {
    if (step === 'details') {
      setStep('payment')
    }
  }

  // Card icons
  const CardIcons = () => (
    <div className="flex gap-2 justify-center mb-4">
      <div
        className={cn(
          'w-12 h-8 rounded flex items-center justify-center text-xs font-bold transition-all',
          cardType === 'visa'
            ? 'bg-blue-600 text-white scale-110'
            : 'bg-muted text-muted-foreground'
        )}
      >
        VISA
      </div>
      <div
        className={cn(
          'w-12 h-8 rounded flex items-center justify-center text-xs font-bold transition-all',
          cardType === 'mastercard'
            ? 'bg-orange-500 text-white scale-110'
            : 'bg-muted text-muted-foreground'
        )}
      >
        MC
      </div>
      <div
        className={cn(
          'w-12 h-8 rounded flex items-center justify-center text-xs font-bold transition-all',
          cardType === 'amex'
            ? 'bg-blue-400 text-white scale-110'
            : 'bg-muted text-muted-foreground'
        )}
      >
        AMEX
      </div>
    </div>
  )

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent 
        className="sm:max-w-[500px] w-[95vw] max-h-[90vh] p-0 gap-0 overflow-hidden flex flex-col"
        showCloseButton={false}
      >
        {/* Fixed Header */}
        <div className="sticky top-0 z-10 bg-background border-b px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {step === 'payment' && (
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setStep('details')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <DialogTitle className="font-montserrat text-lg">
                {step === 'details' && 'Réservation'}
                {step === 'payment' && 'Paiement sécurisé'}
                {step === 'processing' && 'Traitement'}
                {step === 'success' && 'Confirmation'}
              </DialogTitle>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Step Indicators */}
        {step !== 'processing' && step !== 'success' && (
          <div className="px-4 py-3 bg-muted/30 border-b">
            <div className="flex items-center justify-center gap-2">
              <div
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  step === 'details'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-nature/20 text-nature'
                )}
              >
                {step === 'payment' ? <Check className="w-3 h-3" /> : <span>1</span>}
                <span>Détails</span>
              </div>
              <div className="w-8 h-0.5 bg-muted" />
              <div
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all',
                  step === 'payment'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}
              >
                <span>2</span>
                <span>Paiement</span>
              </div>
            </div>
          </div>
        )}

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          <AnimatePresence mode="wait">
            {/* Details Step */}
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="p-4 space-y-4"
              >
                {/* Activity Name */}
                <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                  <h3 className="font-montserrat font-bold text-lg text-foreground mb-3">
                    {bookingDetails.activityName}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar className="w-4 h-4 text-primary" />
                      <span className="truncate">{bookingDetails.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Users className="w-4 h-4 text-primary" />
                      <span>{bookingDetails.participants} personne(s)</span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Créneau :</span> {bookingDetails.time}
                  </div>
                </div>

                {/* Contact Info */}
                <div className="p-4 rounded-xl bg-muted/50">
                  <h4 className="font-medium text-sm mb-2 text-foreground">Vos coordonnées</h4>
                  <div className="space-y-1 text-sm text-muted-foreground">
                    <p className="truncate">{bookingDetails.contactName}</p>
                    <p className="truncate">{bookingDetails.contactEmail}</p>
                    <p>{bookingDetails.contactPhone}</p>
                  </div>
                </div>

                {/* Price Breakdown */}
                <div className="space-y-2 p-4 rounded-xl border">
                  <h4 className="font-medium text-sm text-foreground mb-3">Récapitulatif</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {bookingDetails.pricePerPerson}€ × {bookingDetails.participants} pers.
                      </span>
                      <span className="font-medium">
                        {bookingDetails.pricePerPerson * bookingDetails.participants}€
                      </span>
                    </div>
                    {bookingDetails.ecoDonation > 0 && (
                      <div className="flex justify-between text-sm text-nature">
                        <span className="flex items-center gap-1">
                          <Leaf className="w-3 h-3" />
                          Don écoresponsable
                        </span>
                        <span>+{bookingDetails.ecoDonation}€</span>
                      </div>
                    )}
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-3 border-t mt-3">
                    <span>Total à payer</span>
                    <span className="text-primary">{bookingDetails.total}€</span>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center gap-2 p-3 rounded-lg bg-nature/10 text-nature text-sm">
                  <Shield className="w-4 h-4" />
                  <span>Paiement 100% sécurisé</span>
                </div>
              </motion.div>
            )}

            {/* Payment Step */}
            {step === 'payment' && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-4"
              >
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  {/* Card Type Icons */}
                  <CardIcons />

                  {/* Card Number */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Numéro de carte</label>
                    <div className="relative">
                      <Input
                        {...register('cardNumber')}
                        placeholder="1234 5678 9012 3456"
                        className={cn(
                          'h-12 text-lg tracking-wide pr-10',
                          errors.cardNumber && 'border-red-500 focus-visible:ring-red-500'
                        )}
                        onChange={(e) => {
                          e.target.value = formatCardNumber(e.target.value)
                          register('cardNumber').onChange(e)
                        }}
                        maxLength={19}
                        autoComplete="cc-number"
                      />
                      <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    </div>
                    {errors.cardNumber && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.cardNumber.message}
                      </p>
                    )}
                  </div>

                  {/* Card Holder */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nom du titulaire</label>
                    <Input
                      {...register('cardHolder')}
                      placeholder="JEAN DUPONT"
                      className={cn(
                        'h-12 uppercase',
                        errors.cardHolder && 'border-red-500 focus-visible:ring-red-500'
                      )}
                      autoComplete="cc-name"
                    />
                    {errors.cardHolder && (
                      <p className="text-xs text-red-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.cardHolder.message}
                      </p>
                    )}
                  </div>

                  {/* Expiry & CVV */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">Expiration</label>
                      <Input
                        {...register('expiryDate')}
                        placeholder="MM/AA"
                        className={cn(
                          'h-12 text-center',
                          errors.expiryDate && 'border-red-500 focus-visible:ring-red-500'
                        )}
                        onChange={(e) => {
                          e.target.value = formatExpiryDate(e.target.value)
                          register('expiryDate').onChange(e)
                        }}
                        maxLength={5}
                        autoComplete="cc-exp"
                      />
                      {errors.expiryDate && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.expiryDate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">CVV</label>
                      <Input
                        {...register('cvv')}
                        placeholder="123"
                        type="password"
                        className={cn(
                          'h-12 text-center',
                          errors.cvv && 'border-red-500 focus-visible:ring-red-500'
                        )}
                        maxLength={4}
                        autoComplete="cc-csc"
                      />
                      {errors.cvv && (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.cvv.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Total */}
                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-between">
                    <span className="text-muted-foreground">Total à payer</span>
                    <span className="font-montserrat font-bold text-2xl text-primary">
                      {bookingDetails.total}€
                    </span>
                  </div>

                  {/* Security Info */}
                  <div className="flex items-center gap-2 text-xs text-muted-foreground px-1">
                    <Lock className="w-4 h-4" />
                    <span>Vos données sont cryptées et sécurisées</span>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Processing Step */}
            {step === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-6 text-center"
              >
                <div className="py-8 space-y-6">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-20 h-20 mx-auto rounded-full border-4 border-primary border-t-transparent"
                  />
                  <h3 className="font-montserrat font-bold text-xl">
                    Traitement en cours...
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    Veuillez patienter, ne fermez pas cette fenêtre
                  </p>
                  <Progress value={progress} className="h-2 max-w-xs mx-auto" />
                </div>
              </motion.div>
            )}

            {/* Success Step */}
            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center"
              >
                <div className="py-8 space-y-6">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                    className="w-20 h-20 mx-auto rounded-full bg-nature/20 flex items-center justify-center"
                  >
                    <Check className="w-10 h-10 text-nature" />
                  </motion.div>
                  <h3 className="font-montserrat font-bold text-2xl">
                    Paiement confirmé !
                  </h3>
                  <p className="text-muted-foreground max-w-xs mx-auto text-sm">
                    Votre réservation a été enregistrée. Vous recevrez un email de confirmation à{' '}
                    <span className="font-medium text-foreground">{bookingDetails.contactEmail}</span>
                  </p>
                  <Badge className="bg-nature/20 text-nature text-sm py-2 px-4">
                    <Leaf className="w-4 h-4 mr-2" />
                    Merci pour votre engagement écoresponsable
                  </Badge>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Fixed Footer with Action Buttons */}
        {step === 'details' && (
          <div className="sticky bottom-0 bg-background border-t p-4">
            <Button
              onClick={handleNextStep}
              className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30"
            >
              Procéder au paiement
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {step === 'payment' && (
          <div className="sticky bottom-0 bg-background border-t p-4">
            <Button
              onClick={handleSubmit(onSubmit)}
              className="w-full h-12 text-base rounded-xl bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold shadow-lg shadow-blue-500/30"
            >
              <Lock className="w-4 h-4 mr-2" />
              Payer {bookingDetails.total}€
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
              Paiement sécurisé SSL
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default PaymentModal
