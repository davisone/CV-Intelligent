import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const FROM_EMAIL = process.env.FROM_EMAIL || 'CV Builder <onboarding@resend.dev>'

type Locale = 'fr' | 'en'

const t = {
  footer: {
    fr: 'CV Builder - Créez votre CV parfait avec l\'IA',
    en: 'CV Builder - Create your perfect resume with AI',
  },
  verification: {
    fr: {
      subject: 'Vérifiez votre adresse email - CV Builder',
      title: 'Vérifiez votre adresse email',
      text: 'Merci de vous être inscrit sur CV Builder. Cliquez sur le bouton ci-dessous pour vérifier votre adresse email.',
      button: 'Vérifier mon email',
      expiry: 'Ce lien expire dans 24 heures. Si vous n\'avez pas créé de compte, ignorez cet email.',
    },
    en: {
      subject: 'Verify your email address - CV Builder',
      title: 'Verify your email address',
      text: 'Thank you for signing up for CV Builder. Click the button below to verify your email address.',
      button: 'Verify my email',
      expiry: 'This link expires in 24 hours. If you didn\'t create an account, please ignore this email.',
    },
  },
  welcome: {
    fr: {
      subject: 'Bienvenue sur CV Builder !',
      title: (name: string) => `Bienvenue ${name} !`,
      text: 'Merci de vous être inscrit sur CV Builder. Vous pouvez maintenant créer des CV professionnels optimisés pour les ATS.',
      button: 'Créer mon premier CV',
    },
    en: {
      subject: 'Welcome to CV Builder!',
      title: (name: string) => `Welcome ${name}!`,
      text: 'Thank you for signing up for CV Builder. You can now create professional resumes optimized for ATS systems.',
      button: 'Create my first resume',
    },
  },
  passwordReset: {
    fr: {
      subject: 'Réinitialisation de votre mot de passe - CV Builder',
      title: 'Réinitialisation de mot de passe',
      text1: 'Vous avez demandé la réinitialisation de votre mot de passe CV Builder.',
      text2: 'Cliquez sur le bouton ci-dessous pour créer un nouveau mot de passe :',
      button: 'Réinitialiser mon mot de passe',
      expiry: 'Ce lien expire dans 1 heure. Si vous n\'avez pas demandé cette réinitialisation, ignorez cet email.',
    },
    en: {
      subject: 'Reset your password - CV Builder',
      title: 'Password Reset',
      text1: 'You requested a password reset for your CV Builder account.',
      text2: 'Click the button below to create a new password:',
      button: 'Reset my password',
      expiry: 'This link expires in 1 hour. If you didn\'t request this reset, please ignore this email.',
    },
  },
  payment: {
    fr: {
      subject: (title: string) => `Confirmation de paiement - ${title} | CV Builder`,
      confirmed: 'Paiement confirmé !',
      thanks: (name: string) => `Merci ${name} ! Votre CV premium est maintenant débloqué.`,
      summary: 'Récapitulatif de commande',
      date: 'Date',
      resume: 'CV',
      product: 'Produit',
      productName: 'Accès Premium CV',
      total: 'Total',
      features: 'Fonctionnalités débloquées :',
      featureList: [
        'Tous les templates premium',
        'Suggestions IA pour améliorer votre CV',
        'Score ATS détaillé avec recommandations',
        'Export PDF haute qualité',
      ],
      button: 'Accéder à mon CV',
      invoice: 'Ce document fait office de confirmation de commande.',
      tax: 'TVA non applicable, article 293 B du CGI',
    },
    en: {
      subject: (title: string) => `Payment confirmation - ${title} | CV Builder`,
      confirmed: 'Payment confirmed!',
      thanks: (name: string) => `Thank you ${name}! Your premium resume is now unlocked.`,
      summary: 'Order summary',
      date: 'Date',
      resume: 'Resume',
      product: 'Product',
      productName: 'Premium Resume Access',
      total: 'Total',
      features: 'Unlocked features:',
      featureList: [
        'All premium templates',
        'AI suggestions to improve your resume',
        'Detailed ATS score with recommendations',
        'High quality PDF export',
      ],
      button: 'Access my resume',
      invoice: 'This document serves as an order confirmation.',
      tax: 'VAT not applicable',
    },
  },
}

