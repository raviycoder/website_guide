// src/types/guide.types.ts

export type ContentType = 'summary' | 'steps-guide'
export type Category = 'kids' | 'intermediate' | 'beginners' | ''

export interface GuideStep {
  stepNumber: number
  title: string
  action: string
  details: string
  location?: string
  whatToExpect: string
  tips?: string[]
}

export interface WebsiteGuide {
  websiteName: string
  summary: string
  category: Category
  steps: GuideStep[]
  nextSteps: {
    title: string
    suggestions: string[]
    encouragement: string
  }
  metadata: {
    totalSteps: number
    difficulty: 'easy' | 'moderate' | 'advanced'
    estimatedTime: string
  }
}

export interface GenerateGuideOptions {
  category: Category
  contentType: ContentType
  websiteInfo: string
}
