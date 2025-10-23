// src/components/step-count-selector.tsx
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

interface StepCountSelectorProps {
  selectedStepCount: number
  onStepCountChange: (count: number) => void
  disabled?: boolean
}

export function StepCountSelector({
  selectedStepCount,
  onStepCountChange,
  disabled,
}: StepCountSelectorProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor="step-count" className="text-sm">Steps to Generate</Label>
      <Select
        value={selectedStepCount.toString()}
        onValueChange={(value) => onStepCountChange(parseInt(value))}
        disabled={disabled}
      >
        <SelectTrigger id="step-count" className="w-full">
          <SelectValue placeholder="Select steps" />
        </SelectTrigger>
        <SelectContent className="bg-gray-50 dark:bg-slate-900">
          {[5, 6, 7, 8, 9, 10].map((num) => (
            <SelectItem key={num} value={num.toString()}>
              <div className="flex items-center gap-2">
                <span>{num} Steps</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
