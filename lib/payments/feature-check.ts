import { prisma } from '@/lib/db/prisma'
import { FREE_TEMPLATE, isPremiumTemplate } from '@/lib/config/pricing'
import type { TemplateType } from '@prisma/client'

interface FeatureCheckResult {
  canAccess: boolean
  reason?: 'free_cv' | 'paid_cv' | 'payment_required'
  requiresPayment: boolean
}

/**
 * Vérifie si un utilisateur peut accéder aux features premium d'un CV
 */
export async function checkResumeAccess(
  resumeId: string,
  userId: string
): Promise<FeatureCheckResult> {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
    select: { isPaid: true, paymentStatus: true, template: true, createdAt: true },
  })

  if (!resume) {
    return { canAccess: false, requiresPayment: false }
  }

  // CV payé = accès complet
  if (resume.isPaid) {
    return { canAccess: true, reason: 'paid_cv', requiresPayment: false }
  }

  // Le template MODERN est toujours gratuit (illimité)
  if (resume.template === FREE_TEMPLATE) {
    return { canAccess: true, reason: 'free_cv', requiresPayment: false }
  }

  // Les autres templates nécessitent un paiement
  return { canAccess: false, reason: 'payment_required', requiresPayment: true }
}

/**
 * Vérifie si un utilisateur peut utiliser les features IA sur un CV
 * Seuls les CV payés ont accès aux fonctionnalités IA et ATS
 */
export async function canUseAIFeatures(
  resumeId: string,
  userId: string
): Promise<{ allowed: boolean; reason?: string }> {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
    select: { isPaid: true, template: true },
  })

  if (!resume) {
    return { allowed: false, reason: 'CV introuvable' }
  }

  // Seuls les CV payés ont accès aux fonctionnalités IA
  if (resume.isPaid) {
    return { allowed: true }
  }

  // CV gratuit (MODERN non payé) = pas d'accès IA/ATS
  if (resume.template === FREE_TEMPLATE) {
    return {
      allowed: false,
      reason: 'Les fonctionnalités IA et ATS sont réservées aux CV premium. Débloquez ce CV pour 4,99 €.',
    }
  }

  // Autres templates non payés
  return {
    allowed: false,
    reason: 'Les fonctionnalités IA nécessitent un CV premium. Débloquez ce CV pour 4,99 €.',
  }
}

/**
 * Vérifie si un utilisateur peut créer un nouveau CV avec un template donné
 */
export async function canCreateResume(
  userId: string,
  template: TemplateType
): Promise<{ allowed: boolean; requiresPayment: boolean; reason?: string }> {
  // Le template MODERN est toujours gratuit (illimité)
  if (template === FREE_TEMPLATE) {
    return { allowed: true, requiresPayment: false }
  }

  // Les templates premium nécessitent toujours un paiement
  return {
    allowed: false,
    requiresPayment: true,
    reason: `Le template ${template} est premium. Débloquez ce CV pour 4,99 €.`,
  }
}

/**
 * Vérifie si un utilisateur peut changer le template d'un CV
 */
export async function canChangeTemplate(
  resumeId: string,
  userId: string,
  newTemplate: TemplateType
): Promise<{ allowed: boolean; requiresPayment: boolean; reason?: string }> {
  const resume = await prisma.resume.findFirst({
    where: { id: resumeId, userId },
    select: { isPaid: true, template: true },
  })

  if (!resume) {
    return { allowed: false, requiresPayment: false, reason: 'CV introuvable' }
  }

  // CV payé = peut changer vers n'importe quel template
  if (resume.isPaid) {
    return { allowed: true, requiresPayment: false }
  }

  // CV non payé vers template premium = paiement requis
  if (isPremiumTemplate(newTemplate)) {
    return {
      allowed: false,
      requiresPayment: true,
      reason: `Le template ${newTemplate} est premium. Débloquez ce CV pour 4,99 €.`,
    }
  }

  // CV non payé vers MODERN = OK (c'est le template gratuit)
  return { allowed: true, requiresPayment: false }
}
