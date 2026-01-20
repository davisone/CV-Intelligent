import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export interface SuggestionResult {
  suggestion: string
  explanation: string
  improvements: string[]
}

/**
 * Generate AI suggestions for resume content
 */
export async function generateSuggestion(
  content: string,
  section: 'summary' | 'experience' | 'skills',
  context?: {
    jobTitle?: string
    industry?: string
    targetRole?: string
  }
): Promise<SuggestionResult> {
  const systemPrompt = `You are an expert resume consultant. Your task is to improve resume content to make it more impactful, professional, and ATS-friendly.

Guidelines:
- Use strong action verbs
- Quantify achievements when possible
- Keep language professional but engaging
- Optimize for Applicant Tracking Systems (ATS)
- Be concise and impactful
- Respond in the same language as the input content

Respond ONLY with valid JSON (no markdown, no backticks) with this structure:
{"suggestion": "the improved text", "explanation": "why these changes improve the content", "improvements": ["improvement 1", "improvement 2"]}`

  const userPrompt = buildUserPrompt(content, section, context)

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 1024,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  const textContent = response.choices[0]?.message?.content
  if (!textContent) {
    throw new Error('Unexpected response format')
  }

  // Extraire le JSON même s'il est entouré de backticks ou texte
  let jsonText = textContent

  // Chercher un bloc JSON entre ```json et ```
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch && jsonMatch[1]) {
    jsonText = jsonMatch[1].trim()
  }

  // Ou chercher un objet JSON directement
  const objectMatch = jsonText.match(/\{[\s\S]*\}/)
  if (objectMatch && objectMatch[0]) {
    jsonText = objectMatch[0]
  }

  try {
    const parsed = JSON.parse(jsonText) as SuggestionResult
    return parsed
  } catch {
    // Retourner le texte brut si pas de JSON valide
    return {
      suggestion: textContent.replace(/```[\s\S]*?```/g, '').trim(),
      explanation: 'AI suggestion generated',
      improvements: [],
    }
  }
}

function buildUserPrompt(
  content: string,
  section: string,
  context?: { jobTitle?: string; industry?: string; targetRole?: string }
): string {
  let prompt = `Improve this ${section} section:\n\n"${content}"\n\n`

  if (context?.jobTitle) {
    prompt += `Current/Last job title: ${context.jobTitle}\n`
  }
  if (context?.industry) {
    prompt += `Industry: ${context.industry}\n`
  }
  if (context?.targetRole) {
    prompt += `Target role: ${context.targetRole}\n`
  }

  return prompt
}

/**
 * Calculate ATS score and provide recommendations
 */
export async function calculateATSScore(
  resumeContent: string,
  jobDescription?: string
): Promise<{
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
}> {
  const systemPrompt = `You are an ATS (Applicant Tracking System) expert. Analyze the resume and provide a score from 0-100 based on:
- Formatting (25%): Clean structure, proper sections, no complex formatting
- Keywords (25%): Relevant industry and role keywords
- Structure (25%): Clear hierarchy, proper sections, chronological order
- Content (25%): Quantified achievements, action verbs, relevant experience

Respond ONLY with valid JSON (no markdown, no backticks) with this structure:
{"score": 75, "breakdown": {"formatting": 80, "keywords": 70, "structure": 75, "content": 75}, "suggestions": ["suggestion 1", "suggestion 2"], "missingKeywords": ["keyword1", "keyword2"], "matchedKeywords": ["keyword1", "keyword2"]}`

  let userPrompt = `Analyze this resume for ATS compatibility:\n\n${resumeContent}`

  if (jobDescription) {
    userPrompt += `\n\nTarget job description:\n${jobDescription}`
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    max_tokens: 1500,
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: userPrompt,
      },
    ],
  })

  const textContent = response.choices[0]?.message?.content
  if (!textContent) {
    throw new Error('Unexpected response format')
  }

  // Extraire le JSON même s'il est entouré de backticks ou texte
  let jsonText = textContent

  // Chercher un bloc JSON entre ```json et ```
  const jsonMatch = jsonText.match(/```(?:json)?\s*([\s\S]*?)```/)
  if (jsonMatch && jsonMatch[1]) {
    jsonText = jsonMatch[1].trim()
  }

  // Ou chercher un objet JSON directement
  const objectMatch = jsonText.match(/\{[\s\S]*\}/)
  if (objectMatch && objectMatch[0]) {
    jsonText = objectMatch[0]
  }

  try {
    return JSON.parse(jsonText)
  } catch {
    // Valeurs par défaut si parsing échoue
    return {
      score: 50,
      breakdown: { formatting: 50, keywords: 50, structure: 50, content: 50 },
      suggestions: ['Impossible d\'analyser le CV correctement. Réessayez.'],
      missingKeywords: [],
      matchedKeywords: [],
    }
  }
}