import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

export interface ChangelogEntry {
  slug: string
  title: string
  version: string
  date: string
  content: string
}

const CHANGELOG_DIR = path.join(process.cwd(), 'content/changelog')

export function getChangelogEntries(): ChangelogEntry[] {
  if (!fs.existsSync(CHANGELOG_DIR)) return []

  const files = fs.readdirSync(CHANGELOG_DIR)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse() // Plus récent en premier

  return files.map(filename => {
    const filePath = path.join(CHANGELOG_DIR, filename)
    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data, content } = matter(raw)

    return {
      slug: data.slug ?? filename.replace('.md', ''),
      title: data.title ?? '',
      version: data.version ?? '',
      date: data.date ?? '',
      content,
    }
  })
}

export function getLatestChangelogSlug(): string | null {
  const entries = getChangelogEntries()
  return entries[0]?.slug ?? null
}
