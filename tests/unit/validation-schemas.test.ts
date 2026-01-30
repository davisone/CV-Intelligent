import { describe, it, expect } from 'vitest'
import {
  personalInfoSchema,
  experienceSchema,
  signUpSchema,
  createResumeSchema,
} from '@/lib/validations/resume.schema'

describe('personalInfoSchema', () => {
  it('should accept valid data', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
    }
    const result = personalInfoSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should reject missing firstName', () => {
    const data = {
      lastName: 'Doe',
      email: 'john@example.com',
    }
    const result = personalInfoSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should reject invalid email', () => {
    const data = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'not-an-email',
    }
    const result = personalInfoSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe('experienceSchema', () => {
  it('should accept valid data', () => {
    const data = {
      company: 'Acme Corp',
      position: 'Developer',
      startDate: '2024-01-01',
    }
    const result = experienceSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should reject missing company', () => {
    const data = {
      position: 'Developer',
      startDate: '2024-01-01',
    }
    const result = experienceSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe('signUpSchema', () => {
  it('should accept valid data', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Password1',
    }
    const result = signUpSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should reject password without uppercase', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'password1',
    }
    const result = signUpSchema.safeParse(data)
    expect(result.success).toBe(false)
  })

  it('should reject password too short', () => {
    const data = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'Pa1',
    }
    const result = signUpSchema.safeParse(data)
    expect(result.success).toBe(false)
  })
})

describe('createResumeSchema', () => {
  it('should accept valid data', () => {
    const data = { title: 'My Resume', template: 'CLASSIC' }
    const result = createResumeSchema.safeParse(data)
    expect(result.success).toBe(true)
  })

  it('should default template to MODERN', () => {
    const data = { title: 'My Resume' }
    const result = createResumeSchema.safeParse(data)
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.template).toBe('MODERN')
    }
  })
})
