import Stripe from 'stripe'

// Ne pas échouer au build si la clé n'est pas définie
// L'erreur sera levée à l'exécution si on essaie d'utiliser Stripe sans clé
const stripeSecretKey = process.env.STRIPE_SECRET_KEY

function getStripe(): Stripe {
  if (!stripeSecretKey) {
    throw new Error('STRIPE_SECRET_KEY is not defined')
  }
  return new Stripe(stripeSecretKey, {
    apiVersion: '2025-12-15.clover',
    typescript: true,
  })
}

// Export lazy-loaded stripe instance
let _stripe: Stripe | null = null

export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    if (!_stripe) {
      _stripe = getStripe()
    }
    return (_stripe as any)[prop]
  },
})
