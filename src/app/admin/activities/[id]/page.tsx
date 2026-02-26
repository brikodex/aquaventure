'use client'

/**
 * AquaVenture - Activity Edit Page
 * Complete activity form with React Hook Form + Zod validation
 */

import React, { useState, useEffect, use } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  ArrowLeft,
  Save,
  Trash2,
  Plus,
  X,
  Star,
  Leaf,
  MapPin,
  Clock,
  Users,
  AlertCircle,
  Image as ImageIcon,
  Loader2,
} from 'lucide-react'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Separator } from '@/components/ui/separator'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  GlassCard,
  MagneticButton,
  ParticleSuccess,
  AnimatedBorderGlow,
  EcoBadge,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore, Activity } from '@/lib/admin-store'

// ============================================
// FORM SCHEMA
// ============================================

const activitySchema = z.object({
  title: z.string().min(3, 'Le titre doit contenir au moins 3 caractères'),
  titleEn: z.string().min(3, 'Le titre anglais doit contenir au moins 3 caractères'),
  description: z.string().min(20, 'La description doit contenir au moins 20 caractères'),
  descriptionEn: z.string().min(20, 'La description anglaise doit contenir au moins 20 caractères'),
  category: z.enum(['water-sports', 'fishing', 'excursions', 'diving']),
  price: z.number().min(0, 'Le prix doit être positif'),
  duration: z.string().min(1, 'La durée est requise'),
  maxParticipants: z.number().min(1, 'Au moins 1 participant').max(50),
  minAge: z.number().min(0).max(100),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  images: z.array(z.string()).min(1, 'Au moins une image est requise'),
  included: z.array(z.string()).min(1, 'Au moins un élément inclus'),
  includedEn: z.array(z.string()).min(1, 'Au moins un élément inclus (EN)'),
  whatToBring: z.array(z.string()).min(1, 'Au moins un élément à apporter'),
  whatToBringEn: z.array(z.string()).min(1, 'Au moins un élément à apporter (EN)'),
  schedule: z.array(z.string()).min(1, 'Au moins un horaire requis'),
  locationName: z.string().min(1, 'Le lieu est requis'),
  locationLat: z.number(),
  locationLng: z.number(),
  isEcoFriendly: z.boolean(),
  ecoLabel: z.string().optional(),
  ecoDescription: z.string().optional(),
  ecoDescriptionEn: z.string().optional(),
  featured: z.boolean(),
  status: z.enum(['active', 'draft', 'archived']),
})

type ActivityFormData = z.infer<typeof activitySchema>

// ============================================
// CATEGORY & DIFFICULTY CONFIG
// ============================================

const categoryOptions = [
  { value: 'water-sports', label: 'Sports nautiques', icon: '🏄' },
  { value: 'fishing', label: 'Pêche', icon: '🎣' },
  { value: 'excursions', label: 'Excursions', icon: '🚤' },
  { value: 'diving', label: 'Plongée', icon: '🤿' },
]

const difficultyOptions = [
  { value: 'beginner', label: 'Débutant', color: 'bg-green-100 text-green-700' },
  { value: 'intermediate', label: 'Intermédiaire', color: 'bg-amber-100 text-amber-700' },
  { value: 'advanced', label: 'Avancé', color: 'bg-red-100 text-red-700' },
]

const statusOptions = [
  { value: 'active', label: 'Actif', color: 'bg-green-100 text-green-700' },
  { value: 'draft', label: 'Brouillon', color: 'bg-slate-100 text-slate-700' },
  { value: 'archived', label: 'Archivé', color: 'bg-red-100 text-red-700' },
]

// ============================================
// PAGE COMPONENT
// ============================================

