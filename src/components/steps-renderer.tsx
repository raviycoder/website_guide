import type { WebsiteGuide } from '@/types/guide.types'
import React from 'react'
import FeatureInfo from './feature-info'
import { ScrollArea } from './ui/scroll-area'

function StepsRenderer({ guide }: { guide: WebsiteGuide }) {
  console.log('Rendering StepsRenderer with guide:', guide)

  // Validation: Ensure guide has required data
  if (!guide || !guide.steps || guide.steps.length === 0) {
    return (
      <div className="text-center text-red-500 p-4">
        <p>⚠️ Unable to display guide. Invalid data received.</p>
      </div>
    )
  }

  return (
    <div className="steps-guide">
      {/* Website Info */}
      <div className="mb-4">
        <h2 className="text-xl font-bold mb-2">{guide.websiteName}</h2>
        <p className="text-gray-700 mb-3">{guide.summary}</p>
        <div className="flex gap-4 text-xs text-gray-600">
          <span>⏱️ {guide.metadata.estimatedTime}</span>
          <span>📊 {guide.metadata.difficulty}</span>
          <span>📝 {guide.metadata.totalSteps} steps</span>
        </div>
      </div>

      {/* Steps Flow */}
      <div className="flex flex-col items-center gap-0 mt-5">
        {guide.steps.map((step, idx) => (
          <React.Fragment key={idx}>
            <div
              className="rounded-lg border-2 border-black px-9 py-4 bg-white shadow-sm relative text-lg font-normal text-center min-w-[150px] max-w-[250px]"
              style={{ fontFamily: 'Comic Sans MS, Comic Sans, cursive' }} // For sketchy look
            >
              {step.title}
              <FeatureInfo className=' absolute top-1 right-1'>
                <ScrollArea className="h-40 w-full rounded-md border">
                  <div className="text-left">
                    <p className="mb-2">
                      <strong>Action:</strong> {step.action}
                    </p>
                    <p className="mb-2">
                      <strong>Details:</strong> {step.details}
                    </p>
                    {step.location && (
                      <p className="mb-2">
                        <strong>Location:</strong> {step.location}
                      </p>
                    )}
                    {step.whatToExpect && (
                      <p className="mb-2">
                        <strong>What to Expect:</strong> {step.whatToExpect}
                      </p>
                    )}
                    {step.tips && step.tips.length > 0 && (
                      <div className="mb-2">
                        <strong>Tips:</strong>
                        <ul className="list-disc list-inside ml-5">
                          {step.tips.map((tip, tipIdx) => (
                            <li key={tipIdx}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </FeatureInfo>
            </div>
            {idx < guide.steps.length - 1 && <DownArrow />}
          </React.Fragment>
        ))}
      </div>

      {/* Next Steps Section */}
      <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
        <h3 className="font-semibold text-base mb-3 flex items-center gap-2">
          {guide.nextSteps.title}
        </h3>
        <ul className="list-disc list-inside space-y-1 text-sm mb-3">
          {guide.nextSteps.suggestions.map((suggestion, idx) => (
            <li key={idx}>{suggestion}</li>
          ))}
        </ul>
        <p className="text-sm font-medium text-green-700">{guide.nextSteps.encouragement}</p>
      </div>
    </div>
  )
}

// Simple arrow SVG component
function DownArrow() {
  return (
    <svg height="32" width="24" className="mx-auto" viewBox="0 0 24 32">
      <line x1="12" y1="0" x2="12" y2="28" stroke="#222" strokeWidth="2" />
      <polyline points="6,22 12,30 18,22" fill="none" stroke="#222" strokeWidth="2" />
    </svg>
  )
}

export default StepsRenderer
