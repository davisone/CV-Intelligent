import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { compileMDX } from 'next-mdx-remote/rsc'
import { getAllPosts, getAllSlugs, getPostBySlug, buildBlogAlternates } from '@/lib/blog'
import { BlogPostLayout } from '@/components/blog/blog-post-layout'
import { RelatedPosts } from '@/components/blog/related-posts'
import { Footer } from '@/components/layout/footer'
import { LocaleSwitcher } from '@/components/ui/locale-switcher'
import { Link } from '@/i18n/navigation'
import { BreadcrumbJsonLd } from '@/components/seo/json-ld'
import { ArrowRight } from 'lucide-react'

const RELATED_PAGES: Record<string, string[]> = {
  'conseils-cv': ['cv-sans-experience', 'exemple-cv', 'comment-faire-un-cv'],
  'par-metier': ['cv-developpeur', 'cv-infirmier', 'cv-commercial', 'cv-ingenieur'],
  'templates': ['modele-cv-gratuit', 'cv-moderne', 'cv-minimaliste', 'cv-design'],
  'guides': ['cv-pdf', 'modele-cv'],
}

export async function generateStaticParams() {
  return getAllSlugs()
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}): Promise<Metadata> {
  const { locale, slug } = await params
  const post = getPostBySlug(slug, locale)
  if (!post) return {}
  const { frontmatter } = post
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'
  return {
    title: frontmatter.title,
    description: frontmatter.description,
    alternates: buildBlogAlternates(slug, frontmatter.availableLocales),
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      publishedTime: frontmatter.date,
      authors: [frontmatter.author],
      images: [{ url: `${baseUrl}${frontmatter.image}`, width: 1200, height: 630 }],
    },
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>
}) {
  const { locale, slug } = await params
  const postData = getPostBySlug(slug, locale)
  if (!postData) notFound()

  const { frontmatter, source } = postData
  const t = await getTranslations({ locale, namespace: 'blog' })
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://resumeforge.fr'

  const { content } = await compileMDX({ source })

  const allPosts = getAllPosts(locale)
  const relatedSlugs = RELATED_PAGES[frontmatter.category] ?? []
  const relatedPageLinks = relatedSlugs.map((s) => ({
    href: `/${s}`,
    label: s.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }))

  return (
    <div className="min-h-screen flex flex-col bg-[#FBF8F4]">
      <BreadcrumbJsonLd
        items={[
          { name: 'CV Builder', url: baseUrl },
          { name: t('listingTitle'), url: `${baseUrl}/${locale}/blog` },
          { name: frontmatter.title, url: `${baseUrl}/${locale}/blog/${slug}` },
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

      <main className="flex-1">
        <BlogPostLayout
          post={frontmatter}
          locale={locale}
          tPublishedOn={t('publishedOn')}
          tBy={t('by')}
          tMinRead={t('minRead')}
          tBackToBlog={t('backToBlog')}
        >
          {content}
        </BlogPostLayout>

        <div className="container mx-auto px-4 max-w-3xl">
          <RelatedPosts
            currentSlug={slug}
            allPosts={allPosts}
            currentPost={frontmatter}
            locale={locale}
            tRelatedArticles={t('relatedArticles')}
            tRelatedPages={t('relatedPages')}
            tMinRead={t('minRead')}
            tReadMore={t('readMore')}
            relatedPageLinks={relatedPageLinks}
          />

          <div className="bg-gradient-to-br from-[#722F37] to-[#5A252C] rounded-3xl p-8 text-center my-12">
            <h2 className="text-2xl font-bold text-white mb-3">{t('ctaTitle')}</h2>
            <p className="text-white/80 mb-6 max-w-md mx-auto">{t('ctaDescription')}</p>
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#722F37] font-bold rounded-xl hover:bg-[#FBF8F4] transition-colors"
            >
              {t('ctaButton')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
