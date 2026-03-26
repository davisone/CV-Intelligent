import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import OpenAI from 'openai'
import { COVER_LETTER_AI_PRICING } from '@/lib/config/pricing'

interface RouteParams {
  params: Promise<{ id: string }>
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

// POST /api/cover-letters/[id]/generate
export async function POST(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const coverLetter = await prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
      include: {
        resume: {
          select: {
            id: true,
            isPaid: true,
            personalInfo: true,
            experiences: { orderBy: { order: 'asc' } },
            educations: { orderBy: { order: 'asc' } },
            skills: { orderBy: { order: 'asc' } },
            languages: { orderBy: { order: 'asc' } },
          },
        },
      },
    })

    if (!coverLetter) {
      return NextResponse.json({ error: 'Lettre introuvable' }, { status: 404 })
    }

    // Vérifier autorisation IA : CV payé OU paiement IA effectué
    if (!coverLetter.resume.isPaid && !coverLetter.isAIPaid) {
      return NextResponse.json({ error: 'Paiement requis pour la génération IA' }, { status: 402 })
    }

    // Vérifier la limite de générations
    if (coverLetter.aiGenerationsUsed >= COVER_LETTER_AI_PRICING.maxGenerations) {
      return NextResponse.json(
        { error: 'Limite de générations atteinte (3 max par lettre)' },
        { status: 403 }
      )
    }

    const { resume, jobTitle, company } = coverLetter
    const info = resume.personalInfo

    const candidateName = info ? `${info.firstName} ${info.lastName}` : 'Le candidat'
    const currentRole = coverLetter.jobTitle ?? ''

    const experienceText = resume.experiences
      .map(e => `- ${e.position} chez ${e.company}${e.description ? ` : ${e.description}` : ''}`)
      .join('\n')

    const educationText = resume.educations
      .map(e => `- ${e.degree}${e.field ? ` en ${e.field}` : ''} — ${e.institution}`)
      .join('\n')

    const skillsText = resume.skills.map(s => s.name).join(', ')

    const systemPrompt = `Tu es un expert en rédaction de lettres de motivation professionnelles. Tu rédiges des lettres percutantes, personnalisées et adaptées au poste visé.

Règles :
- Ton professionnel mais humain
- Structure : accroche → parcours → motivation → appel à l'action
- 3 à 4 paragraphes, environ 300 mots
- Réponds dans la même langue que les informations fournies
- Ne mets pas de date, d'adresse ni de formule de politesse formelle au début
- Termine par une formule de politesse appropriée suivie du nom du candidat`

    const userPrompt = `Rédige une lettre de motivation pour :
Candidat : ${candidateName}${currentRole ? ` (${currentRole})` : ''}
Poste visé : ${jobTitle ?? 'non précisé'}
Entreprise : ${company ?? 'non précisée'}

Expériences :
${experienceText || 'Non renseignées'}

Formation :
${educationText || 'Non renseignée'}

Compétences : ${skillsText || 'Non renseignées'}`

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      max_tokens: 1500,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
    })

    const generatedContent = response.choices[0]?.message?.content
    if (!generatedContent) {
      throw new Error('Réponse OpenAI vide')
    }

    // Sauvegarder le contenu généré et incrémenter le compteur
    const updated = await prisma.coverLetter.update({
      where: { id },
      data: {
        content: generatedContent,
        aiGenerationsUsed: { increment: 1 },
      },
    })

    return NextResponse.json({
      success: true,
      data: {
        content: updated.content,
        aiGenerationsUsed: updated.aiGenerationsUsed,
        aiGenerationsRemaining: COVER_LETTER_AI_PRICING.maxGenerations - updated.aiGenerationsUsed,
      },
    })
  } catch (error) {
    console.error('[COVER_LETTER_GENERATE]:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
