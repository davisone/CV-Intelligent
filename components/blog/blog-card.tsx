import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'

interface BlogCardProps {
  post: BlogPost
  locale: string
  tMinRead: string
  tReadMore: string
}

export function BlogCard({ post, locale, tMinRead, tReadMore }: BlogCardProps) {
  return (
    <article className="group flex flex-col bg-[#F3EDE5] border border-[#E0D6C8] rounded-2xl overflow-hidden hover:border-[#722F37]/30 transition-colors">
      <div className="relative h-48 bg-[#E0D6C8] overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <span className="absolute top-3 left-3 px-2 py-1 bg-[#722F37] text-white text-xs font-medium rounded-full">
          {post.category}
        </span>
      </div>
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-3 text-xs text-[#6B6560] mb-3">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {new Date(post.date).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
              day: 'numeric', month: 'short', year: 'numeric',
            })}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {post.readingTime} {tMinRead}
          </span>
        </div>
        <h2 className="text-lg font-bold text-[#1F1A17] mb-2 line-clamp-2 group-hover:text-[#722F37] transition-colors">
          {post.title}
        </h2>
        <p className="text-sm text-[#6B6560] mb-4 flex-1 line-clamp-3">
          {post.description}
        </p>
        {post.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {post.tags.slice(0, 3).map((tag) => (
              <span key={tag} className="flex items-center gap-1 text-xs px-2 py-0.5 bg-[#722F37]/10 text-[#722F37] rounded-full">
                <Tag className="w-3 h-3" />
                {tag}
              </span>
            ))}
          </div>
        )}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-[#722F37] hover:gap-2 transition-all"
        >
          {tReadMore} →
        </Link>
      </div>
    </article>
  )
}
