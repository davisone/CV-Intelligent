'use client'

import { Link, usePathname } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { cn } from '@/lib/utils/helpers'
import {
  LayoutDashboard,
  FileText,
  Palette,
  User,
  Settings,
} from '@/components/ui/icons'
import { LucideIcon } from 'lucide-react'

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

export function Sidebar() {
  const pathname = usePathname()
  const t = useTranslations('nav')

  return (
    <aside className="w-64 border-r border-[#E0D6C8] bg-[#F3EDE5] h-[calc(100vh-4rem)] hidden md:block sticky top-16 overflow-y-auto">
      <nav className="p-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))
          const Icon = item.icon

          return (
            <Link
              key={item.href}
              href={item.href}
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
      </nav>
    </aside>
  )
}
