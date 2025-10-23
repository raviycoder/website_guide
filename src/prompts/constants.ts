// src/prompts/constants.ts

import type { UserCategory } from './config';

/**
 * Welcome messages shown before the guide
 */
export const WELCOME_MESSAGES: Record<UserCategory, string> = {
  kids: "Hey there, explorer! 🎉 Let's learn how to use this website together!",
  intermediate: "Welcome! Let me show you the key features and efficient ways to use this site.",
  beginners: "Welcome! Let me guide you through using this website."
};

/**
 * Error messages for each category
 */
export const ERROR_MESSAGES: Record<UserCategory, string> = {
  kids: "Oops! Something went wrong. Let's try again! 🔄",
  intermediate: "An error occurred. Please retry to generate your guide.",
  beginners: "Unable to generate guide. Please try again or refresh the page."
};

/**
 * Loading messages while AI generates content
 */
export const LOADING_MESSAGES: Record<UserCategory, string> = {
  kids: "🎨 Creating your fun guide...",
  intermediate: "⚡ Generating efficient guide with key insights...",
  beginners: "💡 Generating your helpful guide..."
};

/**
 * Category descriptions for UI display
 */
export const CATEGORY_DESCRIPTIONS: Record<UserCategory, string> = {
  kids: "👶 Kids Mode: Simple, fun explanations with visual aids",
  intermediate: "⚡ Intermediate Mode: Efficient guidance with productivity tips",
  beginners: "🎓 Beginners Mode: Detailed explanations for first-time users"
};

/**
 * Success messages after guide generation
 */
export const SUCCESS_MESSAGES: Record<UserCategory, string> = {
  kids: "🎉 Your guide is ready! Let's get started!",
  intermediate: "✓ Your streamlined guide is ready to use.",
  beginners: "✓ Guide generated successfully!"
};

/**
 * Button labels for each category
 */
export const BUTTON_LABELS: Record<UserCategory, string> = {
  kids: "🚀 Start Fun Guide",
  intermediate: "⚡ Start Efficient Guide",
  beginners: "🎓 Start Learning Guide"
};

/**
 * Empty state messages when no website is detected
 */
export const EMPTY_STATE_MESSAGES: Record<UserCategory, string> = {
  kids: "Let's visit a website first! 🌐",
  intermediate: "Navigate to a website to get started with your guide.",
  beginners: "Navigate to any website to receive guidance."
};
