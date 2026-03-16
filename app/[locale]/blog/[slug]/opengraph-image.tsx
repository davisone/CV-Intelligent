import { ImageResponse } from 'next/og'
import { getPostBySlug } from '@/lib/blog'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORY_LABELS: Record<string, Record<string, string>> = {
  fr: {
    'conseils-cv': 'Conseils CV',
    'par-metier': 'Par métier',
    'templates': 'Templates',
    'guides': 'Guides',
  },
  en: {
    'conseils-cv': 'Resume Tips',
    'par-metier': 'By Job',
    'templates': 'Templates',
    'guides': 'Guides',
  },
  es: {
    'conseils-cv': 'Consejos CV',
    'par-metier': 'Por Profesión',
    'templates': 'Plantillas',
    'guides': 'Guías',
  },
}

const MIN_READ: Record<string, string> = {
  fr: 'min de lecture',
  en: 'min read',
  es: 'min de lectura',
}

export default async function Image({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)

  const title = post?.frontmatter.title ?? 'CV Builder Blog'
  const readingTime = post?.frontmatter.readingTime ?? 5
  const category = post?.frontmatter.category ?? ''
  const categoryLabel = (CATEGORY_LABELS[locale] ?? CATEGORY_LABELS['fr']!)[category] ?? ''
  const minRead = MIN_READ[locale] ?? MIN_READ.fr

  return new ImageResponse(
    (
      <div
        style={{
          background: '#FBF8F4',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: 'sans-serif',
          padding: '60px 80px',
          justifyContent: 'space-between',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 28,
              fontWeight: 800,
              color: '#722F37',
              letterSpacing: -1,
            }}
          >
            CV Builder
          </div>
          {categoryLabel && (
            <>
              <div style={{ width: 4, height: 4, background: '#C8BAA8', borderRadius: 9999 }} />
              <div style={{ fontSize: 20, color: '#6B6560', fontWeight: 500 }}>
                {categoryLabel}
              </div>
            </>
          )}
        </div>

        {/* Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 44 : 52,
            fontWeight: 800,
            color: '#1F1A17',
            lineHeight: 1.2,
            letterSpacing: -1,
            maxWidth: 900,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              fontSize: 20,
              color: '#6B6560',
            }}
          >
            {readingTime} {minRead}
          </div>
          <div
            style={{
              background: 'linear-gradient(135deg, #722F37, #8B3A44)',
              borderRadius: 12,
              padding: '10px 24px',
              fontSize: 20,
              fontWeight: 700,
              color: 'white',
            }}
          >
            cv-builder.fr
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
