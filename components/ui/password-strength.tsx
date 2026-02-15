'use client'

import { useMemo } from 'react'
import { cn } from '@/lib/utils/helpers'

interface PasswordStrengthProps {
  password: string
}

type StrengthLevel = 'weak' | 'fair' | 'good' | 'strong'

interface StrengthInfo {
  level: StrengthLevel
  score: number
  label: string
  color: string
}

function calculateStrength(password: string): StrengthInfo {
  let score = 0

  if (!password) {
    return { level: 'weak', score: 0, label: '', color: 'bg-gray-200' }
  }

  // Longueur
  if (password.length >= 8) score += 1
  if (password.length >= 12) score += 1
  if (password.length >= 16) score += 1

  // Complexité
  if (/[a-z]/.test(password)) score += 1
  if (/[A-Z]/.test(password)) score += 1
  if (/[0-9]/.test(password)) score += 1
  if (/[^a-zA-Z0-9]/.test(password)) score += 1

  // Bonus pour combinaisons
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score += 1
  if (/[a-zA-Z]/.test(password) && /[0-9]/.test(password)) score += 1

  // Déterminer le niveau
  if (score <= 3) {
    return { level: 'weak', score: 1, label: 'Faible', color: 'bg-red-500' }
  } else if (score <= 5) {
    return { level: 'fair', score: 2, label: 'Moyen', color: 'bg-orange-500' }
  } else if (score <= 7) {
    return { level: 'good', score: 3, label: 'Bon', color: 'bg-yellow-500' }
  } else {
    return { level: 'strong', score: 4, label: 'Fort', color: 'bg-green-500' }
  }
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const strength = useMemo(() => calculateStrength(password), [password])

  if (!password) return null

  return (
    <div className="mt-2 space-y-1">
      {/* Barre de progression */}
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((index) => (
          <div
            key={index}
            className={cn(
              'h-1.5 flex-1 rounded-full transition-all duration-300',
              index <= strength.score ? strength.color : 'bg-[#E0D6C8]'
            )}
          />
        ))}
      </div>

      {/* Label */}
      <div className="flex justify-between items-center">
        <span
          className={cn(
            'text-xs font-medium transition-colors duration-300',
            strength.level === 'weak' && 'text-red-500',
            strength.level === 'fair' && 'text-orange-500',
            strength.level === 'good' && 'text-yellow-600',
            strength.level === 'strong' && 'text-green-500'
          )}
        >
          {strength.label}
        </span>
        <span className="text-xs text-[#8A7F72]">
          {strength.level === 'strong' ? '✓ Sécurisé' : ''}
        </span>
      </div>
    </div>
  )
}
