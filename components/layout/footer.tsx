'use client'

import Link from 'next/link'
import { MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-[#E0D6C8] py-8 bg-[#F3EDE5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand & Location */}
          <div>
            <Link href="/" className="text-xl font-bold text-[#722F37] mb-3 block">
              CV Builder
            </Link>
            <p className="text-sm text-[#6B6560] mb-2">
              Générateur de CV gratuit avec intelligence artificielle
            </p>
            <div className="flex items-center gap-1.5 text-sm text-[#6B6560]">
              <MapPin className="w-4 h-4 text-[#722F37]" />
              <span>Créé à Rennes par{' '}
                <a
                  href="https://dvs-web.fr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#722F37] hover:text-[#8B3A44] transition-colors font-medium"
                >
                  Evan Davison
                </a>
              </span>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-[#1F1A17] mb-3">Ressources</h3>
            <nav className="flex flex-col gap-2 text-sm">
              <Link
                href="/guide"
                className="text-[#6B6560] hover:text-[#722F37] transition-colors"
              >
                Comment faire un CV
              </Link>
              <Link
                href="/templates"
                className="text-[#6B6560] hover:text-[#722F37] transition-colors"
              >
                Templates CV
              </Link>
              <Link
                href="/signup"
                className="text-[#6B6560] hover:text-[#722F37] transition-colors"
              >
                Créer un CV gratuit
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-[#1F1A17] mb-3">Légal</h3>
            <nav className="flex flex-col gap-2 text-sm">
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

        {/* Bottom bar */}
        <div className="pt-6 border-t border-[#E0D6C8]">
          <p className="text-[#6B6560] text-sm text-center">
            &copy; {new Date().getFullYear()} CV Builder — Propulsé par{' '}
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
        </div>
      </div>
    </footer>
  )
}
