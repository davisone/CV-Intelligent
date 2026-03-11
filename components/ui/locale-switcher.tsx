'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/navigation'
import { useSession } from 'next-auth/react'
import { useTransition } from 'react'
import { routing } from '@/i18n/routing'

export function LocaleSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const { data: session } = useSession()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) return

    startTransition(() => {
      router.replace(pathname, { locale: newLocale as 'fr' | 'en' })
    })

    if (session?.user) {
      fetch('/api/user', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ locale: newLocale }),
      }).catch(() => {
        // Silencieux — la préférence cookie suffit si l'API échoue
      })
    }
  }

  return (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((loc, index) => (
        <span key={loc} className="flex items-center gap-1">
          {index > 0 && <span className="text-[#C8BAA8]">|</span>}
          <button
            onClick={() => switchLocale(loc)}
            disabled={isPending}
            className={`transition-colors ${
              locale === loc
                ? 'text-[#722F37] font-bold'
                : 'text-[#6B6560] hover:text-[#1F1A17]'
            } disabled:opacity-50`}
            aria-label={`Langue : ${loc.toUpperCase()}`}
          >
            {loc.toUpperCase()}
          </button>
        </span>
      ))}
    </div>
  )
}
