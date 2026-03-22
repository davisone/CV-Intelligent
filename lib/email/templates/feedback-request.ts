const REVIEW_URL = 'https://g.page/r/CcSyetXUJJrpEAE/review'

const content = {
  fr: {
    subject: 'Un mot personnel de ma part — CV Builder',
    quote: 'Un mot personnel de ma part.',
    intro: "J'espère que <strong>CV Builder</strong> t'a aidé à créer un CV dont tu es fier·e.",
    body: "Je me permets de t'écrire directement — CV Builder est mon <strong>premier projet web personnel</strong>. Je suis étudiant développeur web freelance, et ton avis m'aiderait <em>vraiment</em> beaucoup, autant pour améliorer l'app que pour montrer mon travail à de futurs clients.",
    cta_hint: "Laisser un avis sur Google ne prend qu'une minute — et ça compte énormément pour moi.",
    button: '★ Donner un avis sur CV Builder',
    sign_off: 'Merci pour ta confiance,',
    job_title: 'Développeur web freelance',
    footer_brand: "CV Builder · Créez votre CV parfait avec l'IA",
    footer_unsub: "Tu reçois cet email car tu es inscrit·e sur CV Builder.",
    unsub_label: 'Se désabonner',
  },
  en: {
    subject: 'A personal note from me — CV Builder',
    quote: 'A personal note from me.',
    intro: 'I hope <strong>CV Builder</strong> helped you create a resume you\'re proud of.',
    body: "I'm reaching out personally — CV Builder is my <strong>first personal web project</strong>. I'm a student freelance web developer, and your review would mean <em>a lot</em> to me, both to improve the app and to show my work to future clients.",
    cta_hint: 'Leaving a Google review only takes a minute — and it truly makes a difference for me.',
    button: '★ Leave a review for CV Builder',
    sign_off: 'Thank you for your trust,',
    job_title: 'Freelance web developer',
    footer_brand: 'CV Builder · Create your perfect resume with AI',
    footer_unsub: "You're receiving this email because you signed up for CV Builder.",
    unsub_label: 'Unsubscribe',
  },
}

export function feedbackRequestHtml(locale: 'fr' | 'en'): string {
  const c = content[locale]

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

    <div style="background-color: #ffffff; border-radius: 12px; padding: 44px 48px; box-shadow: 0 2px 12px rgba(0,0,0,0.06);">

      <p style="color: #722F37; font-size: 17px; line-height: 1.6; margin: 0 0 28px 0; font-style: italic; border-left: 3px solid #722F37; padding-left: 16px;">
        "${c.quote}"
      </p>

      <p style="color: #3a3a3a; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
        ${c.intro}
      </p>

      <p style="color: #3a3a3a; font-size: 16px; line-height: 1.8; margin: 0 0 20px 0;">
        ${c.body}
      </p>

      <p style="color: #3a3a3a; font-size: 16px; line-height: 1.8; margin: 0 0 36px 0;">
        ${c.cta_hint}
      </p>

      <div style="text-align: center; margin: 0 0 40px 0;">
        <a href="${REVIEW_URL}"
           style="display: inline-block; background-color: #722F37; color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 8px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; font-size: 15px; font-weight: 600; letter-spacing: 0.01em;">
          ${c.button}
        </a>
      </div>

      <p style="color: #3a3a3a; font-size: 16px; line-height: 1.8; margin: 0 0 0 0;">
        ${c.sign_off}
      </p>

      <div style="margin-top: 28px; padding-top: 28px; border-top: 1px solid #ece8e3;">
        <table cellpadding="0" cellspacing="0" border="0">
          <tr>
            <td style="padding-right: 14px; vertical-align: middle;">
              <div style="width: 44px; height: 44px; border-radius: 50%; background-color: #722F37; text-align: center; line-height: 44px;">
                <span style="color: #ffffff; font-family: -apple-system, sans-serif; font-size: 18px; font-weight: 700;">E</span>
              </div>
            </td>
            <td style="vertical-align: middle;">
              <p style="margin: 0; color: #1a1a1a; font-size: 15px; font-weight: bold; font-family: -apple-system, sans-serif;">Evan Davison</p>
              <p style="margin: 2px 0 0 0; color: #888; font-size: 13px; font-family: -apple-system, sans-serif;">${c.job_title}</p>
              <a href="https://dvs-web.fr" style="color: #722F37; font-size: 13px; font-family: -apple-system, sans-serif; text-decoration: none;">dvs-web.fr</a>
            </td>
          </tr>
        </table>
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

export const feedbackRequestSubject = (locale: 'fr' | 'en') => content[locale].subject
