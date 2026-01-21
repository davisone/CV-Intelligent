import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { generateSuggestion } from '@/lib/ai/openai'
import { checkRateLimit, AI_RATE_LIMITS } from '@/lib/rate-limit'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Vérifier le rate limit
    const rateLimitKey = `ai-suggest:${session.user.id}`
    const rateLimit = checkRateLimit(rateLimitKey, AI_RATE_LIMITS.suggest)

    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Trop de requêtes. Réessayez dans ${rateLimit.resetIn} secondes.`,
          retryAfter: rateLimit.resetIn
        },
        {
          status: 429,
          headers: {
            'Retry-After': String(rateLimit.resetIn),
            'X-RateLimit-Remaining': '0',
          }
        }
      )
    }

    const body = await request.json()
    const { content, section, context } = body

    if (!content || !section) {
      return NextResponse.json(
        { error: 'Contenu et section requis' },
        { status: 400 }
      )
    }

    if (!['summary', 'experience', 'skills'].includes(section)) {
      return NextResponse.json(
        { error: 'Section invalide' },
        { status: 400 }
      )
    }

    const result = await generateSuggestion(content, section, context)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('[AI_SUGGEST_ERROR]:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération de suggestion' },
      { status: 500 }
    )
  }
}