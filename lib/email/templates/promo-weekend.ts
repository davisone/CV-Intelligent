const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://cv-builder.dvs-web.fr'

const content = {
  fr: {
    subject: '⚡ -1€ ce week-end sur CV Builder',
    headline: 'Offre exclusive week-end',
    intro: 'Ce week-end uniquement, les tarifs sont réduits de <strong>1€ sur tous les services</strong>.',
    body: "Que tu veuilles débloquer un CV premium ou générer une lettre de motivation par IA, c'est le bon moment pour en profiter — l'offre se termine <strong>dimanche 29 mars à 23h59</strong>.",
    offer_cv_label: 'CV Premium',
    offer_cv_desc: 'Tous les templates + export + score ATS',
    offer_cv_before: '4,99 €',
    offer_cv_after: '3,99 €',
    offer_cl_label: 'Génération IA',
    offer_cl_desc: 'Lettre de motivation rédigée par l\'IA',
    offer_cl_before: '2,99 €',
    offer_cl_after: '1,99 €',
    cta_hint: "L'offre est automatiquement appliquée — pas de code promo nécessaire.",
    button: "J'en profite →",
    sign_off: 'Bonne fin de semaine,',
    footer_brand: "CV Builder · Créez votre CV parfait avec l'IA",
    footer_unsub: "Tu reçois cet email car tu es inscrit·e sur CV Builder.",
    unsub_label: 'Se désabonner',
  },
  en: {
    subject: '⚡ -1€ this weekend on CV Builder',
    headline: 'Exclusive weekend deal',
    intro: 'This weekend only, prices are dropping by <strong>€1 on all services</strong>.',
    body: 'Whether you want to unlock a premium resume or generate an AI cover letter, now\'s the perfect time — the deal ends <strong>Sunday March 29 at 11:59 PM</strong>.',
    offer_cv_label: 'Premium Resume',
    offer_cv_desc: 'All templates + export + ATS score',
    offer_cv_before: '€4.99',
    offer_cv_after: '€3.99',
    offer_cl_label: 'AI Generation',
    offer_cl_desc: 'Cover letter written by AI',
    offer_cl_before: '€2.99',
    offer_cl_after: '€1.99',
    cta_hint: 'The discount is applied automatically — no promo code needed.',
    button: 'Grab the deal →',
    sign_off: 'Have a great weekend,',
    footer_brand: 'CV Builder · Create your perfect resume with AI',
    footer_unsub: "You're receiving this email because you signed up for CV Builder.",
    unsub_label: 'Unsubscribe',
  },
  es: {
    subject: '⚡ -1€ este fin de semana en CV Builder',
    headline: 'Oferta exclusiva de fin de semana',
    intro: 'Solo este fin de semana, los precios bajan <strong>1€ en todos los servicios</strong>.',
    body: 'Ya sea para desbloquear un CV premium o generar una carta de presentación con IA, es el momento perfecto — la oferta termina el <strong>domingo 29 de marzo a las 23:59</strong>.',
    offer_cv_label: 'CV Premium',
    offer_cv_desc: 'Todas las plantillas + exportación + puntuación ATS',
    offer_cv_before: '4,99 €',
    offer_cv_after: '3,99 €',
    offer_cl_label: 'Generación IA',
    offer_cl_desc: 'Carta de presentación redactada por IA',
    offer_cl_before: '2,99 €',
    offer_cl_after: '1,99 €',
    cta_hint: 'El descuento se aplica automáticamente — sin código de promoción.',
    button: 'Aprovechar la oferta →',
    sign_off: 'Buen fin de semana,',
    footer_brand: 'CV Builder · Crea tu CV perfecto con IA',
    footer_unsub: 'Recibes este correo porque estás registrado en CV Builder.',
    unsub_label: 'Darse de baja',
  },
}

