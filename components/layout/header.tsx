'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname } from 'next/navigation'
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

// Navigation items displayed in both desktop sidebar and mobile menu
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

/**
 * Header component with responsive navigation
 * - Desktop: Shows logo, email, and logout button
 * - Mobile: Shows logo and hamburger menu with navigation items
 */
export function Header() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="h-16 border-b border-[#E0D6C8] bg-[#F3EDE5] flex items-center justify-between px-6 sticky top-0 z-40">
      {/* Logo */}
      <Link href="/dashboard" className="text-xl font-bold text-[#722F37] hover:text-[#8B3A44] transition-colors">
        CV Builder
      </Link>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-4">
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
              Déconnexion
            </Button>
          </>
        )}
      </div>

      {/* Mobile Menu Toggle Button */}
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

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && session?.user && (
        <div className="absolute top-16 left-0 right-0 bg-[#F3EDE5] border-b border-[#E0D6C8] md:hidden z-50">
          <div className="flex flex-col p-4 gap-2">
            {/* Navigation Links */}
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
                  {item.label}
                </Link>
              )
            })}

            {/* User Info & Logout */}
            <div className="border-t border-[#E0D6C8] mt-2 pt-2">
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
                Déconnexion
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
