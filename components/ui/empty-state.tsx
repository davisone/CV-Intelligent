import Link from 'next/link'
import { Plus } from 'lucide-react'

interface EmptyStateProps {
  title?: string
  description?: string
  actionLabel?: string
  actionHref?: string
}

export function EmptyState({
  title = "Vous n'avez pas encore de CV",
  description = "Créez votre premier CV professionnel en quelques minutes",
  actionLabel = "Créer mon premier CV",
  actionHref = "/dashboard/templates"
}: EmptyStateProps) {
  return (
    <div className="text-center py-12">
      {/* Illustration SVG */}
      <div className="mx-auto mb-6 w-48 h-48">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Background circle */}
          <circle cx="100" cy="100" r="80" fill="#F3EDE5" />

          {/* Main document */}
          <rect x="55" y="40" width="90" height="120" rx="8" fill="#FBF8F4" stroke="#E0D6C8" strokeWidth="2" />

          {/* Document header line */}
          <rect x="70" y="55" width="40" height="8" rx="4" fill="#722F37" />

          {/* Profile circle */}
          <circle cx="85" cy="85" r="15" fill="#E0D6C8" />
          <circle cx="85" cy="80" r="6" fill="#722F37" opacity="0.3" />
          <path d="M75 95 C75 88, 95 88, 95 95" fill="#722F37" opacity="0.3" />

          {/* Text lines */}
          <rect x="110" y="75" width="25" height="4" rx="2" fill="#E0D6C8" />
          <rect x="110" y="85" width="20" height="4" rx="2" fill="#E0D6C8" />

          {/* Content lines */}
          <rect x="70" y="110" width="60" height="4" rx="2" fill="#E0D6C8" />
          <rect x="70" y="120" width="50" height="4" rx="2" fill="#E0D6C8" />
          <rect x="70" y="130" width="55" height="4" rx="2" fill="#E0D6C8" />
          <rect x="70" y="140" width="40" height="4" rx="2" fill="#E0D6C8" />

          {/* Sparkle decorations */}
          <g fill="#722F37" opacity="0.6">
            <circle cx="160" cy="60" r="3" />
            <circle cx="40" cy="90" r="2" />
            <circle cx="165" cy="130" r="2.5" />
            <circle cx="35" cy="140" r="2" />
          </g>

          {/* Plus icon floating */}
          <g transform="translate(150, 45)">
            <circle cx="0" cy="0" r="12" fill="#722F37" />
            <rect x="-6" y="-1.5" width="12" height="3" rx="1.5" fill="white" />
            <rect x="-1.5" y="-6" width="3" height="12" rx="1.5" fill="white" />
          </g>

          {/* Dotted path suggesting creation */}
          <path
            d="M150 57 Q160 80, 145 95"
            stroke="#722F37"
            strokeWidth="2"
            strokeDasharray="4 4"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Text content */}
      <h3 className="text-xl font-semibold text-[#1F1A17] mb-2">
        {title}
      </h3>
      <p className="text-[#6B6560] mb-6 max-w-sm mx-auto">
        {description}
      </p>

      {/* CTA Button */}
      <Link
        href={actionHref}
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#722F37] text-white font-semibold rounded-xl hover:bg-[#8B3A44] transition-all duration-200 hover:scale-105 shadow-lg shadow-[#722F37]/20"
      >
        <Plus className="w-5 h-5" />
        {actionLabel}
      </Link>

      {/* Helper text */}
      <p className="mt-4 text-sm text-[#8A7F72]">
        C&apos;est gratuit et rapide !
      </p>
    </div>
  )
}
