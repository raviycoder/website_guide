// src/components/category-description.tsx
import type { Category } from './category-selector'
import type { ContentType } from './content-type'

interface CategoryDescriptionProps {
  category: Category
  contentType?: ContentType
}

export function CategoryDescription({ category, contentType = 'summary' }: CategoryDescriptionProps) {
  if (!category) return null

  const summaryDescriptions = {
    kids: '👶 Kids Mode: Simple, fun overview with easy words and emojis',
    intermediate: '⚡ Intermediate Mode: Efficient summary with key insights and pro tips',
    beginners: '🎓 Beginners Mode: Friendly overview explaining key features',
  }

  const stepsDescriptions = {
    kids: '👶 Kids Mode: Fun step-by-step adventure with emojis and encouragement',
    intermediate: '⚡ Intermediate Mode: Streamlined steps with productivity shortcuts',
    beginners: '🎓 Beginners Mode: Complete guide with tips and explanations',
  }

  const descriptions = contentType === 'summary' || contentType === 'quick-guide' ? summaryDescriptions : stepsDescriptions

  return (
    <div className="mt-4 p-4 bg-secondary rounded-lg">
      <h3 className="font-semibold text-sm mb-2">Selected Mode:</h3>
      <p className="text-sm text-muted-foreground">{descriptions[category]}</p>
    </div>
  )
}
