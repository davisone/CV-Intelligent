import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'CV Builder - Générateur de CV Intelligent'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const TAGLINES: Record<string, string> = {
  fr: "Créez des CV professionnels avec l'intelligence artificielle",
  en: 'Create professional resumes with artificial intelligence',
  es: 'Crea currículums profesionales con inteligencia artificial',
}

const FEATURES: Record<string, [string, string, string]> = {
  fr: ['Suggestions IA', 'Score ATS', 'Templates Pro'],
  en: ['AI Suggestions', 'ATS Score', 'Pro Templates'],
  es: ['Sugerencias IA', 'Puntuación ATS', 'Plantillas Pro'],
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const tagline = TAGLINES[locale] ?? TAGLINES['fr']!
  const [f1, f2, f3] = (FEATURES[locale] ?? FEATURES['fr']!) as [string, string, string]

  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #5A252C 0%, #722F37 50%, #8B3A44 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            color: 'white',
            letterSpacing: -2,
            marginBottom: 40,
          }}
        >
          CV Builder
        </div>
        <div
          style={{
            fontSize: 32,
            color: 'rgba(255, 255, 255, 0.9)',
            textAlign: 'center',
            maxWidth: 800,
            lineHeight: 1.4,
          }}
        >
          {tagline}
        </div>
        <div
          style={{
            marginTop: 40,
            display: 'flex',
            gap: 32,
            fontSize: 20,
            color: 'rgba(255, 255, 255, 0.75)',
          }}
        >
          <span>{f1}</span>
          <span>•</span>
          <span>{f2}</span>
          <span>•</span>
          <span>{f3}</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
