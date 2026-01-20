import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { calculateATSScore } from '@/lib/ai/openai'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()
    const { resumeContent, jobDescription } = body

    if (!resumeContent) {
      return NextResponse.json(
        { error: 'Contenu du CV requis' },
        { status: 400 }
      )
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