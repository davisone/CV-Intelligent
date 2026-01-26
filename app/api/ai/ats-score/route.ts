import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { calculateATSScore } from '@/lib/ai/openai'
import { checkRateLimit, AI_RATE_LIMITS } from '@/lib/rate-limit'
import { canUseAIFeatures } from '@/lib/payments/feature-check'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    // Vérifier le rate limit
    const rateLimitKey = `ai-ats:${session.user.id}`
    const rateLimit = checkRateLimit(rateLimitKey, AI_RATE_LIMITS.atsScore)

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
    const { resumeContent, jobDescription, resumeId } = body

    if (!resumeContent) {
      return NextResponse.json(
        { error: 'Contenu du CV requis' },
        { status: 400 }
      )
    }

    // Vérifier l'accès aux features IA si resumeId fourni
    if (resumeId) {
      const aiAccess = await canUseAIFeatures(resumeId, session.user.id)
      if (!aiAccess.allowed) {
        return NextResponse.json(
          { error: aiAccess.reason, requiresPayment: true },
          { status: 402 }
        )
      }
    }

    const result = await calculateATSScore(resumeContent, jobDescription)

    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    console.error('[AI_ATS_SCORE_ERROR]:', error)
    console.error('[AI_ATS_SCORE_ERROR] Stack:', error instanceof Error ? error.stack : 'No stack')
    console.error('[AI_ATS_SCORE_ERROR] Message:', error instanceof Error ? error.message : String(error))
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erreur lors du calcul du score ATS' },
      { status: 500 }
    )
  }
}