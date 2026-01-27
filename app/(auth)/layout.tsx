import Link from 'next/link'
import { Footer } from '@/components/layout/footer'
import type { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header minimal */}
      <header className="p-4">
        <Link href="/" className="text-2xl font-bold text-primary">
          ResumeForge
        </Link>
      </header>

      {/* Contenu centré */}
      <main className="flex-1 flex items-center justify-center p-4">
        {children}
      </main>

      <Footer />
    </div>
  )
}