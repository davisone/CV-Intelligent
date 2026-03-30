import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { redirect } from 'next/navigation'
import { AdminCharts } from './admin-charts'
import { Users, CreditCard, TrendingUp, FileText, Percent, Calendar } from 'lucide-react'

export const metadata = { robots: { index: false, follow: false } }

function formatEuros(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

function getWeekStart() {
  const d = new Date()
  d.setDate(d.getDate() - 7)
  d.setHours(0, 0, 0, 0)
  return d
}

function getLast12Months() {
  return Array.from({ length: 12 }, (_, i) => {
    const d = new Date()
    d.setDate(1)
    d.setMonth(d.getMonth() - (11 - i))
    d.setHours(0, 0, 0, 0)
    return d
  })
}

function getMonthLabel(date: Date) {
  return date.toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.isAdmin) redirect('/')

  const now = new Date()
  const weekStart = getWeekStart()
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
  const months = getLast12Months()

  const [
    totalUsers,
    newUsersWeek,
    totalResumes,
    totalPayments,
    revenueResult,
    recentUsers,
    allUsers,
    allPayments,
  ] = await Promise.all([
    prisma.user.count(),
    prisma.user.count({ where: { createdAt: { gte: weekStart } } }),
    prisma.resume.count(),
    prisma.payment.count({ where: { status: 'COMPLETED' } }),
    prisma.payment.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { amount: true },
    }),
    prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      take: 10,
      select: {
        id: true,
        name: true,
        email: true,
        createdAt: true,
        _count: { select: { resumes: true, payments: true } },
      },
    }),
    prisma.user.findMany({
      where: { createdAt: { gte: months[0] } },
      select: { createdAt: true },
      orderBy: { createdAt: 'asc' },
    }),
    prisma.payment.findMany({
      where: { status: 'COMPLETED', createdAt: { gte: months[0] } },
      select: { createdAt: true, amount: true },
      orderBy: { createdAt: 'asc' },
    }),
  ])

  const totalRevenue = revenueResult._sum.amount ?? 0
  const conversionRate = totalUsers > 0 ? ((totalPayments / totalUsers) * 100).toFixed(1) : '0'

  // Données par mois pour le graphique global
  const monthlyData = months.map((monthDate) => {
    const nextMonth = new Date(monthDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    const label = getMonthLabel(monthDate)

    const users = allUsers.filter(u =>
      u.createdAt >= monthDate && u.createdAt < nextMonth
    ).length

    const purchases = allPayments.filter(p =>
      p.createdAt >= monthDate && p.createdAt < nextMonth
    ).length

    const revenue = allPayments
      .filter(p => p.createdAt >= monthDate && p.createdAt < nextMonth)
      .reduce((sum, p) => sum + p.amount, 0)

    return { label, users, purchases, revenue: revenue / 100 }
  })

  // Données journalières du mois en cours
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(now.getFullYear(), now.getMonth(), i + 1)
    const nextDay = new Date(now.getFullYear(), now.getMonth(), i + 2)
    const label = String(i + 1).padStart(2, '0')

    const users = allUsers.filter(u =>
      u.createdAt >= day && u.createdAt < nextDay
    ).length

    const purchases = allPayments.filter(p =>
      p.createdAt >= day && p.createdAt < nextDay
    ).length

    const revenue = allPayments
      .filter(p => p.createdAt >= day && p.createdAt < nextDay)
      .reduce((sum, p) => sum + p.amount, 0)

    return { label, users, purchases, revenue: revenue / 100 }
  })

  const kpis = [
    {
      label: 'Utilisateurs',
      value: totalUsers.toLocaleString('fr-FR'),
      icon: Users,
      sub: `+${newUsersWeek} cette semaine`,
    },
    {
      label: 'CVs créés',
      value: totalResumes.toLocaleString('fr-FR'),
      icon: FileText,
      sub: `${(totalResumes / Math.max(totalUsers, 1)).toFixed(1)} / utilisateur`,
    },
    {
      label: 'Achats',
      value: totalPayments.toLocaleString('fr-FR'),
      icon: CreditCard,
      sub: 'paiements complétés',
    },
    {
      label: 'Revenus',
      value: formatEuros(totalRevenue),
      icon: TrendingUp,
      sub: `${formatEuros(totalRevenue / Math.max(totalPayments, 1))} / achat`,
    },
    {
      label: 'Conversion',
      value: `${conversionRate}%`,
      icon: Percent,
      sub: 'inscrits → acheteurs',
    },
    {
      label: 'Nouveaux / semaine',
      value: newUsersWeek.toLocaleString('fr-FR'),
      icon: Calendar,
      sub: '7 derniers jours',
    },
  ]

  return (
    <div className="min-h-screen bg-[#0F0C0A] text-[#E8E0D5] p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-10 flex items-end justify-between border-b border-[#2A2420] pb-6">
          <div>
            <p className="text-[#722F37] text-xs font-mono uppercase tracking-[0.3em] mb-2">
              Accès restreint
            </p>
            <h1 className="text-3xl font-bold text-[#FBF8F4]">Administration</h1>
          </div>
          <p className="text-[#5A5248] text-sm font-mono">
            {now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {kpis.map(({ label, value, icon: Icon, sub }) => (
            <div key={label} className="bg-[#1A1512] border border-[#2A2420] rounded-xl p-4 hover:border-[#722F37]/50 transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <Icon className="w-3.5 h-3.5 text-[#722F37]" />
                <span className="text-[#5A5248] text-xs font-mono uppercase tracking-wider">{label}</span>
              </div>
              <p className="text-xl font-bold text-[#FBF8F4] mb-1">{value}</p>
              <p className="text-[#5A5248] text-xs">{sub}</p>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <AdminCharts monthlyData={monthlyData} dailyData={dailyData} />

        {/* Tableau derniers inscrits */}
        <div className="mt-10">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[#5A5248] mb-4">
            Derniers inscrits
          </h2>
          <div className="bg-[#1A1512] border border-[#2A2420] rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#2A2420]">
                  {['Nom', 'Email', 'Inscription', 'CVs', 'Achat'].map(col => (
                    <th key={col} className="text-left px-4 py-3 text-[#5A5248] font-mono text-xs uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, i) => (
                  <tr
                    key={user.id}
                    className={`border-b border-[#2A2420]/50 hover:bg-[#231E1A] transition-colors ${i === recentUsers.length - 1 ? 'border-b-0' : ''}`}
                  >
                    <td className="px-4 py-3 text-[#E8E0D5] font-medium">
                      {user.name ?? '—'}
                    </td>
                    <td className="px-4 py-3 text-[#9B9590] font-mono text-xs">
                      {user.email}
                    </td>
                    <td className="px-4 py-3 text-[#9B9590] font-mono text-xs">
                      {user.createdAt.toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-[#E8E0D5]">
                      {user._count.resumes}
                    </td>
                    <td className="px-4 py-3">
                      {user._count.payments > 0 ? (
                        <span className="inline-flex items-center gap-1 bg-[#722F37]/20 text-[#c0535e] text-xs px-2 py-0.5 rounded-full">
                          ✓ oui
                        </span>
                      ) : (
                        <span className="text-[#5A5248] text-xs">non</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  )
}
