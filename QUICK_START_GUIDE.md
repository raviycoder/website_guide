# Quick Start: Personalized Guide System

## 🎯 How to Use the Personalized Guide System

### Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     WEBSITE GUIDE ASSISTANT                      │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 1: Choose Content Type                                    │
│  ┌─────────────┐  ┌──────────────────┐                         │
│  │ 📝 Summary  │  │ 🗺️ Steps Guide    │                         │
│  └─────────────┘  └──────────────────┘                         │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 2: Select User Category                                   │
│  ┌──────────┐  ┌────────────┐  ┌──────────────┐               │
│  │ 👶 Kids  │  │ 👴 Elders  │  │ 🎓 Beginners │               │
│  └──────────┘  └────────────┘  └──────────────┘               │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: Click Generate Button                                  │
│  ┌───────────────────────────────────────────────────┐         │
│  │  🚀 Generate Summary / Create Step-by-Step Guide  │         │
│  └───────────────────────────────────────────────────┘         │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  AI PROCESSING                                                   │
│  ┌────────────────────────────────────────────────┐            │
│  │ 1. Get website info (title, content, links)   │            │
│  │ 2. Select appropriate prompt template          │            │
│  │ 3. Apply category-specific instructions        │            │
│  │ 4. Generate personalized content                │            │
│  │ 5. Format response (JSON → Markdown for steps) │            │
│  └────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  DISPLAY PERSONALIZED GUIDE                                      │
│  ┌────────────────────────────────────────────────┐            │
│  │ Your Guide: 👶/👴/🎓                          │            │
│  │ ─────────────────────────────────────────────  │            │
│  │ [Personalized content based on selections]     │            │
│  │                                                 │            │
│  │ [Reset Button]                                  │            │
│  └────────────────────────────────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
```

---

## 📋 6 Personalized Guide Combinations

| Content Type | Category   | What You Get                                              |
|-------------|-----------|-----------------------------------------------------------|
| Summary     | Kids      | 🌟 Fun, simple overview with emojis                       |
| Summary     | Elders    | 📝 Clear, concise summary (no jargon)                     |
| Summary     | Beginners | 💡 Friendly overview with explanations                    |
| Steps       | Kids      | 🎮 Fun adventure with 5 simple steps + emojis             |
| Steps       | Elders    | 📋 Patient, detailed 5 steps + safety reminders           |
| Steps       | Beginners | 📚 Complete 5-step guide + tips & explanations            |

---

## 🔧 Technical Implementation

### Data Flow

```
User Selection → State Management → Prompt Selection → AI Generation → Display
     ↓                  ↓                   ↓                  ↓            ↓
[Summary/Steps]  [App.tsx state]  [use-guide-generator]  [AI Session]  [GuideDisplay]
[Kids/Elders/    [category,       [getSummaryPrompt     [Gemini Nano] [Markdown
 Beginners]       contentType]     or getStructured      [Local AI]     Renderer]
                                   GuidePrompt]
```

### Code Examples

#### Example 1: Generate Kids Summary
```typescript
// User clicks: Summary tab → Kids category → Generate
generateGuide('kids', 'summary')

// Internally calls:
const prompt = getSummaryPrompt('kids', websiteInfo)
// Returns: "Provide a fun 2-3 sentence summary for kids..."

// AI generates:
"🌟 This is Google! It helps you find anything on the internet..."
```

#### Example 2: Generate Elders Steps Guide
```typescript
// User clicks: Steps tab → Elders category → Generate
generateGuide('elders', 'steps-guide')

// Internally calls:
const prompt = getStructuredGuidePrompt('elders', websiteInfo)
// Returns structured JSON with 5 detailed steps

// AI generates JSON:
{
  "websiteName": "Google",
  "summary": "Google is a search engine...",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Locate the Search Box",
      "action": "Click on the search box...",
      "details": "The search box is safe to click...",
      "location": "Center of the page",
      "whatToExpect": "A blinking cursor will appear",
      "tips": ["You can use Tab key...", "..."]
    }
  ]
}

