import { describe, it, expect } from 'vitest'
import { contactSchema, CONTACT_SUBJECTS } from '@/lib/validations/contact.schema'

describe('contactSchema', () => {
  const valid = {
    name: 'Jean Dupont',
    email: 'jean@example.com',
    subject: 'Question générale',
    message: "Bonjour, j'ai une question sur votre service.",
  }

  it('accepte des données valides', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })

  it('rejette un nom trop court', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'J' }).success).toBe(false)
  })

  it('rejette un nom trop long', () => {
    expect(contactSchema.safeParse({ ...valid, name: 'A'.repeat(101) }).success).toBe(false)
  })

  it('rejette un email invalide', () => {
    expect(contactSchema.safeParse({ ...valid, email: 'pas-un-email' }).success).toBe(false)
  })

  it('rejette un sujet invalide', () => {
    expect(contactSchema.safeParse({ ...valid, subject: 'Sujet inconnu' }).success).toBe(false)
  })

  it('rejette un message trop court', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'Court' }).success).toBe(false)
  })

  it('rejette un message trop long', () => {
    expect(contactSchema.safeParse({ ...valid, message: 'A'.repeat(2001) }).success).toBe(false)
  })

  it("CONTACT_SUBJECTS contient les 4 options attendues", () => {
    expect(CONTACT_SUBJECTS).toContain('Question générale')
    expect(CONTACT_SUBJECTS).toContain('Problème technique')
    expect(CONTACT_SUBJECTS).toContain("Suggestion d'amélioration")
    expect(CONTACT_SUBJECTS).toContain('Autre')
  })
})
