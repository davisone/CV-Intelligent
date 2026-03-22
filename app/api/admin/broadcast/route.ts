import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'
import { feedbackRequestHtml, feedbackRequestSubject } from '@/lib/email/templates/feedback-request'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'Evan de CV Builder <onboarding@resend.dev>'

const broadcastSchema = z.object({
  locale: z.enum(['fr', 'en']),
  name: z.string().min(1),
})

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

  const { locale, name } = parsed.data

  const audienceId = locale === 'en'
    ? process.env.RESEND_AUDIENCE_EN_ID
    : process.env.RESEND_AUDIENCE_FR_ID

  if (!audienceId) {
    return NextResponse.json({ error: `RESEND_AUDIENCE_${locale.toUpperCase()}_ID non configuré` }, { status: 500 })
  }

  try {
    const { data: broadcast, error: createError } = await resend.broadcasts.create({
      audienceId,
      from: FROM_EMAIL,
      subject: feedbackRequestSubject(locale),
      html: feedbackRequestHtml(locale),
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

    console.log(`[BROADCAST] Envoyé — locale: ${locale}, id: ${broadcast.id}`)

    return NextResponse.json({ success: true, broadcastId: broadcast.id, data: sendData })
  } catch (err) {
    console.error('[BROADCAST] Exception:', err)
    return NextResponse.json({ error: 'Erreur interne' }, { status: 500 })
  }
}
