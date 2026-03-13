import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { buildAlternates } from '@/lib/seo/metadata'
import { getAllPosts } from '@/lib/blog'
import { BlogGrid } from '@/components/blog/blog-grid'
import { CategoryFilter } from '@/components/blog/category-filter'
import { Footer } from '@/components/layout/footer'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { Link } from '@/i18n/navigation'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  return {
    title: t('listingTitle'),
    description: t('listingDescription'),
    alternates: buildAlternates('/blog', locale),
  }
}

const CATEGORIES = ['conseils-cv', 'par-metier', 'templates', 'guides'] as const

export default async function BlogListingPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ category?: string }>
}) {
  const { locale } = await params
  const { category } = await searchParams
  const t = await getTranslations({ locale, namespace: 'blog' })
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const allPosts = getAllPosts(locale)
  const filtered = category
    ? allPosts.filter((p) => p.category === category)
    : allPosts

  const categories = CATEGORIES.map((slug) => ({
    slug,
    label: t(`categories.${slug}`),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <BreadcrumbJsonLd
        items={[
          { name: 'CV Builder', url: baseUrl },
          { name: t('listingTitle'), url: `${baseUrl}/${locale}/blog` },
        ]}
      />

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
          <h1 className="text-4xl font-bold text-[#1F1A17] mb-3">
            {t('listingTitle')}
          </h1>
          <p className="text-[#6B6560] mb-8 max-w-2xl">
            {t('listingDescription')}
          </p>

          <CategoryFilter categories={categories} tAll={t('allCategories')} />

          <BlogGrid
            posts={filtered}
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
