// src/components/website-header.tsx
import { CardHeader, CardTitle } from './ui/card'
import FeatureInfo from './feature-info'

interface WebsiteHeaderProps {
  title: string
  url: string
}

export function WebsiteHeader({ title, url }: WebsiteHeaderProps) {
  return (
    <CardHeader>
      <CardTitle className="text-2xl font-bold inline-flex">
        Website Guide Assistant
        <FeatureInfo className="mt-2 ml-1">
          <div className="text-sm text-gray-900">
            This assistant generates a step-by-step guide to help users navigate and use the
            current website effectively based on the selected user category.
          </div>
        </FeatureInfo>
      </CardTitle>
      {/* Show current website */}
      <div className="mt-2 p-2 bg-blue-50 rounded text-xs">
        <p className="font-semibold truncate">{title}</p>
        <p className="text-gray-600 truncate">{url}</p>
      </div>
    </CardHeader>
  )
}
