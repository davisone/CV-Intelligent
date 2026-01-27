'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t py-6 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} ResumeForge. Tous droits réservés.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/legal/cgv"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/legal/mentions-legales"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/legal/confidentialite"
              className="text-gray-500 hover:text-gray-900 transition-colors"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
