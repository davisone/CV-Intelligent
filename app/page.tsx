import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { WebsiteJsonLd } from '@/components/seo/json-ld'
import { Sparkles, BarChart3, Palette, FileText, Zap, Shield, ArrowRight, Check } from 'lucide-react'

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
              className="text-sm px-4 py-2 rounded-xl bg-[#C9A227] hover:bg-[#D4B44A] font-bold transition-colors"
              style={{ color: '#000000' }}
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section - Bento Style */}
        <section className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Main Hero Card */}
            <div className="lg:col-span-2 bg-gradient-to-br from-[#1A1A1A] to-[#0D0D0D] p-8 md:p-12 rounded-3xl border border-[#404040] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A227]/5 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#C9A227]/10 border border-[#C9A227]/20 rounded-full text-[#C9A227] text-sm mb-6">
                  <Sparkles className="w-4 h-4" />
                  Propulsé par l&apos;IA
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#E5E5E5] mb-6 leading-tight">
                  Créez votre CV parfait
                  <span className="text-[#C9A227]"> en minutes</span>
                </h1>
                <p className="text-lg text-[#A3A3A3] mb-8 max-w-xl">
                  ResumeForge utilise l&apos;intelligence artificielle pour créer des CV professionnels,
                  optimisés pour les ATS et qui captent l&apos;attention des recruteurs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A227] hover:bg-[#D4B44A] font-bold rounded-xl transition-all hover:scale-[1.02]"
                    style={{ color: '#000000' }}
                  >
                    Créer mon CV gratuitement
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/templates"
                    className="inline-flex items-center justify-center px-6 py-3 border border-[#404040] text-[#E5E5E5] font-medium rounded-xl hover:bg-[#1A1A1A] hover:border-[#C9A227] transition-colors"
                  >
                    Voir les templates
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#404040] flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-medium text-[#A3A3A3] mb-6">Pourquoi nous choisir ?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#E5E5E5]">98%</p>
                      <p className="text-xs text-[#A3A3A3]">Compatibilité ATS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#E5E5E5]">5 min</p>
                      <p className="text-xs text-[#A3A3A3]">Temps moyen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C9A227]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#C9A227]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#E5E5E5]">5+</p>
                      <p className="text-xs text-[#A3A3A3]">Templates pro</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#404040]">
                <p className="text-sm text-[#A3A3A3]">
                  Rejoignez des milliers d&apos;utilisateurs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#E5E5E5] mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-[#A3A3A3] max-w-xl mx-auto">
              Des outils puissants pour créer un CV qui vous démarque
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#C9A227] to-[#A68620] p-8 rounded-3xl group hover:scale-[1.02] transition-all">
              <div className="w-14 h-14 bg-[#0D0D0D]/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-[#0D0D0D]" />
              </div>
              <h3 className="text-2xl font-bold text-[#0D0D0D] mb-3">Suggestions IA</h3>
              <p className="text-[#0D0D0D]/70">
                Notre IA analyse votre contenu et propose des améliorations pour rendre votre CV plus impactant.
                Reformulations, mots-clés, structure optimisée.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#404040] hover:border-[#C9A227]/50 transition-all group">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E5E5] mb-2">Score ATS</h3>
              <p className="text-sm text-[#A3A3A3]">
                Optimisez votre CV pour les systèmes de tri automatique.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#404040] hover:border-[#C9A227]/50 transition-all group">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/20 transition-colors">
                <Palette className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E5E5] mb-2">Templates Pro</h3>
              <p className="text-sm text-[#A3A3A3]">
                Des designs modernes adaptés à votre secteur.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#404040] hover:border-[#C9A227]/50 transition-all group">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/20 transition-colors">
                <Zap className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E5E5] mb-2">Export PDF</h3>
              <p className="text-sm text-[#A3A3A3]">
                Téléchargez votre CV en haute qualité, prêt à envoyer.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#1A1A1A] p-6 rounded-3xl border border-[#404040] hover:border-[#C9A227]/50 transition-all group">
              <div className="w-12 h-12 bg-[#C9A227]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#C9A227]/20 transition-colors">
                <Shield className="w-6 h-6 text-[#C9A227]" />
              </div>
              <h3 className="text-lg font-bold text-[#E5E5E5] mb-2">Données sécurisées</h3>
              <p className="text-sm text-[#A3A3A3]">
                Vos informations sont protégées et chiffrées.
              </p>
            </div>

            {/* Feature 6 - Large */}
            <div className="md:col-span-2 bg-[#1A1A1A] p-8 rounded-3xl border border-[#404040] hover:border-[#C9A227]/50 transition-all">
              <h3 className="text-lg font-bold text-[#E5E5E5] mb-4">Comment ça marche ?</h3>
              <div className="grid grid-cols-4 gap-4">
                <StepItem number={1} label="Inscription" />
                <StepItem number={2} label="Infos" />
                <StepItem number={3} label="IA" />
                <StepItem number={4} label="Export" />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-r from-[#C9A227] to-[#A68620] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#0D0D0D] mb-4">
                Prêt à décrocher votre prochain job ?
              </h2>
              <p className="text-lg text-[#0D0D0D]/70 mb-8 max-w-xl mx-auto">
                Créez un CV professionnel en quelques minutes et démarquez-vous des autres candidats.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#0D0D0D] text-[#C9A227] font-bold text-lg rounded-xl hover:bg-[#1A1A1A] transition-all hover:scale-[1.02]"
              >
                Commencer maintenant
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function StepItem({ number, label }: { number: number; label: string }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 bg-[#C9A227] text-[#0D0D0D] rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
        {number}
      </div>
      <p className="text-xs text-[#A3A3A3]">{label}</p>
    </div>
  )
}
