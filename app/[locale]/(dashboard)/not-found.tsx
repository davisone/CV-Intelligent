import Link from 'next/link'

export default function DashboardNotFound() {
  return (
    <div className="min-h-[400px] flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="mt-4 text-xl text-gray-600">Page introuvable</p>
        <p className="mt-2 text-gray-500">
          Cette page du tableau de bord n&apos;existe pas.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
        >
          Retour au tableau de bord
        </Link>
      </div>
    </div>
  )
}
