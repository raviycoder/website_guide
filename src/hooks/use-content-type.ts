// src/hooks/use-content-type.ts
import { useState } from 'react'

export type ContentType = 'summary' | 'steps-guide'

export function useContentType(defaultType: ContentType = 'summary') {
  const [contentType, setContentType] = useState<ContentType>(defaultType)

  return {
    contentType,
    setContentType,
    isSummary: contentType === 'summary',
    isStepsGuide: contentType === 'steps-guide',
  }
}
