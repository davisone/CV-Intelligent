import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/layout/footer'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'

/**
 * Config statique par page : uniquement les valeurs non-traduisibles
 * (icônes, chemins, type de section3).
 * Tout le contenu textuel est dans les fichiers i18n sous le namespace fourni.
 */
export interface SeoLandingConfig {
  namespace: string                                // ex: 'landing.cvComptablePage'
  canonicalPath: string                            // ex: '/cv-comptable'
  hero: {
    badgeIcon: LucideIcon
    secondaryCtaHref?: string                      // défaut: '/templates'
  }
  section1Icons: [LucideIcon, LucideIcon, LucideIcon]
  section3Type: 'tips' | 'steps'
}

export async function SeoLandingPage({ config }: { config: SeoLandingConfig }) {
  const t = await getTranslations(config.namespace)
  const tPage = await getTranslations('landing.seoPage')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const [Icon0, Icon1, Icon2] = config.section1Icons

  const faqItems = [0, 1, 2, 3, 4].map((i) => ({
    question: t(`faq.q${i}.question`),
    answer: t(`faq.q${i}.answer`),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* JSON-LD */}
      <BreadcrumbJsonLd items={[
        { name: tPage('homeText'), url: baseUrl },
        { name: t('breadcrumbName'), url: `${baseUrl}${config.canonicalPath}` },
      ]} />
      <FAQJsonLd questions={faqItems} />

      {/* Header sticky */}
      <header className="border-b border-[#E0D6C8] bg-[#FBF8F4]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#722F37]">CV Builder</Link>
          <nav className="flex items-center gap-4">
            <LocaleSwitcher />
            <Link href="/login" className="text-sm font-medium text-[#1F1A17] hover:text-[#722F37] transition-colors">
              {tPage('loginText')}
            </Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#8B3A44] font-bold transition-colors" style={{ color: '#FFFFFF' }}>
              {tPage('signupText')}
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* HERO */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
              <config.hero.badgeIcon className="w-4 h-4" />
              {t('hero.badgeText')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              {t('hero.h1Before')}<span className="text-[#722F37]">{t('hero.h1Accent')}</span>{t('hero.h1After')}
            </h1>
            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              {t('hero.subtitle')}
            </p>
            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]" style={{ color: '#FFFFFF' }}>
                {t('hero.primaryCtaText')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={config.hero.secondaryCtaHref ?? '/templates'} className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors">
                {t('hero.secondaryCtaText')}
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 1 — 3 colonnes */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">{t('section1.title')}</h2>
            {t('section1.subtitle') && (
              <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">{t('section1.subtitle')}</p>
            )}
            <div className="grid md:grid-cols-3 gap-6">
              {([Icon0, Icon1, Icon2] as LucideIcon[]).map((Icon, index) => (
                <div key={index} className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors">
                  <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{t(`section1.item${index}.title`)}</h3>
                  <p className="text-[#6B6560] text-sm">{t(`section1.item${index}.description`)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — keyword cards 2 colonnes */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">{t('section2.title')}</h2>
            {t('section2.subtitle') && (
              <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">{t('section2.subtitle')}</p>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {[0, 1, 2, 3].map((index) => (
                <div key={index} className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1F1A17]">{t(`section2.item${index}.title`)}</h3>
                    <span className="text-xs px-2 py-1 bg-[#722F37]/10 text-[#722F37] rounded-full font-medium shrink-0 ml-2">{t(`section2.item${index}.keyword`)}</span>
                  </div>
                  <p className="text-[#6B6560] text-sm mb-4">{t(`section2.item${index}.description`)}</p>
                  <Link href="/signup" className="inline-flex items-center gap-1 text-sm text-[#722F37] font-medium hover:gap-2 transition-all">
                    {tPage('createThisCv')}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3 — tips OU steps */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {config.section3Type === 'tips' ? (
              <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-white/80" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{t('section3.title')}</h2>
                <div className="space-y-4 max-w-2xl mx-auto">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                      <p className="text-white/90">{t(`section3.tip${i}`)}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#F3EDE5] rounded-3xl p-8 md:p-12 border border-[#E0D6C8]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-8 text-center">{t('section3.title')}</h2>
                <div className="space-y-6 max-w-2xl mx-auto">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#722F37] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F1A17] mb-1">{t(`section3.step${i}.title`)}</h3>
                        <p className="text-[#6B6560] text-sm">{t(`section3.step${i}.description`)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">{t('faq.title')}</h2>
            {t('faq.subtitle') && (
              <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">{t('faq.subtitle')}</p>
            )}
            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8]">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-[#722F37] flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{item.question}</h3>
                      <p className="text-[#6B6560]">{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA FINALE */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{t('finalCta.title')}</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">{t('finalCta.description')}</p>
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FBF8F4] text-[#722F37] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]">
                {t('finalCta.ctaText')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-white/80">{tPage('freeBadge')}</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
