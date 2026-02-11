import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'ssl0.ovh.net',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
})

const FROM_EMAIL = process.env.FROM_EMAIL || 'CV Builder <noreply@cv-builder.fr>'

export async function sendPasswordResetEmail(
  to: string,
  resetToken: string
) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('[EMAIL] SMTP not configured, skipping email')
    return { success: false, error: 'Email not configured' }
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${resetToken}`

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject: 'Réinitialisation de votre mot de passe - CV Builder',
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
              Vous avez demandé la réinitialisation de votre mot de passe CV Builder.
            </p>

            <p style="color: #666; font-size: 16px; line-height: 1.6;">
              Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Réinitialiser mon mot de passe
              </a>
            </div>

            <p style="color: #999; font-size: 14px; line-height: 1.6;">
              Ce lien expire dans 1 heure. Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.
            </p>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

            <p style="color: #999; font-size: 12px; text-align: center;">
              CV Builder - Créez votre CV parfait avec l'IA
            </p>
          </div>
        </body>
        </html>
      `,
    })

    console.log('[EMAIL] Password reset email sent:', info.messageId)
    return { success: true, data: { messageId: info.messageId } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(to: string, name: string) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('[EMAIL] SMTP not configured, skipping email')
    return { success: false, error: 'Email not configured' }
  }

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject: 'Bienvenue sur CV Builder !',
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
              Merci de vous être inscrit sur CV Builder. Vous pouvez maintenant créer des CV professionnels optimisés pour les ATS.
            </p>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Créer mon premier CV
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

            <p style="color: #999; font-size: 12px; text-align: center;">
              CV Builder - Créez votre CV parfait avec l'IA
            </p>
          </div>
        </body>
        </html>
      `,
    })

    console.log('[EMAIL] Welcome email sent:', info.messageId)
    return { success: true, data: { messageId: info.messageId } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}

export async function sendPaymentConfirmationEmail(
  to: string,
  name: string,
  resumeTitle: string,
  amount: string,
  resumeId: string
) {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
    console.warn('[EMAIL] SMTP not configured, skipping email')
    return { success: false, error: 'Email not configured' }
  }

  const editUrl = `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/resumes/${resumeId}/edit`
  const currentDate = new Date().toLocaleDateString('fr-FR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  try {
    const info = await transporter.sendMail({
      from: FROM_EMAIL,
      to,
      subject: `Confirmation de paiement - ${resumeTitle} | CV Builder`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 32px;">
              <div style="display: inline-block; background-color: #10b981; border-radius: 50%; padding: 16px; width: 32px; height: 32px;">
                <span style="color: white; font-size: 24px;">✓</span>
              </div>
            </div>

            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 8px; text-align: center;">
              Paiement confirmé !
            </h1>

            <p style="color: #666; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 32px;">
              Merci ${name} ! Votre CV premium est maintenant débloqué.
            </p>

            <!-- Récapitulatif -->
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
              <h2 style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">
                Récapitulatif de commande
              </h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #6b7280; padding: 8px 0;">Date</td>
                  <td style="color: #111827; font-weight: 500; text-align: right; padding: 8px 0;">${currentDate}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; padding: 8px 0;">CV</td>
                  <td style="color: #111827; font-weight: 500; text-align: right; padding: 8px 0;">${resumeTitle}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; padding: 8px 0;">Produit</td>
                  <td style="color: #111827; font-weight: 500; text-align: right; padding: 8px 0;">Accès Premium CV</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 0;"><hr style="border: none; border-top: 1px solid #e5e7eb;"></td>
                </tr>
                <tr>
                  <td style="color: #111827; font-weight: 600; padding: 8px 0;">Total</td>
                  <td style="color: #111827; font-weight: 600; text-align: right; padding: 8px 0;">${amount}</td>
                </tr>
              </table>
            </div>

            <!-- Fonctionnalités débloquées -->
            <div style="margin-bottom: 32px;">
              <h3 style="color: #1a1a1a; font-size: 16px; margin-bottom: 16px;">
                Fonctionnalités débloquées :
              </h3>
              <ul style="color: #666; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
                <li>Tous les templates premium</li>
                <li>Suggestions IA pour améliorer votre CV</li>
                <li>Score ATS détaillé avec recommandations</li>
                <li>Export PDF haute qualité</li>
              </ul>
            </div>

            <div style="text-align: center; margin: 32px 0;">
              <a href="${editUrl}"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                Accéder à mon CV
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">

            <p style="color: #999; font-size: 12px; text-align: center; margin-bottom: 8px;">
              Ce document fait office de confirmation de commande.
            </p>

            <p style="color: #999; font-size: 12px; text-align: center;">
              CV Builder - Créez votre CV parfait avec l'IA<br>
              TVA non applicable, article 293 B du CGI
            </p>
          </div>
        </body>
        </html>
      `,
    })

    console.log('[EMAIL] Payment confirmation email sent:', info.messageId)
    return { success: true, data: { messageId: info.messageId } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}