export function promoWeekendHtml(locale: 'fr' | 'en' | 'es'): string {
  const c = content[locale]
  const dashboardUrl = `${APP_URL}/${locale}/dashboard`

  return `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${c.subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8f6f3; font-family: Georgia, 'Times New Roman', serif;">
  <div style="max-width: 560px; margin: 48px auto; padding: 0 16px;">

    <div style="text-align: center; margin-bottom: 36px;">
      <div style="display: inline-block; background-color: #722F37; border-radius: 8px; padding: 10px 20px;">
        <span style="color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 14px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">CV Builder</span>
      </div>
    </div>

    <div style="background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">

      <div style="height: 4px; background: linear-gradient(90deg, #722F37, #c0535e, #722F37);"></div>

      <div style="padding: 44px 48px;">

        <div style="display: inline-block; background-color: rgba(114,47,55,0.1); border-radius: 20px; padding: 6px 14px; margin-bottom: 24px;">
          <span style="color: #722F37; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 12px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;">⚡ ${c.headline}</span>
        </div>

        <p style="color: #1F1A17; font-size: 17px; line-height: 1.7; margin: 0 0 20px 0;">
          ${c.intro}
        </p>

        <p style="color: #3a3a3a; font-size: 16px; line-height: 1.8; margin: 0 0 32px 0;">
          ${c.body}
        </p>

        <!-- Offres -->
        <div style="margin: 0 0 32px 0;">

          <div style="border: 1px solid #E0D6C8; border-radius: 10px; padding: 16px 20px; margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <p style="margin: 0; color: #1F1A17; font-size: 15px; font-weight: bold; font-family: -apple-system, sans-serif;">${c.offer_cv_label}</p>
                  <p style="margin: 4px 0 0 0; color: #9B9590; font-size: 13px; font-family: -apple-system, sans-serif;">${c.offer_cv_desc}</p>
                </td>
                <td style="text-align: right; white-space: nowrap; padding-left: 16px;">
                  <p style="margin: 0; color: #9B9590; font-size: 12px; font-family: -apple-system, sans-serif; text-decoration: line-through;">${c.offer_cv_before}</p>
                  <p style="margin: 2px 0 0 0; color: #722F37; font-size: 18px; font-weight: bold; font-family: -apple-system, sans-serif;">${c.offer_cv_after}</p>
                </td>
              </tr>
            </table>
          </div>

          <div style="border: 1px solid #E0D6C8; border-radius: 10px; padding: 16px 20px;">
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              <tr>
                <td>
                  <p style="margin: 0; color: #1F1A17; font-size: 15px; font-weight: bold; font-family: -apple-system, sans-serif;">${c.offer_cl_label}</p>
                  <p style="margin: 4px 0 0 0; color: #9B9590; font-size: 13px; font-family: -apple-system, sans-serif;">${c.offer_cl_desc}</p>
                </td>
                <td style="text-align: right; white-space: nowrap; padding-left: 16px;">
                  <p style="margin: 0; color: #9B9590; font-size: 12px; font-family: -apple-system, sans-serif; text-decoration: line-through;">${c.offer_cl_before}</p>
                  <p style="margin: 2px 0 0 0; color: #722F37; font-size: 18px; font-weight: bold; font-family: -apple-system, sans-serif;">${c.offer_cl_after}</p>
                </td>
              </tr>
            </table>
          </div>

        </div>

        <p style="color: #6B6560; font-size: 14px; line-height: 1.7; margin: 0 0 32px 0; font-family: -apple-system, sans-serif;">
          ${c.cta_hint}
        </p>

        <div style="text-align: center; margin: 0 0 40px 0;">
          <a href="${dashboardUrl}"
             style="display: inline-block; background-color: #722F37; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 0.01em;">
            ${c.button}
          </a>
        </div>

        <p style="color: #3a3a3a; font-size: 16px; line-height: 1.8; margin: 0;">
          ${c.sign_off}
        </p>

        <div style="margin-top: 28px; padding-top: 28px; border-top: 1px solid #ece8e3;">
          <table cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="padding-right: 14px; vertical-align: middle;">
                <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #722F37; text-align: center; line-height: 44px;">
                  <span style="color: #ffffff; font-family: -apple-system, sans-serif; font-size: 15px; font-weight: 700;">CV</span>
                </div>
              </td>
              <td style="vertical-align: middle;">
                <p style="margin: 0; color: #1a1a1a; font-size: 15px; font-weight: bold; font-family: -apple-system, sans-serif;">Équipe CV Builder</p>
                <a href="https://cv-builder.dvs-web.fr" style="color: #722F37; font-size: 13px; font-family: -apple-system, sans-serif; text-decoration: none;">cv-builder.dvs-web.fr</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>

    <div style="text-align: center; margin-top: 28px; padding: 0 8px;">
      <p style="color: #c0bbb5; font-size: 12px; font-family: -apple-system, sans-serif; margin: 0 0 6px 0; line-height: 1.6;">
        ${c.footer_brand}
      </p>
      <p style="color: #c0bbb5; font-size: 11px; font-family: -apple-system, sans-serif; margin: 0; line-height: 1.6;">
        ${c.footer_unsub}
        <a href="{{{ unsubscribe_url }}}" style="color: #c0bbb5; text-decoration: underline;">${c.unsub_label}</a>
      </p>
    </div>

  </div>
</body>
</html>`
}

export const promoWeekendSubject = (locale: 'fr' | 'en' | 'es') => content[locale].subject
