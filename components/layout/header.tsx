'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-6">
      <Link href="/dashboard" className="text-xl font-bold text-primary">
        ResumeForge
      </Link>

      <div className="flex items-center gap-4">
        {session?.user && (
          <>
            <span className="text-sm text-gray-500">
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