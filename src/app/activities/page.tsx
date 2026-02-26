'use client'

/**
 * AquaVenture - Activities Listing Page
 * Complete activities page with filters, grid layout, and pagination
 */

import React, { useState, useMemo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Search,
  SlidersHorizontal,
  Grid3X3,
  List,
  MapPin,
  Clock,
  Users,
  Star,
  Leaf,
  Heart,
  ChevronDown,
  X,
  Anchor,
  Waves,
  Fish,
  Compass,
  Filter
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Slider } from '@/components/ui/slider'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { ScrollReveal, GlassCard } from '@/components/animations/AnimatedComponents'
import { CompactActivityCard } from '@/components/ui/advanced-card'
import { activities, Activity } from '@/data/activities'

// ============================================
// FILTER CONFIGURATION
// ============================================

const categories = [
  { value: 'water-sports', label: 'Sports nautiques', icon: '🚤' },
  { value: 'fishing', label: 'Pêche', icon: '🎣' },
  { value: 'excursions', label: 'Excursions', icon: '🏝️' },
  { value: 'diving', label: 'Plongée', icon: '🤿' },
]

const difficulties = [
  { value: 'beginner', label: 'Débutant', color: 'bg-green-500' },
  { value: 'intermediate', label: 'Intermédiaire', color: 'bg-yellow-500' },
  { value: 'advanced', label: 'Avancé', color: 'bg-orange-500' },
]

const durations = [
  { value: 'short', label: '< 1 heure', min: 0, max: 60 },
  { value: 'medium', label: '1-3 heures', min: 60, max: 180 },
  { value: 'long', label: '> 3 heures', min: 180, max: 999 },
]

// ============================================
// MAIN PAGE COMPONENT
// ============================================

