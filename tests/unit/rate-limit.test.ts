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

  it('should allow the first request', async () => {
    const result = await checkRateLimit('test-first', config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('should decrement remaining on successive calls', async () => {
    const id = 'test-decrement'
    await checkRateLimit(id, config)
    const result = await checkRateLimit(id, config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(1)
  })

  it('should block when limit is exceeded', async () => {
    const id = 'test-exceed'
    await checkRateLimit(id, config)
    await checkRateLimit(id, config)
    await checkRateLimit(id, config)
    const result = await checkRateLimit(id, config)
    expect(result.success).toBe(false)
    expect(result.remaining).toBe(0)
  })

  it('should reset after window expires', async () => {
    const id = 'test-reset'
    await checkRateLimit(id, config)
    await checkRateLimit(id, config)
    await checkRateLimit(id, config)

    // Advance past the window
    vi.advanceTimersByTime(60001)

    const result = await checkRateLimit(id, config)
    expect(result.success).toBe(true)
    expect(result.remaining).toBe(2)
  })

  it('should track identifiers independently', async () => {
    await checkRateLimit('user-a', config)
    await checkRateLimit('user-a', config)
    await checkRateLimit('user-a', config)

    const resultA = await checkRateLimit('user-a', config)
    const resultB = await checkRateLimit('user-b', config)

    expect(resultA.success).toBe(false)
    expect(resultB.success).toBe(true)
    expect(resultB.remaining).toBe(2)
  })
})
