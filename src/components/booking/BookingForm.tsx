'use client'

/**
 * AquaVenture - Booking Form Component
 * Premium booking experience with calendar, participant selection, and validation
 */

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar } from '@/components/ui/calendar'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  CalendarIcon,
  Users,
  Clock,
  CreditCard,
  Check,
  Leaf,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import type { Activity } from '@/data/activities'

// ============================================
// FORM SCHEMA
// ============================================

const bookingSchema = z.object({
  date: z.date({
    required_error: 'Veuillez sélectionner une date',
  }),
  time: z.string({
    required_error: 'Veuillez sélectionner un horaire',
  }),
  participants: z.number().min(1).max(10),
  firstName: z.string().min(2, 'Minimum 2 caractères'),
  lastName: z.string().min(2, 'Minimum 2 caractères'),
  email: z.string().email('Email invalide'),
  phone: z.string().min(10, 'Numéro invalide'),
  ecoDonation: z.boolean().optional(),
  notes: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

// ============================================
// PROPS
// ============================================

interface BookingFormProps {
  activity: Activity
  onSuccess?: (data: BookingFormData) => void
  className?: string
}

// ============================================
// BOOKING FORM COMPONENT
// ============================================

export const BookingForm: React.FC<BookingFormProps> = ({
  activity,
  onSuccess,
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const form = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      participants: 1,
      ecoDonation: false,
    },
  })

  // Calculate total price
  const basePrice = activity.price * (form.watch('participants') || 1)
  const ecoDonation = form.watch('ecoDonation') ? 2 : 0
  const totalPrice = basePrice + ecoDonation

  // Available times based on activity schedule
  const availableTimes = activity.schedule

  const onSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setShowSuccess(true)
    setIsSubmitting(false)

    setTimeout(() => {
      onSuccess?.(data)
    }, 2000)
  }

  if (showSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={cn(
          'flex flex-col items-center justify-center py-12 px-6 text-center',
          className
        )}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="w-20 h-20 rounded-full bg-nature/20 flex items-center justify-center mb-6"
        >
          <Check className="w-10 h-10 text-nature" />
        </motion.div>
        <h3 className="font-montserrat font-bold text-2xl mb-2">
          Réservation confirmée !
        </h3>
        <p className="text-muted-foreground mb-4">
          Vous recevrez un email de confirmation à{' '}
          <span className="font-medium text-foreground">{form.watch('email')}</span>
        </p>
        <Badge className="bg-nature/20 text-nature">
          <Leaf className="w-3 h-3 mr-1" />
          Merci pour votre engagement écoresponsable
        </Badge>
      </motion.div>
    )
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className={cn('space-y-6', className)}>
        {/* Date & Time Selection */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* Date Picker */}
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Date
                </FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        className={cn(
                          'w-full justify-start text-left font-normal',
                          !field.value && 'text-muted-foreground'
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {field.value ? (
                          format(field.value, 'EEEE d MMMM', { locale: fr })
                        ) : (
                          'Sélectionner une date'
                        )}
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date() || date > new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)}
                      initialFocus
                      locale={fr}
                      className="rounded-md border"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Time Selection */}
          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Horaire
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Choisir un horaire" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {availableTimes.map((time) => (
                      <SelectItem key={time} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Participants */}
        <FormField
          control={form.control}
          name="participants"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Nombre de participants
              </FormLabel>
              <div className="flex items-center gap-4">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => field.onChange(Math.max(1, field.value - 1))}
                  disabled={field.value <= 1}
                >
                  -
                </Button>
                <span className="w-12 text-center font-semibold text-lg">
                  {field.value}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => field.onChange(Math.min(activity.maxParticipants, field.value + 1))}
                  disabled={field.value >= activity.maxParticipants}
                >
                  +
                </Button>
                <span className="text-sm text-muted-foreground">
                  (Max {activity.maxParticipants})
                </span>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Prénom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre prénom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom</FormLabel>
                <FormControl>
                  <Input placeholder="Votre nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="votre@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+261 32 XX XXX XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Eco Donation */}
        <FormField
          control={form.control}
          name="ecoDonation"
          render={({ field }) => (
            <FormItem>
              <label
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all',
                  field.value
                    ? 'border-nature bg-nature/10'
                    : 'border-border hover:border-nature/50'
                )}
              >
                <input
                  type="checkbox"
                  checked={field.value}
                  onChange={field.onChange}
                  className="sr-only"
                />
                <div
                  className={cn(
                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                    field.value ? 'border-nature bg-nature' : 'border-border'
                  )}
                >
                  {field.value && <Check className="w-4 h-4 text-white" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Leaf className="w-4 h-4 text-nature" />
                    <span className="font-medium">Don écoresponsable</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Ajoutez 2€ pour soutenir la protection des écosystèmes marins
                  </p>
                </div>
                <span className="font-semibold text-nature">+2€</span>
              </label>
            </FormItem>
          )}
        />

        {/* Price Summary */}
        <div className="bg-muted/50 rounded-xl p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">
              {activity.price}€ × {form.watch('participants') || 1} participant{(form.watch('participants') || 1) > 1 ? 's' : ''}
            </span>
            <span>{basePrice}€</span>
          </div>
          {form.watch('ecoDonation') && (
            <div className="flex justify-between text-sm text-nature">
              <span>Don écoresponsable</span>
              <span>+2€</span>
            </div>
          )}
          <div className="flex justify-between font-bold text-lg pt-2 border-t">
            <span>Total</span>
            <span className="text-primary">{totalPrice}€</span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          className="w-full rounded-xl h-14 text-lg"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            />
          ) : (
            <>
              <CreditCard className="w-5 h-5 mr-2" />
              Réserver pour {totalPrice}€
            </>
          )}
        </Button>

        <p className="text-xs text-center text-muted-foreground">
          Paiement sécurisé par Stripe • Annulation gratuite 24h avant
        </p>
      </form>
    </Form>
  )
}

export default BookingForm
