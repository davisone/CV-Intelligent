import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, ArrowLeft } from 'lucide-react'
import type { BlogPost } from '@/lib/blog'

interface BlogPostLayoutProps {
  post: BlogPost
  locale: string
  children: React.ReactNode
  tPublishedOn: string
  tBy: string
  tMinRead: string
  tBackToBlog: string
}

export function BlogPostLayout({
  post,
  locale,
  children,
  tPublishedOn,
  tBy,
  tMinRead,
  tBackToBlog,
}: BlogPostLayoutProps) {
  return (
    <article className="container mx-auto px-4 py-12 max-w-3xl">
      <nav className="mb-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-[#722F37] font-medium hover:underline"
        >
          <ArrowLeft className="w-4 h-4" />
          {tBackToBlog}
        </Link>
      </nav>

      <div className="mb-6">
        <span className="inline-block px-3 py-1 bg-[#722F37]/10 text-[#722F37] text-sm font-medium rounded-full mb-4">
          {post.category}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-[#1F1A17] mb-4">
          {post.title}
        </h1>
        <div className="flex flex-wrap items-center gap-4 text-sm text-[#6B6560]">
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {tPublishedOn}{' '}
            {new Date(post.date).toLocaleDateString(
              locale === 'fr' ? 'fr-FR' : 'en-US',
              { day: 'numeric', month: 'long', year: 'numeric' }
            )}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {post.readingTime} {tMinRead}
          </span>
          <span>
            {tBy} <strong className="text-[#1F1A17]">{post.author}</strong>
          </span>
        </div>
      </div>

      <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden mb-10 bg-[#E0D6C8]">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 768px) 100vw, 768px"
        />
      </div>

      <div className="
        [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-[#1F1A17] [&_h2]:mt-10 [&_h2]:mb-4
        [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-[#1F1A17] [&_h3]:mt-8 [&_h3]:mb-3
        [&_p]:text-[#3D3733] [&_p]:leading-relaxed [&_p]:mb-4
        [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4 [&_ul_li]:text-[#3D3733] [&_ul_li]:mb-1
        [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4 [&_ol_li]:text-[#3D3733] [&_ol_li]:mb-1
        [&_strong]:font-bold [&_strong]:text-[#1F1A17]
        [&_a]:text-[#722F37] [&_a]:underline [&_a:hover]:text-[#8B3A44]
        [&_blockquote]:border-l-4 [&_blockquote]:border-[#722F37] [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-[#6B6560] [&_blockquote]:my-6
        [&_code]:bg-[#F3EDE5] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm [&_code]:font-mono
        [&_hr]:border-[#E0D6C8] [&_hr]:my-8
      ">
        {children}
      </div>
    </article>
  )
}
