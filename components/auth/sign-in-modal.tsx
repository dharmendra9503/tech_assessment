'use client'

import React from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signInSchema, type SignInFormValues } from '@/lib/validation/auth'
import { useAuth } from '@/providers/auth-provider'
import { Github, Mail } from 'lucide-react'

interface SignInModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SignInModal({ isOpen, onClose }: SignInModalProps) {
  const { signIn } = useAuth()
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: SignInFormValues) {
    signIn(values.email)
    reset()
    onClose()
  }

  function mockSignIn(email: string) {
    signIn(email)
    reset()
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] border-border bg-popover text-popover-foreground backdrop-blur-lg">
        <DialogTitle className="text-2xl font-bold text-center">Sign In</DialogTitle>
        <DialogDescription className="sr-only">
          Sign in with a mock account to preview the investor experience.
        </DialogDescription>

        <div className="grid gap-6">
          <div className="space-y-2 text-center">
            <p className="text-muted-foreground">Choose your preferred sign in method</p>
          </div>

          <div className="space-y-4">
            <Button
              type="button"
              variant="outline"
              className="w-full border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground space-x-2"
              onClick={() => mockSignIn('demo@github.com')}
            >
              <Github className="h-5 w-5" />
              <span>Continue with Github</span>
            </Button>
            <Button
              type="button"
              variant="outline"
              className="w-full border-border bg-card text-card-foreground hover:bg-accent hover:text-accent-foreground space-x-2"
              onClick={() => mockSignIn('demo@email.com')}
            >
              <Mail className="h-5 w-5" />
              <span>Continue with Email</span>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-popover px-2 text-muted-foreground">Or</span>
            </div>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-muted-foreground">
                Email
              </Label>
              <Input
                id="email"
                placeholder="john@example.com"
                type="email"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={errors.email ? 'email-error' : undefined}
                className="border-input bg-background text-foreground placeholder:text-muted-foreground"
                {...register('email')}
              />
              {errors.email ? (
                <p id="email-error" role="alert" className="text-sm text-red-300">
                  {errors.email.message}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-muted-foreground">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'password-error' : undefined}
                className="border-input bg-background text-foreground placeholder:text-muted-foreground"
                {...register('password')}
              />
              {errors.password ? (
                <p id="password-error" role="alert" className="text-sm text-red-300">
                  {errors.password.message}
                </p>
              ) : null}
            </div>
            <Button type="submit" className="w-full bg-brand text-white hover:bg-brand-hover">
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm">
            <a href="#" className="text-brand hover:text-brand-hover">
              Forgot password?
            </a>
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <a href="#" className="text-brand hover:text-brand-hover">
              Sign up
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
