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
}

export function ClassicTemplate({ data }: { data: CVData }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
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
              <span>{data.personalInfo.email}</span>
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

          {data.personalInfo.linkedin && (
            <div className="mt-1 text-sm text-gray-500">
              {data.personalInfo.linkedin}
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
      </div>
    </div>
  )
}
