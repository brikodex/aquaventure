'use client'

/**
 * AquaVenture - Activity Detail Page
 * Hero with image carousel, booking form, similar activities, reviews
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Star,
  Leaf,
  MapPin,
  Check,
  Calendar,
  Phone,
  Mail,
  Heart,
  Share2,
  Shield,
  Fish,
  Anchor,
  ArrowRight,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel'
import { ScrollReveal, GlassCard, CountUp } from '@/components/animations/AnimatedComponents'
import { PaymentModal } from '@/components/payment/PaymentModal'
import { activities, getActivityBySlug, Activity } from '@/data/activities'

// ============================================
// DIFFICULTY CONFIG
// ============================================

const difficultyLabels = {
  beginner: 'Débutant',
  intermediate: 'Intermédiaire',
  advanced: 'Avancé',
}

const difficultyColors = {
  beginner: 'bg-nature/20 text-nature border-nature/30',
  intermediate: 'bg-sand/20 text-sand-dark border-sand/30',
  advanced: 'bg-red-500/20 text-red-500 border-red-500/30',
}

// ============================================
// ACTIVITY DETAIL PAGE
// ============================================

export default function ActivityDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const activity = getActivityBySlug(slug)

  // State
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined)
  const [selectedTime, setSelectedTime] = useState('')
  const [participants, setParticipants] = useState('1')
  const [contactName, setContactName] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  const [contactPhone, setContactPhone] = useState('')
  const [ecoDonation, setEcoDonation] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  if (!activity) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-foreground mb-4">
            Activité non trouvée
          </h1>
          <Button asChild>
            <Link href="/activities">Retour aux activités</Link>
          </Button>
        </div>
      </div>
    )
  }

  const totalPrice = activity.price * parseInt(participants) + (ecoDonation ? 5 : 0)

  // Get similar activities
  const similarActivities = activities
    .filter((a) => a.id !== activity.id && a.category === activity.category)
    .slice(0, 3)

  return (
    <div className="min-h-screen pt-20">
      {/* Hero with Image Carousel */}
      <section className="relative h-[60vh] md:h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <Image
                src={activity.images[currentImageIndex]}
                alt={activity.title.fr}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        </div>

        {/* Image Navigation */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-10">
          {activity.images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={cn(
                'w-20 h-14 rounded-lg overflow-hidden border-2 transition-all',
                index === currentImageIndex
                  ? 'border-primary scale-110'
                  : 'border-white/30 opacity-60 hover:opacity-100'
              )}
            >
              <Image
                src={activity.images[index]}
                alt={`Image ${index + 1}`}
                width={80}
                height={56}
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="outline"
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
            asChild
          >
            <Link href="/activities">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour
            </Link>
          </Button>
        </div>

        {/* Activity Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              <div className="flex flex-wrap gap-2">
                {activity.isEcoFriendly && (
                  <Badge className="bg-nature/90 text-white border-0 gap-1">
                    <Leaf className="w-3 h-3" />
                    Écoresponsable
                  </Badge>
                )}
                <Badge
                  variant="outline"
                  className={cn('backdrop-blur-sm border', difficultyColors[activity.difficulty])}
                >
                  {difficultyLabels[activity.difficulty]}
                </Badge>
                <Badge variant="outline" className="bg-white/20 backdrop-blur-sm border-white/30 text-white">
                  {activity.category === 'water-sports' && 'Sports nautiques'}
                  {activity.category === 'fishing' && 'Pêche'}
                  {activity.category === 'excursions' && 'Excursions'}
                  {activity.category === 'diving' && 'Plongée'}
                </Badge>
              </div>
              <h1 className="font-montserrat font-bold text-3xl md:text-5xl text-white">
                {activity.title.fr}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-sand fill-sand" />
                  <span className="font-semibold">{activity.rating}</span>
                  <span className="text-sm">({activity.reviewCount} avis)</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{activity.location.name}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Activity Info */}
            <div className="lg:col-span-2 space-y-8">
              {/* Quick Info */}
              <ScrollReveal>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Clock, label: 'Durée', value: activity.duration },
                    { icon: Users, label: 'Participants', value: `Max ${activity.maxParticipants}` },
                    { icon: Shield, label: 'Âge min.', value: `${activity.minAge} ans` },
                    { icon: Fish, label: 'Prix', value: `${activity.price}€/pers` },
                  ].map((item, index) => (
                    <Card key={index} className="border-border/50">
                      <CardContent className="p-4 text-center">
                        <item.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        <p className="font-montserrat font-bold text-foreground">{item.value}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollReveal>

              {/* Description */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Description</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                      {activity.description.fr}
                    </p>
                    {activity.isEcoFriendly && activity.ecoDescription && (
                      <div className="p-4 rounded-lg bg-nature/10 border border-nature/20">
                        <div className="flex items-center gap-2 mb-2">
                          <Leaf className="w-5 h-5 text-nature" />
                          <span className="font-semibold text-nature">Engagement écoresponsable</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {activity.ecoDescription.fr}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* What's Included */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Ce qui est inclus</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activity.included.fr.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-nature/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-nature" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* What to Bring */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="font-montserrat">À prévoir</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {activity.whatToBring.fr.map((item, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center">
                            <Check className="w-3 h-3 text-primary" />
                          </div>
                          <span className="text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Location */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardHeader>
                    <CardTitle className="font-montserrat">Lieu de rendez-vous</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative h-64 rounded-lg overflow-hidden bg-muted">
                      <Image
                        src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800"
                        alt={activity.location.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                        <MapPin className="w-5 h-5" />
                        <span className="font-medium">{activity.location.name}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-4">
                      Le point de rendez-vous vous sera communiqué par email après votre réservation.
                    </p>
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Reviews */}
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="font-montserrat">Avis clients</CardTitle>
                      <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-sand fill-sand" />
                        <span className="font-bold">{activity.rating}</span>
                        <span className="text-muted-foreground">({activity.reviewCount} avis)</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {[
                      {
                        name: 'Marie D.',
                        date: '15 mars 2024',
                        rating: 5,
                        comment: 'Expérience incroyable ! Les guides sont passionnés et l\'approche écoresponsable rend l\'aventure encore plus spéciale.',
                      },
                      {
                        name: 'Jean-Pierre M.',
                        date: '8 mars 2024',
                        rating: 5,
                        comment: 'Moment de pure sérénité. Notre guide naturaliste nous a expliqué l\'écosystème des mangroves. Très recommandé !',
                      },
                      {
                        name: 'Sarah J.',
                        date: '2 mars 2024',
                        rating: 5,
                        comment: 'The sustainable experience was incredible. Learning traditional techniques from local fishermen while supporting the community.',
                      },
                    ].map((review, index) => (
                      <div key={index} className="p-4 rounded-lg bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center border border-slate-200 dark:border-slate-600">
                              <span className="font-semibold text-blue-600 dark:text-blue-400">{review.name[0]}</span>
                            </div>
                            <div>
                              <p className="font-medium text-slate-900 dark:text-slate-100">{review.name}</p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">{review.date}</p>
                            </div>
                          </div>
                          <div className="flex gap-0.5">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={cn(
                                  'w-4 h-4',
                                  i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-300 dark:text-slate-600'
                                )}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-sm text-slate-600 dark:text-slate-300">{review.comment}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </ScrollReveal>
            </div>

            {/* Right Column - Booking Form */}
            <div className="lg:col-span-1">
              {/* Mobile: Fixed bottom button, Desktop: Sticky form */}
              <div className="lg:sticky lg:top-24">
                <ScrollReveal>
                  <GlassCard className="p-4 md:p-6 space-y-4 md:space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-montserrat font-bold text-lg md:text-xl text-foreground">
                        Réserver
                      </h3>
                      <div className="text-right">
                        <p className="text-xs md:text-sm text-muted-foreground">À partir de</p>
                        <p className="font-montserrat font-bold text-xl md:text-2xl text-primary">
                          {activity.price}€
                        </p>
                        <p className="text-xs text-muted-foreground">par personne</p>
                      </div>
                    </div>

                    <div className="space-y-3 md:space-y-4">
                      {/* Date Picker */}
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-medium text-sm">Date</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                'w-full justify-start text-left font-normal h-11',
                                !selectedDate && 'text-muted-foreground'
                              )}
                            >
                              <Calendar className="w-4 h-4 mr-2" />
                              <span className="truncate">
                                {selectedDate ? (
                                  selectedDate.toLocaleDateString('fr-FR', {
                                    weekday: 'short',
                                    day: 'numeric',
                                    month: 'short',
                                  })
                                ) : (
                                  'Sélectionner une date'
                                )}
                              </span>
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <CalendarComponent
                              mode="single"
                              selected={selectedDate}
                              onSelect={setSelectedDate}
                              disabled={(date) => date < new Date()}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* Time Slot */}
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-medium text-sm">Créneau horaire</Label>
                        <Select value={selectedTime} onValueChange={setSelectedTime}>
                          <SelectTrigger className="h-11">
                            <SelectValue placeholder="Sélectionner un créneau" />
                          </SelectTrigger>
                          <SelectContent>
                            {activity.schedule.map((time) => (
                              <SelectItem key={time} value={time}>
                                {time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Participants */}
                      <div className="space-y-1.5 md:space-y-2">
                        <Label className="font-medium text-sm">Participants</Label>
                        <Select value={participants} onValueChange={setParticipants}>
                          <SelectTrigger className="h-11">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[...Array(activity.maxParticipants)].map((_, i) => (
                              <SelectItem key={i + 1} value={(i + 1).toString()}>
                                {i + 1} personne{i > 0 ? 's' : ''}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-2 md:space-y-3">
                        <Label className="font-medium text-sm">Vos coordonnées</Label>
                        <Input
                          placeholder="Nom complet"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          className="h-11"
                        />
                        <Input
                          type="email"
                          placeholder="Email"
                          value={contactEmail}
                          onChange={(e) => setContactEmail(e.target.value)}
                          className="h-11"
                        />
                        <Input
                          type="tel"
                          placeholder="Téléphone"
                          value={contactPhone}
                          onChange={(e) => setContactPhone(e.target.value)}
                          className="h-11"
                        />
                      </div>

                      {/* Eco Donation */}
                      <div className="flex items-center space-x-2 p-2.5 md:p-3 rounded-lg bg-nature/10 border border-nature/20">
                        <Checkbox
                          id="eco-donation"
                          checked={ecoDonation}
                          onCheckedChange={(checked) => setEcoDonation(checked as boolean)}
                        />
                        <label
                          htmlFor="eco-donation"
                          className="text-xs md:text-sm text-muted-foreground cursor-pointer flex-1"
                        >
                          <span className="font-medium text-foreground">Don éco (+5€)</span>
                          <span className="hidden md:inline">
                            <br />
                            Soutenez nos programmes de protection marine
                          </span>
                        </label>
                      </div>

                      {/* Total */}
                      <div className="p-3 md:p-4 rounded-lg bg-primary/10 border border-primary/20">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm text-muted-foreground">Total</span>
                          <span className="font-montserrat font-bold text-xl md:text-2xl text-primary">
                            {totalPrice}€
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {participants} pers. × {activity.price}€
                          {ecoDonation && ' + 5€ éco'}
                        </p>
                      </div>

                      {/* CTA Button */}
                      <Button
                        className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 text-white font-semibold h-12 md:h-14 rounded-xl shadow-lg shadow-blue-500/30"
                        onClick={() => setShowPaymentModal(true)}
                        disabled={!selectedDate || !selectedTime || !contactName || !contactEmail || !contactPhone}
                      >
                        <Anchor className="w-4 h-4 md:w-5 md:h-5 mr-2" />
                        Réserver {totalPrice}€
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        Paiement sécurisé • Annulation gratuite 24h avant
                      </p>
                    </div>
                  </GlassCard>
                </ScrollReveal>

                {/* Actions */}
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Heart className="w-4 h-4 mr-2" />
                    Favoris
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Share2 className="w-4 h-4 mr-2" />
                    Partager
                  </Button>
                </div>

                {/* Similar Activities */}
                {similarActivities.length > 0 && (
                  <div className="mt-8">
                    <h3 className="font-montserrat font-bold text-lg text-foreground mb-4">
                      Activités similaires
                    </h3>
                    <div className="space-y-3">
                      {similarActivities.map((similar) => (
                        <Link
                          key={similar.id}
                          href={`/activities/${similar.slug}`}
                          className="block group"
                        >
                          <Card className="border-border/50 hover:border-primary/30 
                            bg-white dark:bg-slate-900 
                            hover:shadow-lg transition-all duration-300">
                            <CardContent className="p-3 flex gap-3">
                              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200 dark:border-slate-700">
                                <Image
                                  src={similar.images[0]}
                                  alt={similar.title.fr}
                                  fill
                                  className="object-cover group-hover:scale-110 transition-transform duration-300"
                                  unoptimized
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-slate-900 dark:text-slate-100 text-sm line-clamp-2 group-hover:text-primary dark:group-hover:text-blue-400 transition-colors">
                                  {similar.title.fr}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                  <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                                  <span className="text-xs text-slate-500 dark:text-slate-400">{similar.rating}</span>
                                </div>
                                <p className="font-montserrat font-bold text-blue-600 dark:text-blue-400 text-sm mt-1">
                                  {similar.price}€
                                </p>
                              </div>
                            </CardContent>
                          </Card>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={() => {
          setShowPaymentModal(false)
          setPaymentSuccess(true)
        }}
        bookingDetails={{
          activityName: activity.title.fr,
          date: selectedDate ? selectedDate.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }) : '',
          time: selectedTime,
          participants: parseInt(participants),
          pricePerPerson: activity.price,
          ecoDonation: ecoDonation ? 5 : 0,
          total: totalPrice,
          contactName,
          contactEmail,
          contactPhone,
        }}
      />

      {/* Success Message */}
      {paymentSuccess && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-6 right-6 bg-nature text-white p-4 rounded-xl shadow-lg flex items-center gap-3 z-50"
        >
          <Check className="w-6 h-6" />
          <div>
            <p className="font-semibold">Réservation confirmée !</p>
            <p className="text-sm opacity-90">Consultez votre email pour les détails.</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
