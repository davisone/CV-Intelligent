import { NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const handleI18nRouting = createIntlMiddleware(routing)

const PROTECTED_PATTERN = /^\/(fr|en|es)\/(dashboard|profile|resumes)/
const AUTH_PAGE_PATTERN = /^\/(fr|en|es)\/(login|signup)$/

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // 1. next-intl normalise l'URL en premier (redirection locale manquante)
  const intlResponse = handleI18nRouting(request)

  // Si next-intl fait une redirection (normalisation de locale), on la laisse passer
  if (intlResponse.status === 307 || intlResponse.status === 308) {
    return intlResponse
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const locale = pathname.split('/')[1] || 'fr'

  // 2. Routes protégées : vérifier l'authentification
  if (PROTECTED_PATTERN.test(pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}/login`, request.url))
    }

    // Vérification email
    const needsEmailVerification = token.emailVerified === false
    const isVerifyEmailPage = pathname.includes('/verify-email')
    if (needsEmailVerification && !isVerifyEmailPage) {
      return NextResponse.redirect(new URL(`/${locale}/verify-email/pending`, request.url))
    }

    // Vérification 2FA
    const needs2FA = token.totpEnabled === true && token.twoFactorVerified !== true
    const isVerify2FAPage = pathname.includes('/verify-2fa')
    if (needs2FA && !isVerify2FAPage) {
      return NextResponse.redirect(new URL(`/${locale}/verify-2fa`, request.url))
    }
  }

  // 3. Pages auth : si déjà connecté → redirige vers dashboard
  if (AUTH_PAGE_PATTERN.test(pathname) && token) {
    const needs2FA = token.totpEnabled === true && token.twoFactorVerified !== true
    const needsEmailVerification = token.emailVerified === false
    if (!needs2FA && !needsEmailVerification) {
      return NextResponse.redirect(new URL(`/${locale}/dashboard`, request.url))
    }
  }

  return intlResponse
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
