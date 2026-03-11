'use client'

import { useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/helpers'
import {
  LayoutDashboard,
  FileText,
  Palette,
  User,
  Settings,
  Menu,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

interface NavItem {
  labelKey: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  { labelKey: 'dashboard', href: '/dashboard', icon: LayoutDashboard },
  { labelKey: 'myResumes', href: '/dashboard/resumes', icon: FileText },
  { labelKey: 'templates', href: '/dashboard/templates', icon: Palette },
  { labelKey: 'myProfile', href: '/dashboard/profile', icon: User },
  { labelKey: 'settings', href: '/dashboard/settings', icon: Settings },
]

export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const t = useTranslations('nav')

  return (
    <header className="h-16 border-b border-[#E0D6C8] bg-[#F3EDE5] flex items-center justify-between px-6 sticky top-0 z-40">
      <Link href="/dashboard" className="text-xl font-bold text-[#722F37] hover:text-[#8B3A44] transition-colors">
        CV Builder
      </Link>

      <div className="hidden md:flex items-center gap-4">
        <LocaleSwitcher />
        {session?.user && (
          <>
            <span className="text-sm text-[#6B6560]">
              {session.user.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => signOut({ callbackUrl: '/' })}
            >
              {t('logout')}
            </Button>
          </>
        )}
      </div>

      <button
        className="md:hidden p-2"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-[#722F37]" />
        ) : (
          <Menu className="w-6 h-6 text-[#722F37]" />
        )}
      </button>

      {isMenuOpen && session?.user && (
        <div className="absolute top-16 left-0 right-0 bg-[#F3EDE5] border-b border-[#E0D6C8] md:hidden z-50">
          <div className="flex flex-col p-4 gap-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href ||
                (item.href !== '/dashboard' && pathname.startsWith(item.href))
              const Icon = item.icon

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-[#722F37]/10 text-[#722F37] border border-[#722F37]/20'
                      : 'text-[#6B6560] hover:bg-[#E8E0D5] hover:text-[#1F1A17]'
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {t(item.labelKey as Parameters<typeof t>[0])}
                </Link>
              )
            })}

            <div className="border-t border-[#E0D6C8] mt-2 pt-2">
              <div className="px-3 py-2">
                <LocaleSwitcher />
              </div>
              <span className="text-sm text-[#6B6560] block px-3 py-2">
                {session.user.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  signOut({ callbackUrl: '/' })
                  setIsMenuOpen(false)
                }}
                className="justify-start w-full"
              >
                {t('logout')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
