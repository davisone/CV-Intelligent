import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { renderToStaticMarkup } from 'react-dom/server'
import React from 'react'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { checkResumeAccess } from '@/lib/payments/feature-check'
import { templates, TemplateType } from '@/components/cv-templates'

export const maxDuration = 60

interface RouteParams {
  params: Promise<{ id: string }>
}

function buildCvData(resume: Record<string, unknown>) {
  const personalInfo = resume.personalInfo as Record<string, unknown> | null
  return {
    personalInfo: {
      firstName: (personalInfo?.firstName as string) ?? '',
      lastName: (personalInfo?.lastName as string) ?? '',
      email: (personalInfo?.email as string) ?? '',
      phone: (personalInfo?.phone as string) ?? '',
      city: (personalInfo?.city as string) ?? '',
      country: (personalInfo?.country as string) ?? '',
      linkedin: (personalInfo?.linkedin as string) ?? '',
      linkedinLabel: (personalInfo?.linkedinLabel as string) ?? '',
      github: (personalInfo?.github as string) ?? '',
      githubLabel: (personalInfo?.githubLabel as string) ?? '',
      portfolio: (personalInfo?.portfolio as string) ?? '',
      portfolioLabel: (personalInfo?.portfolioLabel as string) ?? '',
      summary: (personalInfo?.summary as string) ?? '',
      photoUrl: (personalInfo?.photoUrl as string) ?? '',
      drivingLicenses: (personalInfo?.drivingLicenses as string) ?? '',
    },
    experiences: (resume.experiences as unknown[]) ?? [],
    educations: (resume.educations as unknown[]) ?? [],
    certifications: (resume.certifications as unknown[]) ?? [],
    projects: (resume.projects as unknown[]) ?? [],
    skills: (resume.skills as unknown[]) ?? [],
    languages: (resume.languages as unknown[]) ?? [],
    interests: (resume.interests as unknown[]) ?? [],
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    const { id } = await params
    const locale = new URL(request.url).searchParams.get('locale') ?? 'fr'

    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const access = await checkResumeAccess(id, session.user.id)
    if (access.requiresPayment && !access.canAccess) {
      return NextResponse.json(
        { error: 'Paiement requis pour générer le PDF' },
        { status: 402 }
      )
    }

    // Récupère toutes les données en une seule requête DB
    // (remplace les deux requêtes : findFirst titre + goto /cv-render qui refaisait un findUnique)
    const resume = await prisma.resume.findFirst({
      where: { id, userId: session.user.id },
      include: {
        personalInfo: true,
        experiences: { orderBy: { order: 'asc' } },
        educations: { orderBy: { order: 'asc' } },
        certifications: { orderBy: { order: 'asc' } },
        skills: { orderBy: { order: 'asc' } },
        languages: { orderBy: { order: 'asc' } },
        projects: { orderBy: { order: 'asc' } },
        interests: { orderBy: { order: 'asc' } },
      },
    })

    if (!resume) {
      return NextResponse.json({ error: 'CV introuvable' }, { status: 404 })
    }

    // Rendu du template React en HTML statique — élimine la requête vers /cv-render
    const templateKey = (resume.template as TemplateType) || 'MODERN'
    const TemplateComponent = templates[templateKey] || templates.MODERN
    const cvData = buildCvData(resume as unknown as Record<string, unknown>)
    const templateHtml = renderToStaticMarkup(
      React.createElement(TemplateComponent, { data: cvData, locale })
    )

    const htmlContent = `<!DOCTYPE html>
<html lang="${locale}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>* { margin: 0; padding: 0; box-sizing: border-box; } body { background: white; }</style>
</head>
<body>
  <div data-auto-fit-wrapper style="width:21cm;margin:0 auto;">
    <div data-cv-container>${templateHtml}</div>
  </div>
</body>
</html>`

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

      // setContent au lieu de goto — pas de requête réseau vers /cv-render
      await page.setContent(htmlContent, { waitUntil: 'networkidle0', timeout: 15_000 })

      await page.evaluate(() => {
        const A4_RATIO = 29.7 / 21

        document.documentElement.style.cssText = 'margin:0!important;padding:0!important;'
        document.body.style.cssText = 'margin:0!important;padding:0!important;background:white!important;'

        const wrapper = document.querySelector('[data-auto-fit-wrapper]') as HTMLElement | null
        if (wrapper) {
          wrapper.style.width = '100%'
          wrapper.style.margin = '0'
        }

        const cvContainer = document.querySelector('[data-cv-container]') as HTMLElement | null
        const templateDiv = cvContainer?.firstElementChild as HTMLElement | null
        if (templateDiv) {
          templateDiv.style.width = '100%'
          templateDiv.style.margin = '0'
        }

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
