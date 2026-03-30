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
  revenue: '#E8A87C',
}

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-[#1A1512] border border-[#2A2420] rounded-lg px-3 py-2 text-xs">
      <p className="text-[#9B9590] font-mono mb-1">{label}</p>
      {payload.map(entry => (
        <p key={entry.name} style={{ color: entry.color }} className="font-mono">
          {entry.name}: {entry.name === 'revenus' ? `${entry.value.toFixed(2)} €` : entry.value}
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
    <div className="space-y-8">

      {/* Vue 12 mois */}
      <div className="bg-[#1A1512] border border-[#2A2420] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[#5A5248]">
            12 derniers mois
          </h2>
          <p className="text-xs text-[#5A5248]">Cliquer sur un mois pour le détail</p>
        </div>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart
            data={monthlyData}
            onClick={(e) => {
              if (e?.activeLabel && typeof e.activeLabel === 'string') setSelectedMonth(e.activeLabel)
            }}
            className="cursor-pointer"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2420" />
            <XAxis dataKey="label" tick={{ fill: '#5A5248', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fill: '#5A5248', fontSize: 11, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', color: '#5A5248', paddingTop: 16 }}
            />
            <Line type="monotone" dataKey="users" name="inscrits" stroke={COLORS.users} strokeWidth={2} dot={{ r: 3, fill: COLORS.users }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="purchases" name="achats" stroke={COLORS.purchases} strokeWidth={2} dot={{ r: 3, fill: COLORS.purchases }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="revenue" name="revenus" stroke={COLORS.revenue} strokeWidth={2} dot={{ r: 3, fill: COLORS.revenue }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Vue journalière */}
      <div className="bg-[#1A1512] border border-[#2A2420] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-[#5A5248]">
            Détail — <span className="text-[#722F37]">{displayDailyFor}</span>
          </h2>
          {selectedMonth && (
            <button
              onClick={() => setSelectedMonth(null)}
              className="text-xs text-[#5A5248] hover:text-[#9B9590] font-mono transition-colors"
            >
              ← mois en cours
            </button>
          )}
        </div>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={dailyData} barSize={6} barGap={2}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2A2420" vertical={false} />
            <XAxis dataKey="label" tick={{ fill: '#5A5248', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} interval={2} />
            <YAxis tick={{ fill: '#5A5248', fontSize: 10, fontFamily: 'monospace' }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ fontSize: 11, fontFamily: 'monospace', color: '#5A5248', paddingTop: 16 }}
            />
            <Bar dataKey="users" name="inscrits" fill={COLORS.users} radius={[2, 2, 0, 0]} />
            <Bar dataKey="purchases" name="achats" fill={COLORS.purchases} radius={[2, 2, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>

        {/* Tableau récap du mois */}
        <div className="mt-6 border-t border-[#2A2420] pt-4">
          <div className="grid grid-cols-4 gap-2 text-xs font-mono text-[#5A5248] uppercase tracking-wider mb-2 px-2">
            <span>Jour</span><span>Inscrits</span><span>Achats</span><span>Revenus</span>
          </div>
          <div className="max-h-48 overflow-y-auto space-y-0.5">
            {dailyData.filter(d => d.users > 0 || d.purchases > 0).map(day => (
              <div key={day.label} className="grid grid-cols-4 gap-2 text-xs font-mono px-2 py-1 rounded hover:bg-[#231E1A] transition-colors">
                <span className="text-[#9B9590]">{day.label}</span>
                <span className="text-[#E8E0D5]">{day.users}</span>
                <span className="text-[#c0535e]">{day.purchases}</span>
                <span className="text-[#E8A87C]">{day.revenue > 0 ? `${day.revenue.toFixed(2)} €` : '—'}</span>
              </div>
            ))}
            {dailyData.filter(d => d.users > 0 || d.purchases > 0).length === 0 && (
              <p className="text-[#5A5248] text-xs font-mono px-2 py-2">Aucune activité ce mois</p>
            )}
          </div>
        </div>
      </div>

    </div>
  )
}
