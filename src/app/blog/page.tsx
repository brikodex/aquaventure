'use client'

/**
 * AquaVenture - Blog Page
 * Hero, featured article, grid of articles, categories sidebar, pagination
 */

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  User,
  ChevronRight,
  Tag,
  ArrowRight,
  Fish,
  Waves,
  Leaf,
  Heart,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollReveal, GlassCard } from '@/components/animations/AnimatedComponents'
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

// ============================================
// DATA
// ============================================

const categories = [
  { name: 'Tous', count: 12, icon: Waves },
  { name: 'Yachting', count: 3, icon: Waves },
  { name: 'Sports nautiques', count: 4, icon: Fish },
  { name: 'Lifestyle', count: 3, icon: Heart },
  { name: 'Écologie', count: 2, icon: Leaf },
]

const articles = [
  {
    id: 1,
    title: 'Les baleines à bosse à Sainte-Marie : Un spectacle unique au monde',
    excerpt: 'Chaque année, de juillet à septembre, les baleines à bosse migrent vers les eaux chaudes de Sainte-Marie pour mettre bas. Découvrez ce spectacle naturel exceptionnel.',
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800',
    category: 'Écologie',
    author: 'Marie Andrianarisoa',
    date: '15 Mars 2024',
    readTime: '5 min',
    featured: true,
  },
  {
    id: 2,
    title: 'Guide du débutant : Stand-Up Paddle à Sainte-Marie',
    excerpt: 'Tout ce que vous devez savoir pour débuter le SUP dans les eaux cristallines de Sainte-Marie.',
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
    category: 'Sports nautiques',
    author: 'Hery Rakotondrabe',
    date: '10 Mars 2024',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 3,
    title: 'Pêche traditionnelle malgache : Un art ancestral',
    excerpt: 'Découvrez les techniques de pêche transmises de génération en génération par les pêcheurs de Sainte-Marie.',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800',
    category: 'Lifestyle',
    author: 'Jean-Baptiste Ramanantsoa',
    date: '5 Mars 2024',
    readTime: '6 min',
    featured: false,
  },
  {
    id: 4,
    title: 'Les meilleurs spots de snorkeling à Sainte-Marie',
    excerpt: 'Explorez les récifs coralliens préservés et découvrez une biodiversité marine exceptionnelle.',
    image: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800',
    category: 'Sports nautiques',
    author: 'Marie Andrianarisoa',
    date: '28 Février 2024',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 5,
    title: 'Tourisme durable : Notre engagement pour l\'environnement',
    excerpt: 'Comment AquaVenture contribue à la préservation de l\'écosystème marin de Sainte-Marie.',
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    category: 'Écologie',
    author: 'Noro Rasoarimanana',
    date: '20 Février 2024',
    readTime: '5 min',
    featured: false,
  },
  {
    id: 6,
    title: 'Wakeboard : Conseils pour progresser rapidement',
    excerpt: 'Les techniques essentielles pour maîtriser le wakeboard et profiter des eaux plates de Sainte-Marie.',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    category: 'Sports nautiques',
    author: 'Hery Rakotondrabe',
    date: '15 Février 2024',
    readTime: '4 min',
    featured: false,
  },
  {
    id: 7,
    title: 'La cuisine de Sainte-Marie : Saveurs de l\'océan Indien',
    excerpt: 'Découvrez les spécialités culinaires de notre île, des fruits de mer frais aux épices locales.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    category: 'Lifestyle',
    author: 'Noro Rasoarimanana',
    date: '10 Février 2024',
    readTime: '5 min',
    featured: false,
  },
]

