'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-[#404040] bg-[#1A1A1A] flex items-center justify-between px-6">
      <Link href="/dashboard" className="text-xl font-bold text-[#C9A227] hover:text-[#D4B44A] transition-colors">
        ResumeForge
      </Link>

      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <span className="text-sm text-[#A3A3A3]">
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
    </header>
  )
}
