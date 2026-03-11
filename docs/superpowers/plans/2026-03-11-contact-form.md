# Formulaire de contact — Plan d'implémentation

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ajouter une page `/contact` publique avec formulaire, route API, et envoi d'emails via Resend.

**Architecture:** Page `(legal)/contact/page.tsx` côté client, route `api/contact/route.ts` avec rate limiting Upstash en premier, validation Zod, puis deux emails Resend (notification bloquante, confirmation non bloquante).

**Tech Stack:** Next.js 16 App Router, TypeScript strict, Zod v4, Upstash Ratelimit, Resend, Sonner, Tailwind CSS

---

## Chunk 1 : Fondations

### Task 1 : Schéma Zod de validation

**Files:**
- Create: `lib/validations/contact.schema.ts`
- Create: `tests/unit/contact-schema.test.ts`

- [ ] **Étape 1 : Écrire les tests en premier**

```ts
// tests/unit/contact-schema.test.ts
import { describe, it, expect } from 'vitest'
import { contactSchema, CONTACT_SUBJECTS } from '@/lib/validations/contact.schema'

describe('contactSchema', () => {
  const valid = {
    name: 'Jean Dupont',
    email: 'jean@example.com',
    subject: 'Question générale',
    message: 'Bonjour, j\'ai une question sur votre service.',
  }

  it('accepte des données valides', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejette un nom trop court', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'J' }).success).toBe(false)
  })

  it('rejette un nom trop long', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'A'.repeat(101) }).success).toBe(false)
  })

  it('rejette un email invalide', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'pas-un-email' }).success).toBe(false)
  })

  it('rejette un sujet invalide', () => {
    expect(contactSchema.safeParse({ ...valid, subject: 'Sujet inconnu' }).success).toBe(false)
  })

  it('rejette un message trop court', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'Court' }).success).toBe(false)
  })

  it('rejette un message trop long', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'A'.repeat(2001) }).success).toBe(false)
  })

  it('CONTACT_SUBJECTS contient les 4 options attendues', () => {
    expect(CONTACT_SUBJECTS).toContain('Question générale')
    expect(CONTACT_SUBJECTS).toContain('Problème technique')
    expect(CONTACT_SUBJECTS).toContain('Suggestion d\'amélioration')
    expect(CONTACT_SUBJECTS).toContain('Autre')
  })
})
```

- [ ] **Étape 2 : Lancer les tests — vérifier qu'ils échouent**

```bash
npm run test -- tests/unit/contact-schema.test.ts
```

Expected : FAIL (module introuvable)

- [ ] **Étape 3 : Créer le schéma**

```ts
// lib/validations/contact.schema.ts
import { z } from 'zod'

export const CONTACT_SUBJECTS = [
  'Question générale',
  'Problème technique',
  "Suggestion d'amélioration",
  'Autre',
] as const

export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Le nom doit contenir au moins 2 caractères')
    .max(100, 'Le nom ne peut pas dépasser 100 caractères'),
  email: z.string().email('Adresse email invalide'),
  subject: z.enum(CONTACT_SUBJECTS, {
    errorMap: () => ({ message: 'Sujet invalide' }),
  }),
  message: z
    .string()
    .min(10, 'Le message doit contenir au moins 10 caractères')
    .max(2000, 'Le message ne peut pas dépasser 2000 caractères'),
})

export type ContactInput = z.infer<typeof contactSchema>
```

- [ ] **Étape 4 : Lancer les tests — vérifier qu'ils passent**

```bash
npm run test -- tests/unit/contact-schema.test.ts
```

Expected : PASS (8 tests)

- [ ] **Étape 5 : Commit**

```bash
git add lib/validations/contact.schema.ts tests/unit/contact-schema.test.ts
git commit -m "feat(contact): ajouter schéma Zod de validation du formulaire"
```

---

### Task 2 : Constante CONTACT_RATE_LIMITS

**Files:**
- Modify: `lib/rate-limit/index.ts`

- [ ] **Étape 1 : Ajouter la constante en fin de fichier**

Ajouter après `PAYMENT_RATE_LIMITS` dans `lib/rate-limit/index.ts` :

```ts
export const CONTACT_RATE_LIMITS = {
  submit: { maxRequests: 5, windowMs: 10 * 60 * 1000 }, // 5 req / 10 min
} as const
```

- [ ] **Étape 2 : Commit**

```bash
git add lib/rate-limit/index.ts
git commit -m "feat(contact): ajouter CONTACT_RATE_LIMITS dans rate-limit"
```

---

### Task 3 : Composant Select

**Files:**
- Create: `components/ui/select.tsx`

- [ ] **Étape 1 : Créer le composant**

Même pattern que `components/ui/input.tsx` (forwardRef, cn, prop error) :

