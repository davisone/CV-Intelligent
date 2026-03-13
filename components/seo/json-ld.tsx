export function WebsiteJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'CV Builder',
    url: baseUrl,
    description:
      'Créez des CV professionnels avec l\'aide de l\'intelligence artificielle. Templates modernes, suggestions IA, optimisation ATS.',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Template Modern gratuit',
    },
    author: {
      '@type': 'Organization',
      name: 'DVS-Web',
      url: 'https://dvs-web.fr',
    },
    inLanguage: 'fr-FR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CV Builder par Evan Davison',
    alternateName: ['CV Builder', 'DVS-Web CV Builder'],
    url: baseUrl,
    logo: `${baseUrl}/icon-512.png`,
    description: 'CV Builder est un générateur de CV gratuit en ligne propulsé par l\'intelligence artificielle, créé par Evan Davison à Rennes.',
    foundingDate: '2024',
    founder: {
      '@type': 'Person',
      name: 'Evan Davison',
      url: 'https://dvs-web.fr',
      jobTitle: 'Développeur Web',
      worksFor: {
        '@type': 'Organization',
        name: 'DVS-Web',
      },
    },
    parentOrganization: {
      '@type': 'Organization',
      name: 'DVS-Web',
      url: 'https://dvs-web.fr',
    },
    sameAs: [
      'https://dvs-web.fr',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: 'French',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function LocalBusinessJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${baseUrl}/#localbusiness`,
    name: 'CV Builder - Evan Davison',
    description: 'Création de CV gratuit en ligne avec intelligence artificielle. Service de génération de CV professionnel à Rennes.',
    url: baseUrl,
    image: `${baseUrl}/icon-512.png`,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rennes',
      addressRegion: 'Bretagne',
      addressCountry: 'FR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 48.1173,
      longitude: -1.6778,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Rennes',
      },
      {
        '@type': 'Country',
        name: 'France',
      },
    ],
    priceRange: 'Gratuit',
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      opens: '00:00',
      closes: '23:59',
    },
    founder: {
      '@type': 'Person',
      name: 'Evan Davison',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function PersonJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Evan Davison',
    alternateName: 'Evan Davison DVS-Web',
    url: 'https://dvs-web.fr',
    jobTitle: 'Développeur Web & Créateur de CV Builder',
    worksFor: {
      '@type': 'Organization',
      name: 'DVS-Web',
      url: 'https://dvs-web.fr',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Rennes',
      addressRegion: 'Bretagne',
      addressCountry: 'FR',
    },
    knowsAbout: [
      'Développement Web',
      'Intelligence Artificielle',
      'Création de CV',
      'UX/UI Design',
    ],
    sameAs: [
      'https://dvs-web.fr',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function SoftwareApplicationJsonLd({ locale = 'fr' }: { locale?: string }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'
  const isEn = locale === 'en'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: isEn ? 'CV Builder - Free Resume Builder' : 'CV Builder - Générateur de CV Gratuit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: baseUrl,
    description: isEn
      ? 'Free online resume builder powered by AI. Create your professional resume in 5 minutes with ATS-optimized templates.'
      : 'Application gratuite de création de CV en ligne avec intelligence artificielle. Créez votre CV professionnel en 5 minutes.',
    offers: [
      {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        name: isEn ? 'Free plan' : 'Plan gratuit',
        description: isEn ? 'Free resume creation with Modern template' : 'Création de CV gratuite avec template Modern',
        availability: 'https://schema.org/InStock',
      },
      {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'EUR',
        name: isEn ? 'Premium plan' : 'Plan Premium',
        description: isEn ? 'AI suggestions, ATS score, advanced templates, PDF export' : 'Suggestions IA, score ATS, templates avancés, export PDF',
        availability: 'https://schema.org/InStock',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '312',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: 'Evan Davison',
    },
    creator: {
      '@type': 'Organization',
      name: 'DVS-Web',
    },
    featureList: isEn
      ? ['Free resume creation', 'AI-powered suggestions', 'ATS optimization', 'PDF export', 'Professional templates']
      : ['Création de CV gratuite', 'Suggestions par IA', 'Optimisation ATS', 'Export PDF', 'Templates professionnels'],
    screenshot: `${baseUrl}/og-image.png`,
    softwareVersion: '2.0',
    availableOnDevice: 'Desktop, Mobile, Tablet',
    inLanguage: isEn ? 'en' : 'fr-FR',
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string
  description: string
  steps: { name: string; text: string }[]
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name,
    description,
    step: steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; url: string }[]
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}

export function FAQJsonLd({
  questions,
}: {
  questions: { question: string; answer: string }[]
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: questions.map((q) => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}