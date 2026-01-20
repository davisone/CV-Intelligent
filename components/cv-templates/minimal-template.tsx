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
          {data.personalInfo.email && <span>{data.personalInfo.email}</span>}
          {data.personalInfo.phone && <span>{data.personalInfo.phone}</span>}
          {(data.personalInfo.city || data.personalInfo.country) && (
            <span>{[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}</span>
          )}
          {data.personalInfo.linkedin && <span>LinkedIn: {data.personalInfo.linkedin}</span>}
          {data.personalInfo.github && <span>GitHub: {data.personalInfo.github}</span>}
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
