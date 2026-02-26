'use client'

/**
 * AquaVenture - Activities Admin Page
 * Full CRUD operations with search, filters, and intuitive UX
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  MoreVertical,
  Filter,
  ChevronDown,
  Check,
  X,
  Leaf,
  Star,
  Anchor,
  Clock,
  Users,
  AlertCircle,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  GlassCard,
  StatusBadge,
  EcoBadge,
  HoverLiftRow,
  Shimmer,
  MagneticButton,
  ParticleSuccess,
} from '@/components/admin/AnimatedAdminComponents'
import { useAdminStore, Activity } from '@/lib/admin-store'

// ============================================
// CATEGORY CONFIG
// ============================================

const categoryConfig = {
  'water-sports': { label: 'Sports nautiques', icon: '🏄', color: 'bg-blue-100 text-blue-700' },
  'fishing': { label: 'Pêche', icon: '🎣', color: 'bg-amber-100 text-amber-700' },
  'excursions': { label: 'Excursions', icon: '🚤', color: 'bg-purple-100 text-purple-700' },
  'diving': { label: 'Plongée', icon: '🤿', color: 'bg-cyan-100 text-cyan-700' },
}

const difficultyConfig = {
  'beginner': { label: 'Débutant', color: 'bg-green-100 text-green-700' },
  'intermediate': { label: 'Intermédiaire', color: 'bg-amber-100 text-amber-700' },
  'advanced': { label: 'Avancé', color: 'bg-red-100 text-red-700' },
}

// ============================================
// ACTIVITIES PAGE
// ============================================

export default function ActivitiesAdminPage() {
  const { activities, deleteActivity, updateActivity } = useAdminStore()

  // State
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState<string>('all')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [ecoFilter, setEcoFilter] = useState<string>('all')
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Filter activities
  const filteredActivities = activities.filter((activity) => {
    const matchesSearch =
      activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      activity.titleEn.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = categoryFilter === 'all' || activity.category === categoryFilter
    const matchesStatus = statusFilter === 'all' || activity.status === statusFilter
    const matchesEco = ecoFilter === 'all' ||
      (ecoFilter === 'eco' && activity.isEcoFriendly) ||
      (ecoFilter === 'non-eco' && !activity.isEcoFriendly)

    return matchesSearch && matchesCategory && matchesStatus && matchesEco
  })

  // Handle delete
  const handleDelete = async () => {
    if (!selectedActivity) return

    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 800))

    deleteActivity(selectedActivity.id)
    setShowDeleteDialog(false)
    setSelectedActivity(null)
    setIsLoading(false)
    setSuccessMessage('Activité supprimée avec succès')
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  // Handle status toggle
  const handleStatusToggle = async (activity: Activity) => {
    const newStatus = activity.status === 'active' ? 'draft' : 'active'
    updateActivity(activity.id, { status: newStatus })
    setSuccessMessage(`Statut mis à jour : ${newStatus === 'active' ? 'Actif' : 'Brouillon'}`)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 2000)
  }

  // Stats
  const stats = {
    total: activities.length,
    active: activities.filter((a) => a.status === 'active').length,
    draft: activities.filter((a) => a.status === 'draft').length,
    eco: activities.filter((a) => a.isEcoFriendly).length,
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
              Gestion des Activités
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              {stats.total} activités • {stats.active} actives • {stats.eco} écoresponsables
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <MagneticButton asChild>
              <Link href="/admin/activities/new">
                <Plus className="w-4 h-4" />
                Nouvelle activité
              </Link>
            </MagneticButton>
          </motion.div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total', value: stats.total, color: 'bg-slate-100 text-slate-700' },
            { label: 'Actives', value: stats.active, color: 'bg-green-100 text-green-700' },
            { label: 'Brouillons', value: stats.draft, color: 'bg-amber-100 text-amber-700' },
            { label: 'Éco', value: stats.eco, color: 'bg-emerald-100 text-emerald-700' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn('p-4 rounded-xl text-center', stat.color)}
            >
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-sm">{stat.label}</p>
            </motion.div>
          ))}
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
                  placeholder="Rechercher une activité..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white dark:bg-slate-800"
                />
              </div>

              {/* Category Filter */}
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full md:w-48 bg-white dark:bg-slate-800">
                  <Filter className="w-4 h-4 mr-2 text-slate-400" />
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes catégories</SelectItem>
                  <SelectItem value="water-sports">🏄 Sports nautiques</SelectItem>
                  <SelectItem value="fishing">🎣 Pêche</SelectItem>
                  <SelectItem value="excursions">🚤 Excursions</SelectItem>
                  <SelectItem value="diving">🤿 Plongée</SelectItem>
                </SelectContent>
              </Select>

              {/* Status Filter */}
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40 bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous statuts</SelectItem>
                  <SelectItem value="active">Actif</SelectItem>
                  <SelectItem value="draft">Brouillon</SelectItem>
                  <SelectItem value="archived">Archivé</SelectItem>
                </SelectContent>
              </Select>

              {/* Eco Filter */}
              <Select value={ecoFilter} onValueChange={setEcoFilter}>
                <SelectTrigger className="w-full md:w-40 bg-white dark:bg-slate-800">
                  <SelectValue placeholder="Éco" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous</SelectItem>
                  <SelectItem value="eco">🌿 Écoresponsable</SelectItem>
                  <SelectItem value="non-eco">Non-éco</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </GlassCard>
        </motion.div>

        {/* Activities Table */}
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
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Activité</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Catégorie</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Prix</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Durée</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Statut</th>
                    <th className="text-left p-4 text-sm font-medium text-slate-500">Note</th>
                    <th className="text-right p-4 text-sm font-medium text-slate-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    // Loading skeletons
                    Array.from({ length: 5 }).map((_, i) => (
                      <tr key={i}>
                        <td className="p-4"><Shimmer className="h-12 w-48" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-24" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-16" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-12" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-20" /></td>
                        <td className="p-4"><Shimmer className="h-6 w-16" /></td>
                        <td className="p-4"><Shimmer className="h-8 w-24 ml-auto" /></td>
                      </tr>
                    ))
                  ) : filteredActivities.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center">
                        <div className="flex flex-col items-center gap-2 text-slate-500">
                          <AlertCircle className="w-8 h-8" />
                          <p>Aucune activité trouvée</p>
                          <Button variant="outline" size="sm" asChild>
                            <Link href="/admin/activities/new">
                              <Plus className="w-4 h-4 mr-2" />
                              Créer une activité
                            </Link>
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredActivities.map((activity, index) => (
                      <HoverLiftRow key={activity.id} index={index}>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              className="w-14 h-14 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-700 flex-shrink-0"
                            >
                              <img
                                src={activity.images[0]}
                                alt={activity.title}
                                className="w-full h-full object-cover"
                              />
                            </motion.div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <p className="font-medium text-slate-800 dark:text-slate-200 truncate">
                                  {activity.title}
                                </p>
                                {activity.isEcoFriendly && <EcoBadge label="" />}
                              </div>
                              <p className="text-xs text-slate-400 truncate">
                                {activity.titleEn}
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge
                                  variant="outline"
                                  className={cn('text-xs', difficultyConfig[activity.difficulty].color)}
                                >
                                  {difficultyConfig[activity.difficulty].label}
                                </Badge>
                                <span className="text-xs text-slate-400 flex items-center gap-1">
                                  <Users className="w-3 h-3" />
                                  {activity.maxParticipants} pers
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="secondary"
                            className={categoryConfig[activity.category].color}
                          >
                            {categoryConfig[activity.category].icon} {categoryConfig[activity.category].label}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {activity.price}€
                          </span>
                          <span className="text-slate-400 text-sm">/pers</span>
                        </td>
                        <td className="p-4 text-slate-600 dark:text-slate-300">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4 text-slate-400" />
                            {activity.duration}
                          </div>
                        </td>
                        <td className="p-4">
                          <Tooltip>
                            <TooltipTrigger>
                              <button onClick={() => handleStatusToggle(activity)}>
                                <StatusBadge
                                  status={activity.status === 'active' ? 'active' : 'draft'}
                                  pulse={activity.status === 'draft'}
                                />
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Cliquer pour {activity.status === 'active' ? 'désactiver' : 'activer'}</p>
                            </TooltipContent>
                          </Tooltip>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                            <span className="font-medium text-slate-800 dark:text-slate-200">
                              {activity.rating}
                            </span>
                            <span className="text-xs text-slate-400">
                              ({activity.reviewCount})
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-end gap-1">
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <Link href={`/activities/${activity.id}`}>
                                    <Eye className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Voir sur le site</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8"
                                  asChild
                                >
                                  <Link href={`/admin/activities/${activity.id}`}>
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Modifier l'activité</p>
                              </TooltipContent>
                            </Tooltip>

                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                                  onClick={() => {
                                    setSelectedActivity(activity)
                                    setShowDeleteDialog(true)
                                  }}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>
                                <p>Supprimer</p>
                              </TooltipContent>
                            </Tooltip>
                          </div>
                        </td>
                      </HoverLiftRow>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination info */}
            {!isLoading && filteredActivities.length > 0 && (
              <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between text-sm text-slate-500">
                <span>{filteredActivities.length} activité(s) affichée(s)</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Précédent
                  </Button>
                  <Button variant="outline" size="sm" disabled>
                    Suivant
                  </Button>
                </div>
              </div>
            )}
          </GlassCard>
        </motion.div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-red-500">
                <AlertCircle className="w-5 h-5" />
                Confirmer la suppression
              </DialogTitle>
              <DialogDescription>
                Êtes-vous sûr de vouloir supprimer l'activité{' '}
                <strong className="text-foreground">{selectedActivity?.title}</strong> ?
                <br />
                Cette action est irréversible.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="flex gap-2 sm:justify-start">
              <Button
                variant="outline"
                onClick={() => setShowDeleteDialog(false)}
                disabled={isLoading}
              >
                Annuler
              </Button>
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isLoading}
              >
                {isLoading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                  />
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Supprimer
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </TooltipProvider>
  )
}
