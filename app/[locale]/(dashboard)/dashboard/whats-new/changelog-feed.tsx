'use client'

import { useEffect } from 'react'
import type { ChangelogEntry } from '@/lib/changelog'

function renderContent(content: string) {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let key = 0

  for (const line of lines) {
    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={key++} className="text-base font-bold text-[#1F1A17] mt-5 mb-2">
          {line.slice(3)}
        </h2>
      )
    } else if (line.startsWith('- ')) {
      elements.push(
        <li key={key++} className="text-sm text-[#6B6560] ml-4 list-disc">
          {line.slice(2)}
        </li>
      )
    } else if (line.trim()) {
      elements.push(
        <p key={key++} className="text-sm text-[#6B6560]">
          {line}
        </p>
      )
    }
  }

  return elements
}

export function ChangelogFeed({ entries }: { entries: ChangelogEntry[] }) {
  useEffect(() => {
    fetch('/api/user/mark-changelog-read', { method: 'POST' })
  }, [])

  if (entries.length === 0) {
    return (
      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-[#1F1A17] mb-2">Nouveautés</h1>
        <p className="text-[#6B6560] text-sm">Aucune mise à jour pour l&apos;instant.</p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold text-[#1F1A17] mb-6">Nouveautés</h1>
      <div className="space-y-6">
        {entries.map(entry => (
          <div key={entry.slug} className="bg-white rounded-xl border border-[#E0D6C8] p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="bg-[#722F37]/10 text-[#722F37] text-xs font-bold px-2.5 py-1 rounded-full">
                v{entry.version}
              </span>
              <span className="text-[#A89F96] text-xs">
                {new Date(entry.date).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#1F1A17] mb-3">{entry.title}</h2>
            <div>{renderContent(entry.content)}</div>
          </div>
        ))}

        <div className="bg-[#FBF8F4] rounded-xl border border-[#E0D6C8] p-5">
          <h2 className="text-base font-bold text-[#1F1A17] mb-2">Un mot de ma part</h2>
          <p className="text-sm text-[#6B6560] mb-4 leading-relaxed">
            Je développe CV Builder seul, dans le cadre de mon lancement en freelance. Chaque avis Google compte énormément pour moi — c&apos;est ce qui me permet de gagner en crédibilité et de continuer à améliorer l&apos;outil. Si l&apos;application vous a aidé, même une petite note me ferait vraiment plaisir.
          </p>
          <a
            href="https://g.page/r/CcSyetXUJJrpEAE/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-sm font-semibold text-[#722F37] border border-[#722F37] rounded-lg px-4 py-2 hover:bg-[#722F37] hover:text-white transition-colors"
          >
            Laisser un avis Google
          </a>
        </div>
      </div>
    </div>
  )
}