```tsx
// components/ui/select.tsx
import { forwardRef, type SelectHTMLAttributes } from 'react'
import { cn } from '@/lib/utils/helpers'

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          className={cn(
            'flex h-10 w-full rounded-lg border border-[#E0D6C8] bg-[#FBF8F4] px-3 py-2 text-sm text-[#1F1A17]',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:border-[#722F37]',
            'disabled:cursor-not-allowed disabled:opacity-50',
            'transition-colors duration-200',
            'appearance-none cursor-pointer',
            error && 'border-red-500 focus-visible:ring-red-500',
            className
          )}
          ref={ref}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-destructive">{error}</p>}
      </div>
    )
  }
)

Select.displayName = 'Select'

export { Select }
```

- [ ] **Étape 2 : Commit**

```bash
git add components/ui/select.tsx
git commit -m "feat(ui): ajouter composant Select natif stylé"
```

---

## Chunk 2 : Couche email

### Task 4 : Fonctions d'envoi email

**Files:**
- Create: `lib/email/contact.ts`

- [ ] **Étape 1 : Créer le fichier**

```ts
// lib/email/contact.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'CV Builder <onboarding@resend.dev>'

export async function sendContactNotification(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    console.error('[EMAIL] CONTACT_EMAIL non configuré')
    return { success: false, error: 'CONTACT_EMAIL not configured' }
  }

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      subject: `[CV Builder] Nouveau message de ${data.name} — ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #722F37; font-size: 24px; margin-bottom: 24px;">
              Nouveau message de contact
            </h1>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color: #6b7280; padding: 8px 0; width: 100px;">Date</td><td style="color: #111827; font-weight: 500;">${currentDate}</td></tr>
              <tr><td style="color: #6b7280; padding: 8px 0;">Nom</td><td style="color: #111827; font-weight: 500;">${data.name}</td></tr>
              <tr><td style="color: #6b7280; padding: 8px 0;">Email</td><td><a href="mailto:${data.email}" style="color: #722F37;">${data.email}</a></td></tr>
              <tr><td style="color: #6b7280; padding: 8px 0;">Sujet</td><td style="color: #111827; font-weight: 500;">${data.subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <h2 style="color: #374151; font-size: 16px; margin-bottom: 12px;">Message</h2>
            <p style="color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">CV Builder — Formulaire de contact</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend (notification):', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Notification contact envoyée:', emailData?.id)
    return { success: true, data: { messageId: emailData?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR] sendContactNotification:', error)
    return { success: false, error }
  }
}

