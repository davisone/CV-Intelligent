'use client'

import { useState } from 'react'
import { ResumeCard } from '@/components/resume/resume-card'
import type { TemplateType } from '@prisma/client'

interface Resume {
  id: string
  title: string
  template: TemplateType
  updatedAt: Date
}

interface ResumeListProps {
  initialResumes: Resume[]
}

export function ResumeList({ initialResumes }: ResumeListProps) {
  const [resumes, setResumes] = useState(initialResumes)

  const handleDelete = (id: string) => {
    setResumes(prev => prev.filter(r => r.id !== id))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {resumes.map((resume) => (
        <ResumeCard
          key={resume.id}
          id={resume.id}
          title={resume.title}
          template={resume.template}
          updatedAt={resume.updatedAt}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}