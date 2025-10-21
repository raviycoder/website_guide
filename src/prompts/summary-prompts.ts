// src/prompts/summary-prompts.ts

import { type UserCategory, CATEGORY_CONFIG, CATEGORY_INSTRUCTIONS } from './config';

/**
 * Generate website summary prompt
 * Returns a brief 2-3 sentence overview of the website
 */
export function getSummaryPrompt(category: UserCategory, websiteInfo: string): string {
  const config = CATEGORY_CONFIG[category];
  
  return `You are a helpful assistant explaining websites to ${category}.

Website Information:
${websiteInfo}

Task: Provide a comprehensive summary of this website with the following details:
1. What the website is (name and type)
2. What users can do on it (main features and actions)
3. How users interact with it (key workflows or processes)
4. What happens on the website (key activities, transactions, or outcomes)

Guidelines:
- Tone: ${config.tone}
- Make it detailed but clear (5-7 sentences)
- Cover all four aspects above
- Use specific examples where possible
${CATEGORY_INSTRUCTIONS[category]}

Write a detailed summary covering what, how, and why:`;
}

/**
 * Generate quick tip prompt
 * Returns a single helpful tip for using the website
 */
export function getQuickTipPrompt(category: UserCategory, websiteInfo: string): string {
  return `Based on this website information:
${websiteInfo}

Provide ONE helpful tip for ${category} users in 1-2 sentences.
Make it practical and immediately useful.

Quick Tip:`;
}

/**
 * Generate "What can I do here?" prompt
 * Returns main actions users can perform
 */
export function getMainActionsPrompt(category: UserCategory, websiteInfo: string): string {
  const config = CATEGORY_CONFIG[category];
  
  return `You are helping ${category} understand what they can do on this website.

Website Information:
${websiteInfo}

Task: List 3-4 main things users can do on this website.

Format as a bulleted list:
- Action 1
- Action 2
- Action 3

Tone: ${config.tone}
Keep it brief and actionable.

Main Actions:`;
}