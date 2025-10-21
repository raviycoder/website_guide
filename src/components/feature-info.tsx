import { BadgeInfo } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

export default function FeatureInfo({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn(className)}>
      <TooltipProvider delayDuration={0}>
        <Tooltip>
          <TooltipTrigger asChild>
            <BadgeInfo size={20} />
          </TooltipTrigger>
          <TooltipContent className="dark py-3 bg-gray-50 border border-gray-200 w-[300px]">
            {children ? (
              <div className="text-sm text-gray-900">{children}</div>
            ) : (
              <div className="text-sm text-gray-900">No additional information available</div>
            )}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
