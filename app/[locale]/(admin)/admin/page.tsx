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

  const monthlyData = months.map((monthDate) => {
    const nextMonth = new Date(monthDate)
    nextMonth.setMonth(nextMonth.getMonth() + 1)
    const label = getMonthLabel(monthDate)
    const users = allUsers.filter(u => u.createdAt >= monthDate && u.createdAt < nextMonth).length
    const purchases = allPayments.filter(p => p.createdAt >= monthDate && p.createdAt < nextMonth).length
    const revenue = allPayments.filter(p => p.createdAt >= monthDate && p.createdAt < nextMonth).reduce((s, p) => s + p.amount, 0)
    return { label, users, purchases, revenue: revenue / 100 }
  })

  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate()
  const dailyData = Array.from({ length: daysInMonth }, (_, i) => {
    const day = new Date(now.getFullYear(), now.getMonth(), i + 1)
    const nextDay = new Date(now.getFullYear(), now.getMonth(), i + 2)
    const label = String(i + 1).padStart(2, '0')
    const users = allUsers.filter(u => u.createdAt >= day && u.createdAt < nextDay).length
    const purchases = allPayments.filter(p => p.createdAt >= day && p.createdAt < nextDay).length
    const revenue = allPayments.filter(p => p.createdAt >= day && p.createdAt < nextDay).reduce((s, p) => s + p.amount, 0)
    return { label, users, purchases, revenue: revenue / 100 }
  })

  const kpis = [
    { label: 'Utilisateurs', value: totalUsers.toLocaleString('fr-FR'), icon: Users, sub: `+${newUsersWeek} cette semaine`, color: 'text-[#722F37]', bg: 'bg-[#722F37]/10' },
    { label: 'CVs créés', value: totalResumes.toLocaleString('fr-FR'), icon: FileText, sub: `${(totalResumes / Math.max(totalUsers, 1)).toFixed(1)} / utilisateur`, color: 'text-[#722F37]', bg: 'bg-[#722F37]/10' },
    { label: 'Achats', value: totalPayments.toLocaleString('fr-FR'), icon: CreditCard, sub: 'paiements complétés', color: 'text-[#722F37]', bg: 'bg-[#722F37]/10' },
    { label: 'Revenus', value: formatEuros(totalRevenue), icon: TrendingUp, sub: `${formatEuros(totalRevenue / Math.max(totalPayments, 1))} / achat`, color: 'text-[#722F37]', bg: 'bg-[#722F37]/10' },
    { label: 'Conversion', value: `${conversionRate}%`, icon: Percent, sub: 'inscrits → acheteurs', color: 'text-[#722F37]', bg: 'bg-[#722F37]/10' },
    { label: 'Nouveaux / semaine', value: newUsersWeek.toLocaleString('fr-FR'), icon: Calendar, sub: '7 derniers jours', color: 'text-[#722F37]', bg: 'bg-[#722F37]/10' },
  ]

  return (
    <div className="min-h-screen bg-[#FBF8F4] p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-end justify-between border-b border-[#E0D6C8] pb-6">
          <div>
            <span className="inline-flex items-center gap-1.5 bg-[#722F37] text-white text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
              Admin
            </span>
            <h1 className="text-3xl font-bold text-[#1F1A17]">Tableau de bord</h1>
          </div>
          <p className="text-[#9B9590] text-sm">
            {now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {kpis.map(({ label, value, icon: Icon, sub, color, bg }) => (
            <div key={label} className="bg-white border border-[#E0D6C8] rounded-2xl p-4 hover:border-[#722F37]/40 hover:shadow-sm transition-all">
              <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center mb-3`}>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-bold text-[#1F1A17] mb-0.5">{value}</p>
              <p className="text-xs text-[#6B6560] font-medium mb-1">{label}</p>
              <p className="text-xs text-[#9B9590]">{sub}</p>
            </div>
          ))}
        </div>

        {/* Graphiques */}
        <AdminCharts monthlyData={monthlyData} dailyData={dailyData} />

        {/* Tableau derniers inscrits */}
        <div className="mt-8">
          <h2 className="text-sm font-semibold text-[#6B6560] uppercase tracking-wider mb-3">
            Derniers inscrits
          </h2>
          <div className="bg-white border border-[#E0D6C8] rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#E0D6C8] bg-[#F8F4EE]">
                  {['Nom', 'Email', 'Inscription', 'CVs', 'Achat'].map(col => (
                    <th key={col} className="text-left px-5 py-3 text-[#6B6560] font-semibold text-xs uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user, i) => (
                  <tr
                    key={user.id}
                    className={`hover:bg-[#FBF8F4] transition-colors ${i < recentUsers.length - 1 ? 'border-b border-[#E0D6C8]' : ''}`}
                  >
                    <td className="px-5 py-3.5 font-medium text-[#1F1A17]">{user.name ?? '—'}</td>
                    <td className="px-5 py-3.5 text-[#6B6560] text-xs">{user.email}</td>
                    <td className="px-5 py-3.5 text-[#6B6560] text-xs">{user.createdAt.toLocaleDateString('fr-FR')}</td>
                    <td className="px-5 py-3.5 text-[#1F1A17] font-medium">{user._count.resumes}</td>
                    <td className="px-5 py-3.5">
                      {user._count.payments > 0 ? (
                        <span className="inline-flex items-center bg-[#722F37]/10 text-[#722F37] text-xs font-semibold px-2.5 py-1 rounded-full">
                          ✓ oui
                        </span>
                      ) : (
                        <span className="text-[#9B9590] text-xs">non</span>
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
