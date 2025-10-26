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
│  ┌──────────┐  ┌────────────────┐  ┌──────────────┐           │
│  │ 👶 Kids  │  │ ⚡ Intermediate │  │ 🎓 Beginners │           │
│  └──────────┘  └────────────────┘  └──────────────┘           │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 3: (Steps Guide Only) Select Number of Steps             │
│  ┌──────────────────────────────────────────────┐              │
│  │  Steps: [5] [6] [7] [8] [9] [10]             │              │
│  └──────────────────────────────────────────────┘              │
└─────────────────────────────────────────────────────────────────┘
                                ↓
┌─────────────────────────────────────────────────────────────────┐
│  STEP 4: Click Generate Button                                  │
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

| Content Type | Category     | What You Get                                                  |
|-------------|-------------|---------------------------------------------------------------|
| Summary     | Kids        | 🌟 Fun, simple overview with emojis                           |
| Summary     | Intermediate| ⚡ Efficient summary with key features & shortcuts            |
| Summary     | Beginners   | 💡 Friendly overview with explanations                        |
| Steps       | Kids        | 🎮 Fun adventure with 5-10 simple steps + emojis              |
| Steps       | Intermediate| � Efficient guide with 5-10 steps + pro tips & shortcuts    |
| Steps       | Beginners   | 📚 Complete 5-10 step guide + detailed tips & explanations    |

### Category Characteristics

- **👶 Kids**: Simple language, emojis, fun tone, max 5 default steps
- **⚡ Intermediate**: Balanced & efficient, productivity tips, shortcuts, 7 default steps
- **🎓 Beginners**: Patient & detailed, thorough explanations, 6 default steps

### Step Count Customization

For **Steps Guide** only, users can override the default step count:
- Select 5-10 steps using dropdown
- AI generates exactly the requested number of steps
- Useful for quick overviews (5 steps) or detailed walkthroughs (10 steps)

---

## 🔧 Technical Implementation

### Data Flow

```
User Selection → State Management → Prompt Selection → AI Generation → Display
     ↓                  ↓                   ↓                  ↓            ↓
[Summary/Steps]  [App.tsx state]  [use-guide-generator]  [AI Session]  [GuideDisplay]
[Kids/Inter-     [category,       [getSummaryPrompt     [Gemini Nano] [Markdown
 mediate/         contentType,     or getStructured      [Local AI]     Renderer +
 Beginners]       stepCount]       GuidePrompt]                         StepsRenderer]
                                   [customStepCount]
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

#### Example 2: Generate Intermediate Steps Guide with 8 Steps
```typescript
// User selects: Steps tab → Intermediate category → 8 steps → Generate
generateGuide('intermediate', 'steps-guide')

// Internally calls:
const prompt = getStructuredGuidePrompt('intermediate', websiteInfo, 8)
// Returns structured JSON with exactly 8 efficient steps

// AI generates JSON:
{
  "websiteName": "Google",
  "summary": "Google is a powerful search engine...",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Quick Search Start",
      "action": "Click search box or press '/' shortcut",
      "details": "Efficient tip: Use '/' from anywhere on the page",
      "location": "Center of homepage",
      "whatToExpect": "Instant cursor focus with autocomplete",
      "tips": ["Pro tip: Ctrl+K also works", "Use Tab for suggestions"],
      "warnings": []
    },
    // ... 7 more steps
  ],
  "nextSteps": ["Try advanced search operators", "Explore Google Lens"]
}

// Rendered using StepsRenderer component (visual flowchart)
```

#### Example 3: Generate Beginners Steps Guide with Custom 10 Steps
```typescript
// User selects: Steps tab → Beginners category → 10 steps → Generate
generateGuide('beginners', 'steps-guide')

// Uses stepCount state (10) passed to useGuideGenerator
const { guide, structuredGuide, generating, generateGuide } = useGuideGenerator({
  session, 
  aiPromptData, 
  stepCount: 10 // User-selected count
})

// AI generates detailed 10-step guide with thorough explanations
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
// Controls: Kids, Intermediate, or Beginners

const [contentType, setContentType] = useState<ContentType>('summary')
// Controls: Summary or Steps Guide

const [stepCount, setStepCount] = useState<number>(7)
// Controls: Number of steps (5-10) for Steps Guide
// Default: 7 (matches Intermediate category default)

