import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'

interface RateLimitConfig {
  maxRequests: number
  windowMs: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetIn: number
}

function msToWindow(windowMs: number): `${number} ${'ms' | 's' | 'm' | 'h' | 'd'}` {
  if (windowMs < 1000) return `${windowMs} ms`
  if (windowMs < 60000) return `${Math.ceil(windowMs / 1000)} s`
  if (windowMs < 3600000) return `${Math.ceil(windowMs / 60000)} m`
  return `${Math.ceil(windowMs / 3600000)} h`
}

let redis: Redis | null = null
const rateLimiters = new Map<string, Ratelimit>()

// Fallback in-memory pour les environnements sans Redis (tests, dev local)
interface MemoryEntry {
  count: number
  resetAt: number
}
const memoryStore = new Map<string, MemoryEntry>()

function getRedis(): Redis | null {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
    return null
  }
  if (!redis) {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  }
  return redis
}

function getRateLimiter(maxRequests: number, windowMs: number): Ratelimit | null {
  const client = getRedis()
  if (!client) return null

  const key = `${maxRequests}:${windowMs}`
  if (!rateLimiters.has(key)) {
    rateLimiters.set(key, new Ratelimit({
      redis: client,
      limiter: Ratelimit.slidingWindow(maxRequests, msToWindow(windowMs)),
    }))
  }
  return rateLimiters.get(key)!
}

export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): Promise<RateLimitResult> {
  const limiter = getRateLimiter(config.maxRequests, config.windowMs)

  // Fallback in-memory si Redis non configuré
  if (!limiter) {
    const now = Date.now()
    const key = `${identifier}:${config.maxRequests}:${config.windowMs}`
    const entry = memoryStore.get(key)

    if (!entry || now >= entry.resetAt) {
      memoryStore.set(key, { count: 1, resetAt: now + config.windowMs })
      return { success: true, remaining: config.maxRequests - 1, resetIn: Math.ceil(config.windowMs / 1000) }
    }

    if (entry.count >= config.maxRequests) {
      return { success: false, remaining: 0, resetIn: Math.ceil((entry.resetAt - now) / 1000) }
    }

    entry.count++
    return { success: true, remaining: config.maxRequests - entry.count, resetIn: Math.ceil((entry.resetAt - now) / 1000) }
  }

  const { success, remaining, reset } = await limiter.limit(identifier)

  return {
    success,
    remaining,
    resetIn: Math.ceil((reset - Date.now()) / 1000),
  }
}

export const AI_RATE_LIMITS = {
  suggest: { maxRequests: 10, windowMs: 60000 },
  atsScore: { maxRequests: 5, windowMs: 60000 },
} as const

export const AUTH_RATE_LIMITS = {
  signup: { maxRequests: 5, windowMs: 3600000 },
  forgotPassword: { maxRequests: 3, windowMs: 900000 },
  resetPassword: { maxRequests: 5, windowMs: 3600000 },
  twoFactorCheck: { maxRequests: 10, windowMs: 60000 },
  twoFactorVerify: { maxRequests: 5, windowMs: 300000 },
  resendVerification: { maxRequests: 3, windowMs: 900000 },
} as const

export const PAYMENT_RATE_LIMITS = {
  checkout: { maxRequests: 10, windowMs: 3600000 },
} as const

export const CONTACT_RATE_LIMITS = {
  submit: { maxRequests: 5, windowMs: 10 * 60 * 1000 }, // 5 req / 10 min
} as const
