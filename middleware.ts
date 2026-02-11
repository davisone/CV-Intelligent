import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'
import type { NextRequest } from 'next/server'

// Routes that require full authentication (including 2FA)
const protectedRoutes = ['/dashboard', '/profile', '/resumes']

// Routes that should be accessible without 2FA verification
const publicRoutes = ['/', '/login', '/signup', '/verify-2fa', '/forgot-password', '/reset-password']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for API routes, static files, and public assets
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  // Check if user is authenticated
  const isAuthenticated = !!token

  // Check if route is protected
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route))

  // Check if on verify-2fa page
  const isVerify2FAPage = pathname === '/verify-2fa'

  // Check if on auth pages (login, signup)
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  // If not authenticated and trying to access protected route, redirect to login
  if (!isAuthenticated && isProtectedRoute) {
    const loginUrl = new URL('/login', request.url)
    loginUrl.searchParams.set('callbackUrl', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // If authenticated
  if (isAuthenticated && token) {
    const needs2FA = token.totpEnabled === true && token.twoFactorVerified !== true

    // If 2FA is needed and not on verify-2fa page, redirect to verify-2fa
    if (needs2FA && !isVerify2FAPage) {
      return NextResponse.redirect(new URL('/verify-2fa', request.url))
    }

    // If 2FA is verified (or not needed) and on verify-2fa page, redirect to dashboard
    if (!needs2FA && isVerify2FAPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }

    // If authenticated and on auth pages (login/signup), redirect to dashboard
    if (!needs2FA && isAuthPage) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
}