export async function sendContactConfirmation(
  to: string,
  name: string,
  subject: string,
  message: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Votre message a bien été reçu — CV Builder',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">
              Votre message a bien été reçu, ${name} !
            </h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Merci de nous avoir contacté. Nous avons bien reçu votre message et vous répondrons dans un délai de 48 heures ouvrées.
            </p>
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
              <h2 style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">Récapitulatif</h2>
              <p style="color: #6b7280; margin: 0 0 8px;"><strong style="color: #111827;">Sujet :</strong> ${subject}</p>
              <p style="color: #6b7280; margin: 0; white-space: pre-wrap;"><strong style="color: #111827;">Message :</strong> ${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">CV Builder — Créez votre CV parfait avec l'IA</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend (confirmation):', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Confirmation contact envoyée:', emailData?.id)
    return { success: true, data: { messageId: emailData?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR] sendContactConfirmation:', error)
    return { success: false, error }
  }
}
```

- [ ] **Étape 2 : Commit**

```bash
git add lib/email/contact.ts
git commit -m "feat(contact): ajouter fonctions d'envoi email notification et confirmation"
```

---

## Chunk 3 : Route API

### Task 5 : Route POST /api/contact

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Étape 1 : Créer la route**

```ts
// app/api/contact/route.ts
import { NextResponse } from 'next/server'
import { contactSchema } from '@/lib/validations/contact.schema'
import { checkRateLimit, CONTACT_RATE_LIMITS } from '@/lib/rate-limit'
import { sendContactNotification, sendContactConfirmation } from '@/lib/email/contact'

export async function POST(request: Request) {
  try {
    // 1. Rate limiting en premier (avant tout parsing du body)
    const ip =
      request.headers.get('x-forwarded-for')?.split(',')[0] ||
      request.headers.get('x-real-ip') ||
      'unknown'
    const rateLimit = await checkRateLimit(`contact:${ip}`, CONTACT_RATE_LIMITS.submit)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.resetIn / 60)} minutes.`,
        },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } }
      )
    }

    // 2. Guard CONTACT_EMAIL
    if (!process.env.CONTACT_EMAIL) {
      console.error('[CONTACT] CONTACT_EMAIL non configuré')
      return NextResponse.json(
        { error: 'Service de contact temporairement indisponible' },
        { status: 500 }
      )
    }

    // 3. Validation Zod
    const body = await request.json()
    const result = contactSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: 'Données invalides', details: result.error.flatten().fieldErrors },
        { status: 400 }
      )
    }

    const { name, email, subject, message } = result.data

    // 4. Email de notification (bloquant — si échoue, on retourne 500)
    const notification = await sendContactNotification({ name, email, subject, message })
    if (!notification.success) {
      return NextResponse.json(
        { error: "Erreur lors de l'envoi du message. Réessayez dans un moment." },
        { status: 500 }
      )
    }

    // 5. Email de confirmation (non bloquant — erreur loggée, pas remontée)
    sendContactConfirmation(email, name, subject, message).catch((err) => {
      console.error('[CONTACT] Erreur email de confirmation (non bloquant):', err)
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[CONTACT_ERROR]:', error)
    return NextResponse.json({ error: "Erreur lors de l'envoi du message" }, { status: 500 })
  }
}
```

- [ ] **Étape 2 : Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat(contact): ajouter route POST /api/contact avec rate limiting et validation"
```

---

## Chunk 4 : Interface et intégration

### Task 6 : Page /contact

**Files:**
- Create: `app/(legal)/contact/page.tsx`

- [ ] **Étape 1 : Créer la page**

```tsx
// app/(legal)/contact/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { CONTACT_SUBJECTS } from '@/lib/validations/contact.schema'

export default function ContactPage() {
  // Note : `export default` est requis par Next.js App Router pour les page.tsx,
  // même si la convention du projet préfère les exports nommés pour les composants.
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Une erreur est survenue')
        return
      }

      toast.success('Message envoyé ! Nous vous répondrons sous 48h.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Une erreur est survenue. Réessayez dans un moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#1F1A17] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l'accueil
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1F1A17] mb-3">Contactez-nous</h1>
          <p className="text-[#6B6560]">
            Une question, un problème ou une suggestion ? Nous vous répondons sous 48 heures ouvrées.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                placeholder="Jean Dupont"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jean@exemple.fr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Select
              id="subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              disabled={isLoading}
            >
              <option value="" disabled>Sélectionnez un sujet</option>
              {CONTACT_SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              rows={6}
              placeholder="Décrivez votre demande en détail..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              disabled={isLoading}
              className="flex w-full rounded-lg border border-[#E0D6C8] bg-[#FBF8F4] px-3 py-2 text-sm text-[#1F1A17] placeholder:text-[#8A7F72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:border-[#722F37] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#722F37] hover:bg-[#8B3A44] text-white font-semibold h-11 rounded-xl transition-colors"
          >
            {isLoading ? (
              'Envoi en cours...'
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Envoyer le message
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
```

- [ ] **Étape 2 : Commit**

```bash
git add app/\(legal\)/contact/page.tsx
git commit -m "feat(contact): ajouter page /contact avec formulaire"
```

---

### Task 7 : Lien footer + variables d'environnement

**Files:**
- Modify: `components/layout/footer.tsx`
- Modify: `.env.example`

- [ ] **Étape 1 : Ajouter lien Contact dans le footer**

Dans `components/layout/footer.tsx`, ajouter après le lien "Créer un CV gratuit" dans la colonne Ressources :

```tsx
<Link
  href="/contact"
  className="text-[#6B6560] hover:text-[#722F37] transition-colors"
>
  Contact
</Link>
```

- [ ] **Étape 2 : Mettre à jour .env.example**

Ajouter à la fin du fichier `.env.example` :

```env
# Contact
CONTACT_EMAIL="contact@dvs-web.fr"

# Upstash Redis (rate limiting)
UPSTASH_REDIS_REST_URL=""
UPSTASH_REDIS_REST_TOKEN=""
```

- [ ] **Étape 3 : Commit**

```bash
git add components/layout/footer.tsx .env.example
git commit -m "feat(contact): ajouter lien Contact dans le footer et variables d'env"
```

---

## Vérification finale

- [ ] **Build de production**

```bash
npm run build
```

Expected : build sans erreur TypeScript

- [ ] **Lint**

```bash
npm run lint
```

Expected : aucune erreur

- [ ] **Tests unitaires**

```bash
npm run test
```

Expected : tous les tests passent, dont les nouveaux tests `contact-schema.test.ts`

- [ ] **Test manuel**

1. Lancer `npm run dev`
2. Ouvrir `http://localhost:3000/contact`
3. Soumettre le formulaire avec des données valides
4. Vérifier le toast de succès
5. Vérifier l'email reçu sur `CONTACT_EMAIL`
6. Vérifier l'email de confirmation reçu sur l'adresse saisie
7. Tester la validation : soumettre avec un email invalide → toast d'erreur
8. Vérifier que le lien "Contact" apparaît dans le footer
