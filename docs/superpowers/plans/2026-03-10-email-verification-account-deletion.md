# Email Verification & Account Deletion — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bloquer l'accès au dashboard tant que l'email n'est pas vérifié (credentials uniquement), et permettre la suppression définitive du compte avec confirmation explicite.

**Architecture:** Token de vérification stocké sur le modèle `User` (pattern identique à `resetToken`). Le statut `emailVerified` est inclus dans le JWT NextAuth pour être accessible dans le middleware Edge sans DB. Suppression en cascade via Prisma (`onDelete: Cascade` déjà en place).

**Tech Stack:** Next.js App Router, NextAuth v4 JWT, Prisma, Resend, Upstash Redis (rate limit), Tailwind CSS.

---

## Chunk 1 : Vérification email

### Task 1 : Schéma Prisma — ajout verificationToken

**Files:**
- Modify: `prisma/schema.prisma`

- [ ] **Ajouter les champs au modèle User**

Dans `prisma/schema.prisma`, après `resetTokenExpiry DateTime?` :

```prisma
verificationToken       String?
verificationTokenExpiry DateTime?
```

- [ ] **Générer et appliquer la migration**

```bash
npx prisma migrate dev --name add_verification_token
npx prisma generate
```

Expected: migration créée et appliquée sans erreur.

- [ ] **Commit**

```bash
git add prisma/
git commit -m "feat(db): ajouter verificationToken sur le modèle User"
```

---

### Task 2 : Email de vérification

**Files:**
- Modify: `lib/email/resend.ts`

- [ ] **Ajouter la fonction `sendVerificationEmail`** à la fin de `lib/email/resend.ts`

```typescript
export async function sendVerificationEmail(to: string, verificationToken: string) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${verificationToken}`

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Vérifiez votre adresse email - CV Builder',
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
              Vérifiez votre adresse email
            </h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Merci de vous être inscrit sur CV Builder. Cliquez sur le bouton ci-dessous pour vérifier votre adresse email.
            </p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Vérifier mon email
              </a>
            </div>
            <p style="color: #999; font-size: 14px; line-height: 1.6;">
              Ce lien expire dans 24 heures. Si vous n'avez pas créé de compte, ignorez cet email.
            </p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">
              CV Builder - Créez votre CV parfait avec l'IA
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend:', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Email de vérification envoyé:', data?.id)
    return { success: true, data: { messageId: data?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}
```

- [ ] **Commit**

```bash
git add lib/email/resend.ts
git commit -m "feat(email): ajouter sendVerificationEmail"
```

---

### Task 3 : Modifier le signup pour envoyer la vérification

**Files:**
- Modify: `app/api/auth/signup/route.ts`

- [ ] **Importer crypto et sendVerificationEmail** en haut du fichier

```typescript
import crypto from 'crypto'
import { sendVerificationEmail } from '@/lib/email/resend'
```

- [ ] **Remplacer le bloc de création utilisateur** (après la vérification d'existant, avant le return)

Remplacer :
```typescript
// Create user
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
  },
  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
})

// Envoyer l'email de bienvenue (non bloquant)
sendWelcomeEmail(email, name).catch((error) => {
  console.error('[WELCOME_EMAIL_ERROR]:', error)
})
```

Par :
```typescript
// Générer token de vérification
const verificationToken = crypto.randomBytes(32).toString('hex')
const verificationTokenExpiry = new Date(Date.now() + 24 * 3600000) // 24 heures

// Create user
const user = await prisma.user.create({
  data: {
    name,
    email,
    password: hashedPassword,
    verificationToken,
    verificationTokenExpiry,
  },
  select: {
    id: true,
    name: true,
    email: true,
    createdAt: true,
  },
})

// Envoyer l'email de vérification (non bloquant)
sendVerificationEmail(email, verificationToken).catch((error) => {
  console.error('[VERIFICATION_EMAIL_ERROR]:', error)
})
```

- [ ] **Supprimer l'import `sendWelcomeEmail`** du fichier signup (plus utilisé ici)

- [ ] **Commit**

```bash
git add app/api/auth/signup/route.ts
git commit -m "feat(auth): envoyer email de vérification à l'inscription"
```

---

### Task 4 : API de vérification du token

**Files:**
- Create: `app/api/auth/verify-email/route.ts`

- [ ] **Créer le fichier**

```typescript
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'

