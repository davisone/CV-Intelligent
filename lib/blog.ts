import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const DEFAULT_CONTENT_DIR = path.join(process.cwd(), 'content/blog')
const FALLBACK_IMAGE = '/og-image.png'
const LOCALES = ['fr', 'en'] as const

export interface BlogPost {
  slug: string
  locale: string
  title: string
  description: string
  date: string
  author: string
  category: string
  tags: string[]
  image: string
  readingTime: number
  availableLocales: string[]
}

export interface BlogPostWithSource {
  frontmatter: BlogPost
  source: string
}

function estimateReadingTime(content: string): number {
  const wordCount = content.split(/\s+/).length
  return Math.max(1, Math.ceil(wordCount / 200))
}

function parsePost(
  slug: string,
  locale: string,
  raw: string,
  contentDir: string
): BlogPost {
  const { data, content } = matter(raw)
  const availableLocales = LOCALES.filter((loc) =>
    fs.existsSync(path.join(contentDir, slug, `${loc}.mdx`))
  )
  return {
    slug,
    locale,
    title: data.title ?? '',
    description: data.description ?? '',
    date: data.date ?? '',
    author: data.author ?? 'Evan Davison',
    category: data.category ?? '',
    tags: Array.isArray(data.tags) ? data.tags : [],
    image: data.image ?? FALLBACK_IMAGE,
    readingTime: data.readingTime ?? estimateReadingTime(content),
    availableLocales,
  }
}

export function getAllPosts(
  locale: string,
  contentDir = DEFAULT_CONTENT_DIR
): BlogPost[] {
  if (!fs.existsSync(contentDir)) return []
  const slugDirs = fs.readdirSync(contentDir)
  const posts: BlogPost[] = []

  for (const slug of slugDirs) {
    const filePath = path.join(contentDir, slug, `${locale}.mdx`)
    if (!fs.existsSync(filePath)) continue
    const raw = fs.readFileSync(filePath, 'utf-8')
    posts.push(parsePost(slug, locale, raw, contentDir))
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )
}

export function getPostBySlug(
  slug: string,
  locale: string,
  contentDir = DEFAULT_CONTENT_DIR
): BlogPostWithSource | null {
  const filePath = path.join(contentDir, slug, `${locale}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const raw = fs.readFileSync(filePath, 'utf-8')
  const { content } = matter(raw)
  return {
    frontmatter: parsePost(slug, locale, raw, contentDir),
    source: content,
  }
}

export function getPostsByCategory(
  category: string,
  locale: string,
  contentDir = DEFAULT_CONTENT_DIR
): BlogPost[] {
  return getAllPosts(locale, contentDir).filter(
    (post) => post.category === category
  )
}

export function getAllSlugs(
  contentDir = DEFAULT_CONTENT_DIR
): { slug: string }[] {
  if (!fs.existsSync(contentDir)) return []
  return fs.readdirSync(contentDir).map((slug) => ({ slug }))
}

export function buildBlogAlternates(
  slug: string,
  availableLocales: string[]
) {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'
  const urlPath = `/blog/${slug}`
  return {
    canonical: `${baseUrl}/${availableLocales[0]}${urlPath}`,
    languages: Object.fromEntries(
      availableLocales.map((loc) => [loc, `${baseUrl}/${loc}${urlPath}`])
    ) as Record<string, string>,
  }
}
