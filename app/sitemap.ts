import type { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/blog'

const locales = ['fr', 'en', 'es'] as const

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const routes = [
    { path: '', priority: 1, changeFrequency: 'weekly' as const },
    { path: '/guide', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: '/templates', priority: 0.8, changeFrequency: 'weekly' as const },
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
    { path: '/login', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/signup', priority: 0.6, changeFrequency: 'monthly' as const },
    { path: '/contact', priority: 0.5, changeFrequency: 'monthly' as const },
    { path: '/legal/cgv', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: '/legal/confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
  ]

  const frPosts = getAllPosts('fr')
  const enPosts = getAllPosts('en')
  const esPosts = getAllPosts('es')

  const blogEntries: MetadataRoute.Sitemap = [
    ...locales.map((locale) => ({
      url: `${baseUrl}/${locale}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
      alternates: {
        languages: Object.fromEntries(
          locales.map((loc) => [loc, `${baseUrl}/${loc}/blog`])
        ),
      },
    })),
    ...frPosts.map((post) => ({
      url: `${baseUrl}/fr/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: 'monthly' as const,
      priority: 0.75,
      alternates: {
        languages: Object.fromEntries(
          post.availableLocales.map((loc) => [
            loc,
            `${baseUrl}/${loc}/blog/${post.slug}`,
          ])
        ),
      },
    })),
    ...enPosts
      .filter((p) => !p.availableLocales.includes('fr'))
      .map((post) => ({
        url: `${baseUrl}/en/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
        alternates: {
          languages: { en: `${baseUrl}/en/blog/${post.slug}` },
        },
      })),
    ...esPosts
      .filter((p) => !p.availableLocales.includes('fr') && !p.availableLocales.includes('en'))
      .map((post) => ({
        url: `${baseUrl}/es/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.75,
        alternates: {
          languages: { es: `${baseUrl}/es/blog/${post.slug}` },
        },
      })),
  ]

  // Pages FR uniquement (slug français, pas de version multilingue avec ce slug)
  const frOnlyRoutes = [
    { path: '/cv-ats', priority: 0.88 },
    { path: '/cv-chronologique', priority: 0.83 },
    { path: '/cv-creatif', priority: 0.83 },
    { path: '/cv-service-client', priority: 0.80 },
    { path: '/cv-data-scientist', priority: 0.83 },
    { path: '/cv-cadre', priority: 0.83 },
    { path: '/cv-fonctionnel', priority: 0.80 },
    { path: '/cv-une-page', priority: 0.83 },
    { path: '/cv-product-manager', priority: 0.85 },
    { path: '/createur-cv', priority: 0.85 },
    { path: '/format-cv-2025', priority: 0.88 },
    { path: '/competences-cv', priority: 0.83 },
    { path: '/exemples-profil-professionnel', priority: 0.83 },
    { path: '/cv-professeur', priority: 0.83 },
  ]

  // Pages EN uniquement (slug anglais, pas de version multilingue avec ce slug)
  const enOnlyRoutes = [
    { path: '/assistant-resume-template', priority: 0.85 },
    { path: '/graphic-designer-resume', priority: 0.80 },
    { path: '/lawyer-resume-template', priority: 0.80 },
    { path: '/logistics-resume-template', priority: 0.80 },
    { path: '/manager-resume-template', priority: 0.85 },
    { path: '/minimal-resume-template', priority: 0.80 },
    { path: '/resume-pdf-template', priority: 0.75 },
    { path: '/hr-resume-template', priority: 0.85 },
  ]

  // Pages ES uniquement (slug espagnol, pas de version multilingue avec ce slug)
  const esOnlyRoutes = [
    { path: '/curriculum-vitae-gratis', priority: 0.90 },
    { path: '/plantilla-cv-gratis', priority: 0.88 },
    { path: '/creador-de-curriculum', priority: 0.88 },
    { path: '/curriculum-vitae-ats', priority: 0.88 },
    { path: '/curriculum-sin-experiencia-laboral', priority: 0.85 },
    { path: '/plantilla-curriculum-moderno', priority: 0.85 },
    { path: '/plantilla-curriculum-simple', priority: 0.85 },
    { path: '/plantilla-curriculum-creativo', priority: 0.83 },
    { path: '/curriculum-estudiante', priority: 0.88 },
    { path: '/curriculum-primer-empleo', priority: 0.85 },
    { path: '/curriculum-enfermero', priority: 0.83 },
    { path: '/curriculum-profesor', priority: 0.83 },
    { path: '/curriculum-jefe-proyecto', priority: 0.85 },
    { path: '/curriculum-director-marketing', priority: 0.83 },
    { path: '/curriculum-cientifico-datos', priority: 0.83 },
    { path: '/curriculum-contable', priority: 0.80 },
    { path: '/curriculum-comercial', priority: 0.83 },
    { path: '/curriculum-atencion-cliente', priority: 0.80 },
    { path: '/curriculum-product-manager', priority: 0.85 },
    { path: '/curriculum-cronologico', priority: 0.83 },
    { path: '/curriculum-funcional', priority: 0.80 },
    { path: '/curriculum-una-pagina', priority: 0.83 },
    { path: '/formato-curriculum-2025', priority: 0.88 },
    { path: '/cambio-carrera-curriculum', priority: 0.83 },
    { path: '/como-hacer-un-curriculum', priority: 0.90 },
    { path: '/ejemplos-perfil-profesional', priority: 0.83 },
    { path: '/curriculum-practicas', priority: 0.85 },
    { path: '/habilidades-en-el-curriculum', priority: 0.83 },
    { path: '/curriculum-ejecutivo', priority: 0.83 },
    { path: '/curriculum-ingeniero-software', priority: 0.85 },
    { path: '/curriculum-asistente', priority: 0.85 },
    { path: '/curriculum-disenador-grafico', priority: 0.80 },
    { path: '/curriculum-abogado', priority: 0.80 },
    { path: '/curriculum-logistica', priority: 0.80 },
    { path: '/curriculum-gerente', priority: 0.85 },
    { path: '/plantilla-curriculum-minimalista', priority: 0.80 },
    { path: '/curriculum-pdf', priority: 0.75 },
    { path: '/curriculum-recursos-humanos', priority: 0.85 },
  ]

  return [
    ...locales.flatMap((locale) =>
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
    ),
    ...frOnlyRoutes.map(({ path, priority }) => ({
      url: `${baseUrl}/fr${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: { fr: `${baseUrl}/fr${path}` },
      },
    })),
    ...enOnlyRoutes.map(({ path, priority }) => ({
      url: `${baseUrl}/en${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: { en: `${baseUrl}/en${path}` },
      },
    })),
    ...esOnlyRoutes.map(({ path, priority }) => ({
      url: `${baseUrl}/es${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: {
        languages: { es: `${baseUrl}/es${path}` },
      },
    })),
    ...blogEntries,
  ]
}
