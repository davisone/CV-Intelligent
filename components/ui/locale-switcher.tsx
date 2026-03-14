'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useSession } from 'next-auth/react'
import { useTransition, useState, useRef, useEffect } from 'react'
import { routing } from '@/i18n/routing'
import { ChevronDown } from 'lucide-react'

const LOCALE_LABELS: Record<string, string> = {
  fr: 'FR',
  en: 'EN',
  es: 'ES',
}

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) { setOpen(false); return }
    setOpen(false)

    startTransition(() => {
      router.replace(pathname, { locale: newLocale as 'fr' | 'en' | 'es' })
    })

    if (session?.user) {
      fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: newLocale }),
      }).catch(() => {})
    }
  }

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        disabled={isPending}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1 text-sm font-medium text-[#6B6560] hover:text-[#1F1A17] transition-colors disabled:opacity-50 px-2 py-1 rounded-lg hover:bg-[#F3EDE5]"
      >
        <span className="font-bold text-[#722F37]">{LOCALE_LABELS[locale] ?? locale.toUpperCase()}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute right-0 top-full mt-1 z-50 bg-white border border-[#E0D6C8] rounded-xl shadow-lg overflow-hidden min-w-[60px]"
        >
          {routing.locales.map((loc) => (
            <li key={loc}>
              <button
                role="option"
                aria-selected={locale === loc}
                onClick={() => switchLocale(loc)}
                className={`w-full text-left px-3 py-2 text-sm font-medium transition-colors ${
                  locale === loc
                    ? 'bg-[#722F37]/10 text-[#722F37] font-bold'
                    : 'text-[#6B6560] hover:bg-[#F3EDE5] hover:text-[#1F1A17]'
                }`}
              >
                {LOCALE_LABELS[loc]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