export default function ActivityEditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const { getActivityById, updateActivity, deleteActivity } = useAdminStore()
  const [activity, setActivity] = useState<Activity | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [newImageUrl, setNewImageUrl] = useState('')

  // Load activity
  useEffect(() => {
    const foundActivity = getActivityById(id)
    if (foundActivity) {
      setActivity(foundActivity)
    } else {
      router.push('/admin/activities')
    }
  }, [id, getActivityById, router])

  // Form setup
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<ActivityFormData>({
    resolver: zodResolver(activitySchema),
    defaultValues: {
      title: '',
      titleEn: '',
      description: '',
      descriptionEn: '',
      category: 'water-sports',
      price: 0,
      duration: '1h',
      maxParticipants: 1,
      minAge: 0,
      difficulty: 'beginner',
      images: [],
      included: [],
      includedEn: [],
      whatToBring: [],
      whatToBringEn: [],
      schedule: [],
      locationName: '',
      locationLat: -16.8842,
      locationLng: 49.8756,
      isEcoFriendly: false,
      ecoLabel: '',
      ecoDescription: '',
      ecoDescriptionEn: '',
      featured: false,
      status: 'draft',
    },
  })

  // Field arrays
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control, name: 'images' as never })
  const { fields: includedFields, append: appendIncluded, remove: removeIncluded } = useFieldArray({ control, name: 'included' as never })
  const { fields: includedEnFields, append: appendIncludedEn, remove: removeIncludedEn } = useFieldArray({ control, name: 'includedEn' as never })
  const { fields: whatToBringFields, append: appendWhatToBring, remove: removeWhatToBring } = useFieldArray({ control, name: 'whatToBring' as never })
  const { fields: whatToBringEnFields, append: appendWhatToBringEn, remove: removeWhatToBringEn } = useFieldArray({ control, name: 'whatToBringEn' as never })
  const { fields: scheduleFields, append: appendSchedule, remove: removeSchedule } = useFieldArray({ control, name: 'schedule' as never })

  // Populate form when activity loads
  useEffect(() => {
    if (activity) {
      setValue('title', activity.title)
      setValue('titleEn', activity.titleEn)
      setValue('description', activity.description)
      setValue('descriptionEn', activity.descriptionEn)
      setValue('category', activity.category)
      setValue('price', activity.price)
      setValue('duration', activity.duration)
      setValue('maxParticipants', activity.maxParticipants)
      setValue('minAge', activity.minAge)
      setValue('difficulty', activity.difficulty)
      setValue('images', activity.images)
      setValue('included', activity.included)
      setValue('includedEn', activity.includedEn)
      setValue('whatToBring', activity.whatToBring)
      setValue('whatToBringEn', activity.whatToBringEn)
      setValue('schedule', activity.schedule)
      setValue('locationName', activity.location.name)
      setValue('locationLat', activity.location.coordinates.lat)
      setValue('locationLng', activity.location.coordinates.lng)
      setValue('isEcoFriendly', activity.isEcoFriendly)
      setValue('ecoLabel', activity.ecoLabel || '')
      setValue('ecoDescription', activity.ecoDescription || '')
      setValue('ecoDescriptionEn', activity.ecoDescriptionEn || '')
      setValue('featured', activity.featured)
      setValue('status', activity.status)
    }
  }, [activity, setValue])

  // Watch values
  const isEcoFriendly = watch('isEcoFriendly')
  const category = watch('category')
  const featured = watch('featured')
  const status = watch('status')

  // Handle form submit
  const onSubmit = async (data: ActivityFormData) => {
    setIsLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 800))

    updateActivity(id, {
      title: data.title,
      titleEn: data.titleEn,
      description: data.description,
      descriptionEn: data.descriptionEn,
      category: data.category,
      price: data.price,
      duration: data.duration,
      maxParticipants: data.maxParticipants,
      minAge: data.minAge,
      difficulty: data.difficulty,
      images: data.images,
      included: data.included,
      includedEn: data.includedEn,
      whatToBring: data.whatToBring,
      whatToBringEn: data.whatToBringEn,
      schedule: data.schedule,
      location: {
        name: data.locationName,
        coordinates: { lat: data.locationLat, lng: data.locationLng },
      },
      isEcoFriendly: data.isEcoFriendly,
      ecoLabel: data.ecoLabel,
      ecoDescription: data.ecoDescription,
      ecoDescriptionEn: data.ecoDescriptionEn,
      featured: data.featured,
      status: data.status,
    })

    setIsLoading(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
    toast.success('Activité mise à jour avec succès')
  }

  // Handle delete
  const handleDelete = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    deleteActivity(id)
    setShowDeleteDialog(false)
    toast.success('Activité supprimée')
    router.push('/admin/activities')
  }

  // Add image URL
  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      appendImage(newImageUrl.trim() as never)
      setNewImageUrl('')
    }
  }

  if (!activity) {
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
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Success Animation */}
        <ParticleSuccess show={showSuccess} />

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" asChild>
                  <Link href="/admin/activities">
                    <ArrowLeft className="w-5 h-5" />
                  </Link>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Retour aux activités</p>
              </TooltipContent>
            </Tooltip>
            <div>
              <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
                Modifier l'activité
              </h1>
              <p className="text-slate-500 text-sm">
                {activity.title} • ID: {activity.id}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                  onClick={() => setShowDeleteDialog(true)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Supprimer
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer définitivement</p>
              </TooltipContent>
            </Tooltip>
            <MagneticButton onClick={handleSubmit(onSubmit)} disabled={isLoading || !isDirty}>
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              Enregistrer
            </MagneticButton>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Tabs */}
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="general">Général</TabsTrigger>
              <TabsTrigger value="details">Détails</TabsTrigger>
              <TabsTrigger value="media">Médias</TabsTrigger>
              <TabsTrigger value="eco">Éco</TabsTrigger>
            </TabsList>

            {/* General Tab */}
            <TabsContent value="general" className="space-y-6 mt-6">
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  Informations générales
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Title FR */}
                  <div className="space-y-2">
                    <Label htmlFor="title">Titre (Français) *</Label>
                    <Input
                      id="title"
                      {...register('title')}
                      placeholder="Ex: Jet Ski Sensation"
                      className={errors.title ? 'border-red-500' : ''}
                    />
                    {errors.title && (
                      <p className="text-sm text-red-500">{errors.title.message}</p>
                    )}
                  </div>

                  {/* Title EN */}
                  <div className="space-y-2">
                    <Label htmlFor="titleEn">Titre (Anglais) *</Label>
                    <Input
                      id="titleEn"
                      {...register('titleEn')}
                      placeholder="Ex: Jet Ski Sensation"
                      className={errors.titleEn ? 'border-red-500' : ''}
                    />
                    {errors.titleEn && (
                      <p className="text-sm text-red-500">{errors.titleEn.message}</p>
                    )}
                  </div>

                  {/* Description FR */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="description">Description (Français) *</Label>
                    <Textarea
                      id="description"
                      {...register('description')}
                      placeholder="Décrivez l'activité en détail..."
                      rows={4}
                      className={errors.description ? 'border-red-500' : ''}
                    />
                    {errors.description && (
                      <p className="text-sm text-red-500">{errors.description.message}</p>
                    )}
                  </div>

                  {/* Description EN */}
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="descriptionEn">Description (Anglais) *</Label>
                    <Textarea
                      id="descriptionEn"
                      {...register('descriptionEn')}
                      placeholder="Describe the activity in detail..."
                      rows={4}
                      className={errors.descriptionEn ? 'border-red-500' : ''}
                    />
                    {errors.descriptionEn && (
                      <p className="text-sm text-red-500">{errors.descriptionEn.message}</p>
                    )}
                  </div>

                  {/* Category */}
                  <div className="space-y-2">
                    <Label>Catégorie *</Label>
                    <Select
                      value={category}
                      onValueChange={(value) => setValue('category', value as ActivityFormData['category'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner une catégorie" />
                      </SelectTrigger>
                      <SelectContent>
                        {categoryOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.icon} {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Status */}
                  <div className="space-y-2">
                    <Label>Statut *</Label>
                    <Select
                      value={status}
                      onValueChange={(value) => setValue('status', value as ActivityFormData['status'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner un statut" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <span className={cn('px-2 py-0.5 rounded text-xs', option.color)}>
                              {option.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </GlassCard>

              {/* Pricing & Capacity */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-4">Tarifs & Capacité</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="price">Prix (€) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register('price', { valueAsNumber: true })}
                      className={errors.price ? 'border-red-500' : ''}
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500">{errors.price.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Durée *</Label>
                    <Input
                      id="duration"
                      {...register('duration')}
                      placeholder="Ex: 1h, 2h30"
                      className={errors.duration ? 'border-red-500' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxParticipants">Max participants *</Label>
                    <Input
                      id="maxParticipants"
                      type="number"
                      {...register('maxParticipants', { valueAsNumber: true })}
                      className={errors.maxParticipants ? 'border-red-500' : ''}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="minAge">Âge minimum *</Label>
                    <Input
                      id="minAge"
                      type="number"
                      {...register('minAge', { valueAsNumber: true })}
                      className={errors.minAge ? 'border-red-500' : ''}
                    />
                  </div>
                </div>
              </GlassCard>
            </TabsContent>

            {/* Details Tab */}
            <TabsContent value="details" className="space-y-6 mt-6">
              {/* Difficulty & Location */}
              <GlassCard className="p-6">
                <h3 className="text-lg font-semibold mb-4">Difficulté & Localisation</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label>Difficulté *</Label>
                    <Select
                      value={watch('difficulty')}
                      onValueChange={(value) => setValue('difficulty', value as ActivityFormData['difficulty'])}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        {difficultyOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            <Badge className={option.color}>{option.label}</Badge>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="locationName">Lieu *</Label>
                    <Input
                      id="locationName"
                      {...register('locationName')}
                      placeholder="Ex: Plage principale"
                    />
                  </div>
                </div>
              </GlassCard>

              {/* Schedule */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Horaires</h3>
                    <p className="text-sm text-slate-500">Définissez les créneaux disponibles</p>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendSchedule('' as never)}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Ajouter
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {scheduleFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex items-center gap-1"
                    >
                      <Input
                        {...register(`schedule.${index}`)}
                        placeholder="HH:MM"
                        className="w-24"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-red-500"
                        onClick={() => removeSchedule(index)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </GlassCard>

              {/* Included Items */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Ce qui est inclus (FR)</h3>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendIncluded('' as never)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {includedFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Input
                          {...register(`included.${index}`)}
                          placeholder="Ex: Matériel complet"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeIncluded(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Ce qui est inclus (EN)</h3>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendIncludedEn('' as never)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {includedEnFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Input
                          {...register(`includedEn.${index}`)}
                          placeholder="Ex: Complete equipment"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeIncludedEn(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>

              {/* What to Bring */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">À apporter (FR)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendWhatToBring('' as never)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {whatToBringFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Input
                          {...register(`whatToBring.${index}`)}
                          placeholder="Ex: Maillot de bain"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeWhatToBring(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>

                <GlassCard className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">À apporter (EN)</h3>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => appendWhatToBringEn('' as never)}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {whatToBringEnFields.map((field, index) => (
                      <div key={field.id} className="flex items-center gap-2">
                        <Input
                          {...register(`whatToBringEn.${index}`)}
                          placeholder="Ex: Swimsuit"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-red-500"
                          onClick={() => removeWhatToBringEn(index)}
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            </TabsContent>

            {/* Media Tab */}
            <TabsContent value="media" className="space-y-6 mt-6">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Images</h3>
                    <p className="text-sm text-slate-500">Ajoutez des images pour illustrer l'activité</p>
                  </div>
                </div>

                {/* Add Image */}
                <div className="flex gap-2 mb-4">
                  <Input
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    placeholder="URL de l'image (Ex: https://...)"
                    className="flex-1"
                  />
                  <Button type="button" onClick={handleAddImage}>
                    <Plus className="w-4 h-4 mr-2" />
                    Ajouter
                  </Button>
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {imageFields.map((field, index) => (
                    <motion.div
                      key={field.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group aspect-video rounded-lg overflow-hidden bg-slate-100"
                    >
                      <img
                        src={field as unknown as string}
                        alt={`Image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          onClick={() => removeImage(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {imageFields.length === 0 && (
                  <div className="text-center py-8 text-slate-500">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p>Aucune image ajoutée</p>
                  </div>
                )}
              </GlassCard>
            </TabsContent>

            {/* Eco Tab */}
            <TabsContent value="eco" className="space-y-6 mt-6">
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Leaf className="w-5 h-5 text-green-500" />
                      Écoresponsabilité
                    </h3>
                    <p className="text-sm text-slate-500">
                      Mettez en avant les actions durables de cette activité
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={isEcoFriendly}
                      onCheckedChange={(checked) => setValue('isEcoFriendly', checked)}
                    />
                    <Label>{isEcoFriendly ? 'Écoresponsable' : 'Non éco'}</Label>
                  </div>
                </div>

                {isEcoFriendly && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="space-y-6"
                  >
                    <div className="p-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800">
                      <div className="flex items-center gap-2 mb-2">
                        <EcoBadge label="Éco-certifié" />
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Cette activité sera affichée avec le badge écoresponsable sur le site.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="ecoLabel">Label éco</Label>
                        <Input
                          id="ecoLabel"
                          {...register('ecoLabel')}
                          placeholder="Ex: Éco-certifié, Green Activity..."
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ecoDescription">Description éco (FR)</Label>
                        <Textarea
                          id="ecoDescription"
                          {...register('ecoDescription')}
                          placeholder="Décrivez les actions durables de cette activité..."
                          rows={3}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="ecoDescriptionEn">Description éco (EN)</Label>
                        <Textarea
                          id="ecoDescriptionEn"
                          {...register('ecoDescriptionEn')}
                          placeholder="Describe the sustainable actions of this activity..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </GlassCard>

              {/* Featured */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Star className="w-5 h-5 text-amber-500" />
                      Activité en vedette
                    </h3>
                    <p className="text-sm text-slate-500">
                      Les activités en vedette sont mises en avant sur la page d'accueil
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={featured}
                      onCheckedChange={(checked) => setValue('featured', checked)}
                    />
                    <Label>{featured ? 'En vedette' : 'Standard'}</Label>
                  </div>
                </div>
              </GlassCard>
            </TabsContent>
          </Tabs>
        </form>

        {/* Delete Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                Confirmer la suppression
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer l'activité{' '}
                <strong className="text-foreground">{activity.title}</strong> ?
                <br />
                Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
                Annuler
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="w-4 h-4 mr-2" />
                )}
                Supprimer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
