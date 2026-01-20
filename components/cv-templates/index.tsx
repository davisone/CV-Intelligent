export { ModernTemplate } from './modern-template'
export { ClassicTemplate } from './classic-template'
export { ATSTemplate } from './ats-template'
export { MinimalTemplate } from './minimal-template'
export { CreativeTemplate } from './creative-template'

import { ModernTemplate } from './modern-template'
import { ClassicTemplate } from './classic-template'
import { ATSTemplate } from './ats-template'
import { MinimalTemplate } from './minimal-template'
import { CreativeTemplate } from './creative-template'

export const templates = {
  MODERN: ModernTemplate,
  CLASSIC: ClassicTemplate,
  ATS: ATSTemplate,
  MINIMAL: MinimalTemplate,
  CREATIVE: CreativeTemplate,
} as const

export type TemplateType = keyof typeof templates
