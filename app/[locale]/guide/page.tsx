import Link from 'next/link'
import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { Footer } from '@/components/layout/footer'
import { BreadcrumbJsonLd, FAQJsonLd } from '@/components/seo/json-ld'
import { ArrowRight, CheckCircle2, FileText, Sparkles, Target, Lightbulb, Download, BarChart3, Zap, Clock } from 'lucide-react'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'landing.guidePage.meta' })
  return {
    title: t('title'),
    description: t('description'),
    alternates: { canonical: '/guide' },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
    },
  }
}

const stepIcons = [Target, FileText, Sparkles, CheckCircle2, Lightbulb, Download] as const
const iaIcons = [Sparkles, BarChart3, Zap] as const

export default async function GuidePage() {
  const t = await getTranslations('landing.guidePage')
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const guideFaqQuestions = ([0, 1, 2, 3, 4, 5, 6, 7, 8, 9] as const).map(i =>
    t.raw(`faq.item${i}`) as { question: string; answer: string }
  )

  const steps = ([0, 1, 2, 3, 4, 5] as const).map(i => ({
    icon: stepIcons[i],
    ...(t.raw(`steps.item${i}`) as { title: string; description: string }),
  }))

  const tips = [
    t('tips.tip0'),
    t('tips.tip1'),
    t('tips.tip2'),
    t('tips.tip3'),
    t('tips.tip4'),
    t('tips.tip5'),
    t('tips.tip6'),
    t('tips.tip7'),
  ]

  const profiles = [
    { key: 'profile0', href: '/cv-etudiant' },
    { key: 'profile1', href: '/cv-etudiant' },
    { key: 'profile2', href: '/signup' },
  ] as const

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <BreadcrumbJsonLd
        items={[
          { name: 'Accueil', url: baseUrl },
          { name: 'Comment faire un CV', url: `${baseUrl}/guide` },
        ]}
      />
      <FAQJsonLd questions={guideFaqQuestions} />

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
        {/* Hero */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
              <FileText className="w-4 h-4" />
              {t('hero.badge')}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#1F1A17] mb-6">
              {t('hero.h1Before')} <span className="text-[#722F37]">{t('hero.h1Accent')}</span>{t('hero.h1After')}
            </h1>
            <p className="text-lg text-[#6B6560] mb-8 max-w-2xl mx-auto">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                {t('hero.primaryCta')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="#etapes"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] transition-colors"
              >
                {t('hero.secondaryCta')}
              </a>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section id="etapes" className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('steps.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12 max-w-2xl mx-auto">
              {t('steps.subtitle')}
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex gap-6 p-6 bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] hover:border-[#722F37]/30 transition-colors"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#722F37] rounded-xl flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <step.icon className="w-5 h-5 text-[#722F37]" />
                      <h3 className="text-xl font-bold text-[#1F1A17]">{step.title}</h3>
                    </div>
                    <p className="text-[#6B6560]">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                {t('tips.title')}
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-white/80 flex-shrink-0 mt-0.5" />
                    <p className="text-white/90">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Structure Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('structure.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12">
              {t('structure.subtitle')}
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {([0, 1, 2, 3] as const).map(blockIdx => {
                const block = t.raw(`structure.block${blockIdx}`) as {
                  title: string
                  item0: string
                  item1: string
                  item2: string
                  item3: string
                  item4?: string
                }
                return (
                  <div key={blockIdx} className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6">
                    <h3 className="text-lg font-bold text-[#1F1A17] mb-4">{block.title}</h3>
                    <ul className="space-y-2 text-[#6B6560]">
                      <li>• {block.item0}</li>
                      <li>• {block.item1}</li>
                      <li>• {block.item2}</li>
                      <li>• {block.item3}</li>
                      {block.item4 && <li>• {block.item4}</li>}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Section CV selon votre profil */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('profiles.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12">
              {t('profiles.subtitle')}
            </p>

            <div className="space-y-6">
              {profiles.map(({ key, href }) => {
                const profile = t.raw(`profiles.${key}`) as {
                  title: string
                  description: string
                  linkText: string
                }
                return (
                  <div
                    key={key}
                    className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6 hover:border-[#722F37]/30 transition-colors"
                  >
                    <h3 className="text-xl font-bold text-[#1F1A17] mb-3">
                      {profile.title}
                    </h3>
                    <p className="text-[#6B6560] mb-4">
                      {profile.description}
                    </p>
                    <Link
                      href={href}
                      className="inline-flex items-center gap-1 text-sm font-medium text-[#722F37] hover:underline"
                    >
                      {profile.linkText} <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* Section CV avec l'IA */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  {t('ia.title')}
                </h2>
                <p className="text-white/80 max-w-2xl mx-auto">
                  {t('ia.subtitle')}
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6">
                {([0, 1, 2] as const).map(i => {
                  const feature = t.raw(`ia.feature${i}`) as { title: string; description: string }
                  const IaIcon = iaIcons[i]
                  return (
                    <div key={i} className="bg-white/10 rounded-2xl p-5">
                      <IaIcon className="w-8 h-8 text-white mb-3" />
                      <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-white/70 text-sm">{feature.description}</p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Section FAQ étendue */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4 text-center">
              {t('faq.title')}
            </h2>
            <p className="text-[#6B6560] text-center mb-12">
              {t('faq.subtitle')}
            </p>
            <div className="space-y-4">
              {guideFaqQuestions.map((item, index) => (
                <div key={index} className="bg-[#F3EDE5] rounded-2xl border border-[#E0D6C8] p-6 hover:border-[#722F37]/30 transition-colors">
                  <h3 className="font-bold text-[#1F1A17] mb-2 flex items-center gap-2">
                    <FileText className="w-4 h-4 text-[#722F37] flex-shrink-0" />
                    {item.question}
                  </h3>
                  <p className="text-[#6B6560] text-sm leading-relaxed">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-[#F3EDE5] rounded-3xl border border-[#E0D6C8] p-8 md:p-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#722F37]" />
                <span className="text-sm text-[#722F37] font-medium">{t('finalCta.badge')}</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-[#1F1A17] mb-4">
                {t('finalCta.title')}
              </h2>
              <p className="text-[#6B6560] mb-8 max-w-xl mx-auto">
                {t('finalCta.description')}
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#722F37] hover:bg-[#8B3A44] font-bold text-lg rounded-xl transition-all hover:scale-[1.02]"
                style={{ color: '#FFFFFF' }}
              >
                {t('finalCta.ctaText')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <p className="mt-4 text-sm text-[#8A7F72]">
                {t('finalCta.subtext')}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
