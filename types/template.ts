import type { TemplateType } from '@prisma/client'

export interface TemplateConfig {
  id: TemplateType
  name: string
  description: string
  preview: string
  features: string[]
  isPremium: boolean
}

export interface TemplateStyles {
  primaryColor: string
  secondaryColor: string
  fontFamily: string
  fontSize: {
    name: number
    title: number
    heading: number
    body: number
    small: number
  }
  spacing: {
    section: number
    item: number
    line: number
  }
}

export const TEMPLATE_CONFIGS: Record<TemplateType, TemplateConfig> = {
  MODERN: {
    id: 'MODERN',
    name: 'Modern',
    description: 'Clean and contemporary design with a sidebar layout',
    preview: '/templates/modern-preview.png',
    features: ['Sidebar layout', 'Color accents', 'Icon support'],
    isPremium: false,
  },
  CLASSIC: {
    id: 'CLASSIC',
    name: 'Classic',
    description: 'Traditional professional layout, perfect for corporate roles',
    preview: '/templates/classic-preview.png',
    features: ['Traditional layout', 'Serif fonts', 'Formal style'],
    isPremium: false,
  },
  ATS: {
    id: 'ATS',
    name: 'ATS Optimized',
    description: 'Designed to pass Applicant Tracking Systems',
    preview: '/templates/ats-preview.png',
    features: ['ATS-friendly', 'Simple formatting', 'High readability'],
    isPremium: false,
  },
  MINIMAL: {
    id: 'MINIMAL',
    name: 'Minimal',
    description: 'Elegant simplicity with focus on content',
    preview: '/templates/minimal-preview.png',
    features: ['Whitespace focus', 'Clean lines', 'Modern fonts'],
    isPremium: true,
  },
  CREATIVE: {
    id: 'CREATIVE',
    name: 'Creative',
    description: 'Stand out with a unique creative design',
    preview: '/templates/creative-preview.png',
    features: ['Bold colors', 'Unique layout', 'Visual elements'],
    isPremium: true,
  },
}