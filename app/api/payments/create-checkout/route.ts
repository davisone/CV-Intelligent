import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { stripe } from '@/lib/stripe/client'
import { PRICING } from '@/lib/config/pricing'
import { createCheckoutSchema } from '@/lib/validations/payment.schema'
import { checkRateLimit, PAYMENT_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Rate limiting
    const rateLimitKey = `checkout:${session.user.id}`
    const rateLimit = checkRateLimit(rateLimitKey, PAYMENT_RATE_LIMITS.checkout)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Trop de requêtes. Réessayez dans ${rateLimit.resetIn} secondes.`,
          retryAfter: rateLimit.resetIn,
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetIn),
          },
        }
      )
    }

    const body = await request.json()
    const validatedData = createCheckoutSchema.safeParse(body)

    if (!validatedData.success) {
      return NextResponse.json(
        { error: validatedData.error.issues[0]?.message ?? 'Données invalides' },
        { status: 400 }
      )
    }

    const { resumeId } = validatedData.data

    // Vérifier ownership du CV
    const resume = await prisma.resume.findFirst({
      where: { id: resumeId, userId: session.user.id },
      select: { id: true, title: true, isPaid: true, paymentStatus: true },
    })

    if (!resume) {
      return NextResponse.json({ error: 'CV introuvable' }, { status: 404 })
    }

    // Vérifier si déjà payé
    if (resume.isPaid) {
      return NextResponse.json(
        { error: 'Ce CV est déjà débloqué' },
        { status: 400 }
      )
    }

    // Vérifier s'il y a déjà un paiement en attente
    if (resume.paymentStatus === 'PENDING') {
      const existingPayment = await prisma.payment.findFirst({
        where: { resumeId, status: 'PENDING' },
        select: { stripeSessionId: true },
      })

      if (existingPayment) {
        // Récupérer la session Stripe existante
        try {
          const existingSession = await stripe.checkout.sessions.retrieve(
            existingPayment.stripeSessionId
          )
          if (existingSession.status === 'open' && existingSession.url) {
            return NextResponse.json({ url: existingSession.url })
          }
        } catch {
          // Session expirée, on en crée une nouvelle
        }
      }
    }

    // Récupérer ou créer le customer Stripe
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true },
    })

    let customerId = user?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: {
          userId: session.user.id,
        },
      })
      customerId = customer.id

      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      })
    }

    // Créer la session Checkout
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: PRICING.currency,
            product_data: {
              name: `CV Premium - ${resume.title}`,
              description: 'Accès complet: tous les templates, IA, score ATS, export DOCX',
            },
            unit_amount: PRICING.perCV,
          },
          quantity: 1,
        },
      ],
      // Génération automatique de la facture Stripe après paiement
      invoice_creation: {
        enabled: true,
        invoice_data: {
          description: `CV Premium - ${resume.title}`,
          metadata: {
            resumeId: resumeId,
          },
        },
      },
      metadata: {
        userId: session.user.id,
        resumeId: resumeId,
      },
      success_url: `${appUrl}/dashboard/checkout/success?session_id={CHECKOUT_SESSION_ID}&resume_id=${resumeId}`,
      cancel_url: `${appUrl}/dashboard/checkout/cancel?resume_id=${resumeId}`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60, // 30 minutes
    })

    // Enregistrer le paiement en attente
    await prisma.$transaction([
      prisma.payment.create({
        data: {
          userId: session.user.id,
          resumeId: resumeId,
          stripeSessionId: checkoutSession.id,
          amount: PRICING.perCV,
          currency: PRICING.currency,
          status: 'PENDING',
        },
      }),
      prisma.resume.update({
        where: { id: resumeId },
        data: { paymentStatus: 'PENDING' },
      }),
    ])

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('[CHECKOUT_CREATE_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la création du paiement' },
      { status: 500 }
    )
  }
}
