'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { MapPin, Star } from 'lucide-react'

type LinkItem = { href: string; key: string }

const METIER_LINKS: Record<string, LinkItem[]> = {
  fr: [
    { href: '/cv-developpeur', key: 'cvDeveloppeur' },
    { href: '/cv-ingenieur', key: 'cvIngenieur' },
    { href: '/cv-comptable', key: 'cvComptable' },
    { href: '/cv-infirmier', key: 'cvInfirmier' },
    { href: '/cv-commercial', key: 'cvCommercial' },
    { href: '/cv-manager', key: 'cvManager' },
    { href: '/cv-medecin', key: 'cvMedecin' },
    { href: '/cv-architecte', key: 'cvArchitecte' },
  ],
  en: [
    { href: '/software-engineer-resume', key: 'cvDeveloppeur' },
    { href: '/accountant-resume-template', key: 'cvComptable' },
    { href: '/nurse-resume-template', key: 'cvInfirmier' },
    { href: '/sales-resume-template', key: 'cvCommercial' },
    { href: '/manager-resume-template', key: 'cvManager' },
    { href: '/doctor-resume-template', key: 'cvMedecin' },
    { href: '/architect-resume-template', key: 'cvArchitecte' },
    { href: '/hr-resume-template', key: 'cvRh' },
  ],
  es: [
    { href: '/curriculum-ingeniero-software', key: 'cvDeveloppeur' },
    { href: '/curriculum-contable', key: 'cvComptable' },
    { href: '/curriculum-enfermero', key: 'cvInfirmier' },
    { href: '/curriculum-comercial', key: 'cvCommercial' },
    { href: '/curriculum-gerente', key: 'cvManager' },
    { href: '/curriculum-medico', key: 'cvMedecin' },
    { href: '/curriculum-arquitecto', key: 'cvArchitecte' },
    { href: '/curriculum-recursos-humanos', key: 'cvRh' },
  ],
}

const FORMAT_LINKS: Record<string, LinkItem[]> = {
  fr: [
    { href: '/modele-cv-gratuit', key: 'modeleCvGratuit' },
    { href: '/cv-minimaliste', key: 'cvMinimaliste' },
    { href: '/cv-moderne', key: 'cvModerne' },
    { href: '/cv-design', key: 'cvDesign' },
    { href: '/cv-simple', key: 'cvSimple' },
    { href: '/cv-ats', key: 'cvAts' },
  ],
  en: [
    { href: '/free-resume-builder', key: 'modeleCvGratuit' },
    { href: '/minimal-resume-template', key: 'cvMinimaliste' },
    { href: '/modern-resume-template', key: 'cvModerne' },
    { href: '/creative-resume-template', key: 'cvDesign' },
    { href: '/simple-resume-template', key: 'cvSimple' },
    { href: '/ats-resume-template', key: 'cvAts' },
  ],
  es: [
    { href: '/curriculum-vitae-gratis', key: 'modeleCvGratuit' },
    { href: '/plantilla-curriculum-minimalista', key: 'cvMinimaliste' },
    { href: '/plantilla-curriculum-moderno', key: 'cvModerne' },
    { href: '/plantilla-curriculum-creativo', key: 'cvDesign' },
    { href: '/plantilla-curriculum-simple', key: 'cvSimple' },
    { href: '/curriculum-vitae-ats', key: 'cvAts' },
  ],
}

const PROFIL_LINKS: Record<string, LinkItem[]> = {
  fr: [
    { href: '/cv-etudiant', key: 'cvEtudiant' },
    { href: '/cv-sans-experience', key: 'cvSansExperience' },
    { href: '/cv-alternance', key: 'cvAlternance' },
    { href: '/cv-premier-emploi', key: 'cvPremierEmploi' },
    { href: '/cv-reconversion', key: 'cvReconversion' },
    { href: '/lettre-de-motivation', key: 'lettreDeMoti' },
  ],
  en: [
    { href: '/student-resume-template', key: 'cvEtudiant' },
    { href: '/resume-no-experience', key: 'cvSansExperience' },
    { href: '/internship-resume-template', key: 'cvAlternance' },
    { href: '/entry-level-resume', key: 'cvPremierEmploi' },
    { href: '/career-change-resume', key: 'cvReconversion' },
    { href: '/cover-letter-template', key: 'lettreDeMoti' },
  ],
  es: [
    { href: '/curriculum-estudiante', key: 'cvEtudiant' },
    { href: '/curriculum-sin-experiencia-laboral', key: 'cvSansExperience' },
    { href: '/curriculum-practicas', key: 'cvAlternance' },
    { href: '/curriculum-primer-empleo', key: 'cvPremierEmploi' },
    { href: '/cambio-carrera-curriculum', key: 'cvReconversion' },
    { href: '/carta-de-presentacion', key: 'lettreDeMoti' },
  ],
}

