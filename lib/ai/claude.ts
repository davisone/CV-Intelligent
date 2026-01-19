import Anthropic from '@anthropic-ai/sdk'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
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

Respond in JSON format with:
- suggestion: the improved text
- explanation: why these changes improve the content
- improvements: array of specific improvements made`

  const userPrompt = buildUserPrompt(content, section, context)

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1024,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  })

  const textContent = response.content[0]
  if (textContent?.type !== 'text') {
    throw new Error('Unexpected response format')
  }

  try {
    const parsed = JSON.parse(textContent.text) as SuggestionResult
    return parsed
  } catch {
    return {
      suggestion: textContent.text,
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

Respond in JSON format with:
- score: overall score 0-100
- breakdown: { formatting, keywords, structure, content } each 0-100
- suggestions: array of improvement suggestions
- missingKeywords: important keywords that should be added
- matchedKeywords: keywords found in the resume`

  let userPrompt = `Analyze this resume for ATS compatibility:\n\n${resumeContent}`

  if (jobDescription) {
    userPrompt += `\n\nTarget job description:\n${jobDescription}`
  }

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 1500,
    messages: [
      {
        role: 'user',
        content: userPrompt,
      },
    ],
    system: systemPrompt,
  })

  const textContent = response.content[0]
  if (textContent?.type !== 'text') {
    throw new Error('Unexpected response format')
  }

  return JSON.parse(textContent.text)
}