import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db/prisma'
import { signUpSchema } from '@/lib/validations/resume.schema'
import { sendWelcomeEmail } from '@/lib/email/nodemailer'
import { checkRateLimit, AUTH_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    // Rate limiting
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') || 'unknown'
    const rateLimitKey = `auth-signup:${ip}`
    const rateLimit = checkRateLimit(rateLimitKey, AUTH_RATE_LIMITS.signup)

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

    const { name, email, password } = validatedData.data

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
