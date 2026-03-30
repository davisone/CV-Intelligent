'use client'

import { useState } from 'react'
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from 'recharts'

interface MonthlyPoint {
  label: string
  users: number
  purchases: number
  revenue: number
}

interface AdminChartsProps {
  monthlyData: MonthlyPoint[]
  dailyData: MonthlyPoint[]
}

const COLORS = {
  users: '#722F37',
  purchases: '#c0535e',
  revenue: '#D97706',
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-[#E0D6C8] rounded-xl px-3 py-2.5 text-xs shadow-md">
      <p className="text-[#6B6560] font-semibold mb-1.5">{label}</p>
      {payload.map(entry => (
        <p key={entry.name} style={{ color: entry.color }} className="font-medium">
          {entry.name} : {entry.name === 'revenus' ? `${entry.value.toFixed(2)} €` : entry.value}
        </p>
      ))}
    </div>
  )
}

export function AdminCharts({ monthlyData, dailyData }: AdminChartsProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>(null)

  const currentMonthLabel = new Date().toLocaleDateString('fr-FR', { month: 'short', year: '2-digit' })
  const displayDailyFor = selectedMonth ?? currentMonthLabel

  return (
    <div className="space-y-6">

      {/* Vue 12 mois */}
      <div className="bg-white border border-[#E0D6C8] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-[#1F1A17]">12 derniers mois</h2>
          <p className="text-xs text-[#9B9590]">Cliquer sur un mois pour le détail journalier</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={monthlyData}
            onClick={(e) => {
              if (e?.activeLabel && typeof e.activeLabel === 'string') setSelectedMonth(e.activeLabel)
            }}
            className="cursor-pointer"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#F0E8DC" />
            <XAxis dataKey="label" tick={{ fill: '#9B9590', fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#9B9590', fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#6B6560', paddingTop: 16 }} />
            <Line type="monotone" dataKey="users" name="inscrits" stroke={COLORS.users} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.users, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="purchases" name="achats" stroke={COLORS.purchases} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.purchases, strokeWidth: 0 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="revenue" name="revenus" stroke={COLORS.revenue} strokeWidth={2.5} dot={{ r: 4, fill: COLORS.revenue, strokeWidth: 0 }} activeDot={{ r: 6 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Vue journalière */}
      <div className="bg-white border border-[#E0D6C8] rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-sm font-semibold text-[#1F1A17]">
            Détail — <span className="text-[#722F37]">{displayDailyFor}</span>
          </h2>
          {selectedMonth && (
            <button
              onClick={() => setSelectedMonth(null)}
              className="text-xs text-[#722F37] hover:text-[#8B3A44] font-medium transition-colors"
            >
              ← mois en cours
            </button>
          )}
        </div>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={dailyData} barSize={7} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#F0E8DC" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#9B9590', fontSize: 10 }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tick={{ fill: '#9B9590', fontSize: 10 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#6B6560', paddingTop: 12 }} />
            <Bar dataKey="users" name="inscrits" fill={COLORS.users} radius={[3, 3, 0, 0]} opacity={0.85} />
            <Bar dataKey="purchases" name="achats" fill={COLORS.purchases} radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Tableau récap */}
        <div className="mt-5 border-t border-[#E0D6C8] pt-4">
          <div className="grid grid-cols-4 gap-2 text-xs font-semibold text-[#9B9590] uppercase tracking-wider mb-2 px-2">
            <span>Jour</span><span>Inscrits</span><span>Achats</span><span>Revenus</span>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {dailyData.filter(d => d.users > 0 || d.purchases > 0).map(day => (
              <div key={day.label} className="grid grid-cols-4 gap-2 text-xs px-2 py-1.5 rounded-lg hover:bg-[#FBF8F4] transition-colors">
                <span className="text-[#6B6560] font-medium">{day.label}</span>
                <span className="text-[#1F1A17] font-semibold">{day.users}</span>
                <span className="text-[#722F37] font-semibold">{day.purchases}</span>
                <span className="text-[#D97706] font-semibold">{day.revenue > 0 ? `${day.revenue.toFixed(2)} €` : '—'}</span>
              </div>
            ))}
            {dailyData.filter(d => d.users > 0 || d.purchases > 0).length === 0 && (
              <p className="text-[#9B9590] text-xs px-2 py-2">Aucune activité ce mois</p>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
