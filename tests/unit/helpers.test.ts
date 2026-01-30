import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  cn,
  formatDate,
  formatDateRange,
  generateSlug,
  truncate,
  debounce,
  capitalize,
  sleep,
} from '@/lib/utils/helpers'

describe('cn', () => {
  it('should merge class names', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('should resolve Tailwind conflicts', () => {
    expect(cn('px-2', 'px-4')).toBe('px-4')
  })

  it('should handle conditional classes', () => {
    expect(cn('base', false && 'hidden', 'visible')).toBe('base visible')
  })
})

describe('formatDate', () => {
  it('should format a Date object', () => {
    const date = new Date('2024-03-15')
    const result = formatDate(date)
    expect(result).toContain('2024')
    expect(result).toContain('Mar')
  })

  it('should format a date string', () => {
    const result = formatDate('2024-06-01')
    expect(result).toContain('2024')
  })

  it('should accept custom options', () => {
    const result = formatDate('2024-01-15', { month: 'long', year: 'numeric' })
    expect(result).toContain('January')
    expect(result).toContain('2024')
  })
})

describe('formatDateRange', () => {
  it('should return "Present" when current is true', () => {
    const result = formatDateRange('2024-01-01', null, true)
    expect(result).toContain('Present')
  })

  it('should format a range with endDate', () => {
    const result = formatDateRange('2023-01-01', '2024-06-01', false)
    expect(result).toContain('2023')
    expect(result).toContain('2024')
    expect(result).toContain(' - ')
  })

  it('should show only start date when no endDate and not current', () => {
    const result = formatDateRange('2024-01-01', null, false)
    expect(result).toContain('2024')
    expect(result).not.toContain(' - ')
  })
})

describe('generateSlug', () => {
  it('should generate a slug of default length 8', () => {
    const slug = generateSlug()
    expect(slug).toHaveLength(8)
  })

  it('should generate a slug of custom length', () => {
    const slug = generateSlug(12)
    expect(slug).toHaveLength(12)
  })

  it('should contain only lowercase alphanumeric characters', () => {
    const slug = generateSlug(100)
    expect(slug).toMatch(/^[a-z0-9]+$/)
  })
})

describe('truncate', () => {
  it('should return short text unchanged', () => {
    expect(truncate('hello', 10)).toBe('hello')
  })

  it('should truncate long text with ellipsis', () => {
    const result = truncate('This is a very long text', 10)
    expect(result).toHaveLength(10)
    expect(result.endsWith('...')).toBe(true)
  })
})

describe('debounce', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should call the function after the specified delay', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    expect(fn).not.toHaveBeenCalled()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })

  it('should cancel previous calls when called again within delay', () => {
    const fn = vi.fn()
    const debounced = debounce(fn, 100)

    debounced()
    debounced()
    debounced()

    vi.advanceTimersByTime(100)
    expect(fn).toHaveBeenCalledOnce()
  })
})

describe('capitalize', () => {
  it('should capitalize the first letter', () => {
    expect(capitalize('hello')).toBe('Hello')
  })

  it('should lowercase the rest', () => {
    expect(capitalize('hELLO')).toBe('Hello')
  })
})

describe('sleep', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should resolve after the specified delay', async () => {
    const promise = sleep(500)
    let resolved = false
    promise.then(() => { resolved = true })

    expect(resolved).toBe(false)

    vi.advanceTimersByTime(500)
    await promise

    expect(resolved).toBe(true)
  })
})
