# 🤖 Website Guide Assistant - Chrome Extension

> An intelligent Chrome extension powered by Chrome's built-in AI (Gemini Nano) that generates step-by-step website guidance tailored for different user categories.

[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-blue.svg)](https://github.com/raviycoder/website_guide)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](https://github.com/raviycoder/website_guide)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation--setup)
- [Usage](#-how-to-use)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Build & Deploy](#-build-for-production)
- [Components](#-key-components)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)

## 🌟 Overview

Website Guide Assistant is a cutting-edge Chrome extension that leverages Chrome's experimental built-in AI (Gemini Nano) to provide intelligent, context-aware website guidance. It analyzes the current webpage and generates customized guides based on user preferences.

### Why This Extension?

- **🎯 Personalized Learning**: Three user categories (Kids, Intermediate, Beginners) with tailored content
- **🤖 AI-Powered**: Uses Chrome's built-in Gemini Nano AI for on-device processing
- **⚡ Fast & Private**: No external API calls - everything runs locally
- **🎨 Beautiful UI**: Modern, dark mode-enabled interface with shadcn/ui components
- **📥 Export Options**: Download guides as PNG images or copy formatted text
- **🔄 Customizable**: Select 5-10 steps for step-by-step guides

## ✨ Features

### Core Features

✅ **Multiple User Modes**
- 👶 **Kids Mode**: Simple, fun explanations with emoji indicators
- ⚡ **Intermediate Mode**: Efficient guidance with productivity tips and shortcuts
- 🎓 **Beginners Mode**: Detailed explanations for first-time users

✅ **Two Guide Types**
- **Quick Summary**: Brief overview of website features and purpose
- **Step-by-Step Guide**: Detailed walkthrough with visual flowcharts (5-10 customizable steps)

✅ **Smart Content Generation**
- Analyzes webpage HTML structure, meta tags, and visible content
- Category-specific prompts optimized for different user levels
- Structured JSON output with proper formatting

✅ **Modern UI Features**
- 🌓 **Dark Mode**: Seamless light/dark theme switching with localStorage persistence
- 📱 **Responsive Design**: Works perfectly in popup and side panel views
- 🎨 **Beautiful Components**: Powered by shadcn/ui with Radix UI primitives
- ⚙️ **Step Count Selector**: Choose between 5-10 steps for guides

✅ **Export & Share**
<!-- - 📥 **Download PNG**: Export guides as high-quality PNG images (2x resolution) -->
- 📋 **Copy Text**: Copy formatted text with smart structure detection
- 🎯 **Theme-Aware**: Exports respect current theme (light/dark backgrounds)

✅ **AI Integration**
- Uses Chrome's experimental `chrome.aiOriginTrial` API
- Real-time AI status detection and user-friendly error messages
- Graceful fallbacks when AI is unavailable

## 🚀 Tech Stack

### Frontend Framework
- **React 19** - Latest React with concurrent features
- **TypeScript 5** - Strict mode with verbatimModuleSyntax for type safety
- **Vite 6** - Lightning-fast build tool with HMR

### Styling & UI
- **Tailwind CSS v4** - Latest utility-first CSS with @tailwindcss/vite plugin
- **shadcn/ui** - Accessible component library built on Radix UI
- **Radix UI** - Unstyled, accessible UI primitives
- **Lucide React** - Beautiful icon library
- **class-variance-authority** - CVA for component variants
- **tailwind-merge** - Intelligent Tailwind class merging

### Chrome Extension
- **CRXJS Vite Plugin v2** - Modern Chrome extension development with HMR
- **Manifest V3** - Latest Chrome extension manifest
- **Chrome AI API** - Built-in Gemini Nano integration

### Additional Libraries
- **html2canvas** - HTML to PNG conversion for exports
- **react-markdown** - Markdown rendering with GFM support
- **react-syntax-highlighter** - Code syntax highlighting
- **remark-gfm** - GitHub Flavored Markdown support

## 📋 Prerequisites

Before installing, ensure you have:

### Required Software
- **Node.js** v18 or higher ([Download](https://nodejs.org/))
- **npm** v9 or higher (comes with Node.js)
- **Google Chrome** v127+ with AI features enabled

### Chrome AI Setup (Critical!)

The extension requires Chrome's built-in AI (Gemini Nano). Follow these steps:

1. **Update Chrome to Canary/Dev**
   - Download [Chrome Canary](https://www.google.com/chrome/canary/) or [Chrome Dev](https://www.google.com/chrome/dev/)
   - Version must be 127 or higher

2. **Enable AI Features**
   - Navigate to `chrome://flags/#optimization-guide-on-device-model`
   - Set to **Enabled BypassPerfRequirement**
   - Navigate to `chrome://flags/#prompt-api-for-gemini-nano`
   - Set to **Enabled**

3. **Download AI Model**
   - Restart Chrome
   - Open DevTools (F12) on any page
   - Type: `await ai.languageModel.create()`
   - Wait for model download (may take a few minutes)

4. **Verify Installation**
   - After restart, run: `(await ai.languageModel.capabilities()).available`
   - Should return `"readily"` if successful

## 📦 Installation & Setup

### Method 1: Quick Start (Recommended)

All dependencies are pre-installed! Just follow these steps:

#### Step 1: Clone the Repository

```bash
git clone https://github.com/raviycoder/website_guide.git
cd website_guide
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Generate Icon Files

The project includes an SVG icon at `public/icons/icon.svg`. Generate PNG versions:

```bash
npm run generate-icons
```

This creates all required icon sizes (16x16, 32x32, 48x48, 128x128).

**Alternative: Manual Icon Creation**

If the script doesn't work, create icons manually:

- Visit [Convertio](https://convertio.co/svg-png/)
- Upload `public/icons/icon.svg`
- Convert and download in sizes: 16x16, 32x32, 48x48, 128x128
- Save them in `public/icons/` folder

Or use ImageMagick:
```bash
cd public/icons
magick convert icon.svg -resize 16x16 icon16.png
magick convert icon.svg -resize 32x32 icon32.png
magick convert icon.svg -resize 48x48 icon48.png
magick convert icon.svg -resize 128x128 icon128.png
```

#### Step 4: Start Development Server

```bash
npm run dev
```

This starts Vite with CRXJS plugin. The extension will be built in the `dist/` folder.

#### Step 5: Load Extension in Chrome

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable **Developer mode** (toggle in top-right corner)
3. Click **Load unpacked**
4. Select the `dist` folder from your project directory
5. The extension icon should appear in your Chrome toolbar

#### Step 6: Pin the Extension

- Click the puzzle icon (Extensions) in Chrome toolbar
- Find "Website Guide Assistant"
- Click the pin icon to keep it visible

### Method 2: Production Build

For production deployment:

```bash
npm run build
```

This creates an optimized production build in `dist/` folder. Load this folder in Chrome using the same steps above.

## 🎯 How to Use

### Basic Usage

1. **Navigate to Any Website**
   - Open any website you want to learn about (e.g., amazon.com, youtube.com)

2. **Open the Extension**
   - Click the Website Guide Assistant icon in your Chrome toolbar
   - Or use keyboard shortcut (if configured)

3. **Check AI Status**
   - Look at the top status indicator:
     - ✅ Green: AI is ready
     - ⚠️ Yellow/Red: Follow setup instructions

4. **Select Your Profile**
   - Choose from dropdown:
     - 👶 **Kids**: Simple, fun explanations
     - ⚡ **Intermediate**: Efficient, productivity-focused
     - 🎓 **Beginners**: Detailed, patient guidance

5. **Choose Guide Type**
   - **Summary Tab**: Quick overview of the website
   - **Steps Guide Tab**: Detailed step-by-step instructions
     - For Steps Guide, select number of steps (5-10) using the dropdown

6. **Generate Guide**
   - Click "Start Guide" button
   - Wait for AI to analyze the page (2-5 seconds)
   - View your personalized guide!

### Advanced Features

#### Export Options

Once a guide is generated:

**Download as PNG**
- Click the "Download PNG" button
- Guide is saved as high-quality image (2x resolution)
- Filename format: `websitename-guide-YYYY-MM-DD.png`
- Theme-aware: Captures current light/dark mode

**Copy as Text**
- Click the "Copy Text" button
- Smart formatting for structured guides
- Paste anywhere: Notion, Docs, Slack, etc.

#### Theme Switching

- Click the sun/moon icon in top-right
- Switches between light and dark mode
- Preference saved to localStorage
- All components support dark mode

#### Step Count Customization

- Only available in "Steps Guide" tab
- Select 5-10 steps using dropdown
- Overrides category default step count
- AI generates exactly the requested number of steps

### Content Type Details

#### Quick Summary
- Brief overview of website purpose
- Key features and functionality
- Main navigation areas
- Best for: Quick understanding, first impressions

#### Step-by-Step Guide
- Detailed walkthrough with numbered steps
- Visual flowchart renderer
- Each step includes:
  - Action to take
  - Expected result
  - Tips and warnings
  - Next suggested actions
- Best for: Learning workflows, complex tasks

## 📁 Project Structure

```
guide_ai/
├── public/
│   └── icons/                 # Extension icons (generated)
│       ├── icon.svg           # Source SVG icon
│       ├── icon16.png         # 16x16 favicon
│       ├── icon32.png         # 32x32 toolbar
│       ├── icon48.png         # 48x48 extension management
│       └── icon128.png        # 128x128 Chrome Web Store
│
├── src/
│   ├── components/
│   │   ├── ui/                # shadcn/ui base components
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── label.tsx
│   │   │   ├── scroll-area.tsx
│   │   │   ├── select.tsx
│   │   │   ├── tabs.tsx
│   │   │   └── tooltip.tsx
│   │   │
│   │   ├── ai-status-indicator.tsx      # AI availability status
│   │   ├── category-description.tsx     # Category info display
│   │   ├── category-selector.tsx        # User category dropdown
│   │   ├── content-type.tsx             # Summary/Steps tabs
│   │   ├── error-state.tsx              # Error UI component
│   │   ├── feature-info.tsx             # Feature information
│   │   ├── guide-display.tsx            # Main guide renderer
│   │   ├── instructions.tsx             # Setup instructions
│   │   ├── loading-state.tsx            # Loading spinner
│   │   ├── markdown-renderer.tsx        # Markdown display
│   │   ├── start-guide-button.tsx       # Generate guide button
│   │   ├── step-count-selector.tsx      # 5-10 steps selector
│   │   ├── steps-renderer.tsx           # Flowchart renderer
│   │   ├── summary-content.tsx          # Summary display
│   │   ├── theme-switcher.tsx           # Light/dark toggle
│   │   └── website-header.tsx           # Extension header
│   │
│   ├── content/
│   │   └── content-script.ts   # Content script for page analysis
│   │
│   ├── hooks/
│   │   ├── use-guide-generator.ts      # AI guide generation logic
│   │   └── use-website-data.ts         # Webpage data extraction
│   │
│   ├── lib/
│   │   └── utils.ts            # Utility functions (cn helper)
│   │
│   ├── prompts/
│   │   ├── config.ts           # Category configs & instructions
│   │   ├── constants.ts        # UI messages per category
│   │   ├── step-guide-prompts.ts       # Step guide prompt templates
│   │   └── summary-prompts.ts  # Summary prompt templates
│   │
│   ├── types/
│   │   ├── ai.types.ts         # AI API type definitions
│   │   ├── guide.types.ts      # Guide data structures
│   │   └── website.types.ts    # Website data types
│   │
│   ├── App.tsx                 # Main popup component
│   ├── main.tsx                # React entry point
│   └── index.css               # Global styles + Tailwind
│
├── scripts/
│   └── generate-icons.mjs      # Icon generation script
│
├── manifest.json               # Chrome extension manifest (V3)
├── vite.config.ts              # Vite + CRXJS configuration
├── tsconfig.json               # TypeScript configuration
├── components.json             # shadcn/ui configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

## 🛠️ Development

### Development Workflow with HMR

CRXJS provides seamless hot module replacement:

1. **Start Dev Server**
   ```bash
   npm run dev
   ```

2. **Load Extension Once**
   - Load `dist` folder in Chrome as described above
   - Extension automatically reloads on code changes!

3. **Make Changes**
   - Edit any `.tsx`, `.ts`, or `.css` file
   - Save the file
   - Extension reloads automatically in Chrome
   - No manual refresh needed!

### Development Tips

#### Adding New shadcn/ui Components

```bash
npx shadcn@latest add [component-name]
```

Examples:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add toast
npx shadcn@latest add dropdown-menu
npx shadcn@latest add badge
```

#### Debugging

**Popup Debugging**
- Right-click extension icon → "Inspect popup"
- Opens DevTools for the popup
- View console logs, network requests, etc.

**Content Script Debugging**
- Open DevTools on any webpage (F12)
- Content script logs appear in main console
- Check "Sources" tab for breakpoints

**Background Script Debugging**
- Go to `chrome://extensions/`
- Click "Inspect views: service worker"
- View background script logs

#### TypeScript Type Checking

```bash
npm run build
```

Runs `tsc -b` to type-check before building.

#### Linting

```bash
npm run lint
```

Runs ESLint with React hooks and React Refresh plugins.

### Project Configuration Files

#### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { crx } from '@crxjs/vite-plugin'
import tailwindcss from '@tailwindcss/vite'
import manifest from './manifest.json'
import path from 'path'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
```

#### tsconfig.json

- Strict mode enabled
- `verbatimModuleSyntax` for explicit imports
- Path alias: `@/*` → `./src/*`
- JSX: React 18+ automatic runtime

#### components.json

```json
{
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "",
    "css": "src/index.css",
    "baseColor": "zinc",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  }
}
```

## 🏗️ Build for Production

### Create Production Build

```bash
npm run build
```

This command:
1. Runs TypeScript compiler (`tsc -b`) for type checking
2. Builds optimized production bundle with Vite
3. Generates minified assets in `dist/` folder
4. Creates source maps for debugging

### Build Output

```
dist/
├── assets/          # Minified JS and CSS
├── icons/           # Extension icons
├── index.html       # Popup HTML
├── manifest.json    # Chrome manifest
└── src/
    └── content/
        └── content-script.js
```

### Publishing to Chrome Web Store

1. **Prepare Assets**
   - Create promotional images (440x280, 920x680, 1400x560)
   - Write compelling description
   - Prepare screenshots

2. **Zip the Extension**
   ```bash
   cd dist
   zip -r ../guide_ai.zip .
   ```

3. **Upload to Chrome Web Store**
   - Go to [Chrome Developer Dashboard](https://chrome.google.com/webstore/devconsole)
   - Create new item ($5 one-time fee)
   - Upload `guide_ai.zip`
   - Fill in store listing details
   - Submit for review

### Testing Production Build

```bash
npm run preview
```

Or manually:
1. Run `npm run build`
2. Load `dist` folder in Chrome
3. Test all features in production mode

## 🧩 Key Components

### Core Components

#### App.tsx
Main application component managing state:
- AI session initialization
- Category and content type selection
- Step count management
- Guide generation orchestration
- Theme persistence

#### use-guide-generator.ts
Custom hook handling AI interactions:
```typescript
interface UseGuideGeneratorProps {
  session: AISession | null
  aiPromptData: string | null
  stepCount?: number
}

// Returns:
{
  guide: string | null           // Raw AI response
  structuredGuide: Guide | null  // Parsed structured data
  generating: boolean            // Loading state
  generateGuide: (contentType, category) => Promise<void>
  resetGuide: () => void
}
```

#### use-website-data.ts
Extracts webpage information:
- Page title and meta description
- Main headings (h1, h2)
- Navigation links
- Visible text content
- Sends to content script via Chrome messaging

### UI Components

#### theme-switcher.tsx
Toggles light/dark mode:
- Uses localStorage for persistence
- Applies `.dark` class to `<html>`
- Sun/Moon icon indicator

#### steps-renderer.tsx
Visual flowchart for step guides:
- Renders structured step data
- Vertical flowchart with arrows
- Shows actions, results, tips, warnings
- Dark mode support with proper colors

#### guide-display.tsx
Main guide display with export:
- Renders summary or structured steps
- Download PNG button (html2canvas)
- Copy text button (smart formatting)
- Category-specific icons

#### step-count-selector.tsx
Dropdown for step customization:
- Only visible in Steps Guide tab
- Options: 5, 6, 7, 8, 9, 10
- Updates AI prompt dynamically

### Prompt Engineering

#### Category Configurations (prompts/config.ts)

```typescript
interface CategoryConfig {
  maxSteps: number
  tone: string
  focusAreas: string[]
}

const CATEGORY_CONFIG = {
  kids: {
    maxSteps: 5,
    tone: "simple, fun, and encouraging",
    focusAreas: ["Visual elements", "Simple clicks", "Safety"]
  },
  intermediate: {
    maxSteps: 7,
    tone: "balanced, efficient, and practical",
    focusAreas: ["Shortcuts", "Productivity", "Pro tips"]
  },
  beginners: {
    maxSteps: 6,
    tone: "clear, patient, and detailed",
    focusAreas: ["Step-by-step", "Explanations", "Common mistakes"]
  }
}
```

#### Prompt Templates

**Summary Prompts**: Brief overview with key features
**Step Guide Prompts**: Detailed JSON structure with:
- Website name and summary
- Array of steps (action, result, tips, warnings)
- Suggested next actions

## ⚙️ Configuration

### Environment Variables

No environment variables needed! Everything runs locally with Chrome AI.

### Chrome Permissions

Defined in `manifest.json`:

```json
{
  "permissions": [
    "activeTab",      // Access current tab
    "scripting",      // Inject content scripts
    "storage"         // Save user preferences
  ],
  "host_permissions": [
    "<all_urls>"      // Work on all websites
  ]
}
```

### Storage API Usage

The extension stores:
- `category`: Selected user category (kids/intermediate/beginners)
- `theme`: Current theme (light/dark)

Access via:
```typescript
// Save
await chrome.storage.local.set({ category: 'intermediate' })

// Load
const { category } = await chrome.storage.local.get('category')
```

### Customizing Categories

To add/modify categories, edit:

1. **src/prompts/config.ts**: Add category config
2. **src/prompts/constants.ts**: Add UI messages
3. **src/types/guide.types.ts**: Update `UserCategory` type
4. **src/components/category-selector.tsx**: Add select option

## 🐛 Troubleshooting

### Common Issues

#### ❌ "AI is not available"

**Symptoms**: Red status indicator, error message

**Solutions**:
1. Verify Chrome version (127+)
2. Check `chrome://flags` settings:
   - `#optimization-guide-on-device-model` → Enabled BypassPerfRequirement
   - `#prompt-api-for-gemini-nano` → Enabled
3. Restart Chrome after changing flags
4. Download AI model:
   ```javascript
   // In DevTools console:
   await ai.languageModel.create()
   ```
5. Wait 5-10 minutes for download
6. Verify: `(await ai.languageModel.capabilities()).available` returns `"readily"`

#### ❌ Extension Not Loading

**Symptoms**: Extension not appearing, load errors

**Solutions**:
1. Ensure `npm run dev` is running
2. Check `dist` folder exists
3. Enable Developer mode in `chrome://extensions/`
4. Look for error messages in Extensions page
5. Check console for icon file errors

#### ❌ Icons Missing

**Symptoms**: Generic puzzle piece icon, manifest errors

**Solutions**:
1. Run `npm run generate-icons`
2. Verify icon files exist in `public/icons/`:
   - icon16.png, icon32.png, icon48.png, icon128.png
3. Rebuild extension: `npm run dev`
4. Reload extension in Chrome

#### ❌ HMR Not Working

**Symptoms**: Changes not reflecting, manual reload needed

**Solutions**:
1. Restart dev server: `Ctrl+C` then `npm run dev`
2. Hard reload extension:
   - Go to `chrome://extensions/`
   - Click reload icon on extension card
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Check terminal for Vite errors

#### ❌ PNG Download Fails

**Symptoms**: "Failed to download image" error, oklch color error

**Solutions**:
- Issue is fixed in v1.0.0 with hex color conversion
- Ensure html2canvas is installed: `npm install html2canvas`
- Check browser console for detailed errors
- Try in incognito mode to rule out other extensions

#### ❌ Content Script Not Injecting

**Symptoms**: "Unable to analyze page" error

**Solutions**:
1. Check `manifest.json` has content_scripts defined
2. Reload extension after code changes
3. Navigate to new page (content scripts run on page load)
4. Check `chrome://extensions/` for errors
5. Verify file path in manifest matches actual file

#### ❌ TypeScript Errors

**Symptoms**: Red underlines, build failures

**Solutions**:
1. Run `npm install` to ensure all types are installed
2. Check `tsconfig.json` has correct paths
3. Restart VS Code TypeScript server: `Cmd+Shift+P` → "TypeScript: Restart TS Server"
4. Clear cache: Delete `node_modules` and `package-lock.json`, then `npm install`

### Debug Mode

Enable detailed logging:

```typescript
// In use-guide-generator.ts
const DEBUG = true

if (DEBUG) {
  console.log('AI Response:', result)
  console.log('Parsed Guide:', structuredGuide)
}
```

### Getting Help

- **GitHub Issues**: [Report bugs](https://github.com/raviycoder/website_guide/issues)
- **Discussions**: [Ask questions](https://github.com/raviycoder/website_guide/discussions)
- **Chrome AI Docs**: [Chrome for Developers](https://developer.chrome.com/docs/ai/built-in-apis)

### Getting Help

- **GitHub Issues**: [Report bugs](https://github.com/raviycoder/website_guide/issues)
- **Discussions**: [Ask questions](https://github.com/raviycoder/website_guide/discussions)
- **Chrome AI Docs**: [Chrome for Developers](https://developer.chrome.com/docs/ai/built-in-apis)

## 📊 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **Development** | `npm run dev` | Start Vite dev server with HMR and CRXJS |
| **Build** | `npm run build` | Type-check with TSC and build production bundle |
| **Preview** | `npm run preview` | Preview production build locally |
| **Lint** | `npm run lint` | Run ESLint with React hooks rules |
| **Generate Icons** | `npm run generate-icons` | Create PNG icons from SVG source |

## 🔌 Chrome APIs Used

### Storage API
```typescript
// Store user preferences
chrome.storage.local.set({ category: 'intermediate', theme: 'dark' })

// Retrieve preferences
const { category, theme } = await chrome.storage.local.get(['category', 'theme'])
```

**Used for**: Saving user category, theme preference, guide history

### Tabs API
```typescript
// Get current active tab
const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })

// Send message to content script
chrome.tabs.sendMessage(tab.id, { action: 'analyzeWebsite' })
```

**Used for**: Identifying current webpage, communicating with content scripts

### Scripting API
```typescript
// Inject content script dynamically
await chrome.scripting.executeScript({
  target: { tabId: tab.id },
  files: ['content-script.js']
})
```

**Used for**: Runtime content script injection (if needed)

### AI Origin Trial API
```typescript
// Create AI session
const session = await ai.languageModel.create()

// Generate guide
const result = await session.prompt(promptText)

// Check capabilities
const capabilities = await ai.languageModel.capabilities()
```

**Used for**: On-device AI guide generation with Gemini Nano

## � Roadmap & Future Features

### Version 1.1 (Planned)
- [ ] Element highlighting on webpage
- [ ] Interactive tutorials with click-through
- [ ] Guide history and bookmarks
- [ ] Multiple language support
- [ ] Voice narration option

### Version 1.2 (Planned)
- [ ] Video tutorial integration
- [ ] Progress tracking and analytics
- [ ] Keyboard shortcuts customization
- [ ] Export to PDF format
- [ ] Chrome Web Store publication

### Version 2.0 (Ideas)
- [ ] Collaborative guides (share with friends)
- [ ] Community-contributed guides
- [ ] Screen recording integration
- [ ] Mobile companion app
- [ ] Browser sync across devices

## 🤝 Contributing

We welcome contributions! Here's how to get started:

### Development Setup

1. **Fork the Repository**
   ```bash
   # Click "Fork" on GitHub, then:
   git clone https://github.com/YOUR_USERNAME/website_guide.git
   cd website_guide
   git remote add upstream https://github.com/raviycoder/website_guide.git
   ```

2. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Follow existing code style
   - Add comments for complex logic
   - Update TypeScript types as needed

4. **Test Thoroughly**
   - Test in light and dark modes
   - Test all three user categories
   - Test on multiple websites
   - Check for console errors

5. **Commit with Conventional Commits**
   ```bash
   git commit -m "feat: add voice narration option"
   git commit -m "fix: resolve PNG download issue"
   git commit -m "docs: update installation instructions"
   ```

6. **Push and Create PR**
   ```bash
   git push origin feature/your-feature-name
   ```
   Then create a Pull Request on GitHub

### Contribution Guidelines

#### Code Style
- Use TypeScript strict mode
- Follow existing naming conventions
- Use functional components with hooks
- Add prop types and interfaces
- Comment complex algorithms

#### Component Guidelines
- Keep components small and focused
- Use composition over inheritance
- Extract reusable logic to hooks
- Support dark mode in all new components
- Follow shadcn/ui patterns

#### Commit Message Format
```
<type>(<scope>): <subject>

<body>

<footer>
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`

Examples:
- `feat(export): add PDF export option`
- `fix(ai): handle AI timeout gracefully`
- `docs(readme): update troubleshooting section`
- `style(theme): improve dark mode contrast`

### Areas We Need Help

- 🎨 **UI/UX Design**: Improve visual design, animations
- 📝 **Documentation**: Tutorials, video guides, translations
- 🧪 **Testing**: Write tests, report bugs, edge case testing
- 🌍 **Localization**: Translate to other languages
- 💡 **Features**: Implement roadmap features
- 🐛 **Bug Fixes**: Resolve GitHub issues

## 📜 License

MIT License

Copyright (c) 2025 Ravi Yadav

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## 🙏 Acknowledgments

- **Chrome AI Team** - For building Gemini Nano and prompt API
- **shadcn** - For the amazing UI component library
- **Radix UI** - For accessible primitives
- **Vite Team** - For lightning-fast build tooling
- **CRXJS Team** - For seamless Chrome extension development
- **Tailwind Labs** - For Tailwind CSS v4
- **Lucide** - For beautiful open-source icons

## 📞 Contact & Support

- **Author**: Ravi Yadav
- **GitHub**: [@raviycoder](https://github.com/raviycoder)
- **Repository**: [website_guide](https://github.com/raviycoder/website_guide)
- **Issues**: [Bug Reports](https://github.com/raviycoder/website_guide/issues)
- **Discussions**: [Q&A Forum](https://github.com/raviycoder/website_guide/discussions)

## ⭐ Show Your Support

If you find this project helpful, please consider:
- ⭐ **Starring the repository** on GitHub
- 🐛 **Reporting bugs** you encounter
- 💡 **Suggesting features** you'd like to see
- 🤝 **Contributing code** or documentation
- 📢 **Sharing** with others who might find it useful

---

<div align="center">

**Made with ❤️ by Ravi Yadav**

Built with React • TypeScript • Chrome AI • Tailwind CSS

[Report Bug](https://github.com/raviycoder/website_guide/issues) · [Request Feature](https://github.com/raviycoder/website_guide/issues) · [Documentation](https://github.com/raviycoder/website_guide/wiki)

</div>

---

**Happy coding! 🚀**

*Last updated: October 26, 2025*
