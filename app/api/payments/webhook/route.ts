import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { stripe } from '@/lib/stripe/client'
import { prisma } from '@/lib/db/prisma'
import { sendPaymentConfirmationEmail } from '@/lib/email/resend'
import { PRICING } from '@/lib/config/pricing'
import type Stripe from 'stripe'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature) {
    console.error('[WEBHOOK] Missing stripe-signature header')
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[WEBHOOK] STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (error) {
    console.error('[WEBHOOK] Signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session

        if (session.payment_status !== 'paid') {
          console.log('[WEBHOOK] Payment not yet paid, waiting for payment_intent.succeeded')
          break
        }

        await handleSuccessfulPayment(session)
        break
      }

      case 'checkout.session.async_payment_succeeded': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleSuccessfulPayment(session)
        break
      }

      case 'checkout.session.async_payment_failed':
      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        await handleFailedPayment(session)
        break
      }

      default:
        console.log(`[WEBHOOK] Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('[WEBHOOK] Error processing event:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { userId, resumeId } = session.metadata || {}

  if (!userId || !resumeId) {
    console.error('[WEBHOOK] Missing metadata in session:', session.id)
    return
  }

  // Vérifier idempotence - éviter les doublons
  const existingPayment = await prisma.payment.findUnique({
    where: { stripeSessionId: session.id },
    select: { status: true },
  })

  if (existingPayment?.status === 'COMPLETED') {
    console.log('[WEBHOOK] Payment already processed:', session.id)
    return
  }

  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id

  // Récupérer les infos utilisateur et CV pour l'email
  const [user, resume] = await Promise.all([
    prisma.user.findUnique({
      where: { id: userId },
      select: { email: true, name: true },
    }),
    prisma.resume.findUnique({
      where: { id: resumeId },
      select: { title: true },
    }),
  ])

  await prisma.$transaction([
    // Mettre à jour le paiement
    prisma.payment.update({
      where: { stripeSessionId: session.id },
      data: {
        status: 'COMPLETED',
        stripePaymentId: paymentIntentId,
      },
    }),
    // Marquer le CV comme payé
    prisma.resume.update({
      where: { id: resumeId },
      data: {
        isPaid: true,
        paidAt: new Date(),
        stripePaymentId: paymentIntentId,
        paymentStatus: 'COMPLETED',
      },
    }),
  ])

  // Envoyer l'email de confirmation
  if (user?.email && resume?.title) {
    await sendPaymentConfirmationEmail(
      user.email,
      user.name || 'Client',
      resume.title,
      PRICING.displayPrice,
      resumeId
    )
    console.log(`[WEBHOOK] Confirmation email sent to ${user.email}`)
  }

  console.log(`[WEBHOOK] Payment completed for resume ${resumeId} by user ${userId}`)
}

async function handleFailedPayment(session: Stripe.Checkout.Session) {
  const { resumeId } = session.metadata || {}

  if (!resumeId) {
    console.error('[WEBHOOK] Missing resumeId in session metadata:', session.id)
    return
  }

  await prisma.$transaction([
    prisma.payment.updateMany({
      where: { stripeSessionId: session.id },
      data: { status: 'FAILED' },
    }),
    prisma.resume.update({
      where: { id: resumeId },
      data: { paymentStatus: 'FAILED' },
    }),
  ])

  console.log(`[WEBHOOK] Payment failed/expired for session ${session.id}`)
}
