import { getChangelogEntries } from '@/lib/changelog'
import { ChangelogFeed } from './changelog-feed'

export const dynamic = 'force-dynamic'

export default async function WhatsNewPage() {
  const entries = getChangelogEntries()
  return <ChangelogFeed entries={entries} />
}
