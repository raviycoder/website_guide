// src/hooks/use-guide-generator.ts
import { useState } from 'react'
import type { Category } from '@/components/category-selector'
import type { WebsiteGuide } from '@/types/guide.types'
import { getStructuredGuidePrompt, parseGuideResponse } from '@/prompts/step-guide-prompts'
import { getQuickTipPrompt, getSummaryPrompt } from '@/prompts/summary-prompts'
import type { ContentType } from '@/components/content-type'

interface AISession {
  prompt: (text: string) => Promise<string>
}

interface UseGuideGeneratorProps {
  session: AISession | null
  aiPromptData: string | null
  stepCount?: number
}

export function useGuideGenerator({ session, aiPromptData, stepCount = 7 }: UseGuideGeneratorProps) {
  const [guide, setGuide] = useState('')
  const [structuredGuide, setStructuredGuide] = useState<WebsiteGuide | null>(null)
  const [generating, setGenerating] = useState(false)
  const [contentType, setContentType] = useState<ContentType>('summary')

  const generateGuide = async (
    category: Category,
    selectedContentType: ContentType = contentType
  ) => {
    if (!category) {
      alert('Please select a category first!')
      return
    }

    if (!session || !aiPromptData) {
      alert('AI is not ready yet. Please wait a moment.')
      return
    }

    setGenerating(true)
    setGuide('') // Clear previous guide
    setStructuredGuide(null) // Clear previous structured guide
    setContentType(selectedContentType)

    // Store the selected category and content type in Chrome storage
    chrome.storage.local.set(
      {
        category,
        contentType: selectedContentType,
      },
      () => {
        console.log('Saved:', { category, contentType: selectedContentType })
      }
    )

    try {
      let prompt: string
      let result: string

      // Generate different prompts based on content type
      if (selectedContentType === 'summary') {
        // Generate summary prompt
        prompt = getSummaryPrompt(category as 'kids' | 'intermediate' | 'beginners', aiPromptData)
        result = await session.prompt(prompt)
        setGuide(result)
      } else if (selectedContentType === 'quick-guide') {
        // Generate quick guide prompt
        prompt = getQuickTipPrompt(category as 'kids' | 'intermediate' | 'beginners', aiPromptData)
        result = await session.prompt(prompt)
        setGuide(result)
      } else {
        // Generate structured step-by-step guide
        prompt = getStructuredGuidePrompt(
          category as 'kids' | 'intermediate' | 'beginners', 
          aiPromptData, 
          stepCount
        )
        result = await session.prompt(prompt)

        console.log('Raw AI response:', result)

        // Try to parse JSON response
        const parsedGuide = parseGuideResponse(result)

        if (parsedGuide) {
          // Store the structured guide object
          setStructuredGuide(parsedGuide)
          // Also set guide string for compatibility
          setGuide(JSON.stringify(parsedGuide))
          console.log('Successfully parsed guide:', parsedGuide)
        } else {
          // Fallback: use the raw response if parsing fails
          console.warn('Failed to parse structured guide, using raw response')
          setGuide(result)
        }
      }
    } catch (err) {
      console.error('AI generation failed:', err)
      setGuide('❌ Failed to generate guide. Please try again.')
    } finally {
      setGenerating(false)
    }
  }

  const resetGuide = () => {
    setGuide('')
    setStructuredGuide(null)
  }

  return {
    guide,
    structuredGuide,
    generating,
    generateGuide,
    resetGuide,
    contentType,
  }
}
