import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export const maxDuration = 60

interface RouteParams {
  params: Promise<{ id: string }>
}

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { id } = await params

    const coverLetter = await prisma.coverLetter.findFirst({
      where: { id, userId: session.user.id },
      include: {
        resume: { select: { personalInfo: true } },
      },
    })

    if (!coverLetter) {
      return NextResponse.json({ error: 'Lettre introuvable' }, { status: 404 })
    }

    const info = coverLetter.resume.personalInfo
    const candidateName = info ? `${info.firstName} ${info.lastName}` : ''

    // Génération du HTML de la lettre
    const htmlContent = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Georgia', serif;
      font-size: 11pt;
      line-height: 1.7;
      color: #1a1a1a;
      background: white;
      padding: 40px 50px;
      max-width: 794px;
      min-height: 1123px;
    }
    .header {
      margin-bottom: 32px;
      border-bottom: 1px solid #e0d6c8;
      padding-bottom: 20px;
    }
    .candidate-name {
      font-size: 18pt;
      font-weight: bold;
      color: #722F37;
      margin-bottom: 4px;
    }
    .letter-meta {
      color: #555;
      font-size: 10pt;
    }
    .letter-title {
      font-size: 13pt;
      font-weight: bold;
      color: #1a1a1a;
      margin-bottom: 24px;
      margin-top: 24px;
    }
    .content {
      font-size: 11pt;
      line-height: 1.8;
    }
    .content p { margin-bottom: 0.75em; }
    .content h1 { font-size: 1.5em; font-weight: bold; margin-bottom: 0.5em; }
    .content h2 { font-size: 1.25em; font-weight: bold; margin-bottom: 0.4em; }
    .content h3 { font-size: 1.1em; font-weight: bold; margin-bottom: 0.3em; }
    .content ul { list-style: disc; padding-left: 1.5em; margin-bottom: 0.75em; }
    .content ol { list-style: decimal; padding-left: 1.5em; margin-bottom: 0.75em; }
    .content li { margin-bottom: 0.25em; }
    .content strong { font-weight: bold; }
    .content em { font-style: italic; }
    .content u { text-decoration: underline; }
    .content s { text-decoration: line-through; }
    .content [style*="text-align: center"] { text-align: center; }
    .content [style*="text-align: right"] { text-align: right; }
    .content [style*="text-align: justify"] { text-align: justify; }
    .footer {
      margin-top: 40px;
      font-size: 10pt;
      color: #888;
      border-top: 1px solid #e0d6c8;
      padding-top: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    ${candidateName ? `<div class="candidate-name">${candidateName}</div>` : ''}
    <div class="letter-meta">
      ${coverLetter.jobTitle ? `Poste visé : ${coverLetter.jobTitle}` : ''}
      ${coverLetter.company ? ` — ${coverLetter.company}` : ''}
    </div>
  </div>
  <div class="letter-title">${coverLetter.title}</div>
  <div class="content">${coverLetter.content}</div>
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
        return NextResponse.json({ error: 'Chrome introuvable sur le système' }, { status: 500 })
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
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' })

      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: { top: 0, right: 0, bottom: 0, left: 0 },
      })

      const safeName = coverLetter.title
        .replace(/[^a-z0-9àâäéèêëïîôùûüÿçæœ\s-]/gi, '')
        .replace(/\s+/g, '_')

      return new Response(Buffer.from(pdfBuffer), {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${safeName}_lettre.pdf"`,
        },
      })
    } finally {
      await browser.close()
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    console.error('[COVER_LETTER_PDF]:', message)
    return NextResponse.json({ error: `Erreur PDF: ${message}` }, { status: 500 })
  }
}

