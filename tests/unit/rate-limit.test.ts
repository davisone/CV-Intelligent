import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { checkRateLimit } from '@/lib/rate-limit/index'

describe('checkRateLimit', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const config = { maxRequests: 3, windowMs: 60000 }

  it('should allow the first request', () => {
    const result = checkRateLimit('test-first', config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('should decrement remaining on successive calls', () => {
    const id = 'test-decrement'
    checkRateLimit(id, config)
    const result = checkRateLimit(id, config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(1)
  })

  it('should block when limit is exceeded', () => {
    const id = 'test-exceed'
    checkRateLimit(id, config)
    checkRateLimit(id, config)
    checkRateLimit(id, config)
    const result = checkRateLimit(id, config)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('should reset after window expires', () => {
    const id = 'test-reset'
    checkRateLimit(id, config)
    checkRateLimit(id, config)
    checkRateLimit(id, config)

    // Advance past the window
    vi.advanceTimersByTime(60001)

    const result = checkRateLimit(id, config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('should track identifiers independently', () => {
    checkRateLimit('user-a', config)
    checkRateLimit('user-a', config)
    checkRateLimit('user-a', config)

    const resultA = checkRateLimit('user-a', config)
    const resultB = checkRateLimit('user-b', config)

    expect(resultA.success).toBe(false)
    expect(resultB.success).toBe(true)
    expect(resultB.remaining).toBe(2)
  })
})