// ============================================
// BLOG PAGE COMPONENT
// ============================================

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState('Tous')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredArticles = selectedCategory === 'Tous'
    ? articles
    : articles.filter((article) => article.category === selectedCategory)

  const featuredArticle = articles.find((a) => a.featured)
  const regularArticles = filteredArticles.filter((a) => !a.featured)

  const totalPages = Math.ceil(regularArticles.length / itemsPerPage)
  const paginatedArticles = regularArticles.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const getCategoryIcon = (category: string) => {
    const cat = categories.find((c) => c.name === category)
    return cat?.icon || Waves
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[40vh] md:h-[50vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920"
            alt="Notre Blog"
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-background" />
        </div>

        <div className="relative z-10 container-wide text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <Badge className="bg-primary/20 text-primary-light border-primary/30 px-4 py-2">
              <Tag className="w-4 h-4 mr-2" />
              Notre Blog
            </Badge>
            <h1 className="font-montserrat font-bold text-4xl md:text-5xl lg:text-6xl text-white">
              Actualités & Conseils
            </h1>
            <p className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto">
              Découvrez nos articles sur les activités nautiques, l'écologie et la vie à Sainte-Marie
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Column */}
            <div className="flex-1">
              {/* Featured Article */}
              {featuredArticle && (
                <ScrollReveal className="mb-12">
                  <Link href={`/blog/${featuredArticle.id}`} className="block group">
                    <Card className="border-border/50 overflow-hidden hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500">
                      <div className="grid md:grid-cols-2">
                        <div className="relative h-64 md:h-auto">
                          <Image
                            src={featuredArticle.image}
                            alt={featuredArticle.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-700"
                            unoptimized
                          />
                          <Badge className="absolute top-4 left-4 bg-primary text-white">
                            Article à la une
                          </Badge>
                        </div>
                        <CardContent className="p-6 md:p-8 flex flex-col justify-center">
                          <Badge className="bg-nature/10 text-nature w-fit mb-3">
                            {featuredArticle.category}
                          </Badge>
                          <h2 className="font-montserrat font-bold text-2xl text-foreground mb-3 group-hover:text-primary transition-colors">
                            {featuredArticle.title}
                          </h2>
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {featuredArticle.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-1">
                              <User className="w-4 h-4" />
                              {featuredArticle.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {featuredArticle.date}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {featuredArticle.readTime}
                            </div>
                          </div>
                          <Button className="w-fit bg-primary/10 text-primary hover:bg-primary hover:text-white">
                            Lire l'article
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </ScrollReveal>
              )}

              {/* Articles Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {paginatedArticles.map((article, index) => (
                  <ScrollReveal key={article.id}>
                    <ArticleCard article={article} index={index} />
                  </ScrollReveal>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="mt-12">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage > 1) setCurrentPage(currentPage - 1)
                          }}
                          className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                setCurrentPage(page)
                              }}
                              isActive={currentPage === page}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        )
                      })}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e) => {
                            e.preventDefault()
                            if (currentPage < totalPages) setCurrentPage(currentPage + 1)
                          }}
                          className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="sticky top-24 space-y-6">
                {/* Categories */}
                <ScrollReveal>
                  <GlassCard className="p-6">
                    <h3 className="font-montserrat font-bold text-lg text-foreground mb-4">
                      Catégories
                    </h3>
                    <div className="space-y-2">
                      {categories.map((cat) => {
                        const Icon = cat.icon
                        return (
                          <button
                            key={cat.name}
                            onClick={() => {
                              setSelectedCategory(cat.name)
                              setCurrentPage(1)
                            }}
                            className={cn(
                              'w-full flex items-center justify-between p-3 rounded-lg transition-colors',
                              selectedCategory === cat.name
                                ? 'bg-primary/10 text-primary'
                                : 'hover:bg-muted/50'
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <Icon className="w-4 h-4" />
                              <span className="font-medium">{cat.name}</span>
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              {cat.count}
                            </Badge>
                          </button>
                        )
                      })}
                    </div>
                  </GlassCard>
                </ScrollReveal>

                {/* Recent Posts */}
                <ScrollReveal>
                  <GlassCard className="p-6">
                    <h3 className="font-montserrat font-bold text-lg text-foreground mb-4">
                      Articles récents
                    </h3>
                    <div className="space-y-4">
                      {articles.slice(0, 4).map((article) => (
                        <Link
                          key={article.id}
                          href={`/blog/${article.id}`}
                          className="flex gap-3 group"
                        >
                          <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={article.image}
                              alt={article.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-300"
                              unoptimized
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {article.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {article.date}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>

                {/* Newsletter */}
                <ScrollReveal>
                  <GlassCard className="p-6 bg-primary/5 border-primary/20">
                    <h3 className="font-montserrat font-bold text-lg text-foreground mb-2">
                      Newsletter
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Recevez nos derniers articles et offres exclusives
                    </p>
                    <div className="space-y-2">
                      <Input placeholder="Votre email" />
                      <Button className="w-full bg-primary hover:bg-primary/90">
                        S'inscrire
                      </Button>
                    </div>
                  </GlassCard>
                </ScrollReveal>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}

// ============================================
// ARTICLE CARD COMPONENT
// ============================================

function ArticleCard({ article, index }: { article: typeof articles[0]; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link href={`/blog/${article.id}`} className="block group">
        <Card className="border-border/50 overflow-hidden hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
          <div className="relative h-48 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              unoptimized
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            <Badge className="absolute top-3 left-3 bg-primary/90 text-white text-xs">
              {article.category}
            </Badge>
          </div>
          <CardContent className="p-5">
            <h3 className="font-montserrat font-bold text-lg text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {article.title}
            </h3>
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {article.excerpt}
            </p>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <User className="w-3 h-3" />
                {article.author}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {article.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {article.readTime}
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  )
}
