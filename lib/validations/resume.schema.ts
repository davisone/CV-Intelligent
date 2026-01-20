import { z } from 'zod'

// Enums
export const templateTypeSchema = z.enum(['MODERN', 'CLASSIC', 'ATS', 'MINIMAL', 'CREATIVE'])
export const skillLevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
export const languageLevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE'])

// Personal Info
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  address: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  country: z.string().max(50).optional(),
  zipCode: z.string().max(20).optional(),
  linkedin: z.string().url().optional().or(z.literal('')),
  github: z.string().url().optional().or(z.literal('')),
  website: z.string().url().optional().or(z.literal('')),
  summary: z.string().max(2000).optional(),
  photoUrl: z.string().url().optional().or(z.literal('')),
})

// Experience
export const experienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().min(1, 'Company name is required').max(100),
  position: z.string().min(1, 'Position is required').max(100),
  location: z.string().max(100).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  current: z.boolean().default(false),
  description: z.string().max(3000).optional(),
  order: z.number().int().min(0).default(0),
})

// Education
export const educationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().min(1, 'Institution name is required').max(100),
  degree: z.string().min(1, 'Degree is required').max(100),
  field: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  current: z.boolean().default(false),
  description: z.string().max(2000).optional(),
  gpa: z.string().max(10).optional(),
  order: z.number().int().min(0).default(0),
})

// Skill
export const skillSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Skill name is required').max(50),
  level: skillLevelSchema.default('INTERMEDIATE'),
  category: z.string().max(50).optional(),
  order: z.number().int().min(0).default(0),
})

// Language
export const languageSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Language name is required').max(50),
  level: languageLevelSchema.default('INTERMEDIATE'),
  order: z.number().int().min(0).default(0),
})

// Project
export const projectSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Project name is required').max(100),
  description: z.string().max(2000).optional(),
  url: z.string().url().optional().or(z.literal('')),
  technologies: z.array(z.string().max(50)).max(20).default([]),
  order: z.number().int().min(0).default(0),
})

// Interest
export const interestSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Interest name is required').max(50),
  order: z.number().int().min(0).default(0),
})

// Full Resume
export const resumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  template: templateTypeSchema.default('MODERN'),
  personalInfo: personalInfoSchema.optional(),
  experiences: z.array(experienceSchema).max(20).default([]),
  educations: z.array(educationSchema).max(10).default([]),
  skills: z.array(skillSchema).max(50).default([]),
  languages: z.array(languageSchema).max(10).default([]),
  projects: z.array(projectSchema).max(20).default([]),
  interests: z.array(interestSchema).max(20).default([]),
})

// Create Resume (minimal)
export const createResumeSchema = z.object({
  title: z.string().min(1, 'Title is required').max(100),
  template: templateTypeSchema.default('MODERN'),
})

// Update Resume
export const updateResumeSchema = resumeSchema.partial()

// Auth schemas
export const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
})

export const signInSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
})

// Type exports
export type PersonalInfoInput = z.infer<typeof personalInfoSchema>
export type ExperienceInput = z.infer<typeof experienceSchema>
export type EducationInput = z.infer<typeof educationSchema>
export type SkillInput = z.infer<typeof skillSchema>
export type LanguageInput = z.infer<typeof languageSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type InterestInput = z.infer<typeof interestSchema>
export type ResumeInput = z.infer<typeof resumeSchema>
export type CreateResumeInput = z.infer<typeof createResumeSchema>
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>