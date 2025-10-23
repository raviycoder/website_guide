// src/App.tsx
import { useState } from 'react'
import { useWebsiteInfo } from '@/hooks/use-website-info'
import { useAI } from '@/hooks/use-ai'
import { useGuideGenerator } from '@/hooks/use-guide-generator'
import { WebsiteHeader } from '@/components/website-header'
import { AIStatusIndicator } from '@/components/ai-status-indicator'
import { type Category } from '@/components/category-selector'
import { CategoryDescription } from '@/components/category-description'
import { StartGuideButton } from '@/components/start-guide-button'
import { GuideDisplay } from '@/components/guide-display'
import { Instructions } from '@/components/instructions'
import { LoadingState } from '@/components/loading-state'
import { ErrorState } from '@/components/error-state'
import ContentControls, { type ContentType } from './components/content-type'
import { BadgeInfo } from 'lucide-react'

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('')
  const [contentType, setContentType] = useState<ContentType>('summary')
  const [stepCount, setStepCount] = useState<number>(7)

  // Get website data and AI session
  const { websiteData, aiPromptData, loading, error } = useWebsiteInfo()
  const { session, isReady, error: aiError } = useAI()

  // Guide generation logic
  const { guide, structuredGuide, generating, generateGuide, resetGuide } = useGuideGenerator({
    session,
    aiPromptData,
    stepCount,
  })

  const handleStartGuide = () => {
    // Pass both category and content type to generate personalized guide
    generateGuide(selectedCategory, contentType)
  }

  const handleReset = () => {
    resetGuide()
    setSelectedCategory('')
  }

  const handleContentTypeChange = (newContentType: ContentType) => {
    setContentType(newContentType)
    // Reset guide when switching content type
    if (guide) {
      resetGuide()
    }
  }

  // Loading states
  if (loading) {
    return <LoadingState />
  }

  if (error || !websiteData) {
    return <ErrorState error={error} />
  }

  return (
    <div className="w-[380px] min-h-[500px] max-h-[600px] overflow-y-auto p-4 space-y-3 bg-background text-foreground">
      <WebsiteHeader title={websiteData.title} url={websiteData.url} />
      <AIStatusIndicator isReady={isReady} error={aiError} />

      <ContentControls
        onCategoryChange={setSelectedCategory}
        category={selectedCategory}
        disabled={!isReady || generating}
        onContentTypeChange={handleContentTypeChange}
        defaultContentType={contentType}
        stepCount={stepCount}
        onStepCountChange={setStepCount}
      />

      <StartGuideButton
        onClick={handleStartGuide}
        disabled={generating || !selectedCategory || !isReady}
        generating={generating}
        contentType={contentType}
      />
      {generating && (
        <span className="text-xs text-orange-500 inline-flex mt-2">
          <BadgeInfo size={20} className="mr-2" />
          Please do not close this window while we generate your guide.
        </span>
      )}

      {selectedCategory && !guide && !generating && (
        <CategoryDescription category={selectedCategory} contentType={contentType} />
      )}

      <GuideDisplay
        contentType={contentType}
        guide={guide}
        structuredGuide={structuredGuide}
        category={selectedCategory}
        onReset={handleReset}
      />
      {!guide && <Instructions />}
    </div>
  )
}

export default App
