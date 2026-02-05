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

export function MinimalTemplate({ data }: { data: CVData }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { year: 'numeric' })
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
      {/* Header minimaliste */}
      <div className="px-16 pt-16 pb-8">
        <h1 className="text-4xl font-extralight text-gray-900 tracking-tight">
          {data.personalInfo.firstName}
          <span className="font-medium"> {data.personalInfo.lastName}</span>
        </h1>

        <div className="mt-4 flex gap-6 text-sm text-gray-500 flex-wrap">
          {data.personalInfo.email && (
            <a href={`mailto:${data.personalInfo.email}`} className="hover:text-gray-700 transition-colors">
              {data.personalInfo.email}
            </a>
          )}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {(data.personalInfo.city || data.personalInfo.country) && (
            <span>{[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
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
              LinkedIn
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
              GitHub
            </a>
          )}
        </div>
      </div>

      {/* Content avec beaucoup d'espace */}
      <div className="px-16 py-6">
        {/* Summary */}
        {data.personalInfo.summary && (
          <section className="mb-12">
            <p className="text-gray-600 leading-relaxed max-w-2xl">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
              Expérience
            </h2>
            <div className="space-y-8">
              {data.experiences.map((exp: any, i: number) => (
                <div key={i} className="grid grid-cols-[120px_1fr] gap-8">
                  <div className="text-sm text-gray-400">
                    {formatDate(exp.startDate)}
                    <br />
                    {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{exp.position}</h3>
                    <p className="text-gray-500">{exp.company}</p>
                    {exp.description && (
                      <p className="text-sm text-gray-500 mt-2 leading-relaxed">{exp.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
              Formation
            </h2>
            <div className="space-y-6">
              {data.educations.map((edu: any, i: number) => (
                <div key={i} className="grid grid-cols-[120px_1fr] gap-8">
                  <div className="text-sm text-gray-400">
                    {formatDate(edu.startDate)}
                    <br />
                    {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-500">{edu.institution}</p>
                    {edu.field && <p className="text-sm text-gray-400">{edu.field}</p>}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills & Languages side by side */}
        <div className="grid grid-cols-2 gap-16">
          {/* Skills */}
          {data.skills.length > 0 && (
            <section>
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
                Compétences
              </h2>
              <div className="space-y-2">
                {data.skills.map((skill: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{skill.name}</span>
                    <span className="text-gray-400">{levelLabels[skill.level] || skill.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <section>
              <h2 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
                Langues
              </h2>
              <div className="space-y-2">
                {data.languages.map((lang: any, i: number) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-gray-700">{lang.name}</span>
                    <span className="text-gray-400">{levelLabels[lang.level] || lang.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xs font-medium text-gray-400 uppercase tracking-[0.2em] mb-6">
              Centres d'intérêt
            </h2>
            <div className="flex flex-wrap gap-3">
              {data.interests.map((interest: any, i: number) => (
                <span key={i} className="text-sm text-gray-600">
                  {interest.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
