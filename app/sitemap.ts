import type { MetadataRoute } from 'next'

const locales = ['fr', 'en'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/guide', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/templates', priority: 0.8, changeFrequency: 'weekly' as const },
    // Pages SEO longue traîne
    { path: '/cv-etudiant', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/modele-cv-gratuit', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/modele-cv-stage', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/modele-cv-alternance', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-alternance', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-developpeur', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/cv-developpeur-junior', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-minimaliste', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/cv-moderne', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-design', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-simple', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-premier-emploi', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-sans-experience', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-pdf', priority: 0.75, changeFrequency: 'monthly' as const },
    { path: '/modele-cv', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/exemple-cv', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/comment-faire-un-cv', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/cv-commercial', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-marketing', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-ingenieur', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-infirmier', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-reconversion', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-comptable', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-manager', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-chef-de-projet', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-rh', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-assistant', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/cv-graphiste', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/cv-juriste', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/cv-logistique', priority: 0.80, changeFrequency: 'monthly' as const },
    // Pages longue traîne anglaises — batch 1
    { path: '/free-resume-builder', priority: 0.88, changeFrequency: 'monthly' as const },
    { path: '/ats-resume-template', priority: 0.88, changeFrequency: 'monthly' as const },
    { path: '/professional-cv-maker', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/student-resume-template', priority: 0.88, changeFrequency: 'monthly' as const },
    { path: '/entry-level-resume', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/resume-template-download', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/modern-resume-template', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/simple-resume-template', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/creative-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/resume-no-experience', priority: 0.85, changeFrequency: 'monthly' as const },
    // Pages longue traîne anglaises — batch 2
    { path: '/software-engineer-resume', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/nurse-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/teacher-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/project-manager-resume', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/marketing-manager-resume', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/data-scientist-resume', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/accountant-resume-template', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/sales-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/customer-service-resume', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/product-manager-resume', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/chronological-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/functional-resume-template', priority: 0.80, changeFrequency: 'monthly' as const },
    { path: '/one-page-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/resume-format-2025', priority: 0.88, changeFrequency: 'monthly' as const },
    { path: '/career-change-resume', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/how-to-write-a-resume', priority: 0.90, changeFrequency: 'monthly' as const },
    { path: '/resume-summary-examples', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/internship-resume-template', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/resume-skills-section', priority: 0.83, changeFrequency: 'monthly' as const },
    { path: '/executive-resume-template', priority: 0.83, changeFrequency: 'monthly' as const },
    // Pages utilitaires
    { path: '/login', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/legal/cgv', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}${path}`])
        ),
      },
    }))
  )
}
