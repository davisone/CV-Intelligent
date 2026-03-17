import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { prisma } from '@/lib/db/prisma'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'CV Builder <onboarding@resend.dev>'

// Textes FR/EN de l'email
const content = {
  fr: {
    subject: 'Problème de génération PDF résolu — CV Builder',
    title: 'Un problème a été résolu',
    body: `Nous avons récemment identifié et corrigé un bug qui pouvait empêcher la génération de vos CV en PDF.`,
    detail: `Si vous avez rencontré une erreur lors de l'export PDF de votre CV, tout fonctionne de nouveau normalement. Vous pouvez retenter le téléchargement dès maintenant.`,
    apology: `Nous nous excusons sincèrement pour la gêne occasionnée.`,
    button: 'Accéder à mes CV',
    footer: "CV Builder — Créez votre CV parfait avec l'IA",
  },
  en: {
    subject: 'PDF generation issue resolved — CV Builder',
    title: 'An issue has been resolved',
    body: `We recently identified and fixed a bug that could prevent your resumes from being generated as PDFs.`,
    detail: `If you encountered an error when exporting your resume to PDF, everything is back to normal. You can retry the download right now.`,
    apology: `We sincerely apologize for the inconvenience.`,
    button: 'Go to my resumes',
    footer: 'CV Builder — Create your perfect resume with AI',
  },
}

function buildHtml(name: string, locale: 'fr' | 'en', dashboardUrl: string): string {
  const c = content[locale]
  const firstName = name.split(' ')[0] || name

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px; margin: 0;">
  <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
    <div style="text-align: center; margin-bottom: 32px;">
      <div style="display: inline-block; background-color: #10b981; border-radius: 50%; width: 56px; height: 56px; line-height: 56px; text-align: center;">
        <span style="color: white; font-size: 24px;">✓</span>
      </div>
    </div>
    <h1 style="color: #1a1a1a; font-size: 22px; margin-bottom: 8px; text-align: center;">${c.title}</h1>
    <p style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">Bonjour ${firstName},</p>
    <p style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">${c.body}</p>
    <p style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 16px;">${c.detail}</p>
    <p style="color: #666; font-size: 15px; line-height: 1.6; margin-bottom: 32px;">${c.apology}</p>
    <div style="text-align: center; margin: 32px 0;">
      <a href="${dashboardUrl}"
         style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
        ${c.button}
      </a>
    </div>
    <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
    <p style="color: #999; font-size: 12px; text-align: center;">${c.footer}</p>
  </div>
</body>
</html>`
}

export async function POST(request: Request) {
  // Protection par secret admin
  const authHeader = request.headers.get('Authorization')
  const adminSecret = process.env.ADMIN_SECRET
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: 'RESEND_API_KEY non configuré' }, { status: 500 })
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resume-forge.vercel.app'

  // Récupérer tous les utilisateurs avec email
  const users = await prisma.user.findMany({
    where: { email: { not: null } },
    select: { id: true, name: true, email: true },
  })

  const BATCH_SIZE = 100
  let sent = 0
  let failed = 0
  const errors: string[] = []

  // Envoi par lots de 100 (limite Resend batch)
  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    const batch = users.slice(i, i + BATCH_SIZE)

    const emails = batch
      .filter(u => u.email)
      .map(u => {
        const locale = 'fr' as const
        const dashboardUrl = `${appUrl}/${locale}/dashboard`
        const name = u.name || u.email!.split('@')[0]
        return {
          from: FROM_EMAIL,
          to: u.email!,
          subject: content[locale].subject,
          html: buildHtml(name, locale, dashboardUrl),
        }
      })

    try {
      const { data, error } = await resend.batch.send(emails)
      if (error) {
        console.error('[NOTIFY_PDF_FIX] Erreur batch:', error)
        failed += emails.length
        errors.push(String(error))
      } else {
        sent += data?.data?.length ?? emails.length
      }
    } catch (err) {
      console.error('[NOTIFY_PDF_FIX] Exception batch:', err)
      failed += emails.length
      errors.push(err instanceof Error ? err.message : String(err))
    }
  }

  console.log(`[NOTIFY_PDF_FIX] Terminé — envoyés: ${sent}, échecs: ${failed}`)

  return NextResponse.json({
    total: users.length,
    sent,
    failed,
    errors: errors.length > 0 ? errors : undefined,
  })
}
