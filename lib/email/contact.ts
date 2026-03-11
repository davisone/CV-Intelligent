import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)
const FROM_EMAIL = process.env.FROM_EMAIL || 'CV Builder <onboarding@resend.dev>'

export async function sendContactNotification(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const contactEmail = process.env.CONTACT_EMAIL
  if (!contactEmail) {
    console.error('[EMAIL] CONTACT_EMAIL non configuré')
    return { success: false, error: 'CONTACT_EMAIL not configured' }
  }

  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to: contactEmail,
      subject: `[CV Builder] Nouveau message de ${data.name} — ${data.subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #722F37; font-size: 24px; margin-bottom: 24px;">
              Nouveau message de contact
            </h1>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="color: #6b7280; padding: 8px 0; width: 100px;">Date</td><td style="color: #111827; font-weight: 500;">${currentDate}</td></tr>
              <tr><td style="color: #6b7280; padding: 8px 0;">Nom</td><td style="color: #111827; font-weight: 500;">${data.name}</td></tr>
              <tr><td style="color: #6b7280; padding: 8px 0;">Email</td><td><a href="mailto:${data.email}" style="color: #722F37;">${data.email}</a></td></tr>
              <tr><td style="color: #6b7280; padding: 8px 0;">Sujet</td><td style="color: #111827; font-weight: 500;">${data.subject}</td></tr>
            </table>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <h2 style="color: #374151; font-size: 16px; margin-bottom: 12px;">Message</h2>
            <p style="color: #374151; font-size: 15px; line-height: 1.7; white-space: pre-wrap;">${data.message}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">CV Builder — Formulaire de contact</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend (notification):', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Notification contact envoyée:', emailData?.id)
    return { success: true, data: { messageId: emailData?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR] sendContactNotification:', error)
    return { success: false, error }
  }
}

export async function sendContactConfirmation(
  to: string,
  name: string,
  subject: string,
  message: string
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const { data: emailData, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Votre message a bien été reçu — CV Builder',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">
              Votre message a bien été reçu, ${name} !
            </h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Merci de nous avoir contacté. Nous avons bien reçu votre message et vous répondrons dans un délai de 48 heures ouvrées.
            </p>
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin: 24px 0;">
              <h2 style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">Récapitulatif</h2>
              <p style="color: #6b7280; margin: 0 0 8px;"><strong style="color: #111827;">Sujet :</strong> ${subject}</p>
              <p style="color: #6b7280; margin: 0; white-space: pre-wrap;"><strong style="color: #111827;">Message :</strong> ${message}</p>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">CV Builder — Créez votre CV parfait avec l'IA</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend (confirmation):', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Confirmation contact envoyée:', emailData?.id)
    return { success: true, data: { messageId: emailData?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR] sendContactConfirmation:', error)
    return { success: false, error }
  }
}
