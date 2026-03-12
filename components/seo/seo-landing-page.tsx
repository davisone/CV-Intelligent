import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, Sparkles } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { Footer } from '@/components/layout/footer'

export interface SeoLandingConfig {
  // Breadcrumb + canonical
  breadcrumbName: string
  canonicalPath: string           // ex: '/modele-cv-gratuit'

  // Hero
  hero: {
    badgeIcon: LucideIcon
    badgeText: string
    h1Before: string              // ex: "Modèle de "
    h1Accent: string              // ex: "CV Gratuit"  ← span bordeaux
    h1After: string               // ex: " à Télécharger en PDF"
    subtitle: string
    description: string
    primaryCtaText: string
    secondaryCtaText: string
    secondaryCtaHref?: string     // défaut: "/templates"
  }

  // Section 1 — 3 colonnes (différenciateurs)
  section1: {
    title: string
    subtitle?: string
    items: Array<{ icon: LucideIcon; title: string; description: string }>
  }

  // Section 2 — cartes avec keyword badge (toujours 2 colonnes)
  section2: {
    title: string
    subtitle?: string
    items: Array<{ title: string; keyword: string; description: string }>
  }

  // Section 3 — SOIT tips (fond bordeaux + CheckCircle2) SOIT étapes (fond crème numérotées)
  section3:
    | { title: string; tips: string[] }
    | { title: string; steps: Array<{ title: string; description: string }> }

  // FAQ
  faq: {
    title: string
    subtitle?: string
    items: Array<{ question: string; answer: string }>
  }

  // CTA finale
  finalCta: {
    title: string
    description: string
    ctaText?: string              // défaut: "Commencer gratuitement"
  }
}

export function SeoLandingPage({ config }: { config: SeoLandingConfig }) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* JSON-LD */}
      <BreadcrumbJsonLd items={[
        { name: 'Accueil', url: baseUrl },
        { name: config.breadcrumbName, url: `${baseUrl}${config.canonicalPath}` },
      ]} />
      <FAQJsonLd questions={config.faq.items} />

      {/* Header sticky */}
      <header className="border-b border-[#E0D6C8] bg-[#FBF8F4]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#722F37]">CV Builder</Link>
          <nav className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-[#1F1A17] hover:text-[#722F37] transition-colors">
              Connexion
            </Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#8B3A44] font-bold transition-colors" style={{ color: '#FFFFFF' }}>
              Créer mon CV gratuit
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
              {config.hero.badgeText}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              {config.hero.h1Before}<span className="text-[#722F37]">{config.hero.h1Accent}</span>{config.hero.h1After}
            </h1>
            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              {config.hero.subtitle}
            </p>
            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              {config.hero.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]" style={{ color: '#FFFFFF' }}>
                {config.hero.primaryCtaText}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={config.hero.secondaryCtaHref ?? '/templates'} className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors">
                {config.hero.secondaryCtaText}
              </Link>
            </div>
          </div>
        </section>

        {/* SECTION 1 — 3 colonnes */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">{config.section1.title}</h2>
            {config.section1.subtitle && (
              <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">{config.section1.subtitle}</p>
            )}
            <div className="grid md:grid-cols-3 gap-6">
              {config.section1.items.map((item, index) => (
                <div key={index} className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors">
                  <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center mb-4">
                    <item.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1F1A17] mb-2">{item.title}</h3>
                  <p className="text-[#6B6560] text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2 — keyword cards 2 colonnes */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">{config.section2.title}</h2>
            {config.section2.subtitle && (
              <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">{config.section2.subtitle}</p>
            )}
            <div className="grid md:grid-cols-2 gap-6">
              {config.section2.items.map((item, index) => (
                <div key={index} className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors group">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-[#1F1A17]">{item.title}</h3>
                    <span className="text-xs px-2 py-1 bg-[#722F37]/10 text-[#722F37] rounded-full font-medium shrink-0 ml-2">{item.keyword}</span>
                  </div>
                  <p className="text-[#6B6560] text-sm mb-4">{item.description}</p>
                  <Link href="/signup" className="inline-flex items-center gap-1 text-sm text-[#722F37] font-medium hover:gap-2 transition-all">
                    Créer ce CV
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
            {'tips' in config.section3 ? (
              // Variante tips : fond bordeaux
              <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Sparkles className="w-5 h-5 text-white/80" />
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">{config.section3.title}</h2>
                <div className="space-y-4 max-w-2xl mx-auto">
                  {config.section3.tips.map((tip, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                      <p className="text-white/90">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              // Variante steps : fond crème numérotée
              <div className="bg-[#F3EDE5] rounded-3xl p-8 md:p-12 border border-[#E0D6C8]">
                <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-8 text-center">{config.section3.title}</h2>
                <div className="space-y-6 max-w-2xl mx-auto">
                  {config.section3.steps.map((step, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#722F37] rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0 mt-0.5">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-[#1F1A17] mb-1">{step.title}</h3>
                        <p className="text-[#6B6560] text-sm">{step.description}</p>
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
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">{config.faq.title}</h2>
            {config.faq.subtitle && (
              <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">{config.faq.subtitle}</p>
            )}
            <div className="space-y-4">
              {config.faq.items.map((item, index) => (
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
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">{config.finalCta.title}</h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">{config.finalCta.description}</p>
              <Link href="/signup" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FBF8F4] text-[#722F37] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]">
                {config.finalCta.ctaText ?? 'Commencer gratuitement'}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-white/80">Gratuit • Sans carte bancaire • Export PDF</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
