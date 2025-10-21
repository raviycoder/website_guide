export async function checkAIAvailability(): Promise<string> {
  return await LanguageModel.availability()
}

export async function createAISession(temperature = 0.8, topK = 3): Promise<LanguageModelSession> {
  return await LanguageModel.create({ temperature, topK })
}

export function destroyAISession(session: LanguageModelSession): void {
  session.destroy();
}

export async function generateGuidedInstructions(session: LanguageModelSession, prompt: string): Promise<string> {
  return await session.prompt(prompt)
}