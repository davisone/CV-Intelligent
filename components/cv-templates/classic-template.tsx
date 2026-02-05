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
    linkedinLabel?: string
    github?: string
    githubLabel?: string
    summary?: string
    photoUrl?: string
  }
  experiences: any[]
  educations: any[]
  skills: any[]
  languages: any[]
  interests?: any[]
}

export function ClassicTemplate({ data }: { data: CVData }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
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

  return (
    <div className="bg-white shadow-2xl" style={{ width: '21cm', minHeight: '29.7cm', margin: '0 auto' }}>
      {/* Header classique */}
      <div className="px-12 pt-10 pb-6 border-b-2 border-gray-800">
        <div className="text-center">
          <h1 className="text-3xl font-serif text-gray-900 tracking-wide">
            {data.personalInfo.firstName} {data.personalInfo.lastName}
          </h1>

          {/* Contact sur une ligne */}
          <div className="mt-3 text-sm text-gray-600 flex justify-center items-center gap-4 flex-wrap">
            {data.personalInfo.email && (
              <a href={`mailto:${data.personalInfo.email}`} className="hover:text-gray-900 transition-colors">
                {data.personalInfo.email}
              </a>
            )}
            {data.personalInfo.phone && (
              <>
                <span className="text-gray-400">|</span>
                <span>{data.personalInfo.phone}</span>
              </>
            )}
            {(data.personalInfo.city || data.personalInfo.country) && (
              <>
                <span className="text-gray-400">|</span>
                <span>{[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}</span>
              </>
            )}
          </div>

          {(data.personalInfo.linkedin || data.personalInfo.github) && (
            <div className="mt-2 text-sm text-gray-500 flex justify-center gap-4">
              {data.personalInfo.linkedin && (
                <a
                  href={formatUrl(data.personalInfo.linkedin)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                  <span>{data.personalInfo.linkedinLabel || 'LinkedIn'}</span>
                </a>
              )}
              {data.personalInfo.github && (
                <a
                  href={formatUrl(data.personalInfo.github)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-gray-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span>{data.personalInfo.githubLabel || 'GitHub'}</span>
                </a>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-12 py-8">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">
              Profil
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed text-justify">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">
              Expérience Professionnelle
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">{exp.position}</h3>
                    <span className="text-sm text-gray-500 italic">
                      {formatDate(exp.startDate)} - {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">{exp.company}</p>
                  {exp.description && (
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations.length > 0 && (
          <section className="mb-6">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">
              Formation
            </h2>
            <div className="space-y-3">
              {data.educations.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <span className="text-sm text-gray-500 italic">
                      {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                    </span>
                  </div>
                  <p className="text-gray-700 italic">{edu.institution}</p>
                  {edu.field && <p className="text-sm text-gray-500">{edu.field}</p>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two columns for skills and languages */}
        <div className="grid grid-cols-2 gap-8">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">
                Compétences
              </h2>
              <ul className="space-y-1">
                {data.skills.map((skill: any, i: number) => (
                  <li key={i} className="text-sm text-gray-700 flex justify-between">
                    <span>{skill.name}</span>
                    <span className="text-gray-500">{levelLabels[skill.level] || skill.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">
                Langues
              </h2>
              <ul className="space-y-1">
                {data.languages.map((lang: any, i: number) => (
                  <li key={i} className="text-sm text-gray-700 flex justify-between">
                    <span>{lang.name}</span>
                    <span className="text-gray-500">{levelLabels[lang.level] || lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <section className="mt-8">
            <h2 className="text-sm font-bold text-gray-800 uppercase tracking-widest mb-3 border-b border-gray-300 pb-1">
              Centres d'intérêt
            </h2>
            <p className="text-sm text-gray-700">
              {data.interests.map((interest: any) => interest.name).join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
