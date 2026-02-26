'use client'

/**
 * AquaVenture - Login Form Component
 * Beautiful authentication form with animations and validation
 */

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Loader2,
  Anchor,
  Waves,
  ArrowLeft
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

// ============================================
// VALIDATION SCHEMA
// ============================================

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'L\'email est requis')
    .email('Email invalide'),
  password: z
    .string()
    .min(1, 'Le mot de passe est requis')
    .min(6, 'Le mot de passe doit contenir au moins 6 caractères'),
  remember: z.boolean().optional(),
})

type LoginFormValues = z.infer<typeof loginSchema>

// ============================================
// LOGIN FORM COMPONENT
// ============================================

export const LoginForm: React.FC = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      remember: false,
    },
  })

  const onSubmit = async (data: LoginFormValues) => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      
      // For demo purposes, accept any credentials
      // In production, this would validate against a backend
      console.log('Login data:', data)
      
      // Set logged in state
      localStorage.setItem('adminLoggedIn', 'true')
      
      // Redirect to admin dashboard
      router.push('/admin')
    } catch (err) {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-background via-muted/30 to-background">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{ scale: [1.2, 1, 1.2] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        {/* Login Card */}
        <div className="glass-card p-8 md:p-10 rounded-2xl shadow-xl border border-border/50">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              className="flex justify-center mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Anchor className="w-8 h-8 text-primary" />
              </div>
            </motion.div>
            <h1 className="font-montserrat font-bold text-2xl md:text-3xl text-foreground">
              Bon retour parmi nous
            </h1>
            <p className="text-muted-foreground mt-2">
              Connectez-vous à votre compte AquaVenture
            </p>
          </div>

          {/* Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg mb-6 text-sm"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Email Field */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-foreground">Email</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="votre@email.com"
                          className="pl-10"
                          disabled={isLoading}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Password Field */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel className="text-foreground">Mot de passe</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm text-primary hover:underline"
                      >
                        Mot de passe oublié ?
                      </Link>
                    </div>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? 'text' : 'password'}
                          placeholder="••••••••"
                          className="pl-10 pr-10"
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Remember Me */}
              <FormField
                control={form.control}
                name="remember"
                render={({ field }) => (
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal text-muted-foreground">
                      Se souvenir de moi
                    </FormLabel>
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-6"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    <Waves className="w-5 h-5 mr-2" />
                    Se connecter
                  </>
                )}
              </Button>
            </form>
          </Form>

          {/* Divider */}
          <div className="relative my-8">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-card px-4 text-xs text-muted-foreground">
              ou continuer avec
            </span>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button variant="outline" type="button" disabled={isLoading}>
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button variant="outline" type="button" disabled={isLoading}>
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </Button>
          </div>

          {/* Register Link */}
          <p className="text-center text-sm text-muted-foreground mt-8">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          En vous connectant, vous acceptez nos{' '}
          <Link href="/terms" className="hover:text-primary">
            Conditions d'utilisation
          </Link>{' '}
          et notre{' '}
          <Link href="/privacy" className="hover:text-primary">
            Politique de confidentialité
          </Link>
        </p>
      </motion.div>
    </div>
  )
}

export default LoginForm
