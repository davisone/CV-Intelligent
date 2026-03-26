import { TemplateType } from '@prisma/client'

export const PREMIUM_TEMPLATES: TemplateType[] = ['CLASSIC', 'ATS', 'MINIMAL', 'CREATIVE']
export const FREE_TEMPLATE: TemplateType = 'MODERN'

export const PRICING = {
  perCV: 499, // 4.99 EUR en centimes
  currency: 'eur',
  displayPrice: '4,99 €',
} as const

export const COVER_LETTER_AI_PRICING = {
  amount: 299, // 2.99 EUR en centimes
  currency: 'eur',
  displayPrice: '2,99 €',
  maxGenerations: 3,
} as const

export function isPremiumTemplate(template: TemplateType): boolean {
  return PREMIUM_TEMPLATES.includes(template)
}

export function isFreeTemplate(template: TemplateType): boolean {
  return template === FREE_TEMPLATE
}
