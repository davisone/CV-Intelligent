'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

interface Category {
  slug: string
  label: string
}

interface CategoryFilterProps {
  categories: Category[]
  tAll: string
}

export function CategoryFilter({ categories, tAll }: CategoryFilterProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const active = searchParams.get('category') ?? 'all'

  function handleClick(slug: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (slug === 'all') {
      params.delete('category')
    } else {
      params.set('category', slug)
    }
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleClick('all')}
        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
          active === 'all'
            ? 'bg-[#722F37] text-white'
            : 'bg-[#F3EDE5] text-[#1F1A17] border border-[#E0D6C8] hover:border-[#722F37]/40'
        }`}
      >
        {tAll}
      </button>
      {categories.map((cat) => (
        <button
          key={cat.slug}
          onClick={() => handleClick(cat.slug)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            active === cat.slug
              ? 'bg-[#722F37] text-white'
              : 'bg-[#F3EDE5] text-[#1F1A17] border border-[#E0D6C8] hover:border-[#722F37]/40'
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  )
}
