import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { createHmac } from 'crypto'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { checkResumeAccess } from '@/lib/payments/feature-check'

export const maxDuration = 60

interface RouteParams {
  params: Promise<{ id: string }>
}

// Génère un token HMAC pour accéder à la page de rendu interne
function generateRenderToken(resumeId: string): { token: string; ts: string } {
  const secret = process.env.NEXTAUTH_SECRET
  if (!secret) throw new Error('NEXTAUTH_SECRET non configuré')

  const ts = Date.now().toString()
  const token = createHmac('sha256', secret)
    .update(`${resumeId}:${ts}`)
    .digest('hex')

  return { token, ts }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    const locale = new URL(request.url).searchParams.get('locale') ?? 'fr'

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Vérifier l'accès
    const access = await checkResumeAccess(id, session.user.id)
    if (access.requiresPayment && !access.canAccess) {
      return NextResponse.json(
        { error: 'Paiement requis pour générer le PDF' },
        { status: 402 }
      )
    }

    // Vérifier que le CV existe et appartient à l'utilisateur
    const resume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
      select: { id: true, title: true },
    })

    if (!resume) {
      return NextResponse.json({ error: 'CV introuvable' }, { status: 404 })
    }

    // Lancer Puppeteer (avant la génération du token pour éviter l'expiration)
    const isProduction = process.env.VERCEL === '1'
    const puppeteer = (await import('puppeteer-core')).default

    let executablePath: string
    let launchArgs: string[]

    if (isProduction) {
      const chromium = (await import('@sparticuz/chromium-min')).default
      executablePath = await chromium.executablePath(
        'https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar'
      )
      launchArgs = chromium.args
    } else {
      const possiblePaths = [
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        '/usr/bin/google-chrome',
        '/usr/bin/chromium-browser',
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      ]
      const fs = await import('fs')
      executablePath = possiblePaths.find(p => fs.existsSync(p)) ?? ''
      if (!executablePath) {
        return NextResponse.json(
          { error: 'Chrome introuvable sur le système' },
          { status: 500 }
        )
      }
      launchArgs = ['--no-sandbox', '--disable-setuid-sandbox']
    }

    const browser = await puppeteer.launch({
      args: launchArgs,
      defaultViewport: { width: 794, height: 1123 },
      executablePath,
      headless: true,
    })

    try {
      const page = await browser.newPage()

      // Générer le token APRÈS le lancement du navigateur pour éviter l'expiration
      const { token, ts } = generateRenderToken(id)
      const baseUrl = process.env.NEXTAUTH_URL
        || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null)
        || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : null)
        || `http://localhost:${process.env.PORT || 3000}`
      const renderUrl = `${baseUrl}/cv-render/${id}?token=${token}&ts=${ts}&locale=${locale}`

      // Pré-accepter les cookies pour éviter le bandeau
      await page.evaluateOnNewDocument(() => {
        localStorage.setItem('cookie-consent', 'refused')
      })

      await page.goto(renderUrl, { waitUntil: 'networkidle0', timeout: 15_000 })

      // Appliquer le scaling auto-fit + nettoyage directement via Puppeteer
      // (sans dépendre du useEffect client-side qui peut ne pas s'exécuter en headless)
      await page.evaluate(() => {
        const A4_RATIO = 29.7 / 21

        const wrapper = document.querySelector('[data-auto-fit-wrapper]') as HTMLElement | null
        const content = wrapper?.firstElementChild as HTMLElement | null
        if (wrapper && content) {
          const pageWidth = content.offsetWidth
          const pageHeight = pageWidth * A4_RATIO
          const contentHeight = content.scrollHeight
          if (contentHeight > pageHeight + 2) {
            const scale = Math.max(pageHeight / contentHeight, 0.65)
            content.style.width = `${pageWidth / scale}px`
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(content.style as any).zoom = `${scale}`
          }
        }

        // Supprimer tout élément fixed/sticky résiduel (toaster, overlays, etc.)
        document.querySelectorAll('*').forEach(el => {
          const style = getComputedStyle(el)
          if (style.position === 'fixed' || style.position === 'sticky') {
            (el as HTMLElement).remove()
          }
        })
      })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      })

      const fileName = `${resume.title.replace(/[^a-z0-9àâäéèêëïîôùûüÿçæœ\s-]/gi, '').replace(/\s+/g, '_')}_cv.pdf`

      return new Response(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${fileName}"`,
        },
      })
    } finally {
      await browser.close()
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[PDF_GENERATION]:', message)
    return NextResponse.json(
      { error: `Erreur lors de la génération du PDF: ${message}` },
      { status: 500 }
    )
  }
}
