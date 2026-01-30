import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock prisma before importing the module
vi.mock('@/lib/db/prisma', () => ({
  prisma: {
    resume: {
      findFirst: vi.fn(),
    },
  },
}))

import { prisma } from '@/lib/db/prisma'
import {
  checkResumeAccess,
  canUseAIFeatures,
  canCreateResume,
  canChangeTemplate,
} from '@/lib/payments/feature-check'

const mockFindFirst = vi.mocked(prisma.resume.findFirst)

beforeEach(() => {
  vi.clearAllMocks()
})

describe('checkResumeAccess', () => {
  it('should deny access when resume not found', async () => {
    mockFindFirst.mockResolvedValue(null)
    const result = await checkResumeAccess('r1', 'u1')
    expect(result.canAccess).toBe(false)
  })

  it('should grant access for paid resume', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: true,
      paymentStatus: 'PAID',
      template: 'CLASSIC',
      createdAt: new Date(),
    } as never)
    const result = await checkResumeAccess('r1', 'u1')
    expect(result.canAccess).toBe(true)
    expect(result.reason).toBe('paid_cv')
  })

  it('should grant access for free MODERN template', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: false,
      paymentStatus: null,
      template: 'MODERN',
      createdAt: new Date(),
    } as never)
    const result = await checkResumeAccess('r1', 'u1')
    expect(result.canAccess).toBe(true)
    expect(result.reason).toBe('free_cv')
  })

  it('should require payment for unpaid premium template', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: false,
      paymentStatus: null,
      template: 'CLASSIC',
      createdAt: new Date(),
    } as never)
    const result = await checkResumeAccess('r1', 'u1')
    expect(result.canAccess).toBe(false)
    expect(result.reason).toBe('payment_required')
    expect(result.requiresPayment).toBe(true)
  })
})

describe('canUseAIFeatures', () => {
  it('should allow AI features for paid resume', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: true,
      template: 'CLASSIC',
    } as never)
    const result = await canUseAIFeatures('r1', 'u1')
    expect(result.allowed).toBe(true)
  })

  it('should deny AI features for free MODERN template', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: false,
      template: 'MODERN',
    } as never)
    const result = await canUseAIFeatures('r1', 'u1')
    expect(result.allowed).toBe(false)
  })

  it('should deny when resume not found', async () => {
    mockFindFirst.mockResolvedValue(null)
    const result = await canUseAIFeatures('r1', 'u1')
    expect(result.allowed).toBe(false)
    expect(result.reason).toBe('CV introuvable')
  })
})

describe('canCreateResume', () => {
  it('should allow creating MODERN template for free', async () => {
    const result = await canCreateResume('u1', 'MODERN')
    expect(result.allowed).toBe(true)
    expect(result.requiresPayment).toBe(false)
  })

  it('should require payment for premium template', async () => {
    const result = await canCreateResume('u1', 'CLASSIC')
    expect(result.allowed).toBe(false)
    expect(result.requiresPayment).toBe(true)
  })
})

describe('canChangeTemplate', () => {
  it('should allow paid resume to change to any template', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: true,
      template: 'MODERN',
    } as never)
    const result = await canChangeTemplate('r1', 'u1', 'CREATIVE')
    expect(result.allowed).toBe(true)
    expect(result.requiresPayment).toBe(false)
  })

  it('should block unpaid resume from changing to premium template', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: false,
      template: 'MODERN',
    } as never)
    const result = await canChangeTemplate('r1', 'u1', 'CLASSIC')
    expect(result.allowed).toBe(false)
    expect(result.requiresPayment).toBe(true)
  })

  it('should allow unpaid resume to change to MODERN', async () => {
    mockFindFirst.mockResolvedValue({
      isPaid: false,
      template: 'CLASSIC',
    } as never)
    const result = await canChangeTemplate('r1', 'u1', 'MODERN')
    expect(result.allowed).toBe(true)
    expect(result.requiresPayment).toBe(false)
  })
})
