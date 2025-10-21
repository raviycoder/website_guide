// src/components/guide-display.tsx
import { Button } from './ui/button'
import { MarkdownRenderer } from './markdown-renderer'
import type { Category } from './category-selector'
import StepsRenderer from './steps-renderer'
import type { WebsiteGuide } from '@/types/guide.types'

interface GuideDisplayProps {
  contentType: 'summary' | 'steps-guide' | 'quick-guide'
  guide: string
  structuredGuide?: WebsiteGuide | null
  category: Category
  onReset: () => void
}

export function GuideDisplay({ 
  contentType, 
  guide, 
  structuredGuide,
  category, 
  onReset 
}: GuideDisplayProps) {
  if (!guide) return null

  const getCategoryIcon = () => {
    switch (category) {
      case 'kids':
        return '👶'
      case 'elders':
        return '👴'
      case 'beginners':
        return '🎓'
      default:
        return ''
    }
  }

  // Determine if we should use StepsRenderer
  const shouldUseStepsRenderer = contentType === 'steps-guide' && structuredGuide

  console.log('GuideDisplay:', {
    contentType,
    hasGuide: !!guide,
    hasStructuredGuide: !!structuredGuide,
    shouldUseStepsRenderer,
    structuredGuide
  })

  return (
    <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <span>{getCategoryIcon()}</span>
        <span>Your Guide:</span>
      </h3>
      {/* Render based on content type and data availability */}
      <div className="text-sm max-h-[300px] overflow-y-auto pr-2">
        {shouldUseStepsRenderer ? (
          <StepsRenderer guide={structuredGuide} />
        ) : contentType === 'steps-guide' && !structuredGuide ? (
          <div className="text-amber-700 p-3 bg-amber-50 border border-amber-200 rounded">
            <p className="font-semibold mb-2">⚠️ Parsing Issue</p>
            <p className="text-xs mb-2">The AI response couldn't be parsed as structured data. Showing raw content:</p>
            <MarkdownRenderer content={guide} className="markdown-content" />
          </div>
        ) : (
          <MarkdownRenderer content={guide} className="markdown-content" />
        )}
      </div>
      <Button variant="outline" size="sm" className="mt-3 w-full" onClick={onReset}>
        Create New Guide
      </Button>
    </div>
  )
}
