// src/components/guide-display.tsx
import { Button } from './ui/button'
import { MarkdownRenderer } from './markdown-renderer'
import type { Category } from './category-selector'
import StepsRenderer from './steps-renderer'
import type { WebsiteGuide } from '@/types/guide.types'
import {Copy, Check } from 'lucide-react'
import { useState, useRef } from 'react'
// import html2canvas from 'html2canvas'

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
  const [copied, setCopied] = useState(false)
  // const [downloading, setDownloading] = useState(false)
  const guideContentRef = useRef<HTMLDivElement>(null)
  const guideContainerRef = useRef<HTMLDivElement>(null)

  if (!guide) return null

  const handleCopyText = async () => {
    try {
      let textToCopy = guide
      
      // If structured guide, format it nicely
      if (structuredGuide) {
        textToCopy = `${structuredGuide.websiteName}\n\n${structuredGuide.summary}\n\n`
        textToCopy += `⏱️ ${structuredGuide.metadata.estimatedTime} | 📊 ${structuredGuide.metadata.difficulty} | 📝 ${structuredGuide.metadata.totalSteps} steps\n\n`
        textToCopy += `STEPS:\n\n`
        
        structuredGuide.steps.forEach((step, idx) => {
          textToCopy += `${idx + 1}. ${step.title}\n`
          textToCopy += `   Action: ${step.action}\n`
          textToCopy += `   Details: ${step.details}\n`
          if (step.location) textToCopy += `   Location: ${step.location}\n`
          if (step.whatToExpect) textToCopy += `   What to Expect: ${step.whatToExpect}\n`
          if (step.tips && step.tips.length > 0) {
            textToCopy += `   Tips: ${step.tips.join(', ')}\n`
          }
          textToCopy += `\n`
        })
        
        textToCopy += `\nNEXT STEPS:\n`
        textToCopy += `${structuredGuide.nextSteps.title}\n`
        structuredGuide.nextSteps.suggestions.forEach(suggestion => {
          textToCopy += `• ${suggestion}\n`
        })
        textToCopy += `\n${structuredGuide.nextSteps.encouragement}`
      }
      
      await navigator.clipboard.writeText(textToCopy)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text:', err)
    }
  }

  // const handleDownloadPNG = async () => {
  //   const targetElement = guideContainerRef.current
  //   if (!targetElement) {
  //     alert('Unable to capture guide. Please try again.')
  //     return
  //   }
    
  //   setDownloading(true)
  //   try {
  //     // Store original styles
  //     const originalMaxHeight = guideContentRef.current?.style.maxHeight
  //     const originalOverflow = guideContentRef.current?.style.overflow
      
  //     // Temporarily remove height restrictions for full capture
  //     if (guideContentRef.current) {
  //       guideContentRef.current.style.maxHeight = 'none'
  //       guideContentRef.current.style.overflow = 'visible'
  //     }
      
  //     // Wait a bit for styles to apply
  //     await new Promise(resolve => setTimeout(resolve, 100))
      
  //     // Get the current theme
  //     const isDark = document.documentElement.classList.contains('dark')
      
  //     const canvas = await html2canvas(targetElement, {
  //       backgroundColor: isDark ? '#064e3b' : '#f0fdf4', // Using standard hex colors
  //       scale: 2,
  //       logging: false,
  //       useCORS: true,
  //       allowTaint: true,
  //       width: targetElement.offsetWidth,
  //       height: targetElement.scrollHeight,
  //       ignoreElements: (element) => {
  //         // Skip any elements that might cause issues
  //         return element.tagName === 'SCRIPT' || element.tagName === 'STYLE'
  //       }
  //     })
      
  //     // Restore original styles
  //     if (guideContentRef.current) {
  //       guideContentRef.current.style.maxHeight = originalMaxHeight || ''
  //       guideContentRef.current.style.overflow = originalOverflow || ''
  //     }
      
  //     // Convert canvas to blob
  //     canvas.toBlob((blob) => {
  //       if (!blob) {
  //         console.error('Failed to create blob')
  //         alert('Failed to create image. Please try again.')
  //         setDownloading(false)
  //         return
  //       }
        
  //       // Create download link
  //       const url = URL.createObjectURL(blob)
  //       const link = document.createElement('a')
  //       const timestamp = new Date().toISOString().slice(0, 10)
  //       const filename = structuredGuide 
  //         ? `${structuredGuide.websiteName.replace(/\s+/g, '-')}-guide-${timestamp}.png`
  //         : `website-guide-${timestamp}.png`
        
  //       link.download = filename
  //       link.href = url
  //       document.body.appendChild(link)
  //       link.click()
  //       document.body.removeChild(link)
        
  //       // Clean up
  //       setTimeout(() => URL.revokeObjectURL(url), 100)
  //       setDownloading(false)
  //     }, 'image/png')
  //   } catch (err) {
  //     console.error('Failed to download PNG:', err)
  //     alert(`Failed to download image: ${err instanceof Error ? err.message : 'Unknown error'}`)
  //     setDownloading(false)
      
  //     // Restore styles even if error occurs
  //     if (guideContentRef.current) {
  //       guideContentRef.current.style.maxHeight = ''
  //       guideContentRef.current.style.overflow = ''
  //     }
  //   }
  // }

  const getCategoryIcon = () => {
    switch (category) {
      case 'kids':
        return '👶'
      case 'intermediate':
        return '⚡'
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
    <div ref={guideContainerRef} className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg dark:bg-green-950 dark:border-green-800">
      <h3 className="font-semibold text-sm mb-3 flex items-center gap-2">
        <span>{getCategoryIcon()}</span>
        <span>Your Guide:</span>
      </h3>
      {/* Render based on content type and data availability */}
      <div ref={guideContentRef} className="text-sm max-h-[300px] overflow-y-auto pr-2">
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

      {/* Action Buttons */}
      <div className="mt-4 flex gap-2">
        {/* <Button
          variant="outline"
          size="sm"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleDownloadPNG}
          disabled={downloading}
        >
          <Download size={16} />
          {downloading ? 'Downloading...' : 'Download PNG'}
        </Button> */}
        <Button
          variant="outline"
          size="sm"
          className="flex-1 flex items-center justify-center gap-2"
          onClick={handleCopyText}
        >
          {copied ? (
            <>
              <Check size={16} />
              Copied!
            </>
          ) : (
            <>
              <Copy size={16} />
              Copy Text
            </>
          )}
        </Button>
      </div>

      <Button variant="outline" size="sm" className="mt-2 w-full" onClick={onReset}>
        Create New Guide
      </Button>
      
    </div>
  )
}