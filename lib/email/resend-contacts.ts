import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

function getAudienceId(locale: string): string | undefined {
  return locale === 'en'
    ? process.env.RESEND_AUDIENCE_EN_ID
    : process.env.RESEND_AUDIENCE_FR_ID
}

function parseNames(fullName: string | null): { firstName: string; lastName?: string } {
  if (!fullName) return { firstName: '' }
  const parts = fullName.trim().split(' ')
  return {
    firstName: parts[0],
    lastName: parts.length > 1 ? parts.slice(1).join(' ') : undefined,
  }
}

export async function addContact(email: string, name: string | null, locale = 'fr') {
  const audienceId = getAudienceId(locale)
  if (!audienceId || !process.env.RESEND_API_KEY) return

  const { firstName, lastName } = parseNames(name)

  try {
    await resend.contacts.create({
      audienceId,
      email,
      firstName,
      lastName,
      unsubscribed: false,
    })
  } catch (err) {
    console.error('[RESEND_CONTACTS] Erreur ajout contact:', err)
  }
}
