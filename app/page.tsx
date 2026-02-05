import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { WebsiteJsonLd } from '@/components/seo/json-ld'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0D0D0D]">
      <WebsiteJsonLd />
      {/* Header */}
      <header className="border-b border-[#404040] bg-[#0D0D0D]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#C9A227]">
            ResumeForge
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium text-[#E5E5E5] hover:text-[#C9A227] transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm px-4 py-2 rounded-lg transition-colors bg-[#C9A227] hover:bg-[#D4B44A]"
              style={{ color: '#000000', fontWeight: 700 }}
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 text-[#E5E5E5]">
            Créez votre CV parfait
            <br />
            <span className="text-[#C9A227]">avec l&apos;IA</span>
          </h1>
          <p className="text-xl text-[#A3A3A3] max-w-2xl mx-auto mb-10">
            ResumeForge utilise l&apos;intelligence artificielle pour vous aider à créer
            des CV professionnels, optimisés pour les ATS et qui captent l&apos;attention
            des recruteurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-lg rounded-lg transition-colors bg-[#C9A227] hover:bg-[#D4B44A]"
              style={{ color: '#000000', fontWeight: 700 }}
            >
              Créer mon CV gratuitement
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border border-[#404040] text-[#E5E5E5] rounded-lg hover:bg-[#1A1A1A] hover:border-[#C9A227] transition-colors"
            >
              Voir les templates
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-[#1A1A1A] py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#E5E5E5]">
              Pourquoi choisir ResumeForge ?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon="✨"
                title="Suggestions IA"
                description="Notre IA analyse votre contenu et propose des améliorations pour rendre votre CV plus impactant."
              />
              <FeatureCard
                icon="📊"
                title="Score ATS"
                description="Optimisez votre CV pour passer les systèmes de tri automatique utilisés par 98% des entreprises."
              />
              <FeatureCard
                icon="🎨"
                title="Templates Pro"
                description="Choisissez parmi des templates modernes et professionnels adaptés à votre secteur."
              />
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-20 bg-[#0D0D0D]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#E5E5E5]">
              Comment ça marche ?
            </h2>
            <div className="grid md:grid-cols-4 gap-8">
              <StepCard
                number={1}
                title="Créez un compte"
                description="Inscription gratuite en quelques secondes"
              />
              <StepCard
                number={2}
                title="Remplissez vos infos"
                description="Ajoutez vos expériences, formations et compétences"
              />
              <StepCard
                number={3}
                title="Optimisez avec l'IA"
                description="Recevez des suggestions personnalisées"
              />
              <StepCard
                number={4}
                title="Exportez en PDF"
                description="Téléchargez votre CV prêt à envoyer"
              />
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-[#C9A227] to-[#A68620] text-[#0D0D0D] py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à décrocher votre prochain job ?
            </h2>
            <p className="text-lg opacity-80 mb-8">
              Rejoignez des milliers d&apos;utilisateurs qui ont boosté leur carrière avec ResumeForge
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-semibold bg-[#0D0D0D] text-[#C9A227] rounded-lg hover:bg-[#1A1A1A] transition-colors"
            >
              Commencer maintenant
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string
  title: string
  description: string
}) {
  return (
    <div className="bg-[#0D0D0D] p-6 rounded-xl border border-[#404040] hover:border-[#C9A227]/50 transition-colors">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-[#E5E5E5]">{title}</h3>
      <p className="text-[#A3A3A3]">{description}</p>
    </div>
  )
}

function StepCard({
  number,
  title,
  description,
}: {
  number: number
  title: string
  description: string
}) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-[#C9A227] text-[#0D0D0D] rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2 text-[#E5E5E5]">{title}</h3>
      <p className="text-[#A3A3A3] text-sm">{description}</p>
    </div>
  )
}
