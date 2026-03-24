import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth/options'
import { prisma } from '@/lib/db/prisma'

export async function POST() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const version = process.env.NEXT_PUBLIC_APP_VERSION ?? '1.4.0'

  await prisma.user.update({
    where: { id: session.user.id },
    data: { lastSeenUpdateVersion: version },
  })

  return NextResponse.json({ success: true })
}
