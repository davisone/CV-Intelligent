import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, Download, FileText, Check, Shield, Sparkles } from 'lucide-react'
import { buildAlternates } from '@/lib/seo/metadata'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.cvPdfPage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: buildAlternates('/cv-pdf', locale),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  }
}

const advantageIcons = [FileText, Shield, Check] as const

export default async function CvPdfPage() {
  const t = await getTranslations('landing.cvPdfPage')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const pdfAdvantages = ([0, 1, 2] as const).map(i => ({
    icon: advantageIcons[i],
    ...(t.raw(`advantages.item${i}`) as { title: string; description: string }),
  }))

  const exportSteps = ([0, 1, 2, 3] as const).map(i =>
    t.raw(`steps.item${i}`) as { title: string; description: string }
  )

  const faqItems = ([0, 1, 2, 3] as const).map(i =>
    t.raw(`faq.item${i}`) as { question: string; answer: string }
  )

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      {/* Données structurées JSON-LD */}
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'CV PDF', url: `${baseUrl}/cv-pdf` },
        ]}
      />
      <FAQJsonLd questions={faqItems} />

      {/* Header */}
      <header className="border-b border-[#E0D6C8] bg-[#FBF8F4]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#722F37]">
            CV Builder
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#1F1A17] hover:text-[#722F37] transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-xl bg-[#722F37] hover:bg-[#8B3A44] font-bold transition-colors"
              style={{ color: '#FFFFFF' }}
            >
              Créer mon CV gratuit
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Section Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
              <Download className="w-4 h-4" />
              {t('hero.badge')}
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              {t('hero.h1Before')}{' '}
              <span className="text-[#722F37]">{t('hero.h1Accent')}</span>
            </h1>

            <p className="text-xl text-[#6B6560] mb-4 max-w-2xl mx-auto font-medium">
              {t('hero.subtitle')}
            </p>

            <p className="text-base text-[#6B6560] mb-10 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>

            {/* CTAs principaux */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                {t('hero.primaryCta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guide"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors"
              >
                {t('hero.secondaryCta')}
              </Link>
            </div>
          </div>
        </section>

        {/* Section avantages du PDF */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('advantages.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              {t('advantages.subtitle')}
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {pdfAdvantages.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors"
                >
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

        {/* Section étapes pour exporter en PDF */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('steps.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              {t('steps.subtitle')}
            </p>

            <div className="space-y-6">
              {exportSteps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#1F1A17] mb-2">{step.title}</h3>
                    <p className="text-[#6B6560]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section caractéristiques du PDF (fond crème accentué) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#F3EDE5] rounded-3xl border border-[#E0D6C8] p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#722F37]" />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-8 text-center">
                {t('features.title')}
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-[#E0D6C8]">
                  <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F1A17]">
                    {t('features.feature0')}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-[#E0D6C8]">
                  <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F1A17]">
                    {t('features.feature1')}
                  </p>
                </div>
                <div className="flex flex-col items-center text-center gap-3 p-4 bg-white rounded-2xl border border-[#E0D6C8]">
                  <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                    <FileText className="w-5 h-5 text-[#722F37]" />
                  </div>
                  <p className="text-sm font-medium text-[#1F1A17]">
                    {t('features.feature2')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('faq.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              {t('faq.subtitle')}
            </p>

            <div className="space-y-4">
              {faqItems.map((item, index) => (
                <div
                  key={index}
                  className="p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8]"
                >
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

        {/* Section CTA finale (fond bordeaux) */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t('finalCta.title')}
              </h2>
              <p className="text-white/80 mb-8 max-w-xl mx-auto">
                {t('finalCta.description')}
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white hover:bg-[#FBF8F4] text-[#722F37] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]"
              >
                {t('finalCta.ctaText')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-white/80">
                {t('finalCta.badge')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
