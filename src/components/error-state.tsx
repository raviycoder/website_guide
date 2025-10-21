// src/components/error-state.tsx
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'

interface ErrorStateProps {
  error?: string | null
}

export function ErrorState({ error }: ErrorStateProps) {
  return (
    <div className="w-[380px] min-h-[500px] p-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-red-500">Error</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600">{error || 'Could not load page data'}</p>
          <p className="text-xs text-gray-500 mt-2">
            Make sure you're on a regular website (not chrome:// pages)
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
