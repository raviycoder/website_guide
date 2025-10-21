# Website Guide Assistant - Chrome Extension

An AI-powered Chrome extension that provides step-by-step website guidance for different user categories (Kids, Elders, Beginners).

## 🚀 Tech Stack

- **Vite** + **React 18** - Modern build tool and UI library
- **TypeScript** (strict mode) - Type-safe development
- **Tailwind CSS v4** - Utility-first CSS framework with @tailwindcss/vite plugin
- **shadcn/ui** - Beautiful, accessible component library
- **CRXJS** - Chrome Extension development with HMR support
- **Manifest V3** - Latest Chrome extension manifest version

## 📦 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm (comes with Node.js)
- Google Chrome browser

### Quick Start

All dependencies are already installed! Just follow these steps:

1. **Create PNG icons (required for Chrome extension):**
   
   The project includes an SVG icon template at `public/icons/icon.svg`. You need to create PNG versions:
   
   - `public/icons/icon16.png` (16x16 pixels)
   - `public/icons/icon48.png` (48x48 pixels)
   - `public/icons/icon128.png` (128x128 pixels)
   
   **Quick method using online tools:**
   - Visit https://convertio.co/svg-png/
   - Upload `public/icons/icon.svg`
   - Convert to PNG and download in 16x16, 48x48, and 128x128 sizes
   
   Or use ImageMagick (if installed):
   ```bash
   cd public/icons
   magick convert icon.svg -resize 16x16 icon16.png
   magick convert icon.svg -resize 48x48 icon48.png
   magick convert icon.svg -resize 128x128 icon128.png
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Load extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable **Developer mode** (toggle in top right)
   - Click **Load unpacked**
   - Select the `dist` folder from your project directory
   - The extension icon should appear in your Chrome toolbar

## 🛠️ Development

### Development with HMR

With CRXJS, you get hot module replacement:
- Make changes to your code
- Save the file
- The extension automatically reloads in Chrome
- No manual reload needed!

### Project Structure

```
guide_ai/
├── public/
│   └── icons/           # Extension icons (16x16, 48x48, 128x128)
├── src/
│   ├── components/
│   │   └── ui/          # shadcn/ui components
│   │       ├── button.tsx
│   │       ├── card.tsx
│   │       ├── input.tsx
│   │       ├── label.tsx
│   │       └── select.tsx
│   ├── lib/
│   │   └── utils.ts     # Utility functions (cn helper)
│   ├── App.tsx          # Main popup component
│   ├── main.tsx         # Entry point
│   └── index.css        # Tailwind CSS imports & custom styles
├── manifest.json        # Chrome extension manifest (Manifest V3)
├── vite.config.ts       # Vite configuration with CRXJS & Tailwind
├── tsconfig.json        # TypeScript configuration
├── components.json      # shadcn/ui configuration
└── package.json         # Dependencies and scripts
```

## 🏗️ Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

## 🎨 Features

### Current Features

- ✅ Category selection (Kids, Elders, Beginners)
- ✅ Beautiful, responsive UI with shadcn/ui components
- ✅ Chrome storage integration
- ✅ TypeScript type safety
- ✅ Hot module replacement during development

### Planned Features (TODO)

- 🔄 AI API integration for step-by-step guidance
- 🔄 Content script injection for page interaction
- 🔄 Visual highlighting of elements on the page
- 🔄 Voice guidance option
- 🔄 Progress tracking

## 🎯 Using the Extension

1. Click the extension icon in your Chrome toolbar
2. Select a user category:
   - **👶 Kids Mode** - Simple, fun explanations with visual aids
   - **👴 Elders Mode** - Clear, patient guidance with larger text
   - **🎓 Beginners Mode** - Detailed explanations for first-time users
3. Click "Start Guided Tour"
4. Follow the AI-powered instructions (AI integration coming soon!)

## 📝 Available Scripts

- `npm run dev` - Start development server with HMR
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔌 Chrome APIs Used

- `chrome.storage.local` - Store user preferences
- `chrome.activeTab` - Access current tab (to be implemented)

## 🤝 Adding More Components

To add new shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Example:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add toast
```

## 🐛 Troubleshooting

### Extension not loading
- Make sure you ran `npm run dev` first
- Check that the `dist` folder exists
- Verify Chrome Developer mode is enabled

### HMR not working
- Restart the dev server: `npm run dev`
- Reload the extension in `chrome://extensions/`

### Missing icons error
- Create the PNG icon files as described above
- All three sizes (16x16, 48x48, 128x128) are required

## 📄 License

MIT License

---

**Happy coding! 🚀**
