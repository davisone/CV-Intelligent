import Link from 'next/link'
import { getTranslations } from 'next-intl/server'

export default async function DashboardNotFound() {
  const t = await getTranslations('dashboard.layout')

  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">{t('notFound')}</p>
        <p className="mt-2 text-gray-500">
          {t('notFoundDetails')}
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          {t('backToDashboard')}
        </Link>
      </div>
    </div>
  )
}
