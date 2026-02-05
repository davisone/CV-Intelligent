'use client'

interface CVData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone?: string
    city?: string
    country?: string
    linkedin?: string
    github?: string
    summary?: string
    photoUrl?: string
  }
  experiences: any[]
  educations: any[]
  skills: any[]
  languages: any[]
  interests?: any[]
}

export function CreativeTemplate({ data }: { data: CVData }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { month: 'short', year: 'numeric' })
  }

  const formatUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }

  const levelLabels: Record<string, string> = {
    BEGINNER: 'Débutant',
    INTERMEDIATE: 'Intermédiaire',
    ADVANCED: 'Avancé',
    EXPERT: 'Expert',
    FLUENT: 'Courant',
    NATIVE: 'Natif',
  }

  const getLevelPercent = (level: string) => {
    switch (level) {
      case 'EXPERT':
      case 'NATIVE':
        return 100
      case 'ADVANCED':
      case 'FLUENT':
        return 80
      case 'INTERMEDIATE':
        return 60
      default:
        return 40
    }
  }

  return (
    <div className="bg-white shadow-2xl" style={{ width: '21cm', minHeight: '29.7cm', margin: '0 auto' }}>
      <div className="grid grid-cols-[280px_1fr]" style={{ minHeight: '29.7cm' }}>
        {/* Sidebar colorée */}
        <div className="bg-gradient-to-b from-rose-500 via-purple-500 to-indigo-600 text-white p-8">
          {/* Photo */}
          {data.personalInfo.photoUrl ? (
            <div className="mb-6">
              <img
                src={data.personalInfo.photoUrl}
                alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-white/30 shadow-xl"
              />
            </div>
          ) : (
            <div className="w-32 h-32 rounded-full bg-white/20 mx-auto mb-6 flex items-center justify-center">
              <span className="text-4xl font-bold">
                {data.personalInfo.firstName[0]}{data.personalInfo.lastName[0]}
              </span>
            </div>
          )}

          {/* Name */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold">{data.personalInfo.firstName}</h1>
            <h1 className="text-2xl font-light">{data.personalInfo.lastName}</h1>
          </div>

          {/* Contact */}
          <div className="space-y-3 mb-8">
            <h2 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">Contact</h2>
            {data.personalInfo.email && (
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-white/90 break-all">{data.personalInfo.email}</span>
              </a>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <span className="text-white/90">{data.personalInfo.phone}</span>
              </div>
            )}
            {(data.personalInfo.city || data.personalInfo.country) && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
                <span className="text-white/90">{[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}</span>
              </div>
            )}
            {data.personalInfo.linkedin && (
              <a
                href={formatUrl(data.personalInfo.linkedin)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </div>
                <span className="text-white/90">LinkedIn</span>
              </a>
            )}
            {data.personalInfo.github && (
              <a
                href={formatUrl(data.personalInfo.github)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm hover:opacity-80 transition-opacity"
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </div>
                <span className="text-white/90">GitHub</span>
              </a>
            )}
          </div>

          {/* Skills with circular progress */}
          {data.skills.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-4">Compétences</h2>
              <div className="space-y-3">
                {data.skills.map((skill: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{skill.name}</span>
                      <span className="text-white/70 text-xs">{levelLabels[skill.level]}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full transition-all"
                        style={{ width: `${getLevelPercent(skill.level)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-4">Langues</h2>
              <div className="space-y-3">
                {data.languages.map((lang: any, i: number) => (
                  <div key={i}>
                    <div className="flex justify-between text-sm mb-1">
                      <span>{lang.name}</span>
                      <span className="text-white/70 text-xs">{levelLabels[lang.level]}</span>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-white rounded-full"
                        style={{ width: `${getLevelPercent(lang.level)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interests */}
          {data.interests && data.interests.length > 0 && (
            <div className="pt-4">
              <h2 className="text-xs font-bold uppercase tracking-wider text-white/70 mb-4">Centres d'intérêt</h2>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest: any, i: number) => (
                  <span key={i} className="text-sm px-3 py-1 bg-white/20 rounded-full">
                    {interest.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="p-10">
          {/* Summary */}
          {data.personalInfo.summary && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-purple-500 flex items-center justify-center text-white text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                À propos
              </h2>
              <p className="text-gray-600 leading-relaxed pl-10">
                {data.personalInfo.summary}
              </p>
            </section>
          )}

          {/* Experience */}
          {data.experiences.length > 0 && (
            <section className="mb-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-purple-500 flex items-center justify-center text-white text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </span>
                Expérience
              </h2>
              <div className="space-y-6 pl-10">
                {data.experiences.map((exp: any, i: number) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-500" />
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900">{exp.position}</h3>
                      <span className="text-sm text-purple-600 font-medium whitespace-nowrap ml-4">
                        {formatDate(exp.startDate)} - {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                      </span>
                    </div>
                    <p className="text-gray-600 font-medium">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data.educations.length > 0 && (
            <section>
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-r from-rose-500 to-purple-500 flex items-center justify-center text-white text-sm">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  </svg>
                </span>
                Formation
              </h2>
              <div className="space-y-4 pl-10">
                {data.educations.map((edu: any, i: number) => (
                  <div key={i} className="relative">
                    <div className="absolute -left-6 top-1 w-3 h-3 rounded-full bg-gradient-to-r from-rose-500 to-purple-500" />
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                      <span className="text-sm text-purple-600 font-medium whitespace-nowrap ml-4">
                        {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                      </span>
                    </div>
                    <p className="text-gray-600">{edu.institution}</p>
                    {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  )
}
