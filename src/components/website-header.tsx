// src/components/website-header.tsx
import FeatureInfo from './feature-info'
import ThemeSwitcher from './theme-switcher'

import { RotateCw } from 'lucide-react'

interface WebsiteHeaderProps {
  title: string
  url: string
  onReload: () => void
}

export function WebsiteHeader({ title, url, onReload }: WebsiteHeaderProps) {
  return (
    <div className="border-b">
      <div className="flex justify-evenly items-center">
        {' '}
        <div className="text-xl font-bold inline-flex mr-1">
          <img src="/icons/icon32.png" alt="Icon" className="w-8 h-8 mr-2" />
          Website Guide Assistant
          <FeatureInfo className="mt-1.5 ml-1">
            <div className="text-sm text-gray-900">
              This assistant generates a step-by-step guide to help users navigate and use the
              current website effectively based on the selected user category.
            </div>
          </FeatureInfo>
        </div>
        <ThemeSwitcher />
      </div>
      <div className="flex items-center gap-2 px-2 pb-2">
        {' '}
        {/* Show current website */}
        <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs grow min-w-0">
          <p className="font-semibold truncate">{title}</p>
          <p className="text-gray-600 dark:text-gray-400 truncate">{url}</p>
        </div>
        {/* reload button for current website */}
        <div className="shrink-0">
          <button
            onClick={onReload}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
            title="Reload website info"
          >
            <RotateCw size={16} className="text-gray-500" />
          </button>
        </div>
      </div>
    </div>
  )
}
