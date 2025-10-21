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

function App() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('')
  const [contentType, setContentType] = useState<ContentType>('summary')

  // Get website data and AI session
  const { websiteData, aiPromptData, loading, error } = useWebsiteInfo()
  const { session, isReady, error: aiError } = useAI()

  // Guide generation logic
  const { guide, structuredGuide, generating, generateGuide, resetGuide } = useGuideGenerator({
    session,
    aiPromptData,
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
    <div className="w-[380px] min-h-[500px] max-h-[600px] overflow-y-auto p-4 space-y-3">
        <WebsiteHeader title={websiteData.title} url={websiteData.url} />
          <AIStatusIndicator isReady={isReady} error={aiError} />

          <ContentControls
            onCategoryChange={setSelectedCategory}
            category={selectedCategory}
            disabled={!isReady || generating}
            onContentTypeChange={handleContentTypeChange}
            defaultContentType={contentType}
          />
          
          <StartGuideButton
            onClick={handleStartGuide}
            disabled={generating || !selectedCategory || !isReady}
            generating={generating}
            contentType={contentType}

          />

          {selectedCategory && !guide && (
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
