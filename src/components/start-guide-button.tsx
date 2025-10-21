// src/components/start-guide-button.tsx
import { Button } from './ui/button'
import { Spinner } from './ui/spinner'
import type { ContentType } from './content-type'

interface StartGuideButtonProps {
  onClick: () => void
  disabled: boolean
  generating: boolean
  contentType?: ContentType
}

export function StartGuideButton({ 
  onClick, 
  disabled, 
  generating,
  contentType = 'summary'
}: StartGuideButtonProps) {
  const getButtonText = () => {
    if (generating) {
      return contentType === 'summary' || contentType === 'quick-guide' 
        ? 'Generating...' 
        : 'Take a moment to create your guide...'
    }
    return contentType === 'summary' || contentType === 'quick-guide' 
      ? 'Generate Summary' 
      : 'Create Step-by-Step Guide'
  }

  return (
    <Button onClick={onClick} disabled={disabled} className="w-full">
      {generating ? (
        <>
          <Spinner />
          {getButtonText()}
        </>
      ) : (
        getButtonText()
      )}
    </Button>
  )
}
