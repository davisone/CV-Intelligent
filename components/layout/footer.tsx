'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#404040] py-6 bg-[#0D0D0D]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#A3A3A3] text-sm">
            &copy; {new Date().getFullYear()} ResumeForge — Propulsé par{' '}
            <a
              href="https://dvs-web.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#C9A227] hover:text-[#D4B44A] transition-colors"
            >
              DVS-Web
            </a>
            . Tous droits réservés.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/legal/cgv"
              className="text-[#A3A3A3] hover:text-[#C9A227] transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/legal/mentions-legales"
              className="text-[#A3A3A3] hover:text-[#C9A227] transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/legal/confidentialite"
              className="text-[#A3A3A3] hover:text-[#C9A227] transition-colors"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