export async function sendPasswordResetEmail(to: string, resetToken: string, locale: Locale = 'fr') {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/reset-password?token=${resetToken}`
  const c = t.passwordReset[locale]

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: c.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">${c.title}</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">${c.text1}</p>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">${c.text2}</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${resetUrl}"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                ${c.button}
              </a>
            </div>
            <p style="color: #999; font-size: 14px; line-height: 1.6;">${c.expiry}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">${t.footer[locale]}</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend:', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Email de réinitialisation envoyé:', data?.id)
    return { success: true, data: { messageId: data?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}

export async function sendWelcomeEmail(to: string, name: string, locale: Locale = 'fr') {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const c = t.welcome[locale]

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: c.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">${c.title(name)}</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">${c.text}</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                ${c.button}
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">${t.footer[locale]}</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend:', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Email de bienvenue envoyé:', data?.id)
    return { success: true, data: { messageId: data?.id } }
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
  resumeId: string,
  locale: Locale = 'fr'
) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const editUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/dashboard/resumes/${resumeId}/edit`
  const currentDate = new Date().toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
  const c = t.payment[locale]

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: c.subject(resumeTitle),
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
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 8px; text-align: center;">${c.confirmed}</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6; text-align: center; margin-bottom: 32px;">${c.thanks(name)}</p>
            <div style="background-color: #f9fafb; border-radius: 8px; padding: 24px; margin-bottom: 32px;">
              <h2 style="color: #374151; font-size: 14px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 16px;">${c.summary}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="color: #6b7280; padding: 8px 0;">${c.date}</td>
                  <td style="color: #111827; font-weight: 500; text-align: right; padding: 8px 0;">${currentDate}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; padding: 8px 0;">${c.resume}</td>
                  <td style="color: #111827; font-weight: 500; text-align: right; padding: 8px 0;">${resumeTitle}</td>
                </tr>
                <tr>
                  <td style="color: #6b7280; padding: 8px 0;">${c.product}</td>
                  <td style="color: #111827; font-weight: 500; text-align: right; padding: 8px 0;">${c.productName}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding: 16px 0;"><hr style="border: none; border-top: 1px solid #e5e7eb;"></td>
                </tr>
                <tr>
                  <td style="color: #111827; font-weight: 600; padding: 8px 0;">${c.total}</td>
                  <td style="color: #111827; font-weight: 600; text-align: right; padding: 8px 0;">${amount}</td>
                </tr>
              </table>
            </div>
            <div style="margin-bottom: 32px;">
              <h3 style="color: #1a1a1a; font-size: 16px; margin-bottom: 16px;">${c.features}</h3>
              <ul style="color: #666; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
                ${c.featureList.map(f => `<li>${f}</li>`).join('')}
              </ul>
            </div>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${editUrl}"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                ${c.button}
              </a>
            </div>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center; margin-bottom: 8px;">${c.invoice}</p>
            <p style="color: #999; font-size: 12px; text-align: center;">
              ${t.footer[locale]}<br>${c.tax}
            </p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend:', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Email de confirmation de paiement envoyé:', data?.id)
    return { success: true, data: { messageId: data?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}

export async function sendVerificationEmail(to: string, verificationToken: string, locale: Locale = 'fr') {
  if (!process.env.RESEND_API_KEY) {
    console.warn('[EMAIL] RESEND_API_KEY non configuré, email ignoré')
    return { success: false, error: 'Email not configured' }
  }

  const verifyUrl = `${process.env.NEXT_PUBLIC_APP_URL}/${locale}/verify-email?token=${verificationToken}`
  const c = t.verification[locale]

  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: c.subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f5f5f5; padding: 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <h1 style="color: #1a1a1a; font-size: 24px; margin-bottom: 24px;">${c.title}</h1>
            <p style="color: #666; font-size: 16px; line-height: 1.6;">${c.text}</p>
            <div style="text-align: center; margin: 32px 0;">
              <a href="${verifyUrl}"
                 style="display: inline-block; background-color: #722F37; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px;">
                ${c.button}
              </a>
            </div>
            <p style="color: #999; font-size: 14px; line-height: 1.6;">${c.expiry}</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;">
            <p style="color: #999; font-size: 12px; text-align: center;">${t.footer[locale]}</p>
          </div>
        </body>
        </html>
      `,
    })

    if (error) {
      console.error('[EMAIL] Erreur Resend:', error)
      return { success: false, error }
    }

    console.log('[EMAIL] Email de vérification envoyé:', data?.id)
    return { success: true, data: { messageId: data?.id } }
  } catch (error) {
    console.error('[EMAIL_ERROR]:', error)
    return { success: false, error }
  }
}
