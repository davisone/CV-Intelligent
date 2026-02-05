import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Footer } from '@/components/layout/footer'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header minimal */}
      <header className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-[#6B6560] hover:text-[#1F1A17] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm">Retour</span>
          </Link>
        </div>
        <Link href="/" className="text-2xl font-bold text-[#722F37] hover:text-[#8B3A44] transition-colors">
          ResumeForge
        </Link>
        <div className="w-20"></div> {/* Spacer for centering */}
      </header>

      {/* Contenu centré */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <Footer />
    </div>
  )
}