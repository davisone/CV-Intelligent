import { describe, it, expect } from 'vitest'
import { PRICING, isPremiumTemplate, isFreeTemplate } from '@/lib/config/pricing'

describe('PRICING', () => {
  it('should have perCV at 499 centimes', () => {
    expect(PRICING.perCV).toBe(499)
  })

  it('should use EUR currency', () => {
    expect(PRICING.currency).toBe('eur')
  })

  it('should display price as "4,99 \u20ac"', () => {
    expect(PRICING.displayPrice).toBe('4,99 \u20ac')
  })
})

describe('isPremiumTemplate', () => {
  it('should return true for CLASSIC', () => {
    expect(isPremiumTemplate('CLASSIC')).toBe(true)
  })

  it('should return true for ATS', () => {
    expect(isPremiumTemplate('ATS')).toBe(true)
  })

  it('should return true for MINIMAL', () => {
    expect(isPremiumTemplate('MINIMAL')).toBe(true)
  })

  it('should return true for CREATIVE', () => {
    expect(isPremiumTemplate('CREATIVE')).toBe(true)
  })

  it('should return false for MODERN', () => {
    expect(isPremiumTemplate('MODERN')).toBe(false)
  })
})

describe('isFreeTemplate', () => {
  it('should return true for MODERN', () => {
    expect(isFreeTemplate('MODERN')).toBe(true)
  })

  it('should return false for CLASSIC', () => {
    expect(isFreeTemplate('CLASSIC')).toBe(false)
  })

  it('should return false for ATS', () => {
    expect(isFreeTemplate('ATS')).toBe(false)
  })
})
