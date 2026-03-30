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

// Promotion prolongée : 30 mars → 5 avril 2026 23h59
export const WEEKEND_PROMO = {
  slug: 'promo-semaine-2026-03-30',
  start: new Date('2026-03-30T00:00:00+01:00'),
  end: new Date('2026-04-05T23:59:59+01:00'),
  discountCents: 100, // -1€
} as const

export function isPromoActive(): boolean {
  const now = new Date()
  return now >= WEEKEND_PROMO.start && now <= WEEKEND_PROMO.end
}

export function getActivePrice(): { perCV: number; displayPrice: string } {
  if (isPromoActive()) {
    return { perCV: 399, displayPrice: '3,99 €' }
  }
  return { perCV: PRICING.perCV, displayPrice: PRICING.displayPrice }
}

export function getActiveCoverLetterPrice(): { amount: number; displayPrice: string } {
  if (isPromoActive()) {
    return { amount: 199, displayPrice: '1,99 €' }
  }
  return { amount: COVER_LETTER_AI_PRICING.amount, displayPrice: COVER_LETTER_AI_PRICING.displayPrice }
}

export function isPremiumTemplate(template: TemplateType): boolean {
  return PREMIUM_TEMPLATES.includes(template)
}

export function isFreeTemplate(template: TemplateType): boolean {
  return template === FREE_TEMPLATE
}
