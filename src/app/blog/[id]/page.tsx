'use client'

/**
 * AquaVenture - Blog Article Page
 * Individual blog article detail page
 */

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  ChevronLeft,
  Clock,
  User,
  Calendar,
  Heart,
  Share2,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
  Tag,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { ScrollReveal, GlassCard } from '@/components/animations/AnimatedComponents'

// ============================================
// BLOG DATA
// ============================================

const articlesData: Record<string, {
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  authorImage: string
  date: string
  readTime: string
}> = {
  '1': {
    title: 'Les baleines à bosse à Sainte-Marie : Un spectacle unique au monde',
    excerpt: 'Chaque année, de juillet à septembre, les baleines à bosse migrent vers les eaux chaudes de Sainte-Marie pour mettre bas.',
    content: `
      <p>Chaque année, de juillet à septembre, les eaux chaudes de l'océan Indien accueillent l'un des spectacles les plus émouvants de la nature : la migration des baleines à bosse vers Sainte-Marie, Madagascar.</p>
      
      <h2>Un voyage millénaire</h2>
      <p>Ces géants des mers parcourent des milliers de kilomètres depuis les eaux froides de l'Antarctique pour rejoindre les eaux turquoise de Sainte-Marie. C'est ici qu'elles donnent naissance à leurs petits et les élèvent pendant les premiers mois de leur vie.</p>
      
      <h2>Une observation respectueuse</h2>
      <p>Chez AquaVenture, nous pratiquons une observation éthique et respectueuse. Nos bateaux maintiennent une distance sécuritaire, et nos guides naturalistes vous expliquent le comportement de ces mammifères marins exceptionnels.</p>
      
      <h2>Le saviez-vous ?</h2>
      <p>Les baleines à bosse sont connues pour leurs chants complexes qui peuvent s'entendre sur des kilomètres. Ces chants jouent un rôle crucial dans la communication et la séduction.</p>
      
      <h2>Conseils pour votre excursion</h2>
      <ul>
        <li>Apportez des jumelles pour mieux observer</li>
        <li>Prévoyez une protection solaire résistante à l'eau</li>
        <li>Gardez silence pour ne pas effrayer les animaux</li>
        <li>Soyez patient - la nature suit son propre rythme</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1568430462989-44163eb1752f?w=800',
    category: 'Écologie',
    author: 'Marie Andrianarisoa',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    date: '15 Mars 2024',
    readTime: '5 min',
  },
  '2': {
    title: 'Guide du débutant : Stand-Up Paddle à Sainte-Marie',
    excerpt: 'Tout ce que vous devez savoir pour débuter le SUP dans les eaux cristallines de Sainte-Marie.',
    content: `
      <p>Le Stand-Up Paddle (SUP) est l'activité nautique idéale pour explorer les eaux calmes de Sainte-Marie tout en profitant d'un moment de sérénité absolue.</p>
      
      <h2>Pourquoi le SUP à Sainte-Marie ?</h2>
      <p>Les eaux cristallines et peu profondes de notre lagune offrent des conditions parfaites pour les débutants. Vous pourrez observer les tortues marines, les poissons tropicaux et les magnifiques mangroves qui bordent notre île.</p>
      
      <h2>Équipement nécessaire</h2>
      <p>Chez AquaVenture, nous fournissons tout l'équipement nécessaire : planche SUP premium, pagaie légère, gilet de sécurité et leash. Vous n'avez qu'à apporter votre maillot de bain et votre sourire !</p>
      
      <h2>Conseils pour débuter</h2>
      <ul>
        <li>Commencez par genoux sur la planche pour trouver votre équilibre</li>
        <li>Levez-vous progressivement, un pied après l'autre</li>
        <li>Gardez vos genoux légèrement fléchis</li>
        <li>Regardez l'horizon, pas vos pieds !</li>
        <li>Paginez de manière fluide et régulière</li>
      </ul>
      
      <h2>Nos meilleurs spots</h2>
      <p>Notre spot favori est la mangrove de l'Île aux Nattes, accessible en début de matinée quand l'eau est particulièrement calme et transparente.</p>
    `,
    image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?w=800',
    category: 'Sports nautiques',
    author: 'Hery Rakotondrabe',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    date: '10 Mars 2024',
    readTime: '4 min',
  },
  '3': {
    title: 'Pêche traditionnelle malgache : Un art ancestral',
    excerpt: 'Découvrez les techniques de pêche transmises de génération en génération par les pêcheurs de Sainte-Marie.',
    content: `
      <p>La pêche traditionnelle à Sainte-Marie est bien plus qu'une activité : c'est un art ancestral transmis de génération en génération.</p>
      
      <h2>Une tradition vivante</h2>
      <p>Les pêcheurs de Sainte-Marie perpétuent des techniques ancestrales qui respectent l'équilibre fragile de l'écosystème marin. En pirogue, à la voile ou à la rame, ils partent chaque jour à la rencontre des poissons.</p>
      
      <h2>Notre engagement</h2>
      <p>AquaVenture travaille en partenariat avec plus de 50 familles de pêcheurs locaux. Chaque excursion de pêche durable contribue directement à leur subsistance tout en préservant les ressources marines.</p>
      
      <h2>Techniques respectueuses</h2>
      <ul>
        <li>Pêche à la ligne selective</li>
        <li>Filets à mailles larges pour éviter les prises accidentelles</li>
        <li>Respect des saisons de reproduction</li>
        <li>Partage équitable des prises</li>
      </ul>
      
      <h2>Une expérience authentique</h2>
      <p>Participer à notre excursion de pêche durable, c'est vivre un moment d'échange authentique avec les habitants de Sainte-Marie et comprendre leur lien profond avec l'océan.</p>
    `,
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=800',
    category: 'Lifestyle',
    author: 'Jean-Baptiste Ramanantsoa',
    authorImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    date: '5 Mars 2024',
    readTime: '6 min',
  },
  '4': {
    title: 'Les meilleurs spots de snorkeling à Sainte-Marie',
    excerpt: 'Explorez les récifs coralliens préservés et découvrez une biodiversité marine exceptionnelle.',
    content: `
      <p>Sainte-Marie abrite certains des récifs coralliens les mieux préservés de l'océan Indien occidental.</p>
      
      <h2>Un trésor de biodiversité</h2>
      <p>Nos récifs abritent plus de 300 espèces de poissons tropicaux, des coraux multicolores, des tortues marines et parfois même des dauphins curieux.</p>
      
      <h2>Nos spots préférés</h2>
      <ul>
        <li><strong>Récif de l'Île aux Nattes</strong> - Idéal pour les débutants, eau peu profonde</li>
        <li><strong>Passe de Sainte-Marie</strong> - Pour les plus expérimentés, courants modérés</li>
        <li><strong>Jardin de Corail</strong> - Une symphonie de couleurs</li>
      </ul>
      
      <h2>Éco-responsabilité</h2>
      <p>Nous utilisons des crèmes solaires récif-friendly et formons nos visiteurs aux gestes qui préservent les coraux : ne pas toucher, ne pas marcher sur les coraux, garder une distance respectueuse avec la faune.</p>
    `,
    image: 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?w=800',
    category: 'Sports nautiques',
    author: 'Marie Andrianarisoa',
    authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    date: '28 Février 2024',
    readTime: '4 min',
  },
  '5': {
    title: 'Tourisme durable : Notre engagement pour l\'environnement',
    excerpt: 'Comment AquaVenture contribue à la préservation de l\'écosystème marin de Sainte-Marie.',
    content: `
      <p>Le tourisme durable n'est pas un slogan chez AquaVenture, c'est un engagement quotidien.</p>
      
      <h2>Notre philosophie</h2>
      <p>Nous croyons que le tourisme peut être une force positive. Chaque excursion que nous organisons contribue à la préservation de l'écosystème marin et au bien-être des communautés locales.</p>
      
      <h2>Nos actions concrètes</h2>
      <ul>
        <li>20% de nos bénéfices reversés aux associations de protection marine</li>
        <li>Partenariat avec plus de 50 familles de pêcheurs locaux</li>
        <li>Utilisation de moteurs 4 temps basse émission</li>
        <li>Formation continue de nos équipes à l'éco-responsabilité</li>
        <li>Sensibilisation de nos visiteurs</li>
      </ul>
      
      <h2>Certification</h2>
      <p>En 2021, nous avons obtenu la certification "Tourisme Durable Madagascar", reconnaissance de notre engagement envers l'environnement et les communautés locales.</p>
    `,
    image: 'https://images.unsplash.com/photo-1519046904884-53103b34b206?w=800',
    category: 'Écologie',
    author: 'Noro Rasoarimanana',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    date: '20 Février 2024',
    readTime: '5 min',
  },
  '6': {
    title: 'Wakeboard : Conseils pour progresser rapidement',
    excerpt: 'Les techniques essentielles pour maîtriser le wakeboard et profiter des eaux plates de Sainte-Marie.',
    content: `
      <p>Sainte-Marie offre des conditions idéales pour le wakeboard : eaux plates, température parfaite et cadre paradisiaque.</p>
      
      <h2>Pour les débutants</h2>
      <p>La clé du succès ? La patience et une bonne position de départ. Nos moniteurs certifiés vous accompagnent pas à pas pour maîtriser les bases.</p>
      
      <h2>Conseils techniques</h2>
      <ul>
        <li>Gardez les bras tendus et le guidon près des hanches</li>
        <li>Répartissez votre poids équitablement sur les deux pieds</li>
        <li>Regardez vers l'horizon, pas vers vos pieds</li>
        <li>Relâchez les genoux pour absorber les vagues</li>
      </ul>
      
      <h2>Progression</h2>
      <p>Une fois les bases maîtrisées, vous pourrez apprendre les virages, les sauts et pourquoi pas quelques figures !</p>
    `,
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800',
    category: 'Sports nautiques',
    author: 'Hery Rakotondrabe',
    authorImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    date: '15 Février 2024',
    readTime: '4 min',
  },
  '7': {
    title: 'La cuisine de Sainte-Marie : Saveurs de l\'océan Indien',
    excerpt: 'Découvrez les spécialités culinaires de notre île, des fruits de mer frais aux épices locales.',
    content: `
      <p>La cuisine de Sainte-Marie est un voyage gustatif au cœur de l'océan Indien.</p>
      
      <h2>Trésors de la mer</h2>
      <p>Nos eaux regorgent de poissons, crustacés et fruits de mer que nos chefs préparent avec amour. Ne manquez pas le célèbre curry de poisson ou le langouste grillé.</p>
      
      <h2>Ingrédients locaux</h2>
      <ul>
        <li>Vanille de Madagascar - la meilleure au monde</li>
        <li>Curcuma et gingembre frais</li>
        <li>Noix de coco et son lait crémeux</li>
        <li>Piments locaux pour les amateurs</li>
      </ul>
      
      <h2>Où déguster ?</h2>
      <p>Nos excursions incluent souvent un déjeuner de fruits de mer frais préparé par des familles locales. Une expérience authentique et délicieuse !</p>
    `,
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    category: 'Lifestyle',
    author: 'Noro Rasoarimanana',
    authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    date: '10 Février 2024',
    readTime: '5 min',
  },
}

// ============================================
// BLOG ARTICLE PAGE
// ============================================

export default function BlogArticlePage() {
  const params = useParams()
  const id = params.id as string
  const article = articlesData[id]

  if (!article) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-montserrat font-bold text-2xl text-foreground mb-4">
            Article non trouvé
          </h1>
          <p className="text-muted-foreground mb-6">
            Cet article n'existe pas ou a été supprimé.
          </p>
          <Button asChild>
            <Link href="/blog">Voir tous les articles</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative h-[50vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Back Button */}
        <div className="absolute top-6 left-6 z-10">
          <Button
            variant="outline"
            className="bg-white/20 backdrop-blur-md border-white/30 text-white hover:bg-white/30"
            asChild
          >
            <Link href="/blog">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Retour au blog
            </Link>
          </Button>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 z-10">
          <div className="container-wide">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-4 max-w-3xl"
            >
              <Badge className="bg-primary/90 text-white border-0">
                {article.category}
              </Badge>
              <h1 className="font-montserrat font-bold text-2xl md:text-4xl text-white">
                {article.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Image
                    src={article.authorImage}
                    alt={article.author}
                    width={40}
                    height={40}
                    className="rounded-full"
                    unoptimized
                  />
                  <span>{article.author}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{article.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{article.readTime}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding bg-background">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Article Content */}
            <div className="lg:col-span-3">
              <ScrollReveal>
                <Card className="border-border/50">
                  <CardContent className="p-6 md:p-10">
                    <article 
                      className="prose prose-lg max-w-none prose-headings:font-montserrat prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-li:text-muted-foreground prose-ul:list-disc prose-ol:list-decimal"
                      dangerouslySetInnerHTML={{ __html: article.content }}
                    />
                  </CardContent>
                </Card>
              </ScrollReveal>

              {/* Actions */}
              <ScrollReveal>
                <div className="flex flex-wrap items-center gap-4 mt-8">
                  <Button variant="outline" className="gap-2">
                    <Heart className="w-4 h-4" />
                    J'aime
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Share2 className="w-4 h-4" />
                    Partager
                  </Button>
                  <div className="flex gap-2 ml-auto">
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Facebook className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Instagram className="w-5 h-5" />
                      </a>
                    </Button>
                    <Button variant="ghost" size="icon" asChild>
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        <Twitter className="w-5 h-5" />
                      </a>
                    </Button>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                {/* Author */}
                <ScrollReveal>
                  <GlassCard className="p-6">
                    <h3 className="font-montserrat font-bold text-lg text-foreground mb-4">
                      Auteur
                    </h3>
                    <div className="flex items-center gap-3">
                      <Image
                        src={article.authorImage}
                        alt={article.author}
                        width={50}
                        height={50}
                        className="rounded-full"
                        unoptimized
                      />
                      <div>
                        <p className="font-medium text-foreground">{article.author}</p>
                        <p className="text-sm text-muted-foreground">Contributeur AquaVenture</p>
                      </div>
                    </div>
                  </GlassCard>
                </ScrollReveal>

                {/* Related Articles */}
                <ScrollReveal>
                  <GlassCard className="p-6">
                    <h3 className="font-montserrat font-bold text-lg text-foreground mb-4">
                      Articles similaires
                    </h3>
                    <div className="space-y-4">
                      {Object.entries(articlesData)
                        .filter(([key]) => key !== id)
                        .slice(0, 3)
                        .map(([key, art]) => (
                          <Link
                            key={key}
                            href={`/blog/${key}`}
                            className="block group"
                          >
                            <h4 className="font-medium text-foreground text-sm line-clamp-2 group-hover:text-primary transition-colors">
                              {art.title}
                            </h4>
                            <p className="text-xs text-muted-foreground mt-1">
                              {art.date}
                            </p>
                          </Link>
                        ))}
                    </div>
                  </GlassCard>
                </ScrollReveal>

                {/* CTA */}
                <ScrollReveal>
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6 text-center">
                      <h3 className="font-montserrat font-bold text-lg text-foreground mb-2">
                        Prêt pour l'aventure ?
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Découvrez nos activités nautiques écoresponsables
                      </p>
                      <Button asChild className="w-full bg-primary hover:bg-primary/90">
                        <Link href="/activities">
                          Réserver
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </ScrollReveal>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
