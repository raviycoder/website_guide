// src/components/category-selector.tsx
import { useState } from 'react'
import { Button } from './ui/button'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'

export type Category = 'kids' | 'elders' | 'beginners' | ''

interface CategorySelectorProps {
  selectedCategory: Category
  onCategoryChange: (category: Category) => void
  disabled?: boolean
  onContentTypeChange?: (contentType: 'summary' | 'steps-guide' | 'quick-guide') => void
  showButton?: boolean
}

export function CategorySelector({
  selectedCategory,
  onCategoryChange,
  disabled,
  onContentTypeChange,
  showButton = true,
}: CategorySelectorProps) {
  const [quickGuideSelected, setQuickGuideSelected] = useState(false)
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Select User Category</Label>
      <div className="flex w-full">
        {' '}
        <Select
          value={selectedCategory}
          onValueChange={(value) => onCategoryChange(value as Category)}
          disabled={disabled}
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Choose a category" />
          </SelectTrigger>
          <SelectContent className="bg-amber-50">
            <SelectItem value="kids">
              <div className="flex items-center gap-2">
                <span className="text-lg">👶</span>
                <span>Kids</span>
              </div>
            </SelectItem>
            <SelectItem value="elders">
              <div className="flex items-center gap-2">
                <span className="text-lg">👴</span>
                <span>Elders</span>
              </div>
            </SelectItem>
            <SelectItem value="beginners">
              <div className="flex items-center gap-2">
                <span className="text-lg">🎓</span>
                <span>Beginners</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        {showButton && (
          <Button
            disabled={disabled}
            onClick={() => {
              onContentTypeChange?.('quick-guide')
              setQuickGuideSelected(!quickGuideSelected)
              if (quickGuideSelected === true) {
                onContentTypeChange?.('summary')
              }
            }}
            variant="outline"
            className={`max-w-20 ml-2 rounded-full ${
              quickGuideSelected
                ? 'bg-gray-900 text-primary-foreground hover:bg-gray-800 hover:text-gray-200'
                : ''
            }`}
          >
            Quick
          </Button>
        )}
      </div>
    </div>
  )
}
