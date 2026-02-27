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
    portfolio?: string
    portfolioLabel?: string
    summary?: string
    photoUrl?: string
    drivingLicenses?: string
  }
  experiences: any[]
  educations: any[]
  certifications?: any[]
  projects?: any[]
  skills: any[]
  languages: any[]
  interests?: any[]
}

export function ModernTemplate({ data }: { data: CVData }) {
  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })
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
    <div className="bg-white shadow-2xl" style={{ width: '21cm', minHeight: '29.7cm', margin: '0 auto' }}>
      {/* Header avec fond coloré */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-5">
        <div className="flex justify-between items-start">
          <div className="flex gap-5 items-start">
            {/* Photo de profil */}
            {data.personalInfo.photoUrl && (
              <div className="flex-shrink-0">
                <img
                  src={data.personalInfo.photoUrl}
                  alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                  className="w-28 h-28 rounded-full object-cover border-4 border-white/20 shadow-lg"
                />
              </div>
            )}
            <div>
              <h1 className="text-3xl font-light tracking-wide">
                {data.personalInfo.firstName}{' '}
                <span className="font-bold">{data.personalInfo.lastName}</span>
              </h1>
              {data.personalInfo.summary && (
                <p className="mt-1 text-slate-300 max-w-xl leading-normal text-sm">
                  {data.personalInfo.summary}
                </p>
              )}
            </div>
          </div>

          {/* Contact info */}
          <div className="text-right text-sm space-y-1">
            {data.personalInfo.email && (
              <a
                href={`mailto:${data.personalInfo.email}`}
                className="flex items-center justify-end gap-2 hover:text-slate-200 transition-colors"
              >
                <span>{data.personalInfo.email}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </a>
            )}
            {data.personalInfo.phone && (
              <div className="flex items-center justify-end gap-2">
                <span>{data.personalInfo.phone}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
            )}
            {(data.personalInfo.city || data.personalInfo.country) && (
              <div className="flex items-center justify-end gap-2">
                <span>{[data.personalInfo.city, data.personalInfo.country].filter(Boolean).join(', ')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            )}
            {data.personalInfo.drivingLicenses && (
              <div className="flex items-center justify-end gap-2">
                <span>Permis {data.personalInfo.drivingLicenses}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h4" />
                </svg>
              </div>
            )}
            {(data.personalInfo.linkedin || data.personalInfo.github) && (
              <div className="flex items-center justify-end gap-3">
                {data.personalInfo.linkedin && (
                  <a
                    href={formatUrl(data.personalInfo.linkedin)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <span>{data.personalInfo.linkedinLabel || 'LinkedIn'}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                )}
                {data.personalInfo.github && (
                  <a
                    href={formatUrl(data.personalInfo.github)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-blue-300 hover:text-blue-200 transition-colors"
                  >
                    <span>{data.personalInfo.githubLabel || 'GitHub'}</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                )}
              </div>
            )}
            {data.personalInfo.portfolio && (
              <a
                href={formatUrl(data.personalInfo.portfolio)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-end gap-1.5 text-blue-300 hover:text-blue-200 transition-colors"
              >
                <span>{data.personalInfo.portfolioLabel || 'Portfolio'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-8 py-5">
        <div className="grid grid-cols-3 gap-6">
          {/* Main content - 2/3 */}
          <div className="col-span-2 space-y-3">
            {/* Experience */}
            {data.experiences.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-3">
                  {data.experiences.map((exp: any, i: number) => (
                    <div key={i} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-slate-800 rounded-full" />
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-900">{exp.position}</h3>
                        <span className="text-sm text-slate-500 whitespace-nowrap">
                          {formatDate(exp.startDate)} — {exp.current ? 'Présent' : exp.endDate ? formatDate(exp.endDate) : ''}
                        </span>
                      </div>
                      <p className="text-slate-600 font-medium">{exp.company}</p>
                      {exp.description && (
                        <p className="text-sm text-slate-600 mt-1 leading-normal">{exp.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.educations.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Formation
                </h2>
                <div className="space-y-3">
                  {data.educations.map((edu: any, i: number) => (
                    <div key={i} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-slate-800 rounded-full" />
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{edu.degree}</h3>
                          <p className="text-slate-600">{edu.institution}</p>
                          {edu.field && <p className="text-sm text-slate-500">{edu.field}</p>}
                        </div>
                        <span className="text-sm text-slate-500">
                          {formatDate(edu.startDate)} — {edu.endDate ? formatDate(edu.endDate) : 'Présent'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Projets */}
            {data.projects && data.projects.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Projets
                </h2>
                <div className="space-y-3">
                  {data.projects.map((project: any, i: number) => (
                    <div key={i} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-slate-800 rounded-full" />
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-slate-900">{project.name}</h3>
                        {project.url && (
                          <a href={formatUrl(project.url)} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline whitespace-nowrap">
                            {displayUrl(formatUrl(project.url))}
                          </a>
                        )}
                      </div>
                      {project.description && (
                        <p className="text-sm text-slate-600 leading-normal">{project.description}</p>
                      )}
                      {project.technologies?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {project.technologies.map((tech: string, j: number) => (
                            <span key={j} className="text-xs px-2 py-0.5 bg-slate-100 text-slate-600 rounded">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Certifications */}
            {data.certifications && data.certifications.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Certifications
                </h2>
                <div className="space-y-4">
                  {data.certifications.map((cert: any, i: number) => (
                    <div key={i} className="relative pl-4 border-l-2 border-slate-200">
                      <div className="absolute -left-[5px] top-1 w-2 h-2 bg-slate-800 rounded-full" />
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-slate-900">{cert.name}</h3>
                          <p className="text-slate-600">{cert.issuer}</p>
                          {cert.credentialId && (
                            <p className="text-xs text-slate-400">ID: {cert.credentialId}</p>
                          )}
                        </div>
                        <span className="text-sm text-slate-500">
                          {formatDate(cert.issueDate)}
                          {cert.expiryDate && ` — ${formatDate(cert.expiryDate)}`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-3">
            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Compétences
                </h2>
                <div className="space-y-2">
                  {data.skills.map((skill: any, i: number) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="font-medium text-slate-700">{skill.name}</span>
                        <span className="text-slate-500">{levelLabels[skill.level] || skill.level}</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-slate-800 rounded-full"
                          style={{
                            width: skill.level === 'EXPERT' ? '100%' :
                                   skill.level === 'ADVANCED' ? '80%' :
                                   skill.level === 'INTERMEDIATE' ? '60%' : '40%'
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Langues
                </h2>
                <div className="space-y-2">
                  {data.languages.map((lang: any, i: number) => (
                    <div key={i} className="flex justify-between items-center">
                      <span className="font-medium text-slate-700">{lang.name}</span>
                      <span className="text-sm px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                        {levelLabels[lang.level] || lang.level}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Interests */}
            {data.interests && data.interests.length > 0 && (
              <section>
                <h2 className="text-lg font-bold text-slate-800 uppercase tracking-wider border-b-2 border-slate-800 pb-1 mb-3">
                  Centres d'intérêt
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.interests.map((interest: any, i: number) => (
                    <span key={i} className="text-sm px-3 py-1 bg-slate-100 text-slate-600 rounded-full">
                      {interest.name}
                    </span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