const { guide, structuredGuide, generating, generateGuide } = useGuideGenerator({
  session, 
  aiPromptData, 
  stepCount // Passed to AI prompt
})
// Manages: AI generation process with custom step count
```

### Props Flow
```
App.tsx
  ├─> ContentControls 
  │     ├─> category, contentType, onChange handlers
  │     ├─> stepCount, onStepCountChange
  │     └─> StepCountSelector (only shown in Steps Guide tab)
  │
  ├─> StartGuideButton (contentType for dynamic text)
  │
  ├─> CategoryDescription (category + contentType for description)
  │
  └─> GuideDisplay 
        ├─> guide content (markdown for summary)
        ├─> structuredGuide (JSON for steps)
        └─> StepsRenderer (visual flowchart for structured guides)
              ├─> Export buttons (Download PNG, Copy Text)
              └─> Theme-aware rendering (dark/light mode)
```

---

## 🎯 Best Practices

✅ **Reset guide when switching content type** - Prevents confusion
✅ **Save preferences to Chrome storage** - Better UX (category, theme, stepCount)
✅ **Show different button text** - Clear user expectations
✅ **Provide contextual descriptions** - Help users choose
✅ **Handle JSON parsing errors** - Fallback to raw response
✅ **Use TypeScript types** - Type safety throughout
✅ **Pass custom step count to prompts** - AI generates exact number requested
✅ **Show StepCountSelector only in Steps Guide tab** - Avoid UI clutter
✅ **Update step count default based on category** - Smart defaults per user type
✅ **Support dark mode in all export features** - Theme-aware PNG downloads
✅ **Use visual flowchart for structured guides** - Better comprehension than plain text

---

## 📝 Example User Journeys

### Journey 1: Intermediate User Learns Google Search Efficiently
1. Opens extension on Google.com
2. Sees "Summary" and "Steps Guide" tabs
3. Clicks "Steps Guide" tab (wants step-by-step learning)
4. Selects "⚡ Intermediate" from dropdown (already knows basics)
5. Sees default step count: 7 steps
6. Changes to 5 steps (wants quick overview)
7. Sees description: "Efficient guidance with productivity tips and shortcuts"
8. Clicks "Create Step-by-Step Guide" button
9. AI generates exactly 5 steps with shortcuts and pro tips
10. Views beautiful visual flowchart with arrows
11. Learns keyboard shortcuts (/, Ctrl+K for search)
12. Downloads PNG to save for later reference
13. Successfully uses advanced search operators

### Journey 2: Beginner User Needs Detailed Walkthrough
1. Opens extension on Amazon.com (first time shopping online)
2. Clicks "Steps Guide" tab
3. Selects "🎓 Beginners" from dropdown
4. Sees default: 6 steps, changes to 10 steps (wants maximum detail)
5. Sees description: "Detailed explanations with common tips and mistakes"
6. Clicks "Create Step-by-Step Guide" button
7. AI generates comprehensive 10-step guide
8. Each step includes:
   - What to do
   - Where to find it
   - What to expect
   - Helpful tips
   - Common warnings
9. Follows flowchart step-by-step
10. Successfully places first order
11. Clicks "Copy Text" to save in Notes app
12. Feels confident for next purchase

### Journey 3: Kid User Explores YouTube
1. Opens extension on YouTube.com
2. Keeps default "Summary" tab (wants quick understanding)
3. Selects "👶 Kids" from dropdown
4. Sees description: "Fun overview with easy words and emojis"
5. Clicks "Generate Summary" button
6. Gets fun summary: "🌟 YouTube is like a magic TV where you can watch videos!"
7. Quickly understands it's safe and fun
8. Parent approves and kid starts exploring
9. Returns later for Steps Guide to learn how to search
10. Selects 5 steps (default for Kids) and gets simple instructions

### Journey 4: Power User Customizes Experience
1. Opens extension on complex web app (Notion, Figma, etc.)
2. Switches between Summary and Steps multiple times
3. Tests all three categories to compare tones
4. Settles on Intermediate with 8 steps
5. Generates guide, sees visual flowchart
6. Enables dark mode for better readability
7. Downloads PNG with dark theme background
8. Copies text to create custom documentation
9. Shares guide with team members
10. Extension remembers category and theme preferences

---

## 🔗 Related Documentation

- [COMPONENT_STRUCTURE.md](./COMPONENT_STRUCTURE.md) - Component architecture
- [PERSONALIZED_GUIDE_SYSTEM.md](./PERSONALIZED_GUIDE_SYSTEM.md) - Detailed system docs
- [README.md](./README.md) - Project overview
- [QUICKSTART.md](./QUICKSTART.md) - Getting started

---

## 🆘 Troubleshooting

**Q: Guide not generating?**
A: Check if category is selected and AI is ready (status indicator should be green)

**Q: Wrong tone in guide?**
A: Check `CATEGORY_INSTRUCTIONS` in `src/prompts/config.ts` - modify instructions for category

**Q: JSON parsing fails for step guides?**
A: Check AI response in console - may need to adjust prompt template in `step-guide-prompts.ts`

**Q: Want different default number of steps?**
A: Modify `maxSteps` in `CATEGORY_CONFIG` for each category, or use StepCountSelector dropdown

**Q: Step count selector not showing?**
A: It only appears in "Steps Guide" tab, not in "Summary" tab

**Q: AI not respecting step count?**
A: Ensure `customStepCount` parameter is passed to `getStructuredGuidePrompt()` function

**Q: PNG download fails with oklch color error?**
A: Fixed in v1.0.0 - update to latest version (uses hex colors instead of oklch)

**Q: Want to change category icons?**
A: Update `getCategoryIcon()` function in `guide-display.tsx`:
  - Kids: 👶
  - Intermediate: ⚡
  - Beginners: 🎓

**Q: Dark mode not working in exports?**
A: Export functions are theme-aware - toggle theme first, then download PNG

**Q: Steps not rendering as flowchart?**
A: Check that `structuredGuide` is properly parsed JSON. If parsing fails, falls back to markdown

**Q: How to add 4th category?**
A: 
1. Update `UserCategory` type in `guide.types.ts`
2. Add config in `CATEGORY_CONFIG` (config.ts)
3. Add messages in `CATEGORY_CONSTANTS` (constants.ts)
4. Add option in `category-selector.tsx`
5. Update `getCategoryIcon()` in `guide-display.tsx`

---

## 🎓 Advanced Customization

### Change Step Range (e.g., 3-15 steps)

**File**: `src/components/step-count-selector.tsx`

```typescript
// Change from [5,6,7,8,9,10] to [3,4,5,...,15]
const stepOptions = Array.from({ length: 13 }, (_, i) => i + 3)
```

### Add New Content Type: "Quick Actions"

1. **Update types** (`content-type.tsx`):
```typescript
export type ContentType = 'summary' | 'steps-guide' | 'quick-actions'
```

2. **Add tab** (`content-type.tsx`):
```tsx
<TabsTrigger value="quick-actions">
  <Zap size={16} />
  Quick Actions
