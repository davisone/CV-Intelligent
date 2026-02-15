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

export function SoftwareApplicationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'CV Builder - Générateur de CV Gratuit',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    url: baseUrl,
    description: 'Application gratuite de création de CV en ligne avec intelligence artificielle. Créez votre CV professionnel en 5 minutes.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'EUR',
      description: 'Création de CV gratuite avec template Modern',
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
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
    featureList: [
      'Création de CV gratuite',
      'Intelligence artificielle',
      'Optimisation ATS',
      'Export PDF',
      'Templates professionnels',
    ],
    screenshot: `${baseUrl}/og-image.png`,
    softwareVersion: '1.0',
    inLanguage: 'fr-FR',
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