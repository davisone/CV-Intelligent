import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { feedbackRequestHtml, feedbackRequestSubject } from '@/lib/email/templates/feedback-request'
import { promoWeekendHtml, promoWeekendSubject } from '@/lib/email/templates/promo-weekend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'Evan de CV Builder <onboarding@resend.dev>'

const broadcastSchema = z.object({
  locale: z.enum(['fr', 'en', 'es']),
  name: z.string().min(1),
  template: z.enum(['feedback-request', 'promo-weekend']).default('feedback-request'),
})

function getAudienceId(locale: 'fr' | 'en' | 'es'): string | undefined {
  if (locale === 'en') return process.env.RESEND_AUDIENCE_EN_ID
  if (locale === 'es') return process.env.RESEND_AUDIENCE_ES_ID
  return process.env.RESEND_AUDIENCE_FR_ID
}

function getSubject(template: 'feedback-request' | 'promo-weekend', locale: 'fr' | 'en' | 'es'): string {
  if (template === 'promo-weekend') return promoWeekendSubject(locale)
  return feedbackRequestSubject(locale as 'fr' | 'en')
}

function getHtml(template: 'feedback-request' | 'promo-weekend', locale: 'fr' | 'en' | 'es'): string {
  if (template === 'promo-weekend') return promoWeekendHtml(locale)
  return feedbackRequestHtml(locale as 'fr' | 'en')
}

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization')
  const adminSecret = process.env.ADMIN_SECRET?.trim()
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY non configuré' }, { status: 500 })
  }

  const body = await request.json()
  const parsed = broadcastSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 })
  }

  const { locale, name, template } = parsed.data

  const audienceId = getAudienceId(locale)

  if (!audienceId) {
    return NextResponse.json({ error: `RESEND_AUDIENCE_${locale.toUpperCase()}_ID non configuré` }, { status: 500 })
  }

  try {
    const { data: broadcast, error: createError } = await resend.broadcasts.create({
      audienceId,
      from: FROM_EMAIL,
      subject: getSubject(template, locale),
      html: getHtml(template, locale),
      name,
    })

    if (createError || !broadcast?.id) {
      console.error('[BROADCAST] Erreur création:', createError)
      return NextResponse.json({ error: createError }, { status: 500 })
    }

    const { data: sendData, error: sendError } = await resend.broadcasts.send(broadcast.id)

    if (sendError) {
      console.error('[BROADCAST] Erreur envoi:', sendError)
      return NextResponse.json({ error: sendError, broadcastId: broadcast.id }, { status: 500 })
    }

    console.log(`[BROADCAST] Envoyé — template: ${template}, locale: ${locale}, id: ${broadcast.id}`)

    return NextResponse.json({ success: true, broadcastId: broadcast.id, data: sendData })
  } catch (err) {
    console.error('[BROADCAST] Exception:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
