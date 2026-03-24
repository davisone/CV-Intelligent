import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'
import { getLatestChangelogSlug } from '@/lib/changelog'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const latestSlug = getLatestChangelogSlug()
  if (!latestSlug) {
    return NextResponse.json({ success: true })
  }

  await prisma.user.update({
    where: { id: session.user.id },
    data: { lastSeenChangelogSlug: latestSlug },
  })

  return NextResponse.json({ success: true })
}
