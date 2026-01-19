import type {
  Resume as PrismaResume,
  PersonalInfo as PrismaPersonalInfo,
  Experience as PrismaExperience,
  Education as PrismaEducation,
  Skill as PrismaSkill,
  Language as PrismaLanguage,
  Project as PrismaProject,
  TemplateType,
  SkillLevel,
  LanguageLevel,
} from '@prisma/client'

// Re-export Prisma enums
export { TemplateType, SkillLevel, LanguageLevel }

// Full Resume with all relations
export interface ResumeWithRelations extends PrismaResume {
  personalInfo: PrismaPersonalInfo | null
  experiences: PrismaExperience[]
  educations: PrismaEducation[]
  skills: PrismaSkill[]
  languages: PrismaLanguage[]
  projects: PrismaProject[]
}

// Input types for forms
export interface PersonalInfoInput {
  firstName: string
  lastName: string
  email: string
  phone?: string
  address?: string
  city?: string
  country?: string
  zipCode?: string
  linkedin?: string
  github?: string
  website?: string
  summary?: string
}

export interface ExperienceInput {
  id?: string
  company: string
  position: string
  location?: string
  startDate: Date | string
  endDate?: Date | string | null
  current: boolean
  description?: string
  order?: number
}

export interface EducationInput {
  id?: string
  institution: string
  degree: string
  field?: string
  location?: string
  startDate: Date | string
  endDate?: Date | string | null
  current: boolean
  description?: string
  gpa?: string
  order?: number
}

export interface SkillInput {
  id?: string
  name: string
  level: SkillLevel
  category?: string
  order?: number
}

export interface LanguageInput {
  id?: string
  name: string
  level: LanguageLevel
  order?: number
}

export interface ProjectInput {
  id?: string
  name: string
  description?: string
  url?: string
  technologies: string[]
  order?: number
}

export interface ResumeInput {
  title: string
  template: TemplateType
  personalInfo?: PersonalInfoInput
  experiences?: ExperienceInput[]
  educations?: EducationInput[]
  skills?: SkillInput[]
  languages?: LanguageInput[]
  projects?: ProjectInput[]
}

// API Response types
export interface ResumeListItem {
  id: string
  title: string
  template: TemplateType
  updatedAt: Date
  isPublic: boolean
}