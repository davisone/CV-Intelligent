import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import { WebsiteJsonLd } from '@/components/seo/json-ld'
import { Sparkles, BarChart3, Palette, FileText, Zap, Shield, ArrowRight, Check } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <WebsiteJsonLd />

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
            <div className="lg:col-span-2 bg-gradient-to-br from-[#F3EDE5] to-[#FBF8F4] p-8 md:p-12 rounded-3xl border border-[#E0D6C8] relative overflow-hidden shadow-lg">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#722F37]/10 rounded-full blur-3xl" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#722F37]/10 border border-[#722F37]/20 rounded-full text-[#722F37] text-sm mb-6">
                  <Sparkles className="w-4 h-4" />
                  Propulsé par l&apos;IA
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1F1A17] mb-6 leading-tight">
                  Créez votre CV parfait
                  <span className="text-[#722F37]"> en minutes</span>
                </h1>
                <p className="text-lg text-[#6B6560] mb-8 max-w-xl">
                  CV Builder utilise l&apos;intelligence artificielle pour créer des CV professionnels,
                  optimisés pour les ATS et qui captent l&apos;attention des recruteurs.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    href="/signup"
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#722F37] hover:bg-[#8B3A44] font-bold rounded-xl transition-all hover:scale-[1.02]"
                    style={{ color: '#FFFFFF' }}
                  >
                    Créer mon CV gratuitement
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/templates"
                    className="inline-flex items-center justify-center px-6 py-3 border border-[#E0D6C8] text-[#1F1A17] font-medium rounded-xl hover:bg-[#F3EDE5] hover:border-[#722F37] transition-colors"
                  >
                    Voir les templates
                  </Link>
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] flex flex-col justify-between shadow-lg">
              <div>
                <h3 className="text-sm font-medium text-[#6B6560] mb-6">Pourquoi nous choisir ?</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                      <Check className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F1A17]">98%</p>
                      <p className="text-xs text-[#6B6560]">Compatibilité ATS</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                      <Zap className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F1A17]">5 min</p>
                      <p className="text-xs text-[#6B6560]">Temps moyen</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#722F37]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#722F37]" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-[#1F1A17]">5+</p>
                      <p className="text-xs text-[#6B6560]">Templates pro</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-6 pt-6 border-t border-[#E0D6C8]">
                <p className="text-sm text-[#6B6560]">
                  Rejoignez des milliers d&apos;utilisateurs
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Bento Grid */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[#1F1A17] mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-[#6B6560] max-w-xl mx-auto">
              Des outils puissants pour créer un CV qui vous démarque
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

            {/* Feature 1 - Large */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#722F37] to-[#5A252C] p-8 rounded-3xl group hover:scale-[1.02] transition-all shadow-lg">
              <div className="w-14 h-14 bg-[#FFFFFF]/20 rounded-2xl flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-[#FFFFFF]" />
              </div>
              <h3 className="text-2xl font-bold text-[#FFFFFF] mb-3">Suggestions IA</h3>
              <p className="text-[#FFFFFF]/80">
                Notre IA analyse votre contenu et propose des améliorations pour rendre votre CV plus impactant.
                Reformulations, mots-clés, structure optimisée.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <BarChart3 className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">Score ATS</h3>
              <p className="text-sm text-[#6B6560]">
                Optimisez votre CV pour les systèmes de tri automatique.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Palette className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">Templates Pro</h3>
              <p className="text-sm text-[#6B6560]">
                Des designs modernes adaptés à votre secteur.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Zap className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">Export PDF</h3>
              <p className="text-sm text-[#6B6560]">
                Téléchargez votre CV en haute qualité, prêt à envoyer.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-[#F3EDE5] p-6 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all group shadow-md">
              <div className="w-12 h-12 bg-[#722F37]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#722F37]/20 transition-colors">
                <Shield className="w-6 h-6 text-[#722F37]" />
              </div>
              <h3 className="text-lg font-bold text-[#1F1A17] mb-2">Données sécurisées</h3>
              <p className="text-sm text-[#6B6560]">
                Vos informations sont protégées et chiffrées.
              </p>
            </div>

            {/* Feature 6 - Large */}
            <div className="md:col-span-2 bg-[#F3EDE5] p-8 rounded-3xl border border-[#E0D6C8] hover:border-[#722F37]/50 transition-all shadow-md">
              <h3 className="text-lg font-bold text-[#1F1A17] mb-4">Comment ça marche ?</h3>
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
          <div className="bg-gradient-to-r from-[#722F37] to-[#5A252C] rounded-3xl p-8 md:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNGRkYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-[#FFFFFF] mb-4">
                Prêt à décrocher votre prochain job ?
              </h2>
              <p className="text-lg text-[#FFFFFF]/80 mb-8 max-w-xl mx-auto">
                Créez un CV professionnel en quelques minutes et démarquez-vous des autres candidats.
              </p>
              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1F1A17] text-[#FFFFFF] font-bold text-lg rounded-xl hover:bg-[#3D3530] transition-all hover:scale-[1.02]"
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
      <div className="w-10 h-10 bg-[#722F37] text-[#FFFFFF] rounded-full flex items-center justify-center text-sm font-bold mx-auto mb-2">
        {number}
      </div>
      <p className="text-xs text-[#6B6560]">{label}</p>
    </div>
  )
}
