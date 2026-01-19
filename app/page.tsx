import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ResumeForge
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Connexion
            </Link>
            <Link
              href="/signup"
              className="text-sm font-medium bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Commencer gratuitement
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
            Créez votre CV parfait
            <br />
            <span className="text-primary">avec l&apos;IA</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            ResumeForge utilise l&apos;intelligence artificielle pour vous aider à créer
            des CV professionnels, optimisés pour les ATS et qui captent l&apos;attention
            des recruteurs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
            >
              Créer mon CV gratuitement
            </Link>
            <Link
              href="/templates"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium border border-border rounded-lg hover:bg-secondary transition-colors"
            >
              Voir les templates
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-secondary/50 py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
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
        <section className="bg-primary text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Prêt à décrocher votre prochain job ?
            </h2>
            <p className="text-lg opacity-90 mb-8">
              Rejoignez des milliers d&apos;utilisateurs qui ont boosté leur carrière avec ResumeForge
            </p>
            <Link
              href="/signup"
              className="inline-flex items-center justify-center px-8 py-3 text-lg font-medium bg-white text-primary rounded-lg hover:bg-white/90 transition-colors"
            >
              Commencer maintenant
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} ResumeForge. Tous droits réservés.</p>
        </div>
      </footer>
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
    <div className="bg-white p-6 rounded-xl border shadow-sm">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
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
      <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
        {number}
      </div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm">{description}</p>
    </div>
  )
}
