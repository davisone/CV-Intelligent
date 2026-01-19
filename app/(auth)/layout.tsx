import Link from 'next/link'
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

      {/* Footer minimal */}
      <footer className="p-4 text-center text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} ResumeForge
      </footer>
    </div>
  )
}