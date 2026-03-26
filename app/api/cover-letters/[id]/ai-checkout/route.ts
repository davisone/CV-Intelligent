import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { stripe } from '@/lib/stripe/client'
import { COVER_LETTER_AI_PRICING } from '@/lib/config/pricing'

interface RouteParams {
  params: Promise<{ id: string }>
}

// POST /api/cover-letters/[id]/ai-checkout
export async function POST(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id || !session.user.email) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const { id } = await params

    const coverLetter = await prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
      include: {
        resume: { select: { id: true, isPaid: true, title: true } },
      },
    })

    if (!coverLetter) {
      return NextResponse.json({ error: 'Lettre introuvable' }, { status: 404 })
    }

    // Génération gratuite si le CV est payé
    if (coverLetter.resume.isPaid) {
      return NextResponse.json({ free: true })
    }

    // Déjà payé pour l'IA
    if (coverLetter.isAIPaid) {
      return NextResponse.json({ free: true })
    }

    // Session Stripe encore valide ?
    if (coverLetter.stripeAISessionId) {
      try {
        const existing = await stripe.checkout.sessions.retrieve(coverLetter.stripeAISessionId)
        if (existing.status === 'open' && existing.url) {
          return NextResponse.json({ url: existing.url })
        }
      } catch {
        // Session expirée, on en crée une nouvelle
      }
    }

    // Récupérer ou créer customer Stripe
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeCustomerId: true, locale: true },
    })

    let customerId = user?.stripeCustomerId

    if (!customerId) {
      const customer = await stripe.customers.create({
        email: session.user.email,
        name: session.user.name || undefined,
        metadata: { userId: session.user.id },
      })
      customerId = customer.id
      await prisma.user.update({
        where: { id: session.user.id },
        data: { stripeCustomerId: customerId },
      })
    }

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
    const locale = user?.locale ?? 'fr'

    const checkoutSession = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: COVER_LETTER_AI_PRICING.currency,
            product_data: {
              name: `Génération IA — ${coverLetter.title}`,
              description: 'Génération de lettre de motivation par intelligence artificielle',
            },
            unit_amount: COVER_LETTER_AI_PRICING.amount,
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId: session.user.id,
        coverLetterId: id,
        type: 'cover_letter_ai',
      },
      success_url: `${appUrl}/${locale}/dashboard/cover-letters/${id}/edit?ai_success=1`,
      cancel_url: `${appUrl}/${locale}/dashboard/cover-letters/${id}/edit`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    })

    await prisma.coverLetter.update({
      where: { id },
      data: { stripeAISessionId: checkoutSession.id },
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('[COVER_LETTER_AI_CHECKOUT]:', error)
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 })
  }
}
