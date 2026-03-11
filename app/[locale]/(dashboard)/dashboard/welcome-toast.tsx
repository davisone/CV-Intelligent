'use client'

import { useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { toast } from 'sonner'

export function WelcomeToast() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const t = useTranslations('dashboard.home')
  const welcome = searchParams.get('welcome')

  useEffect(() => {
    if (welcome === 'true') {
      toast.success(t('subtitle'))
      // Remove the query parameter from URL
      router.replace('/dashboard')
    }
  }, [welcome, router, t])

  return null
}