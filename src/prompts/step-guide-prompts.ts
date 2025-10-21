// src/prompts/guide-prompts.ts

import { 
  type UserCategory, 
  type WebsiteType, 
  CATEGORY_CONFIG, 
  CATEGORY_INSTRUCTIONS,
  type WebsiteGuide
} from './config';

/**
 * Generate structured JSON guide prompt
 * Returns AI guide in JSON format for better parsing
 */
export function getStructuredGuidePrompt(category: UserCategory, websiteInfo: string): string {
  const config = CATEGORY_CONFIG[category];
  
  return `You are a helpful guide for ${category} users learning to use websites.

Website Information:
${websiteInfo}

Task: Create a comprehensive, structured guide in VALID JSON format.

Requirements:
- Tone: ${config.tone}
- Exactly ${config.maxSteps} steps
- Each step must be clear and actionable
${CATEGORY_INSTRUCTIONS[category]}

YOU MUST respond with ONLY valid JSON in this exact structure:

{
  "websiteName": "Name of the website",
  "summary": "Brief 2-3 sentence description of what this website does",
  "category": "${category}",
  "steps": [
    {
      "stepNumber": 1,
      "title": "Short step title",
      "action": "Main action to perform (e.g., Click the Search button)",
      "details": "Detailed explanation of this step",
      "location": "Where to find this element (e.g., top right corner)",
      "whatToExpect": "What happens after completing this step",
      "tips": ["Optional helpful tip 1", "Optional helpful tip 2"]
    },
    {
      "stepNumber": 2,
      "title": "Second step title",
      "action": "Action for step 2",
      "details": "Detailed explanation",
      "location": "Location on page",
      "whatToExpect": "Expected result",
      "tips": ["Helpful tip"]
    }
    // Continue for all ${config.maxSteps} steps
  ],
  "nextSteps": {
    "title": "What to do next",
    "suggestions": [
      "Try exploring the settings menu",
      "Look for helpful tutorials",
      "Practice the steps a few times"
    ],
    "encouragement": "Positive message for the user"
  },
  "metadata": {
    "totalSteps": ${config.maxSteps},
    "difficulty": "easy",
    "estimatedTime": "5-10 minutes"
  }
}

IMPORTANT: 
- Return ONLY the JSON object, no markdown, no code blocks, no extra text
- Make sure all JSON is valid and properly escaped
- Include all required fields
- Adapt language and complexity to ${category} users

Generate the JSON guide now:`;
}

/**
 * Generate contextual JSON guide with website type focus
 */
export function getStructuredContextualGuidePrompt(
  category: UserCategory, 
  websiteInfo: string, 
  websiteType: WebsiteType = 'general'
): string {
  const basePrompt = getStructuredGuidePrompt(category, websiteInfo);
  
  const contextFocus: Record<WebsiteType, string> = {
    ecommerce: `
Focus steps on: Product search → View details → Add to cart → Checkout → Track order`,
    social: `
Focus steps on: Create account → Make first post → Find friends → Privacy settings → Stay safe`,
    educational: `
Focus steps on: Browse courses → Enroll → Watch lessons → Complete activities → Track progress`,
    news: `
Focus steps on: Browse topics → Read article → Save articles → Search content → Share stories`,
    general: `
Focus steps on: Main navigation → Key features → Common tasks → Settings → Help resources`
  };
  
  return basePrompt.replace(
    'Generate the JSON guide now:',
    `${contextFocus[websiteType]}\n\nGenerate the JSON guide now:`
  );
}

/**
 * Parse AI JSON response safely
 */
export function parseGuideResponse(aiResponse: string): WebsiteGuide | null {
  try {
    console.log('Parsing AI response, length:', aiResponse.length)
    
    // Remove markdown code blocks if AI includes them
    let cleaned = aiResponse.trim();
    
    // Remove various markdown code block formats
    cleaned = cleaned.replace(/^```json\s*/i, ''); // Remove opening ```json
    cleaned = cleaned.replace(/^```\s*/, ''); // Remove opening ```
    cleaned = cleaned.replace(/\s*```$/, ''); // Remove closing ```
    cleaned = cleaned.trim();
    
    // Try to find JSON object if wrapped in text
    const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleaned = jsonMatch[0];
    }
    
    console.log('Cleaned JSON string (first 200 chars):', cleaned.substring(0, 200))
    
    // Parse JSON
    const guide: WebsiteGuide = JSON.parse(cleaned);
    
    console.log('Parsed guide structure:', {
      hasWebsiteName: !!guide.websiteName,
      hasSummary: !!guide.summary,
      hasSteps: !!guide.steps,
      stepsCount: guide.steps?.length || 0,
      hasNextSteps: !!guide.nextSteps,
      hasMetadata: !!guide.metadata
    })
    
    // Validate required fields
    if (!guide.websiteName || !guide.summary || !guide.steps || guide.steps.length === 0) {
      console.error('Invalid guide structure - missing required fields:', {
        websiteName: guide.websiteName,
        summary: guide.summary,
        stepsLength: guide.steps?.length
      });
      return null;
    }
    
    return guide;
  } catch (error) {
    console.error('Failed to parse guide JSON:', error);
    console.log('Raw AI response (first 500 chars):', aiResponse.substring(0, 500));
    return null;
  }
}

/**
 * Convert structured guide to markdown for display
 */
export function guideToMarkdown(guide: WebsiteGuide): string {
  let markdown = `# ${guide.websiteName}\n\n`;
  markdown += `${guide.summary}\n\n`;
  markdown += `⏱️ **Time needed:** ${guide.metadata.estimatedTime}\n`;
  markdown += `📊 **Difficulty:** ${guide.metadata.difficulty}\n\n`;
  markdown += `---\n\n`;
  
  // Add steps
  markdown += `## Step-by-Step Guide\n\n`;
  guide.steps.forEach((step) => {
    markdown += `### ${step.stepNumber}. ${step.title}\n\n`;
    markdown += `**Action:** ${step.action}\n\n`;
    markdown += `${step.details}\n\n`;
    if (step.location) {
      markdown += `📍 **Where to find:** ${step.location}\n\n`;
    }
    markdown += `✅ **What happens:** ${step.whatToExpect}\n\n`;
    if (step.tips && step.tips.length > 0) {
      markdown += `💡 **Tips:**\n`;
      step.tips.forEach(tip => markdown += `- ${tip}\n`);
      markdown += `\n`;
    }
    markdown += `---\n\n`;
  });
  
  // Add next steps
  markdown += `## ${guide.nextSteps.title}\n\n`;
  guide.nextSteps.suggestions.forEach(suggestion => {
    markdown += `- ${suggestion}\n`;
  });
  markdown += `\n${guide.nextSteps.encouragement}\n`;
  
  return markdown;
}
