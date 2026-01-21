type RateLimitStore = Map<string, { count: number; resetTime: number }>

const store: RateLimitStore = new Map()

// Nettoyage périodique des entrées expirées (toutes les 5 minutes)
setInterval(() => {
  const now = Date.now()
  for (const [key, value] of store.entries()) {
    if (now > value.resetTime) {
      store.delete(key)
    }
  }
}, 5 * 60 * 1000)

interface RateLimitConfig {
  maxRequests: number  // Nombre max de requêtes
  windowMs: number     // Fenêtre de temps en ms
}

interface RateLimitResult {
  success: boolean
  remaining: number
  resetIn: number  // Temps avant reset en secondes
}

export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig
): RateLimitResult {
  const now = Date.now()
  const key = identifier
  const record = store.get(key)

  // Si pas d'enregistrement ou fenêtre expirée, créer nouveau
  if (!record || now > record.resetTime) {
    store.set(key, {
      count: 1,
      resetTime: now + config.windowMs,
    })
    return {
      success: true,
      remaining: config.maxRequests - 1,
      resetIn: Math.ceil(config.windowMs / 1000),
    }
  }

  // Vérifier si limite atteinte
  if (record.count >= config.maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  // Incrémenter le compteur
  record.count++
  store.set(key, record)

  return {
    success: true,
    remaining: config.maxRequests - record.count,
    resetIn: Math.ceil((record.resetTime - now) / 1000),
  }
}

// Configurations prédéfinies pour les endpoints IA
export const AI_RATE_LIMITS = {
  suggest: {
    maxRequests: 10,   // 10 requêtes
    windowMs: 60000,   // par minute
  },
  atsScore: {
    maxRequests: 5,    // 5 requêtes
    windowMs: 60000,   // par minute
  },
} as const
