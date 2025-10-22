// src/components/website-header.tsx
import FeatureInfo from './feature-info'
import ThemeSwitcher from './theme-switcher'

interface WebsiteHeaderProps {
  title: string
  url: string
}

export function WebsiteHeader({ title, url }: WebsiteHeaderProps) {
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

      {/* Show current website */}
      <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-950 rounded text-xs">
        <p className="font-semibold truncate">{title}</p>
        <p className="text-gray-600 dark:text-gray-400 truncate">{url}</p>
      </div>
    </div>
  )
}
