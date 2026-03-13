import Link from 'next/link'
import { FileText } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'
import { BlogCard } from './blog-card'

interface RelatedPostsProps {
  currentSlug: string
  allPosts: BlogPost[]
  currentPost: BlogPost
  locale: string
  tRelatedArticles: string
  tRelatedPages: string
  tMinRead: string
  tReadMore: string
  relatedPageLinks: { href: string; label: string }[]
}

export function RelatedPosts({
  currentSlug,
  allPosts,
  currentPost,
  locale,
  tRelatedArticles,
  tRelatedPages,
  tMinRead,
  tReadMore,
  relatedPageLinks,
}: RelatedPostsProps) {
  const related = allPosts
    .filter(
      (p) => p.slug !== currentSlug && p.category === currentPost.category
    )
    .slice(0, 3)

  return (
    <div className="border-t border-[#E0D6C8] mt-12 pt-12">
      {related.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-[#1F1A17] mb-6">
            {tRelatedArticles}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((post) => (
              <BlogCard
                key={post.slug}
                post={post}
                locale={locale}
                tMinRead={tMinRead}
                tReadMore={tReadMore}
              />
            ))}
          </div>
        </section>
      )}

      {relatedPageLinks.length > 0 && (
        <section>
          <h2 className="text-xl font-bold text-[#1F1A17] mb-4">
            {tRelatedPages}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {relatedPageLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-2 px-4 py-3 bg-[#F3EDE5] border border-[#E0D6C8] rounded-xl text-sm font-medium text-[#1F1A17] hover:border-[#722F37]/40 hover:bg-[#EDE4D8] transition-colors"
              >
                <FileText className="w-4 h-4 text-[#722F37] shrink-0" />
                <span className="truncate">{label}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
