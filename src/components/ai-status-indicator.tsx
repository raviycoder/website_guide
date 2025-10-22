// src/components/ai-status-indicator.tsx
interface AIStatusIndicatorProps {
  isReady: boolean
  error?: string | null
}

export function AIStatusIndicator({ isReady, error }: AIStatusIndicatorProps) {
  if (isReady) return null

  return (
    <div className="p-3 bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded text-sm">
      <p className="font-semibold">⏳ Loading AI model...</p>
      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
        {error
          ? 'AI not available. Please check setup.'
          : 'Please wait while we prepare the AI assistant.'}
      </p>
    </div>
  )
}
