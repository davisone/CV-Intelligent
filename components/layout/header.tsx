'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b border-[#E0D6C8] bg-[#F3EDE5] flex items-center justify-between px-6">
      <Link href="/dashboard" className="text-xl font-bold text-[#722F37] hover:text-[#8B3A44] transition-colors">
        CV Builder
      </Link>

      <div className="flex items-center gap-4">
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
    </header>
  )
}
