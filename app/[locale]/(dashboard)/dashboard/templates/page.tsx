'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { PriceBadge } from '@/components/payments/price-badge'
import { CheckoutModal } from '@/components/payments/checkout-modal'
import { FREE_TEMPLATE, PRICING } from '@/lib/config/pricing'
import {
  Palette,
  ClipboardList,
  FileCheck,
  Sparkles,
  Rocket,
} from '@/components/ui/icons'
import { LucideIcon } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  color: string
  icon: LucideIcon
  features: string[]
  isFree?: boolean
}

const TEMPLATE_CONFIGS = [
  {
    id: 'MODERN',
    name: 'Modern',
    color: 'from-blue-500 to-purple-600',
    icon: Palette,
    isFree: true,
  },
  {
    id: 'CLASSIC',
    name: 'Classic',
    color: 'from-gray-600 to-gray-800',
    icon: ClipboardList,
  },
  {
    id: 'ATS',
    name: 'ATS-Friendly',
    color: 'from-green-500 to-teal-600',
    icon: FileCheck,
  },
  {
    id: 'MINIMAL',
    name: 'Minimal',
    color: 'from-slate-400 to-slate-600',
    icon: Sparkles,
  },
  {
    id: 'CREATIVE',
    name: 'Creative',
    color: 'from-pink-500 to-orange-500',
    icon: Rocket,
  },
]

export default function TemplatesPage() {
  const router = useRouter()
  const t = useTranslations('dashboard.templates')
  const tCommon = useTranslations('common')

  // Construction des templates avec les traductions
  const templates: Template[] = TEMPLATE_CONFIGS.map((config) => {
    const key = config.id.toLowerCase() as 'modern' | 'classic' | 'ats' | 'minimal' | 'creative'
    return {
      ...config,
      description: t(`${key}.description`),
      features: [t(`${key}.tag1`), t(`${key}.tag2`), t(`${key}.tag3`)],
    }
  })

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [showCheckoutModal, setShowCheckoutModal] = useState(false)
  const [pendingResumeId, setPendingResumeId] = useState<string | null>(null)
  const [pendingResumeTitle, setPendingResumeTitle] = useState('')
  const [title, setTitle] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSelectTemplate = (templateId: string) => {
    setSelectedTemplate(templateId)
    setShowModal(true)
  }

  const handleCreateCV = async () => {
    if (!title.trim()) {
      toast.error(t('titleRequired'))
      return
    }

    setIsLoading(true)
    try {
      const res = await fetch('/api/resumes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          template: selectedTemplate,
        }),
      })

      const data = await res.json()

      if (res.ok) {
        // Vérifier si paiement requis
        if (data.requiresPayment) {
          setPendingResumeId(data.data.id)
          setPendingResumeTitle(title.trim())
          setShowModal(false)
          setShowCheckoutModal(true)
          setTitle('')
          return
        }

        router.push(`/dashboard/resumes/${data.data.id}/edit`)
      } else {
        toast.error(data.error || t('serverError'))
      }
    } catch {
      toast.error(t('serverError'))
    } finally {
      setIsLoading(false)
    }
  }

  // Détermine si un template nécessite un paiement
  const templateRequiresPayment = (templateId: string): boolean => {
    // Le template MODERN est toujours gratuit
    if (templateId === FREE_TEMPLATE) {
      return false
    }
    // Les autres templates sont toujours payants
    return true
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#1F1A17]">{t('title')}</h1>
        <p className="text-[#6B6560] mt-1">
          {t('chooseCv')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => {
          const Icon = template.icon
          return (
            <div
              key={template.id}
              className="bg-[#FBF8F4] rounded-xl border border-[#E0D6C8] overflow-hidden hover:shadow-lg hover:border-[#722F37]/30 transition-all"
            >
              {/* Preview Header */}
              <div className={`h-32 bg-gradient-to-br ${template.color} flex items-center justify-center`}>
                <Icon className="w-12 h-12 text-white" />
              </div>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold text-[#1F1A17]">
                    {template.name}
                  </h3>
                  {template.isFree ? (
                    <PriceBadge variant="free" />
                  ) : (
                    <PriceBadge variant="pro" />
                  )}
                </div>
                <p className="text-[#6B6560] text-sm mb-4">
                  {template.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs bg-[#E8E0D5] text-[#4A4440] px-2 py-1 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                <Button
                  className="w-full"
                  onClick={() => handleSelectTemplate(template.id)}
                >
                  {t('use')}
                </Button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Modal de création */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#FBF8F4] rounded-xl p-6 w-full max-w-md mx-4">
            <h2 className="text-xl font-semibold text-[#1F1A17] mb-2">
              {t('createWithTemplate', { template: templates.find(tmpl => tmpl.id === selectedTemplate)?.name ?? '' })}
            </h2>

            {/* Info prix */}
            {selectedTemplate && templateRequiresPayment(selectedTemplate) && (
              <p className="text-sm text-amber-600 mb-4">
                {t('paidInfo', { price: PRICING.displayPrice })}
              </p>
            )}

            <div className="mb-4">
              <label className="block text-sm text-[#4A4440] mb-1">
                {t('titleLabel')}
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex: CV Développeur 2024"
                autoFocus
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  setShowModal(false)
                  setTitle('')
                }}
                disabled={isLoading}
              >
                {tCommon('cancel')}
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateCV}
                isLoading={isLoading}
              >
                {t('createCv')}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de paiement */}
      {pendingResumeId && (
        <CheckoutModal
          open={showCheckoutModal}
          onOpenChange={(open) => {
            setShowCheckoutModal(open)
            if (!open) {
              // Rediriger vers l'éditeur même si pas payé
              router.push(`/dashboard/resumes/${pendingResumeId}/edit`)
            }
          }}
          resumeId={pendingResumeId}
          resumeTitle={pendingResumeTitle}
        />
      )}
    </div>
  )
}
