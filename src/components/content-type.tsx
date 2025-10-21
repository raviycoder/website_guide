import { NotepadText, Route } from 'lucide-react'

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { CategorySelector, type Category } from './category-selector'

export type ContentType = 'summary' | 'steps-guide' | 'quick-guide'

interface ContentControlsProps {
  category: Category
  disabled: boolean
  onCategoryChange: (category: Category) => void
  onContentTypeChange?: (contentType: ContentType) => void
  defaultContentType?: ContentType
}

export default function ContentControls({
  category,
  onCategoryChange,
  disabled,
  onContentTypeChange,
  defaultContentType = 'summary',
}: ContentControlsProps) {
  const handleTabChange = (value: string) => {
    if (onContentTypeChange) {
      onContentTypeChange(value as ContentType)
    }
  }

  return (
    <Tabs defaultValue={defaultContentType} onValueChange={handleTabChange} className="w-full">
      <ScrollArea>
        <TabsList className="mb-3 gap-1 bg-transparent flex items-center">
          <TabsTrigger
            disabled={disabled}
            value="summary"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            <NotepadText className="-ms-0.5 me-1.5" size={16} aria-hidden="true" />
            Summary
          </TabsTrigger>
          <TabsTrigger
            disabled={disabled}
            value="steps-guide"
            className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-none"
          >
            <Route className="-ms-0.5 me-1.5" size={16} aria-hidden="true" />
            Steps Guide
          </TabsTrigger>
        </TabsList>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <TabsContent value="summary">
        <CategorySelector
          selectedCategory={category}
          onCategoryChange={onCategoryChange}
          disabled={disabled}
          onContentTypeChange={onContentTypeChange}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Get a brief overview of this website tailored to your experience level
        </p>
      </TabsContent>
      <TabsContent value="steps-guide">
        <CategorySelector
          selectedCategory={category}
          onCategoryChange={onCategoryChange}
          disabled={disabled}
          showButton={false}
        />
        <p className="text-xs text-muted-foreground mt-2">
          Get detailed step-by-step instructions with tips and guidance
        </p>
      </TabsContent>
    </Tabs>
  )
}
