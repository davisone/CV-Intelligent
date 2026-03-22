import { feedbackRequestHtml } from '@/lib/email/templates/feedback-request'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const adminSecret = process.env.ADMIN_SECRET?.trim()

  if (!adminSecret || secret !== adminSecret) {
    return new Response('Unauthorized', { status: 401 })
  }

  const locale = searchParams.get('locale') === 'en' ? 'en' : 'fr'

  // Remplacer la variable unsubscribe par un lien factice pour la preview
  const html = feedbackRequestHtml(locale).replace(
    '{{{ unsubscribe_url }}}',
    '#preview-unsubscribe'
  )

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  })
}
