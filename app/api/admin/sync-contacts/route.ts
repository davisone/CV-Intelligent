import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db/prisma'
import { addContact } from '@/lib/email/resend-contacts'

export async function POST(request: Request) {
  const authHeader = request.headers.get('Authorization')
  const adminSecret = process.env.ADMIN_SECRET?.trim()
  if (!adminSecret || authHeader !== `Bearer ${adminSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (!process.env.RESEND_AUDIENCE_FR_ID && !process.env.RESEND_AUDIENCE_EN_ID) {
    return NextResponse.json({ error: 'RESEND_AUDIENCE_FR_ID / RESEND_AUDIENCE_EN_ID non configurés' }, { status: 500 })
  }

  const users = await prisma.user.findMany({
    where: { email: { not: null } },
    select: { email: true, name: true, locale: true },
  })

  let synced = 0
  let failed = 0

  for (const user of users) {
    const ok = await addContact(user.email!, user.name, user.locale)
    if (ok) synced++
    else failed++
  }

  console.log(`[SYNC_CONTACTS] Terminé — synchronisés: ${synced}, échecs: ${failed}`)

  return NextResponse.json({ total: users.length, synced, failed })
}
