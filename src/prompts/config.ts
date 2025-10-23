// src/prompts/config.ts

export type UserCategory = 'kids' | 'intermediate' | 'beginners';

export interface PromptConfig {
  maxSteps: number;
  tone: string;
  formatting: string[];
}

// Add these interfaces to config.ts

export interface GuideStep {
  stepNumber: number;
  title: string;
  action: string;
  details: string;
  location?: string;
  whatToExpect: string;
  tips?: string[];
}

export interface WebsiteGuide {
  websiteName: string;
  summary: string;
  category: UserCategory;
  steps: GuideStep[];
  nextSteps: {
    title: string;
    suggestions: string[];
    encouragement: string;
  };
  metadata: {
    totalSteps: number;
    difficulty: 'easy' | 'moderate' | 'advanced';
    estimatedTime: string;
  };
}


/**
 * Configuration for each user category
 */
export const CATEGORY_CONFIG: Record<UserCategory, PromptConfig> = {
  kids: {
    maxSteps: 5,
    tone: 'fun, friendly, and simple',
    formatting: ['emojis', 'short sentences', 'encouraging words']
  },
  intermediate: {
    maxSteps: 7,
    tone: 'balanced, efficient, and practical',
    formatting: ['concise steps', 'key insights', 'productivity tips']
  },
  beginners: {
    maxSteps: 8,
    tone: 'helpful, informative, and clear',
    formatting: ['explanations', 'why it matters', 'alternatives']
  }
};

/**
 * Detailed instructions for each category
 */
export const CATEGORY_INSTRUCTIONS: Record<UserCategory, string> = {
  kids: `
- Use simple words (no technical terms)
- Keep sentences under 10 words when possible
- Add fun emojis (👍 ✨ 🎯 🚀) to make it engaging
- Use encouraging phrases like "Great job!" or "You can do this!"
- Compare website features to familiar things (like toys or games)
- Make it feel like an adventure or game`,

  intermediate: `
- Use standard web terminology (users should be familiar with common terms)
- Focus on efficiency and best practices
- Include keyboard shortcuts where applicable
- Highlight advanced features and productivity tips
- Provide direct, action-oriented instructions
- Skip basic explanations but clarify complex concepts
- Mention time-saving techniques and pro tips`,

  beginners: `
- Explain common web terms in parentheses (e.g., "navigation bar (the menu at the top)")
- Include WHY each step is important
- Mention what success looks like ("You'll see a confirmation message")
- Provide alternatives if something doesn't work
- Use complete sentences with proper explanations
- Add helpful tips where relevant`
};

/**
 * Website type categories for contextual guidance
 */
export type WebsiteType = 'ecommerce' | 'social' | 'educational' | 'news' | 'general';
