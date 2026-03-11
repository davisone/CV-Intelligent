'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { toast } from 'sonner'

export function WelcomeToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const welcome = searchParams.get('welcome')

  useEffect(() => {
    if (welcome === 'true') {
      toast.success('Bienvenue ! Votre compte a été créé avec succès.')
      // Remove the query parameter from URL
      router.replace('/dashboard')
    }
  }, [welcome, router])

  return null
}