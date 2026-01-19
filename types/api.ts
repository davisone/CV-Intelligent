// Standard API response wrapper
export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

// Pagination
export interface PaginationParams {
  page?: number
  limit?: number
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

// AI Suggestion types
export interface AISuggestionRequest {
  section: 'summary' | 'experience' | 'skills'
  content: string
  context?: {
    jobTitle?: string
    industry?: string
    targetRole?: string
  }
}

export interface AISuggestion {
  original: string
  suggestion: string
  explanation: string
  improvements: string[]
}

export interface AISuggestionResponse {
  suggestions: AISuggestion[]
}

// ATS Score types
export interface ATSScoreRequest {
  resumeId: string
  jobDescription?: string
}

export interface ATSScoreResponse {
  score: number
  breakdown: {
    formatting: number
    keywords: number
    structure: number
    content: number
  }
  suggestions: string[]
  missingKeywords: string[]
  matchedKeywords: string[]
}

// Export types
export interface ExportRequest {
  resumeId: string
  format: 'pdf' | 'docx'
  template?: string
}

export interface ExportResponse {
  url: string
  expiresAt: Date
}