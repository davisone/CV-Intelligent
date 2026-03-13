import type { BlogPost } from '@/lib/blog'
import { BlogCard } from './blog-card'

interface BlogGridProps {
  posts: BlogPost[]
  locale: string
  tMinRead: string
  tReadMore: string
}

export function BlogGrid({ posts, locale, tMinRead, tReadMore }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <p className="text-center text-[#6B6560] py-16">
        Aucun article trouvé.
      </p>
    )
  }
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard
          key={post.slug}
          post={post}
          locale={locale}
          tMinRead={tMinRead}
          tReadMore={tReadMore}
        />
      ))}
    </div>
  )
}
