export type CvLocale = 'fr' | 'en' | 'es'

interface CvLabels {
  experience: string
  experiencePro: string
  education: string
  skills: string
  languages: string
  interests: string
  certifications: string
  projects: string
  summary: string
  present: string
  mention: string
}

const labels: Record<CvLocale, CvLabels> = {
  fr: {
    experience: 'Expérience',
    experiencePro: 'Expérience Professionnelle',
    education: 'Formation',
    skills: 'Compétences',
    languages: 'Langues',
    interests: "Centres d'intérêt",
    certifications: 'Certifications',
    projects: 'Projets',
    summary: 'Résumé Professionnel',
    present: 'Présent',
    mention: 'Mention',
  },
  en: {
    experience: 'Experience',
    experiencePro: 'Professional Experience',
    education: 'Education',
    skills: 'Skills',
    languages: 'Languages',
    interests: 'Interests',
    certifications: 'Certifications',
    projects: 'Projects',
    summary: 'Professional Summary',
    present: 'Present',
    mention: 'Grade',
  },
  es: {
    experience: 'Experiencia',
    experiencePro: 'Experiencia Profesional',
    education: 'Formación',
    skills: 'Competencias',
    languages: 'Idiomas',
    interests: 'Intereses',
    certifications: 'Certificaciones',
    projects: 'Proyectos',
    summary: 'Resumen Profesional',
    present: 'Presente',
    mention: 'Nota',
  },
}

export function getCvLabels(locale?: string): CvLabels {
  const key = (locale ?? 'fr') as CvLocale
  return labels[key] ?? labels.fr
}
