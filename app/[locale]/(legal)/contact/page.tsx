'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, Send } from 'lucide-react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select } from '@/components/ui/select'
import { CONTACT_SUBJECTS } from '@/lib/validations/contact.schema'

export default function ContactPage() {
  // Note : export default requis par Next.js App Router pour les page.tsx
  const [isLoading, setIsLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error(data.error || 'Une erreur est survenue')
        return
      }

      toast.success('Message envoyé ! Nous vous répondrons sous 48h.')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      toast.error('Une erreur est survenue. Réessayez dans un moment.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#FBF8F4]">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B6560] hover:text-[#1F1A17] mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Retour à l&apos;accueil
        </Link>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-[#1F1A17] mb-3">Contactez-nous</h1>
          <p className="text-[#6B6560]">
            Une question, un problème ou une suggestion ? Nous vous répondons sous 48 heures ouvrées.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                placeholder="Jean Dupont"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="jean@exemple.fr"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Select
              id="subject"
              value={form.subject}
              onChange={(e) => setForm({ ...form, subject: e.target.value })}
              required
              disabled={isLoading}
            >
              <option value="" disabled>Sélectionnez un sujet</option>
              {CONTACT_SUBJECTS.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <textarea
              id="message"
              rows={6}
              placeholder="Décrivez votre demande en détail..."
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              disabled={isLoading}
              className="flex w-full rounded-lg border border-[#E0D6C8] bg-[#FBF8F4] px-3 py-2 text-sm text-[#1F1A17] placeholder:text-[#8A7F72] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#722F37] focus-visible:border-[#722F37] disabled:cursor-not-allowed disabled:opacity-50 transition-colors duration-200 resize-none"
            />
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#722F37] hover:bg-[#8B3A44] text-white font-semibold h-11 rounded-xl transition-colors"
          >
            {isLoading ? (
              'Envoi en cours...'
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                Envoyer le message
              </span>
            )}
          </Button>
        </form>
      </div>
    </div>
  )
}