</TabsTrigger>
```

3. **Create prompt** (`src/prompts/quick-actions-prompts.ts`):
```typescript
export function getQuickActionsPrompt(category: UserCategory, info: string) {
  return `Generate 3 quick actions for ${category} users on this website...`
}
```

4. **Update generator** (`use-guide-generator.ts`):
```typescript
if (contentType === 'quick-actions') {
  prompt = getQuickActionsPrompt(category, aiPromptData)
}
```

### Customize Category Defaults

**File**: `src/prompts/config.ts`

```typescript
export const CATEGORY_CONFIG: Record<UserCategory, CategoryConfig> = {
  kids: {
    maxSteps: 5,        // Change to 3 for simpler guides
    tone: "simple, fun, and encouraging",
    focusAreas: ["Visual elements", "Simple clicks", "Safety"]
  },
  intermediate: {
    maxSteps: 7,        // Change to 10 for more detailed
    tone: "balanced, efficient, and practical",
    focusAreas: ["Shortcuts", "Productivity", "Pro tips"]
  },
  beginners: {
    maxSteps: 6,        // Change to 8 for more thoroughness
    tone: "clear, patient, and detailed",
    focusAreas: ["Step-by-step", "Explanations", "Common mistakes"]
  }
}
```

---

Ready to generate personalized guides! 🚀

**Quick Reference**:
- 3 User Categories: Kids (👶), Intermediate (⚡), Beginners (🎓)
- 2 Content Types: Summary (📝), Steps Guide (🗺️)
- Step Range: 5-10 steps (customizable)
- Export Options: Download PNG, Copy Text
- Theme Support: Light & Dark modes
- AI: Chrome's built-in Gemini Nano (local processing)
