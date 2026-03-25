'use client'

import { useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import type { ChangelogEntry } from '@/lib/changelog'

interface Section {
  title: string
  lines: string[]
}

function parseSections(content: string): Section[] {
  const sections: Section[] = []
  let current: Section | null = null

  for (const line of content.trim().split('\n')) {
    if (line.startsWith('## ')) {
      if (current) sections.push(current)
      current = { title: line.slice(3).trim(), lines: [] }
    } else if (line.trim() && current) {
      current.lines.push(line.startsWith('- ') ? line.slice(2) : line)
    }
  }
  if (current) sections.push(current)
  return sections
}

function GiftIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function StarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="none">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function ChangelogFeed({ entries }: { entries: ChangelogEntry[] }) {
  const t = useTranslations('whatsNew')
  const locale = useLocale()

  useEffect(() => {
    fetch('/api/user/mark-changelog-read', { method: 'POST' })
  }, [])

  if (entries.length === 0) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-[#1F1A17] mb-2">{t('title')}</h1>
        <p className="text-[#6B6560] text-sm">{t('empty')}</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1F1A17] mb-8">{t('title')}</h1>

      {/* Bloc avis */}
      <div className="relative flex gap-4 mb-8">
        <div className="flex flex-col items-center">
          <div className="w-9 h-9 rounded-full bg-[#722F37] text-white flex items-center justify-center shrink-0 z-10">
            <StarIcon />
          </div>
          <div className="w-px flex-1 bg-[#E0D6C8] mt-2" />
        </div>
        <div className="flex-1 pb-8">
          <div className="bg-[#FBF8F4] border border-[#E0D6C8] rounded-xl p-5">
            <p className="text-xs font-semibold text-[#722F37] uppercase tracking-wider mb-1">{t('reviewTitle')}</p>
            <p className="text-sm text-[#6B6560] leading-relaxed mb-4">{t('reviewText')}</p>
            <a
              href="https://g.page/r/CcSyetXUJJrpEAE/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold bg-[#722F37] !text-white rounded-lg px-4 py-2 hover:bg-[#5a2329] transition-colors"
            >
              {t('reviewButton')}
            </a>
          </div>
        </div>
      </div>

      {/* Entrées changelog */}
      {entries.map((entry, entryIndex) => {
        const sections = parseSections(entry.content)
        const isLatest = entryIndex === 0
        const isLast = entryIndex === entries.length - 1

        return (
          <div key={entry.slug} className="relative flex gap-4">
            {/* Timeline gauche */}
            <div className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full border-2 flex items-center justify-center shrink-0 z-10 ${isLatest ? 'bg-[#722F37] border-[#722F37] text-white' : 'bg-white border-[#E0D6C8] text-[#A89F96]'}`}>
                {isLatest ? <GiftIcon /> : <ClockIcon />}
              </div>
              {!isLast && <div className="w-px flex-1 bg-[#E0D6C8] mt-2" />}
            </div>

            {/* Contenu */}
            <div className={`flex-1 ${!isLast ? 'pb-10' : 'pb-2'}`}>
              {/* Header version */}
              <div className="mb-4">
                <p className="text-xs font-semibold text-[#A89F96] uppercase tracking-wider mb-0.5">
                  {isLatest ? t('latestUpdate') : t('previousUpdate')}
                </p>
                <div className="flex items-center gap-3">
                  <span className="text-base font-bold text-[#1F1A17]">{entry.title}</span>
                  <span className="text-xs font-mono text-[#722F37] bg-[#722F37]/8 px-2 py-0.5 rounded-md">
                    v{entry.version}
                  </span>
                  <span className="text-xs text-[#A89F96]">
                    {new Date(entry.date).toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' })}
                  </span>
                </div>
              </div>

              {/* Sections */}
              <div className="border-l-2 border-[#E0D6C8] pl-4 space-y-4">
                {sections.map((section, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-2 mb-1">
                      <span className="inline-block text-xs font-semibold bg-[#722F37]/10 text-[#722F37] px-2.5 py-0.5 rounded-full whitespace-nowrap mt-0.5">
                        {section.title}
                      </span>
                    </div>
                    <div className="space-y-1">
                      {section.lines.map((line, j) => (
                        <p key={j} className="text-sm text-[#6B6560] leading-relaxed">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
