import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import { prisma } from '@/lib/db/prisma'
import { signUpSchema } from '@/lib/validations/resume.schema'
import { sendVerificationEmail } from '@/lib/email/resend'
import { addContact } from '@/lib/email/resend-contacts'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimitKey = `auth-signup:${ip}`
    const rateLimit = await checkRateLimit(rateLimitKey, AUTH_RATE_LIMITS.signup)

    if (!rateLimit.success) {
      return NextResponse.json(
        { error: `Trop de tentatives. Réessayez dans ${Math.ceil(rateLimit.resetIn / 60)} minutes.` },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } }
      )
    }

    const body = await request.json()

    // Validate input
    const validatedData = signUpSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0]?.message ?? 'Invalid input' },
        { status: 400 }
      )
    }

    const { name, email, password, locale } = validatedData.data

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 409 }
      )
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)

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
        locale,
        lastSeenUpdateVersion: process.env.NEXT_PUBLIC_APP_VERSION ?? '1.4.0',
        lastSeenChangelogSlug: (await import('@/lib/changelog')).getLatestChangelogSlug() ?? undefined,
      },
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
      },
    })

    // Envoyer l'email de vérification (non bloquant)
    sendVerificationEmail(email, verificationToken, locale).catch((error) => {
      console.error('[VERIFICATION_EMAIL_ERROR]:', error)
    })

    // Ajouter à l'audience marketing Resend (non bloquant)
    addContact(email, name, locale).catch((error) => {
      console.error('[RESEND_CONTACTS_ERROR]:', error)
    })

    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    )
  } catch (error) {
    console.error('[SIGNUP_ERROR]:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
