'use client'

import Link from 'next/link'

export function Footer() {
  return (
    <footer className="border-t border-[#E0D6C8] py-6 bg-[#F3EDE5]">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[#6B6560] text-sm">
            &copy; {new Date().getFullYear()} DVS-CV — Propulsé par{' '}
            <a
              href="https://dvs-web.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#722F37] hover:text-[#8B3A44] transition-colors"
            >
              DVS-Web
            </a>
            . Tous droits réservés.
          </p>
          <nav className="flex items-center gap-6 text-sm">
            <Link
              href="/legal/cgv"
              className="text-[#6B6560] hover:text-[#722F37] transition-colors"
            >
              CGV
            </Link>
            <Link
              href="/legal/mentions-legales"
              className="text-[#6B6560] hover:text-[#722F37] transition-colors"
            >
              Mentions légales
            </Link>
            <Link
              href="/legal/confidentialite"
              className="text-[#6B6560] hover:text-[#722F37] transition-colors"
            >
              Confidentialité
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
