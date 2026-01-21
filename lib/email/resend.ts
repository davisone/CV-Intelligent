import { Resend } from 'resend'

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null

const FROM_EMAIL = process.env.FROM_EMAIL || 'ResumeForge <noreply@resumeforge.com>'

export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
) {
  if (!resend) {
    console.warn('[EMAIL] Resend API key not configured, skipping email')
    return { success: false, error: 'Email not configured' }
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Réinitialisation de votre mot de passe - ResumeForge',
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
              Réinitialisation de mot de passe
            </h1>

            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Vous avez demandé la réinitialisation de votre mot de passe ResumeForge.
            </p>

            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}"
                 style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Réinitialiser mon mot de passe
              </a>
            </div>

            <p style="color: #999; font-size: 14px; line-height: 1.6;">
              Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

            <p style="color: #999; font-size: 12px; text-align: center;">
              ResumeForge - Créez votre CV parfait avec l'IA
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL_ERROR]:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  if (!resend) {
    console.warn('[EMAIL] Resend API key not configured, skipping email')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Bienvenue sur ResumeForge !',
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
              Bienvenue ${name} !
            </h1>

            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Merci de vous être inscrit sur ResumeForge. Vous pouvez maintenant créer des CV professionnels optimisés pour les ATS.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
                 style="display: inline-block; background-color: #2563eb; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Créer mon premier CV
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

            <p style="color: #999; font-size: 12px; text-align: center;">
              ResumeForge - Créez votre CV parfait avec l'IA
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL_ERROR]:', error)
      return { success: false, error }
    }

    return { success: true, data }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}