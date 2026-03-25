import { getChangelogEntries } from '@/lib/changelog'
import { ChangelogFeed } from './changelog-feed'

export const dynamic = 'force-dynamic'

export default async function WhatsNewPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const entries = getChangelogEntries(locale)
  return <ChangelogFeed entries={entries} />
}