// Converted to markdown for display
```

---

## 🎨 Prompt Customization

### Where Prompts Are Defined

**Summary Prompts** → `src/prompts/summary-prompts.ts`
- `getSummaryPrompt()` - Brief overview
- `getQuickTipPrompt()` - Single tip
- `getMainActionsPrompt()` - Action list

**Step Prompts** → `src/prompts/step-guide-prompts.ts`
- `getStructuredGuidePrompt()` - Full JSON guide
- `parseGuideResponse()` - Parse JSON
- `guideToMarkdown()` - Convert to markdown

**Configurations** → `src/prompts/config.ts`
- `CATEGORY_CONFIG` - Tone, max steps, formatting
- `CATEGORY_INSTRUCTIONS` - Detailed instructions per category

---

## 🚀 Quick Implementation Guide

### Add New Content Type: "Quick Tips"

1. **Update Type Definition**
```typescript
// src/components/content-type.tsx
export type ContentType = 'summary' | 'steps-guide' | 'quick-tips'
```

2. **Add UI Tab**
```tsx
<TabsTrigger value="quick-tips">
  <Lightbulb size={16} />
  Quick Tips
</TabsTrigger>
```

3. **Create Prompt Function**
```typescript
// src/prompts/quick-tips-prompts.ts
export function getQuickTipsPrompt(category: UserCategory, websiteInfo: string) {
  return `Generate 5 quick tips for ${category} users...`
}
```

4. **Update Generator**
```typescript
// src/hooks/use-guide-generator.ts
if (contentType === 'quick-tips') {
  prompt = getQuickTipsPrompt(category, aiPromptData)
  result = await session.prompt(prompt)
  setGuide(result)
}
```

---

## 📊 State Management

### Key States in App.tsx
```typescript
const [selectedCategory, setSelectedCategory] = useState<Category>('')
// Controls: Kids, Elders, or Beginners

const [contentType, setContentType] = useState<ContentType>('summary')
// Controls: Summary or Steps Guide

const { guide, generating, generateGuide } = useGuideGenerator({...})
// Manages: AI generation process
```

### Props Flow
```
App.tsx
  ├─> ContentControls (category, contentType, onChange handlers)
  ├─> StartGuideButton (contentType for dynamic text)
  ├─> CategoryDescription (category + contentType for description)
  └─> GuideDisplay (guide content)
```

---

## 🎯 Best Practices

✅ **Reset guide when switching content type** - Prevents confusion
✅ **Save preferences to Chrome storage** - Better UX
✅ **Show different button text** - Clear user expectations
✅ **Provide contextual descriptions** - Help users choose
✅ **Handle JSON parsing errors** - Fallback to raw response
✅ **Use TypeScript types** - Type safety throughout

---

## 📝 Example User Journey

### Journey 1: Elder User Needs Steps
1. Opens extension on YouTube
2. Sees "Summary" and "Steps Guide" tabs
3. Clicks "Steps Guide" tab (wants detailed instructions)
4. Selects "👴 Elders" from dropdown
5. Sees description: "Patient, detailed steps with safety reminders"
6. Clicks "Create Step-by-Step Guide" button
7. AI generates 5 clear steps with locations and what to expect
8. Reads through markdown-formatted guide
9. Successfully completes first step
10. Feels confident to continue

### Journey 2: Kid User Wants Quick Overview
1. Opens extension on educational game site
2. Keeps default "Summary" tab
3. Selects "👶 Kids" from dropdown
4. Sees description: "Fun overview with easy words and emojis"
5. Clicks "Generate Summary" button
6. Gets fun 2-3 sentence summary with emojis
7. Quickly understands what the site does
8. Excited to explore!

---

## 🔗 Related Documentation

- [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) - Component architecture
- [PERSONALIZED_GUIDE_SYSTEM.md](./PERSONALIZED_GUIDE_SYSTEM.md) - Detailed system docs
- [README.md](./README.md) - Project overview
- [QUICKSTART.md](./QUICKSTART.md) - Getting started

---

## 🆘 Troubleshooting

**Q: Guide not generating?**
A: Check if category is selected and AI is ready (yellow banner should disappear)

**Q: Wrong tone in guide?**
A: Check `CATEGORY_INSTRUCTIONS` in `config.ts` - modify instructions for category

**Q: JSON parsing fails for step guides?**
A: Check AI response in console - may need to adjust prompt template

**Q: Want different number of steps?**
A: Modify `maxSteps` in `CATEGORY_CONFIG` for each category

**Q: Add custom emojis?**
A: Update formatting array in `CATEGORY_CONFIG` for kids category

---

Ready to generate personalized guides! 🚀
