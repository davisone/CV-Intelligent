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