function FooterLinkGroup({ title, links, t }: {
  title: string
  links: LinkItem[]
  t: (key: string) => string
}) {
  return (
    <div>
      <h3 className="font-semibold text-[#1F1A17] text-sm mb-3">{title}</h3>
      <nav className="flex flex-col gap-1.5">
        {links.map(({ href, key }) => (
          <Link
            key={href}
            href={href as Parameters<typeof Link>[0]['href']}
            className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors"
          >
            {t(key)}
          </Link>
        ))}
      </nav>
    </div>
  )
}

export function Footer() {
  const t = useTranslations('landing.footer')
  const locale = useLocale()

  const metierLinks = (METIER_LINKS[locale] ?? METIER_LINKS.fr)!
  const formatLinks = (FORMAT_LINKS[locale] ?? FORMAT_LINKS.fr)!
  const profilLinks = (PROFIL_LINKS[locale] ?? PROFIL_LINKS.fr)!

  return (
    <footer className="border-t border-[#E0D6C8] pt-12 pb-8 bg-[#F3EDE5]">
      <div className="container mx-auto px-4">

        {/* Grille principale */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link href="/" className="text-xl font-bold text-[#722F37] mb-3 block">
              CV Builder
            </Link>
            <p className="text-sm text-[#6B6560] mb-3">{t('brand')}</p>
            <div className="flex items-center gap-1.5 text-sm text-[#6B6560] mb-4">
              <MapPin className="w-4 h-4 text-[#722F37] shrink-0" />
              <span>
                {t('madeIn')}{' '}
                <a
                  href="https://dvs-web.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#722F37] hover:text-[#8B3A44] transition-colors font-medium underline"
                >
                  Evan Davison
                </a>
              </span>
            </div>
            <a
              href="https://g.page/r/CcSyetXUJJrpEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[#6B6560] hover:text-[#722F37] transition-colors"
            >
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {t('review')}
            </a>
          </div>

          {/* Par métier */}
          <FooterLinkGroup
            title={t('sectionMetier')}
            links={metierLinks}
            t={t}
          />

          {/* Par format */}
          <FooterLinkGroup
            title={t('sectionFormat')}
            links={formatLinks}
            t={t}
          />

          {/* Par profil */}
          <FooterLinkGroup
            title={t('sectionProfil')}
            links={profilLinks}
            t={t}
          />

          {/* Ressources + Légal */}
          <div className="col-span-2 md:col-span-1">
            <h3 className="font-semibold text-[#1F1A17] text-sm mb-3">{t('sectionRessources')}</h3>
            <nav className="flex flex-col gap-1.5 mb-6">
              <Link href="/guide" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('guide')}
              </Link>
              <Link href="/templates" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('templates')}
              </Link>
              <Link href="/signup" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('createFree')}
              </Link>
              <Link href="/contact" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('contact')}
              </Link>
            </nav>
            <h3 className="font-semibold text-[#1F1A17] text-sm mb-3">{t('legal')}</h3>
            <nav className="flex flex-col gap-1.5">
              <Link href="/legal/cgv" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('cgv')}
              </Link>
              <Link href="/legal/mentions-legales" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('mentions')}
              </Link>
              <Link href="/legal/confidentialite" className="text-sm text-[#6B6560] hover:text-[#722F37] transition-colors">
                {t('privacy')}
              </Link>
            </nav>
          </div>
        </div>

        {/* Barre du bas */}
        <div className="pt-6 border-t border-[#E0D6C8] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6560] text-sm text-center sm:text-left">
            &copy; {new Date().getFullYear()} CV Builder —{' '}
            <a
              href="https://dvs-web.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#722F37] hover:text-[#8B3A44] transition-colors underline"
            >
              DVS-Web
            </a>
            {' '}— {t('allRights')}
          </p>
          <p className="text-[#A89F96] text-xs">
            v{process.env.NEXT_PUBLIC_APP_VERSION}
          </p>
          <LocaleSwitcher />
        </div>
      </div>
    </footer>
  )
}
