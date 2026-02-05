'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
  label: string
  href: string
  icon: LucideIcon
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'Mes CV',
    href: '/dashboard/resumes',
    icon: FileText,
  },
  {
    label: 'Templates',
    href: '/dashboard/templates',
    icon: Palette,
  },
  {
    label: 'Mon Profil',
    href: '/dashboard/profile',
    icon: User,
  },
  {
    label: 'Paramètres',
    href: '/dashboard/settings',
    icon: Settings,
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r border-[#404040] bg-[#1A1A1A] h-[calc(100vh-4rem)] hidden md:block">
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
                  ? 'bg-[#C9A227]/10 text-[#C9A227] border border-[#C9A227]/20'
                  : 'text-[#A3A3A3] hover:bg-[#2D2D2D] hover:text-[#E5E5E5]'
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
