import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo/metadata'
import { getPostsByCategory } from '@/lib/blog'
import { BlogGrid } from '@/components/blog/blog-grid'
import { Footer } from '@/components/layout/footer'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { Link } from '@/i18n/navigation'
import { ArrowLeft } from 'lucide-react'

const CATEGORIES = ['conseils-cv', 'par-metier', 'templates', 'guides'] as const

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}): Promise<Metadata> {
  const { locale, category } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const label = t(`categories.${category}`)
  return {
    title: t('categoryListingTitle', { category: label }),
    description: t('categoryListingDescription', { category: label }),
    alternates: buildAlternates(`/blog/category/${category}`, locale),
  }
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; category: string }>
}) {
  const { locale, category } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = getPostsByCategory(category, locale)
  const label = t(`categories.${category}`)

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <header className="border-b border-[#E0D6C8] bg-[#FBF8F4]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-[#722F37]">
            CV Builder
          </Link>
          <nav className="flex items-center gap-4">
            <LocaleSwitcher />
          </nav>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-[#722F37] font-medium hover:underline mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('backToBlog')}
          </Link>
          <h1 className="text-4xl font-bold text-[#1F1A17] mb-3">
            {t('categoryListingTitle', { category: label })}
          </h1>
          <p className="text-[#6B6560] mb-8 max-w-2xl">
            {t('categoryListingDescription', { category: label })}
          </p>
          <BlogGrid
            posts={posts}
            locale={locale}
            tMinRead={t('minRead')}
            tReadMore={t('readMore')}
          />
        </div>
      </main>

      <Footer />
    </div>
  )
}
