import { z } from 'zod'

// Helper pour les champs URL avec auto-correction du protocole
const urlField = () =>
  z.union([
    z.literal(''),
    z.string()
      .transform((val) => {
        if (!val.startsWith('http://') && !val.startsWith('https://')) {
          return `https://${val}`
        }
        return val
      })
      .pipe(z.string().url('URL invalide (ex: linkedin.com/in/votre-profil)'))
  ]).optional()

// Enums
export const templateTypeSchema = z.enum(['MODERN', 'CLASSIC', 'ATS', 'MINIMAL', 'CREATIVE'])
export const skillLevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'])
export const languageLevelSchema = z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'FLUENT', 'NATIVE'])

// Personal Info (for creation - strict validation)
export const personalInfoSchema = z.object({
  firstName: z.string().min(1, 'First name is required').max(50),
  lastName: z.string().min(1, 'Last name is required').max(50),
  email: z.string().email('Invalid email address'),
  phone: z.string().max(20).optional(),
  address: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  country: z.string().max(50).optional(),
  zipCode: z.string().max(20).optional(),
  linkedin: urlField(),
  linkedinLabel: z.string().max(50).optional(),
  github: urlField(),
  githubLabel: z.string().max(50).optional(),
  portfolio: urlField(),
  portfolioLabel: z.string().max(50).optional(),
  website: urlField(),
  summary: z.string().max(2000).optional(),
  photoUrl: urlField(),
})

// Personal Info (for update - allows empty strings during editing)
export const updatePersonalInfoSchema = z.object({
  firstName: z.string().max(50).default(''),
  lastName: z.string().max(50).default(''),
  email: z.union([z.string().email(), z.literal('')]).default(''),
  phone: z.string().max(20).optional(),
  address: z.string().max(100).optional(),
  city: z.string().max(50).optional(),
  country: z.string().max(50).optional(),
  zipCode: z.string().max(20).optional(),
  linkedin: urlField(),
  linkedinLabel: z.string().max(50).optional(),
  github: urlField(),
  githubLabel: z.string().max(50).optional(),
  portfolio: urlField(),
  portfolioLabel: z.string().max(50).optional(),
  website: urlField(),
  summary: z.string().max(2000).optional(),
  photoUrl: urlField(),
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

// Certification
export const certificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, 'Certification name is required').max(100),
  issuer: z.string().min(1, 'Issuer is required').max(100),
  issueDate: z.coerce.date(),
  expiryDate: z.coerce.date().nullable().optional(),
  credentialId: z.string().max(100).optional(),
  credentialUrl: urlField(),
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
  url: urlField(),
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
  certifications: z.array(certificationSchema).max(20).default([]),
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

// Schema flexible pour les experiences en mise à jour
const updateExperienceSchema = z.object({
  id: z.string().optional(),
  company: z.string().max(100).default(''),
  position: z.string().max(100).default(''),
  location: z.string().max(100).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  current: z.boolean().default(false),
  description: z.string().max(3000).optional(),
  order: z.number().int().min(0).default(0),
})

// Schema flexible pour les educations en mise à jour
const updateEducationSchema = z.object({
  id: z.string().optional(),
  institution: z.string().max(100).default(''),
  degree: z.string().max(100).default(''),
  field: z.string().max(100).optional(),
  location: z.string().max(100).optional(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date().nullable().optional(),
  current: z.boolean().default(false),
  description: z.string().max(2000).optional(),
  gpa: z.string().max(10).optional(),
  order: z.number().int().min(0).default(0),
})

// Schema flexible pour les certifications en mise à jour
const updateCertificationSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(100).default(''),
  issuer: z.string().max(100).default(''),
  issueDate: z.coerce.date(),
  expiryDate: z.coerce.date().nullable().optional(),
  credentialId: z.string().max(100).optional(),
  credentialUrl: urlField(),
  order: z.number().int().min(0).default(0),
})

// Schema flexible pour les skills en mise à jour
const updateSkillSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(50).default(''),
  level: skillLevelSchema.default('INTERMEDIATE'),
  category: z.string().max(50).optional(),
  order: z.number().int().min(0).default(0),
})

// Schema flexible pour les languages en mise à jour
const updateLanguageSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(50).default(''),
  level: languageLevelSchema.default('INTERMEDIATE'),
  order: z.number().int().min(0).default(0),
})

// Schema flexible pour les projects en mise à jour
const updateProjectSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(100).default(''),
  description: z.string().max(2000).optional(),
  url: urlField(),
  technologies: z.array(z.string().max(50)).max(20).default([]),
  order: z.number().int().min(0).default(0),
})

// Schema flexible pour les interests en mise à jour
const updateInterestSchema = z.object({
  id: z.string().optional(),
  name: z.string().max(50).default(''),
  order: z.number().int().min(0).default(0),
})

// Update Resume (uses flexible schemas for editing)
export const updateResumeSchema = z.object({
  title: z.string().max(100).optional(),
  template: templateTypeSchema.optional(),
  personalInfo: updatePersonalInfoSchema.optional(),
  experiences: z.array(updateExperienceSchema).max(20).optional(),
  educations: z.array(updateEducationSchema).max(10).optional(),
  certifications: z.array(updateCertificationSchema).max(20).optional(),
  skills: z.array(updateSkillSchema).max(50).optional(),
  languages: z.array(updateLanguageSchema).max(10).optional(),
  projects: z.array(updateProjectSchema).max(20).optional(),
  interests: z.array(updateInterestSchema).max(20).optional(),
})

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
export type CertificationInput = z.infer<typeof certificationSchema>
export type SkillInput = z.infer<typeof skillSchema>
export type LanguageInput = z.infer<typeof languageSchema>
export type ProjectInput = z.infer<typeof projectSchema>
export type InterestInput = z.infer<typeof interestSchema>
export type ResumeInput = z.infer<typeof resumeSchema>
export type CreateResumeInput = z.infer<typeof createResumeSchema>
export type UpdateResumeInput = z.infer<typeof updateResumeSchema>
export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>