export async function POST(request: Request) {
  try {
    const { token } = await request.json()

    if (!token) {
      return NextResponse.json({ error: 'Token requis' }, { status: 400 })
    }

    const user = await prisma.user.findFirst({
      where: {
        verificationToken: token,
        verificationTokenExpiry: { gt: new Date() },
      },
      select: { id: true },
    })

    if (!user) {
      return NextResponse.json(
        { error: 'Token invalide ou expiré' },
        { status: 400 }
      )
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: new Date(),
        verificationToken: null,
        verificationTokenExpiry: null,
      },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[VERIFY_EMAIL_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
```

- [ ] **Commit**

```bash
git add app/api/auth/verify-email/
git commit -m "feat(auth): ajouter API de vérification d'email"
```

---

### Task 5 : API de renvoi du token de vérification

**Files:**
- Create: `app/api/auth/resend-verification/route.ts`
- Modify: `lib/rate-limit/index.ts`

- [ ] **Ajouter `resendVerification` dans AUTH_RATE_LIMITS** (`lib/rate-limit/index.ts`)

```typescript
export const AUTH_RATE_LIMITS = {
  signup: { maxRequests: 5, windowMs: 3600000 },
  forgotPassword: { maxRequests: 3, windowMs: 900000 },
  resetPassword: { maxRequests: 5, windowMs: 3600000 },
  twoFactorCheck: { maxRequests: 10, windowMs: 60000 },
  twoFactorVerify: { maxRequests: 5, windowMs: 300000 },
  resendVerification: { maxRequests: 3, windowMs: 900000 }, // 3/15min
} as const
```

- [ ] **Créer `app/api/auth/resend-verification/route.ts`**

```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { sendVerificationEmail } from '@/lib/email/resend'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'
import crypto from 'crypto'

export async function POST(request: Request) {
  try {
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimit = await checkRateLimit(`resend-verification:${ip}`, AUTH_RATE_LIMITS.resendVerification)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.resetIn / 60)} minutes.` },
        { status: 429 }
      )
    }

    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { email: true, emailVerified: true },
    })

    if (!user?.email) {
      return NextResponse.json({ error: 'Utilisateur introuvable' }, { status: 404 })
    }

    if (user.emailVerified) {
      return NextResponse.json({ error: 'Email déjà vérifié' }, { status: 400 })
    }

    const verificationToken = crypto.randomBytes(32).toString('hex')
    const verificationTokenExpiry = new Date(Date.now() + 24 * 3600000)

    await prisma.user.update({
      where: { id: session.user.id },
      data: { verificationToken, verificationTokenExpiry },
    })

    await sendVerificationEmail(user.email, verificationToken)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[RESEND_VERIFICATION_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
```

- [ ] **Commit**

```bash
git add app/api/auth/resend-verification/ lib/rate-limit/index.ts
git commit -m "feat(auth): ajouter API de renvoi de vérification email"
```

---

### Task 6 : JWT — inclure emailVerified

**Files:**
- Modify: `lib/auth/options.ts`

- [ ] **Modifier le callback `jwt`** pour inclure `emailVerified`

Dans le bloc `if (user)` du callback jwt, après `token.totpEnabled = dbUser?.totpEnabled ?? false` :

```typescript
const dbUser = await prisma.user.findUnique({
  where: { id: user.id },
  select: { totpEnabled: true, emailVerified: true },
})

token.totpEnabled = dbUser?.totpEnabled ?? false
token.emailVerified = !!dbUser?.emailVerified  // true si vérifié, false sinon
```

- [ ] **Exposer dans le callback `session`**

Dans `async session({ session, token })`, ajouter :

```typescript
session.user.emailVerified = token.emailVerified as boolean
```

- [ ] **Commit**

```bash
git add lib/auth/options.ts
git commit -m "feat(auth): inclure emailVerified dans le JWT"
```

---

### Task 7 : Middleware — bloquer si email non vérifié

**Files:**
- Modify: `middleware.ts`

- [ ] **Ajouter `/verify-email` aux routes publiques** et le check dans le middleware

Remplacer :
```typescript
const publicRoutes = ['/', '/login', '/signup', '/verify-2fa', '/forgot-password', '/reset-password']
```

Par :
```typescript
const publicRoutes = ['/', '/login', '/signup', '/verify-2fa', '/forgot-password', '/reset-password', '/verify-email']
```

- [ ] **Ajouter le check email verification** dans le bloc `if (isAuthenticated && token)`

Après le check 2FA et avant la redirection des auth pages :

```typescript
// Vérification email (credentials uniquement)
const needsEmailVerification = token.emailVerified === false
const isVerifyEmailPage = pathname.startsWith('/verify-email')

if (needsEmailVerification && !isVerifyEmailPage && isProtectedRoute) {
  return NextResponse.redirect(new URL('/verify-email/pending', request.url))
}
```

- [ ] **Commit**

```bash
git add middleware.ts
git commit -m "feat(middleware): bloquer accès si email non vérifié"
```

---

### Task 8 : Page de vérification (`/verify-email`)

**Files:**
- Create: `app/(auth)/verify-email/page.tsx`

- [ ] **Créer la page** (Client Component — traite le token depuis l'URL)

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Suspense } from 'react'

const VerifyEmailContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (!token) {
      setStatus('error')
      return
    }

    fetch('/api/auth/verify-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })
      .then(async (res) => {
        if (res.ok) {
          setStatus('success')
          // Forcer reconnexion pour avoir emailVerified: true dans le JWT
          setTimeout(() => {
            signOut({ callbackUrl: '/login?verified=true' })
          }, 2000)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [token])

  if (status === 'loading') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle>Vérification en cours...</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-[#6B6560]">
          <div className="animate-pulse">Validation de votre email...</div>
        </CardContent>
      </Card>
    )
  }

  if (status === 'success') {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">Email vérifié !</CardTitle>
        </CardHeader>
        <CardContent className="text-center text-[#6B6560]">
          <p>Votre adresse email a bien été vérifiée. Redirection vers la connexion...</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-red-600">Lien invalide</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-[#6B6560]">Ce lien de vérification est invalide ou a expiré.</p>
        <Button asChild>
          <Link href="/verify-email/pending">Renvoyer un email</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div>Chargement...</div>}>
      <VerifyEmailContent />
    </Suspense>
  )
}
```

- [ ] **Commit**

```bash
git add app/\(auth\)/verify-email/page.tsx
git commit -m "feat(auth): ajouter page de vérification d'email"
```

---

### Task 9 : Page d'attente (`/verify-email/pending`)

**Files:**
- Create: `app/(auth)/verify-email/pending/page.tsx`

- [ ] **Créer la page**

```typescript
'use client'

import { useState } from 'react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function VerifyEmailPendingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleResend = async () => {
    setIsLoading(true)
    try {
      const res = await fetch('/api/auth/resend-verification', { method: 'POST' })
      if (res.ok) {
        setSent(true)
        toast.success('Email de vérification renvoyé !')
      } else {
        const data = await res.json()
        toast.error(data.error || 'Une erreur est survenue')
      }
    } catch {
      toast.error('Une erreur est survenue')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle>Vérifiez votre email</CardTitle>
        <CardDescription>
          Un email de vérification vous a été envoyé. Cliquez sur le lien pour accéder à votre dashboard.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-[#F3EDE5] rounded-lg p-4 text-sm text-[#6B6560]">
          Vérifiez également vos spams si vous ne trouvez pas l'email.
        </div>
        <Button
          onClick={handleResend}
          isLoading={isLoading}
          disabled={sent}
          className="w-full"
          variant="outline"
        >
          {sent ? 'Email renvoyé !' : 'Renvoyer l\'email'}
        </Button>
        <p className="text-center text-sm text-[#6B6560]">
          <Link href="/login" className="text-[#722F37] hover:underline">
            Se déconnecter
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
```

- [ ] **Vérifier le build**

```bash
npm run build
```

Expected: aucune erreur.

- [ ] **Commit**

```bash
git add app/\(auth\)/verify-email/
git commit -m "feat(auth): ajouter page d'attente de vérification email"
```

---

### Task 10 : Message de succès sur la page login

**Files:**
- Modify: `app/(auth)/login/page.tsx`

- [ ] **Lire le fichier** pour identifier l'endroit où ajouter le message

- [ ] **Ajouter la détection du paramètre `verified`** : si `?verified=true` dans l'URL, afficher un toast de succès au montage

Dans le composant login (client), ajouter :

```typescript
const searchParams = useSearchParams()

useEffect(() => {
  if (searchParams.get('verified') === 'true') {
    toast.success('Email vérifié ! Vous pouvez maintenant vous connecter.')
  }
}, [searchParams])
```

S'assurer que `useSearchParams` est wrappé dans `Suspense` si ce n'est pas déjà le cas.

- [ ] **Commit**

```bash
git add app/\(auth\)/login/
git commit -m "feat(auth): afficher message succès après vérification email"
```

---

## Chunk 2 : Suppression de compte

### Task 11 : API DELETE /api/user

**Files:**
- Create: `app/api/user/route.ts`

- [ ] **Créer le fichier**

```typescript
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function DELETE() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non authentifié' }, { status: 401 })
    }

    // Supprime l'utilisateur — toutes les relations cascadent automatiquement
    await prisma.user.delete({
      where: { id: session.user.id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('[DELETE_USER_ERROR]:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
```

- [ ] **Commit**

```bash
git add app/api/user/route.ts
git commit -m "feat(user): ajouter API de suppression de compte"
```

---

### Task 12 : Composant DeleteAccountSection

**Files:**
- Create: `components/ui/delete-account-section.tsx`

- [ ] **Créer le composant**

```typescript
'use client'

import { useState } from 'react'
import { signOut } from 'next-auth/react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const CONFIRMATION_PHRASE = 'je veux supprimer mon compte'

export const DeleteAccountSection = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const isConfirmed = phrase === CONFIRMATION_PHRASE

  const handleDelete = async () => {
    if (!isConfirmed) return

    setIsLoading(true)
    try {
      const res = await fetch('/api/user', { method: 'DELETE' })

      if (!res.ok) {
        toast.error('Une erreur est survenue. Réessayez.')
        return
      }

      toast.success('Compte supprimé.')
      await signOut({ callbackUrl: '/' })
    } catch {
      toast.error('Une erreur est survenue.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-[#F3EDE5] p-6 rounded-xl border border-red-200">
      <h2 className="text-xl font-semibold text-red-700 mb-2">Zone dangereuse</h2>
      <p className="text-[#6B6560] text-sm mb-4">
        La suppression de votre compte est définitive. Tous vos CV, données et paiements seront effacés.
      </p>

      {!isOpen ? (
        <Button
          variant="outline"
          className="border-red-300 text-red-700 hover:bg-red-50"
          onClick={() => setIsOpen(true)}
        >
          Supprimer mon compte
        </Button>
      ) : (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-sm text-red-700">
            <strong>Cette action est irréversible.</strong> Tous vos CVs, votre profil et vos données seront supprimés définitivement.
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-phrase">
              Tapez <span className="font-mono font-semibold">je veux supprimer mon compte</span> pour confirmer
            </Label>
            <Input
              id="confirm-phrase"
              value={phrase}
              onChange={(e) => setPhrase(e.target.value)}
              placeholder="je veux supprimer mon compte"
              disabled={isLoading}
            />
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => { setIsOpen(false); setPhrase('') }}
              disabled={isLoading}
            >
              Annuler
            </Button>
            <Button
              className="bg-red-600 hover:bg-red-700 text-white"
              onClick={handleDelete}
              disabled={!isConfirmed}
              isLoading={isLoading}
            >
              Supprimer définitivement
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
```

- [ ] **Commit**

```bash
git add components/ui/delete-account-section.tsx
git commit -m "feat(ui): ajouter composant DeleteAccountSection"
```

---

### Task 13 : Intégrer dans la page Settings

**Files:**
- Modify: `app/(dashboard)/dashboard/settings/page.tsx`

- [ ] **Importer et ajouter `DeleteAccountSection`** à la fin de la page, après la section 2FA

```typescript
import { DeleteAccountSection } from '@/components/ui/delete-account-section'
```

Ajouter dans le JSX après la section 2FA :
```tsx
{/* Danger Zone */}
<DeleteAccountSection />
```

- [ ] **Vérifier le build**

```bash
npm run build
```

Expected: aucune erreur.

- [ ] **Commit**

```bash
git add app/\(dashboard\)/dashboard/settings/page.tsx
git commit -m "feat(settings): intégrer section suppression de compte"
```

---

### Task 14 : Push, PR et merge final

- [ ] **Push la branche**

```bash
git push -u origin feature/email-verification-account-deletion
```

- [ ] **Créer la PR sur GitHub**

```bash
gh pr create --title "feat: vérification email et suppression de compte" --body "..."
```

- [ ] **Build final de vérification**

```bash
npm run build && npm run lint
```

- [ ] **Merger sur main après validation**
