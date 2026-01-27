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

  // Vérifier si c'est le premier CV MODERN de l'utilisateur (le CV gratuit)
  // On cherche le premier CV MODERN créé par l'utilisateur
  const firstModernCV = await prisma.resume.findFirst({
    where: {
      userId,
      template: FREE_TEMPLATE,
    },
    orderBy: { createdAt: 'asc' },
    select: { id: true },
  })

  // Si ce CV est le premier CV MODERN de l'utilisateur, il est gratuit
  if (resume.template === FREE_TEMPLATE && firstModernCV?.id === resumeId) {
    return { canAccess: true, reason: 'free_cv', requiresPayment: false }
  }

  // Sinon, paiement requis
  return { canAccess: false, reason: 'payment_required', requiresPayment: true }
}

/**
 * Vérifie si un utilisateur peut utiliser les features IA sur un CV
 */
export async function canUseAIFeatures(
  resumeId: string,
  userId: string
): Promise<{ allowed: boolean; reason?: string }> {
  const access = await checkResumeAccess(resumeId, userId)

  if (access.canAccess) {
    return { allowed: true }
  }

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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { freeCVUsed: true },
  })

  // Premier CV = gratuit si template MODERN
  if (!user?.freeCVUsed) {
    if (template === FREE_TEMPLATE) {
      return { allowed: true, requiresPayment: false }
    }
    // Template premium sur premier CV = paiement requis
    return {
      allowed: false,
      requiresPayment: true,
      reason: `Le template ${template} est premium. Utilisez le template MODERN gratuitement ou payez 4,99 €.`,
    }
  }

  // freeCVUsed = true → tous les nouveaux CV nécessitent paiement
  if (isPremiumTemplate(template)) {
    return {
      allowed: false,
      requiresPayment: true,
      reason: 'Vous avez déjà utilisé votre CV gratuit. Débloquez ce CV pour 4,99 €.',
    }
  }

  // Même MODERN nécessite paiement après le premier CV
  return {
    allowed: false,
    requiresPayment: true,
    reason: 'Vous avez déjà utilisé votre CV gratuit. Débloquez ce CV pour 4,99 €.',
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
