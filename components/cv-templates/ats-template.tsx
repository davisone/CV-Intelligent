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
  certifications?: any[]
  projects?: any[]
  skills: any[]
  languages: any[]
  interests?: any[]
}

export function ATSTemplate({ data }: { data: CVData }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { month: '2-digit', year: 'numeric' })
  }

  const formatUrl = (url: string) => {
    if (url.startsWith('http://') || url.startsWith('https://')) return url
    return `https://${url}`
  }

  const displayUrl = (url: string) => {
    return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
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
    <div className="bg-white shadow-2xl font-sans" style={{ width: '21cm', minHeight: '29.7cm', margin: '0 auto' }}>
      {/* Header - Simple et sans fioritures pour ATS */}
      <div className="px-10 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-black">
          {data.personalInfo.firstName} {data.personalInfo.lastName}
        </h1>

        {/* Contact info - Format simple en ligne */}
        <div className="mt-2 text-sm text-black">
          <a href={`mailto:${data.personalInfo.email}`} className="hover:underline">{data.personalInfo.email}</a>
          {data.personalInfo.phone && ` | ${data.personalInfo.phone}`}
          {(data.personalInfo.city || data.personalInfo.country) &&
            ` | ${[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}`}
        </div>
        {data.personalInfo.linkedin && (
          <div className="text-sm text-black">
            <a href={formatUrl(data.personalInfo.linkedin)} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {data.personalInfo.linkedinLabel || 'LinkedIn'}
            </a>
          </div>
        )}
        {data.personalInfo.github && (
          <div className="text-sm text-black">
            <a href={formatUrl(data.personalInfo.github)} target="_blank" rel="noopener noreferrer" className="hover:underline">
              {data.personalInfo.githubLabel || 'GitHub'}
            </a>
          </div>
        )}
      </div>

      <hr className="border-black mx-10" />

      {/* Content */}
      <div className="px-10 py-4">
        {/* Summary / Objective */}
        {data.personalInfo.summary && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              RÉSUMÉ PROFESSIONNEL
            </h2>
            <p className="text-sm text-black leading-relaxed">
              {data.personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {data.experiences.length > 0 && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              EXPÉRIENCE PROFESSIONNELLE
            </h2>
            <div className="space-y-4">
              {data.experiences.map((exp: any, i: number) => (
                <div key={i}>
                  <div className="font-bold text-black">
                    {exp.position}
                  </div>
                  <div className="text-sm text-black">
                    {exp.company} | {formatDate(exp.startDate)} - {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                  </div>
                  {exp.description && (
                    <p className="text-sm text-black mt-1 whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {data.educations.length > 0 && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              FORMATION
            </h2>
            <div className="space-y-3">
              {data.educations.map((edu: any, i: number) => (
                <div key={i}>
                  <div className="font-bold text-black">
                    {edu.degree}{edu.field ? `, ${edu.field}` : ''}
                  </div>
                  <div className="text-sm text-black">
                    {edu.institution} | {formatDate(edu.startDate)} - {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                  </div>
                  {edu.gpa && <div className="text-sm text-black">Mention: {edu.gpa}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projets */}
        {data.projects && data.projects.length > 0 && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              PROJETS
            </h2>
            <div className="space-y-3">
              {data.projects.map((project: any, i: number) => (
                <div key={i}>
                  <div className="font-bold text-black">{project.name}</div>
                  {project.description && (
                    <p className="text-sm text-black mt-1">{project.description}</p>
                  )}
                  {project.technologies?.length > 0 && (
                    <div className="text-sm text-black">
                      Outils : {project.technologies.join(', ')}
                    </div>
                  )}
                  {project.url && (
                    <div className="text-sm text-black">{displayUrl(formatUrl(project.url))}</div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Certifications */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              CERTIFICATIONS
            </h2>
            <div className="space-y-3">
              {data.certifications.map((cert: any, i: number) => (
                <div key={i}>
                  <div className="font-bold text-black">{cert.name}</div>
                  <div className="text-sm text-black">
                    {cert.issuer} | {formatDate(cert.issueDate)}
                    {cert.expiryDate && ` - ${formatDate(cert.expiryDate)}`}
                  </div>
                  {cert.credentialId && <div className="text-sm text-black">ID: {cert.credentialId}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills - Liste simple avec mots-clés */}
        {data.skills.length > 0 && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              COMPÉTENCES
            </h2>
            <p className="text-sm text-black">
              {data.skills.map((skill: any) =>
                `${skill.name} (${levelLabels[skill.level] || skill.level})`
              ).join(' • ')}
            </p>
          </section>
        )}

        {/* Languages */}
        {data.languages.length > 0 && (
          <section className="mb-5">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              LANGUES
            </h2>
            <p className="text-sm text-black">
              {data.languages.map((lang: any) =>
                `${lang.name}: ${levelLabels[lang.level] || lang.level}`
              ).join(' • ')}
            </p>
          </section>
        )}

        {/* Interests */}
        {data.interests && data.interests.length > 0 && (
          <section className="mb-5 mt-2">
            <h2 className="text-base font-bold text-black uppercase mb-2">
              CENTRES D'INTÉRÊT
            </h2>
            <p className="text-sm text-black">
              {data.interests.map((interest: any) => interest.name).join(' • ')}
            </p>
          </section>
        )}
      </div>
    </div>
  )
}
