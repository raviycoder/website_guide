// src/prompts/constants.ts

import type { UserCategory } from './config';

/**
 * Welcome messages shown before the guide
 */
export const WELCOME_MESSAGES: Record<UserCategory, string> = {
  kids: "Hey there, explorer! 🎉 Let's learn how to use this website together!",
  elders: "Hello! I'm here to help you navigate this website step by step.",
  beginners: "Welcome! Let me guide you through using this website."
};

/**
 * Error messages for each category
 */
export const ERROR_MESSAGES: Record<UserCategory, string> = {
  kids: "Oops! Something went wrong. Let's try again! 🔄",
  elders: "We encountered an issue. Please click the button to try again.",
  beginners: "Unable to generate guide. Please try again or refresh the page."
};

/**
 * Loading messages while AI generates content
 */
export const LOADING_MESSAGES: Record<UserCategory, string> = {
  kids: "🎨 Creating your fun guide...",
  elders: "📝 Preparing clear instructions for you...",
  beginners: "💡 Generating your helpful guide..."
};

/**
 * Category descriptions for UI display
 */
export const CATEGORY_DESCRIPTIONS: Record<UserCategory, string> = {
  kids: "👶 Kids Mode: Simple, fun explanations with visual aids",
  elders: "👴 Elders Mode: Clear, patient guidance with larger text",
  beginners: "🎓 Beginners Mode: Detailed explanations for first-time users"
};

/**
 * Success messages after guide generation
 */
export const SUCCESS_MESSAGES: Record<UserCategory, string> = {
  kids: "🎉 Your guide is ready! Let's get started!",
  elders: "✅ Your step-by-step guide is ready.",
  beginners: "✓ Guide generated successfully!"
};

/**
 * Button labels for each category
 */
export const BUTTON_LABELS: Record<UserCategory, string> = {
  kids: "🚀 Start Fun Guide",
  elders: "📖 Start Clear Guide",
  beginners: "🎓 Start Learning Guide"
};

/**
 * Empty state messages when no website is detected
 */
export const EMPTY_STATE_MESSAGES: Record<UserCategory, string> = {
  kids: "Let's visit a website first! 🌐",
  elders: "Please open a website to get started.",
  beginners: "Navigate to any website to receive guidance."
};