const FilterSidebar: React.FC<{
  filters: {
    category: string
    minPrice: number
    maxPrice: number
    difficulty: string
    ecoOnly: boolean
    duration: string[]
  }
  setFilters: React.Dispatch<React.SetStateAction<any>>
  className?: string
}> = ({ filters, setFilters, className }) => {
  return (
    <div className={cn('space-y-6', className)}>
      {/* Category Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold">
          <span className="flex items-center gap-2">
            <Waves className="w-4 h-4 text-primary" />
            Catégorie
          </span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-2">
          {categories.map((cat) => (
            <div key={cat.value} className="flex items-center gap-2">
              <Checkbox
                id={cat.value}
                checked={filters.category === cat.value}
                onCheckedChange={(checked) => {
                  setFilters((prev: any) => ({
                    ...prev,
                    category: checked ? cat.value : ''
                  }))
                }}
              />
              <Label htmlFor={cat.value} className="flex items-center gap-2 cursor-pointer">
                <span>{cat.icon}</span>
                {cat.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Price Filter */}
      <Collapsible defaultOpen>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold">
          <span>Prix</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-4">
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            min={0}
            max={200}
            step={5}
            onValueChange={([min, max]) =>
              setFilters((prev: any) => ({ ...prev, minPrice: min, maxPrice: max }))
            }
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{filters.minPrice}€</span>
            <span>{filters.maxPrice}€</span>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Difficulty Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold">
          <span>Difficulté</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-2">
          {difficulties.map((diff) => (
            <div key={diff.value} className="flex items-center gap-2">
              <Checkbox
                id={`diff-${diff.value}`}
                checked={filters.difficulty === diff.value}
                onCheckedChange={(checked) => {
                  setFilters((prev: any) => ({
                    ...prev,
                    difficulty: checked ? diff.value : ''
                  }))
                }}
              />
              <Label htmlFor={`diff-${diff.value}`} className="flex items-center gap-2 cursor-pointer">
                <span className={cn('w-3 h-3 rounded-full', diff.color)} />
                {diff.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Duration Filter */}
      <Collapsible>
        <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-semibold">
          <span>Durée</span>
          <ChevronDown className="w-4 h-4" />
        </CollapsibleTrigger>
        <CollapsibleContent className="pt-3 space-y-2">
          {durations.map((dur) => (
            <div key={dur.value} className="flex items-center gap-2">
              <Checkbox
                id={`dur-${dur.value}`}
                checked={filters.duration.includes(dur.value)}
                onCheckedChange={(checked) => {
                  setFilters((prev: any) => ({
                    ...prev,
                    duration: checked
                      ? [...prev.duration, dur.value]
                      : prev.duration.filter((d: string) => d !== dur.value)
                  }))
                }}
              />
              <Label htmlFor={`dur-${dur.value}`} className="cursor-pointer">
                {dur.label}
              </Label>
            </div>
          ))}
        </CollapsibleContent>
      </Collapsible>

      {/* Eco Filter */}
      <div className="flex items-center gap-3 p-3 bg-nature/10 rounded-lg">
        <Checkbox
          id="eco-only"
          checked={filters.ecoOnly}
          onCheckedChange={(checked) =>
            setFilters((prev: any) => ({ ...prev, ecoOnly: !!checked }))
          }
        />
        <Label htmlFor="eco-only" className="flex items-center gap-2 cursor-pointer">
          <Leaf className="w-4 h-4 text-nature" />
          <span className="font-medium">Éco-responsable uniquement</span>
        </Label>
      </div>
    </div>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function ActivitiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  const [filters, setFilters] = useState({
    category: '',
    minPrice: 0,
    maxPrice: 200,
    difficulty: '',
    ecoOnly: false,
    duration: [] as string[],
  })

  // Filter and sort activities
  const filteredActivities = useMemo(() => {
    let result = [...activities]

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (a) =>
          a.title.fr.toLowerCase().includes(query) ||
          a.title.en.toLowerCase().includes(query) ||
          a.shortDescription.fr.toLowerCase().includes(query)
      )
    }

    // Category filter
    if (filters.category) {
      result = result.filter((a) => a.category === filters.category)
    }

    // Price filter
    result = result.filter(
      (a) => a.price >= filters.minPrice && a.price <= filters.maxPrice
    )

    // Difficulty filter
    if (filters.difficulty) {
      result = result.filter((a) => a.difficulty === filters.difficulty)
    }

    // Eco filter
    if (filters.ecoOnly) {
      result = result.filter((a) => a.isEcoFriendly)
    }

    // Sort
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return result
  }, [searchQuery, filters, sortBy])

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage)
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  // Reset page when filters change
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
    setCurrentPage(1)
  }

  // Clear all filters
  const clearFilters = () => {
    setFilters({
      category: '',
      minPrice: 0,
      maxPrice: 200,
      difficulty: '',
      ecoOnly: false,
      duration: [],
    })
    setSearchQuery('')
    setCurrentPage(1)
  }

  const hasActiveFilters =
    filters.category ||
    filters.difficulty ||
    filters.ecoOnly ||
    filters.minPrice > 0 ||
    filters.maxPrice < 200 ||
    filters.duration.length > 0

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative py-16 md:py-24 bg-gradient-to-b from-primary/10 to-background">
        <div className="absolute inset-0 hero-pattern opacity-50" />
        <div className="container-wide relative">
          <ScrollReveal className="text-center max-w-3xl mx-auto">
            <Badge className="bg-primary/10 text-primary mb-4">
              <Compass className="w-4 h-4 mr-2" />
              Nos Activités
            </Badge>
            <h1 className="font-montserrat font-bold text-3xl md:text-4xl lg:text-5xl text-foreground mb-4">
              Activités Nautiques à Sainte-Marie
            </h1>
            <p className="text-muted-foreground text-lg">
              Découvrez notre sélection d'activités nautiques écoresponsables
              pour une expérience inoubliable à Madagascar.
            </p>
          </ScrollReveal>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Rechercher une activité..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg bg-card border-border shadow-lg"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================
          MAIN CONTENT
          ============================================ */}
      <section className="py-8">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Filters Sidebar */}
            <aside className="hidden lg:block w-72 flex-shrink-0">
              <GlassCard className="sticky top-24 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-montserrat font-semibold text-lg flex items-center gap-2">
                    <Filter className="w-5 h-5" />
                    Filtres
                  </h2>
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs text-muted-foreground"
                    >
                      Effacer tout
                    </Button>
                  )}
                </div>
                <FilterSidebar filters={filters} setFilters={handleFilterChange} />
              </GlassCard>
            </aside>

            {/* Main Content */}
            <main className="flex-1">
              {/* Toolbar */}
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 p-4 bg-card rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  {/* Mobile Filter Button */}
                  <Sheet>
                    <SheetTrigger asChild className="lg:hidden">
                      <Button variant="outline" className="gap-2">
                        <SlidersHorizontal className="w-4 h-4" />
                        Filtres
                        {hasActiveFilters && (
                          <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center">
                            !
                          </Badge>
                        )}
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                          <Filter className="w-5 h-5" />
                          Filtres
                        </SheetTitle>
                        <SheetDescription>
                          Affinez votre recherche d'activités
                        </SheetDescription>
                      </SheetHeader>
                      <div className="mt-6">
                        <FilterSidebar filters={filters} setFilters={handleFilterChange} />
                        {hasActiveFilters && (
                          <Button
                            variant="outline"
                            className="w-full mt-4"
                            onClick={clearFilters}
                          >
                            Effacer tous les filtres
                          </Button>
                        )}
                      </div>
                    </SheetContent>
                  </Sheet>

                  <span className="text-sm text-muted-foreground">
                    <strong className="text-foreground">{filteredActivities.length}</strong> activités trouvées
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  {/* Sort */}
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Trier par" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Vedettes d'abord</SelectItem>
                      <SelectItem value="price-asc">Prix croissant</SelectItem>
                      <SelectItem value="price-desc">Prix décroissant</SelectItem>
                      <SelectItem value="rating">Mieux notés</SelectItem>
                    </SelectContent>
                  </Select>

                  {/* View Mode */}
                  <div className="hidden sm:flex items-center border border-border rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === 'grid' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('grid')}
                      className="rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === 'list' ? 'default' : 'ghost'}
                      size="icon"
                      onClick={() => setViewMode('list')}
                      className="rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Active Filters Tags */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {filters.category && (
                    <Badge variant="secondary" className="gap-1">
                      {categories.find((c) => c.value === filters.category)?.label}
                      <button
                        onClick={() =>
                          handleFilterChange({ ...filters, category: '' })
                        }
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.difficulty && (
                    <Badge variant="secondary" className="gap-1">
                      {difficulties.find((d) => d.value === filters.difficulty)?.label}
                      <button
                        onClick={() =>
                          handleFilterChange({ ...filters, difficulty: '' })
                        }
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                  {filters.ecoOnly && (
                    <Badge variant="secondary" className="gap-1">
                      <Leaf className="w-3 h-3" />
                      Éco-responsable
                      <button
                        onClick={() =>
                          handleFilterChange({ ...filters, ecoOnly: false })
                        }
                        className="ml-1 hover:text-destructive"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  )}
                </div>
              )}

              {/* Activities Grid */}
              {paginatedActivities.length > 0 ? (
                <div
                  className={cn(
                    'grid gap-6',
                    viewMode === 'grid'
                      ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'
                      : 'grid-cols-1'
                  )}
                >
                  {paginatedActivities.map((activity, index) => (
                    <CompactActivityCard key={activity.id} activity={activity} index={index} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                    <Search className="w-10 h-10 text-muted-foreground" />
                  </div>
                  <h3 className="font-montserrat font-semibold text-xl mb-2">
                    Aucune activité trouvée
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Essayez de modifier vos filtres ou votre recherche
                  </p>
                  <Button onClick={clearFilters} variant="outline">
                    Effacer les filtres
                  </Button>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12 flex justify-center">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                          className={cn(
                            currentPage === 1 && 'pointer-events-none opacity-50'
                          )}
                        />
                      </PaginationItem>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            onClick={() => setCurrentPage(page)}
                            isActive={currentPage === page}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                          className={cn(
                            currentPage === totalPages && 'pointer-events-none opacity-50'
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>
    </div>
  )
}
