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

export function getChangelogEntries(locale = 'fr'): ChangelogEntry[] {
  const localeDir = path.join(CHANGELOG_DIR, locale)
  const fallbackDir = path.join(CHANGELOG_DIR, 'fr')
  const dir = fs.existsSync(localeDir) ? localeDir : fallbackDir

  if (!fs.existsSync(dir)) return []

  const files = fs.readdirSync(dir)
    .filter(f => f.endsWith('.md'))
    .sort()
    .reverse()

  return files.map(filename => {
    const filePath = path.join(dir, filename)
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
  const entries = getChangelogEntries('fr')
  return entries[0]?.slug ?? null
}
